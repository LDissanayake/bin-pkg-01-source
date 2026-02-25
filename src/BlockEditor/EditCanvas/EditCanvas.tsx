import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useEditorContext } from '../EditorContext';
import * as styles from './styles.module.css';
import Artboard from './Artboard';
import { blockRegistry } from '../Blocks';
import { generateCSSVariables } from '../../RenderEngine/styleUtil';
import generateGoogleFontsLink from '../../RenderEngine/utils/googleFontUtils';
import generateStyleData from '../../Render/core/generateStyleData';
import genBlockData from '../util/blockDataUtils';
import GlobalStyle from './GlobalStyles';

export type deviceData = {
    type: string;
    label: string;
    width: string;
    height: string;
    toggleable?: boolean;
}

const devices: Record<string, deviceData> = {
    default: { type: 'default', label: 'Desktop', width: '1366px', height: '1024px' },
    medium: { type: 'medium', label: 'Tablet', width: '1024px', height: '768px' },
    small: { type: 'small', label: 'Mobile', width: '768px', height: '1024px' },
};


const EditCanvas = React.memo(function EditCanvas() {
    const { device, editingDesignId, page, pageBlocks } = useEditorContext();
    const currentDeviceData = devices[device];
    const blockTemplates = blockRegistry;


    // ----------------------------
    // 0. Helpers
    // ----------------------------
    const safeGetChildren = (blockId?: string) => {
        if (!blockId) return [];
        const b = pageBlocks.current.get(blockId);
        return b?.c || [];
    };

    // ----------------------------
    // 1. Get design data
    // ----------------------------
    const designBlock = pageBlocks.current.get(editingDesignId || "");
    if (designBlock) genBlockData(designBlock);

    const assetId = designBlock?.data?.options?.assid?.value;
    const assetBlock = pageBlocks.current.get(assetId);
    const designData = assetBlock?.data?.options?.default?.value || {};

    // ----------------------------
    // 2. Collect dependency IDs
    // ----------------------------
    const colorBlockIds = designData.cbid ? safeGetChildren(designData.cbid) : [];
    const fontBlockIds = designData.fbid ? safeGetChildren(designData.fbid) : [];

    const optionBlockIds = ["bc", "tc", "ac", "bf", "hf"]
        .map(k => designData[k])
        .filter(id => !!id);

    const allIds = [
        ...optionBlockIds,
        ...colorBlockIds,
        ...fontBlockIds
    ];

    // ----------------------------
    // 3. Stable dependency hash
    // ----------------------------
    // We stringify once so dependency array stays size 2.
    const depsHash = JSON.stringify({
        ids: allIds,
        pageData: allIds.map(id => page[id]),
    });

    // ----------------------------
    // 4. Memo with stable deps
    // ----------------------------
    const styleData = useMemo(() => {
        return generateStyleData({ assetId, pageBlocks });
    }, [editingDesignId, depsHash]);

    const globalVariables = styleData
        ? generateCSSVariables(styleData)
        : { lightMode: '', darkMode: '', common: '' };

    // stable fonts ref
    const stableFontsRef = useRef([]);

    const fonts = useMemo(() => {
        const next = styleData?.fontCatelog || [];
        const prev = stableFontsRef.current;

        // deep compare
        if (JSON.stringify(prev) !== JSON.stringify(next)) {
            stableFontsRef.current = next;
        }

        return stableFontsRef.current;
    }, [styleData?.fontCatelog]);


    const [subsets, setSubsets] = useState(['latin']);
    const [display, setDisplay] = useState('swap');

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = generateGoogleFontsLink(fonts, subsets, display);
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, [fonts, subsets, display]);



    // ----------------

    return (
        <div className={styles.wrap}>
            <GlobalStyle />
            <div className={styles.inner}>
                {editingDesignId && pageBlocks.current.get(editingDesignId)?.c?.map((id) => {
                    const item = pageBlocks.current.get(id);
                    if (!item) { return }
                    if (item.t === 'a') { return }
                    
                    const artboardStructure = {
                        root: item.c || [],
                        blocks: pageBlocks.current,
                        page
                    };
                    const blockTemplate = blockTemplates[item?.t as string];

                    return (
                        <Artboard
                            key={id}
                            id={id}
                            artboardStructure={artboardStructure}
                            currentDeviceData={currentDeviceData}
                            label={item?.l || blockTemplate.title}
                            item={item}
                            entry={item.c || []}
                            globalVariables={globalVariables}
                        />
                    );
                })}
            </div>
        </div>
    );
});


export default EditCanvas