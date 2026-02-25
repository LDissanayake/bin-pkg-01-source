import React, {  } from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { TextIcon } from '@radix-ui/react-icons';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import { Divider, Input, Textarea } from '@mantine/core';
import * as styles from './css/base.module.css';
import { IconVariable } from '@tabler/icons-react';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, Submenu } from 'rctx-contextmenu';
import { InteractiveIdSection, VariantMapSection, VariantOptionSection } from './optionSections/Common';
import TypoSection from './optionSections/TypoSection';


type ComponentVar = {
    id: string;
    name: string;
    type: 't';
    default: any;
};


const ContentSection = ({
    id,
    block,
    updated,
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
}) => {
    const { pageBlocks, editingComponentId} = useEditorContext();


    const PROPERTY = 'ct';

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    const options = block.data?.options;
    const option = options?.[PROPERTY];

    const value = option?.value || '';
    const valueSource = option?.vs || 'm';

    const ensureOption = () => {
        if (!options) return false;
        if (!options[PROPERTY]) {
            options[PROPERTY] = { value: '', vs: 'm' };
        }
        return true;
    };

    const setValue = (v: string) => {
        if (!ensureOption()) return;
        options![PROPERTY].value = v;
        updated();
    };

    const setValueSource = (vs: string) => {
        if (!ensureOption()) return;
        options![PROPERTY].vs = vs;
        updated();
    };

    // ---------------------------------------------------------------------------
    // Variables
    // ---------------------------------------------------------------------------
    const getVariables = (type: ComponentVar['type']): ComponentVar[] => {
        if (!editingComponentId) return [];

        const componentBlock = pageBlocks.current.get(editingComponentId);
        if (!componentBlock) return [];

        const vars = componentBlock.data?.options?.vars?.value || {};
        return Object.values(vars).filter(
            (v): v is ComponentVar => v.type === type
        );
    };

    const textVars = editingComponentId ? getVariables('t') : [];


    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
            }}
        >
            <ContextMenuTrigger id="content">
                <span style={{ fontSize: 11 }}>Text</span>
            </ContextMenuTrigger>

            {valueSource === 'var' ? (
                <div className={styles.controlVariablePreview}>
                    <div className={styles.controlVariablePreviewIcon}>
                        <IconVariable />
                    </div>
                    {value}
                </div>
            ) : (
                <Textarea
                    variant="filled"
                    size="xs"
                    radius="xs"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    minRows={40}
                    maxRows={60}
                    resize="vertical"
                />
            )}

            {/* ================= Context Menu ================= */}
            <ContextMenu id="content">
                {textVars.length > 0 ? (
                    <Submenu
                        title={`${valueSource === 'var' ? 'Change' : 'Set'} Variable`}
                    >
                        {textVars.map((v) => (
                            <ContextMenuItem
                                key={v.id}
                                disabled={value === v.id}
                                onClick={() => {
                                    setValueSource('var');
                                    setValue(v.id);
                                }}
                            >
                                {v.name}
                            </ContextMenuItem>
                        ))}

                        {valueSource === 'var' && (
                            <>
                                <Divider />
                                <ContextMenuItem
                                    onClick={() => {
                                        setValueSource('m');
                                        setValue('');
                                    }}
                                >
                                    Remove Variable
                                </ContextMenuItem>
                            </>
                        )}
                    </Submenu>
                ) : <></>}
            </ContextMenu>
        </div>
    );
};

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Text',
    icon: <TextIcon />,
    cats: ['basic'],
    type: 't',
    children: false,
    rootAllow: false,
    designSections: ['typography'],
    props: {
        design: `
            base{}
        `,
        options: 't=section;dv=base;',
        animations: {},
        variants: [{ id: 'base' }],
        designTypes: '',
        lt: 'bl',
        mode: 'e',
    },
    optionSections: [
        { label: 'Content', component: ContentSection },
        { label: 'Type', component: TypoSection },
        { label: 'Interactve', component: InteractiveIdSection },
        { label: 'Variant Interaction Map', component: VariantMapSection },
        { label: 'Variant Options', component: VariantOptionSection },
    ]
};

// Create a new block instance
const Text = new Block(blockConfig);

export default Text;
