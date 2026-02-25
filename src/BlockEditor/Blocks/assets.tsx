import React, { useEffect, useState } from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { IconCheck, IconColorSwatch, IconDroplet, IconFileTypography, IconFolder, IconFolderStar } from '@tabler/icons-react';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import { FloatingPosition, Input, MantineTransition, Select, Tooltip } from '@mantine/core';
import FontPicker from './controls/fontPicker/FontPicker';

import * as styles from './css/assets.module.css';
import genBlockData from '../util/blockDataUtils';

const tooltipProps = {
    color: "dark",
    position: "right" as FloatingPosition,
    offset: 6,
    style: {
        fontSize: '10px',
        border: '1px solid #666'
    },
    transitionProps: {
        transition: 'pop' as MantineTransition,
        duration: 300
    }
}


export const colorPresets: {
    [key: string]: string[]
} = {
    neutral: ["#ffffff", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999", "#808080", "#666666", "#4d4d4d", "#333333", "#000000"],
    gray: ["#f8f9fa", "#f1f3f5", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#868e96", "#495057", "#343a40", "#212529"],
    red: ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"],
    pink: ["#fff0f6", "#ffdeeb", "#fcc2d7", "#faa2c1", "#f783ac", "#f06595", "#e64980", "#d6336c", "#c2255c", "#a61e4d"],
    grape: ["#f8f0fc", "#f3d9fa", "#eebefa", "#e599f7", "#da77f2", "#cc5de8", "#be4bdb", "#ae3ec9", "#9c36b5", "#862e9c"],
    violet: ["#f3f0ff", "#e5dbff", "#d0bfff", "#b197fc", "#9775fa", "#845ef7", "#7950f2", "#7048e8", "#6741d9", "#5f3dc4"],
    indigo: ["#edf2ff", "#dbe4ff", "#bac8ff", "#91a7ff", "#748ffc", "#5c7cfa", "#4c6ef5", "#4263eb", "#3b5bdb", "#364fc7"],
    blue: ["#e7f5ff", "#d0ebff", "#a5d8ff", "#74c0fc", "#4dabf7", "#339af0", "#228be6", "#1c7ed6", "#1971c2", "#1864ab"],
    cyan: ["#e3fafc", "#c5f6fa", "#99e9f2", "#66d9e8", "#3bc9db", "#22b8cf", "#15aabf", "#1098ad", "#0c8599", "#0b7285"],
    teal: ["#e6fcf5", "#c3fae8", "#96f2d7", "#63e6be", "#38d9a9", "#20c997", "#12b886", "#0ca678", "#099268", "#087f5b"],
    green: ["#ebfbee", "#d3f9d8", "#b2f2bb", "#8ce99a", "#69db7c", "#51cf66", "#40c057", "#37b24d", "#2f9e44", "#2b8a3e"],
    lime: ["#f4fce3", "#e9fac8", "#d8f5a2", "#c0eb75", "#a9e34b", "#94d82d", "#82c91e", "#74b816", "#66a80f", "#5c940d"],
    yellow: ["#fff9db", "#fff3bf", "#ffec99", "#ffe066", "#ffd43b", "#fcc419", "#fab005", "#f59f00", "#f08c00", "#e67700"],
    orange: ["#fff4e6", "#ffe8cc", "#ffd8a8", "#ffc078", "#ffa94d", "#ff922b", "#fd7e14", "#f76707", "#e8590c", "#d9480f"]
};



const ColorPickSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks } = useEditorContext()

    const colors = pageBlocks.current.get(block.p || '')?.c || [];

    const colorNames = colors
        .filter(_id => _id !== id) // remove current
        .map(_id => pageBlocks.current.get(_id)?.l)
        .filter(Boolean); // remove null/undefined

    const [isValidColor, setIsValidColor] = useState(true);
    const [newColorName, setNewColorName] = useState(block.l);

    const [mounted, setMounted] = useState(false);

    const systemRoles = ['text', 'background'];

    useEffect(() => {
        setMounted(true);
    }, []);


    useEffect(() => {
        if (!mounted) { return }

        if (newColorName) {
            const isValid = colorNames.includes(newColorName) ? false : true;
            setIsValidColor(isValid);

            if (isValid) {
                block.l = newColorName;
                updated();
            }
        }
    }, [newColorName])

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash


    const handleColorName = (v: string) => {
        const sanitized = sanitizeName(v);
        setNewColorName(sanitized);
    };


    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        <span style={{ fontSize: 11 }}>Color Role</span>
        {
            systemRoles.includes(newColorName || '') ?
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 15,
                    height: 30,
                    padding: '0px 12px',
                    fontSize: 12
                }}>{newColorName}</div>
                :

                <Input
                    variant="filled"
                    size="xs"
                    radius="xl"
                    error={newColorName && !isValidColor}
                    onChange={(e) => handleColorName(e.currentTarget.value)}
                    value={newColorName}
                />
        }
    </div>
}

const PresetSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const handleAddPresset = (preset: string) => {
        if (block.data?.options) {
            block.data.options.p = {
                value: [...colorPresets[preset]],
                vs: 'm'
            }

            updated();
        }
    }

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        gap: 6,
        alignItems: 'center'
    }}>
        {Object.keys(colorPresets)?.map((preset, i) => {
            const colorPreset = colorPresets[preset];
            const tipProps = tooltipProps
            const active = [...block?.data?.options?.p?.value || []].join() === [...colorPreset].join();

            return (
                <Tooltip key={i} label={preset} {...tipProps} position='bottom' offset={2}>
                    <div
                        className={styles.colorPresetBlock}
                        style={{ background: colorPreset[6] }}
                        onClick={() => handleAddPresset(preset)}
                    >
                        {active && <div
                            className={styles.colorPresetBlock_active}
                            style={{ color: colorPreset[2], background: colorPreset[8] }}
                        >
                            <IconCheck stroke={1.6} size={14} />
                        </div>}
                        <div className={styles.colorPresetBlockStrip}>
                            {colorPreset.map((item, idx) =>
                                <div  key={item + idx} className={styles.colorPresetBlockStripItem} style={{ background: item }}></div>
                            )
                            }
                        </div>
                    </div>
                </Tooltip>
            )
        })
        }
    </div>
}


const ColorModeSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {
    const { pageBlocks, colorMode, setColorMode } = useEditorContext();

    const assetsBlock = pageBlocks.current.get(block.p) as EditorBlock;

    genBlockData(assetsBlock);

    const options = assetsBlock.data?.options?.default?.value;

    const setOption = (key: string, value: any) => {
        options[key] = value;
        updated();
    }

    const handleColorModeChange = (
        control: 'tcme' | 'tcmd',
        value: 'l' | 'd' | 'ld' | 'a' | null
    ) => {
        if (control === 'tcme') {
            // if only one mode is enabled, force default
            if (value !== 'ld') {
                setColorMode(value as 'l' | 'd'); // set Editor color mode
                setOption('tcmd', value);
            }
            setOption('tcme', value);
            return;
        }

        setColorMode(value === 'a' ? 'd' : value as 'l' | 'd'); // set Editor color mode
        setOption('tcmd', value);
    };


    const getValue = (key: string) => {
        return options?.[key] || ''
    }

    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 11,
            gap: 4,
            marginBottom: 4
        }}>
            <span>Modes</span>
            <Select
                size="xs"
                radius="lg"
                data={[
                    { label: 'Light', value: 'l' },
                    { label: 'Dark', value: 'd' },
                    { label: 'Light + Dark', value: 'ld' },
                ]}
                value={getValue('tcme')}
                onChange={(v) => handleColorModeChange('tcme', v as 'l' | 'd' | 'ld')}
                checkIconPosition="right"
                allowDeselect={false}
            />
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 11,
            gap: 4,
            marginBottom: 4
        }}>
            <span>Default</span>
            <Select
                size="xs"
                radius="lg"
                data={[
                    { label: 'Light', value: 'l' },
                    { label: 'Dark', value: 'd' },
                    { label: 'Auto', value: 'a' },
                ]}
                allowDeselect={false}
                value={getValue('tcmd')}
                onChange={(v) => handleColorModeChange('tcmd', v as 'l' | 'd' | 'a')}
                disabled={getValue('tcme') !== 'ld'}
                checkIconPosition="right"
            />
        </div>
    </div>

}

// Initial block configuration
const config: BlockConfig = {
    title: 'Design Assets',
    icon: <IconFolder />,
    cats: [''],
    type: 'a',
    children: true,
    rootAllow: false,
    childCats: ['assets'],
    limitInParent: 1,
    props: {
        options: 'p=(x:100,y:100);default=(tcme:ld,tcmd:d,cbid:null,fbid:null,bc:null,tc:null,ac:null,bf:null,hf:null);lfu=1',
    },
    designSections: null,
    lock: 'dmr'
};

const block = new Block(config);

export default block;


const colorsConfig: BlockConfig = {
    title: 'Colors',
    icon: <IconColorSwatch />,
    cats: ['assets'],
    type: 'cs',
    children: true,
    rootAllow: false,
    limitInParent: 1,
    childCats: ['color'],
    props: {},
    designSections: null,
    optionSections: [
        { label: 'Color Mode', component: ColorModeSection },
    ],
    lock: 'dmr'
};

