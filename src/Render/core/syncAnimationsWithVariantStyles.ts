import { resolveRuntimeValue } from "../blocks/hooks/useBlockDesignRuntime";

type Animations = Record<string, Record<string, any[]>>;
type VariantStyles = Record<string, Record<string, { value: any }>>;

/**
 * 🔥 UPDATED SYNC LOGIC
 * Now iterates over Styles first to catch missing properties in the timeline.
 */
const syncAnimationsWithVariantStyles = (animations, styles, resolvedTheme) => {
  const result = structuredClone(animations);

  Object.entries(result).forEach(([transitionKey, props]) => {
    const [, toVariant] = transitionKey.split('-');
    const variantStyles = styles[toVariant];
    if (!variantStyles) return;

    // We iterate over the Styles defined for the variant to catch everything
    Object.entries(variantStyles).forEach(([prop, styleDef]) => {
      
      const value = resolveRuntimeValue(styleDef.value, resolvedTheme); // resolve image, and colors.

      if (value == null) return;

      if (props[prop]) {
        // 1. Property exists in TL: Sync the LAST frame to match final style
        const frames = props[prop];
        if (Array.isArray(frames) && frames.length > 0) {
          frames[frames.length - 1].v = value;
        }
      } else {
        // 2. Property MISSING in TL: Force-inject a snap-frame (0ms) 
        // This ensures non-animatable strings like 'display' or 'flex-direction' 
        // always update to the target variant's state even if not in the TL editor.
        props[prop] = [{ v: value, du: 1000, de: 0 }];
      }
    });
  });

  return result;
};

export default syncAnimationsWithVariantStyles;