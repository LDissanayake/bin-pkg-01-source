import React from 'react'
import { deviceData } from './EditCanvas';
import * as styles from './Artboard.module.css';
import { Block, useEditorContext } from '../EditorContext';
import ArtboardRender from '../../Render/artboard/ArtboardRender';
import genBlockData from '../util/blockDataUtils';
import FrameResizeController from './FrameResizeController';

interface GlobalStyleProps {
    lightMode: string;
    darkMode: string;
}

interface GlobalStyleProps {
    lightMode: string;
    darkMode: string;
    common: string;
}


export function InlineGlobalStyle({ lightMode, darkMode, common }: GlobalStyleProps) {
    return (
        <style>
            {`
        :root {
            ${common}
        }
        [data-color-mode="d"] {
          ${darkMode}
        }

        [data-color-mode="l"] {
          ${lightMode}
        }

        .artboard-content {
          background: var(--addifect-color-background);
          color: var(--addifect-color-text);
          font-family: var(--addifect-font-body);
          margin: 0;
          padding: 0;
          position: relative;
        }
      `}
        </style>
    );
}


function Artboard({
    currentDeviceData,
    label,
    id,
    item,
    entry,
    globalVariables
}:
    {
        artboardStructure: any,
        currentDeviceData: deviceData,
        label: string,
        id: string,
        item: Block,
        entry: string[],
        globalVariables: { lightMode: string; darkMode: string; common: string; }
    }) {
    const { colorMode, pageBlocks, zoom, editingBlock } = useEditorContext();

    genBlockData(item);

    const { x, y } = item.data?.options?.p?.value || { x: 0, y: 0 };
    const w = item.data?.options?.w?.value || currentDeviceData.width;
    const vh = item.data?.options?.vh?.value || currentDeviceData.height;

    /* show placeholder if render false */
    const renderPlaceholder = item?.u?.hideRender;

    const th = item.data?.options?.th?.value;
    const tf = item.data?.options?.tf?.value;

    const headerTemplateId = th;
    const headerEntry = pageBlocks.current.get(headerTemplateId)?.c;

    const footerTemplateId = tf;
    const footerEntry = pageBlocks.current.get(footerTemplateId)?.c;

    const lock = item?.u?.lock || false;

    return (
        <div className={styles.wrap}
            data-node={id}
            data-lock={lock}
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <div className={styles.header}>
                <div className={styles.header_content}>
                    <span className={styles.header_label}>{label}</span>
                </div>
            </div>
            <div
                className={styles.content}
            >
                {
                    renderPlaceholder ?
                        <div
                            style={{
                                width: w,
                                minHeight: currentDeviceData.height,
                                border: '2px dashed var(--mantine-color-dark-4)'
                            }}
                        />

                        :

                        <div
                            className='artboard'
                            data-color-mode={colorMode}
                            style={{
                                width: w,
                                minHeight: currentDeviceData.height,
                                borderRadius: item?.t === 'assets' ? 12 : 0
                            }}
                        >
                            <InlineGlobalStyle
                                lightMode={globalVariables.lightMode}
                                darkMode={globalVariables.darkMode}
                                common={globalVariables.common}
                            />
                            <div
                                className='artboard-content axd-root'
                                data-color-mode={colorMode}
                                style={{
                                    '--aw': w,
                                    '--ah': vh,
                                    width: w,
                                    minHeight: currentDeviceData.height,
                                    borderRadius: item?.t === 'assets' ? 12 : 0
                                }}
                            >

                                {headerEntry &&
                                    <div className={styles.partWrapper}>
                                        <div style={{ pointerEvents: 'none' }}>
                                            <ArtboardRender
                                                entry={headerEntry || []}
                                                part
                                            />
                                        </div>
                                    </div>
                                }
                                <ArtboardRender entry={entry} part={false} />
                                {footerEntry &&
                                    <div className={styles.partWrapper}>
                                        <div style={{ pointerEvents: 'none' }}>
                                            <ArtboardRender
                                                entry={footerEntry || []}
                                                part
                                            />
                                        </div>
                                    </div>
                                }
                            { editingBlock === id && <FrameResizeController/>}
                            </div>
                        </div>
                }
            </div>
        </div >
    )
}

export default Artboard