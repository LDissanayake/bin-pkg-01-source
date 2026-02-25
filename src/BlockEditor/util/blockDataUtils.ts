import { Block } from "../EditorContext";
import { decodeOptions, encodeOptions } from "./optionCodec";
import { compactDesign, expandDesign } from "./styleCodec";

const genBlockData = (block: Block) => {
    if (!block?.data) { 
        // expand block options here
           block.data = {
               ...(block.d ? { design: expandDesign(block.d) } : {}),
               ...(block.o ? { options: decodeOptions(block.o) } : {})
           };
    }
}

export default genBlockData;

export const removeDatafromBlocks = (blocksObj: { [key: string]: Block }) => {
  // Create a shallow copy of the blocks object
  const copiedBlocks: { [key: string]: Block } = {};

  for (const id in blocksObj) {
    const block = blocksObj[id];
    if (!block) continue;

    // Create a shallow copy of each block to avoid mutating the original
    copiedBlocks[id] = { ...block };

    if (block.data?.options) {
      // If encodeOptions returns a string or new object, assign it directly
      copiedBlocks[id].o = encodeOptions(block.data.options);
    }
    if (block.data?.design) {
      copiedBlocks[id].d = compactDesign(block.data.design);
    }

    // Remove the data property from the copied block
    delete copiedBlocks[id].data;
  }

  return copiedBlocks;
};
