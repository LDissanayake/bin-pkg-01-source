import React, { useState } from 'react';
import { ArchiveIcon } from "@radix-ui/react-icons";
import { Block, BlockConfig } from './blockTemplate';
import DragNumberInput from '../OptionPanel/components/Controls/DragNumberInput';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import ColorPickerControl from '../OptionPanel/components/Controls/ColorPickerControl';
import { Switch } from '@mantine/core';
import genBlockData from '../util/blockDataUtils';
import { Block as BlockType } from '../EditorContext';
import { IconBrandWordpress, IconCheck, IconLoader2 } from '@tabler/icons-react';
import { setActiveKitConnection } from '../../util/wpApi';

const SizeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
    <g id="Rectangle_4711" data-name="Rectangle 4711" fill="none" stroke="currentColor" strokeWidth="1">
        <rect width="12" height="12" rx="2" stroke="none" />
        <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="none" />
    </g>
    <rect id="Rectangle_4712" data-name="Rectangle 4712" width="1" height="10" transform="translate(3 1)" fill="currentColor" />
    <rect id="Rectangle_4713" data-name="Rectangle 4713" width="1" height="10" transform="translate(1 4) rotate(-90)" fill="currentColor" />
</svg>


const WorkSpaceSection = ({ block, updated }: { block: EditorBlock, updated: () => void; }) => {

    const handleChange = (value: any, property: string) => {
        if (!block) { return }

        if (value && block.data?.options) {
            if (block?.data?.options?.[property]?.value) {
                block.data.options[property].value = value;
            } else {
                // add property
                block.data.options[property] = { value, vs: 'm' };
            }
        }

        updated();

    }

    const getValue = (property: string) => {
        return block?.data?.options?.[property]?.value || ''
    }

    const getPlaceholder = (property: string) => {
        return block?.data?.options?.[property]?.value || ''
    }

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Surface</span>
        <DragNumberInput
            value={getValue('size')}
            placeholder={getPlaceholder('size')}
            onChange={(v: string) => { handleChange(v, 'size') }}
            icon={<SizeIcon />}
            min={10}
            max={100}
        />
        <ColorPickerControl
            currentColor={getValue('bg')}
            onChange={(v: {
                l: string;
                d: string;
            }) => { handleChange(v, 'bg') }}
        />
    </div>
}


const ConnectionSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks, setPage, editingDesignId, postData } = useEditorContext();
    const root = pageBlocks.current.get('root') as BlockType;

    if (root) {
        genBlockData(root);
    }

    const rootOptions = root?.data?.options as any;

    const [checked, setChecked] = useState(rootOptions?.ad?.value === id);
    const [saving, setSaving] = useState(false);

    const handleChange = async (value: boolean) => {
        // Only proceed if turning ON (connecting)
        if (!value) return;

        setSaving(true);
        setChecked(true);

        try {
            /**
             * 1. Trigger the API Sync
             * kit_id comes from the current block ID
             * design_id comes from context (the overall design file post ID)
             */
            await setActiveKitConnection({
                kit_id: id,
                design_id: parseInt(postData.id as string)
            });

            // 2. Internal State Logic
            const designBlock = pageBlocks.current.get(editingDesignId as string);
            const designOptions = designBlock?.data?.options;
            const assetId = designOptions?.assid?.value;

            if (assetId && designOptions.tp.value) {
                designOptions.tp.value[assetId as string] = true;
            }

            if (!rootOptions) {
                root.data = {
                    options: {},
                    design: {}
                }
            }

            (root.data as any).options.ad = { value: id };

            // 3. Update Editor State
            setPage(prev => ({
                ...prev,
                root: Date.now(),
                [id]: Date.now()
            }));

            // Notify parent if needed
            updated();

        } catch (error) {
            console.error("Connection failed", error);
            setChecked(false); // Revert UI if API fails
        } finally {
            setSaving(false);
        }
    }

    return (
        <div style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            minHeight: 32
        }}>
            {checked ? (
                <div
                    style={{
                        display: 'flex',
                        gap: 6,
                        alignItems: 'center',
                        background: '#1d1d1d',
                        padding: '4px 12px 4px 4px',
                        borderRadius: 20,
                        opacity: saving ? 0.7 : 1
                    }}
                >
                    <IconBrandWordpress size={20} stroke={1.5} color='#228be6' />
                    <span
                        style={{
                            fontSize: 11,
                            color: '#69db7c',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        {saving ? (
                            <IconLoader2 size={14} className="animate-spin" />
                        ) : (
                            <IconCheck size={14} stroke={1.5} color='#69db7c' />
                        )}
                        {saving ? 'Connecting...' : 'Connected'}
                    </span>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        gap: 6,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    <span
                        style={{
                            fontSize: 11,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            minHeight: 32
                        }}
                    >
                        <IconBrandWordpress size={20} stroke={1.5} />
                        Connect to Site
                    </span>
                    <Switch
                        checked={checked}
                        loading={saving}
                        onChange={(event) => !checked && handleChange(event.currentTarget.checked)}
                        disabled={checked || saving}
                    />
                </div>
            )}
        </div>
    );
}


// Initial block configuration
const config: BlockConfig = {
    title: 'Design',
    icon: <ArchiveIcon />,
    cats: [],
    type: 'de',
    children: true,
    rootAllow: true,
    childCats: ['frame'],
    props: {
        options: 'size=10; bg=#414141~#141414; assid=null; tp=()',
    },
    designSections: null,
    optionSections: [
        { label: 'WorkSpace', component: WorkSpaceSection },
        { label: 'Connection', component: ConnectionSection },
    ]
};

// Create a new block instance
const block = new Block(config);

export default block;