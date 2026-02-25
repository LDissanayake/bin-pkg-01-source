// improved-anim-engine.ts
import tinycolor from "tinycolor2";
import { engineStore } from "./engineStore";
import { Animation, StyleValue, Variant } from "./types";
import { applyStyle } from "./utils/applyStyles";
import { convertToTargetUnit, hasSpecialUnits } from "./utils/convertUnits";
import { cubicBezier, splitBezier } from "./utils/cubicBezier";
import { extractUnit, getDefaultUnit } from "./utils/extractUnit";

const defaultTransition = {
  ease: [0, 0, 1, 1] as [number, number, number, number],
  duration: 0.5,
  delay: 0,
};

const colorProps = [
  "color",
  "backgroundColor",
  "borderColor",
  "outlineColor",
  "fill",
  "stroke",
];

function parseColor(input: string): [number, number, number, number] {
  const c = tinycolor(input || "rgba(0,0,0,0)");
  const { r, g, b, a } = c.toRgb();
  // Use integer RGB values as before and alpha as float
  return [Math.round(r), Math.round(g), Math.round(b), a];
}

// Small helper to stringify rgba quickly
function rgbaToString(rgba: [number, number, number, number]) {
  // Prefer integers for RGB for stable string equality checks
  return `rgba(${Math.round(rgba[0])}, ${Math.round(rgba[1])}, ${Math.round(
    rgba[2]
  )}, ${Number(rgba[3].toFixed(3))})`;
}

// value cache for resolving %/auto to px
const valueCache = new WeakMap<
  HTMLElement,
  Record<string, { percentage: number; auto: number }>
>();

function generateValueCache(el: HTMLElement, prop: string) {
  // Keep minimal DOM thrash: we set styles synchronously but avoid layout
  if (!valueCache.has(el)) valueCache.set(el, {});
  const cache = valueCache.get(el)!;

  if (!cache[prop]) {
    // Save originals
    const original = {
      propValue: (el.style as any)[prop],
      transform: el.style.transform,
      transition: el.style.transition,
    };

    // Temporarily remove transforms/transitions to get reliable layout reads
    el.style.transition = "none";
    el.style.transform = "none";

    // Measure 100%
    (el.style as any)[prop] = "100%";
    const percent =
      prop === "width" || prop === "x"
        ? el.getBoundingClientRect().width
        : el.getBoundingClientRect().height;

    // Measure auto
    (el.style as any)[prop] = "auto";
    const auto =
      prop === "width" || prop === "x"
        ? el.getBoundingClientRect().width
        : el.getBoundingClientRect().height;

    // Restore
    (el.style as any)[prop] = original.propValue;
    el.style.transform = original.transform;
    el.style.transition = original.transition;

    cache[prop] = { percentage: percent, auto };
  }
}

interface AnimationCache {
  animations: Animation[];
}

const animateVariantCache = new Map<string, AnimationCache>();
const nonAnimatableCache = new Map<string, Record<string, any>>();

const nonAnimatableProps = ["pointerEvents", "display", "overflow", "visibility"];

// --- Bezier / ease cache to avoid recomputing cubicBezier & split on first hover ---
const bezierCache = new Map<string, (t: number) => number>();
const easeFnsCache = new Map<string, ((t: number) => number)[]>();

function getEaseFns(easeArray: [number, number, number, number], times: number[]) {
  const key = `${easeArray.join(",")}|${times.length}`;
  const cached = easeFnsCache.get(key);
  if (cached) return cached;

  const fns: ((t: number) => number)[] = [];
  for (let i = 0; i < times.length - 1; i++) {
    // We split then compute cubicBezier for this segment.
    const bezierSegments = splitBezier(
      easeArray,
      i / (times.length - 1),
      (i + 1) / (times.length - 1)
    );

    // Compose a cache key for this base bezier
    const bezierKey = bezierSegments.join(",");
    let fn = bezierCache.get(bezierKey);
    if (!fn) {
      fn = cubicBezier(...(bezierSegments as [number, number, number, number]));
      bezierCache.set(bezierKey, fn);
    }
    fns.push(fn);
  }

  easeFnsCache.set(key, fns);
  return fns;
}

