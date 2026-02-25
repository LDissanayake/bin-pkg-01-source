import React, { } from 'react';
import * as styles from './TransformSection.module.css';
import { useEditorContext } from '../../../EditorContext';
import { IconSkewX, IconSkewY } from '@tabler/icons-react';
import SectionTemplate from './SectionTemplate';
import DragNumberInput from '../Controls/DragNumberInput';
import { compactDesign, expandDesign } from '../../../util/styleCodec';


const ScaleIcons = {
  ScaleX: (props) => (
    <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Centered 8x8 Square */}
      <rect x="11" y="6" width="8" height="8" rx="1" />

      {/* Left Chevron (Flatter: 7px spread, 2px depth) */}
      <path d="M8 6.5l-2 3.5 2 3.5" />

      {/* Right Chevron (Flatter: 7px spread, 2px depth) */}
      <path d="M22 6.5l2 3.5-2 3.5" />
    </svg>
  ),
  ScaleY: (props) => (
    <svg viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* Centered 8x8 Square */}
      <rect x="11" y="6" width="8" height="8" rx="1" />

      {/* Top Chevron (Flatter: 7px spread, 2px depth) */}
      <path d="M11.5 4l3.5-2 3.5 2" />

      {/* Bottom Chevron (Flatter: 7px spread, 2px depth) */}
      <path d="M11.5 16l3.5 2 3.5-2" />
    </svg>
  ),
}

const TransformSection = () => {

  const { pageBlocks, page, setPage, editingBlock, editingVariant } = useEditorContext();

  const editingDevice = '';
  const blockId = editingBlock as string
  const block = pageBlocks.current.get(blockId);

  const designData = block?.data?.design;


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

      const comp = compactDesign(designData);
      block.d = comp;
    }

    setPage(prev => ({
      ...prev,
      [blockId]: Date.now()
    }));

  }

  const getValue = (property: string) => {
    return designData?.[editingVariant]?.[property]?.value || ''
  }

  const getPlaceholder = (property: string) => {
    return designData?.base?.[property]?.value || ''
  }


  return <SectionTemplate title='Transform' open={true}>
    <div className={styles.transformSection}>
      <DragNumberInput
        value={getValue('tx')}
        placeholder={getPlaceholder('tx')}
        onChange={(v: string) => handleChange(v, 'tx')}
        icon={'X'}
        allowNegative
        units={[
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'vh', value: 'vh' },
          { label: 'vw', value: 'vw' },
        ]}
        defaultUnit='px'
      />
      <DragNumberInput
        value={getValue('ty')}
        placeholder={getPlaceholder('ty')}
        onChange={(v: string) => handleChange(v, 'ty')}
        icon={'Y'}
        allowNegative
        units={[
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'vh', value: 'vh' },
          { label: 'vw', value: 'vw' },
        ]}
        defaultUnit='px'
      />
      <span></span>
      <DragNumberInput
        value={getValue('sx')}
        placeholder={getPlaceholder('sx')}
        onChange={(v: string) => handleChange(v, 'sx')}
        icon={<ScaleIcons.ScaleX />}
        min={-90}
        max={90}
        allowNegative
        step={0.1}
      />
      <DragNumberInput
        value={getValue('sy')}
        placeholder={getPlaceholder('sy')}
        onChange={(v: string) => handleChange(v, 'sy')}
        icon={<ScaleIcons.ScaleY />}
        min={-90}
        max={90}
        step={0.1}
        allowNegative
      />
      <span></span>
      <DragNumberInput
        value={getValue('skx')}
        placeholder={getPlaceholder('skx') || 1}
        onChange={(v: string) => handleChange(v, 'skx')}
        icon={<IconSkewX size={14} />}
        units={[{ label: 'deg', value: 'deg' }]}
        defaultUnit='deg'
        allowNegative
      />
      <DragNumberInput
        value={getValue('sky')}
        placeholder={getPlaceholder('sky') || 1}
        onChange={(v: string) => handleChange(v, 'sky')}
        icon={<IconSkewY size={14} />}
        units={[{ label: 'deg', value: 'deg' }]}
        defaultUnit='deg'
        allowNegative
      />
    </div>
  </SectionTemplate>
}


export default TransformSection