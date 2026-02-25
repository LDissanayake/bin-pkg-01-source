import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Block, BlockConfig } from './blockTemplate';
import { BoxIcon, DimensionsIcon, GridIcon, MaskOffIcon, PlusCircledIcon, ShadowInnerIcon, ShadowOuterIcon, TokensIcon, ViewVerticalIcon } from '@radix-ui/react-icons';
import { Block as EditorBlock, useEditorContext } from '../EditorContext';
import { ActionIcon, Button, CloseIcon, Input, MultiSelect, SegmentedControl, Select, Switch } from '@mantine/core';
import * as styles from './css/base.module.css';
import { IconAccessible, IconAccessibleFilled, IconArrowDown, IconArrowLeftRight, IconArrowRight, IconDots, IconDotsCircleHorizontal, IconPencil, IconTrash, IconVersions, IconX } from '@tabler/icons-react';
import { ContainerSection, InteractiveIdSection, VariantMapSection, VariantOptionSection } from './optionSections/Common';
import KVParser from '../util/KVParser';
import { compactDesign } from '../util/styleCodec';
import FlexAlignmentController from './controls/FlexAlignmentController';
import PositionSection from './optionSections/PositionSection';
import BackgroundsSection from './optionSections/BackgroundsSection';
import TransitionSection from './optionSections/TransitionSection';
import AppearanceSection from './optionSections/AppearanceSection';
import QuerySection from './optionSections/QuerySection';



type VarEditData = {
    n: string;
    t: string;
    d: string;
};

const getLabelByType = (t: 't') => {
    const data = {
        t: 'Text',
        // tc: 'Text Content'
    }
    return data[t];
}

