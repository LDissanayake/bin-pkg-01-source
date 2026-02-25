import React, { MutableRefObject } from 'react';
import * as styles from './css/AddPanel.module.css'
import { blockCategories, blockRegistry } from './Blocks';
import { Block } from './EditorContext';
import { ActionIcon, ScrollArea } from '@mantine/core';

import { useEditorContext } from './EditorContext';
import { IconChevronLeft } from '@tabler/icons-react';
import BlockTreeUtils from './util/blockTreeUtils';
import { cloneDeep } from 'lodash';
import { generateId } from './util/generateId';
import { decodeOptions, encodeOptions } from './util/optionCodec';
import { compactDesign, expandDesign } from './util/styleCodec';
import { colorPresets } from './Blocks/assets';

const blocks = blockRegistry;
const categories = blockCategories;

function canAddBlock(
  types: { type: string; count: number }[],
  newType: string,
  limit?: number | null
): boolean {
  // No limit? Always allowed
  if (limit == null) return true;

  const found = types.find(t => t.type === newType);
  const count = found?.count ?? 0;

  return count < limit;
}

const renderBlocksByCategory = (
  category: string,
  bip: string,
  add: (type: string, parentId: string | null) => void,
  back: React.Dispatch<React.SetStateAction<null>>,
  usedTypes: { type: string; count: number; }[]
) => {

  const filteredBlocks = Object.values(blocks).filter(block =>
    block.cats.includes(category) && (bip !== 'root' || block.rootAllow)
  );

  if (filteredBlocks.length === 0) {
    return null;
  }

  return (
    <div key={category}>
      <div className={styles.cat}>{category}</div>
      <div className={styles.items}>
        {filteredBlocks.map(block => {

          const canAdd = canAddBlock(usedTypes, block.type, block?.limitInParent);

          return <div
            key={block?.preset || block.type}
            className={styles.block}
            onClick={() => { canAdd && add(block?.preset || block.type, bip === 'root' ? null : bip); back(null) }}
            data-disabled={!canAdd}
          >
            <div className={styles.blockIcon}>{block.icon}</div>
            <div className={styles.blockTitle}>{block.title}</div>
          </div>
        })}
      </div>
    </div>
  );
};


export const addBlock = (
  {
    type, parentId, setEditingBlock,
    props = {},
    page, setPage, pageBlocks
  }:
    {
      type: string,
      parentId: string,
      setEditingBlock: (id: string | null) => void,
      props: any,
      page: { [key: string]: number },
      setPage: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>
      pageBlocks: MutableRefObject<Map<string, Block>>
    }
) => {

  const _parentId = parentId || 'root';

  const existingIds = new Set<string>(pageBlocks.current.keys());
  const newBlockId = generateId(existingIds);
  const blockTemplate = blockRegistry[type];
  const templateProps = cloneDeep(blockTemplate.props);

  /**
   * dynamic will add following items
   * a: animations
   * v: varaints
   * ll: layer label
   */
  const dynamic: { [key: string]: any } = {
    ...(blockTemplate.preset ? { pr: blockTemplate.preset } : {})
  }

  if (templateProps.options) {
    const tpo = decodeOptions(templateProps.options);
    const merge = { ...(tpo), ...props?.options || {} }
    dynamic.o = encodeOptions(merge);
  }

  if (templateProps.design) {
    const tpd = expandDesign(templateProps.design);
    const merge = { ...(tpd), ...props?.design || {} }
    dynamic.d = compactDesign(merge);
  }

  if (templateProps.animations) { dynamic.a = templateProps.animations }
  if (templateProps.variants) { dynamic.v = templateProps.variants }
  if (templateProps.designTypes) { dynamic.dt = templateProps.designTypes }
  if (props.layerLabel) { dynamic.l = props.layerLabel }

  const newBlock: Block = {
    t: blockTemplate.type,
    p: parentId,
    ...dynamic,
  };

  if (blockTemplate.children) {
    // add children array
    newBlock.c = [];
  }

  const parentBlock = pageBlocks.current.get(_parentId);

  if (!parentBlock) { return }

  parentBlock.c = parentBlock.c || [];
  parentBlock.c.push(newBlockId);

  pageBlocks.current.set(_parentId, parentBlock);
  pageBlocks.current.set(newBlockId, newBlock);


  setPage(prev => ({
    ...prev,
    [_parentId]: Date.now(),
    [newBlockId]: Date.now()
  }));



  setEditingBlock(newBlockId);

};


