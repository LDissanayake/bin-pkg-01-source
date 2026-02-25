import { useEffect } from "react";
import Conductor from "../../core/animationEngine";
import { Block } from "../../../BlockEditor/EditorContext";
import syncAnimationsWithVariantStyles from "../../core/syncAnimationsWithVariantStyles";

function generateInitAnimate(variants) {
    const result = {};

    variants.forEach(({ id, ...events }) => {
        Object.values(events).forEach(val => {
            if (val) {
                const key = `${id}-${val}`;
                result[key] = {};
            }
        });
    });

    return result;
}

export function useVariantAnimations({
    id,
    block,
    nodeRef,
    sensors,
    variant,
    setVariant,
    variantRef,
    triggerMap,
    resolvedTheme,
}: {
    id: string;
    block: Block;
    nodeRef: React.RefObject<HTMLElement>;
    sensors: any;
    variant: string;
    setVariant: (v: string) => void;
    variantRef: React.MutableRefObject<string>;
    triggerMap?: any;
    resolvedTheme: 'l' | 'd';
}) {

    const initAnimate = generateInitAnimate(block?.v || []);

    const trigger = (target: string) => {
        const current = variantRef.current;
        if (current === target) return;

        // ✅ RESTORED
        const animation = syncAnimationsWithVariantStyles(
            block?.a || {},
            block.data?.design || {},
            resolvedTheme
        );
        
        const timeline = animation?.[`${current}-${target}`];
    
        if (timeline && nodeRef.current) {
            Conductor.animate(nodeRef.current, timeline, sensors);
        }

        setVariant(target);
    };

    useEffect(() => {
        if (!triggerMap) return;

        triggerMap.current.byId[id] = trigger;

        const vtid = block.data?.options?.vtid?.value;
        if (!vtid) return;

        triggerMap.current.trigger[vtid] ??= [];

        if (!triggerMap.current.trigger[vtid].includes(id)) {
            triggerMap.current.trigger[vtid].push(id);
        }

    }, [resolvedTheme]);

    

    return { trigger };
}
