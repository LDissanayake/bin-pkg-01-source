import React from 'react';
import * as styles from './css/Navigator.module.css';
import { ScrollArea, UnstyledButton } from '@mantine/core';
import TreeView from './TreeView';
import { useEditorContext } from './EditorContext';
import { ButtonIcon } from '@radix-ui/react-icons';
import { IconFileDigit } from '@tabler/icons-react';

function Navigator() {
  const {
    editingDesignId,
    setEditingDesignId,
    setPanel,
    panel
  } = useEditorContext();

  const handleDetailsView = (action: boolean) => {
    const _panel = {...panel as { type: string, data: any}}
    if( _panel.data ) {
      _panel.data.showDetails = action;
      setPanel(_panel);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.title}>Layers</div>
      <div className={styles.content}>
        <div
          onClick={() => editingDesignId && setEditingDesignId(editingDesignId)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
          }}
        ></div>
        <ScrollArea.Autosize mah='100%' type="scroll" scrollbarSize={4}>
          <TreeView />
        </ScrollArea.Autosize>
        <div className={styles.footer}>
          <UnstyledButton
            className={styles.footerAction}
            onClick={()=> handleDetailsView(!panel?.data?.showDetails)}
            data-active={panel?.data?.showDetails}
            >
            <IconFileDigit stroke={1.5} width='70%'/>
          </UnstyledButton>
        </div>
      </div>
    </div>
  )
}

export default Navigator