export const addDesignStarter = ({
  setEditingBlock,
  props = {},
  setPage,
  pageBlocks,
}: {
  setEditingBlock: (id: string | null) => void;
  props: { [key: string]: any };
  setPage: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  pageBlocks: MutableRefObject<Map<string, Block>>;
}) => {
  const blocks = pageBlocks.current;

  /**
   * Helper to generate deterministic static IDs
   * Each design can only have ONE of these blocks
   */
  const makeStaticId = (designId: string, key: string) =>
    `${designId}_${key}`;

  /**
   * Add block helper
   * - Supports both dynamic and static IDs
   * - Static IDs prevent duplicate structural blocks
   */
  const addBlock = (
    type: string,
    parentId: string,
    propsOverride: any = {},
    forcedId?: string,
  ) => {
    const id = forcedId ?? generateId(new Set(blocks.keys()));
    const template = blockRegistry[type];
    const templateProps = cloneDeep(template.props);

    /**
     * Dynamic properties:
     * d → design
     * o → options
     * a → animations
     * v → variants
     * l → layer label
     */
    const dynamic: Record<string, any> = {
      ...(template.preset ? { pr: template.preset } : {}),
    };

    if (templateProps.design) {
      const expanded = expandDesign(templateProps.design);
      dynamic.d = compactDesign({
        ...expanded,
        ...propsOverride?.design,
      });
    }

    if (templateProps.options) {
      const decoded = decodeOptions(templateProps.options);
      dynamic.o = encodeOptions({
        ...decoded,
        ...propsOverride?.options,
      });
    }

    if (templateProps.animations) dynamic.a = templateProps.animations;
    if (templateProps.variants) dynamic.v = templateProps.variants;
    if (propsOverride.layerLabel) dynamic.l = propsOverride.layerLabel;

    const block: Block = {
      t: template.type,
      p: parentId,
      ...dynamic,
      ...(template.children ? { c: [] } : {}),
    };

    // Attach to parent
    const parent = blocks.get(parentId);
    if (!parent) return null;

    parent.c ??= [];
    if (!parent.c.includes(id)) parent.c.push(id);

    blocks.set(parentId, parent);
    blocks.set(id, block);

    const now = Date.now();
    setPage(prev => ({
      ...prev,
      [parentId]: now,
      [id]: now + 1,
    }));

    return id;
  };

  // ------------------------------------------------------------------
  // 1. Design block (dynamic ID – root entity)
  // ------------------------------------------------------------------
  const designId = addBlock("de", "root", props);
  if (!designId) return;

  // ------------------------------------------------------------------
  // 2. Assets (STATIC)
  // ------------------------------------------------------------------
  const assetsId = addBlock(
    "a",
    designId,
    {},
    makeStaticId(designId, "assets"),
  );

  if (!assetsId) return;

  // ------------------------------------------------------------------
  // 3. Colors (STATIC)
  // ------------------------------------------------------------------
  const colorsId = addBlock(
    "cs",
    assetsId,
    {},
    makeStaticId(designId, "colors"),
  );

  const colorcodes = {
    text: { l: "9", d: "1" },
    background: { l: "2", d: "8" },
  };

  const createColorBlock = (
    label: string,
    value: any,
    palette: string[],
  ) =>
    addBlock("c", colorsId!, {
      options: {
        ...(value ? { c: { value } } : {}),
        p: { value: [...palette] },
      },
      layerLabel: label,
    });

  const colorIds = {
    text: createColorBlock("text", colorcodes.text, colorPresets.neutral),
    background: createColorBlock("background", colorcodes.background, colorPresets.gray),
    accent: createColorBlock("accent", null, colorPresets.blue),
  };

  // ------------------------------------------------------------------
  // 4. Fonts (STATIC)
  // ------------------------------------------------------------------
  const fontsId = addBlock(
    "fs",
    assetsId,
    {},
    makeStaticId(designId, "fonts"),
  );

  const createFontBlock = (label: string, value: any) =>
    addBlock("f", fontsId!, {
      options: { f: { value } },
      layerLabel: label,
    });

  const fontIds = {
    heading: createFontBlock("heading", ["Oswald", "sans-serif", ["regular", "600"]]),
    body: createFontBlock("body", ["Open Sans", "sans-serif", ["regular"]]),
  };

  // ------------------------------------------------------------------
  // 5. Components folder (STATIC)
  // ------------------------------------------------------------------
  const componentsId = addBlock(
    "cos",
    assetsId,
    {},
    makeStaticId(designId, "components"),
  );

  // ------------------------------------------------------------------
  // 6. Wire references (design → assets, assets → children)
  // ------------------------------------------------------------------
  const designBlock = blocks.get(designId)!;
  const designOptions = decodeOptions(designBlock.o || "");
  designOptions.assid.value = assetsId;
  designBlock.o = encodeOptions(designOptions);

  const assetsBlock = blocks.get(assetsId)!;
  const assetsOptions = decodeOptions(assetsBlock.o || "");

  assetsOptions.default.value.cbid = colorsId;
  assetsOptions.default.value.tc = colorIds.text;
  assetsOptions.default.value.bc = colorIds.background;
  assetsOptions.default.value.ac = colorIds.accent;

  assetsOptions.default.value.fbid = fontsId;
  assetsOptions.default.value.bf = fontIds.body;
  assetsOptions.default.value.hf = fontIds.heading;

  assetsBlock.o = encodeOptions(assetsOptions);

  // ------------------------------------------------------------------
  // 7. Set editor focus
  // ------------------------------------------------------------------
  setEditingBlock(designId);
};




function AddPanel() {

  const { panel, setPanel, page, setPage, pageBlocks, setEditingBlock } = useEditorContext();

  const back = () => setPanel({ type: 'navigator', data: {} });

  const bip = panel?.data;
  const bipBlock = pageBlocks.current.get(bip);


  let blockTemplate = { childCats: ['layout', 'wrappers'] }


  if (bip !== 'root') {
    const allowType = bipBlock?.pr || bipBlock?.t
    blockTemplate = { childCats: blockRegistry[allowType as string].childCats || [] };
  }

  const allowedCats = blockTemplate.childCats;

  const _addBlock = (type: string, parentId: string | null = null) => {
    addBlock({ type, parentId: parentId || 'root', page, setPage, pageBlocks, setEditingBlock, props: {} })
  }

  const usedTypes = BlockTreeUtils.getTypesWithCounts(pageBlocks.current, bipBlock?.c || []);

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
      </div>
      <div className={styles.content}>
        <ScrollArea h="100%" type="scroll">
          {allowedCats && allowedCats.map(category => renderBlocksByCategory(category, bip, _addBlock, back, usedTypes))}
        </ScrollArea>
      </div>
    </div>
  )
}

export default AddPanel
