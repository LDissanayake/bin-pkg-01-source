import React, { useEffect, useRef, useState } from 'react';
import { EditorProvider, useEditorContext } from './EditorContext';
import * as styles from './css/Editor.module.css';
import { Button, Card, Center, FloatingPosition, Group, List, MantineTransition, Menu, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { AppIconLogo } from '../icons/index';
import { CrossCircledIcon, MagnifyingGlassIcon, Pencil2Icon, PlayIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import Navigator from './Navigator';
import AddPanel from './AddPanel';
import OptionPanel from './OptionPanel';
import Workspace from './Workspace';
import BlockTreeUtils from './util/blockTreeUtils';
import PreviewCanvas from './PreviewCanvas/PreviewCanvas';
import { blockRegistry } from './Blocks';
import genBlockData from './util/blockDataUtils';
import Publish from './components/Publish';
import SaveButton from './components/SaveButton';

import { AddifectEdition } from '../App';
import AssetsPanel from './AssetsPanel/AssetsPanel';
import { TypographyIcon, FrameIcon, TaillessArrow } from './components/ToolBarIcons';

const tooltipProps = {
  color: "dark",
  position: "right" as FloatingPosition,
  offset: 6,
  style: {
    fontSize: '10px',
    border: '1px solid #666'
  },
  transitionProps: {
    transition: 'pop' as MantineTransition,
    duration: 300
  }
}



const Inside = () => {
  const {
    back,
    panel,
    setPanel,
    editingDesignId,
    editingBlock,
    canSave,
    handleSave,
    postSaving,
    canEdit,
    outSideEditHash,
    preview,
    setPreview,
    tool,
    setTool,
    zoom,
    setZoom,
    pageBlocks,
    editMode,
    setEditMode,
    colorMode
  } = useEditorContext();


  const handleSetPanel = (c: { type: string, data: any }) => {
    setPanel((panel && panel.type) === c.type ? null : c)
  }

  const ref = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [margin, setMargin] = useState(0);

  const cell = 26;
  const gap = 2;
  const size = cell + gap;


  useEffect(() => {
    function updateDimensions() {
      if (!ref.current) return;

      const parent = ref.current.parentElement!;
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      // Fit whole cells horizontally
      const fullCols = Math.floor(parentWidth / size);
      const gridWidth = fullCols * size;

      // Left/right margins
      const leftoverWidth = parentWidth - gridWidth;
      const margin = leftoverWidth / 2;

      // Available height after considering left/right margins
      const availableHeight = parentHeight;

      // Fit whole cells vertically
      const fullRows = Math.floor(availableHeight / size);
      const gridHeight = fullRows * size + 4;

      setGridWidth(gridWidth);
      setGridHeight(gridHeight);
      setMargin(margin);
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);


  if (!canEdit) {
    return <CannotEdit />
  }

  if (preview) {
    return <div className={styles.wrap}>
      <PreviewButton />
      <PreviewCanvas />
    </div>
  }

  const handleZoom = (action: '0' | '+' | '-') => {
    const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
    let value = 100;

    if (action === '+') {
      value = Math.trunc(zoom) + 10
    } else if (action === '-') {
      value = Math.trunc(zoom) - 10
    }

    setZoom(clamp(value, 10, 120));

  }

  const editingFrame = BlockTreeUtils.findSelfOrParentByType(pageBlocks.current, editingBlock || '', 'fr');

  const blockId = editingBlock as string;
  const block = pageBlocks.current.get(blockId);

  const blockTemplate = blockRegistry[block?.pr || block?.t || ''];
  const supportDesign = blockTemplate?.designSections?.length;

  const root = pageBlocks.current.get('root');
  root && genBlockData(root);
  const activeDesign = root?.data?.options?.ad?.value === editingDesignId;

  return (
    <div
      style={{
        position: 'fixed',
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={ref}
        className={styles.editor}
      >
        <div className={styles.editor_panelWrap}>
          <div className={styles.editor_leftPanel}>
            <div className={styles.editor_leftPanel_content}>
              <div style={{ flex: 1 }}>
                {/* <div className={styles.brand_wrap}>
                  <div className={styles.brand_logo}>
                    <AppIconLogo />
                  </div>
                  <div className={styles.brand_card}>
                    addifect
                  </div>
                </div> */}
                <div className={styles.layerPanel}>
                  {(panel?.type === 'navigator' || !panel) && <Navigator />}
                  {panel?.type === 'add' && <AddPanel />}
                  {panel?.type === 'assets' && <AssetsPanel />}
                </div>
              </div>

              <div className={styles.toolbar}>
                <div className={styles.toolbar_row}>
                  <Tooltip
                    {...tooltipProps}
                    label="Select"
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${tool === 'select' && styles.toolbar_action_active}`}
                      onClick={() => setTool('select')}
                    >
                      <TaillessArrow /> 
                    </UnstyledButton>
                  </Tooltip>

                  {/* <Tooltip
                    {...tooltipProps}
                    label="Pan"
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${tool === 'pan' && styles.toolbar_action_active}`}
                      onClick={() => setTool('pan')}
                    >
                      <HandIcon />
                    </UnstyledButton>
                  </Tooltip> */}

                  <Tooltip
                    {...tooltipProps}
                    label="Frame"
                    disabled={!editingDesignId}
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${tool === 'frame' && styles.toolbar_action_active}`}
                      onClick={() => setTool('frame')}
                      disabled={!editingDesignId}
                    >
                      <FrameIcon />
                    </UnstyledButton>
                  </Tooltip>

                  {/* <Tooltip
                    {...tooltipProps}
                    label="Rectangle"
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${tool === 'rectangle' && styles.toolbar_action_active}`}
                      onClick={() => setTool('rectangle')}
                    >
                      <BoxIcon />
                    </UnstyledButton>
                  </Tooltip>

                  <Tooltip
                    {...tooltipProps}
                    label="Text"
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${tool === 'text' && styles.toolbar_action_active}`}
                      onClick={() => setTool('text')}
                    >
                      <TextIcon />
                    </UnstyledButton>
                  </Tooltip> */}

                  {block?.m !== 'i' && blockTemplate?.children &&
                    <Tooltip
                      {...tooltipProps}
                      label="Add"
                    >
                      <UnstyledButton
                        className={`${styles.toolbar_action} ${panel?.type === 'add' && styles.toolbar_action_active}`}
                        onClick={() => {
                          if (panel?.type === 'add') {
                            setTool('select')
                            setPanel(null)
                            return;
                          }
                          setPanel({ type: 'add', data: blockId })
                        }}
                      >
                        {panel?.type === 'add' ? <CrossCircledIcon /> : <PlusCircledIcon />}
                      </UnstyledButton>
                    </Tooltip>
                  }

                </div>
                <div className={styles.toolbar_row}>
                  <Tooltip
                    {...tooltipProps}
                    label="Design Assets"
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${panel?.type === 'assets' && styles.toolbar_action_active}`}
                      onClick={() => setPanel(panel?.type === 'assets' ? null : { type: 'assets', data: null })}
                    >
                      <TypographyIcon />
                    </UnstyledButton>
                  </Tooltip>
                  <div className={styles.toolbar_divider}></div>
                  <Tooltip
                    {...tooltipProps}
                    label="Back to Home"
                  >
                    <UnstyledButton
                      className={`${styles.toolbar_action} ${styles.toolbar_action_home}`}
                      onClick={back}
                    >
                  <AppIconLogo />
                    </UnstyledButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.editor_centerPanel}>
            <Workspace />
          </div>
          <div className={styles.editor_rightPanel} style={{ width: editMode === 'ui' ? 280 : 380 }}>
            <div className={styles.editor_rightPanel_topBar}>
              <div className={styles.editor_rightPanel_topBar_coll}>
                <Tooltip
                  label='Preview'
                  {...tooltipProps}
                  position='bottom'
                >
                  <UnstyledButton
                    className={styles.editor_rightPanel_topBar_play}
                    disabled={!editingFrame?.id}
                    onClick={() => editingFrame?.id && setPreview(editingFrame.id)}
                  >
                    <PlayIcon />
                  </UnstyledButton>
                </Tooltip>

                {/* <Tooltip
                  label={editMode === 'text' ? 'Control Mode' : 'Code Mode'}
                  {...tooltipProps}
                  position='bottom'
                  key={`control-mode-${editMode}`}
                >
                  <UnstyledButton
                    className={styles.editor_rightPanel_topBar_code}
                    disabled={!supportDesign}
                    onClick={() => setEditMode(editMode === 'text' ? 'ui' : 'text')}
                  >
                    {editMode === 'text' ? <IconDeviceGamepad stroke={1.6} size={18} /> : <IconSourceCode stroke={1.6} size={18} />}
                  </UnstyledButton>
                </Tooltip> */}

              </div>
              <div className={styles.editor_rightPanel_topBar_coll}>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <UnstyledButton className={styles.editor_rightPanel_topBar_zoom}>
                      <MagnifyingGlassIcon />{zoom}%</UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => handleZoom('+')}
                      disabled={zoom >= 120}
                      rightSection={
                        <Text size="xs" c="dimmed">
                          CTRL + +
                        </Text>
                      }
                    >
                      <Text size="xs">Zoom in</Text>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => handleZoom('-')}
                      disabled={zoom <= 10}
                      rightSection={
                        <Text size="xs" c="dimmed">
                          CTRL + -
                        </Text>
                      }>
                      <Text size="xs">Zoom out</Text>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => handleZoom('0')}
                      disabled={zoom === 100}
                      rightSection={
                        <Text size="xs" c="dimmed">
                          CTRL + 0
                        </Text>
                      }>
                      <Text size="xs">Zoom to 100%</Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <SaveButton />
                <Publish />
              </div>
            </div>
            <div className={styles.editor_rightPanel_content}>
              {editingBlock && <OptionPanel key={outSideEditHash} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Editor
 * @returns 
 */
function Editor({
  id,
  back,
  edition,
  setEdition
}: {
  id: string,
  back: () => void,
  edition: AddifectEdition,
  setEdition: React.Dispatch<React.SetStateAction<AddifectEdition>>;
}) {

  return (
    <EditorProvider
      id={id}
      back={back}
    >
      <Inside />
    </EditorProvider>
  )
}

export default Editor;


const PreviewButton = () => {
  const { setPreview, preview } = useEditorContext();
  return (
    <Tooltip
      label={preview ? 'Edit' : 'Preview'}
      {...tooltipProps}
      position='bottom'
    >
      <UnstyledButton
        aria-label={preview ? 'edit' : "Preview"}
        onClick={() => { setPreview(null) }}
        className={styles.topBarAction}
      >
        <Pencil2Icon />
      </UnstyledButton>
    </Tooltip>
  )
}

//DOTO fix this when creating content editor/builder
const CannotEdit = () => {
  const { back } = useEditorContext();

  return <Center h="100vh">
    <Card shadow="sm" padding="lg" radius="md" withBorder w={400}>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>Complete Template Setup to Enable Editing</Text>
      </Group>

      <Text size="sm" my="md">To edit this post type, a default template must be assigned.</Text>
      <List
        spacing="xs"
        size="sm"
        center
      >
        <List.Item>If you already have a template,
          add it under Map in Addifect Home &gt; Template Manager &gt; Map &gt; [Post Type].
        </List.Item>
        <List.Item>If you don’t have a template, create one first, edit it, and then assign it under Map for this post type.
        </List.Item>
      </List>
      <Button
        color="blue"
        fullWidth mt="md"
        radius="md"
        onClick={() => back()}
      >
        Back to home
      </Button>
    </Card>
  </Center>
}
