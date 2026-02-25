import React, { useCallback, useMemo } from 'react';
import { useEditorContext, Block as EditorBlock } from '../../EditorContext';
import { decodeOptions } from '../../util/optionCodec';
import { compactDesign } from '../../util/styleCodec';
import SelectWithIconControl from '../../OptionPanel/components/Controls/SelectWithIconControl';
import { FontBoldIcon, FontFamilyIcon, FontSizeIcon, FontStyleIcon, LetterSpacingIcon, LineHeightIcon } from '@radix-ui/react-icons';
import { Switch } from '@mantine/core';
import DragNumberInput from '../../OptionPanel/components/Controls/DragNumberInput';

/* ---------------------------------------------
 * Types
 * -------------------------------------------- */

type VariantKey = 'base' | string;

type FontAssetValue = [
  family: string,
  category?: string,
  variants?: string[]
];

type FontItem = {
  id: string;
  label: string;
  role: string;
  cssVar: string;
  weights: string[];
  hasItalic: boolean;
};

interface TypoSectionProps {
  block: EditorBlock;
  updated: () => void;
}

/* ---------------------------------------------
 * Utils
 * -------------------------------------------- */

const normalizeRole = (label: string) =>
  label
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const roleFromCssVar = (value?: string) => {
  if (!value) return null;
  const match = value.match(/--addifect-f-(.+)\)/);
  return match?.[1] ?? null;
};

/**
 * Normalize font variants into usable weights + italic support
 */
function normalizeFontVariants(variants?: string[]) {
  const weights = new Set<string>();
  let hasItalic = false;

  if (!variants || !variants.length) {
    return { weights: ['400'], hasItalic: false };
  }

  variants.forEach((variant) => {
    const v = variant.toLowerCase();

    // regular → 400
    if (v === 'regular') {
      weights.add('400');
      return;
    }

    // italic → 400 + italic
    if (v === 'italic') {
      weights.add('400');
      hasItalic = true;
      return;
    }

    // 700italic
    if (v.endsWith('italic')) {
      hasItalic = true;
      const w = v.replace('italic', '');
      if (/^\d+$/.test(w)) weights.add(w);
      return;
    }

    // numeric weight
    if (/^\d+$/.test(v)) {
      weights.add(v);
    }
  });

  return {
    weights: weights.size ? Array.from(weights).sort() : ['400'],
    hasItalic,
  };
}

/* ---------------------------------------------
 * Component
 * -------------------------------------------- */

