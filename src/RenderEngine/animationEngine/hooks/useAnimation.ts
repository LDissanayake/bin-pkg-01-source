import { useCallback } from 'react';
import { engineStore } from '../engineStore';
import { animateToVariant } from '../animate';
import { applyStyle } from '../utils/applyStyles';

export function useAnimation(id: string) {
  const start = useCallback(
    (variantName: string, options?: { onComplete?: () => void }) => {
      animateToVariant(id, variantName, options);
    },
    [id]
  );

  const set = useCallback((variantName: string) => {
    const store = engineStore[id];
    if (!store) return;
    const values = store.variants[variantName];
    if (!values) return;

    Object.entries(values).forEach(([key, value]) => {
      const val = Array.isArray(value) ? value[value.length - 1] : value;
      store.currentValues[key] = String(val);
      applyStyle(id, store.element, key, String(val));
    });

  }, [id]);

  const variantBuild = () => {
    const store = engineStore[id];
    if (!store) return;
    const variantBuild = store?.custom?.variantBuild;
    if (!variantBuild) return;

    variantBuild();
  };

  return { start, set, variantBuild };
}
