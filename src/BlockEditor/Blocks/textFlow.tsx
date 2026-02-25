import React, { useEffect, useRef, useState } from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { TextIcon } from '@radix-ui/react-icons';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import { CloseIcon, Input } from '@mantine/core';
import * as styles from './css/base.module.css';

// --- New 12-Color Pro Palette (Related to rgb(148, 163, 184)) ---
const COLOR_PALETTE = [
    { color: 'rgb(148, 163, 184)', boxShadow: 'rgba(148, 163, 184, 0.4)' }, // Slate (Base)
    { color: 'rgb(129, 140, 248)', boxShadow: 'rgba(129, 140, 248, 0.4)' }, // Indigo
    { color: 'rgb(244, 63, 94)', boxShadow: 'rgba(244, 63, 94, 0.4)' },   // Rose
    { color: 'rgb(16, 185, 129)', boxShadow: 'rgba(16, 185, 129, 0.4)' },  // Emerald
    { color: 'rgb(245, 158, 11)', boxShadow: 'rgba(245, 158, 11, 0.4)' },  // Amber
    { color: 'rgb(6, 182, 212)', boxShadow: 'rgba(6, 182, 212, 0.4)' },   // Cyan
    { color: 'rgb(168, 85, 247)', boxShadow: 'rgba(168, 85, 247, 0.4)' },  // Purple
    { color: 'rgb(249, 115, 22)', boxShadow: 'rgba(249, 115, 22, 0.4)' },  // Orange
    { color: 'rgb(236, 72, 153)', boxShadow: 'rgba(236, 72, 153, 0.4)' },  // Pink
    { color: 'rgb(20, 184, 166)', boxShadow: 'rgba(20, 184, 166, 0.4)' },  // Teal
    { color: 'rgb(132, 204, 22)', boxShadow: 'rgba(132, 204, 22, 0.4)' },  // Lime
    { color: 'rgb(59, 130, 246)', boxShadow: 'rgba(59, 130, 246, 0.4)' }   // Blue
];

