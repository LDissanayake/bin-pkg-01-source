import { useContext, useCallback } from 'react';
import { BlockFlowContext } from '../../../RenderEngine/BlockFlowContext';
import { Block } from '../../../BlockEditor/EditorContext';

export function useBlockValueResolver(block: Block) {
    const parentData = useContext(BlockFlowContext);

    const getValue = useCallback(
        (property: string) => {
            const option = block.data?.options?.[property];
            if (!option) return '';

            const { vs = 'm', value } = option;


            // 1️⃣ Manual / default
            if (vs === 'm') {
                return value ?? '';
            }

            // 2️⃣ Variable resolution
            if (vs === 'var') {
                const varId = value;
                if (!varId) return '';

                return (
                    parentData?.instanceVariables?.[varId] ??
                    parentData?.componentVariables?.[varId] ??
                    ''
                );
            }

            // 3️⃣ Future-safe placeholders
            if (vs === 'db') {
                // TODO: resolve db value
                return '';
            }

            if (vs === 'post') {
                // TODO: resolve post value
                return '';
            }

            return value ?? '';
        },
        [block, parentData]
    );

    return { getValue };
}
