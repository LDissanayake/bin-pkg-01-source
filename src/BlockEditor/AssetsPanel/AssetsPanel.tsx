import React from 'react'
import * as styles from './AssetsPanel.module.css'
import { useEditorContext } from '../EditorContext'
import genBlockData from '../util/blockDataUtils';
import ArtboardRender from '../../Render/artboard/ArtboardRender';
import { ScrollArea } from '@mantine/core';

function AssetsPanel() {
    const { pageBlocks, editingDesignId } = useEditorContext();

    if (!editingDesignId) { return }
    // ----------------------------
    // 1. Get design data
    // ----------------------------
    const designBlock = pageBlocks.current.get(editingDesignId || "");
    if (designBlock) genBlockData(designBlock);

    const assetId = designBlock?.data?.options?.assid?.value;
    const assetBlock = pageBlocks.current.get(assetId);


    return (
        <div className={styles.wrap}>
            <ScrollArea.Autosize mah='100%' type="scroll" scrollbarSize={4}>
        <div className={styles.content}>
                <ArtboardRender entry={assetBlock?.c || []} part={false} />
        </div>
            </ScrollArea.Autosize>

        </div>
    )
}

export default AssetsPanel
