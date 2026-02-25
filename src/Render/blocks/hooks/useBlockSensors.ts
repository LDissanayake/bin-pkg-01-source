import { useEffect, useState } from "react";
import { Resolver } from "../../core/animationEngine";

export function useBlockSensors(
    nodeRef: React.RefObject<HTMLElement>,
    resolvedTheme: 'l' | 'd'
) {
    const [isInFold, setIsInFold] = useState(false);
    const [sensors, setSensors] = useState({
        isDark: resolvedTheme === 'd',
        bp: 9999,
    });

    useEffect(() => {
        if (!nodeRef.current) return;

        const foldObs = new IntersectionObserver(
            ([e]) => setIsInFold(e.isIntersecting),
            { threshold: 0.1 }
        );

        const resObs = new ResizeObserver(() => {
            setSensors(Resolver.getSensors(nodeRef.current!, document.body, resolvedTheme));
        });

        foldObs.observe(nodeRef.current);
        resObs.observe(document.body);

        return () => {
            foldObs.disconnect();
            resObs.disconnect();
        };
    }, [resolvedTheme]);

    return { isInFold, sensors };
}
