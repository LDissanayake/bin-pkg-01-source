import React, { useCallback, useMemo } from 'react';
import { Block as EditorBlock, useEditorContext } from '../../EditorContext';
import { PositionStatic, PositionRelative, PositionAbsolute, PositionFixed, PositionSticky, DirectionalIcon } from './positionIcons';
import { Center, SegmentedControl } from '@mantine/core';
import { compactDesign } from '../../util/styleCodec';
import * as styles from './PositionSection.module.css';
import { TRBLController } from '../controls/TRBLController';
import KVParser from '../../util/KVParser';
import DragNumberInput from '../../OptionPanel/components/Controls/DragNumberInput';
import deleteKeyFromObject from '../util/deleteKeyFromObject';
import { IconStack } from '@tabler/icons-react';

function notIncluded(a: string[], b: string[]): string[] {
    return a
        .filter(item => !b.includes(item))
        .map(item => item.toLowerCase());
}

type PositionKey = 't' | 'r' | 'b' | 'l';
type PositionPreset = 'T' | 'R' | 'B' | 'L';
type VariantKey = 'base' | string;

interface PositionSectionProps {
  id: string;
  block: EditorBlock;
  updated: () => void;
  buttonPass: (sectionId: string, btn: JSX.Element) => void;
  sectionId: string;
}

interface ChangePayload {
  value: string;
  property: string;
  variant: VariantKey;
}

const POSITION_INFO: Record<string, { label: string; desc: string }> = {
  static: { label: 'Static', desc: 'Default flow.' },
  relative: { label: 'Relative', desc: 'Self-offset.' },
  absolute: { label: 'Absolute', desc: 'Parent-bound.' },
  fixed: { label: 'Fixed', desc: 'Viewport-bound.' },
  sticky: { label: 'Sticky', desc: 'Scroll-stop.' },
};

const DIRECTION_MAP: Record<PositionPreset, { key: PositionKey; css: string }> = {
  T: { key: 't', css: 'top' },
  R: { key: 'r', css: 'right' },
  B: { key: 'b', css: 'bottom' },
  L: { key: 'l', css: 'left' },
};

export const PositionSection = ({
  block,
  updated,
  sectionId,
}: PositionSectionProps) => {
  const { editingVariant } = useEditorContext();

  const designData = block?.data?.design;

  /**
   * Parse `dt` only once per change.
   * `dt` is metadata-like data, so re-parsing every render is wasteful.
   */
  const parsedDT = useMemo(() => {
    if (!block?.dt) return {};
    return KVParser.parse(block.dt);
  }, [block?.dt]);

  /**
   * Active TRBL presets (ex: ['T', 'L'])
   */
  const activePresets: PositionPreset[] =
    parsedDT.pp?.split('') ?? [];

  /**
   * Removes design properties that are no longer used
   * (ex: user disables "Top" → remove `t`)
   */
  const removeDesignProps = useCallback(
    (keys: string[]) => {
      if (!designData) return;

      keys.forEach((key) => {
        deleteKeyFromObject(designData, key);
      });

      block.d = compactDesign(designData);
    },
    [block, designData]
  );

  /**
   * Handle TRBL preset changes
   */
  const handlePresetChange = useCallback(
    (nextPresets: PositionPreset[]) => {
      if (!block) return;

      const nextDT = {
        ...parsedDT,
        pp: nextPresets.join(''),
      };

      block.dt = KVParser.stringify(nextDT);

      // Remove unused TRBL values
      const toRemove = notIncluded(activePresets, nextPresets);
      removeDesignProps(toRemove);

      updated();
    },
    [block, parsedDT, activePresets]
  );

  /**
   * Generic design change handler
   */
  const handleChange = useCallback(
    ({ value, property, variant }: ChangePayload) => {
      if (!designData || !value) return;

      designData[variant] ??= {};
      designData[variant][property] ??= { vs: 'm', value };

      designData[variant][property].value = value;

      block.d = compactDesign(designData);
      updated();
    },
    [block, designData, updated]
  );

  /**
   * Helpers for inputs
   */
  const getValue = (property: string, variant: VariantKey) =>
    designData?.[variant]?.[property]?.value ?? '';

  const getPlaceholder = (property: string) =>
    designData?.base?.[property]?.value ?? '';

  const positionType = getValue('po', 'base') || 'static';
  const isStatic = positionType === 'static';

  /**
   * Position type change logic
   * - Static clears all TRBL + z-index
   */
  const handlePositionTypeChange = (value: string) => {
    if (value === 'static') {
      removeDesignProps(['zi', 't', 'r', 'b', 'l']);
      handlePresetChange([]);
    }

    handleChange({ value, property: 'po', variant: 'base' });
  };

  return (
    <div>
      {/* Position type selector */}
      <SegmentedControl
        size="md"
        style={{ border: '1px solid var(--in-c)' }}
        withItemsBorders={false}
        fullWidth
        value={positionType}
        onChange={handlePositionTypeChange}
        data={[
          { label: <Center><PositionStatic size={16} /></Center>, value: 'static' },
          { label: <Center><PositionRelative size={16} /></Center>, value: 'relative' },
          { label: <Center><PositionAbsolute size={16} /></Center>, value: 'absolute' },
          { label: <Center><PositionFixed size={16} /></Center>, value: 'fixed' },
          { label: <Center><PositionSticky size={16} /></Center>, value: 'sticky' },
        ]}
      />

      {/* Info */}
      <div className={styles.postionInfo}>
        {POSITION_INFO[positionType]?.label}
        <span> — {POSITION_INFO[positionType]?.desc}</span>
      </div>

      {/* TRBL + Z-index */}
      {!isStatic && (
        <div className={styles.ppBox}>
          <div className={styles.ppBox_left}>
            <TRBLController
              value={activePresets}
              onChange={handlePresetChange}
            />
          </div>

          <div className={styles.ppBox_right}>
            {activePresets.map((dir) => {
              const { key, css } = DIRECTION_MAP[dir];

              return (
                <DragNumberInput
                  key={dir}
                  value={getValue(key, editingVariant)}
                  placeholder={getPlaceholder(key) || 'auto'}
                  onChange={(v) =>
                    handleChange({
                      value: v,
                      property: key,
                      variant: editingVariant,
                    })
                  }
                  icon={
                    <DirectionalIcon
                      direction={css as 'top' | 'right' | 'bottom' | 'left'}
                      outlineWidth={1}
                      indicatorWidth={2}
                    />
                  }
                  units={[
                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'Auto', value: 'auto', keyword: true },
                  ]}
                  defaultUnit="px"
                />
              );
            })}

            <DragNumberInput
              value={getValue('zi', 'base')}
              placeholder="auto"
              onChange={(v) =>
                handleChange({
                  value: v,
                  property: 'zi',
                  variant: 'base',
                })
              }
              icon={<IconStack size={14} stroke={1.5} />}
            />
          </div>
        </div>
      )}
    </div>
  );
};




export default PositionSection;