function getOrCreateVariantAnimations(id: string, variantName: string): Animation[] {
  const cacheKey = `${id}:${variantName}`;
  const cached = animateVariantCache.get(cacheKey);
  if (cached) return cached.animations;

  const store = engineStore[id];
  if (!store) return [];

  const { element, currentValues, variants } = store;
  const target = variants[variantName];
  if (!target) return [];

  const keyList = Object.keys(target).filter((key) => key !== "transition");
  const animations: Animation[] = [];
  const nonAnimatables: Record<string, any> = {};

  for (const key of keyList) {
    // --- handle non-animatable props ---
    if (nonAnimatableProps.includes(key)) {
      nonAnimatables[key] = (target as any)[key];
      continue;
    }

    const transition = (target as any).transition?.[key] ?? {};
    const easeArray = (transition.ease ?? defaultTransition.ease) as [
      number,
      number,
      number,
      number
    ];
    const duration = (transition.duration ?? defaultTransition.duration) * 1000;
    const delay = (transition.delay ?? defaultTransition.delay) * 1000;
    const times = transition.times ?? [0, 1];

    const styleValue = (target as any)[key] as StyleValue;
    const currentValue = currentValues[key];
    const isColor = colorProps.includes(key);

    const easeFns = getEaseFns(easeArray, times);

    if (isColor) {
      // generate frames as array of rgba arrays
      let frames: number[][];
      if (Array.isArray(styleValue) && styleValue.length >= 2) {
        frames = styleValue.map((v) =>
          parseColor(String(v ?? (currentValue as string) ?? "rgba(0,0,0,0)"))
        );
      } else {
        const fromColor = parseColor(String(currentValue ?? "rgba(0,0,0,0)"));
        const toColor = parseColor(String(styleValue ?? currentValue ?? "rgba(0,0,0,0)"));
        frames = [fromColor, toColor];
      }

      animations.push({
        key,
        unit: "",
        frames,
        times,
        duration,
        delay,
        easeFns,
        easeArray,
        isColor: true,
      } as Animation);
    } else {
      let unit = extractUnit(styleValue, extractUnit(currentValue, getDefaultUnit(key)));
      const isAuto = unit === "auto";
      if (isAuto) unit = "px";

      if (currentValue === "auto" || hasSpecialUnits(styleValue, ["%", "auto"])) {
        generateValueCache(element, key);
      }

      const resolveValue = (val: string | number) =>
        convertToTargetUnit(element, val, key, unit, valueCache.get(element));

      function safeResolve(value: any, fallback: number = 0): number {
        const resolved = resolveValue(value);
        if (resolved === undefined || Number.isNaN(resolved) || !Number.isFinite(resolved)) {
          return fallback;
        }
        return resolved;
      }

      let frames: number[];
      if (Array.isArray(styleValue) && styleValue.length >= 2) {
        frames = styleValue.map((v) => safeResolve(v, safeResolve(currentValue, 0)));
      } else {
        const fromVal = safeResolve(currentValue, 0);
        const toVal = safeResolve(styleValue, fromVal);
        frames = [fromVal, toVal];
      }

      animations.push({
        key,
        unit,
        frames,
        times,
        duration,
        delay,
        easeFns,
        easeArray,
        isColor: false,
        isAuto,
      } as Animation);
    }
  }

  animateVariantCache.set(cacheKey, { animations });
  nonAnimatableCache.set(cacheKey, nonAnimatables);

  return animations;
}

// Backwards-compatible helper (keeps your old _getOrCreateVariantAnimations but routes to optimized one)
function _getOrCreateVariantAnimations(id: string, variantName: string): Animation[] {
  return getOrCreateVariantAnimations(id, variantName);
}

