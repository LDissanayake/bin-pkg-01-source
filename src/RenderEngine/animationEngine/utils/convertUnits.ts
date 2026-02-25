const percentCache = new WeakMap<HTMLElement, Record<string, number>>();

export function convertToTargetUnit(
  el: HTMLElement,
  value: string | number,
  property: string,
  targetUnit: string,
  cache?: Record<string, { percentage: number; auto: number }>
): number {
  const input = typeof value === 'string' ? value : `${value}`;
  const numeric = parseFloat(input);
  const unit = input === 'auto' ? 'auto' : input.match(/[a-z%]+$/)?.[0] ?? 'px';
  const prop = resolveStyleProperty(property); // to do this is need to be fix.


  // If same unit, just return numeric
  if (unit === targetUnit) return numeric;

  // Get the base px value
  let px: number;

  switch (unit) {
    case 'px':
      px = numeric;
      break;
    case '%':
      // const base = cache?.[prop]?.percentage || 0; // original code before problem of x transition mix uinit
      const base = cache?.[property]?.percentage || 0;
      px = (numeric / 100) * base;
      break;
    case 'vw':
      px = (numeric / 100) * window.innerWidth;
      break;
    case 'vh':
      px = (numeric / 100) * window.innerHeight;
      break;
    case 'vmin':
      px = (numeric / 100) * Math.min(window.innerWidth, window.innerHeight);
      break;
    case 'vmax':
      px = (numeric / 100) * Math.max(window.innerWidth, window.innerHeight);
      break;
    case 'em':
      px = numeric * getFontSize(el);
      break;
    case 'rem':
      px = numeric * getFontSize(document.documentElement);
      break;
    case 'ch':
      px = numeric * getCharWidth(el);
      break;
    case 'auto':
      px = cache?.[prop]?.auto || 0;
      break;
    default:
      px = numeric; // fallback
  }

  // Convert px to target unit
  switch (targetUnit) {
    case 'px':
      return px;
    case '%': {
      const base = cache?.[property]?.percentage || 0;
      return (px / base) * 100;
    }
    case 'vw':
      return (px / window.innerWidth) * 100;
    case 'vh':
      return (px / window.innerHeight) * 100;
    case 'vmin':
      return (px / Math.min(window.innerWidth, window.innerHeight)) * 100;
    case 'vmax':
      return (px / Math.max(window.innerWidth, window.innerHeight)) * 100;
    case 'em':
      return px / getFontSize(el);
    case 'rem':
      return px / getFontSize(document.documentElement);
    case 'ch':
      return px / getCharWidth(el);
    default:
      return px;
  }
}


function getFontSize(el: Element): number {
  return parseFloat(getComputedStyle(el).fontSize);
}

function getCharWidth(el: Element): number {
  const test = document.createElement('span');
  test.style.position = 'absolute';
  test.style.visibility = 'hidden';
  test.style.font = getComputedStyle(el).font;
  test.textContent = '0';
  document.body.appendChild(test);
  const width = test.getBoundingClientRect().width;
  test.remove();
  return width;
}


function resolveStyleProperty(property: string): string {
  switch (property) {
    case 'x':
    case 'left':
    case 'width':
      return 'width';
    case 'y':
    case 'top':
    case 'height':
      return 'height';
    default:
      return property;
  }
}

export function hasSpecialUnits(
  value: string | number | Array<string | number | null>,
  targets: ('%' | 'auto')[]
): boolean {
  const check = (v: string | number | null) => {
    if (v == null) return false;
    const str = typeof v === 'string' ? v.toLowerCase() : `${v}`;
    return targets.some((t) => str.includes(t));
  };

  if (Array.isArray(value)) {
    return value.some(check);
  }

  return check(value);
}