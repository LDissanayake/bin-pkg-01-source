import { useMemo } from 'react'
import { Block } from '../../../BlockEditor/EditorContext'
import { expandDesign } from '../../../BlockEditor/util/styleCodec';


type ThemeMode = 'l' | 'd';

type ImageValue = {
    id: string;
    url: string;
};

type ColorModeValue<T = any> = {
    l?: T;
    d?: T;
};

type DesignProp = {
    value: any;
};

type ExpandedDesign = {
    base?: Record<string, DesignProp>;
};

function isObject(val: any): val is Record<string, any> {
    return val !== null && typeof val === 'object';
}

function isColorModeValue(val: any): val is ColorModeValue {
    return isObject(val) && ('l' in val || 'd' in val);
}

function isImageValue(val: any): val is ImageValue {
    return (
        isObject(val) &&
        typeof val.id === 'string' &&
        typeof val.url === 'string'
    );
}

export function resolveRuntimeValue(
    value: any,
    theme: ThemeMode
): string | number | undefined {
    let resolved = value;

    // 1️⃣ resolve color mode
    if (isColorModeValue(resolved)) {
        resolved =
            theme === 'd'
                ? resolved.d ?? resolved.l
                : resolved.l ?? resolved.d;
    }

    // 2️⃣ resolve image
    if (isImageValue(resolved)) {
        return `url(${resolved.url})`;
    }

    // 3️⃣ primitive
    if (
        typeof resolved === 'string' ||
        typeof resolved === 'number'
    ) {
        return resolved;
    }

    return undefined;
}

export function useBlockDesignRuntime(
    block: Block,
    resolvedTheme: ThemeMode,
    blockId: string
) {
    const design = useMemo(() => {
        const data: ExpandedDesign = expandDesign(block?.d || '');
        return data?.base || {};
    }, [block?.d]);

    const dynamicCSS = useMemo(() => {
        let css = `.${blockId} { --container-bp: 9999; `;

        Object.entries(design).forEach(([key, prop]) => {
            const val = resolveRuntimeValue(prop.value, resolvedTheme);

            if (val !== undefined) {
                css += `--${key}: ${val}; `;
            }
        });

        css += `} `;
        return css;
    }, [design, resolvedTheme, blockId]);

    return {
        design,
        dynamicCSS,
    };
}
