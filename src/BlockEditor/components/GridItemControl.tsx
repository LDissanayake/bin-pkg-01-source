import cloneDeep from 'lodash/cloneDeep';
import { useEditorContext } from '../EditorContext';
import { getDirectPropertyValue } from '../../backup/BlockEditor/OptionPanel/components/Control';
import { getDesignPropertyValue, getVariantPropertyValue } from '../../backup/BlockEditor/OptionPanel/components/helper/getPropertyValue';
import * as styles from './GridItemControl.module.css';
import React, { useState } from 'react';
import { IconLayoutAlignLeft, IconLayoutAlignCenter, IconLayoutAlignRight, IconLayoutAlignTop, IconLayoutAlignMiddle, IconLayoutAlignBottom, IconBaseline } from '@tabler/icons-react';
import { SegmentedControl } from '@mantine/core';

interface GridArea {
  row: number;
  col: number;
}

interface SelectedArea {
  start: GridArea;
  end: GridArea;
}

interface GridSelectorProps {
  rows: string[];
  columns: string[];
  gc: number[]; // Array of grid column indices to initially highlight
  gr: number[]; // Array of grid row indices to initially highlight
  onChange: (value: string[]) => void;
}

const iconDimention = {
  width: '14px',
  height: '17px'
}

const jsData = [ // justify-self
  {
    label: <div className={styles.iconWrap}><IconLayoutAlignLeft {...iconDimention} /></div>,
    value: 'start'
  },
  {
    label: <div className={styles.iconWrap}><IconLayoutAlignCenter {...iconDimention} /></div>,
    value: 'center'
  },
  {
    label: <div className={styles.iconWrap}><IconLayoutAlignRight {...iconDimention} /></div>,
    value: 'end'
  }
];

const asData = [
  {
    label: <div className={styles.iconWrap}><IconLayoutAlignTop {...iconDimention} /></div>,
    value: 'start'
  },
  {
    label: <div className={styles.iconWrap}><IconLayoutAlignMiddle {...iconDimention} /></div>,
    value: 'center'
  },
  {
    label: <div className={styles.iconWrap}><IconLayoutAlignBottom {...iconDimention} /></div>,
    value: 'end'
  },
  {
    label: <div className={styles.iconWrap}><svg {...iconDimention} fill="none" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M1.04956 1.50002C1.04956 1.25149 1.25103 1.05002 1.49956 1.05002H13.4996C13.7481 1.05002 13.9496 1.25149 13.9496 1.50002C13.9496 1.74855 13.7481 1.95002 13.4996 1.95002L1.49956 1.95002C1.25103 1.95002 1.04956 1.74855 1.04956 1.50002ZM1.04966 13.5C1.04966 13.2515 1.25113 13.05 1.49966 13.05H13.4997C13.7482 13.05 13.9497 13.2515 13.9497 13.5C13.9497 13.7485 13.7482 13.95 13.4997 13.95L1.49966 13.95C1.25113 13.95 1.04966 13.7485 1.04966 13.5ZM6 11V3.99999H9V11H6ZM5 3.74999C5 3.33578 5.33579 2.99999 5.75 2.99999H9.25C9.66421 2.99999 10 3.33578 10 3.74999V11.25C10 11.6642 9.66421 12 9.25 12H5.75C5.33579 12 5 11.6642 5 11.25V3.74999Z" fill="currentColor" fill-rule="evenodd" /></svg></div>,
    value: 'stretch'
  },
  {
    label: <div className={styles.iconWrap}><IconBaseline {...iconDimention} /></div>,
    value: 'baseline'
  },
]

