import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { blockRegistry } from './Blocks';
import * as styles from './css/TreeView.module.css';
import { ActionIcon, CheckIcon, Divider, Popover, rem, UnstyledButton } from '@mantine/core';
import { ArrowLeftIcon, ButtonIcon, CaretRightIcon, Component1Icon, CrossCircledIcon, GridIcon, LightningBoltIcon, MixerHorizontalIcon, PlusIcon, ViewHorizontalIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { IconCirclePlus, IconColumns1, IconComponents, IconCopy, IconEyeClosed, IconGripVertical, IconLayoutBottombar, IconLayoutNavbar, IconLoader2, IconLock, IconTransform, IconTrash, IconVersions, IconWaveSine } from '@tabler/icons-react';
import { useEditorContext } from './EditorContext';
import cloneDeep from 'lodash/cloneDeep';
import { Block } from './EditorContext';
import { v4 as uuidv4 } from 'uuid';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, Submenu } from 'rctx-contextmenu';
import GridItemEditor from './components/GridItemEditor';
import { addDesignStarter } from './AddPanel';
import { generateId } from './util/generateId';
import BlockTreeUtils from './util/blockTreeUtils';

import './css/ContextMenu.css';
import genBlockData from './util/blockDataUtils';
import { handleFrameTypes } from './Blocks/frame';
import GridBackground from '../Home/GridBackground';


function getShortText(html, limit = 8) {
    const div = document.createElement("div");
    div.innerHTML = html;

    const text = div.textContent || div.innerText || "";

    return text.length > limit
        ? text.slice(0, limit) + "..."
        : text;
}


