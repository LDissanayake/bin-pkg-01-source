import React, { ReactElement, useContext, useEffect, useMemo, useRef } from 'react'
import { Block, useEditorContext } from '../../BlockEditor/EditorContext'
import { BlockFlow, BlockFlowContext } from '../../RenderEngine/BlockFlowContext'
import { useSurfaceContext } from '../../RenderEngine/SurfaceContext'

// -----------------------------------------------------------------------------
// Shared / cross-layer hooks
// -----------------------------------------------------------------------------
import { useResolvedTheme } from './hooks/useResolvedTheme'
import { useVariantState } from './hooks/useVariantState'
import { useVariantAnimations } from './hooks/useVariantAnimations'
import { useComponentVariables } from './hooks/useComponentVariables'

// -----------------------------------------------------------------------------
// Editor-only hooks
// -----------------------------------------------------------------------------
import { useBlockDesignEditor } from './hooks/useBlockDesignEditor'

// -----------------------------------------------------------------------------
// Runtime-only hooks
// -----------------------------------------------------------------------------
import { useBlockDesignRuntime } from './hooks/useBlockDesignRuntime'
import { useBlockSensors } from './hooks/useBlockSensors'
import KVParser from '../../BlockEditor/util/KVParser'
import { useBlockStyle } from './hooks/styleBucket/useBlockStyle'


/**
 * ============================================================================
 * Base (EDITOR VERSION)
 * - Used inside editor canvas
 * - Reacts to editingVariant / editingBlock
 * - No runtime animations or sensors
 * ============================================================================
 */
export function Base({
    id,
    block,
    part,
    children
}: {
    id: string
    block: Block
    part: boolean
    children?: ReactElement | ReactElement[]
}) {

    // DOM reference for this block
    const nodeRef = useRef<HTMLDivElement | null>(null)

    // Editor state (active block / active variant / color mode)
    const { colorMode, editingVariant, editingBlock } = useEditorContext()

    // Parent flow data (theme + component/instance variables)
    const parentData = useContext(BlockFlowContext)

    // Resolve final theme (global → parent → local override)
    const { resolvedTheme, parentTheme } = useResolvedTheme({ id, colorMode });

    const designTypes = useMemo(() => {
        if (!block?.dt) return {};
        return KVParser.parse(block.dt);
    }, [block?.dt]);

    // Gradient mode placeholder (future extension)
    const gradMode = null

    // Compute gradient CSS class (if enabled)
    const gradClass =
        gradMode === 'linear'
            ? 'god-grad-linear'
            : gradMode === 'radial'
                ? 'god-grad-radial'
                : ''

    // Variant state (base / hover / active / etc.)
    const { variant, setVariant, variantRef } = useVariantState()

    // Editor-side design resolution (variant-aware, no sensors)
    const { design, dynamicCSS } = useBlockDesignEditor(
        block,
        resolvedTheme,
        id,
        variant
    )

    // Component variables (only exist if block is a component root)
    const componentVariables = useComponentVariables(block)

    /**
     * Sync editor-selected variant → rendered variant
     * This keeps canvas preview aligned with variant panel
     */
    useEffect(() => {
        if (editingBlock === id && editingVariant !== variant) {
            setVariant(editingVariant)
        }
    }, [editingVariant, editingBlock])

    /**
     * Extend BlockFlow context:
     * - Pass down resolved theme
     * - Inject component variables for instances
     */
    const updatedParentData = useMemo<BlockFlow>(
        () => ({
            ...parentData,
            parentTheme: resolvedTheme,
            ...(componentVariables ? { componentVariables } : {})
        }),
        [parentTheme, resolvedTheme, componentVariables]
    )

    // Data attributes for editor tooling
    const data: Record<string, any> = {}
    if (!part) {
        data['data-node'] = id
    }

    let displayClass = '';
    if (designTypes?.dm === 'f') {
        displayClass = 'layout-flex';
    }

    if (designTypes?.dm === 'g') {
        displayClass = 'layout-grid';
    }

    const options = block?.data?.options ?? {};

    const DynamicTag = options.t?.value ?? 'div';
    const isAriaHidden = options.hfsr?.value === true;
    const ariaLabel = options.srl?.value;
    const isFocusableOption = options.focusable?.value === true;

    // List of native focusable tags
    const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

    // Build accessibility props
    const accessibilityProps: React.HTMLAttributes<HTMLElement> = {};

    // aria-hidden and tabIndex when hidden
    if (isAriaHidden) {
        accessibilityProps['aria-hidden'] = true;
        accessibilityProps.tabIndex = -1;
    } else {
        // Only set aria-label if not hidden
        if (ariaLabel) {
            accessibilityProps['aria-label'] = ariaLabel;
        }

        // Set tabIndex only if tag is NOT natively focusable
        if (!nativeFocusableTags.includes(DynamicTag) && isFocusableOption) {
            accessibilityProps.tabIndex = isFocusableOption ? 0 : -1;
        }
        // If native focusable, do NOT set tabIndex at all (default browser behavior)
    }

    const linkProps: React.HTMLAttributes<HTMLElement> = {};
    if (DynamicTag === 'a') {
        linkProps['href'] = options?.lURL?.value || '';
    }


    return (
        <BlockFlowContext.Provider value={updatedParentData}>
            {/* Inject dynamic CSS variables */}
            <style>{dynamicCSS}</style>

            <DynamicTag
                ref={nodeRef}
                data-node-theme={resolvedTheme}
                className={`addifect-base-node ${id} ${gradClass} addifect-base-node-active ${displayClass}`}
                {...data}
                {...accessibilityProps}
            // {...linkProps}
            >{children}</DynamicTag>
        </BlockFlowContext.Provider>
    )
}


