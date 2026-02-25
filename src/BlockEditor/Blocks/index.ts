import { Block } from "./blockTemplate";

//to complite
// import contentWrapper from "./contentWrap";

// elements
import base, { stack, grid, sceneTransition } from "./base";
// import image from "./image";
// import motionText from "./motionText"; 
// import labelText from "./labelText"; 
// import text from "./text";

import design from "./design";
import frame from "./frame";
import instance from "./instance";
/**
 * Text
*/
import text from "./text";
import textFlow from "./textFlow";

//design system
import assets, { colorsBlock, colorBlock, fontsBlock, fontBlock, componentsBlock } from './assets';

// import entryWrap from "./entryWrap";
// import entryTemplate from "./entryTemplate";


interface BlockRegistry {
    [key: string]: Block;
}


export const blockRegistry: BlockRegistry = {
    // contentWrapper,
    b: base,
    // motionText,
    // labelText,
    // image, // need to edit
    // text, // need to edit
    // entryWrap,
    // entryTemplate,
    //preset
    // stack,
    // grid,
    // sceneTransition,
    // design tool
    de: design,
    fr: frame,
    i: instance,
    cos: componentsBlock,
    // design system
    a: assets,
    cs: colorsBlock,
    c: colorBlock,
    fs: fontsBlock,
    f: fontBlock,
    t: text,
    // tf: textFlow
}

export const blockCategories = [
    'basic', 'layout', 'inner layout', 'template', 'elements', 'entry', 'wrappers', 
    'assets', 'colors', 'color', 'fonts', 'font'
];