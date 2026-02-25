import { useState, useRef, useEffect } from "react";

export function useVariantState() {
    const [variant, setVariant] = useState('base');
    const variantRef = useRef(variant);

    useEffect(() => {
        variantRef.current = variant;
    }, [variant]);

    return { variant, setVariant, variantRef };
}
