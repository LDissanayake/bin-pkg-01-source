import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ShadowOuterIcon } from '@radix-ui/react-icons';
import { Block as EditorBlock, useEditorContext } from '../../EditorContext';
import { CloseIcon, Input, SegmentedControl, Switch, TagsInput } from '@mantine/core';
import * as styles from './Common.module.css';
import { compactDesign } from '../../util/styleCodec';
import KVParser from '../../util/KVParser';

type VariantKey = 'base' | string;

interface ChangePayload {
    value: string;
    property: string;
    variant: VariantKey;
}

// --- New 12-Color Pro Palette (Related to rgb(148, 163, 184)) ---
const COLOR_PALETTE = [
    { color: 'rgb(148, 163, 184)', shadow: 'rgba(148, 163, 184, 0.4)' }, // Slate (Base)
    { color: 'rgb(129, 140, 248)', shadow: 'rgba(129, 140, 248, 0.4)' }, // Indigo
    { color: 'rgb(168, 85, 247)', shadow: 'rgba(168, 85, 247, 0.4)' },  // Purple
    { color: 'rgb(6, 182, 212)', shadow: 'rgba(6, 182, 212, 0.4)' },   // Cyan
    { color: 'rgb(16, 185, 129)', shadow: 'rgba(16, 185, 129, 0.4)' },  // Emerald
    { color: 'rgb(245, 158, 11)', shadow: 'rgba(245, 158, 11, 0.4)' },  // Amber
    { color: 'rgb(249, 115, 22)', shadow: 'rgba(249, 115, 22, 0.4)' },  // Orange
    { color: 'rgb(20, 184, 166)', shadow: 'rgba(20, 184, 166, 0.4)' },  // Teal
    { color: 'rgb(244, 63, 94)', shadow: 'rgba(244, 63, 94, 0.4)' },   // Rose
    { color: 'rgb(236, 72, 153)', shadow: 'rgba(236, 72, 153, 0.4)' },  // Pink
    { color: 'rgb(132, 204, 22)', shadow: 'rgba(132, 204, 22, 0.4)' },  // Lime
    { color: 'rgb(59, 130, 246)', shadow: 'rgba(59, 130, 246, 0.4)' }   // Blue
];

