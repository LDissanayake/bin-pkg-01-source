import React, { ReactElement, useContext, useMemo, useRef } from 'react'
import { Block } from '../../BlockEditor/EditorContext'
import { BlockFlow, BlockFlowContext } from '../../RenderEngine/BlockFlowContext';



export function Instance({ id, block, part, children }: {
    id: string,
    block: Block,
    part: boolean,
    children?: ReactElement | ReactElement[];
}) {
   const parentData = useContext(BlockFlowContext);
    const nodeRef = useRef(null);
  

    const instanceVariables = block.data?.options?.vars?.value || {};
    
    const updatedParentData = useMemo<BlockFlow>(
        () => ({
            ...parentData,
            instanceVariables 
        }),
        [instanceVariables]
    );


    const data: { [key: string]: any } = {}
    if (!part) {
        data['data-node'] = id
    }

    return (
        <BlockFlowContext.Provider value={updatedParentData}>
            {children}
        </BlockFlowContext.Provider>
    )
}


export default Instance