const VariablesOptionSection = ({
    id,
    block,
    updated,
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
}) => {
    const { pageBlocks } = useEditorContext();

    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const defaultEditingData: VarEditData = {
        n: '',
        t: '',
        d: '',
    };

    const [editingVarData, setEditingVarData] =
        useState<VarEditData>(defaultEditingData);

    // ---------------------------------------------------------------------------
    // Ensure vars option exists
    // ---------------------------------------------------------------------------
    if (block.data?.options && !block.data.options.vars) {
        block.data.options.vars = { value: {} };
    }

    const vars = block.data?.options?.vars?.value || {};

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    const handleEditingVarDataChange = (
        key: keyof VarEditData,
        v: any
    ) => {
        setEditingVarData(prev => ({
            ...prev,
            [key]: v,
        }));
    };

    const handleCloseEditor = () => {
        setEditingVarData(defaultEditingData);
        setAdding(false);
        setEditingId(null);
    };

    // ---------------------------------------------------------------------------
    // Add / Update variable
    // ---------------------------------------------------------------------------
    const handleSaveVariable = () => {
        const { n, t, d } = editingVarData;
        if (!n || !t) return;

        if (editingId) {
            // UPDATE
            vars[editingId] = {
                ...vars[editingId],
                name: n,
                type: t,
                default: d,
            };
        } else {
            // ADD (short internal id)
            const base =
                n.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 4) || 'v';

            let vid = base;
            let i = 1;
            while (vars[vid]) vid = `${base}${i++}`;

            vars[vid] = {
                id: vid,
                name: n,
                type: t,
                default: d,
            };
        }

        updated();
        handleCloseEditor();
    };

    // ---------------------------------------------------------------------------
    // Edit existing variable
    // ---------------------------------------------------------------------------
    const handleEditVariable = (v: any) => {
        setEditingVarData({
            n: v.name,
            t: v.type,
            d: v.default,
        });
        setEditingId(v.id);
        setAdding(true);
    };

    // ---------------------------------------------------------------------------
    // Delete variable
    // ---------------------------------------------------------------------------
    const handleDeleteVariable = (vid: string) => {
        delete vars[vid];
        updated();
    };

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------
    return (
        <div>
            {/* ================= Variable List ================= */}
            <div className={styles.variableList}>
                {Object.values(vars).map((v: any) => (
                    <div key={v.id} className={styles.variableItem}>
                        <div className={styles.variableItemLeft}>
                            <span className={styles.variableName}>{v.name}</span>
                            <span className={styles.variableMeta}>
                                {getLabelByType(v.type)} · #{v.id} · {v.default}
                            </span>
                        </div>

                        <div className={styles.variableItemActions}>
                            <ActionIcon
                                size="xs"
                                variant="subtle"
                                onClick={() => handleEditVariable(v)}
                            >
                                <IconPencil size={14} />
                            </ActionIcon>

                            <ActionIcon
                                size="xs"
                                color="red"
                                variant="subtle"
                                onClick={() => handleDeleteVariable(v.id)}
                            >
                                <IconTrash size={14} />
                            </ActionIcon>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= Editor ================= */}
            {adding && (
                <div className={styles.variableItemEdit}>
                    <div className={styles.variableItemEdit_head}>
                        <ActionIcon
                            style={{
                                position: 'absolute',
                                top: '-14px',
                                right: '-10px',
                                zIndex: 1,
                            }}
                            onClick={handleCloseEditor}
                            color="gray"
                            size="sm"
                            radius="xl"
                        >
                            <IconX size={14} />
                        </ActionIcon>

                        <div className={styles.variableItemEdit_inputwrap}>
                            <Input
                                variant="filled"
                                size="xs"
                                radius="xl"
                                placeholder="Name"
                                value={editingVarData.n}
                                onChange={(e) =>
                                    handleEditingVarDataChange(
                                        'n',
                                        e.currentTarget.value
                                    )
                                }
                            />
                        </div>

                        <div className={styles.variableItemEdit_inputwrap}>
                            <Select
                                variant="filled"
                                size="xs"
                                radius="xl"
                                placeholder="Type"
                                data={[
                                    { label: 'Text', value: 't' },
                                    // { label: 'Text Content', value: 'tc' },
                                    // { label: 'Color', value: 'c' },
                                ]}
                                value={editingVarData.t}
                                onChange={(v) =>
                                    handleEditingVarDataChange('t', v)
                                }
                            />
                        </div>
                    </div>

                    <div className={styles.variableItemEdit_inputwrapDefault}>
                        <Input
                            variant="filled"
                            size="xs"
                            radius="xl"
                            placeholder="Default value"
                            value={editingVarData.d}
                            onChange={(e) =>
                                handleEditingVarDataChange(
                                    'd',
                                    e.currentTarget.value
                                )
                            }
                        />
                    </div>

                    <Button
                        size="compact-xs"
                        onClick={handleSaveVariable}
                        leftSection={<IconVersions size={14} />}
                        style={{ fontWeight: 400 }}
                    >
                        {editingId ? 'Update Variable' : 'Create Variable'}
                    </Button>
                </div>
            )}

            {/* ================= Add Button ================= */}
            {!adding && (
                <Button
                    variant="transparent"
                    c='gray'
                    size="compact-xs"
                    onClick={() => setAdding(true)}
                    leftSection={<PlusCircledIcon />}
                    style={{ fontWeight: 400 }}
                >
                    Add Variable
                </Button>
            )}
        </div>
    );
};


const LayoutOptionSection = ({
    id,
    block,
    updated,
    buttonPass,
    sectionId
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
    buttonPass: (sectionId: string, btn: JSX.Element) => void;
    sectionId: string;
}) => {

    const { pageBlocks, page, setPage, editingBlock, editingVariant } = useEditorContext();
    const editingDevice = '';
    const designData = block?.data?.design;

    /**
     * Parse dt once and memoize it
     * avoids parsing on every render / function call
     */
    const parsedData = useMemo(() => {
        if (!block?.dt) return {};
        return KVParser.parse(block.dt);
    }, [block?.dt]);

    /**
     * Current display mode
     * b = block (default)
     * f = flex / inline
     */
    const currentDisplayMode = parsedData.dm ?? 'b';

    /**
     * Update display mode safely
     */
    const handleDisplayMode = useCallback((dm: string) => {
        if (!block) return;

        const nextData = {
            ...parsedData,
            dm
        };

        block.dt = KVParser.stringify(nextData);

        // remove
        handleRemoveFlex();

        if (dm == 'f') {
            handleAddFelx();
        }

        updated();
    }, [block, parsedData]);


    const handleAddFelx = () => {
        if (!block || !designData) { return }



        if (!designData.base) {
            designData.base = {}
        }

        const DEFAULT_FLEX = {
            dp: 'flex',             // display: flex
            fd: 'row',              // flex-direction: row
            ai: 'center',           // align-items: center
            jc: 'center',           // justify-content: center
        }

        Object.entries(DEFAULT_FLEX).forEach(([property, value]) => {
            if (!designData.base[property]) {
                designData.base[property] = { vs: 'm', value }
            }
        })

        if (editingVariant) {
            if (!designData[editingVariant]) {
                designData[editingVariant] = {}
            }

            if (!designData[editingVariant].gp) {
                designData[editingVariant].gp = {
                    vs: 'm',
                    value: '10px',
                }
            }
        }

        const comp = compactDesign(designData)
        block.d = comp
        updated()
    }


    const handleRemoveFlex = () => {
        if (!block || !designData) { return }

        // Remove non-animatable flex props from base variant
        if (designData.base) {
            ['dp', 'fd', 'ai', 'jc'].forEach(property => {
                if (designData.base[property]) {
                    delete designData.base[property]
                }
            })

            // Clean up base if empty
            if (Object.keys(designData.base).length === 0) {
                delete designData.base
            }
        }

        // Remove animatable gap from editingVariant
        if (editingVariant && designData[editingVariant]) {
            if (designData[editingVariant].gp) {
                delete designData[editingVariant].gp
            }

            // Clean up variant if empty
            if (Object.keys(designData[editingVariant]).length === 0) {
                delete designData[editingVariant]
            }
        }

        const comp = compactDesign(designData)
        block.d = comp
        updated()
    }



    /**
     * Pass header button
     * uses latest display mode because dependencies are correct
     */
    useEffect(() => {
        buttonPass(
            sectionId,
            <Switch
                checked={currentDisplayMode !== 'b'}
                onChange={() =>
                    handleDisplayMode(
                        currentDisplayMode === 'b' ? 'f' : 'b'
                    )
                }
                color="rgb(153 177 210)"
                size="xs"
                radius="xs"
            />
        );
    }, [sectionId, currentDisplayMode]);


    const handleChange = ({ value, property }: { value: string, property: string }) => {
        if (!block) { return }

        if (value && designData?.[editingVariant]) {
            if (designData?.[editingVariant]?.[property]) {
                designData[editingVariant][property].value = value;
            } else { // add property
                designData[editingVariant][property] = {
                    vs: 'm',
                    value
                }
            }

            const comp = compactDesign(designData);
            block.d = comp;
        }

        updated();

    }

    const getValue = (property: string) => {
        return designData?.[editingVariant]?.[property]?.value || ''
    }


    if (currentDisplayMode === 'b') {
        return null;
    }


    return (
        <div>
            <SegmentedControl size="xs"
                data={[
                    { label: 'Grid', value: 'g' },
                    { label: 'Flex', value: 'f' },
                ]}
                value={currentDisplayMode}
                onChange={(value) => handleDisplayMode(value)}
                fullWidth
            />

            {
                currentDisplayMode === 'f' &&
                <FlexAlignmentController getValue={getValue} onChange={handleChange} />
            }

        </div >
    );
};


const AccessibilityOptionSection = ({
    id,
    block,
    updated,
    buttonPass,
    sectionId
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
    buttonPass: (sectionId: string, btn: JSX.Element) => void;
    sectionId: string;
}) => {

    const { pageBlocks, page, setPage, editingBlock, editingVariant } = useEditorContext();
    const editingDevice = '';
    const designData = block?.data?.design;
    const options = block?.data?.options;

    const parsedData = useMemo(() => {
        if (!block?.dt) return {};
        return KVParser.parse(block.dt);
    }, [block?.dt]);

    const currentDisplayMode = parsedData.dm ?? 'b';

    const [showAccessibilityControls, setShowAccessibilityControls] = useState(false);

    /**
 * Pass header button
 * uses latest display mode because dependencies are correct
 */
    useEffect(() => {
        buttonPass(
            sectionId,
            <ActionIcon
                radius="lg"
                size="sm"
                color={'gray'}
                onClick={() => setShowAccessibilityControls(!showAccessibilityControls)}
                style={{ opacity: showAccessibilityControls ? 1 : .5 }}
            >
                <IconAccessibleFilled
                    style={{ width: '85%', height: '85%' }}
                    stroke={1.5}
                />
            </ActionIcon>
        );
    }, [showAccessibilityControls]);

    const getDesignValue = (property: string) => {
        return designData?.[editingVariant]?.[property]?.value || ''
    }

    const getValue = (key: string) => {
        return options?.[key]?.value || ''
    }

    const updateValue = (key: string, value: any) => {
        if (!block || !options) { return }

        if (options?.[key]) {
            options[key].value = value;
        } else {
            options[key] = {
                vs: 'm',
                value
            }
        }
        updated();
    }

    const handleHideFromScreenReaders = (checked: boolean) => {
        if (!block || !options) { return }
        if (checked) {
            if (options?.hfsr) {
                options.hfsr.value = true;
            } else {
                options.hfsr = {
                    vs: 'm',
                    value: true
                }
            }

            // delete SRL when hidden
            delete options.srl;

            // Also reset focusable to false because hidden elements shouldn't be focusable
            delete options.focusable;

        } else {
            delete options.hfsr;
        }
        updated();
    }

    // New handler for Focusable toggle
    const handleFocusableToggle = (checked: boolean) => {
        if (!block || !options) return;

        if (checked) {
            options.focusable = {
                vs: 'm',
                value: true
            }
        } else {
            delete options.focusable;
        }
        updated();
    }

    const isAriaHidden = options?.hfsr?.value === true;
    const tag = getValue('t') || 'div';

    // Native focusable tags that get keyboard focus automatically
    const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

    // Determine if we can show & enable the Focusable toggle
    const canToggleFocusable = !isAriaHidden && !nativeFocusableTags.includes(tag);

    // Get focusable option value
    const isFocusable = options?.focusable?.value === true;


    let screenReaderLabel = 'Screen Reader Label';
    if (tag === 'a') { screenReaderLabel = 'Link Label' }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* HTML TAG */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, flex: 1 }}>HTML Tag</span>
                <Select
                    size="xs"
                    radius="lg"
                    data={[
                        { label: 'Div', value: 'div' },
                        { label: 'Section', value: 'section' },
                        { label: 'Main', value: 'main' },
                        { label: 'Header', value: 'header' },
                        { label: 'Footer', value: 'footer' },
                        { label: 'Navigation', value: 'nav' },
                        { label: 'Link', value: 'a' },
                    ]}
                    value={tag}
                    onChange={(v) => updateValue('t', v)}
                    checkIconPosition="right"
                    allowDeselect={false}
                />
            </div>
            {showAccessibilityControls && <>
                {/* Screen Reader Label */}
                {!isAriaHidden && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, flex: 1 }}>{screenReaderLabel}</span>
                        <Input
                            variant="filled"
                            size="xs"
                            radius="xl"
                            onChange={(e) => updateValue('srl', e.currentTarget.value)}
                            value={getValue('srl')}
                        />
                    </div>
                )}
                {/* Hide from Screen Readers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, flex: 1 }}>Hide from Screen Readers</span>
                    <Switch
                        checked={isAriaHidden}
                        onChange={(e) => handleHideFromScreenReaders(e.currentTarget.checked)}
                        radius="sm"
                        color='rgb(153 177 210)'
                        size='xs'
                    />
                </div>
                {/* Focusable toggle */}
                {canToggleFocusable && <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ fontSize: 11, flex: 1 }}>Focusable</span>
                    <Switch
                        checked={isFocusable}
                        onChange={(e) => handleFocusableToggle(e.currentTarget.checked)}
                        radius="sm"
                        color='rgb(153 177 210)'
                        size='xs'
                    />
                </div>}
            </>}
        </div>
    );
};

