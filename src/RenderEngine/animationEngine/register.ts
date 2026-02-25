import { engineStore } from './engineStore';
import { expandCompoundValues } from './utils/expandCompoundValues';

export function registerElement(
  id: string,
  el: HTMLElement,
  variants: Record<string, Record<string, string | number>>,
  defaultVariantId: string | undefined,
  custom?: {[key:string] : any}
) {
  const cleanVariants = expandCompoundValues(variants);
  const base = cleanVariants[defaultVariantId || 'base'] || {};

  const existing = engineStore[id];

  if (existing) {
    // Update variants and preserve current values if possible
    existing.element = el;
    existing.variants = cleanVariants;

    // Update currentValues if defaultVariantId changed
    if (defaultVariantId && cleanVariants[defaultVariantId]) {
      existing.currentValues = JSON.parse(JSON.stringify(cleanVariants[defaultVariantId]));
    }
  } else {
    // First-time registration
    engineStore[id] = {
      element: el,
      variants: cleanVariants,
      currentValues: JSON.parse(JSON.stringify(base)),
      playing: false,
      custom: custom || {}
    };
  }
}