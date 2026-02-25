import { animateToVariant, applyVariantAtProgress } from "../animate";

type StaggerDirection = 'l-r'
  | 'r-l'
  | 'c-e'
  | 'e-c'
  | 're-lr-tb'
  | 're-rl-bt'
  | 're-rl-tb'
  | 're-rl-bt'
  | 'di-lt-rb'
  | 'di-rt-lb'
  | 'di-rb-tl'
  | 'di-lb-tr'
  | 'ra-tb'
  | 'ra-lr'
  | 'ra-rl'
  | 'ra-bt'
  | 'pointer'
  | 'reverse-pointer';

interface StaggerItem {
  id: string;
  scheduledTime: number;
}

interface ActiveStagger {
  items: StaggerItem[];
  variantName: string;
  startTime: number;
  progress?: { strength: number; variant: string };
  onComplete?: () => void;
  triggeredCount: number;
}

declare global {
  interface Window {
    __staggerHover?: {
      xClient: number;     // pointer clientX at enter
      parentLeft: number;  // parent.getBoundingClientRect().left at enter
      rootUid?: string;    // optional: your parent data-uid if you want to validate
    };
  }
}

let activeStaggers: ActiveStagger[] = [];

/** Attach this once to your parent element that wraps chars */
export function attachStaggerPointer(parentEl: HTMLElement, rootUid?: string) {
  parentEl.addEventListener("pointerenter", (e: PointerEvent) => {
    const rect = parentEl.getBoundingClientRect();
    window.__staggerHover = {
      xClient: e.clientX,
      parentLeft: rect.left,
      rootUid,
    };
  });
}

/**
 * Call this in your Lenis RAF loop to process stagger animations
 */
export const rafTick = (now: number) => {
  if (activeStaggers.length === 0) return;

  const toRemove: number[] = [];

  activeStaggers.forEach((stagger, sIndex) => {
    const elapsed = now - stagger.startTime;
    const readyItems = stagger.items
      .slice(stagger.triggeredCount)
      .filter(item => elapsed >= item.scheduledTime);

    readyItems.forEach((item, i) => {
      if (stagger.progress) {
        // progress-driven handled immediately in applyStaggeredAnimation
      } else {
        animateToVariant(item.id, stagger.variantName, {
          onComplete:
            stagger.triggeredCount + i === stagger.items.length - 1
              ? stagger.onComplete
              : undefined,
        });
      }
    });

    stagger.triggeredCount += readyItems.length;

    if (stagger.triggeredCount === stagger.items.length) {
      toRemove.push(sIndex);
    }
  });

  activeStaggers = activeStaggers.filter((_, i) => !toRemove.includes(i));
};





type CharInfo = {
  id: string;
  x: number;    // left
  y: number;    // top
  cx: number;   // center x
  cy: number;   // center y
  width: number;
  height: number;
};

