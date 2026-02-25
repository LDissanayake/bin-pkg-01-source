import React, { useCallback, useMemo, useState } from 'react';
import { Block as EditorBlock, useEditorContext } from '../../EditorContext';
import { PositionStatic, PositionRelative, PositionAbsolute, PositionFixed, PositionSticky, DirectionalIcon } from './positionIcons';
import { Center, SegmentedControl, UnstyledButton } from '@mantine/core';
import { compactDesign } from '../../util/styleCodec';
import * as styles from './BackgroundsSection.module.css';
import KVParser from '../../util/KVParser';
import deleteKeyFromObject from '../util/deleteKeyFromObject';
import { IconColorPicker, IconPhoto, IconStack } from '@tabler/icons-react';
import { ImageIcon, Pencil1Icon, TransparencyGridIcon, TrashIcon } from '@radix-ui/react-icons';
import ColorPickerControl from '../../OptionPanel/components/Controls/ColorPickerControl';
import MediaPicker from '../controls/MediaPicker';

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
  value: any;
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

const BackgroundsSection = ({
  block,
  updated,
  sectionId,
}: PositionSectionProps) => {
  const { editingVariant } = useEditorContext();

  // const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [openPanel, setOpenPanel] = useState(false);

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
   * Active background mode
   */
  const activeBackgroundMode: string = parsedDT.bg || 'none';

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
   * Handle BG mode chage
   */
  const handleBackgroundModeChange = useCallback(
    (nextMode: string) => {
      if (!block) return;

      const nextDT = {
        ...parsedDT,
        bg: nextMode,
      };

      block.dt = KVParser.stringify(nextDT);

      // Remove unused TRBL values
      // const toRemove = notIncluded(activeBackgroundMode, nextPresets);
      // removeDesignProps(toRemove);

      updated();
    },
    [block, parsedDT, activeBackgroundMode]
  );

  /**
   * Generic design change handler
   */
  const handleChange = useCallback(
    ({ value, property, variant }: ChangePayload) => {

      if (!designData) return;

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

  /**
   * Position type change logic
   * - Static clears all TRBL + z-index
   */
  const handlePositionTypeChange = (value: string) => {
    if (value === 'static') {
      removeDesignProps(['zi', 't', 'r', 'b', 'l']);
      // handlePresetChange([]);
    }

    handleChange({ value, property: 'po', variant: 'base' });
  };


  const handleOptionChange = (value: any, property: string) => {
    if (!block) { return }

    if (value && block.data?.options) {
      if (block?.data?.options?.[property]?.value) {
        block.data.options[property].value = value;
      } else {
        // add property
        block.data.options[property] = { value, vs: 'm' };
      }
    }

    updated();

  }

  const getOptionValue = (property: string) => {
    return block?.data?.options?.[property]?.value || ''
  }

  const getOptionPlaceholder = (property: string) => {
    return block?.data?.options?.[property]?.value || ''
  }

  const selectedImage = getValue('bg-img', 'base');

  return (
    <div>
      {/* Position type selector */}
      {/* <SegmentedControl
        size="md"
        style={{ border: '1px solid var(--in-c)' }}
        withItemsBorders={false}
        fullWidth
        value={activeBackgroundMode}
        onChange={handleBackgroundModeChange}
        data={[
          { label: <Center><IconColorPicker size={16} /></Center>, value: 'c' },
          { label: <Center><IconPhoto size={16} /></Center>, value: 'img' },
          { label: <Center><TransparencyGridIcon /></Center>, value: 'none' },
        ]}
      /> */}

      {/* {
        activeBackgroundMode === 'c' && 
      } */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center',
        margin: '12px 0'
      }}>
        <span style={{ fontSize: 11 }}>Background Color</span>
        <ColorPickerControl
          currentColor={getValue('bgc', editingVariant) || { l: '', d: '' }}
          onChange={(v: {
            l: string;
            d: string;
          }) => {
            handleChange({
              value: v,
              property: 'bgc',
              variant: editingVariant
            })
          }
          }
        />
      </div>

      {/* {
        activeBackgroundMode === 'img' &&
      } */}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        alignItems: 'center',
        margin: '12px 0'
      }}>
        <span style={{ fontSize: 11 }}>Image</span>
        <div
          className={styles.preview}
          style={{ backgroundImage: selectedImage?.url ? `url(${selectedImage?.url})` : 'none' }}
        >
          {!selectedImage?.url && <ImageIcon />}
          <div className={styles.preview_actions}>
            <UnstyledButton className={styles.preview_action} onClick={() => setOpenPanel(true)}>
              <Pencil1Icon />
            </UnstyledButton>
            {selectedImage && <UnstyledButton
              className={styles.preview_action}
              data-delete
              onClick={() => handleChange({
                value: '',
                property: 'bg-img',
                variant: 'base'
              })}
            >
              <TrashIcon />
            </UnstyledButton>}
          </div>
        </div>
        {openPanel &&
            <MediaPicker
              defaultMediaType="image"
              selectedId={Number(selectedImage.id) || null}
              onSelect={(value) => {
                // setSelectedMedia(value);
                handleChange({
                  value: { id: value[0], url: value[1] },
                  property: 'bg-img',
                  variant: 'base'
                })
              }}
              close={()=> setOpenPanel(false)}
            />
        }
      </div>
    </div>
  );
};




export default BackgroundsSection