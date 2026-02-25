import { BlockDesign } from "../../BlockEditor/Blocks/blockTemplate";
import cssMap from "../../BlockEditor/OptionPanel/cssMap";

/**
 * Converts camelCase to kebab-case
 * @param {string} str
 * @returns {string}
 */
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

/** Detect if value is color-mode object {l,d} */
function isColorModeValue(val: any): val is { l: string; d: string } {
  return val && typeof val === "object" && ("l" in val) && ("d" in val);
}

export function generateBlockCSS(
  elementId: string,
  design: BlockDesign,
  ssr: boolean = false,
  animationKeys: string[],
  isEditing = false
): string {
  let properties = '';
  let cssVars = '';

  for (const variant of Object.keys(design)) {
    const st = design?.[variant] || {};
    // const an = design?.[variant]?.an || {};

    const rootSelector = ssr ? ':root' : '.artboard-root';
    const selector =
      variant === 'base'
        ? rootSelector
        : `.${elementId}[data-variant="${variant}"]`;

    let cssVarLight = '';
    let cssVarDark = '';
    // Define CSS variables for this variant
    // cssVars += `${selector} {\n`;

    for (const [prop, obj] of Object.entries(st)) {
      const cssProp = `--${elementId}-${prop}`;
      let value =
        cssMap[prop]?.vt === 'select'
          ? cssMap[prop]?.op?.[obj.value] || obj.value
          : obj.value;

          if( isColorModeValue(value)) {
            cssVarDark += `  ${cssProp}: ${value.d};\n`;
            value = value.l;
          }
      
      // cssVars += `  ${cssProp}: ${value};\n`;

      cssVarLight += `  ${cssProp}: ${value};\n`;

      if (variant === 'base' && animationKeys?.includes(prop)) {
        const cssProp = `--${elementId}-${prop}`;
        // const value =
        //   cssMap[prop]?.vt === 'select'
        //     ? cssMap[prop]?.op?.[obj.value] || obj.value
        //     : obj.value;
        // cssVars += `  ${cssProp}: ${value};\n`;

        properties += `@property --${elementId}-${prop} { syntax: "<${cssMap[prop]?.vt}>"; initial-value: ${value}; inherits: false; }\n`
      }
    }

    if (variant === 'base') {
      // for (const [prop, obj] of Object.entries(an)) {
      //   const cssProp = `--${elementId}-${prop}`;
      //   const value =
      //     cssMap[prop]?.vt === 'select'
      //       ? cssMap[prop]?.op?.[obj.value] || obj.value
      //       : obj.value;
      //   cssVars += `  ${cssProp}: ${value};\n`;

      //   properties += `@property --${elementId}-${prop} { syntax: "<${cssMap[prop]?.vt}>"; initial-value: ${value}; inherits: false; }\n`
      // }
    }

    // cssVars += '}\n\n';
    
    cssVars += `${selector} {\n`;
    cssVars += cssVarLight;
    cssVars += '}\n\n';

    cssVars += `${rootSelector}[data-color-mode="d"] .${elementId}[data-variant="${variant}"], .${elementId}[data-variant="${variant}"][data-color-mode="d"] {\n`;
    cssVars += cssVarDark;
    cssVars += '}\n\n';


    // Base variant outputs actual property bindings
    if (variant === 'base') {
      cssVars += `.${elementId} {\n`;
      // for (const prop of Object.keys(st)) {
      //   const cssPropName = camelToKebab(cssMap[prop]?.p || prop);
      //   cssVars += `  ${cssPropName}: var(--${elementId}-${prop});\n`;
      // }

      // an properties
      // for (const prop of Object.keys(an || {})) {
      //   const cssPropName = camelToKebab(cssMap[prop]?.p || prop);
      //   cssVars += `  ${cssPropName}: var(--${elementId}-${prop});\n`;
      // }

      let transform = '';
      // transition
      let transition = '';
      //  --io984r-bgc var(--io984r-bgc-dur, 1s) var(--io984r-bgc-ease, ease-in),

      const objKeys = Object.keys(st || {});
      const lastIndex = objKeys.length - 1;

      objKeys.forEach((prop, index) => {
        const isLast = (index === lastIndex);

        const cssPropName = camelToKebab(cssMap[prop]?.p || prop);

        if (prop === 'x') {
          transform += `translateX(var(--${elementId}-${prop}))`
        } else if (prop === 'y') {
          transform += `translateY(var(--${elementId}-${prop}))`
        } else if (prop === 'skX') {
          transform += `skewX(var(--${elementId}-${prop}))`
        } else if (prop === 'skY') {
          transform += `skewY(var(--${elementId}-${prop}))`
        } else if (prop === 'scX') {
          transform += `scaleX(var(--${elementId}-${prop}))`
        } else if (prop === 'scY') {
          transform += `scaleY(var(--${elementId}-${prop}))`
        } else {
          const cssPropName = camelToKebab(cssMap[prop]?.p || prop);
          cssVars += `  ${cssPropName}: var(--${elementId}-${prop});\n`;
        }


        if (animationKeys?.includes(prop) && !isEditing) {
          // Conditionally add a semicolon or a comma+newline to transition string
          const separator = isLast ? ';\n' : ',\n';
          transition += `--${elementId}-${prop} var(--${elementId}-${prop}-dur, 1s) var(--${elementId}-${prop}-ease, ease-in)${separator}`;
        }

      });


      cssVars += ` transform: ${transform};\n`

      cssVars += ` transition: ${transition}`

      cssVars += '}\n\n';
    }
  }

  return {properties , css: cssVars};
}

// Example usage:
// import { generateCssFromVariants } from './generateCssFromVariants.js';
// const css = generateCssFromVariants('xdd', {
//   bgc: { vs: 'm', value: 'red' },
//   w: { vs: 'm', value: '150px' },
//   h: { vs: 'm', value: '150px' }
// });
// console.log(css);
