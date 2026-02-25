import { Block } from "../../BlockEditor/EditorContext";
import genBlockData from "../../BlockEditor/util/blockDataUtils";

// generate styleData from blocks
const generateStyleData = ({
    assetId,
    pageBlocks
}: {
    assetId: string | null,
    pageBlocks: React.MutableRefObject<Map<string, Block>>
}) => {

    const styletemplate = {
        defaultColorMode: 'd',
        colorPalette: [],
        colorOptions: {
            background: null,
            text: null,
            accent: null
        },
        fontCatelog: [],
        fontOptions: {
            body: null,
            heading: null
        }
    }

    const assetBlock = pageBlocks.current.get(assetId as string);

    if (!assetBlock) { return styletemplate }

    genBlockData(assetBlock);

    
    const assetData = assetBlock.data?.options?.default?.value || {};

    if (assetData.tcmd) { styletemplate.defaultColorMode = assetData.tcmd === 'a' ? 'l' : assetData.tcmd } 

    const getDefaultId = (type: 'bc' | 'tc' | 'ac' | 'bf' | 'hf') => {

        const blockId = assetData[type];
        const block = pageBlocks.current.get(blockId);
        const colorId = block?.l;
        return colorId || null;
    }

    styletemplate.colorOptions.background = getDefaultId('bc');
    styletemplate.colorOptions.text = getDefaultId('tc');
    styletemplate.colorOptions.accent = getDefaultId('ac');

    styletemplate.fontOptions.body = getDefaultId('bf');
    styletemplate.fontOptions.heading = getDefaultId('hf');

    const generateColorPalette = () => {
        const colorsBlockId = assetData.cbid;
        const colors = pageBlocks.current.get(colorsBlockId as string)?.c || [];

        colors.forEach(id => {
            const colorblock = pageBlocks.current.get(id);
            if (colorblock) {
                genBlockData(colorblock)
            }
            const colorId = colorblock?.l;


            const colorCodes = { ...(colorblock?.data?.options?.c?.value || {}) };
            const palette = colorblock?.data?.options?.p?.value || [];

            if (colorId && colorCodes) {
                styletemplate.colorPalette.push({
                    label: colorId,
                    id: colorId,
                    ...colorCodes,
                    palette
                })
            }
        });
    }

    generateColorPalette();

    const generateFontCatelog = () => {
        const fontsBlockId = assetData.fbid;
        const fonts = pageBlocks.current.get(fontsBlockId as string)?.c || [];

        fonts.forEach((id) => {
            const fontblock = pageBlocks.current.get(id);

            if (fontblock) {
                genBlockData(fontblock)
            }

            const fontId = fontblock?.l;

            // Here fontblock?.o?.f is the array [family, category, variants]
            const fontArray = fontblock?.data?.options?.f?.value;

            if (fontId && Array.isArray(fontArray)) {
                // Destructure array into object
                const [family, category, variants] = fontArray;
                const fontObj = {
                    family,
                    category,
                    variants: variants || [],
                };

                styletemplate.fontCatelog.push({
                    id: fontId,
                    ...fontObj,
                });
            }
        });
    };


    generateFontCatelog();

    return styletemplate;
}

export default generateStyleData