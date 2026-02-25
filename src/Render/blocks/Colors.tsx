import React, { ReactElement, useRef, useState } from 'react'
import { Block, useEditorContext } from '../../BlockEditor/EditorContext'
import * as styles from './css/Colors.module.css';
import { ColorPicker, Popover, Switch } from '@mantine/core';
import { GearIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

function isLightColor(hex: string) {
    const c = hex.replace("#", "");
    const r = parseInt(c.substr(0, 2), 16) / 255;
    const g = parseInt(c.substr(2, 2), 16) / 255;
    const b = parseInt(c.substr(4, 2), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.5;
}


function Colors({ id, block, children }: {
    id: string,
    block: Block,
    children?: React.ReactNode;
}) {
    const { pageBlocks } = useEditorContext();

    const el = useRef<HTMLDivElement | null>(null);

    const assetsBlock = pageBlocks.current.get(block.p) as Block;
    const options = assetsBlock.data?.options?.default?.value;


    const getValue = (key: string) => {
        return options?.[key] || ''
    }

    const enabledColormod = getValue('tcme');


    const defaultColorModeLabel = () => {
        const defaultColorMode = getValue('tcmd');
        let label = <><span className={styles.info_mode}><GearIcon /></span>Auto</>;

        if (defaultColorMode === 'l') {
            label = <><span className={styles.info_mode}><SunIcon /></span>Sun</>;
        }
        if (defaultColorMode === 'd') {
            label = <><span className={styles.info_mode}><SunIcon /></span>Dark</>;
        }
        return label;
    }


    return (
        <>
            <div
                ref={el}
                className={id}
                data-node={id}
            >
                <div>
                    <div className={styles.info_title}>Color Theme</div>
                    <div className={styles.info_description}>
                        {enabledColormod === 'ld' ?
                            <>
                                Active color modes
                                <span className={styles.info_mode}><SunIcon /></span> + <span className={styles.info_mode}><MoonIcon /></span>,
                                default mode is {defaultColorModeLabel()}
                            </>
                            :
                            <>
                                Active color mode
                                {
                                    enabledColormod === 'l'
                                        ? <span className={styles.info_mode}><SunIcon /></span>
                                        : <span className={styles.info_mode}><MoonIcon /></span>
                                }
                                {enabledColormod === 'l' ? 'Light' : 'Dark'}
                            </>
                        }


                    </div>
                </div>
                <div className={styles.section_title} >Colors</div>
                <div className={styles.colors}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Colors


const systemRoles = ['text', 'background'];

export function Color({ id, block }: {
    id: string,
    block: any, // Typed as any for flexibility based on your snippet
   children?: React.ReactNode;
}) {
    const { colorMode, setPage } = useEditorContext();

    // Data extraction
    const label = block?.l;
    const palette = block?.data?.options?.p?.value || [];

    const defaultShades = block?.data?.options?.c?.value;

    // State
    const [editing, setEditing] = useState<null | number>(null); // Controls which popover is open
    const [activeColor, setActiveColor] = useState(6); // Index of color being previewed

    // Derived values
    const previewColorValue = palette[activeColor] || '#fff';
    const textColor = isLightColor(previewColorValue) ? "#000000" : "#ffffff";

    const handleColorPreviewChange = (index: number) => {
        setActiveColor(index);
    }

    const handleEditColor = (index: number, newHash: string) => {
        // 2. Direct Mutation for immediate UI feedback (Visual only)
        // Note: In strict React this should be local state, but since we rely on 
        // block.data reference, we mutate the array specifically for the ColorPicker feedback
        palette[index] = newHash;

        setPage((prev: any) => {
            return { ...prev, [id]: Date.now() }
        });
    }

    const handleSetShade = (checked: boolean, mode: 'l' | 'd', i: number) => {
        if (block?.data?.options?.c?.value) {
            block.data.options.c.value[mode] = checked ? i : null;
            setPage((prev: any) => {
                return { ...prev, [id]: Date.now() }
            });
        }

    }

    return (
        <div
            className={styles.colorCard}
            style={{ background: palette[activeColor] }}
            data-node={id}
        >
            <div className={styles.colorCard_info} style={{ color: textColor }}>
                <div className={styles.colorCard_title}>
                    <span>{label}</span>
                    <span>{activeColor}</span>
                </div>
                <div>
                    <span className={styles.colorCard_hex}>{palette[activeColor]}</span>
                </div>
            </div>

            <div
                className={styles.colorCard_stripeWrap}
                onMouseLeave={() => handleColorPreviewChange(6)}
            >
                <div className={styles.colorCard_stripe}>
                    {palette?.map((color: string, i: number) => (
                        <Popover
                            // FIX: Use index as key. If you use 'color', the popover remounts on every change
                            key={i}
                            position="bottom"
                            withArrow
                            shadow="md"
                            // FIX: Control the open state explicitly
                            opened={editing === i}
                            onChange={(opened) => {
                                if (!opened) setEditing(null);
                            }}
                        >
                            <Popover.Target>
                                <div
                                    className={styles.colorCard_stripe_item}
                                    style={{
                                        background: color,
                                        color: isLightColor(color) ? "#000000" : "#ffffff"
                                    }}
                                    onMouseEnter={() => handleColorPreviewChange(i)}
                                    onClick={() => setEditing(i)}

                                >
                                    {systemRoles.includes(label) && <>
                                        {defaultShades?.l == i && <SunIcon />}
                                        {defaultShades?.d == i && <MoonIcon />}
                                    </>
                                    }
                                </div>
                            </Popover.Target>

                            <Popover.Dropdown style={{ padding: 2 }}>
                                {/* Stop propagation to prevent closing when clicking inside picker */}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <ColorPicker
                                        value={color}
                                        onChange={(v) => handleEditColor(i, v)}
                                    // Optional: If you want to close specifically on swatch click, 
                                    // check if your picker has a 'onSwatchClick' event.
                                    />
                                    {systemRoles.includes(label) &&
                                        <div className={styles.set_wrap}>
                                            <div className={styles.set_title}>Set as default shade</div>
                                            <div className={styles.set_actions}>
                                                <div className={styles.set_action}>
                                                    <SunIcon />
                                                    <Switch
                                                        checked={defaultShades?.l == i}
                                                        onChange={(e) => handleSetShade(e.currentTarget.checked, 'l', i)}
                                                    />
                                                </div>
                                                <div className={styles.set_action}>
                                                    <MoonIcon />
                                                    <Switch
                                                        checked={defaultShades?.d == i}
                                                        onChange={(e) => handleSetShade(e.currentTarget.checked, 'd', i)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </Popover.Dropdown>
                        </Popover>
                    ))}
                </div>
            </div>
        </div>
    )
}