const LinkOptionSection = ({
    id,
    block,
    updated,
    buttonPass,
    sectionId
}: {
    id: string;
    block: EditorBlock;
    updated: () => void;
    buttonPass: (sectionId: string, btn: JSX.Element) => void;
    sectionId: string;
}) => {

    const { pageBlocks, page, setPage, editingBlock, editingVariant } = useEditorContext();
    const editingDevice = '';
    const designData = block?.data?.design;
    const options = block?.data?.options;

    const parsedData = useMemo(() => {
        if (!block?.dt) return {};
        return KVParser.parse(block.dt);
    }, [block?.dt]);

    const currentDisplayMode = parsedData.dm ?? 'b';

    const [showAllOptions, setShowAllOptions] = useState(false);

    /**
 * Pass header button
 * uses latest display mode because dependencies are correct
 */
    useEffect(() => {
        buttonPass(
            sectionId,
            <ActionIcon
                variant="transparent"
                radius="lg"
                size="sm"
                color={'gray'}
                onClick={() => setShowAllOptions(!showAllOptions)}
                style={{ opacity: showAllOptions ? 1 : .5 }}
            >
                <IconDots
                    style={{ width: '85%', height: '85%' }}
                    stroke={1.5}
                />
            </ActionIcon>
        );
    }, [showAllOptions]);


    const getDesignValue = (property: string) => {
        return designData?.[editingVariant]?.[property]?.value || ''
    }

    const getValue = (key: string) => {
        return options?.[key]?.value || ''
    }

    const updateValue = (key: string, value: any) => {
        if (!block || !options) { return }

        if (options?.[key]) {
            options[key].value = value;
        } else {
            options[key] = {
                vs: 'm',
                value
            }
        }
        updated();
    }

    const updateDownloadValue = (key: string, value: any) => {
        if (!block || !options) { return }

        if (options?.[key]) {
            options[key].value = value;
        } else {
            options[key] = {
                vs: 'm',
                value
            }
        }

        if (!value) {
            delete options?.ldon;
        }

        updated();
    }

    const handleHideFromScreenReaders = (checked: boolean) => {
        if (!block || !options) { return }
        if (checked) {
            if (options?.hfsr) {
                options.hfsr.value = true;
            } else {
                options.hfsr = {
                    vs: 'm',
                    value: true
                }
            }

            // delete SRL when hidden
            delete options.srl;

            // Also reset focusable to false because hidden elements shouldn't be focusable
            delete options.focusable;

        } else {
            delete options.hfsr;
        }
        updated();
    }

    // New handler for Focusable toggle
    const handleFocusableToggle = (checked: boolean) => {
        if (!block || !options) return;

        if (checked) {
            options.focusable = {
                vs: 'm',
                value: true
            }
        } else {
            delete options.focusable;
        }
        updated();
    }

    const isAriaHidden = options?.hfsr?.value === true;
    const tag = getValue('t') || 'div';

    // Native focusable tags that get keyboard focus automatically
    const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

    // Determine if we can show & enable the Focusable toggle
    const canToggleFocusable = !isAriaHidden && !nativeFocusableTags.includes(tag);

    // Get focusable option value
    const isFocusable = options?.focusable?.value === true;


    const REL_ATTRIBUTE_OPTIONS = [
        { label: 'No Opener', value: 'noopener' },
        { label: 'No Referrer', value: 'noreferrer' },
        { label: 'No Follow', value: 'nofollow' },
        { label: 'Sponsored', value: 'sponsored' },
        { label: 'User Generated Content', value: 'ugc' },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Link  */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, flex: 1 }}>URL</span>
                <Input
                    variant="filled"
                    size="xs"
                    radius="xl"
                    onChange={(e) => updateValue('lURL', e.currentTarget.value)}
                    value={getValue('lURL')}
                />
            </div>
            {showAllOptions && <>
                {/* New Tab */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, flex: 1 }}>Open in New Tab</span>
                    <Switch
                        checked={getValue('lnt')}
                        onChange={(e) => updateValue('lnt', e.currentTarget.checked)}
                        radius="sm"
                        color='rgb(153 177 210)'
                        size='xs'
                    />
                </div>

                {/* Download */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, flex: 1 }}>Download</span>
                    <Switch
                        checked={getValue('ldo')}
                        onChange={(e) => {
                            updateDownloadValue('ldo', e.currentTarget.checked);
                        }}
                        radius="sm"
                        color='rgb(153 177 210)'
                        size='xs'
                    />
                </div>
                {getValue('ldo') && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, flex: 1 }}>File Name</span>
                    <Input
                        variant="filled"
                        size="xs"
                        radius="xl"
                        onChange={(e) => updateValue('ldon', e.currentTarget.value)}
                        value={getValue('ldon')}
                    />
                </div>}
                {/* Rel Attribute */}
                {<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, flex: 1 }}>Rel Attribute</span>
                    <MultiSelect
                        size="xs"
                        radius={3}
                        variant="filled"
                        data={REL_ATTRIBUTE_OPTIONS}
                        value={getValue('lrel')?.split(' ').filter(Boolean)}
                        onChange={(v) => updateValue('lrel', v?.join(' '))}
                        clearable
                    />
                </div>}
            </>
            }
        </div>
    );
};


