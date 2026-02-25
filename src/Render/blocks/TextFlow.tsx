import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Block, useEditorContext } from '../../BlockEditor/EditorContext'
import { generateBlockCSS } from '../core/generateBlockCSS';
import { expandDesign } from '../../BlockEditor/util/styleCodec';
import { BlockFlow, BlockFlowContext } from '../../RenderEngine/BlockFlowContext';
import { useSurfaceContext } from '../../RenderEngine/SurfaceContext';
import Conductor, { Resolver } from '../core/animationEngine';
import syncAnimationsWithVariantStyles from '../core/syncAnimationsWithVariantStyles';


function TextFlow({ id, block, part, children }: {
    id: string,
    block: Block,
    children?: React.ReactNode;
    part: boolean
}) {

    const { editingBlock, editingVariant, colorMode } = useEditorContext();

    const parentData = useContext(BlockFlowContext);
    // Theme Inheritance Chain
    const globalTheme = colorMode;
    const parentTheme = parentData?.parentTheme;
    const resolvedTheme = parentTheme || globalTheme; // here add local option to colormode


    const updatedParentData = useMemo<BlockFlow>(
        () => ({
            ...parentData,
            parentTheme: resolvedTheme
        }),
        [parentTheme, resolvedTheme]
    );

    const animations = block.a || {};

    const animationKeys = [
        ...new Set(
            Object.values(animations)
                .flatMap(obj => Object.keys(obj))
        )
    ];

    const designData = block.data?.design;

    const { properties, css } = generateBlockCSS(id, designData || {}, false, animationKeys, editingBlock === id);
    const _id = `block-style-${id}`;

    useEffect(() => {
        let styleTag = document.getElementById(id) as HTMLStyleElement | null;

        // Create <style> if not exists
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = id;
            styleTag.type = "text/css";
            document.head.appendChild(styleTag);
        }

        // Update CSS content
        // styleTag.textContent = properties;

        // Cleanup when component unmounts
        return () => {
            if (styleTag && styleTag.parentNode) {
                styleTag.parentNode.removeChild(styleTag);
            }
        };
    }, [id, properties]);



    const el = useRef<HTMLDivElement | null>(null);

    const data: { [key: string]: any } = {}
    if (!part) {
        data['data-node'] = id
    }

    data['data-variant'] = editingBlock === id ? editingVariant : 'base';

    const getValue = (property: string) => {
        return block.data?.options?.[property]?.value || ''
    }

    return (
        <BlockFlowContext.Provider value={updatedParentData}>
            <style>{css}</style>
            <div
                ref={el}
                // onMouseOver={() => applyVariantAnimation(el.current, id, animations['base-hover'])}
                // onMouseLeave={() => applyVariantAnimation(el.current, id, animations['hover-base'])}
                className={id}

                {...data}
            >
                {getValue('ct')}
            </div>
        </BlockFlowContext.Provider>
    )
}

