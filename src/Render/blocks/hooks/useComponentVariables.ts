import { useMemo } from "react";
import { Block } from "../../../BlockEditor/EditorContext";

export function useComponentVariables(block: Block) {
    return useMemo(() => {
        if (block.m !== 'c') return null;

        return Object.fromEntries(
            Object.entries(block.data?.options?.vars?.value || {}).map(
                ([id, v]: [string, any]) => [id, v.default]
            )
        );
    }, [block]);
}