/**
 * ============================================================================
 * BasePreview (RUNTIME VERSION)
 * - Used on frontend / preview surface
 * - Supports sensors, fold detection, animations
 * ============================================================================
 */
export function BasePreview({
    id,
    block,
    part,
    children
}: {
    id: string
    block: Block
    part: boolean
    children?: ReactElement | ReactElement[]
}) {

    // DOM reference for runtime measurements & animations
    const nodeRef = useRef<HTMLDivElement | null>(null)

    // Surface context (runtime-only)
    const {
        colorMode,
        newVariantTriggerMap,
        newHandleVariantChange,
        renderType
    } = useSurfaceContext()

    // Parent flow data
    const parentData = useContext(BlockFlowContext)

    // Resolve runtime theme
    const { resolvedTheme, parentTheme } = useResolvedTheme({ id, colorMode })

    // Variant state (runtime controlled)
    const { variant, setVariant, variantRef } = useVariantState();

    const designTypes = useMemo(() => {
        if (!block?.dt) return {};
        return KVParser.parse(block.dt);
    }, [block?.dt]);

    const map = new Map(block?.v?.map(o => [o.id, o]));
    const currentMap = map.get(variant);



    // Gradient placeholder
    const gradMode = null

    // Runtime design resolution (base variant only, sensor-aware)
    const { design, dynamicCSS } = useBlockDesignRuntime(
        block,
        resolvedTheme,
        id
    );

    useBlockStyle(id, dynamicCSS, renderType);

    // Sensors: viewport, container, fold visibility
    const { isInFold, sensors } = useBlockSensors(nodeRef, resolvedTheme)

    /**
     * Register this block into global variant trigger system
     * Enables hover / external triggers / timeline animations
     */
    useVariantAnimations({
        id,
        block,
        nodeRef,
        sensors,
        variant,
        setVariant,
        variantRef,
        triggerMap: newVariantTriggerMap,
        resolvedTheme
    })

    // Gradient CSS class
    const gradClass =
        gradMode === 'linear'
            ? 'god-grad-linear'
            : gradMode === 'radial'
                ? 'god-grad-radial'
                : ''

    // Component variables (only exist if block is a component root)
    const componentVariables = useComponentVariables(block);

    /**
        * Extend BlockFlow context:
        * - Pass down resolved theme
        * - Inject component variables for instances
        */
    const updatedParentData = useMemo<BlockFlow>(
        () => ({
            ...parentData,
            parentTheme: resolvedTheme,
            ...(componentVariables ? { componentVariables } : {})
        }),
        [parentTheme, resolvedTheme, componentVariables]
    )

    let displayClass = '';
    if (designTypes?.dm === 'f') {
        displayClass = 'layout-flex';
    }

    if (designTypes?.dm === 'g') {
        displayClass = 'layout-grid';
    }

    const options = block?.data?.options ?? {};

    const DynamicTag = options.t?.value ?? 'div';
    const isAriaHidden = options.hfsr?.value === true;
    const ariaLabel = options.srl?.value;
    const isFocusableOption = options.focusable?.value === true;

    // List of native focusable tags
    const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

    // Build accessibility props
    const accessibilityProps: React.HTMLAttributes<HTMLElement> = {};

    // aria-hidden and tabIndex when hidden
    if (isAriaHidden) {
        accessibilityProps['aria-hidden'] = true;
        accessibilityProps.tabIndex = -1;
    } else {
        // Only set aria-label if not hidden
        if (ariaLabel) {
            accessibilityProps['aria-label'] = ariaLabel;
        }

        // Set tabIndex only if tag is NOT natively focusable
        if (!nativeFocusableTags.includes(DynamicTag) && isFocusableOption) {
            accessibilityProps.tabIndex = isFocusableOption ? 0 : -1;
        }
        // If native focusable, do NOT set tabIndex at all (default browser behavior)
    }

    const linkProps: { [key: string]: string } = {};
    if (DynamicTag === 'a') {
        linkProps['href'] = options?.lURL?.value || '';
    }

    if (options?.lnt?.value) {
        linkProps['target'] = '_blank';
    }

    if (options?.ldo?.value) {
        linkProps['download'] = options?.ldon?.value || '';
    }

    if (options?.lrel?.value) {
        linkProps['rel'] = options?.lrel?.value || '';
    }

    const hoverTimeout = useRef<number | null>(null);

    return (
        <BlockFlowContext.Provider value={updatedParentData}>
            {/* Inject runtime CSS */}
            {renderType === 'SSR' && <style>{dynamicCSS}</style>}
            <DynamicTag
                ref={nodeRef}
                data-node={id}
                data-node-theme={resolvedTheme}
                className={`addifect-base-node ${id} ${gradClass} ${displayClass} ${isInFold ? 'addifect-base-node-active' : ''}`}
                {...accessibilityProps}
                {...linkProps}
                onMouseEnter={(e) => {
                    // e.stopPropagation()
                    // if (currentMap?.en) {
                    //     newHandleVariantChange(id, currentMap.en);
                    // }
                    hoverTimeout.current = window.setTimeout(() => {
                        if (currentMap?.en) {
                            newHandleVariantChange(id, currentMap.en);
                        }
                    }, 10); // ms delay
                }}
                onMouseLeave={(e) => {
                    // e.stopPropagation()
                    // if (currentMap?.lv) {
                    //     newHandleVariantChange(id, currentMap.lv);
                    // }
                    if (hoverTimeout.current) {
                        clearTimeout(hoverTimeout.current);
                        hoverTimeout.current = null;
                        if (currentMap?.lv) {
                            newHandleVariantChange(id, currentMap.lv);
                        }
                    }
                }}
            >
                {children}
            </DynamicTag>
        </BlockFlowContext.Provider>
    )
}

export default Base
