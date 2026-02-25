import React, { useRef, useState } from 'react';
import { useEditorContext } from '../EditorContext';
import { blockRegistry } from '../Blocks';
import VariantManager from './components/VariantManager';
import Section from './components/Section';
import SectionTemplate from './components/Sections/SectionTemplate';
import DesignSyntaxEditor from './components/DesignSyntaxEditor';
import { compactDesign, expandDesign } from '../util/styleCodec';
import { ScrollArea } from '@mantine/core';
import QuerySection from '../Blocks/optionSections/QuerySection';

function OptionPanel() {
    const { editingBlock, setPage, pageBlocks, editingVariant, editMode } = useEditorContext();
    const [hash, setHash] = useState(Date.now());

    const blockId = editingBlock as string;
    const block = pageBlocks.current.get(blockId);

    if (!block) {
        return '';
    }

    const blockTemplate = blockRegistry[block?.pr || block.t];

    const supportDesign = blockTemplate.designSections?.length;

    const optionSections = blockTemplate.optionSections;

    const handleBlockUpdate = () => {
        setPage(prev => ({
            ...prev,
            [editingBlock as string]: Date.now(),
        }));
    }

    /**
     * Handle DSL Editor
     * @param d string
     */
    const handleBlockDesignStringChange = (d: string) => {
        if (d) {
            block.d = d;
            if (block?.data) {
                block.data.design = expandDesign(d);
                handleBlockUpdate();
            }
        }
    }

    const [titleButtons, setTitleButtons] = useState<{ [sectionId: string]: JSX.Element }>({});

    const handleTitleButtonPass = (sectionId: string, btn: JSX.Element) => {

        setTitleButtons((prev) => {
            return {
                ...prev,
                [blockId + sectionId]: btn
            }
        })
    }

    if (editMode === 'text' && supportDesign) {
        return <DesignSyntaxEditor
            initCode={compactDesign(block.data?.design || {}, true)}
            onChange={handleBlockDesignStringChange}
        />
    }

    return <div key={editingBlock} style={{ display: 'flex', maxHeight: '100%', width: '100%'}}>
        <ScrollArea.Autosize
            mah={'100%'}
            w={280}
            type="never"
        >
            {supportDesign ? <>
                <VariantManager forceUpdate={setHash} />
                {/* <QuerySection/> */}
                <div key={editingBlock + editingVariant + hash}>
                    <Section type="size" />
                    <Section type="transform" />
                </div>
            </> : ''}

            {optionSections?.map((sec, i) => {
                let render = true;

                if (sec.condition) {
                    const [key, value] = sec.condition.split('=');
                    let option;
                    if (key === '_mode') {
                        option = block.m;
                    } else {
                        option = block.data?.options?.[key]?.value;
                    }
                    render = option === value;
                }

                if (!render) { return null }

                return <SectionTemplate title={sec.label} open key={sec.label} buttons={titleButtons[blockId + sec.label]}>
                    <sec.component
                        key={i}
                        id={blockId}
                        block={block}
                        updated={() => handleBlockUpdate()}
                        buttonPass={handleTitleButtonPass}
                        sectionId={sec.label}
                    />
                </SectionTemplate>
            })}
            <div style={{height:'100px' }}></div>
        </ScrollArea.Autosize>


    </div>
}

export default OptionPanel;