export function animateToVariant(
  id: string,
  variantName: string,
  options: { onComplete?: () => void } = {}
) {
  const store = engineStore[id];
  if (!store) return;

  if (store.animationFrameId) {
    cancelAnimationFrame(store.animationFrameId);
    store.animationFrameId = undefined;
  }

  // Get animations with static data cached
  const animations = getOrCreateVariantAnimations(id, variantName);

  // Apply non-animatable props immediately
  const nonAnimatables = nonAnimatableCache.get(`${id}:${variantName}`);
  if (nonAnimatables) {
    for (const [key, value] of Object.entries(nonAnimatables)) {
      applyStyle(id, store.element, key, value);
    }
  }

  if (!animations.length) return;

  // Update 'from' frames dynamically to current live values
  for (const anim of animations) {
    const currentValue = store.currentValues[anim.key];

    if (anim.isColor) {
      const fromColor = parseColor(String(currentValue ?? "rgba(0,0,0,0)"));
      if (!anim.frames || anim.frames.length < 2) {
        anim.frames = [fromColor, fromColor];
      } else {
        anim.frames[0] = fromColor;
      }
    } else {
      const unit = (anim.unit === "auto" ? "px" : anim.unit) || "px";
      const fromNumber = convertToTargetUnit(
        store.element,
        currentValue,
        anim.key,
        unit,
        valueCache.get(store.element)
      );
      if (!anim.frames || anim.frames.length < 2) {
        anim.frames = [fromNumber, fromNumber];
      } else {
        anim.frames[0] = fromNumber;
      }
    }
  }

  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    // Process animations
    for (const anim of animations) {
      const {
        key,
        frames,
        times,
        duration,
        delay,
        easeArray,
        unit,
        isColor,
        easeFns,
      } = anim;

      const localTimes = times && times.length >= 2 ? times : [0, 1];

      const globalT = Math.min(Math.max((elapsed - delay) / Math.max(1, duration), 0), 1);
      // Use cubicBezier from precomputed cache for base easing (easeArray used only for global easing)
      const easedGlobalT = cubicBezier(...easeArray)(globalT);

      let value: string | undefined;

      // Fast interpolation
      if (isColor) {
        // color frames: array of rgba arrays
        // find segment
        const segCount = localTimes.length - 1;
        let found = false;
        for (let i = 0; i < segCount; i++) {
          const t0 = localTimes[i];
          const t1 = localTimes[i + 1];
          if (easedGlobalT >= t0 && easedGlobalT <= t1) {
            const localT = (easedGlobalT - t0) / (t1 - t0 || 1);
            const easedT = easeFns[i](localT);
            const from = (frames[i] || frames[0]) as number[];
            const to = (frames[i + 1] || frames[frames.length - 1]) as number[];
            const rgba: [number, number, number, number] = [
              from[0] + (to[0] - from[0]) * easedT,
              from[1] + (to[1] - from[1]) * easedT,
              from[2] + (to[2] - from[2]) * easedT,
              from[3] + (to[3] - from[3]) * easedT,
            ];
            value = rgbaToString(rgba);
            found = true;
            break;
          }
        }
        if (!found) {
          // fallback to end frame
          const last = frames[frames.length - 1] as number[];
          value = rgbaToString([last[0], last[1], last[2], last[3]]);
        }
      } else {
        // numeric frames
        const segCount = localTimes.length - 1;
        let found = false;
        for (let i = 0; i < segCount; i++) {
          const t0 = localTimes[i];
          const t1 = localTimes[i + 1];
          if (easedGlobalT >= t0 && easedGlobalT <= t1) {
            const localT = (easedGlobalT - t0) / (t1 - t0 || 1);
            const easedT = easeFns[i](localT);
            const from = (frames[i] as number) ?? (frames[0] as number) ?? 0;
            const to = (frames[i + 1] as number) ?? (frames[frames.length - 1] as number) ?? from;
            value = `${from + (to - from) * easedT}${unit || ""}`;
            found = true;
            break;
          }
        }
        if (!found) {
          const last = frames[frames.length - 1] as number;
          value = `${last}${unit || ""}`;
        }
      }

      if (value !== undefined && store.currentValues[key] !== value) {
        store.currentValues[key] = value;
        applyStyle(id, store.element, key, value);
      }
    }

    const allDone = animations.every(({ duration, delay }) => elapsed >= delay + duration);
    if (!allDone) {
      store.animationFrameId = requestAnimationFrame(step);
    } else {
      store.animationFrameId = undefined;
      options.onComplete?.();
    }
  }

  store.animationFrameId = requestAnimationFrame(step);
}

interface PrecomputedVariant {
  keys: string[];
  frames: Record<string, number[][] | number[]>;
  units: Record<string, string>;
  easeFns: Record<string, ((t: number) => number)[]>;
  times: Record<string, number[]>;
  isColor: Record<string, boolean>;
}

const variantCache = new Map<string, PrecomputedVariant>();

