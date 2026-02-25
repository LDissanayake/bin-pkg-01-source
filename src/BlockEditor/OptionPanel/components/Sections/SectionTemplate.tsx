import React, { ReactElement, useLayoutEffect, useRef } from 'react';
import * as styles from './SectionTemplate.module.css';

const GRID_ROW = 26;
const GRID_GAP = 2;
const GRID_UNIT = GRID_ROW + GRID_GAP; // 28px

const SectionTemplate = ({ 
    title, 
    children, 
    open,
    buttons,
}: { title: string, children: React.JSX.Element, open: boolean }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ref for inner content wrapper 

    // useLayoutEffect(() => {
    //     if (!open || !sectionRef.current || !contentRef.current) return;

    //     const updateHeight = () => {
    //         // 1. Reset height to auto to get the natural size
    //         sectionRef.current!.style.height = 'auto';
            
    //         // 2. Measure the actual height of the content
    //         const naturalHeight = contentRef.current!.getBoundingClientRect().height;

    //         // 3. Calculate how many "rows" this takes up
    //         // Math.ceil ensures we always grow to fit, never cut off
    //         const rows = Math.ceil(naturalHeight / GRID_UNIT);
            
    //         // 4. Calculate the snapped height
    //         const snappedHeight = (rows * GRID_UNIT ) - GRID_GAP;

    //         // 5. Apply the new height
    //         sectionRef.current!.style.height = `${snappedHeight}px`;
    //     };

    //     // Create observer to watch for content changes (e.g., children updating)
    //     const observer = new ResizeObserver(() => {
    //         // updateHeight();
    //     });

    //     observer.observe(contentRef.current);

    //     // Initial calculation
    //     updateHeight();

    //     return () => observer.disconnect();
    // }, [open, children]); // Re-run if open state or children change

    if (open) {
        return (
            <div 
                className={styles.section} 
                ref={sectionRef}
                style={{ overflow: 'hidden' }} // Ensure content doesn't spill out of the snapped height
            >
                {/* We wrap everything in a ref-referenced div to measure content size 
                   independent of the outer container's forced height.
                */}
                <div ref={contentRef}> 
                    <div className={styles.section_title}>
                        <div className={styles.section_title_col}>
                            <span>{title}</span>
                        </div>
                        <div className={styles.section_title_actions}>
                             {buttons}
                        </div>
                    </div>

                    <div className={styles.section_content}>
                        {children}
                    </div>
                </div>
            </div>
        );
    } else {
        return 'close state';
    }
};

export default SectionTemplate;

export const ControlWrap = ({ title, children }: { title: string, children: React.ReactElement<any, string | React.JSXElementConstructor<any>> }) => {
    return <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6
        }}
    >
        <span
            style={{
                fontSize: 11,
                userSelect: 'none',
                flex: 2
            }}
        >{title}</span>
        <div style={{flex: 1}}>{children}</div>
    </div>
}