import React, { useEffect, useRef, useState } from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { BoxIcon, ComponentInstanceIcon, DimensionsIcon, GridIcon, MaskOffIcon, ShadowInnerIcon, ShadowOuterIcon, TokensIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import { ActionIcon, Button, CloseIcon, Input, Select } from '@mantine/core';


export const CustomizeOptionSection = ({
    id,
    block,
    updated,
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
}) => {
    const { pageBlocks } = useEditorContext();

    const componentId = block.c?.[0];
    if (!componentId) return null;

    const componentBlock = pageBlocks.current.get(componentId);
    if (!componentBlock) return null;

    const componentVars = componentBlock.data?.options?.vars?.value || {};

    // ---------------------------------------------------------------------------
    // Ensure instance vars option exists
    // ---------------------------------------------------------------------------
    if (block.data?.options && !block.data.options.vars) {
        block.data.options.vars = { value: {} };
    }

    const instanceVars = block.data.options.vars.value;

    // ---------------------------------------------------------------------------
    // Handlers
    // ---------------------------------------------------------------------------
    const handleVarChange = (vid: string, value: any) => {
        instanceVars[vid] = value;
        updated();
    };

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.values(componentVars).map((v: any) => {
                const currentValue =
                    instanceVars[v.id] !== undefined
                        ? instanceVars[v.id]
                        : v.default ?? '';

                // ---------------------------------------------------------------
                // Type: simple text ("t")
                // ---------------------------------------------------------------
                if (v.type === 't') {
                    return (
                        <div
                            key={v.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 6,
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ fontSize: 11 }}>
                                {v.name}
                            </span>

                            <Input
                                variant="filled"
                                size="xs"
                                radius="xl"
                                value={currentValue}
                                onChange={(e) =>
                                    handleVarChange(
                                        v.id,
                                        e.currentTarget.value
                                    )
                                }
                            />
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
};

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Instance',
    icon: <ComponentInstanceIcon />,
    cats: [],
    type: 'i',
    children: true,
    rootAllow: false,
    childCats: ['basic'],
    designSections: [],
    props: {
        options: 'vars=()',
        mode: 'i'
    },
    optionSections: [
        { label: 'Customize', component: CustomizeOptionSection, },
    ]
};

// Create a new block instance
const instance = new Block(blockConfig);

export default instance;
