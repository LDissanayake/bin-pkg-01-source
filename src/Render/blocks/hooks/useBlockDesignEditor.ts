import { useMemo } from 'react'
import { Block, useEditorContext } from '../../../BlockEditor/EditorContext'
import { expandDesign } from '../../../BlockEditor/util/styleCodec'


// --------------------------------------------------
// Helpers (non-invasive, no behavior changes)
// -------------------------------------------------


type ThemeMode = 'l' | 'd'

type ImageValue = {
    id: string
    url: string
}

type ColorModeValue<T = any> = {
    l?: T
    d?: T
}

function transformViewportValue(val: string): string {
    const match = val.trim().match(/^(-?\d*\.?\d+)(vw|vh)$/)
    if (!match) return val

    const [, num, unit] = match
    const cssVar = unit === 'vw' ? '--aw' : '--ah'

    // 100vw === var(--aw)
    // so num/100 * var(--a?)
    const factor = Number(num) / 100

    return `calc(var(${cssVar}) * ${factor})`
}


function isObject(val: any): val is Record<string, any> {
    return val !== null && typeof val === 'object'
}

function isColorModeValue(val: any): val is ColorModeValue {
    return isObject(val) && ('l' in val || 'd' in val)
}

function isImageValue(val: any): val is ImageValue {
    return (
        isObject(val) &&
        typeof val.id === 'string' &&
        typeof val.url === 'string'
    )
}

function resolveRuntimeValue(
    value: any,
    theme: ThemeMode
): string | number | undefined {
    let resolved = value

    // 1️⃣ color mode
    if (isColorModeValue(resolved)) {
        resolved =
            theme === 'd'
                ? resolved.d ?? resolved.l
                : resolved.l ?? resolved.d
    }

    // 2️⃣ image
    if (isImageValue(resolved)) {
        return `url(${resolved.url})`
    }

    // 3️⃣ primitive
    if (typeof resolved === 'string' || typeof resolved === 'number') {
        return resolved
    }

    return undefined
}


// --------------------------------------------------
// Hook
// --------------------------------------------------
export function useBlockDesignEditor(
    block: Block,
    resolvedTheme: ThemeMode,
    blockId: string,
    variant: string
) {
    const { page } = useEditorContext()

    // 🔹 Use mutation signal once
    const blockSignal = page[blockId]

    /**
     * STEP 1 — Get raw design data
     * Only expand if needed
     */
    const designData = useMemo(() => {
        if (block.data?.design) return block.data.design
        return expandDesign(block?.d || '')
    }, [block?.d, blockSignal])

    /**
     * STEP 2 — Resolve variant (base + overrides)
     */
    const design = useMemo(() => {
        const base = designData?.base || {}

        if (variant === 'base') {
            return base
        }

        const current = designData?.[variant] || {}

        // Only merge if necessary
        if (!Object.keys(current).length) return base

        return { ...base, ...current }
    }, [designData, variant])

    /**
     * STEP 3 — Generate CSS
     */
    const dynamicCSS = useMemo(() => {
        let css = `.${blockId} { --container-bp: 9999; `

        for (const [k, prop] of Object.entries(design)) {
            const val = resolveRuntimeValue(prop.value, resolvedTheme)

            if (val == null || val === '') continue

            css += typeof val === 'string'
                ? `--${k}: ${transformViewportValue(val)}; `
                : `--${k}: ${val}; `
        }

        css += `}`

        return css
    }, [design, resolvedTheme, blockId, blockSignal])

    return { design, dynamicCSS }
}
