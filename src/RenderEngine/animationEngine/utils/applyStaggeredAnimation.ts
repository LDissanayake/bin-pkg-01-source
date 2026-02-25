import { animateToVariant, applyVariantAtProgress } from "../animate";

type StaggerDirection = "ltr" | "rtl" | "center";

interface StaggerItem {
  id: string;
  scheduledTime: number;
  // for progress-mode (precomputed)
  start?: number;
  end?: number;
}

interface ActiveStagger {
  items: StaggerItem[];
  variantName: string;
  startTime: number;
  onComplete?: () => void;
  triggeredCount: number;
}

interface ItemState {
  currentVariant?: string;
  lastTriggered?: number;
  lastProgress?: number;
}

let activeStaggers: ActiveStagger[] = [];
const itemStates = new Map<string, ItemState>();

/**
 * Call this in your Lenis RAF loop: rafTick(performance.now())
 */
export const rafTick = (now: number) => {
  if (activeStaggers.length === 0) return;

  let writeIndex = 0;

  for (let sIndex = 0; sIndex < activeStaggers.length; sIndex++) {
    const stagger = activeStaggers[sIndex];
    const elapsed = now - stagger.startTime;

    // Trigger items in order without allocations
    while (
      stagger.triggeredCount < stagger.items.length &&
      elapsed >= stagger.items[stagger.triggeredCount].scheduledTime
    ) {
      const item = stagger.items[stagger.triggeredCount];
      const state = itemStates.get(item.id);

      // If this item already has the same variant applied recently, skip re-triggering
      if (state?.currentVariant === stagger.variantName) {
        // still consider it "triggered" to move on
        stagger.triggeredCount++;
        continue;
      }

      // Trigger the animation and record state to prevent immediate re-triggers
      animateToVariant(item.id, stagger.variantName, {
        onComplete:
          stagger.triggeredCount === stagger.items.length - 1
            ? stagger.onComplete
            : undefined,
      });

      itemStates.set(item.id, {
        ...(state || {}),
        currentVariant: stagger.variantName,
        lastTriggered: now,
      });

      stagger.triggeredCount++;
    }

    // Keep unfinished staggers in place
    if (stagger.triggeredCount < stagger.items.length) {
      activeStaggers[writeIndex++] = stagger;
    }
  }

  // Truncate finished staggers
  activeStaggers.length = writeIndex;
};

/**
 * Apply staggered animation to a list of elements
 * Automatically cancels/adjusts any ongoing staggers that include the same elements.
 */
export function applyStaggeredAnimation({
  charIds,
  variantName,
  delay = 0.03,
  direction = "ltr",
  onComplete,
  progress,
}: {
  charIds: { ids: string[], items: { [key: string]: any } };
  variantName: string;
  delay?: number;
  direction?: StaggerDirection;
  onComplete?: () => void;
  progress?: { strength: number; variant: string };
}) {
  if (!charIds.ids.length) return;

  const now = performance.now();

  // --- 1) Cancel / remove overlapping items from existing staggers (partial cancel supported)
  const cancelIds = new Set(charIds.ids);
  for (let i = activeStaggers.length - 1; i >= 0; i--) {
    const s = activeStaggers[i];

    // if no items overlap, skip
    const hasOverlap = s.items.some((it) => cancelIds.has(it.id));
    if (!hasOverlap) continue;

    // filter out overlapping items
    const remaining = s.items.filter((it) => !cancelIds.has(it.id));

    if (remaining.length === 0) {
      // remove the whole stagger
      activeStaggers.splice(i, 1);
    } else {
      // keep stagger but update items and clamp triggeredCount
      s.items = remaining;
      s.triggeredCount = Math.min(s.triggeredCount, remaining.length);
    }
  }

  // Also clear per-item states for the newly scheduled items so they will animate fresh.
  // (This prevents stale state from blocking the new animation.)
  for (const id of charIds.ids) {
    itemStates.delete(id);
  }

  // --- 2) Reorder IDs for direction
  let orderedIds = [...charIds.ids];

  const charItems = Object.values(charIds.items);
  orderedIds =  orderChars(direction, charItems);


  // --- other direction modes (short set) ---
  // keep existing behavior for center/edges/pointer/diagonal/radial etc.
  // const cxMin = Math.min(...charItems.map(c => c.cx));
  // const cxMax = Math.max(...charItems.map(c => c.cx));
  // const cyMin = Math.min(...charItems.map(c => c.cy));
  // const cyMax = Math.max(...charItems.map(c => c.cy));
  // const centerX = (cxMin + cxMax) / 2;
  // const centerY = (cyMin + cyMax) / 2;



  // if (direction === "rtl") {
  //   orderedIds.reverse();
  // } else if (direction === "c-e") {
  //   const center = Math.floor(orderedIds.length / 2);
  //   orderedIds = orderedIds
  //     .map((id, i) => ({ id, dist: Math.abs(i - center) }))
  //     .sort((a, b) => a.dist - b.dist)
  //     .map((x) => x.id);
  // } else if ('di-lt-rb') {
  //   // diagonals (sum/diff approximations)
  //   orderedIds = [...charItems].sort((a, b) => (a.cx + a.cy) - (b.cx + b.cy)).map(c => c.id);
  // }

  // --- 3) Build StaggerItem list (and precompute progress start/end if needed)
  const count = orderedIds.length;
  const items: StaggerItem[] = orderedIds.map((id, i) => {
    const scheduledTime = i * delay * 1000;
    if (progress) {
      // safe staggerFactor (avoid division by zero)
      const staggerFactor = count > 1 ? 1 / (count - 1) : 1;
      const start = i * staggerFactor;
      const end = Math.min(1, start + (1 - staggerFactor));
      return { id, scheduledTime, start, end };
    }
    return { id, scheduledTime };
  });

  // If it's progress-driven, apply immediately (do not push to RAF list)
  if (progress) {
    const tiny = 1e-3; // threshold to avoid no-op updates
    items.forEach((item) => {
      // normalize using precomputed start/end (safe fallback)
      const s = item.start ?? 0;
      const e = item.end ?? 1;
      const denom = e - s;

      // If denom is zero (single-element edge case), interpret local progress as either 0 or 1
      let localProgress =
        denom === 0 ? (progress.strength >= s ? 1 : 0) : (progress.strength - s) / denom;

      // clamp
      localProgress = Math.max(0, Math.min(1, localProgress));

      const prev = itemStates.get(item.id) || {};
      const prevProg = prev.lastProgress ?? -1;

      // Only call applyVariantAtProgress if progress changed enough
      if (Math.abs(prevProg - localProgress) > tiny) {
        applyVariantAtProgress(item.id, progress.variant, localProgress);

        // update item state (track lastProgress; set currentVariant when localProgress === 1)
        prev.lastProgress = localProgress;
        if (localProgress >= 1) prev.currentVariant = progress.variant;
        itemStates.set(item.id, prev);
      }
    });

    // progress-driven staggers are not stored (they are applied immediately)
    return;
  }

  // --- 4) Create and push a new ActiveStagger for RAF processing
  const stagger: ActiveStagger = {
    items,
    variantName,
    startTime: now,
    onComplete,
    triggeredCount: 0,
  };

  activeStaggers.push(stagger);
}




type CharInfo = {
  id: string;
  x: number;    // left
  y: number;    // top
  cx: number;   // center x
  cy: number;   // center y
  width: number;
  height: number;
};



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
  const chars = charIds;
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

      const parentId = charIds[0]?.id?.split('-char-')?.[0];
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