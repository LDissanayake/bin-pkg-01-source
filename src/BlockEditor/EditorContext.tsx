import React, { createContext, useContext, useState, useEffect, useRef, MutableRefObject } from 'react';
import { getPostData, updatePostData } from '../util/wpApi';

import ServerSideRender from '../RenderEngine/ServerSideRender';
import FullScreenLoader from '../FullScreenLoader';
import cloneDeep from 'lodash/cloneDeep';
import { BlockAnimation, BlockDesign, VariantSetting } from './Blocks/blockTemplate';
import { compactDesign } from './util/styleCodec';
import { encodeOptions } from './util/optionCodec';
import { blockRegistry } from './Blocks';
import useLocalStorage from '../hooks/useLocalStorage';
import { useDesignSetting } from '../hooks/useDesignSetting';
import BlockTreeUtils from './util/blockTreeUtils';

/**
 * Block Interface
 * i: id | p: parent ID | t: type | c: children | o: options | d: design | v: variants | a: animation
 * ll: layer label | m: mode | pr: preset;
 * _c: compact
 */
export interface Block {
    p: string;
    t: string;
    c?: string[];
    o?: string;
    d?: string;
    v?: VariantSetting[];
    dt?: string;
    a?: {
        [id: string]: BlockAnimation
    };
    l?: string;
    m?: 'e' | 'i' | 'c';
    u?: Record<string, any>;
    pr?: string;
    data?: {
        design?: BlockDesign,
        options?: { [key: string]: any }
    }
}


export interface PageStructure {
    blocks: Map<string, Block>;
}

export interface PostData {
    id?: string,
    title?: string,
    document_data?: string,
    post_type?: string,
    site_data?: {
        site_title: string,
        site_url: string,
        content_post_type: string[]
    },
    template_data?: {
        default: string,
        templates: { [key: string]: string },
        template_list: { id: string, title: string }[],
        parts: {
            frame: null | string,
            footer: null | string
        }
    }
};

type SaveState = 'idle' | 'saving' | 'success' | 'error';

interface EditorContextProps {
    canEdit: boolean;
    postData: PostData;
    setPostData: React.Dispatch<PostData>;
    id: string;
    back: () => void;
    handleSave: () => void;
    panel: null | { type: string, data: any }
    setPanel: React.Dispatch<React.SetStateAction<null | { type: string, data: any }>>;
    editingDesignId: null | string,
    setEditingDesignId: React.Dispatch<React.SetStateAction<null | string>>;
    editingBlock: null | string,
    setEditingBlock: React.Dispatch<React.SetStateAction<null | string>>;
    editingComponentId: null | string,
    setEditingComponentId: React.Dispatch<React.SetStateAction<null | string>>;
    editingVariant: string,
    setEditingVariant: React.Dispatch<React.SetStateAction<string>>;
    device: 'default' | 'medium' | 'small',
    setDevice: React.Dispatch<React.SetStateAction<'default' | 'medium' | 'small'>>;
    colorMode: 'l' | 'd',
    setColorMode: React.Dispatch<React.SetStateAction<'l' | 'd'>>;
    canSave: boolean;
    refreshCanvas: number
    setRefreshCanvas: React.Dispatch<React.SetStateAction<number>>;
    postSaving: boolean;
    setPostSaving: React.Dispatch<React.SetStateAction<boolean>>;
    recordHistoryHash: null | number;
    setRecordHistoryHash: React.Dispatch<React.SetStateAction<null | number>>;
    historyChange: null | number;
    setHistoryChange: React.Dispatch<React.SetStateAction<null | number>>;
    undo: () => void;
    redo: () => void;
    handleSetEditingBlockId: (id: string | null) => void,
    outSideEditHash: number,
    setOutSideEditHash: React.Dispatch<React.SetStateAction<number>>;
    preview: null | string,
    setPreview: React.Dispatch<React.SetStateAction<null | string>>;
    tool: ToolsType,
    setTool: React.Dispatch<React.SetStateAction<ToolsType>>;
    zoom: number,
    setZoom: React.Dispatch<React.SetStateAction<number>>;

