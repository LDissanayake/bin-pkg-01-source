export function extractUnit(
  value: string | number | (string | number | null)[],
  fallback: string = ''
): string {
  // If it's an array, check the last valid string with unit
  if (Array.isArray(value)) {
    for (let i = value.length - 1; i >= 0; i--) {
      const item = value[i];
      if (typeof item === 'string') {
        const match = item.trim().match(/[\d.\-+]*([a-z%]+)$/i);
        if (match) return match[1];
      }
    }
    return fallback;
  }

  if (typeof value === 'string') {
    const match = value.trim().match(/[\d.\-+]*([a-z%]+)$/i);
    return match ? match[1] : fallback;
  }

  return fallback;
}

export function getDefaultUnit(key: string): string {
  if (key === 'x' || key === 'y') return 'px';
  if (key === 'rotate') return 'deg';
  if (key === 'rotateX') return 'deg';
  if (key === 'rotateY') return 'deg';
  return '';
}