// Initial block configuration
const blockConfig: BlockConfig = {
    title: 'Box',
    icon: <BoxIcon />,
    cats: ['layout'],
    type: 'b',
    children: true,
    rootAllow: true,
    childCats: ['basic', 'layout', 'template'],
    designSections: [
        'position',
        'size',
        'spacing',
        'border',
        'layout',
        'typography',
        'transform',
        'transformSpace',
        'backdropFilter',
        'visibility',
        'background'
    ],
    props: {
        design: `
            base{pt:re;w:100px;h:100px;}
        `,
        options: 't=div;',
        animations: {},
        variants: [{ id: 'base' }],
        designTypes: '',
        lt: 'bl',
        mode: 'e',
    },
    optionSections: [
        { label: 'Link Options', component: LinkOptionSection, condition: "t=a" },
        { label: 'Postion', component: PositionSection },
        { label: 'Layout', component: LayoutOptionSection },
        { label: 'Appearance', component: AppearanceSection },
        { label: 'Background', component: BackgroundsSection },
        { label: 'Variables', component: VariablesOptionSection, condition: "_mode=c" },
        { label: 'Transition', component: TransitionSection },
        { label: 'Interaction', component: InteractiveIdSection },
        { label: 'Variant Interaction Map', component: VariantMapSection },
        { label: 'Variant Options', component: VariantOptionSection },
        { label: 'Container', component: ContainerSection },
        { label: 'Accessibility & Semantics', component: AccessibilityOptionSection },
    ]
};

