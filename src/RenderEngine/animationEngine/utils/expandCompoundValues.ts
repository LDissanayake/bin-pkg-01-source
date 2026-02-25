// --- Helper: Expand compound properties without compressing ---
export function expandCompoundValues(variants: Record<string, any>) {
  const compoundKeys = ['borderRadius', 'margin', 'padding', 'inset'];

  const expandToFour = (value: string): string[] => {
    const parts = value.trim().split(/\s+/);
    if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
    if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
    if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
    return parts.slice(0, 4); // limit to 4 values
  };

  const subPropsMap: Record<string, string[]> = {
    borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    inset: ['top', 'right', 'bottom', 'left'],
  };

  for (const variantName in variants) {
    const variant = variants[variantName];
    if (!variant) continue;

    for (const key of compoundKeys) {
      const value = variant[key];
      if (!value) continue;

      const expandedKeys = subPropsMap[key];
      if (!expandedKeys) continue;

      if (Array.isArray(value)) {
        // Handle timeline values
        const expandedTimeline = value.map((item) => {
          if (item == null) return null;
          return expandToFour(String(item));
        });

        expandedKeys.forEach((subKey, i) => {
          variant[subKey] = expandedTimeline.map(v => v ? v[i] : null);
        });
      } else {
        // Handle static compound value
        const expanded = expandToFour(String(value));
        expandedKeys.forEach((subKey, i) => {
          variant[subKey] = expanded[i];
        });
      }

      // Remove the original compound property
      delete variant[key];

      // Expand transition if it exists
      if (variant.transition?.[key]) {
        const transition = variant.transition[key];
        expandedKeys.forEach(subKey => {
          variant.transition[subKey] = { ...transition };
        });
        delete variant.transition[key];
      }
    }
  }

  return variants;
}