const ICONS: { [key: string]: any } = {
    in: <svg width="12" height="12" viewMicro Flow="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="1.5" height="1.5" rx="0.75" fill="#888" />
        <path d="M2 2L7 7M7 7V4M7 7H4" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    en: <svg width="12" height="12" viewMicro Flow="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6V10H6" stroke="#888" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2L7 7M7 7V4M7 7H4" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    lv: <svg width="12" height="12" viewMicro Flow="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6V10H6" stroke="#888" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 7L2 2M2 2V5M2 2H5" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    ex: <svg width="12" height="12" viewMicro Flow="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2V10" stroke="#888" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 6H11M11 6L9 4M11 6L9 8" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    rt: <svg width="12" height="12" viewMicro Flow="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2V10" stroke="#888" strokeWidth="1" strokeLinecap="round" />
        <path d="M6 6H1M1 6L3 4M1 6L3 8" stroke="rgba(148, 163, 184, 1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}


const VariantMapSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {
    const variants = block?.v || [];

    const handleSetVariant = (index: number, event: string, value: string | null) => {
        if (value) {
            variants[index][event] = value;
        } else {
            delete variants[index][event];
        }
        block.v = variants;

        updated(); // update page
    }

    const colorRef = useRef<{ [key: string]: any }>({});
    const [mount, setMount] = useState(0);

    useEffect(() => {
        variants.map((item, variantIndex) => {
            colorRef.current[item.id] = COLOR_PALETTE[variantIndex] || COLOR_PALETTE[1];
        })
        setMount(Date.now());
    }, []);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return <div className={styles.map_wrapper} key={mount}>
        {
            variants.map((item, variantIndex) => {
                const isOpen = openIndex === variantIndex;

                return <div className={styles.map_item}>
                    <div className={styles.map_item_header}
                        onClick={() => handleToggle(variantIndex)}
                    >
                        <span className={styles.map_item_header_color} style={{
                            background: colorRef.current[item.id]?.color,
                            boxShadow: `${colorRef.current[item.id]?.boxShadow} 0px 0px 8px`
                        }}></span>
                        <span className={styles.map_item_header_title}>{item.id}</span>
                        <div className={styles.mini_map}>
                            {
                                !isOpen && ['in', 'en', 'lv', 'ex', 'rt'].map(event => {
                                    const currentId = item[event];
                                    if (!currentId) { return }
                                    return <div className={styles.mini_map_item}>
                                        <div className={styles.mini_map_item_icon}>{ICONS[event]}</div>
                                        <div className={styles.mini_map_item_color}
                                            style={{
                                                background: colorRef.current[currentId]?.color,
                                                boxShadow: `${colorRef.current[currentId]?.boxShadow} 0px 0px 8px`
                                            }}
                                        >
                                        </div>
                                    </div>
                                })

                            }
                        </div>
                    </div>
                    {/* CONTENT */}
                    {isOpen && (
                        <div className={styles.map_item_content}>
                            {[
                                { e: 'en', l: 'Mouse enter' },
                                { e: 'lv', l: 'Mouse leave' },
                                { e: 'ex', l: 'Exit' },
                                { e: 'rt', l: 'Return' },
                            ].map((eventItem, i) => {
                                const value = item[eventItem.e];
                                return <div className={styles.panel}>
                                    <div className={styles.panel_detail}>
                                        <div className={styles.panel_detail_left}>
                                            <div className={styles.panel_detail_icon}>
                                                {ICONS[eventItem.e]}
                                            </div>
                                            <div className={styles.panel_detail_label}>{eventItem.l}</div>
                                        </div>
                                        <div className={styles.panel_detail_variant}>{value}</div>
                                    </div>
                                    <div className={styles.panel_switches}>
                                        <div
                                            className={`${styles.panel_switch} ${styles.panel_switch_close}`}
                                            data-active={!value}
                                            onClick={() => handleSetVariant(
                                                variantIndex,
                                                eventItem.e,
                                                null
                                            )}
                                        ><CloseIcon /></div>
                                        <div className={styles.panel_switch_spacer}></div>
                                        {
                                            variants.map((switchItem, i) => {
                                                if (switchItem.id === item.id) { return; }
                                                return <div
                                                    className={styles.panel_switch}
                                                    data-active={value === switchItem.id}
                                                    style={{
                                                        background: colorRef.current[switchItem.id]?.color,
                                                        boxShadow: value === switchItem.id ? `${colorRef.current[switchItem.id]?.boxShadow} 0px 0px 8px` : 'none'
                                                    }}
                                                    onClick={() => handleSetVariant(
                                                        variantIndex,
                                                        eventItem.e,
                                                        switchItem.id
                                                    )}
                                                >{value === switchItem.id && <boxShadowOuterIcon />}</div>
                                            })
                                        }

                                    </div>
                                </div>
                            })}
                        </div>
                    )}
                </div>
            })
        }

    </div>
}


const InteractiveIdSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks } = useEditorContext()



    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash


    const handleChange = (v: string) => {
        if (block.data?.options) {
            const sv = sanitizeName(v);
            block.data.options.inid = { value: sv }
            updated();
        }
    }


    const getValue = () => {
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
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={getValue()}
        />
    </div>
}

const VariantOptionSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks } = useEditorContext()

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash


    const handleChange = (v: string) => {
        if (block.data?.options) {
            const sv = sanitizeName(v);
            block.data.options.vtid = { value: sv }
            updated();
        }
    }


    const getValue = () => {
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
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={getValue()}
        />
    </div>
}


const ContentSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) => {
        return v.replace(/<[^>]*>/g, '');
    };



    const property = 'ct';

    const handleChange = (v: string) => {
        const options = block.data?.options;
        if (!options) return;

        const sv = sanitizeName(v);

        // ensure object exists
        if (!options[property]) {
            options[property] = {
                value: '',
                vs: 'm',
            };
        }

        // update value only
        options[property].value = sv;

        updated();
    };

    const getValue = () => {
        return block.data?.options?.[property]?.value || ''
    }

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Text</span>
        <Input
            variant="filled"
            size="xs"
            radius="xl"
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={getValue()}
        />
    </div>
}

// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Text Flow',
    icon: <TextIcon />,
    cats: ['basic'],
    type: 'tf',
    children: false,
    rootAllow: false,
    designSections: [
        'position',
        'size',
        'spacing',
        'border',
        'layout',
        'typography',
        'transform',
        'transformSpace',
        'backdropFilter',
        'visibility',
        'background'
    ],
    props: {
        design: `
            base{}
        `,
        options: 't=section;dv=base;ct=Text',
        animations: {},
        variants: [{ id: 'base' }],
        designTypes: {},
    },
    optionSections: [
        { label: 'Content', component: ContentSection },
        { label: 'Interactve', component: InteractiveIdSection },
        { label: 'Variant Interaction Map', component: VariantMapSection },
        { label: 'Variant Options', component: VariantOptionSection }
    ]
};

// Create a new block instance
const TextFlow = new Block(blockConfig);

export default TextFlow;
