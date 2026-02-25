import React, { useEffect, useState } from 'react';
import { useEditorContext } from '../../../EditorContext';
import { ColorPicker, Input, Popover, ScrollArea, SegmentedControl } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

import * as styles from './ColorPickerControl.module.css';


function ColorPickerControl({
  currentColor,
  onChange,
  withinPortal
}: {
  currentColor: { l: string; d: string };
  onChange: (v: { l: string; d: string }) => void;
  withinPortal?: boolean
}) {
  const { colorMode } = useEditorContext();
  const [colors, setColors] = useState(currentColor);

  useEffect(() => {
    setColors(currentColor);
  }, [currentColor]);

  return (
    <Popover position="bottom" withArrow shadow="md" withinPortal={true}>
      <Popover.Target>
        <div className={styles.colorWrap}>
          <div className={styles.color} style={{ background: colors[colorMode] }}></div>
          <div className={styles.label}></div>
        </div>
      </Popover.Target>
      <Popover.Dropdown style={{ background: 'var(--mantine-color-dark-7)', padding: 12 }}>
        <PickColor colors={colors} onColorChange={onChange} />
      </Popover.Dropdown>
    </Popover>
  );
}

export default ColorPickerControl;

const PickColor = ({
  colors,
  onColorChange,
}: {
  colors: { l: string; d: string };
  onColorChange: ({ l, d }: { l: string; d: string }) => void;
}) => {
  const { colorMode, setColorMode } = useEditorContext();
  const [currentColor, setCurrentColor] = useState(colors);

  const handleColorChange = (value: string) => {
    const updatedColor = { ...currentColor };
    updatedColor[colorMode] = value;
    setCurrentColor(updatedColor);
    onColorChange({ ...updatedColor });
  };

  return (
    <>
        <SegmentedControl
          fullWidth
          size="xs"
          data={[
            { label: <IconSun stroke={1.5} size={16} />, value: 'l' },
            { label: <IconMoon stroke={1.5} size={16} />, value: 'd' },
          ]}
          value={colorMode}
          onChange={(value) => setColorMode(value as 'l' | 'd')}
          mb="sm"
        />
        <ColorPicker
          format="rgba"
          size="sm"
          value={currentColor[colorMode]}
          onChange={(v) => { handleColorChange(v) }}
        />
        <Input
          mt="xs"
          size="xs"
          variant="filled"
          value={currentColor[colorMode]}
          onChange={(e) => handleColorChange(e.currentTarget.value)}
          mb="sm"
        />
    </>
  );
};