    page: { [id: string]: number }
    setPage: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
    pageBlocks: MutableRefObject<Map<string, Block>>;
    editMode: 'ui' | 'text';
    setEditMode: React.Dispatch<React.SetStateAction<'ui' | 'text'>>;
    markFrameDirty: (frameId: string, modify?: boolean, remove?: boolean) => void;

    saveState: SaveState,
    publishHash: number,

    openLayers: { [id: string]: boolean }
    setOpenLayers: React.Dispatch<React.SetStateAction<{ [id: string]: boolean }>>;
}

export type ToolsType = 'select' | 'pan' | 'frame' | 'rectangle' | 'text';

interface APIError {
    response?: {
        data?: {
            code?: string;
        };
    };
}


const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within an EditorProvider');
    }
    return context;
};

export const EditorProvider: React.FC<{
    id: string;
    back: () => void;
    children: React.ReactNode;
}> = ({ id, back, children }) => {
    const [loaded, setLoaded] = useState(false);
    const [postData, setPostData] = useState<PostData>(
        {}
    );

    // TODO Create new time tarvel
    // State for managing the history, current state, and future state
    const [history, setHistory] = useState<PageStructure[]>([]);
    const [future, setFuture] = useState<PageStructure[]>([]);
    const [recordHistoryHash, setRecordHistoryHash] = useState<number | null>(null);  // History record trigger
    const [historyChange, setHistoryChange] = useState<number | null>(null);


    const initPageBlocks = new Map();
    initPageBlocks.set('root',
        {
            t: 'root',
            c: [],
            o: '',
        }
    );


    const pageBlocks: MutableRefObject<Map<string, Block>> = useRef(initPageBlocks);
    const [page, setPage] = useState<{ [id: string]: number }>({ root: Date.now() });

    const [openLayers, setOpenLayers] = useState<{ [key: string]: boolean }>({});
    const [panel, setPanel] = useState<null | { type: string, data: any }>({ type: 'navigator', data: {} });

    const [editingDesignId, setEditingDesignId] = useState<null | string>(null);
    const [editingBlock, setEditingBlock] = useState<null | string>(null);
    const [editingComponentId, setEditingComponentId] = useState<null | string>(null);
    const [editingVariant, setEditingVariant] = useState<string>('base');


    const [device, setDevice] = useState<'default' | 'medium' | 'small'>('default');
    const [colorMode, setColorMode] = useDesignSetting<'l' | 'd'>(editingDesignId, 'colorMode', 'd');

    const [refreshCanvas, setRefreshCanvas] = useState(Date.now());
    const [postSaving, setPostSaving] = useState(false);
    const [preview, setPreview] = useState<null | string>(null);

    const [saveState, setSaveState] = useState<SaveState>('idle');

    const [outSideEditHash, setOutSideEditHash] = useState(Date.now());

    const [editorType, setEditorType] = useState<'design' | 'content'>('design');

    const [tool, setTool] = useState<ToolsType>('select');
    const [zoom, setZoom] = useDesignSetting<number>(editingDesignId, 'zoom', 60);

    const [editMode, setEditMode] = useState<'ui' | 'text'>('ui');

    const [publishHash, setPublishHash] = useState(Date.now());

    const [features, setFeatures] = useState({});

    useEffect(() => {
        const handleInit = () => {
            // Sync the global registry to local React state
            setFeatures({ ...window.AddifectCore.registry.features });
        };

        window.addEventListener('addifect_init', handleInit);
        return () => window.removeEventListener('addifect_init', handleInit);
    }, []);

    // Undo functionality
    const undo = () => {
        if (history.length <= 1) return;  // No more undo if only one history state exists

        const previousState = history[history.length - 2];
        // setPageStructure(cloneDeep(previousState));  // Restore page structure
        // setFuture((prevFuture) => [cloneDeep(pageStructure), ...prevFuture]);  // Add current state to future

        // Update history by removing the last state
        // setHistory((prevHistory) => cloneDeep(prevHistory).slice(0, prevHistory.length - 1));
        // setHistoryChange(Date.now());
    };

    // Redo functionality
    const redo = () => {
        if (future.length === 0) return;

        const nextState = future[0];
        // setPageStructure(cloneDeep(nextState));  // Restore pageStructure
        // setHistory((prevHistory) => [...prevHistory, cloneDeep(nextState)]);  // Push the next state back to history
        // setFuture((prevFuture) => cloneDeep(prevFuture).slice(1));  // Remove the first future state
        // setHistoryChange(Date.now());
    };

    // useEffect to record history whenever recordHistoryHash changes and pageStructure has actually changed
    // useEffect(() => {
    //     if (recordHistoryHash !== null) {
    //         const currentState = cloneDeep(pageStructure);  // Capture the latest page structure

    //         // Check if the current state is different from the last history entry to avoid redundant history entries
    //         setHistory((prevHistory) => {
    //             if (prevHistory.length === 0 || !isEqual(prevHistory[prevHistory.length - 1], currentState)) {
    //                 return [...cloneDeep(prevHistory), currentState];  // Push current state to history
    //             }
    //             return prevHistory;  // If the state is the same, don't update history
    //         });

    //         setFuture([]);  // Clear future states since we made a new change
    //     }
    // }, [recordHistoryHash]);

    // useEffect(() => {
    //     if (loaded) {
    //         setRecordHistoryHash(Date.now());
    //     }
    // }, [editingBlock, loaded]);


    useEffect(() => {
        if (editingBlock && editingVariant !== 'base') {
            setEditingVariant('base');
        }
    }, [editingBlock]);


    // Utility function to detect if the platform is macOS
    const isMac = () => {
        // Check userAgent for macOS devices
        return window.navigator.userAgent.includes('Mac');
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMacOS = isMac();

            // Undo shortcut (Cmd + Z on Mac, Ctrl + Z on non-Mac)
            const undoShortcut = (isMacOS && event.metaKey && event.key === 'z' && !event.shiftKey) ||
                (!isMacOS && event.ctrlKey && event.key === 'z' && !event.shiftKey);

            // Redo shortcut (Cmd + Shift + Z on Mac, Ctrl + Shift + Z on non-Mac)
            const redoShortcut = (isMacOS && event.metaKey && event.shiftKey && event.key === 'Z') ||
                (!isMacOS && event.ctrlKey && event.shiftKey && event.key === 'Z');

            if (undoShortcut) {
                event.preventDefault();
                undo();
            } else if (redoShortcut) {
                event.preventDefault();
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [history, future]);


    const [isDirty, setIsDirty] = useState(false);
    const dirtSkip = useRef(false);

    const initPageData = (pageStructure: PageStructure) => {
        const versions: { [id: string]: number } = {};

        pageBlocks.current = new Map(Object.entries(pageStructure.blocks));

        Object.keys(pageStructure.blocks).forEach(blockId => {
            versions[blockId] = Date.now();
        });

        dirtSkip.current = true;
        setPage({ ...versions });

        const root = pageBlocks.current.get('root');
        if (root?.c?.length) {
            setEditingDesignId(root.c[0]);
            setEditingBlock(root.c[0]);
        }
    }


    const isInitialMount = useRef(true); // track first render

    useEffect(() => {
        if (isInitialMount.current) {
            // skip first run
            isInitialMount.current = false;
            return;
        }

        if (dirtSkip.current) {
            dirtSkip.current = false;
            return;
        }

        // This runs only when page changes after initial load
        setIsDirty(true);

        if(!editingBlock ) { return }

        const block = pageBlocks.current.get(editingBlock);
        const frame = BlockTreeUtils.findSelfOrParentByType(pageBlocks.current, editingBlock, 'fr');
        const designAssets = BlockTreeUtils.findSelfOrParentByType(pageBlocks.current, editingBlock, 'a');

        if (frame?.id) {
            markFrameDirty(frame.id, true);
            return;
        }

        if (designAssets?.id) {
            markFrameDirty(designAssets.id, true);
            return;
        }

    }, [page]);

    /**
     * Load Document Data
     */
    useEffect(() => {
        setLoaded(false);
        getPostData(id)
            .then(response => {
                setPostData(response); // Set Post Data
                if (response.document_data) {
                    try {
                        const parsed = JSON.parse(response.document_data);
                        if (parsed && typeof parsed === 'object') {
                            initPageData(parsed.pageStructure);
                        } else {

                        }
                    } catch (error) {
                        console.error('Error parsing pageStructure:', error);
                    }
                }
                setLoaded(true);
            })
            .catch(error => {
                console.error('Error loading post data:', error);
            });
    }, [id]);



    // let canSave = false;

    // if (editorType === 'design') {
    //     canSave = JSON.stringify(initPageStructure) !== JSON.stringify(pageStructure)
    // } else {
    //     canSave =
    //         JSON.stringify(initPageStructure) !==
    //         JSON.stringify(replaceUserDataWithEmptyObject(pageStructure)) ||
    //         JSON.stringify(initSettingsData) !==
    //         JSON.stringify(settingsData);

    //     //TODO remove setting data from here
    // }


    /**
     * Save Design File/Post
     */
    const handleSaveDesignFile = async () => {
        // Build blocks object
        const blocksObj = cloneDeep(
            Object.fromEntries(pageBlocks.current.entries())
        );

        for (const id in blocksObj) {
            if (blocksObj[id]?.data?.options) {
                blocksObj[id].o = encodeOptions(blocksObj[id].data.options);
            }
            if (blocksObj[id]?.data?.design) {
                blocksObj[id].d = compactDesign(blocksObj[id].data.design);
            }
            if (blocksObj[id]?.data) {
                delete blocksObj[id].data;
            }
        }

        const ps = { blocks: blocksObj };

        // 🔥 Start saving
        setSaveState('saving');

        try {
            await updatePostData(
                {
                    id,
                    title: postData?.title,
                    data: JSON.stringify({
                        pageStructure: ps
                    })
                }
            );

            setIsDirty(false);

            // 🔥 Success animation
            setSaveState('success');

            // show success briefly
            setTimeout(() => {
                setSaveState('idle');
            }, 1200);

        } catch (error) {

            if ((error as APIError)?.response?.data?.code === 'unauthorized') {
                //TODO fix this to show msg log in.
            }

            console.error('Error saving post data:', error);

            // you can show error UI state if needed
            setSaveState('error');

            setTimeout(() => {
                setSaveState('idle');
            }, 1500);

        }
    };



    /**
     * Save Main Function
     * @returns 
     */
    const handleSave = async () => {
        if (editorType === 'design') {
            handleSaveDesignFile();
            return;
        }

        // TODO fix this on Content Edit
        // setPostSaving(true);

        // const ps = replaceUserDataWithEmptyObject(cloneDeep(pageStructure));

        // try {
        //     // Wait for server-side render to complete
        //     const ssr = await ServerSideRender(
        //         {
        //             pageStructure: ps,
        //             type: postData?.post_type || '',
        //             settingsData,
        //             styleData: {}
        //         });

        //     // Proceed with saving post data
        //     const response = await updatePostData(
        //         clientAPI,
        //         authToken,
        //         {
        //             id,
        //             title: postData?.title,
        //             data: JSON.stringify({
        //                 pageStructure: ps,
        //                 settings: settingsData
        //             }),
        //             ssr_html: ssr.html,
        //             ssr_styled: ssr.css,
        //         }
        //     );
        //     // setInitPageStructure(ps);
        //     setInitSettingsData(settingsData);
        // } catch (error) {
        //     if ((error as APIError)?.response?.data?.code === 'unauthorized') {
        //         setUnauthorized(true);
        //     }
        //     console.error('Error saving post data:', error);
        // } finally {
        //     setPostSaving(false);
        // }
    };


    /**
     * Set Editing Design ID
     */
    useEffect(() => {
        if (editingBlock) {
            const blockType = pageBlocks.current.get(editingBlock)?.t;
            if (blockType === 'de') {
                setEditingDesignId(editingBlock);
            }
        }
    }, [editingBlock, loaded]);


    /**
     * Set Block Design editing mode
     */
    useEffect(() => {
        const blockId = editingBlock as string;
        const block = pageBlocks.current.get(blockId);

        if (block) {
            const blockTemplate = blockRegistry[block?.pr || block.t];

            const supportDesign = blockTemplate.designSections?.length;
            if (editMode === 'text' && !supportDesign) {
                setEditMode('ui');
            }

        }

    }, [editingBlock]);

    /** handle open tree */
    useEffect(() => {
        if (!editingBlock) return;

        const allParents = BlockTreeUtils.getParentsIdsUntil(
            pageBlocks.current,
            editingBlock,
            'de'
        );

        setOpenLayers(prev => {
            const next = { ...prev };

            allParents.forEach(id => {
                next[id] = true;
            });

            return next;
        });

    }, [editingBlock]);

    if (!loaded) {
        return <FullScreenLoader variant="1" />
    }

    let canEdit = true;

    const _exclude = ['addifect_design'];

    // TODO THIS MAY REMOVE AFTER CREATING POST EDITOR/BUILDER
    if (!_exclude.includes(postData?.post_type || '')) {
        if (!postData?.template_data?.default) {
            canEdit = false
        } else {
            canEdit = true;
        }
    }


    /**
     * Set Editing Block ID
     * @param id 
     */
    const handleSetEditingBlockId = (id: string | null) => {
        setEditingBlock(id);
    }


    /**
     * Make Frame Dirty to Mark publish
     * @param frameId
     */
    const markFrameDirty = (
        frameId: string,
        modify = false,
        remove = false
    ) => {
        const design = pageBlocks.current.get(editingDesignId as string);
        if (!design) return;

        const options =
            (design.data as any).options ??
            ((design.data as any).options = {});

        const tpContainer =
            options.tp ?? (options.tp = { value: {} });

        const tp = tpContainer.value;

        // remove mode
        if (remove) {
            if (tp[frameId] === undefined) return;
            delete tp[frameId];
            return;
        }

        // already dirty → nothing to do
        if (tp[frameId] === true) return;

        // modify mode: only update existing keys
        if (modify && tp[frameId] === undefined) return;

        tp[frameId] = true;

        setPublishHash(Date.now());
    };

    return (
        <EditorContext.Provider
            value={{
                canEdit,
                postData,
                setPostData,
                id,
                back,
                handleSave,
                panel,
                setPanel,
                editingDesignId,
                setEditingDesignId,
                editingBlock,
                setEditingBlock,
                editingComponentId,
                setEditingComponentId,
                editingVariant,
                setEditingVariant,
                canSave: isDirty,
                device,
                setDevice,
                colorMode,
                setColorMode,
                refreshCanvas,
                setRefreshCanvas,
                postSaving,
                setPostSaving,
                recordHistoryHash,
                setRecordHistoryHash,
                historyChange,
                setHistoryChange,
                undo,
                redo,
                handleSetEditingBlockId,
                outSideEditHash,
                setOutSideEditHash,
                preview,
                setPreview,
                tool,
                setTool,
                zoom,
                setZoom,
                page,
                setPage,
                pageBlocks,
                editMode,
                setEditMode,
                markFrameDirty,
                saveState,
                publishHash,

                openLayers,
                setOpenLayers
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};