function GridSelector({ rows, columns, gc, gr, onChange }: GridSelectorProps) {
  const [selectedArea, setSelectedArea] = useState<SelectedArea | null>(null);

  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    setSelectedArea({ start: { row: rowIndex, col: colIndex }, end: { row: rowIndex, col: colIndex } });
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (selectedArea) {
      setSelectedArea(prevArea => ({
        ...prevArea!,
        end: { row: rowIndex, col: colIndex }
      }));
    }
  };

  const handleMouseUp = () => {
    if (selectedArea) {
      const { start, end } = sortSelection(selectedArea);

      // Ensuring the onChange output remains consistent with the previous approach
      onChange([
        `${start.row + 1} / ${end.row + 2}`,  // Corrected grid-row
        `${start.col + 1} / ${end.col + 2}`,  // Corrected grid-column
      ]);

      setSelectedArea(null);
    }
  };

  const sortSelection = (area: SelectedArea): SelectedArea => {
    const { start, end } = area;
    const sortedStart = {
      row: Math.min(start.row, end.row),
      col: Math.min(start.col, end.col)
    };
    const sortedEnd = {
      row: Math.max(start.row, end.row),
      col: Math.max(start.col, end.col)
    };

    return { start: sortedStart, end: sortedEnd };
  };

  const renderGrid = () => {
    const gridItems = [];
    const rowsCount = rows.length;
    const columnsCount = columns.length;

    const hc = [gc[0] - 1, gc[0] + (gc[1] - gc[0]) - 2];
    const hr = [gr[0] - 1, gr[0] + (gr[1] - gr[0]) - 2];

    for (let row = 0; row < rowsCount; row++) {
      for (let col = 0; col < columnsCount; col++) {
        const isSelected = selectedArea &&
          row >= Math.min(selectedArea.start.row, selectedArea.end.row) &&
          row <= Math.max(selectedArea.start.row, selectedArea.end.row) &&
          col >= Math.min(selectedArea.start.col, selectedArea.end.col) &&
          col <= Math.max(selectedArea.start.col, selectedArea.end.col);

        const isHighlighted = row >= Math.min(hr[0], hr[1]) &&
          row <= Math.max(hr[0], hr[1]) &&
          col >= Math.min(hc[0], hc[1]) &&
          col <= Math.max(hc[0], hc[1]);

        gridItems.push(
          <div
            key={`${row}-${col}`}
            style={{
              border: '1px solid var(--mantine-color-blue-6)',
              borderRadius: 3,
              backgroundColor: isSelected ? 'lightgreen' : isHighlighted ? 'var(--mantine-color-blue-6)' : 'transparent',
              boxSizing: 'border-box',
              cursor: 'pointer',
              gridColumn: col + 1,
              gridRow: row + 1,
              height: 20,
              width: 20,
            }}
            onMouseDown={() => handleMouseDown(row, col)}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseUp={handleMouseUp}
          />
        );
      }
    }

    return gridItems;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gridTemplateRows: `repeat(${rows.length}, 1fr)`,
        userSelect: 'none',
        gap: 4
      }}
    >
      {renderGrid()}
    </div>
  );
}

// TODO remove page strucute

const GridItemControl = () => {

  const { device, editingBlock, setPage, pageBlocks } = useEditorContext();
  const block = pageBlocks.current.get(editingBlock as string);

  if (!block?.e) { return }

  const { props } = block.e;
  const userData = block.u;

  const editingGridItemID = userData?.editingGridItemID;

  const variant = userData?.editingVariant || 'base';

  const deviceMap = { default: 'd', medium: 'm', small: 's' };
  const deviceFlag = deviceMap[device] as 'd' | 'm' | 's';

  const gridItemData = props?.gridLayoutMap?.[variant]?.[editingGridItemID]?.gz?.de;
  const value = gridItemData && getDirectPropertyValue(gridItemData, deviceFlag).value || [];


  const gridTemplate = getDesignPropertyValue(props, 'gt', deviceFlag, variant).value;

  const handleSave = (value: string[]) => {
    if (props.gridLayoutMap) {
      props.gridLayoutMap[variant][editingGridItemID]!.gz!.de[deviceFlag] = {
        value: value
      }
      setPage((page) => ({ ...page, [block.i]: Date.now() }));
    }
  }

  const handleGridChange = (values: string[]) => {
    const newValue = [...value];
    newValue[0] = values[0];
    newValue[1] = values[1];

    handleSave(newValue);
  };

  const handleAlignChange = (v: string, index: number) => {
    const newValue = [...value];
    newValue[index] = v;
    handleSave(newValue);
  }

  const handleUserData = (key: string, value: any, parent?: boolean) => {
    const currentBlock = parent ?
      pageBlocks.current.get(block.p as string) :
      block;

    if (currentBlock) {
      currentBlock.e!.userData = { ...(currentblock.u || {}) };
      currentBlock.e!.userData[key] = value;
      setPage((page) => ({ ...page, [currentBlock.i]: Date.now() }));
    }
  }

  const parsedGr = React.useMemo(() => {
    if (!value?.[0]) return [1, 1]; // Default fallback
    return value[0].split('/').map((n: string) => Number(n.trim()));
  }, [value]);

  const parsedGc = React.useMemo(() => {
    if (!value?.[1]) return [1, 1];
    return value[1].split('/').map((n: string) => Number(n.trim()));
  }, [value]);


  return (
    <div
      className={styles.gridWrap}
      onMouseEnter={() => handleUserData('showGrid', true)}
      onMouseLeave={() => handleUserData('showGrid', false)}
    >
      <GridSelector
        rows={gridTemplate?.r}
        columns={gridTemplate?.c}
        gr={parsedGr}
        gc={parsedGc}
        onChange={handleGridChange}
      />

      <div
        className={styles.alignWrap}
      >
        <SegmentedControl
          size="xs"
          data={jsData}
          withItemsBorders={false}
          fullWidth
          my={'md'}
          value={value?.[2] || 'start'}
          onChange={(v) => handleAlignChange(v, 2)}
        />
        <SegmentedControl
          size="xs"
          data={asData}
          withItemsBorders={false}
          fullWidth
          my={'md'}
          value={value?.[3] || 'start'}
          onChange={(v) => handleAlignChange(v, 3)}
        />
      </div>

    </div>
  );
};

export default GridItemControl;