const TreeNode: React.FC<{
    blockId: string,
    hoverId: string | null,
    setHover: (id: string | null) => void,
    deleteBlock: (id: string) => void,
    duplicateBlock: (id: string) => void,
    drag?: {
        dragging: null | { id: string, type: string, cats: string[], rootAllowed: boolean },
        setDragging: (data: null | { id: string, type: string, cats: string[], rootAllowed: boolean }) => void,
        dragHoverId: string | null,
        setDragHoverId: (id: string | null) => void,
        handleDrop: (fromId: string, toId: string, direct?: boolean) => void;
    }
    treeType?: 'design' | 'default'
}> = ({ blockId, deleteBlock, duplicateBlock, hoverId, setHover, drag, treeType }) => {

    const {
        panel,
        page,
        setPage,
        pageBlocks,
        handleSetEditingBlockId,
        setPanel,
        editingComponentId,
        setEditingComponentId,
        editingBlock,
        device,
        setOutSideEditHash,
        editingDesignId,
        setEditingDesignId,
        setEditingBlock,
        markFrameDirty,
        openLayers,
        setOpenLayers
    } = useEditorContext();

    // const [open, setOpen] = useState(false);

    const open = openLayers?.[blockId] || false;

    const setOpen = (open: boolean) => {
        setOpenLayers(prev => ({
            ...prev,
            [blockId]: open,
        }));
    };

    const block = pageBlocks.current.get(blockId);
    const frame = BlockTreeUtils.findSelfOrParentByType(pageBlocks.current, blockId, 'fr');
    const designAssets = BlockTreeUtils.findSelfOrParentByType(pageBlocks.current, blockId, 'a');


    if (!block) { return }

    genBlockData(block);

    const id = blockId;

    const type = block.t;
    const parentId = block.p;
    const children = block.c;
    const options = block?.data?.options;
    const preset = block.pr;
    const mode = type === 'b' && (block?.m || 'e');
    const parentBlock = pageBlocks.current.get(parentId) as Block;
    const userData = (block.u ??= {});

    const blockTemplate = blockRegistry[preset || type];

    if (!blockTemplate) {
        return <span
            style={{
                fontSize: 12
            }}
        >unknown block <span onClick={() => deleteBlock(id)}>Delete</span></span>;
    }

    // useEffect(() => {
    //     if (hoverId && children && children.includes(hoverId)) {
    //         setOpen(true);
    //     }
    // }, [hoverId]);

    const renderChildren = () => {
        if (children?.length === 0) return null;
        return (
            <ul>
                {children?.map(childId => (
                    <li key={childId}>
                        <TreeNode
                            blockId={childId}
                            deleteBlock={deleteBlock}
                            duplicateBlock={duplicateBlock}
                            hoverId={hoverId}
                            setHover={setHover}
                            drag={drag} />
                    </li>
                ))}
            </ul>
        );
    };


    let canDrop = false;

    if (drag?.dragging?.id) {
        if (parentId === 'root') {
            canDrop = drag.dragging.rootAllowed;
        } else {
            const parentTemplate = blockRegistry[parentBlock?.t as string]
            const allowedCats = parentTemplate?.childCats || [];
            const currentCats = drag.dragging.cats || [];
            canDrop = allowedCats.some(item => currentCats.includes(item));
        }
    }

    let canDropAsChild = false;

    if (drag?.dragging?.id) {
        const allowedCats = blockTemplate?.childCats || [];
        const currentCats = drag.dragging.cats || [];
        canDropAsChild = allowedCats.some(item => currentCats.includes(item)) &&
            id !== drag.dragging.id;
    }

    const dragDataProps: { [key: string]: boolean } = {}
    if (drag?.dragging) {
        dragDataProps['data-allowdrop'] = canDrop;
    }


    const canConvertToComponent = mode === 'e';

    const isMotionFlow = block.o?.mf?.value;
    const canConvertToMotionFlow = type === 'b' && mode === 'e' && !isMotionFlow;


    /**
     * Converts an existing block into a reusable component by:
     * 1. Turning the original block into a component definition (`m: 'c'`)
     * 2. Registering that component inside the global components folder
     * 3. Creating an instance block (`m: 'i'`) to replace it in the layout
     * 4. Rewiring parent-child relationships accordingly
     */
    const handleConvertToComponent = (id: string) => {
        const blocks = pageBlocks.current;

        // ---------------------------------------------------------------------
        // Generate a unique ID for the new instance block
        // (component keeps the original block ID)
        // ---------------------------------------------------------------------
        const existingIds = new Set<string>(blocks.keys());
        const newInstanceBlockId = generateId(existingIds);

        // ---------------------------------------------------------------------
        // Fetch block templates
        // i  -> instance block template
        // co -> component block template (used conceptually, not instantiated)
        // ---------------------------------------------------------------------
        const instanceTemplate = blockRegistry['i'];

        // ---------------------------------------------------------------------
        // Create instance block that will replace the original block in the layout
        // The instance references the original block (now a component)
        // ---------------------------------------------------------------------
        const newInstanceBlock: Block = {
            p: parentId,
            t: instanceTemplate.type,
            c: [id],               // points to the component definition
            o: instanceTemplate.props.options,
            d: instanceTemplate.props.design,
            m: 'i',                // mark as instance
        };

        blocks.set(newInstanceBlockId, newInstanceBlock);

        // ---------------------------------------------------------------------
        // Convert original block into a component definition
        // - Remove parent reference (components live globally)
        // - Mark block as component (`m: 'c'`)
        // ---------------------------------------------------------------------
        const originalBlock = blocks.get(id) as Block | undefined;
        if (!originalBlock) return;

        originalBlock.p = '';
        originalBlock.m = 'c';
        blocks.set(id, originalBlock);

        // ---------------------------------------------------------------------
        // Resolve global components folder using static IDs
        // design → assets → components
        // ---------------------------------------------------------------------
        const assetsId = `${editingDesignId}_assets`;
        const componentsFolderId = `${editingDesignId}_components`;

        const componentsFolder = blocks.get(componentsFolderId) as Block | undefined;
        if (!componentsFolder) return;

        // Register the component inside the global components folder
        componentsFolder.c ??= [];
        componentsFolder.c.push(id);

        // ---------------------------------------------------------------------
        // Replace original block with instance block in its parent
        // ---------------------------------------------------------------------
        if (parentBlock?.c) {
            const index = parentBlock.c.indexOf(id);
            if (index !== -1) {
                parentBlock.c[index] = newInstanceBlockId;
            }
            blocks.set(parentId, parentBlock);
        }

        // ---------------------------------------------------------------------
        // Trigger editor re-render updates (batched timestamps)
        // ---------------------------------------------------------------------
        const now = Date.now();

        setPage(prev => ({
            ...prev,
            [(parentId || 'root')]: now,
            [id]: now + 5,                    // component definition
            [newInstanceBlockId]: now + 15,   // instance block
            [componentsFolderId]: now + 20,   // components folder
            [assetsId]: now + 25,             // assets container
        }));
    };



    const handleAddMotionFlow = () => {
        if (options) {
            options.mf = {
                vs: 'm',
                value: true
            }
            options.tmb = {
                vs: 'm',
                value: 'char'
            }
            options.mfm = {
                vs: 'm',
                value: ['ro_ltr_ttb'],
            }
            options.mgr = {
                vs: 'm',
                de: {
                    d: { value: 6 }
                },
            }
            options.mgc = {
                vs: 'm',
                de: {
                    d: { value: 24 }
                },
            }
        }
        setPage(prev => ({ ...prev, [id]: Date.now() }));
        setOutSideEditHash(Date.now());
    }


    const handleSetEditComponent = (id: string | null) => {
        setEditingComponentId(id);
        handleSetEditingBlockId(id);
    }

    const handleRenameLayer = (label: string) => {
        block.l = label;
        setPage(prev => ({
            ...prev,
            [blockId as string]: Date.now()
        }));

    }

    const handleSetGridItemEdit = (id: string) => {
        const block = pageBlocks.current.get(editingBlock as string) as Block;
        const userData = block.u || {};
        userData.editingGridItemID = userData.editingGridItemID === id ? null : id;
        pageBlocks.current.set(editingBlock as string, block);
        setPage(prev => ({ ...prev, [editingBlock as string]: Date.now() }));
    }

    const deviceMap = { default: 'd', medium: 'm', small: 's' };
    const deviceFlag = deviceMap[device] as 'd' | 'm' | 's';

    const isStack = block?.d?.st?.dt?.de?.d?.value === 'fl';
    const isGrid = block?.d?.st?.dt?.de?.d?.value === 'gr';

    const editingVariant = userData.editingVariant || 'base';
    const direction = block?.d?.[editingVariant]?.fd?.de?.[deviceFlag]?.value;
    const directionIcons: { [key: string]: any } = {
        ro: <ViewVerticalIcon />,
        co: <ViewHorizontalIcon />,
        ror: <ViewVerticalIcon />,
        cor: <ViewHorizontalIcon />,
    }

    let defaultBlockLabel = '';

    if (isStack) {
        defaultBlockLabel = 'Stack';
    } else if (isGrid) {
        defaultBlockLabel = 'Grid';
    }


    defaultBlockLabel = block.l || defaultBlockLabel;

    const coid = block.data?.options?.coid?.value;

    if (block.t === 't') {
        const ct = block.data?.options?.ct;
        if (ct?.vs === 'm' || !ct?.vs) {
            const text = getShortText(ct?.value || '');
            defaultBlockLabel = block.l || text || defaultBlockLabel;
        }
    }

    let blockIcon = blockTemplate?.icon;

    if (block.m === 'c') {
        blockIcon = <Component1Icon />
    } else if (isStack) {
        blockIcon = directionIcons[direction]
    } else if (isGrid) {
        blockIcon = <GridIcon />
    }

    let isParentEditing = false;
    let isParentGrid = false;
    let parentEditingGridItemID = null;
    if (editingBlock === parentId) {
        isParentEditing = true;
    }

    if (parentBlock?.d?.st?.dt?.de?.d?.value === 'gr'
    ) {
        isParentGrid = true;
        parentEditingGridItemID = parentBlock.u?.editingGridItemID;
    }

    const handleLayerLock = (id: string) => {
        const updatedBlock = pageBlocks.current.get(id as string);
        if (!updatedBlock) { return }

        const userData = updatedBlock.u || {};
        userData.lock = userData.lock ? false : true;
        userData.lastUpdated = Date.now();

        setPage(prev => ({
            ...prev,
            [id as string]: Date.now()
        }));

    }

    const handleLayerFrameHiden = () => {
        const updatedBlock = pageBlocks.current.get(blockId as string);
        if (!updatedBlock) { return }

        const userData = updatedBlock.u || {};
        userData.hideRender = userData.hideRender ? false : true;
        userData.lastUpdated = Date.now();

        pageBlocks.current.set(blockId as string, updatedBlock);

        setPage(prev => ({
            ...prev,
            [blockId as string]: Date.now()
        }));

    }

    const holdTimer = useRef<NodeJS.Timeout | null>(null);

    const clearHold = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
            holdTimer.current = null;
        }
    };


    const isFrame = type === 'fr';
    let frameTemplateType = null;
    if (isFrame) {
        frameTemplateType = options?.type?.value || "page";

        const icons = {
            page: <IconColumns1 />,
            header: <IconLayoutNavbar />,
            footer: <IconLayoutBottombar />,
            loader: <IconLoader2 />,
        };

        // infer proper key type from icons
        type FrameTemplateType = keyof typeof icons;

        blockIcon =
            icons[frameTemplateType as FrameTemplateType];

    }

    const handleFrameTemplatePartAssign = (type: 'header' | 'footer', id: string) => {
        const keys = { header: 'th', footer: 'tf' }
        const key = keys[type];

        if (options && key) {

            const currentPart = options[key]?.value;
            if (currentPart) {
                markFrameDirty(currentPart, false, true);
            }

            options[key] = { value: id }
            /* this code commented the automatic dirty removed user have to manulay choose to
            * publish it.
            */
            // add to publish list
            // markFrameDirty(id);

            // update page
            setPage(prev => ({
                ...prev,
                [blockId as string]: Date.now(),
            }));
        }
    }


    const getSetMenu = () => {
        const frames = pageBlocks.current.get(editingDesignId as string)?.c || [];

        const items: {
            [key: string]: { id: string, label: string }[]
        } = {
            header: [],
            footer: [],
            frames: []
        }

        frames?.forEach(frameId => {
            const frame = pageBlocks.current.get(frameId);
            if (!frame) { return }
            const frameType = frame.data?.options?.type?.value;

            if (frameType && items[frameType]) {
                items[frameType].push(
                    {
                        id: frameId,
                        label: frame?.l || frameType
                    }
                )
            }
        });

        const currentTemplates = {
            header: options?.th,
            footer: options?.tf,
        }

        return <>
            {
                items.header.length ? <Submenu title="Header">
                    {
                        items.header.map(item => {
                            return <ContextMenuItem
                                key={item.id}
                                disabled={currentTemplates.header === item.id}
                                onClick={() => handleFrameTemplatePartAssign('header', item.id)}
                            >{item.label}</ContextMenuItem>
                        })
                    }
                </Submenu> : <></>
            }
            {
                items.footer.length ? <Submenu title="Footer">
                    {
                        items.footer.map(item => {
                            return <ContextMenuItem
                                key={item.id}
                                disabled={currentTemplates.footer === item.id}
                                onClick={() => handleFrameTemplatePartAssign('footer', item.id)}
                            >{item.label}</ContextMenuItem>
                        })
                    }
                </Submenu> : <></>
            }
        </>
    }

    /**
     * Determines whether the expand control should be shown for a block
     */
    const showExpand = () => {
        // Component block:
        // Only expandable when a component is actively being edited
        if (block.m === 'c') {
            return Boolean(editingComponentId);
        }

        // Instance blocks are never expandable
        if (block.m === 'i') {
            return false;
        }

        // Regular blocks are expandable if they support children
        return Boolean(blockTemplate.children);
    };

    // capable
    let canDelete = !blockTemplate.lock?.includes('d');
    let canMove = !blockTemplate.lock?.includes('m');
    let canRename = !blockTemplate.lock?.includes('r');
    let canDuplicate = !blockTemplate.lock?.includes('du');
    let canInsert = !blockTemplate.lock?.includes('i');

    if (editingComponentId === id) { // add some lock to keep components
        canDelete = false;
        canMove = false;
        canDuplicate = false;
    }

    if (treeType === 'design') {
        return (
            <div className={styles.blockWrap}
                data-edit={editingDesignId === blockId}
            >
                <div className={styles.blockWrap}>
                    <ContextMenuTrigger id={blockId}>
                        <div className={styles.block}
                            data-layerid={blockId}
                            data-is={'design'}
                            onClick={() => {
                                setEditingDesignId(blockId);
                                setEditingBlock(blockId);
                            }
                            }
                        >
                            <div
                                className={styles.blockLeftSide}
                                data-is={block.m || 'e'}
                            >
                                <span className={styles.blockIcon}>{blockIcon}</span>
                                <EditableLabel
                                    initialText={
                                        defaultBlockLabel || blockTemplate.title
                                    }
                                    disabled={false}
                                    onRename={handleRenameLayer}
                                />
                            </div>
                            {editingDesignId === blockId && <div className={styles.blockActiveIcon}><CheckIcon /></div>}
                        </div>
                    </ContextMenuTrigger>
                </div>
                <ContextMenu id={blockId}>
                    <ContextMenuItem
                        onClick={() => {
                            deleteBlock(blockId)
                            setHover(null);
                        }}
                    ><div className={'contextmenu__item_with_icon'}>
                            <IconTrash style={{ width: rem(14), height: rem(14) }} />
                            Delete
                        </div></ContextMenuItem>
                    <ContextMenuItem
                        onClick={() => {
                            duplicateBlock(blockId)
                            setHover(null);
                        }}
                    ><div className={'contextmenu__item_with_icon'}>
                            <IconCopy style={{ width: rem(14), height: rem(14) }} />
                            Duplicate
                        </div></ContextMenuItem>
                </ContextMenu>
            </div>
        );

    }

    const commonetypeData: {
        blockId: string,
        page: { [key: string]: number },
        setPage: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>,
        pageBlocks: MutableRefObject<Map<string, Block>>,
        editingDesignId: string
    } = {
        blockId,
        page,
        setPage,
        pageBlocks,
        editingDesignId: editingDesignId as string
    }




    return (
        <div className={styles.blockWrap}
            data-edit={blockId === editingBlock}
            data-open={open}
            key={page[blockId]}
            data-lock={block.u.lock}
        >
            {blockId === editingBlock && <div className={styles.activeLayerIndicator} data-is={block.m || 'e'}></div>}
            <div className={styles.blockWrap}>
                <ContextMenuTrigger id={blockId} disable={type === 'a'}>
                    <div className={styles.block}
                        data-layerid={blockId}
                        data-hover={blockId === hoverId}
                        data-edit={blockId === editingBlock}
                        data-doc-active={!editingBlock && blockId === editingDesignId}
                        data-is={block.m || 'e'}
                        onMouseOver={() => { !editingBlock && setHover(blockId); }}
                        onMouseEnter={() => {
                            if (drag?.dragging && blockId !== drag?.dragging?.id) {
                                drag?.setDragHoverId(blockId);
                            }
                        }}
                        onMouseLeave={() => {
                            if (drag?.dragging && blockId !== drag?.dragging?.id) {
                                drag?.setDragHoverId(null);
                            }
                            setHover(null);
                            clearHold();
                        }}
                        onMouseUp={() => {
                            drag?.setDragging(null);
                            drag?.setDragHoverId(null);
                            if (drag?.dragging?.id && drag?.dragHoverId) {
                                drag?.handleDrop(
                                    drag?.dragging.id,
                                    drag?.dragHoverId
                                );
                            }
                            clearHold();
                        }}
                        data-dragging={blockId === drag?.dragging?.id}
                        data-draghover={type !== 'a' && blockId === drag?.dragHoverId}
                        {...dragDataProps}
                        onClick={() => {
                            handleSetEditingBlockId(blockId)
                            // setHover(blockId)
                        }
                        }
                    >
                        <div
                            className={styles.blockLeftSide}
                            data-is={block.m || 'e'}
                        >
                            {showExpand() &&
                                <ActionIcon
                                    variant="transparent"
                                    color="var(--mantine-color-dark-2)"
                                    size="sm"
                                    aria-label="Expand"
                                    style={{
                                        transform: open ? 'rotate(90deg)' : 'rotate(0)'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpen(!open);
                                    }}>
                                    <CaretRightIcon />
                                </ActionIcon>}
                            <span className={styles.blockIcon}>
                                {blockIcon}
                                {isMotionFlow &&
                                    <span className={styles.blockMotionIcon}><IconWaveSine /></span>
                                }
                            </span>
                            <EditableLabel
                                initialText={
                                    defaultBlockLabel || blockTemplate.title
                                }
                                onRename={handleRenameLayer}
                                disabled={!canRename}
                            />
                            {coid && <span className={styles.blockContainerLabel}>@{coid}</span>}
                        </div>
                        {type !== 'a' && <div
                            className={styles.blockRightSide}
                            data-is={block.m || 'e'}
                        >
                            {(block.m !== 'i' && canInsert && blockTemplate.children && open && (blockId === editingBlock)) &&
                                <ActionIcon
                                    variant="subtle"
                                    color="light"
                                    size="sm"
                                    onClick={() => setPanel({ type: 'add', data: blockId })}
                                >
                                    <IconCirclePlus size={16} />
                                </ActionIcon>
                            }
                            {block?.t === 'fr' &&
                                <div className={styles.blockRightSide_dynamicAction} data-active={block.u.hideRender}>
                                    <ActionIcon
                                        variant="subtle"
                                        color={"light"}
                                        size="sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleLayerFrameHiden();
                                        }}
                                    >
                                        <IconEyeClosed size={16} />
                                    </ActionIcon>
                                </div>}
                            <div className={styles.blockRightSide_dynamicAction} data-active={block.u.lock}>
                                <ActionIcon
                                    variant="subtle"
                                    color={"light"}
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleLayerLock(blockId);
                                    }}
                                >
                                    <IconLock size={16} />
                                </ActionIcon>
                            </div>
                            <div className={styles.blockRightSide_dynamicAction}>
                                <ActionIcon
                                    variant="subtle"
                                    color={"light"}
                                    size="sm"
                                    onMouseDown={() => {
                                        clearHold();
                                        holdTimer.current = setTimeout(() => {
                                            drag?.setDragging({
                                                id: blockId,
                                                type,
                                                cats: blockTemplate.cats,
                                                rootAllowed: blockTemplate.rootAllow,
                                            });
                                        }, 100);
                                    }}
                                >
                                    <IconGripVertical size={16} />
                                </ActionIcon>
                            </div>
                        </div>}
                        {panel?.data?.showDetails && (
                            <div className={styles.layerDetails}>
                                {<LayerDetails block={block} />}
                            </div>
                        )}
                    </div>
                </ContextMenuTrigger>
                {isParentEditing && isParentGrid &&
                    <div className={styles.blockGridItemBtn}>
                        <Popover
                            position="right"
                            withArrow shadow="md"
                            opened={parentEditingGridItemID === blockId}
                            onDismiss={() => handleSetGridItemEdit(blockId)}
                        >
                            <Popover.Target>
                                <ActionIcon
                                    variant="subtle"
                                    color={parentEditingGridItemID === blockId ? "blue" : "light"}
                                    size="sm"
                                    aria-label="edit grid area"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetGridItemEdit(blockId);
                                    }}>
                                    <ButtonIcon />
                                </ActionIcon>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <GridItemEditor id={blockId} />
                            </Popover.Dropdown>
                        </Popover>
                    </div>
                }
            </div>
            <ContextMenu id={blockId}>
                {block.m === 'c' && !editingComponentId ?
                    <ContextMenuItem
                        onClick={() => handleSetEditComponent(id)}
                    >
                        <div className={'contextmenu__item_with_icon'}>
                            <IconComponents style={{ width: rem(14), height: rem(14) }} />
                            Edit Component
                        </div>
                    </ContextMenuItem>
                    :
                    <></>}
                {block.m === 'i' ?
                    <ContextMenuItem
                        onClick={() => handleSetEditComponent(block.c?.[0] || '')}
                    >
                        <div className={'contextmenu__item_with_icon'}>
                            <IconComponents style={{ width: rem(14), height: rem(14) }} />
                            Edit Component
                        </div>
                    </ContextMenuItem>
                    :
                    <></>}
                {canConvertToComponent ?
                    <ContextMenuItem
                        onClick={() => handleConvertToComponent(id)}
                    >
                        <div className={'contextmenu__item_with_icon'}>
                            <IconTransform style={{ width: rem(14), height: rem(14) }} />
                            Convert to Component
                        </div>
                    </ContextMenuItem>
                    : <></>
                }
                {canConvertToMotionFlow ?
                    <ContextMenuItem
                        onClick={() => handleAddMotionFlow()}
                    >
                        <div className={'contextmenu__item_with_icon'}>
                            <IconWaveSine style={{ width: rem(14), height: rem(14) }} />
                            Add Motion Flow
                        </div>
                    </ContextMenuItem>
                    : <></>
                }
                {canDuplicate ? <ContextMenuItem
                    onClick={() => {
                        duplicateBlock(blockId)
                        setHover(null);
                    }}
                ><div className={'contextmenu__item_with_icon'}>
                        <IconCopy style={{ width: rem(14), height: rem(14) }} />
                        Duplicate
                    </div></ContextMenuItem> : <></>}
                <Divider />
                {canDelete ? <ContextMenuItem
                    onClick={() => {
                        deleteBlock(blockId)
                        setHover(null);
                    }}
                ><div className={'contextmenu__item_with_icon'}>
                        <IconTrash style={{ width: rem(14), height: rem(14) }} />
                        Delete
                    </div></ContextMenuItem> : <></>}
            </ContextMenu>
            {showExpand() &&
                <div className={styles.blockFolder} data-open={open}>
                    {renderChildren()}
                    {drag?.dragging?.id && canDropAsChild && <div
                        className={styles.emptydropzoon}
                        onMouseUp={() => {
                            drag.setDragging(null);
                            drag.setDragHoverId(null);
                            if (drag.dragging?.id && canDropAsChild) {
                                drag.handleDrop(
                                    drag.dragging.id,
                                    blockId,
                                    true
                                );
                            }
                        }}>
                    </div>}

                </div>
            }
        </div>
    );
};