// Create a new block instance
const box = new Block(blockConfig);

//
export const stack = new Block(
    {
        ...blockConfig,
        title: 'Stack',
        icon: <DimensionsIcon />,
        preset: 'stack',
        props: {
            ...blockConfig.props,
            design: {
                base: {
                    ...blockConfig.props.design.st,
                    st: {
                        pt: {
                            vs: "m",
                            value: "re"
                        },
                        dti: {
                            vs: "m",
                            value: "0"
                        },
                        dt: {
                            vs: "m",
                            value: "fl"
                        },
                        va: {
                            vs: "m",
                            value: "top"
                        },
                        fd: {
                            vs: "m",
                            value: "ro"
                        },
                        jc: {
                            vs: "m",
                            value: "fs"
                        },
                        ai: {
                            vs: "m",
                            value: "fs"
                        },
                        ac: {
                            vs: "m",
                            value: "fs"
                        },
                        cgp: {
                            vs: "m",
                            value: [10, "px"]
                        },
                        rgp: {
                            vs: "m",
                            value: [10, "px"]
                        },
                        fw: {
                            vs: "m",
                            value: "nw"
                        }
                    }
                }
            }
        }
    }
);

export const grid = new Block(
    {
        ...blockConfig,
        title: 'Grid',
        icon: <GridIcon />,
        preset: 'grid',
        props: {
            ...blockConfig.props,
            ...blockConfig.props.design.st,
            design: {
                base: {
                    st: {
                        pt: {
                            vs: "m",
                            value: "re"
                        },
                        dti: {
                            vs: "m",
                            value: "0"
                        },
                        dt: {
                            vs: "m",
                            value: "gr"
                        },
                        va: {
                            vs: "m",
                            value: "top"
                        },
                        w: {
                            vs: "m",
                            value: [100, "%"]
                        },
                        h: {
                            vs: "m",
                            value: [100, "px"]
                        },
                        gt: {
                            vs: "m",
                            value: {
                                c: [
                                    [1, "fr"],
                                    [1, "fr"]
                                ],
                                r: [
                                    [1, "fr"],
                                    [1, "fr"]
                                ]
                            }
                        },
                        ai: {
                            vs: "m",
                            value: "fs"
                        },
                        ji: {
                            vs: "m",
                            value: "fs"
                        },
                        rgp: {
                            vs: "m",
                            value: [10, "px"]
                        },
                        cgp: {
                            vs: "m",
                            value: [10, "px"]
                        }
                    }
                }
            },

            gridLayoutMap: {
                base: {}
            }
        }
    }
);