export function TextFlowRender({ id, block, part, children }: {
    id: string,
    block: Block,
    part: boolean,
    children?: ReactElement | ReactElement[];
}) {

    const nodeRef = useRef(null);
    const [isInFold, setIsInFold] = useState(false);
    const [variant, setVariant] = useState('base');

    // const designData = expandDesign(block?.d || '');
    const animations = block.a || {};

    const { colorMode, newVariantTriggerMap, newHandleVariantChange } = useSurfaceContext();

    const parentData = useContext(BlockFlowContext);
    // Theme Inheritance Chain
    const globalTheme = colorMode;
    const parentTheme = parentData?.parentTheme;
    const resolvedTheme = id === 'NxSG' ? 'l' : parentTheme || globalTheme; // here add local option to colormode

    // add options for this
    const containerId = null;
    const localTheme = id === 'NxSG' ? 'l' : null;
    const gradMode = null;

    const [sensors, setSensors] = useState({ isDark: resolvedTheme === 'd', bp: 9999 });

    // Dependency should be the raw string, not the parsed object
    const design = useMemo(() => {
        const data = expandDesign(block?.d || '');
        return data?.base || {};
    }, [block?.d]); // Only re-run if the string source changes

    const blockId = id;

    // Dynamic CSS for Path 0 (SSR & Base reactivity)
    const dynamicCSS = useMemo(() => {
        let css = `.${blockId} { --container-bp: 9999; `;
        Object.entries(design).forEach(([k, prop]) => {
            let val = prop.value;
            if (val && typeof val === 'object' && ('l' in val || 'd' in val)) {
                val = (resolvedTheme === 'd') ? (val.d || val.l) : (val.l || val.d);
            }
            css += `--${k}: ${val}; `;
        });
        css += `} `;

        const allPts = new Set();
        Object.values(design).forEach(p => p.m && Object.keys(p.m).forEach(pt => allPts.add(Number(pt))));
        [...allPts].sort((a, b) => b - a).forEach(pt => {
            css += `@container (width <= ${pt}px) { .${blockId} { --container-bp: ${pt}; `;
            Object.entries(design).forEach(([k, prop]) => {
                if (prop.m && prop.m[pt]) {
                    const over = prop.m[pt];
                    const v = (typeof over === 'object' && over !== null && 'v' in over) ? over.v : over;
                    css += `--${k}: ${v}; `;
                }
            });
            css += `} } `;
        });
        return css;
    }, [blockId, design, resolvedTheme]);


    useEffect(() => {
        const foldObs = new IntersectionObserver(([e]) => setIsInFold(e.isIntersecting), { threshold: 0.1 });

        const targetContainer = containerId ? document.querySelector(`[data-node-id="${containerId}"]`) : null;
        const watchEl = targetContainer || document.body;

        const resObs = new ResizeObserver(() => {
            if (nodeRef.current) setSensors(Resolver.getSensors(nodeRef.current, watchEl, localTheme));
        });

        if (nodeRef.current) foldObs.observe(nodeRef.current);
        resObs.observe(watchEl);

        return () => { foldObs.disconnect(); resObs.disconnect(); };
    }, [containerId]);


    // Reactive Baseline Update
    useEffect(() => {
        if (!nodeRef.current || variant !== 'base') return;
        const targetContainer = containerId ? document.querySelector(`[data-node-id="${containerId}"]`) : null;
        const watchEl = targetContainer || document.body;

        const currentSensors = Resolver.getSensors(nodeRef.current, watchEl, localTheme);
        setSensors(currentSensors);

        Object.entries(design).forEach(([k, propData]) => {
            nodeRef.current.style.setProperty(`--${k}`, String(Resolver.resolve(propData, currentSensors)));
        });
    }, [resolvedTheme, sensors.bp, design, variant, containerId, localTheme]);


    const trigger = (target) => {
        if (target === variant) return;
        const timeline = block.a?.[`${variant}-${target}`];
        if (timeline && nodeRef.current) Conductor.animate(nodeRef.current, timeline, sensors);
        setVariant(target);
    };

    const variantRef = useRef<string>(variant);
    useEffect(() => {
        variantRef.current = variant;
    }, [variant]);


    useEffect(() => {
        newVariantTriggerMap.current.byId[id] = (target: string) => {
            const current = variantRef.current;
            if (target === current) return;

            let animation = syncAnimationsWithVariantStyles(block.a || {}, block.data?.design || {});

            const timeline = animation?.[`${current}-${target}`];
            if (timeline && nodeRef.current) {
                Conductor.animate(nodeRef.current, timeline, sensors);
            }

            setVariant(target);
        };

        if (block.data?.options?.vtid?.value) {
            const vtid = block.data.options.vtid.value;
            if (!newVariantTriggerMap.current.trigger[vtid]) {
                newVariantTriggerMap.current.trigger[vtid] = []
            }

            if (!newVariantTriggerMap.current.trigger[vtid].includes(id)) {
                newVariantTriggerMap.current.trigger[vtid].push(id)
            }

        }

    }, []);


    const gradClass = gradMode === 'linear' ? 'god-grad-linear' : gradMode === 'radial' ? 'god-grad-radial' : '';



    const updatedParentData = useMemo<BlockFlow>(
        () => ({
            ...parentData,
            parentTheme: resolvedTheme
        }),
        [parentTheme, resolvedTheme]
    );

    // const { editingBlock, editingVariant } = useEditorContext();


    const animationKeys = [
        ...new Set(
            Object.values(animations)
                .flatMap(obj => Object.keys(obj))
        )
    ];


    // const { properties, css } = generateBlockCSS(id, designData, true, animationKeys, false);
    const _id = `block-style-${id}`;

    // useEffect(() => {
    //     let styleTag = document.getElementById(_id) as HTMLStyleElement | null;

    //     // Create <style> if not exists
    //     if (!styleTag) {
    //         styleTag = document.createElement("style");
    //         styleTag.id = _id;
    //         styleTag.type = "text/css";
    //         document.head.appendChild(styleTag);
    //     }

    //     // Update CSS content
    //     styleTag.textContent = properties + css;

    //     // Cleanup when component unmounts
    //     return () => {
    //         if (styleTag && styleTag.parentNode) {
    //             styleTag.parentNode.removeChild(styleTag);
    //         }
    //     };
    // }, [_id, css]);



    const el = useRef<HTMLDivElement | null>(null);

    const data: { [key: string]: any } = {}
    if (!part) {
        data['data-node'] = id
    }

    // data['data-variant'] = 'base'

    const getValue = (property: string) => {
        return block.data?.options?.[property]?.value || ''
    }

    return (
        <BlockFlowContext.Provider value={updatedParentData}>
            <style>{dynamicCSS}</style>
            <div
                ref={nodeRef}
                data-node-id={id}
                data-node-theme={resolvedTheme}
                className={`addifect-base-node ${blockId} ${gradClass} ${isInFold ? 'addifect-base-node-active' : ''}`}
                onMouseEnter={(e) => { e.stopPropagation(); newHandleVariantChange(id, 'hover'); }}
                onMouseLeave={(e) => { e.stopPropagation(); newHandleVariantChange(id, 'base'); }}

                {...data}
            >
                {getValue('ct')}
            </div>
        </BlockFlowContext.Provider>
    )
}

export default TextFlow