const TypoSection = ({ block, updated }: TypoSectionProps) => {
  const { pageBlocks, editingDesignId, editingVariant } = useEditorContext();
  const blocks = pageBlocks.current;

  /* ---------- Resolve Assets ---------- */

  const designId = editingDesignId as string;
  const designBlock = blocks.get(designId);
  if (!designBlock) return null;

  const designOptions = decodeOptions(designBlock.o || '');
  const assetsId = designOptions.assid?.value;
  const assetsBlock = blocks.get(assetsId);
  if (!assetsBlock) return null;

  const assetsOptions = decodeOptions(assetsBlock.o || '');
  const fontsFolderId = assetsOptions.default?.value?.fbid;
  const fontsFolder = blocks.get(fontsFolderId);
  const fontIds: string[] = fontsFolder?.c ?? [];

  /* ---------- Font List ---------- */

  const fontList: FontItem[] = useMemo(() => {
    return fontIds
      .map((id) => {
        const fontBlock = blocks.get(id);
        if (!fontBlock?.l) return null;

        const options =
          fontBlock.data?.options ??
          (fontBlock.o ? decodeOptions(fontBlock.o) : null);

        const value = options?.f?.value as FontAssetValue | undefined;
        if (!value) return null;

        const [, , variants] = value;
        const role = normalizeRole(fontBlock.l);
        const { weights, hasItalic } = normalizeFontVariants(variants);

        return {
          id,
          label: fontBlock.l,
          role,
          cssVar: `var(--addifect-f-${role})`,
          weights,
          hasItalic,
        };
      })
      .filter(Boolean) as FontItem[];
  }, [fontIds, blocks]);

  /* ---------- UI Options ---------- */

  const fontFamilyOptions = useMemo(
    () =>
      fontList.map((font) => ({
        label: font.label,
        value: font.cssVar,
      })),
    [fontList]
  );

  /* ---------- Design Helpers ---------- */

  const designData = block.data?.design;

  const getValue = (property: string, variant: VariantKey) =>
    designData?.[variant]?.[property]?.value ?? '';

  const handleChange = useCallback(
    (property: string, value: any, variant: VariantKey = 'base') => {
      if (!designData) return;

      designData[variant] ??= {};
      designData[variant][property] ??= { vs: 'm', value };
      designData[variant][property].value = value;

      block.d = compactDesign(designData);
      updated();
    },
    [block, designData, updated]
  );

  /* ---------- Active Font ---------- */

  const activeFont = useMemo(() => {
    const role = roleFromCssVar(getValue('ff', 'base'));
    return fontList.find((f) => f.role === role) ?? null;
  }, [fontList, getValue]);

  const weightOptions = useMemo(
    () =>
      (activeFont?.weights ?? ['400']).map((w) => ({
        label: w === '400' ? 'Regular' : w,
        value: w,
      })),
    [activeFont]
  );

  /* ---------- Handlers ---------- */

  const handleFontFamilyChange = (value: string) => {
    handleChange('ff', value);

    const role = roleFromCssVar(value);
    const font = fontList.find((f) => f.role === role);
    if (!font) return;

    // reset weight if unsupported
    if (!font.weights.includes(getValue('fw', 'base'))) {
      handleChange('fw', font.weights[0]);
    }

    // reset italic if unsupported
    if (!font.hasItalic) {
      handleChange('fst', 'normal');
    }
  };

  const handleItalicToggle = (checked: boolean) => {
    handleChange('fst', checked ? 'italic' : 'normal');
  };

  const getPlaceholder = (property: string) => {
    return designData?.base?.[property]?.value || ''
  }


  /* ---------- Render ---------- */

  return (
    <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        {/* Font Family */}
        <SelectWithIconControl
          icon={<FontFamilyIcon />}
          value={getValue('ff', 'base')}
          data={fontFamilyOptions}
          onChange={(v) => v && handleFontFamilyChange(v)}
        />

        {/* Font Weight */}
        <SelectWithIconControl
          icon={<FontBoldIcon />}
          value={getValue('fw', 'base')}
          data={weightOptions}
          onChange={(v) => v && handleChange('fw', v)}
        />
      </div>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        {/* Font Size */}
        <DragNumberInput
          value={getValue('fs', editingVariant)}
          onChange={(v: string) => handleChange('fs', v, editingVariant)}
          icon={<FontSizeIcon />}
          units={[
            { label: 'px', value: 'px' },
            { label: 'em', value: 'em' },
            { label: 'rem', value: 'rem' },
            { label: '%', value: '%' },
            { label: 'vh', value: 'vh' },
            { label: 'vw', value: 'vw' }, 
          ]}
          defaultUnit='px'
          placeholder={getPlaceholder('fs') || '16px'}
        />

        {/* Line height */}
        <DragNumberInput
          value={getValue('lh', editingVariant)}
          onChange={(v: string) => handleChange('lh', v, editingVariant)}
          icon={<LineHeightIcon />}
          units={[
            { label: '-', value: '' },
            { label: 'px', value: 'px' },
            { label: 'em', value: 'em' },
            { label: 'rem', value: 'rem' },
            { label: '%', value: '%' },
            { label: 'vh', value: 'vh' },
            { label: 'vw', value: 'vw' }, 
          ]}
          defaultUnit=''
          // placeholder={getPlaceholder('fs') || '16px'}
        />
        {/* letter space */}
        <DragNumberInput
          value={getValue('ls', editingVariant)}
          onChange={(v: string) => handleChange('ls', v, editingVariant)}
          icon={<LetterSpacingIcon />}
          allowNegative={true}
          units={[
            { label: 'px', value: 'px' },
            { label: 'em', value: 'em' },
            { label: 'rem', value: 'rem' },
            { label: '%', value: '%' },
          ]}
          defaultUnit='px'
          step={.1}
          // placeholder={getPlaceholder('fs') || '16px'}
        />
        </div>
        {/* Italic */}
        <Switch
          label="Italic"
          checked={getValue('fst', 'base') === 'italic'}
          disabled={!activeFont?.hasItalic}
          onChange={(e) => handleItalicToggle(e.currentTarget.checked)}
        />
      </div>
      );
};

      export default TypoSection;