export const sceneTransition = new Block(
    {
        ...blockConfig,
        title: 'Scene Transition',
        icon: <MaskOffIcon />,
        preset: 'sceneTransition',
        cats: ['wrappers'],
        childCats: ['basic', 'layout'],
        designSections: null,
        options: {
            transition: {
                label: 'Transition',
                actions: true,
                order: ['ldu', 'crd'],
                properties: {
                    ldu: {
                        label: 'Loader Duration (ms)',
                        controlType: 'number',
                        lock: true,
                        inputData: {
                            nagative: false
                        },
                        responsive: false,
                        colorMode: false,
                        data: {
                            vs: 'm',
                            value: 1000,
                        },
                    },
                    crd: {
                        label: 'Content Reveal Delay (ms)',
                        controlType: 'number',
                        lock: true,
                        inputData: {
                            nagative: false
                        },
                        responsive: false,
                        colorMode: false,
                        data: {
                            vs: 'm',
                            value: 500,
                        },
                    },
                }
            }
        },
        props: {
            ...blockConfig.props,
            options: {
                tag: {
                    vs: 'm',
                    value: 'section'
                },
                wrapper: {
                    vs: 'm',
                    value: 'sceneTransition'
                },
                ldu: {
                    vs: 'm',
                    value: 1000
                },
                crd: {
                    vs: 'm',
                    value: 500
                }
            },
        }
    }
);

export default box;






//  animations: {
//             'base-hover': {
//                 bgc: [
//                     { v: 'teal', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//                 tx: [
//                     { v: '100px', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//                 ty: [
//                     { v: '100px', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//                 scx: [
//                     { v: '2', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//             },
//             'hover-base': {
//                 bgc: [
//                     { v: null, du: 600, e: 'ease-in' },
//                 ],
//                 tx: [
//                     { v: null, du: 500 },
//                 ],
//                 ty: [
//                     { v: null, du: 500 },
//                 ],
//                 scx: [
//                     { v: null, du: 500 },
//                 ],

//             },
//         },