function precomputeVariant(id: string, variantName: string): PrecomputedVariant | null {
  const store = engineStore[id];
  if (!store) return null;

  const { element, currentValues, variants } = store;
  const target = variants[variantName];
  if (!target) return null;

  const keys = Object.keys(target).filter((k) => k !== "transition");
  const result: PrecomputedVariant = {
    keys,
    frames: {},
    units: {},
    easeFns: {},
    times: {},
    isColor: {},
  };

  for (const key of keys) {
    const transition = (target as any).transition?.[key] ?? {};
    const easeArray = (transition.ease ?? defaultTransition.ease) as [
      number,
      number,
      number,
      number
    ];
    const times = transition.times ?? [0, 1];
    const easeFns = getEaseFns(easeArray, times);

    const styleValue = (target as any)[key];
    const currentValue = currentValues[key];
    const isColor = colorProps.includes(key);

    result.isColor[key] = isColor;
    result.times[key] = times;
    result.easeFns[key] = easeFns;

    if (isColor) {
      const frames = Array.isArray(styleValue)
        ? styleValue.map((v) => parseColor(v ?? (currentValue as string)))
        : [parseColor(String(currentValue ?? "rgba(0,0,0,0)")), parseColor(String(styleValue ?? currentValue ?? "rgba(0,0,0,0)"))];
      result.frames[key] = frames;
    } else {
      let unit = extractUnit(styleValue, extractUnit(currentValue, getDefaultUnit(key)));
      if (unit === "auto") unit = "px";
      result.units[key] = unit;

      if (hasSpecialUnits(styleValue, ["%", "auto"])) {
        generateValueCache(element, key);
      }
      const resolveValue = (val: string | number) =>
        convertToTargetUnit(element, val, key, unit, valueCache.get(element));

      const frames = Array.isArray(styleValue)
        ? styleValue.map((v) => resolveValue(v ?? currentValue))
        : [resolveValue(currentValue), resolveValue(styleValue)];
      result.frames[key] = frames as any;
    }
  }

  const cacheKey = `${id}:${variantName}`;
  variantCache.set(cacheKey, result);
  return result;
}

export function applyVariantAtProgress(id: string, variantName: string, progress: number) {
  const store = engineStore[id];
  if (!store) return;

  const cacheKey = `${id}:${variantName}`;
  let cache = variantCache.get(cacheKey);

  if (!cache) {
    const computed = precomputeVariant(id, variantName);
    if (!computed) return;
    cache = computed;
  }

  const { element, currentValues } = store;

  for (const key of cache.keys) {
    const times = cache.times[key];
    const easeFns = cache.easeFns[key];
    const frames = cache.frames[key];
    const isColor = cache.isColor[key];
    const unit = cache.units[key] ?? "";

    // find segment for given progress
    for (let i = 0; i < times.length - 1; i++) {
      const t0 = times[i];
      const t1 = times[i + 1];
      if (progress >= t0 && progress <= t1) {
        const localT = (progress - t0) / (t1 - t0 || 1);
        const easedT = easeFns[i](localT);

        let value: string;
        if (isColor) {
          const from = (frames[i] as number[]) ?? (frames[0] as number[]);
          const to = (frames[i + 1] as number[]) ?? (frames[frames.length - 1] as number[]);
          const rgba: [number, number, number, number] = [
            from[0] + (to[0] - from[0]) * easedT,
            from[1] + (to[1] - from[1]) * easedT,
            from[2] + (to[2] - from[2]) * easedT,
            from[3] + (to[3] - from[3]) * easedT,
          ];
          value = rgbaToString(rgba);
        } else {
          const from = (frames[i] as number) ?? 0;
          const to = (frames[i + 1] as number) ?? from;
          value = `${from + (to - from) * easedT}${unit}`;
        }

        if (value !== currentValues[key]) {
          currentValues[key] = value;
          applyStyle(id, element, key, value);
        }
        break;
      }
    }
  }
}

// --- Helper: precompute all variants for all engineStore entries ---
// Call this once at app init (or when variants load) to push heavy work off interaction path.
export function precomputeAllVariants() {
  for (const id of Object.keys(engineStore)) {
    const store = engineStore[id];
    if (!store) continue;
    const variants = store.variants || {};
    for (const vName of Object.keys(variants)) {
      precomputeVariant(id, vName);
    }
  }
}