const LayerDetails = ({ block }: { block: Block }) => {

    const details: { icon: any, label: string, id: string }[] = [];

    const inid = block.data?.options?.inid?.value;
    const vtid = block.data?.options?.vtid?.value;

    if (inid) {
        details.push(
            {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="11.001" height="15" viewBox="0 0 11.001 15">
                    <path fill="currentColor" id="Union_17" data-name="Union 17" d="M-8344.7-14116.039a.5.5,0,0,1-.3-.543l.9-5.419h-4.411a.5.5,0,0,1-.447-.276.5.5,0,0,1,.046-.521l6-8a.5.5,0,0,1,.6-.159.5.5,0,0,1,.3.543l-.9,5.415h4.412a.507.507,0,0,1,.446.276.365.365,0,0,1,.021.05h.007l0,.006a.494.494,0,0,1-.073.47l-6,8a.5.5,0,0,1-.4.2A.509.509,0,0,1-8344.7-14116.039Z" transform="translate(8349.001 14131)" />
                </svg>,
                label: inid,
                id: 'inid'
            });
    }

    if (vtid) {
        details.push(
            {
                icon: <LightningBoltIcon />,
                label: vtid,
                id: 'vtid'
            });
    }

    return (details?.map(item =>
        <div key={item.id} data-type={item.id} className={styles.layerDetailsItem}>{item.icon} {item.label}</div>
    ))
}