export const colorsBlock = new Block(colorsConfig);


const colorConfig: BlockConfig = {
    title: 'Color',
    icon: <IconDroplet />,
    cats: ['color'],
    type: 'c',
    children: false,
    rootAllow: false,
    props: {
        options: `p=[${colorPresets.neutral.join()}];`
    },
    designSections: null,
    optionSections: [
        { label: 'Color Details', component: ColorPickSection },
        { label: 'Presets', component: PresetSection }
    ]
};

export const colorBlock = new Block(colorConfig);


const fontsConfig: BlockConfig = {
    title: 'Fonts',
    icon: <IconFolder />,
    cats: ['assets'],
    type: 'fs',
    children: true,
    rootAllow: false,
    limitInParent: 1,
    childCats: ['font'],
    props: {},
    designSections: null,
    lock: 'dmr'
};

export const fontsBlock = new Block(fontsConfig);


/**
 * Font Controls Section
 * @returns 
 */
const FontPickSection = ({ id, block, updated }: { id: string, block: EditorBlock, updated: () => void; }) => {

    const { pageBlocks, editingDesignId } = useEditorContext();

    const handleChange = (value: any, property: string) => {
        if (!block) { return }

        if (value && block.data?.options) {
            if (block.data?.options?.[property]) {
                block.data.options[property].value = value;
            } else {
                // add property
                block.data.options[property] = { value };
            }
        }

        handleUpdateAssetsOptions();
        updated();

    }

    const handleUpdateAssetsOptions = () => {
        // lfu
        const designBlock = pageBlocks.current.get(editingDesignId || "");
        if (designBlock) genBlockData(designBlock);

        const assetId = designBlock?.data?.options?.assid?.value;
        const assetBlock = pageBlocks.current.get(assetId);
        const options = assetBlock?.data?.options;
        if (options) {
            options.lfu = {
                vs: 'm',
                value: Date.now()
            }
        }

        updated();
    }

    const getValue = (property: string) => {
        return block.data?.options?.[property].value || ''
    }


    const fonts = pageBlocks.current.get(block.p || '')?.c || [];

    const colorNames = fonts
        .filter(_id => _id !== id) // remove current
        .map(_id => pageBlocks.current.get(_id)?.l)
        .filter(Boolean); // remove null/undefined


    const [isValidFont, setIsValidFont] = useState(true);
    const [newFontName, setNewFontName] = useState(block.l);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    useEffect(() => {
        if (!mounted) { return }
        if (newFontName) {
            const isValid = colorNames.includes(newFontName) ? false : true;
            setIsValidFont(isValid);

            if (isValid) {
                block.l = newFontName;
                updated();
            }
        }
    }, [newFontName])

    // space → dash, allow only English letters and dash
    const sanitizeName = (v: string) =>
        v
            .replace(/\s+/g, '-')        // convert spaces to dash
            .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash

    const handleFontName = (v: string) => {
        const sanitized = sanitizeName(v);
        setNewFontName(sanitized);
    };


    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    }}>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 6,
            alignItems: 'center'
        }}>
            <span style={{ fontSize: 11 }}>Font</span>
            <FontPicker
                onChange={(v) => { handleChange(v, 'f') }}
                value={getValue('f')}
            />
        </div>
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            alignItems: 'center'
        }}>
            <span style={{ fontSize: 11 }}>Font Name</span>
            <Input
                variant="filled"
                size="xs"
                radius="xl"
                error={newFontName && !isValidFont}
                onChange={(e) => handleFontName(e.currentTarget.value)}
                value={newFontName}
            />
        </div>
    </div>
}

const fontConfig: BlockConfig = {
    title: 'Font',
    icon: <IconFileTypography />,
    cats: ['font'],
    type: 'f',
    children: false,
    rootAllow: false,
    props: {
        options: 'f=["Oswald","sans-serif",["regular"]]'
    },
    designSections: null,
    optionSections: [
        { label: 'Font Details', component: FontPickSection }
    ]
};


// Create a new block instance
export const fontBlock = new Block(fontConfig);


const componentsConfig: BlockConfig = {
    title: 'Components',
    icon: <IconFolderStar />,
    cats: ['assets'],
    type: 'cos',
    children: true,
    rootAllow: false,
    limitInParent: 1,
    childCats: ['co'],
    props: {},
    designSections: null,
    lock: 'dmri'
};

export const componentsBlock = new Block(componentsConfig);
