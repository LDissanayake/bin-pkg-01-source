import React, { useRef } from 'react'
import { Block, useEditorContext } from '../../BlockEditor/EditorContext'
import * as styles from './css/Colors.module.css';


function Colors({ id, block, children }: {
    id: string,
    block: Block,
    children?: React.ReactNode;
}) {
    const { pageBlocks } = useEditorContext();

    const el = useRef<HTMLDivElement | null>(null);

    const assetsBlock = pageBlocks.current.get(block.p) as Block;
    const options = assetsBlock.data?.options?.default?.value;
  

    return (
        <>
            <div
                ref={el}
                className={id}
                data-node={id}
                style={{ padding: 20 }}
            >
                <div className={styles.section_title} >Global Components</div>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Colors