function getCharInfos(charIds: string[]): CharInfo[] {
  const infos: CharInfo[] = [];
  for (const id of charIds) {
    const el = document.querySelector<HTMLElement>(`[data-uid="${id}"]`);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    infos.push({
      id,
      x: r.left,
      y: r.top,
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
      width: r.width,
      height: r.height,
    });
  }
  return infos;
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/**
 * Group characters into vertical columns by their center X.
 * Uses a tolerance derived from median char width to cluster.
 */
function groupIntoColumns(chars: CharInfo[], tolOverride?: number) {
  if (!chars.length) return [] as { cx: number; items: CharInfo[] }[];

  // derive tolerance from median char width (robust to different font sizes)
  const widths = chars.map(c => c.width).filter(Boolean);
  const medianWidth = median(widths) || 10;
  const tol = typeof tolOverride === 'number' ? tolOverride : Math.max(8, medianWidth * 0.6);

  // sort by center X
  const sorted = [...chars].sort((a, b) => a.cx - b.cx);

  const columns: { cx: number; items: CharInfo[] }[] = [];

  for (const c of sorted) {
    if (!columns.length) {
      columns.push({ cx: c.cx, items: [c] });
      continue;
    }

    // find nearest existing column center
    let nearestIdx = -1;
    let minDiff = Infinity;
    for (let i = 0; i < columns.length; i++) {
      const d = Math.abs(columns[i].cx - c.cx);
      if (d < minDiff) {
        minDiff = d;
        nearestIdx = i;
      }
    }

    if (minDiff <= tol) {
      const col = columns[nearestIdx];
      const prevCount = col.items.length;
      col.items.push(c);
      // update column center (weighted average)
      col.cx = (col.cx * prevCount + c.cx) / (prevCount + 1);
    } else {
      // new column
      columns.push({ cx: c.cx, items: [c] });
    }
  }

  return columns;
}

/**
 * orderChars: returns ordered list of ids for many direction modes.
 * This version implements full-column 'l-r' and 'r-l' scanning.
 */
function orderChars(direction: string, charIds: string[]): string[] {
  const chars = getCharInfos(charIds);
  if (!chars.length) return charIds; // fallback to original

  // --- full-column left->right / right->left ---
  if (direction === 'l-r' || direction === 'r-l') {
    const cols = groupIntoColumns(chars); // columns in ascending X order by default
    // sort columns across x
    cols.sort((a, b) => a.cx - b.cx);
    if (direction === 'r-l') cols.reverse();

    // flatten: within each column top->bottom
    const ordered: string[] = [];
    for (const col of cols) {
      col.items.sort((a, b) => a.cy - b.cy); // top -> bottom
      for (const item of col.items) ordered.push(item.id);
    }
    return ordered;
  }

  // --- other direction modes (short set) ---
  // keep existing behavior for center/edges/pointer/diagonal/radial etc.
  const cxMin = Math.min(...chars.map(c => c.cx));
  const cxMax = Math.max(...chars.map(c => c.cx));
  const cyMin = Math.min(...chars.map(c => c.cy));
  const cyMax = Math.max(...chars.map(c => c.cy));
  const centerX = (cxMin + cxMax) / 2;
  const centerY = (cyMin + cyMax) / 2;

  switch (direction) {
    case 'c-e':
      return [...chars]
        .map(c => ({ ...c, dist: Math.hypot(c.cx - centerX, c.cy - centerY) }))
        .sort((a, b) => a.dist - b.dist)
        .map(c => c.id);

    case 'e-c':
      return [...chars]
        .map(c => ({ ...c, dist: Math.hypot(c.cx - centerX, c.cy - centerY) }))
        .sort((a, b) => b.dist - a.dist)
        .map(c => c.id);

    case 're-lr-tb':
      return [...chars].sort((a, b) => a.cy - b.cy || a.cx - b.cx).map(c => c.id);

    case 're-lr-bt':
      return [...chars].sort((a, b) => b.cy - a.cy || a.cx - b.cx).map(c => c.id);

    case 're-rl-tb':
      return [...chars].sort((a, b) => a.cy - b.cy || b.cx - a.cx).map(c => c.id);

    case 're-rl-bt':
      return [...chars].sort((a, b) => b.cy - a.cy || b.cx - a.cx).map(c => c.id);

    // diagonals (sum/diff approximations)
    case 'di-lt-rb':
      return [...chars].sort((a, b) => (a.cx + a.cy) - (b.cx + b.cy)).map(c => c.id);
    case 'di-rt-lb':
      return [...chars].sort((a, b) => (b.cx + a.cy) - (a.cx + b.cy)).map(c => c.id);
    case 'di-rb-tl':
      return [...chars].sort((a, b) => (b.cx + b.cy) - (a.cx + a.cy)).map(c => c.id);
    case 'di-lb-tr':
      return [...chars].sort((a, b) => (a.cx + b.cy) - (b.cx + a.cy)).map(c => c.id);

    // radial options (use angles)
    case 'ra-tb':
    case 'ra-bt':
    case 'ra-lr':
    case 'ra-rl': {
      const withAngle = chars.map(c => ({ ...c, angle: Math.atan2(c.cy - centerY, c.cx - centerX) }));
      if (direction === 'ra-tb') {
        return withAngle.sort((a, b) => a.angle - b.angle).map(c => c.id);
      } else if (direction === 'ra-bt') {
        return withAngle.sort((a, b) => b.angle - a.angle).map(c => c.id);
      } else if (direction === 'ra-lr') {
        return withAngle.sort((a, b) => Math.abs(a.angle) - Math.abs(b.angle)).map(c => c.id);
      } else { // ra-rl
        return withAngle.sort((a, b) => Math.abs(b.angle) - Math.abs(a.angle)).map(c => c.id);
      }
    }

    // pointer / reverse-pointer (2D distance to pointer)
    case 'pointer':
    case 'reverse-pointer': {
      const parentId = charIds[0]?.split('-char-')?.[0];
      const parentEl = parentId ? document.querySelector<HTMLElement>(`[data-uid="${parentId}"]`) : null;
      const pointerX = (window.event as MouseEvent)?.clientX ?? (parentEl ? (parentEl.getBoundingClientRect().left + parentEl.getBoundingClientRect().width / 2) : centerX);
      const pointerY = (window.event as MouseEvent)?.clientY ?? (parentEl ? (parentEl.getBoundingClientRect().top + parentEl.getBoundingClientRect().height / 2) : centerY);
      const withDist = chars.map(c => ({ ...c, dist: Math.hypot(c.cx - pointerX, c.cy - pointerY) }));
      const sorted = withDist.sort((a, b) => a.dist - b.dist).map(c => c.id);
      return direction === 'pointer' ? sorted : sorted.reverse();
    }

    default:
      return charIds; // fallback unchanged
  }
}




/**
 * Apply staggered animation to a list of elements
 * Automatically cancels any ongoing stagger affecting the same elements
 */
export function applyStaggeredAnimation({
  charIds,
  variantName,
  delay = 0.03,
  direction = 'l-r',
  onComplete,
  progress
}: {
  charIds: string[];
  variantName: string;
  delay?: number;
  direction?: StaggerDirection;
  onComplete?: () => void;
  progress?: { strength: number; variant: string };
}) {
  if (!charIds.length) return;

  // Cancel any active stagger affecting these elements
  activeStaggers = activeStaggers.filter(
    s => !s.items.some(item => charIds.includes(item.id))
  );

  let orderedIds = orderChars(direction, charIds);

  // let orderedIds = [...charIds];
  // // ---------- ORDERING ----------
  // if (direction === 'r-l') {
  //   orderedIds.reverse();
  // } else if (direction === 'c-e') {
  //   const center = Math.floor(orderedIds.length / 2);
  //   orderedIds = orderedIds
  //     .map((id, i) => ({ id, dist: Math.abs(i - center), idx: i }))
  //     .sort((a, b) => (a.dist - b.dist) || (a.idx - b.idx))
  //     .map(x => x.id);
  // } else if (direction === 'pointer') {
  //   const parentEl = document.querySelector<HTMLElement>(
  //     `[data-uid="${charIds[0].split('-char-')[0]}"]`
  //   );

  //   if (parentEl) {
  //     const rect = parentEl.getBoundingClientRect();

  //     // 👇 try to grab current pointer, fallback to center
  //     const hoverX =
  //       (window.event as MouseEvent)?.clientX ?? rect.left + rect.width / 2;

  //     const hoverXRel = hoverX - rect.left;

  //     orderedIds = orderedIds
  //       .map((id) => {
  //         const charEl = document.querySelector<HTMLElement>(`[data-uid="${id}"]`);
  //         if (!charEl) return { id, dist: Infinity };
  //         const cRect = charEl.getBoundingClientRect();
  //         const cx = cRect.left + cRect.width / 2 - rect.left;
  //         return { id, dist: Math.abs(cx - hoverXRel) };
  //       })
  //       .sort((a, b) => a.dist - b.dist)
  //       .map((x) => x.id);
  //   }
  // } else if (direction === 'reverse-pointer') {
  //   const parentEl = document.querySelector<HTMLElement>(
  //     `[data-uid="${charIds[0].split('-char-')[0]}"]`
  //   );
  //   if (parentEl) {
  //     const rect = parentEl.getBoundingClientRect();
  //     const hoverX = (window.event as MouseEvent)?.clientX ?? rect.left + rect.width / 2;
  //     const hoverXRel = hoverX - rect.left;

  //     orderedIds = orderedIds
  //       .map((id) => {
  //         const charEl = document.querySelector<HTMLElement>(`[data-uid="${id}"]`);
  //         if (!charEl) return { id, dist: -Infinity };
  //         const cRect = charEl.getBoundingClientRect();
  //         const cx = cRect.left + cRect.width / 2 - rect.left;
  //         return { id, dist: Math.abs(cx - hoverXRel) };
  //       })
  //       .sort((a, b) => b.dist - a.dist) // 👈 reverse order
  //       .map((x) => x.id);
  //   }
  // }



  const items: StaggerItem[] = orderedIds.map((id, i) => ({
    id,
    scheduledTime: i * delay * 1000
  }));

  const stagger: ActiveStagger = {
    items,
    variantName,
    startTime: performance.now(),
    progress,
    onComplete,
    triggeredCount: 0
  };

  // ---------- PROGRESS-DRIVEN ----------
  if (progress) {
    const count = items.length;
    const step = count > 1 ? 1 / (count - 1) : 1; // normalized spacing per item

    items.forEach((item, i) => {
      const start = i * step;          // 0, step, 2*step, ...
      const end = start + step;        // each item spans one step
      // map global [0..1] to local [0..1]
      let local = (progress.strength - start) / (end - start);
      local = Math.max(0, Math.min(1, local));
      applyVariantAtProgress(item.id, progress.variant, local);
    });
  } else {
    activeStaggers.push(stagger);
  }
}
