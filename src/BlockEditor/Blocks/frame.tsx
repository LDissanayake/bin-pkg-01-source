import React, { MutableRefObject } from 'react';
import { FrameIcon } from '../components/ToolBarIcons';
import { Block, BlockConfig } from './blockTemplate';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import { SegmentedControl, Select } from '@mantine/core';
import SelectWithIconControl from '../OptionPanel/components/Controls/SelectWithIconControl';
import { IconLayoutBottombar, IconLayoutNavbar } from '@tabler/icons-react';

export const handleFrameTypes = (
    {
        frameType,
        blockId,
        page,
        setPage,
        pageBlocks,
        editingDesignId,
        markFrameDirty
    }: {
        frameType: string,
        blockId: string,
        page: { [key: string]: number },
        setPage: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>,
        pageBlocks: MutableRefObject<Map<string, EditorBlock>>,
        editingDesignId: string,
        markFrameDirty: (frameId: string, modify?: boolean, remove?: boolean) => void;
    }
) => {

    const updatedPage = { ...page };

    const frameBlock = pageBlocks.current.get(blockId);

    const options = frameBlock?.data?.options;
    const currentType = options?.type.value;

    // Remove from dirty list.
    markFrameDirty(blockId, false, true);
    // Remove usefor option if exist.
    if (options?.usefor?.value) {
        options.usefor.value = null
    }

    if (currentType === 'header' || currentType === 'footer') {
        const frames = pageBlocks.current.get(editingDesignId as string)?.c || [];
        /* 
         * Remove this frame ID if it is referenced as a template in other frames 
         */
        frames?.forEach((frameId, i) => {
            const frame = pageBlocks.current.get(frameId);

            if (frame) {
                const keys = { header: 'th', footer: 'tf' }
                const key = keys[currentType as 'header' | 'footer'];

                const tempId = frame?.data?.options?.[key]?.value;

                if (tempId === blockId && frame?.data?.options) {
                    frame.data.options[key] = {
                        value: null
                    }

                    updatedPage[frameId] = Date.now() + i;
                }
            }
        });

    }

    if (options) {
        options.type = { value: frameType }
    }

    const designBlock = pageBlocks.current.get(editingDesignId as string);
    const designOptions = designBlock?.data?.options;

    if (designOptions?.tp?.value) {
        delete designOptions.tp.value[blockId];
    }

    updatedPage[blockId as string] = Date.now();
    updatedPage[editingDesignId as string] = Date.now();

    setPage(updatedPage);
}

const AssignmentSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const {
        page,
        setPage,
        pageBlocks,
        editingDesignId,
        markFrameDirty
    } = useEditorContext();

    const handleChange = (value: any, property: string) => {
        if (!block) { return }

        if (block.o) { //TODO review this
            if (block?.data?.options?.[property]) {
                block.data.options[property].value = value;
            } else {
                // add property
                if (block.data) {
                    if (!block.data.options) {
                        block.data.options = {}
                    }
                    block.data.options[property] = {
                        vs: 'm',
                        value
                    }
                }
            }
        }

        if (property === 'usefor') {
            markFrameDirty(id, false, value ? false : true);
        } else if (property === 'ufs') {
            markFrameDirty(id, false, value === 'on' ? false : true);
        }

        updated();

    }

    const getValue = (property: string) => {
        return block?.data?.options?.[property]?.value || ''
    }

    const canPublish = () => {
        const root = pageBlocks.current.get('root') as any;
        if ((root.data as any)?.options?.ad?.value === editingDesignId) {
            return true;
        }
        return false;
    }

    const isPart = getValue('type') !== 'page';

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Frame type</span>
        <Select
            variant="filled"
            size="xs"
            radius="xl"
            allowDeselect={false}
            defaultValue='page'
            data={[
                { label: 'Page', value: 'page' },
                { label: 'Header', value: 'header' },
                { label: 'Footer', value: 'footer' },
                { label: 'loader', value: 'loader' },
            ]}
            value={getValue('type')}
            onChange={(value) => value && handleFrameTypes({
                frameType: value,
                blockId: id,
                page,
                setPage,
                pageBlocks,
                editingDesignId: editingDesignId as string,
                markFrameDirty
            })
            }
            w="100%"
        />

        {canPublish() &&
            getValue('type') === 'page' && <>
                <span style={{ fontSize: 11 }}>Use for</span>
                <Select
                    variant="filled"
                    size="xs"
                    radius="xl"
                    allowDeselect={true}
                    placeholder='select'
                    data={[
                        { label: 'Home', value: 'home' },
                        // { label: 'Posts', value: 'posts' },
                        // { label: 'Page', value: 'single-page' },
                        // { label: 'Archive', value: 'archive' },
                        // { label: 'Search', value: 'search' },
                        { label: '404', value: '404' },
                        // { label: 'Page Template', value: 'page-template' },
                    ]}
                    value={getValue('usefor')}
                    onChange={(value) => handleChange(value, 'usefor')}
                    w="100%"
                />
            </>
        }

        {isPart &&
            <>
                <span style={{ fontSize: 11 }}>Use on Site</span>
                <SegmentedControl
                    value={getValue('ufs')}
                    onChange={(value) => handleChange(value, 'ufs')}
                    data={[
                        { label: 'On', value: 'on' },
                        { label: 'Off', value: 'off' },
                    ]}
                    fullWidth
                    size="xs"
                    radius='xl'
                />
            </>
        }
    </div>
}

const LayoutSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks, editingDesignId, markFrameDirty } = useEditorContext();

    const getSetData = () => {
        const frames =
            pageBlocks.current.get(editingDesignId as string)?.c || [];

        const result: {
            headerData: Array<{ label: string; value: string }>;
            footerData: Array<{ label: string; value: string }>;
        } = {
            headerData: [],
            footerData: []
        };

        frames.forEach(frameId => {
            const frame = pageBlocks.current.get(frameId);
            if (!frame) return;

            const frameType = frame.data?.options?.type?.value;

            if (frameType === 'header' || frameType === 'footer') {
                result[`${frameType}Data`].push({
                    label: frame.l || frameType,
                    value: frameId
                });
            }
        });

        return result;
    };

    const { headerData, footerData } = getSetData();

    const onChange = (type: 'header' | 'footer', id: string) => {
        const keys = { header: 'th', footer: 'tf' }
        const key = keys[type];

        const options = block.data?.options;

        if (options && key) {
            options[key] = { value: id }
            updated();
        }
    }

    const getValue = (type: 'header' | 'footer') => {
        const keys = { header: 'th', footer: 'tf' }
        const key = keys[type];

        const options = block.data?.options;

        return options?.[key]?.value;
    }

    return <div
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12
        }}
    >
        <SelectWithIconControl
            value={getValue('header')}
            onChange={(v) => onChange('header', v)
            }
            icon={<IconLayoutNavbar stroke={1.5} size={14} />}
            data={headerData}
            placeholder='Select header'
        />
        <SelectWithIconControl
            value={getValue('footer')}
            onChange={(v) => onChange('footer', v)
            }
            icon={<IconLayoutBottombar stroke={1.5} size={14} />}
            data={footerData}
            placeholder='Select footer'
        />
    </div>
}

// Initial block configuration
const config: BlockConfig = {
    title: 'Frame',
    icon: <FrameIcon />,
    cats: ['frame'],
    type: 'fr',
    children: true,
    rootAllow: false,
    childCats: ['basic', 'layout', 'template'],
    props: {
        options: 'p=(x:0,y:0);type=page;th=null;tf=null;ufs=off'
    },
    designSections: null,
    optionSections: [
        { label: 'Assignment', component: AssignmentSection },
        { label: 'Layout', component: LayoutSection, condition: 'type=page' },
    ]
};

// Create a new block instance
const block = new Block(config);

export default block;

