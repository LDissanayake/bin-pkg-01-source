import React, { useEffect, useState } from 'react';
import * as styles from './SizeSection.module.css';
import { useEditorContext } from '../../../EditorContext';
import { IconSkewX, IconSkewY } from '@tabler/icons-react';
import SectionTemplate from './SectionTemplate';
import DragNumberInput from '../Controls/DragNumberInput';
import { compactDesign, expandDesign } from '../../../util/styleCodec';
import { DotsHorizontalIcon, HeightIcon, WidthIcon } from '@radix-ui/react-icons';
import MiniActionButton from '../Controls/MiniActionButton';
import KVParser from '../../../util/KVParser';

// Option A: Defining as Components (Recommended for <svgs.minWidth /> usage)
const svgs = {
  minWidth: (props) => (
    <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 10h12M9 10l2-2M9 10l2 2M21 10l-2-2M21 10l-2 2" />
      <path d="M7 5v10M23 5v10" opacity="0.3" />
    </svg>
  ),
  maxWidth: (props) => (
    <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10h5M26 10h-5M9 10l-2-2M9 10l-2 2M21 10l2-2M21 10l2 2" />
      <path d="M11 5v10M19 5v10" opacity="0.3" />
    </svg>
  ),
  minHeight: (props) => (
    <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 5v10M15 5l-2 2M15 5l2 2M15 15l-2-2M15 15l2-2" />
      <path d="M9 5h12M9 15h12" opacity="0.3" />
    </svg>
  ),
  maxHeight: (props) => (
    <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 2v5M15 18v-5M15 7l-2-2M15 7l2-2M15 13l-2 2M15 13l2 2" />
      <path d="M9 7h12M9 13h12" opacity="0.3" />
    </svg>
  ),
};

const TransformSection = () => {

  const { pageBlocks, page, setPage, editingBlock, editingVariant } = useEditorContext();

  const editingDevice = '';
  const blockId = editingBlock as string
  const block = pageBlocks.current.get(blockId);

  const designData = block?.data?.design;

  const [hash, setHash] = useState(Date.now());
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    if (lastUpdate !== page[blockId]) {
      setHash(page[blockId]);
    }
  }, [page[blockId]]);


  const handleChange = (value: string, property: string) => {
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

      // const comp = compactDesign(designData);
      // block.d = comp;
    }

    const _updated = Date.now();

    setLastUpdate(_updated);

    setPage(prev => ({
      ...prev,
      [blockId]: _updated
    }));

  }

  const getValue = (property: string) => {
    return designData?.[editingVariant]?.[property]?.value || ''
  }

  const getPlaceholder = (property: string) => {
    return designData?.base?.[property]?.value || ''
  }

  const handleAdvanced = () => {
    if (!block) { return }

    let data = {}

    if (block?.dt) {
      data = KVParser.parse(block.dt);
    }

    data.sm = data.sm === 'a' ? 'd' : 'a';

    block.dt = KVParser.stringify(data);

    const _updated = Date.now();

    setLastUpdate(_updated);
    
    setPage(prev => ({
      ...prev,
      [blockId]: _updated
    }));

  }

  const sizeMode = () => {
    if (block?.dt) {
      const data = KVParser.parse(block.dt);
      return data?.sm || 's';
    }

    return 's';
  }

  return <SectionTemplate title='Size' open={true} key={hash}>
    <div className={styles.transformSection}>
      <DragNumberInput
        value={getValue('w')}
        placeholder={getPlaceholder('w')}
        onChange={(v: string) => handleChange(v, 'w')}
        icon={<WidthIcon />}
        units={[
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'vh', value: 'vh' },
          { label: 'vw', value: 'vw' },
          { value: "auto", label: "Auto", keyword: true },
          { value: "fit-content", label: "Fit", keyword: true },
        ]}
        defaultUnit='px'
      />
      <DragNumberInput
        value={getValue('h')}
        placeholder={getPlaceholder('h')}
        onChange={(v: string) => handleChange(v, 'h')}
        icon={<HeightIcon />}
        units={[
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'vh', value: 'vh' },
          { label: 'vw', value: 'vw' },
          { value: "auto", label: "Auto", keyword: true },
          { value: "fit-content", label: "Fit", keyword: true },
        ]}
        defaultUnit='px'
      />
      <MiniActionButton icon={<DotsHorizontalIcon />} onClick={handleAdvanced} />
      {sizeMode() === 'a' && <>
        <DragNumberInput
          value={getValue('minw')}
          placeholder={getPlaceholder('minw')}
          onChange={(v: string) => handleChange(v, 'minw')}
          icon={<svgs.minWidth />}
          units={[
            { label: 'px', value: 'px' },
            { label: '%', value: '%' },
            { label: 'vh', value: 'vh' },
            { label: 'vw', value: 'vw' },
            { value: "auto", label: "Auto", keyword: true },
            { value: "fit-content", label: "Fit", keyword: true },
          ]}
          defaultUnit='px'
        />
        <DragNumberInput
          value={getValue('minh')}
          placeholder={getPlaceholder('minh')}
          onChange={(v: string) => handleChange(v, 'minh')}
          icon={<svgs.minHeight />}
          units={[
            { label: 'px', value: 'px' },
            { label: '%', value: '%' },
            { label: 'vh', value: 'vh' },
            { label: 'vw', value: 'vw' },
            { value: "auto", label: "Auto", keyword: true },
            { value: "fit-content", label: "Fit", keyword: true },
          ]}
          defaultUnit='px'
        />
        <span className={styles.hint}>min</span>

        <DragNumberInput
          value={getValue('maxw')}
          placeholder={getPlaceholder('maxw')}
          onChange={(v: string) => handleChange(v, 'maxw')}
          icon={<svgs.maxWidth />}
          units={[
            { label: 'px', value: 'px' },
            { label: '%', value: '%' },
            { label: 'vh', value: 'vh' },
            { label: 'vw', value: 'vw' },
            { value: "auto", label: "Auto", keyword: true },
            { value: "fit-content", label: "Fit", keyword: true },
          ]}
          defaultUnit='px'
        />
        <DragNumberInput
          value={getValue('maxh')}
          placeholder={getPlaceholder('maxh')}
          onChange={(v: string) => handleChange(v, 'maxh')}
          icon={<svgs.maxHeight />}
          units={[
            { label: 'px', value: 'px' },
            { label: '%', value: '%' },
            { label: 'vh', value: 'vh' },
            { label: 'vw', value: 'vw' },
            { value: "auto", label: "Auto", keyword: true },
            { value: "fit-content", label: "Fit", keyword: true },
          ]}
          defaultUnit='px'
        />
        <span className={styles.hint}>max</span>
      </>
      }
    </div>
  </SectionTemplate>
}


export default TransformSection