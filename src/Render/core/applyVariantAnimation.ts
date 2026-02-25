// --- Types ---
type AnimationStep = {
  v: string | number;
  du?: number;
  de?: number;
  e?: string;
};

type PropertyTimeline = Record<string, AnimationStep[]>; // e.g. { bgc: [...], tx: [...] }
export type VariantAnimations = Record<string, PropertyTimeline>; // e.g. { "base-hover": { bgc: [...] } }

interface ActiveAnimation {
  timeouts: number[];
  version: number; // used to ignore old queued callbacks
}

// Store running timeouts + version per element
const elementAnimations = new WeakMap<HTMLElement, ActiveAnimation>();

/**
 * Cancel all running timeouts for an element
 */
export function cancelAllAnimations(el: HTMLElement) {
  const active = elementAnimations.get(el);
  if (active) {
    for (const id of active.timeouts) clearTimeout(id);
    active.timeouts.length = 0;
  }
}

/**
 * Run one property’s timeline (sequence of steps)
 * Includes version check to ignore outdated callbacks
 */
function runTimeline(
  el: HTMLElement,
  fullVar: string,
  propKey: string,
  steps: AnimationStep[],
  active: ActiveAnimation,
) {
  let totalDelay = 0;

  for (const step of steps) {
    const { v, du = 300, de = 0, e = 'ease-in-out' } = step;
    const fullDelay = totalDelay + de;
    const currentVersion = active.version;

    const id = window.setTimeout(() => {
      // Ignore if another animation started
      const latest = elementAnimations.get(el);
      if (!latest || latest.version !== currentVersion) return;

      el.style.setProperty(fullVar, String(v));
      el.style.setProperty(`--${propKey}-dur`, `${du}ms`);
      el.style.setProperty(`--${propKey}-ease`, e);
    }, fullDelay);

    active.timeouts.push(id);
    totalDelay += du + de;
  }
}

/**
 * Apply an animation timeline to an element (e.g. when hover starts)
 * Completely cancels and replaces older animation
 */
export function applyVariantAnimation(
  el: HTMLElement,
  blockId: string,
  timeline: PropertyTimeline,
) {
  // Cancel current timeouts
  cancelAllAnimations(el);

  // Increment version so old callbacks are ignored
  const active = elementAnimations.get(el) || { timeouts: [], version: 0 };
  active.version++;
  elementAnimations.set(el, active);

  for (const [shortProp, steps] of Object.entries(timeline)) {
    const fullVar = `--${blockId}-${shortProp}`;
    const propKey = `${blockId}-${shortProp}`;
    runTimeline(el, fullVar, propKey, steps, active);
  }
}

/**
 * Reset animation to base/default state safely
 */
export function resetAnimation(el: HTMLElement, blockId: string, defaults: Record<string, any>) {
  cancelAllAnimations(el);

  const active = elementAnimations.get(el) || { timeouts: [], version: 0 };
  active.version++;
  elementAnimations.set(el, active);

  for (const [shortProp, value] of Object.entries(defaults)) {
    el.style.setProperty(`--${blockId}-${shortProp}`, String(value));
  }
}