const ICONS: { [key: string]: any } = {
    in: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="1.5" height="1.5" rx="0.75" fill="#888" />
        <path d="M2 2L7 7M7 7V4M7 7H4" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    en: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6V10H6" stroke="#888" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2L7 7M7 7V4M7 7H4" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    lv: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6V10H6" stroke="#888" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7L2 2M2 2V5M2 2H5" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    ex: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2V10" stroke="#888" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 6H11M11 6L9 4M11 6L9 8" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    rt: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2V10" stroke="#888" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 6H1M1 6L3 4M1 6L3 8" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}


/* ----------------------------------
   Component
----------------------------------- */
export const VariantMapSection = ({
    id,
    block,
    updated
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
}) => {

    const { page } = useEditorContext();
    const variants = block?.v ?? [];
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Color storage (stable, no rerenders)
    const colorRef = useRef<Record<string, { color: string; shadow: string }>>({});

    /* ----------------------------------
       Assign colors when variants change
    ----------------------------------- */
    useEffect(() => {
        variants.forEach((variant, index) => {
            if (!colorRef.current[variant.id]) {
                colorRef.current[variant.id] = COLOR_PALETTE[index % COLOR_PALETTE.length];
            }
        });
    }, [page[id]]); // or [variants] if you fix mutations properly


    /* ----------------------------------
       Handlers
    ----------------------------------- */
    const handleToggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    const handleSetVariant = (
        index: number,
        event: string,
        value: string | null
    ) => {
        const next = [...variants];

        if (value) {
            next[index][event] = value;
        } else {
            delete next[index][event];
        }

        block.v = next;
        updated();
    };

    /* ----------------------------------
       Render
    ----------------------------------- */
    return (
        <div className={styles.map_wrapper} key={page[id] + 'vm'}>
            {variants.map((item, variantIndex) => {
                const isOpen = openIndex === variantIndex;
                const selfColor = colorRef.current[item.id];

                return (
                    <div key={item.id} className={styles.map_item}>
                        {/* HEADER */}
                        <div
                            className={styles.map_item_header}
                            data-open={isOpen}
                            onClick={() => handleToggle(variantIndex)}
                        >
                            <span
                                className={styles.map_item_header_color}
                                style={{
                                    background: selfColor?.color,
                                    boxShadow: `${selfColor?.shadow} 0 0 8px`
                                }}
                            />
                            <span className={styles.map_item_header_title}>
                                {item.id}
                            </span>

                            {/* MINI MAP */}
                            <div className={styles.mini_map}>
                                {!isOpen &&
                                    // ['in', 'en', 'lv', 'ex', 'rt'].map(event => {
                                    ['en', 'lv'].map(event => {
                                        const targetId = item[event];
                                        if (!targetId) return null;

                                        const targetColor =
                                            colorRef.current[targetId];

                                        return (
                                            <div
                                                key={event}
                                                className={styles.mini_map_item}
                                            >
                                                <div className={styles.mini_map_item_icon}>
                                                    {ICONS[event]}
                                                </div>
                                                <div
                                                    className={styles.mini_map_item_color}
                                                    style={{
                                                        background: targetColor?.color,
                                                        boxShadow: `${targetColor?.shadow} 0 0 8px`
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* CONTENT */}
                        {isOpen && (
                            <div className={styles.map_item_content}>
                                {[
                                    { e: 'en', l: 'Mouse enter' },
                                    { e: 'lv', l: 'Mouse leave' },
                                    // { e: 'ex', l: 'Exit' },
                                    // { e: 'rt', l: 'Return' }
                                ].map(({ e, l }) => {
                                    const value = item[e];

                                    return (
                                        <div key={e} className={styles.panel}>
                                            <div className={styles.panel_detail}>
                                                <div className={styles.panel_detail_left}>
                                                    <div className={styles.panel_detail_icon}>
                                                        {ICONS[e]}
                                                    </div>
                                                    <div className={styles.panel_detail_label}>
                                                        {l}
                                                    </div>
                                                </div>
                                                <div className={styles.panel_detail_variant}>
                                                    {value}
                                                </div>
                                            </div>

                                            <div className={styles.panel_switches}>
                                                <div
                                                    className={`${styles.panel_switch} ${styles.panel_switch_close}`}
                                                    data-active={!value}
                                                    onClick={() =>
                                                        handleSetVariant(variantIndex, e, null)
                                                    }
                                                >
                                                    <CloseIcon />
                                                </div>

                                                <div className={styles.panel_switch_spacer} />

                                                {variants.map(v => {
                                                    if (v.id === item.id) return null;

                                                    const c = colorRef.current[v.id];

                                                    return (
                                                        <div
                                                            key={v.id}
                                                            className={styles.panel_switch}
                                                            data-active={value === v.id}
                                                            style={{
                                                                background: c?.color,
                                                                boxShadow:
                                                                    value === v.id
                                                                        ? `${c?.shadow} 0 0 8px`
                                                                        : 'none'
                                                            }}
                                                            onClick={() =>
                                                                handleSetVariant(
                                                                    variantIndex,
                                                                    e,
                                                                    v.id
                                                                )
                                                            }
                                                        >
                                                            {value === v.id && <ShadowOuterIcon />}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};


export const InteractiveIdSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { editingVariant } = useEditorContext();

    const designData = block?.data?.design;

    /**
     * Generic design change handler
     */
    const handleChange = useCallback(
        ({ value, property, variant }: ChangePayload) => {
            if (!designData || !value) return;

            designData[variant] ??= {};
            designData[variant][property] ??= { vs: 'm', value };

            designData[variant][property].value = value;

            block.d = compactDesign(designData);
            updated();
        },
        [block, designData, updated]
    );

    /**
     * Helpers for inputs
     */
    const getValue = (property: string, variant: VariantKey) =>
        designData?.[variant]?.[property]?.value ?? '';

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash


    const handleOptionChange = (v: string) => {
        if (block.data?.options) {
            const sv = sanitizeName(v);
            block.data.options.inid = { value: sv }
            updated();
        }
    }


    const getOptionValue = () => {
        return block.data?.options?.inid?.value || ''
    }

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Interactive Id</span>
        <Input
            variant="filled"
            size="xs"
            radius="xl"
            onChange={(e) => handleOptionChange(e.currentTarget.value)}
            value={getOptionValue()}
        />

        <span style={{ fontSize: 11 }}>Pointer</span>
        <SegmentedControl
            size="xs"
            style={{ border: '1px solid var(--in-c)', fontSize: 11, fontWeight: 300 }}
            withItemsBorders={false}
            value={getValue('pe', editingVariant) || editingVariant === 'base' && 'auto'}
            onChange={(value) => handleChange({ value, property: 'pe', variant: editingVariant })}
            data={[
                { label: 'Auto', value: 'auto' },
                { label: 'None', value: 'none' },
            ]}
        />
    </div>
}

export const VariantOptionSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks } = useEditorContext()

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash


    const handleOptionChange = (v: string) => {
        if (block.data?.options) {
            const sv = sanitizeName(v);
            block.data.options.vtid = { value: sv }
            updated();
        }
    }


    const getOptionValue = () => {
        return block.data?.options?.vtid?.value || ''
    }

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Variant Trigger By</span>
        <Input
            variant="filled"
            size="xs"
            radius="xl"
            onChange={(e) => handleOptionChange(e.currentTarget.value)}
            value={getOptionValue()}
        />
    </div>
}


export const ContainerSection = (
    {
        id,
        block,
        updated,
        buttonPass,
        sectionId
    }:
        {
            id: string,
            block: EditorBlock,
            updated: () => void;
            buttonPass: (sectionId: string, btn: JSX.Element) => void;
            sectionId: string;
        }
) => {

    const { editingVariant } = useEditorContext();

    const designData = block?.data?.design;

    /**
    * Parse dt once and memoize it
    * avoids parsing on every render / function call
    */
    const parsedData = useMemo(() => {
        if (!block?.dt) return {};
        return KVParser.parse(block.dt);
    }, [block?.dt]);

    /**
     * is container
     * 1 = true 
     * 0 = false
     */
    const isContainer = parsedData.isc ?? '0';


    /**
     * Pass header button
     * uses latest display mode because dependencies are correct
     */
    useEffect(() => {
        buttonPass(
            sectionId,
            <Switch
                checked={isContainer !== '0'}
                onChange={() =>
                    handleDisplayMode(
                        isContainer === '0' ? '1' : '0'
                    )
                }
                color="rgb(153 177 210)"
                size="xs"
                radius="xs"
            />
        );
    }, [sectionId, isContainer]);

    /**
     * Update display mode safely
     */
    const handleDisplayMode = useCallback((isc: string) => {
        if (!block) return;

        const nextData = {
            ...parsedData,
            isc
        };

        block.dt = KVParser.stringify(nextData);

        updated();
    }, [block, parsedData]);

    /**
     * Generic design change handler
     */
    const handleChange = useCallback(
        ({ value, property, variant }: ChangePayload) => {
            if (!designData || !value) return;

            designData[variant] ??= {};
            designData[variant][property] ??= { vs: 'm', value };

            designData[variant][property].value = value;

            block.d = compactDesign(designData);
            updated();
        },
        [block, designData, updated]
    );

    /**
     * Helpers for inputs
     */
    const getValue = (property: string, variant: VariantKey) =>
        designData?.[variant]?.[property]?.value ?? '';

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash

    const handleOptionChange = (property: string, v: string) => {
        if (block.data?.options) {
            block.data.options[property] = { value: v }
            updated();
        }
    }


    const getOptionValue = (property: string) => {
        return block.data?.options?.[property]?.value || ''
    }


    // function sanitizeContainerSizes(values: string[]): string {
    //     const cleaned = values
    //         .map(v => v.replace(/\D/g, '')) // remove non-digits
    //         .filter(v => v.length > 0)      // remove empty
    //         .map(Number)                    // convert to number
    //         .sort((a, b) => a - b);         // ascending

    //     return cleaned.join(' ');
    // }

    function sanitizeContainerSizes(values: string[]): string[] {
        const cleaned = values
            .map(v => v.replace(/\D/g, '')) // remove non-digits
            .filter(v => v.length > 0)      // remove empty
            .map(v => String(Number(v)))   // normalize (removes leading zeros)
            .sort((a, b) => Number(a) - Number(b)); // numeric sort

        return cleaned;
    }


    function parseSpaceList(value?: string): string[] {
        return (value ?? '')
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    }

    const [sizes, setSizes] = useState<string[]>(parseSpaceList(getOptionValue('cos')));

    const handleContainerSize = (value: string[]) => {
        const stringValue = sanitizeContainerSizes(value).join(' ');
        console.log(stringValue, 'string value');
        
        handleOptionChange('cos', stringValue );
        setSizes(sanitizeContainerSizes(value));
    }


    return <>
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            alignItems: 'center'
        }}>
            {
                isContainer === '1' &&
                <>
                    <span style={{ fontSize: 11 }}>Container Id</span>
                    <Input
                        variant="filled"
                        size="xs"
                        radius="xl"
                        onChange={(e) => handleOptionChange('coid', sanitizeName(e.currentTarget.value))}
                        value={getOptionValue('coid')}
                    />
                </>
            }
        </div>
        {
            getOptionValue('coid') &&
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
            }}>
                <span style={{ fontSize: 11 }}>Container Sizes</span>
                <TagsInput
                    value={sizes}
                    onChange={(value) => handleContainerSize(value)}
                />

                <span className={styles.info}>
                <span>Sizes are in px. Each value creates a max-width container breakpoint (applies up to that size and down).</span>
                </span>
            </div>
        }
    </>
}