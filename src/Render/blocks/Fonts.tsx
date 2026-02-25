import React, { ReactElement, useRef, useState } from 'react'
import { Block, useEditorContext } from '../../BlockEditor/EditorContext'
import * as styles from './css/Fonts.module.css';


function Fonts({ id, block, children }: {
    id: string,
    block: Block,
    children?: React.ReactNode; 
}) {
    const el = useRef<HTMLDivElement | null>(null);
    return (
        <>
            <div
                ref={el}
                className={id}
            >
                <div className={styles.section_title}>Fonts</div>
                <div className={styles.fonts}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Fonts


export function Font({ id, block }: {
    id: string,
    block: Block,
    children?: React.ReactNode; 
}) {
    const { colorMode } = useEditorContext();
    const el = useRef<HTMLDivElement | null>(null);

    const fontName = block.l;
    const fontData = block.data?.options?.f?.value;

    const titlePreviews = [
        "Explore the Future of Design",
        "Creativity Meets Technology",
        "Innovate, Inspire, Ignite",
        "Designing Tomorrow Today",
        "Crafting Experiences That Matter"
    ];

    // Random selector function
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const [previewText] = useState(getRandomItem(titlePreviews));

    return (
        <>
            <div
                ref={el}
                className={styles.fontCard}
                style={{
                    opacity: fontData ? 1 : 0.4,
                }}
                data-node={id}
            >
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        padding: 8,
                        textTransform: 'capitalize'
                    }}>
                        <span>{fontName}</span>
                        <span
                            style={{
                                fontWeight: 200,
                                opacity: .6
                            }}
                        >{(fontData?.[2] || []).join(', ')}</span>

                    </div>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 24,
                        fontWeight: 400,
                        padding: 8,
                        gap: 4,
                        fontFamily: `var(--addifect-f-${fontName})`,
                        lineHeight: 1
                    }}>{fontData?.[0]}</div>
                    <span
                        style={{
                            fontWeight: 400,
                            padding: 8,
                            opacity: .4
                        }}
                    >{fontData?.[1]}</span>
                </div>
            </div>
        </>
    )
}