const TreeView = () => {

    const {
        setEditingBlock,
        setRecordHistoryHash,
        editingBlock,
        editingComponentId,
        editingDesignId,
        setEditingDesignId,
        page,
        setPage,
        pageBlocks,
        setEditingComponentId
    } = useEditorContext();

    const handleDeleteBlock = (id: string) => {
        deleteBlock(id);
    }

    const deleteBlock = (
        id: string,
    ) => {
        // Clone the pageStructure to avoid direct mutation
        // const updatedPageStructure = cloneDeep(pageStructure);

        const _page = { ...page };

        // Function to recursively delete a block and its descendants
        const deleteBlockAndDescendants = (blockId: string) => {
            const blockToDelete = pageBlocks.current.get(blockId) as Block;
            if (!blockToDelete) {
                return; // Block not found, exit recursion
            }

            // Check if blockToDelete has children before calling forEach
            if (Array.isArray(blockToDelete.c)) {
                // Recursively delete children
                blockToDelete.c.forEach((childId: string) => {
                    deleteBlockAndDescendants(childId);
                });
            }

            // Delete the block itself
            const parentId = blockToDelete?.p;

            // if (parentId) {
            const parentBlock = pageBlocks.current.get(parentId);
            // Check if parentBlock has children before modifying the array
            if (Array.isArray(parentBlock.c)) {
                parentBlock.c = parentBlock.c.filter((childId: string) => childId !== blockId);
            }

            _page[parentId] = Date.now();

            // } else {
            //     // If there is no parent, remove it from the root array
            //     const root = pageBlocks.current.get('root') as Block;
            //     let rootChildren = root.c || [];
            //     root.e!.children = rootChildren.filter((childId: string) => childId !== blockId);
            //     _page.root = Date.now();
            // }

            pageBlocks.current.delete(blockId);
            delete _page[blockId];
        };

        // Start the recursion from the given block ID
        deleteBlockAndDescendants(id);

        // Set the state with the updated
        setPage(_page);

        setRecordHistoryHash(Date.now());
        setEditingBlock(null);
        if (id === editingDesignId) {
            setEditingDesignId(null);
        }
    };

    const duplicateBlock = (id: string) => {
        const _page = { ...page };
        const duplicatedBlockIds: string[] = [];

        // Recursive function to clone a block and its descendants
        const cloneBlockAndDescendants = (
            blockId: string,
            newParentId: string
        ): string => {
            const blockToClone = pageBlocks.current.get(blockId);
            if (!blockToClone) return '';

            const existingIds = new Set<string>(pageBlocks.current.keys());
            const newInstanceBlockId = generateId(existingIds);
            const clonedBlock: Block = cloneDeep(blockToClone);

            // clonedBlock.i = newInstanceBlockId;
            clonedBlock.p = newParentId;

            duplicatedBlockIds.push(newInstanceBlockId);

            if (Array.isArray(clonedBlock.c)) {
                clonedBlock.c = clonedBlock.c.map((childId: string) =>
                    cloneBlockAndDescendants(childId, newInstanceBlockId)
                );
            }

            pageBlocks.current.set(newInstanceBlockId, clonedBlock);
            _page[newInstanceBlockId] = Date.now();

            return newInstanceBlockId;
        };

        const originalBlock = pageBlocks.current.get(id) as Block;

        const parentId = originalBlock.p;
        const newInstanceBlockId = cloneBlockAndDescendants(id, parentId);

        if (parentId) {
            const parentBlock = pageBlocks.current.get(parentId);
            if (Array.isArray(parentBlock?.c)) {
                const index = parentBlock.c.indexOf(id);
                if (index !== -1) {
                    parentBlock.c.splice(index + 1, 0, newInstanceBlockId);
                } else {
                    parentBlock.c.push(newInstanceBlockId);
                }
            }
            _page[parentId] = Date.now();

            // ✅ Safe check for props and gridLayoutMap
            const layoutMap = parentBlock?.data?.options?.gridLayoutMap?.value;
            if (layoutMap) {
                for (const key in layoutMap) {
                    const layoutEntry = layoutMap[key];
                    if (layoutEntry && layoutEntry[id]) {
                        layoutEntry[newInstanceBlockId] = cloneDeep(layoutEntry[id]);
                    }
                }
            }
        } else {
            // If it's a root block
            const root = pageBlocks.current.get('root') as Block;
            if (root && root.c) {
                const index = (root.c as string[]).indexOf(id);
                if (index !== -1) {
                    (root.c as string[]).splice(index + 1, 0, newInstanceBlockId);
                } else {
                    (root.c as string[]).push(newInstanceBlockId);
                }
                _page.root = Date.now();
            }
        }

        // ✅ Handle inid / vtid / variants references
        duplicatedBlockIds.forEach((dupId) => {
            const block = pageBlocks.current.get(dupId);
            const inid = block?.data?.options?.inid?.value;

            if (inid && !inid.startsWith('__')) {
                const existingIds = new Set<string>(pageBlocks.current.keys());
                const newInid = `${inid}_${generateId(existingIds)}`;

                if (block?.data?.options) {
                    block.data.options.inid.value = newInid;
                    duplicatedBlockIds.forEach((_id) => {
                        const _block = pageBlocks.current.get(_id) as Block;

                        // Step 1: update vtid if matches old inid
                        const vtid = _block.data?.options?.vtid?.value;
                        if (vtid && vtid === inid) {
                            _block.data.options.vtid.value = newInid;
                        }

                        // Step 2: update inid inside variants[].me[][]
                        _block?.v?.forEach((variant: any) => {
                            variant?.me?.forEach((meItem: any) => {
                                if (Array.isArray(meItem[0])) {
                                    meItem[0] = meItem[0].map((idInArray: string) =>
                                        idInArray === inid ? newInid : idInArray
                                    );
                                }
                            });
                        });
                    });
                }
            }
        });

        setPage(_page);
        // setRecordHistoryHash(Date.now());
        setEditingBlock(newInstanceBlockId);
    };


    const [hover, setHoverId] = useState<string | null>(null);

    // TODO: replace this with hover
    // const handleMessage = (event: MessageEvent) => {
    //     // Handle the received message here.
    //     const message = event.data;
    //     if (message.hoverId) {
    //         setHover(message.hoverId);
    //     }

    // };

    // useEffect(() => {
    //     window.addEventListener('message', handleMessage);
    //     return () => {
    //         window.removeEventListener('message', handleMessage);
    //     };
    // }, []);

    const setHover = (id: string | null) => {
        sendHoverIdToCanves(id);
        setHoverId(id);
    }

    const sendHoverIdToCanves = (id: string | null) => {
        const frame = document.getElementById('previewCanvas');

        const iframeWindow = (frame as HTMLIFrameElement | null)?.contentWindow;
        if (iframeWindow) {
            iframeWindow.postMessage({ hoverId: id }, '*');
        }
    }


    // drag related
    const [dragging, setDragging] = useState<null | { id: string, type: string, cats: string[], rootAllowed: boolean }>(null);
    const [dragHoverId, setDragHoverId] = useState<null | string>(null);


    const handleMouseLeave = () => {
        if (editingBlock) {
            setHover(editingBlock);
        } else {
            setHover(null);
        }
    };

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Update mouse position when dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (dragging?.id) {
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [dragging]);

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            // Capture the initial mouse pointer position when dragging starts
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Attach the mousedown event if dragging starts
        if (dragging?.id) {
            document.addEventListener('mousedown', handleMouseDown);
        }

        // Cleanup event listener when dragging stops
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [dragging]);

    let dragIcon: JSX.Element | string = '';
    if (dragging?.id) {
        const blockTemplate = blockRegistry[dragging.type];
        dragIcon = blockTemplate.icon;
    }
    const dragPlaceholder = dragging?.id && (
        <div
            className={styles.dragPlaceholder}
            data-active={true}
            style={{
                left: mousePosition.x,
                top: mousePosition.y,
            }}
        >
            {dragIcon}
        </div>
    );


    const handleDrop = (transistID: string, toId: string, direct: boolean = false) => {
        const _page = { ...page };

        const transistBlock = pageBlocks.current.get(transistID);
        if (!transistBlock) return;

        const transistBlockParentChildrens = pageBlocks.current.get(transistBlock.p || 'root')?.c || [];

        let insertPlace: string[] = [];
        let insertIndex: number = 0;

        /** 🔹 Parent Grid Cleanup */
        if (transistBlock.p) {
            const parentBlock = pageBlocks.current.get(transistBlock.p);
            //TODO this is not correct apply new structure
            const isGrid = parentBlock?.d?.st?.dt?.de?.d?.value === "gr";
            const variants = parentBlock?.v;
            if (isGrid) {
                variants?.forEach((item) => {
                    delete parentBlock?.e?.props?.gridLayoutMap?.[item.id]?.[transistID];
                });
            }
        }

        if (direct) {
            insertPlace = pageBlocks.current.get(toId || 'root')?.c as string[];

            insertIndex = insertPlace.length;
        } else {
            const targetBlock = pageBlocks.current.get(toId);
            insertPlace = pageBlocks.current.get(targetBlock?.p || 'root')?.c as string[]

            insertIndex = insertPlace.indexOf(toId);
        }

        // 🔹 Placeholder trick
        const placeholderID = "_temp";

        const originalIndex = transistBlockParentChildrens.indexOf(transistID);
        if (originalIndex !== -1) {
            transistBlockParentChildrens[originalIndex] = placeholderID;
        }

        // Insert transist block in new place
        insertPlace.splice(insertIndex, 0, transistID);

        // Remove placeholder
        const placeholderIndex = transistBlockParentChildrens.indexOf("_temp");
        if (placeholderIndex !== -1) {
            transistBlockParentChildrens.splice(placeholderIndex, 1);
        }

        // 🔹 Update parentId
        if (direct) {
            if (transistBlock.p !== toId) {
                transistBlock.p = toId;
            }
        } else {
            const targetBlock = pageBlocks.current.get(toId);
            if (targetBlock) {
                const newParentId = targetBlock.p;
                if (transistBlock.p !== newParentId) {
                    transistBlock.p = newParentId;
                }
            }
        }

        /* 🔹 If new parent is a grid, add grid data */
        if (transistBlock.p) {
            const parentBlock = pageBlocks.current.get(transistBlock.p);
            // TODO this is not correct add new structure
            const isGrid = parentBlock?.d?.st?.dt?.de?.d?.value === "gr";
            const variants = parentBlock?.v;
            if (isGrid) {
                const control = {
                    vs: "m",
                    de: {
                        d: { value: ["1/2", "1/2", "start", "start"] },
                    },
                };

                variants?.forEach((item) => {
                    if (!parentBlock?.e?.props?.gridLayoutMap) {
                        parentBlock!.e!.props!.gridLayoutMap = {};
                    }
                    if (!parentBlock!.e!.props!.gridLayoutMap[item.id]) {
                        parentBlock!.e!.props!.gridLayoutMap[item.id] = {};
                    }
                    if (!parentBlock!.e!.props!.gridLayoutMap[item.id][transistID]) {
                        parentBlock!.e!.props!.gridLayoutMap[item.id][transistID] = {};
                    }
                    parentBlock!.e!.props!.gridLayoutMap[item.id][transistID].gz = { ...control };
                });
            }
        }

        // 🔹 Mark updated blocks
        _page[transistID] = Date.now();
        if (transistBlock.p) {
            _page[transistBlock.p] = Date.now();
        } else {
            _page.root = Date.now();
        }

        setPage(_page);
    };


    const componentEditRootId = pageBlocks.current.get(editingComponentId || '')?.p || '';

    const [openDesigns, setOpenDesigns] = useState(true);

    return (
        <>
            <div
                className={styles.wrap}
                onMouseLeave={handleMouseLeave}
            >
                {editingComponentId ?
                    // pageBlocks.current.get(componentEditRootId as string)?.c?.map(rootId => (
                    <>
                        <div className={styles.componentTools}>
                            <UnstyledButton
                                className={styles.componentTools_back}
                                aria-label="Back to Layers"
                                onClick={() => {
                                    setEditingComponentId(null);
                                }}
                            >
                                <ArrowLeftIcon />Back to Layers
                            </UnstyledButton>
                        </div>
                        <TreeNode
                            blockId={editingComponentId}
                            deleteBlock={handleDeleteBlock}
                            duplicateBlock={duplicateBlock}
                            hoverId={hover}
                            setHover={setHover}
                            drag={{
                                dragging, setDragging,
                                dragHoverId, setDragHoverId,
                                handleDrop
                            }}
                        />
                    </>
                    // ))
                    :
                    <>
                        <div className={styles.designFiles}>
                            <div className={styles.designFiles_header}>
                                <div className={styles.designFiles_title}>
                                    <ActionIcon
                                        variant="transparent"
                                        color="var(--mantine-color-dark-2)"
                                        size="sm"
                                        aria-label="Expand"
                                        style={{
                                            transform: openDesigns ? 'rotate(90deg)' : 'rotate(0)'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDesigns(!openDesigns);
                                        }}>
                                        <CaretRightIcon />
                                    </ActionIcon>
                                    Kits
                                </div>
                                {openDesigns && <ActionIcon
                                    variant="transparent"
                                    color="gray"
                                    size="sm"
                                    onClick={() => {
                                        addDesignStarter({
                                            setEditingBlock: (id: string | null) => {
                                                setEditingDesignId(id);
                                                setEditingBlock(id);
                                            },
                                            setPage,
                                            pageBlocks,
                                            props: {}
                                        });
                                        // addBlock({
                                        //     type: 'design',
                                        //     parentId: 'root',
                                        //     setEditingBlock: (id: string | null) => {
                                        //         setEditingDesignId(id);
                                        //         setEditingBlock(id);
                                        //     },
                                        //     page,
                                        //     setPage,
                                        //     pageBlocks,
                                        //     props: {}
                                        // });
                                    }}
                                >
                                    <PlusIcon />
                                </ActionIcon>}
                            </div>
                            {
                                openDesigns && <div className={styles.designFiles_content}>
                                    {
                                        (pageBlocks.current?.get('root')?.c as string[])?.map(rootId => {
                                            const designFile = pageBlocks.current?.get(rootId);
                                            if (!designFile) { return }

                                            return <div key={rootId}>
                                                <TreeNode
                                                    blockId={rootId}
                                                    deleteBlock={handleDeleteBlock}
                                                    duplicateBlock={duplicateBlock}
                                                    hoverId={hover}
                                                    setHover={setHover}
                                                    treeType={'design'}
                                                    drag={{
                                                        dragging, setDragging,
                                                        dragHoverId, setDragHoverId,
                                                        handleDrop
                                                    }}
                                                />
                                            </div>
                                        })
                                    }
                                </div>
                            }
                        </div>
                        {editingDesignId && pageBlocks.current.get(editingDesignId as string)?.c?.map(rootId => {
                            // sync to latest
                            const versionId = page[editingDesignId];

                            return <div key={rootId + versionId}>
                                <TreeNode
                                    blockId={rootId}
                                    deleteBlock={handleDeleteBlock}
                                    duplicateBlock={duplicateBlock}
                                    hoverId={hover}
                                    setHover={setHover}
                                    drag={{
                                        dragging, setDragging,
                                        dragHoverId, setDragHoverId,
                                        handleDrop
                                    }}
                                />
                            </div>
                        })}
                    </>
                }
                {dragPlaceholder}
                {/* {rootButton} */}
            </div >
            {dragging?.id && <div
                className={styles.dragbase}
                onMouseUp={() => setDragging(null)}
            ></div>
            }
        </>
    );
};

export default TreeView;


const EditableLabel = ({
    initialText,
    onRename,
    disabled
}: {
    initialText: string;
    onRename: (newText: string) => void;
    disabled: boolean
}) => {
    const [isLabelRenaming, setIsLabelRenaming] = useState(false);
    const [text, setText] = useState(initialText);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Focus input when renaming starts
    useEffect(() => {
        if (isLabelRenaming) {
            inputRef.current?.focus();
        }
    }, [isLabelRenaming]);

    const handleBlur = (e) => {
        e.stopPropagation();
        setIsLabelRenaming(false);
        if (text !== initialText) {
            onRename(text); // Send updated text to parent
        }
    };

    return (
        <>
            {isLabelRenaming ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    placeholder={initialText}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleBlur} // Hide input on focus out & send update
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleBlur(e); // Save on Enter
                    }}
                    style={{
                        outline: 0,
                        border: 0,
                        background: "#fff",
                        color: "#333",
                    }}
                />
            ) : (
                <span
                    style={{
                        minWidth: 20,
                        minHeight: 24,
                        display: "flex",
                        alignItems: "center",
                    }}
                    onDoubleClick={() => !disabled && setIsLabelRenaming(true)}
                >
                    {text || initialText}
                </span>
            )}
        </>
    );
};