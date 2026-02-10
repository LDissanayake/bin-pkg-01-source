/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 302:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(338);
// EXTERNAL MODULE: ./node_modules/tinycolor2/esm/tinycolor.js
var tinycolor = __webpack_require__(140);
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/engineStore.ts
const engineStore_engineStore = {};
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/utils/applyStyles.ts

const transformKeys = ['x', 'y', 'rotate', 'rotateX', 'rotateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY'];
function buildTransform(current) {
  const transforms = [];
  if (current.x != null) transforms.push(`translateX(${current.x})`);
  if (current.y != null) transforms.push(`translateY(${current.y})`);
  if (current.z != null) transforms.push(`translateZ(${current.z})`);
  if (current.rotate != null) transforms.push(`rotate(${current.rotate})`);
  if (current.rotateX != null) transforms.push(`rotateX(${current.rotateX})`);
  if (current.rotateY != null) transforms.push(`rotateY(${current.rotateY})`);
  if (current.rotateZ != null) transforms.push(`rotateZ(${current.rotateY})`);
  if (current.scale != null) transforms.push(`scale(${current.scale})`);
  if (current.scaleX != null) transforms.push(`scaleX(${current.scaleX})`);
  if (current.scaleY != null) transforms.push(`scaleY(${current.scaleY})`);
  if (current.skewX != null) transforms.push(`skewX(${current.skewX})`);
  if (current.skewY != null) transforms.push(`skewY(${current.skewY})`);
  return transforms.join(' ');
}
const backdropKeys = ['bf_blur', 'bf_brightness', 'bf_contrast', 'bf_grayscale', 'bf_hueRotate', 'bf_invert', 'bf_opacity', 'bf_saturate', 'bf_sepia'];
function buildBackdropFilter(current) {
  const filters = [];
  if (current.bf_blur != null) filters.push(`blur(${current.bf_blur})`);
  if (current.bf_brightness != null) filters.push(`brightness(${current.bf_brightness})`);
  if (current.bf_contrast != null) filters.push(`contrast(${current.bf_contrast})`);
  if (current.bf_grayscale != null) filters.push(`grayscale(${current.bf_grayscale})`);
  if (current.bf_hueRotate != null) filters.push(`hue-rotate(${current.bf_hueRotate})`);
  if (current.bf_invert != null) filters.push(`invert(${current.bf_invert})`);
  if (current.bf_opacity != null) filters.push(`opacity(${current.bf_opacity})`);
  if (current.bf_saturate != null) filters.push(`saturate(${current.bf_saturate})`);
  if (current.bf_sepia != null) filters.push(`sepia(${current.bf_sepia})`);
  return filters.join(' ');
}
function applyStyle(id, el, key, value) {
  const store = engineStore_engineStore[id];
  if (!store) return;
  store.currentValues[key] = value;
  if (transformKeys.includes(key)) {
    const transform = buildTransform(store.currentValues);
    el.style.transform = transform;
  } else if (backdropKeys.includes(key)) {
    const filter = buildBackdropFilter(store.currentValues);
    el.style.backdropFilter = filter;
  } else {
    el.style[key] = value;
  }
}
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/utils/convertUnits.ts
const percentCache = new WeakMap();
function convertToTargetUnit(el, value, property, targetUnit, cache) {
  const input = typeof value === 'string' ? value : `${value}`;
  const numeric = parseFloat(input);
  const unit = input === 'auto' ? 'auto' : input.match(/[a-z%]+$/)?.[0] ?? 'px';
  const prop = resolveStyleProperty(property); // to do this is need to be fix.

  // If same unit, just return numeric
  if (unit === targetUnit) return numeric;

  // Get the base px value
  let px;
  switch (unit) {
    case 'px':
      px = numeric;
      break;
    case '%':
      // const base = cache?.[prop]?.percentage || 0; // original code before problem of x transition mix uinit
      const base = cache?.[property]?.percentage || 0;
      px = numeric / 100 * base;
      break;
    case 'vw':
      px = numeric / 100 * window.innerWidth;
      break;
    case 'vh':
      px = numeric / 100 * window.innerHeight;
      break;
    case 'vmin':
      px = numeric / 100 * Math.min(window.innerWidth, window.innerHeight);
      break;
    case 'vmax':
      px = numeric / 100 * Math.max(window.innerWidth, window.innerHeight);
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
      px = numeric;
    // fallback
  }

  // Convert px to target unit
  switch (targetUnit) {
    case 'px':
      return px;
    case '%':
      {
        const base = cache?.[property]?.percentage || 0;
        return px / base * 100;
      }
    case 'vw':
      return px / window.innerWidth * 100;
    case 'vh':
      return px / window.innerHeight * 100;
    case 'vmin':
      return px / Math.min(window.innerWidth, window.innerHeight) * 100;
    case 'vmax':
      return px / Math.max(window.innerWidth, window.innerHeight) * 100;
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
function getFontSize(el) {
  return parseFloat(getComputedStyle(el).fontSize);
}
function getCharWidth(el) {
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
function resolveStyleProperty(property) {
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
function hasSpecialUnits(value, targets) {
  const check = v => {
    if (v == null) return false;
    const str = typeof v === 'string' ? v.toLowerCase() : `${v}`;
    return targets.some(t => str.includes(t));
  };
  if (Array.isArray(value)) {
    return value.some(check);
  }
  return check(value);
}
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/utils/cubicBezier.ts
// cubicBezier.ts
function cubicBezier(x1, y1, x2, y2) {
  // Constants from the spec
  const NEWTON_ITERATIONS = 4;
  const NEWTON_MIN_SLOPE = 0.001;
  const SUBDIVISION_PRECISION = 0.0000001;
  const SUBDIVISION_MAX_ITERATIONS = 10;
  const kSplineTableSize = 11;
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
  const float32ArraySupported = typeof Float32Array === 'function';

  // Precompute sample values table
  const sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1) {
    return 3.0 * aA1;
  }
  function calcBezier(t, aA1, aA2) {
    return ((A(aA1, aA2) * t + B(aA1, aA2)) * t + C(aA1)) * t;
  }
  function getSlope(t, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * t * t + 2.0 * B(aA1, aA2) * t + C(aA1);
  }
  function binarySubdivide(x, a, b, x1, x2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
      currentT = a + (b - a) / 2.0;
      currentX = calcBezier(currentT, x1, x2) - x;
      if (currentX > 0.0) {
        b = currentT;
      } else {
        a = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }
  function newtonRaphsonIterate(x, guessT, x1, x2) {
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      const currentSlope = getSlope(guessT, x1, x2);
      if (currentSlope === 0.0) return guessT;
      const currentX = calcBezier(guessT, x1, x2) - x;
      guessT -= currentX / currentSlope;
    }
    return guessT;
  }
  function bezier(t) {
    if (x1 === y1 && x2 === y2) return t; // linear

    // Find t for x
    let intervalStart = 0.0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= t; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (t - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, x1, x2);
    return calcBezier(initialSlope >= NEWTON_MIN_SLOPE ? newtonRaphsonIterate(t, guessForT, x1, x2) : initialSlope === 0.0 ? guessForT : binarySubdivide(t, intervalStart, intervalStart + kSampleStepSize, x1, x2), y1, y2);
  }
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, x1, x2);
  }
  return bezier;
}
function splitBezier(_ref, t0, t1) {
  let [x1, y1, x2, y2] = _ref;
  const p0 = [0, 0];
  const p1 = [x1, y1];
  const p2 = [x2, y2];
  const p3 = [1, 1];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const getPoint = t => {
    const a = lerp(p0, p1, t);
    const b = lerp(p1, p2, t);
    const c = lerp(p2, p3, t);
    const d = lerp(a, b, t);
    const e = lerp(b, c, t);
    return lerp(d, e, t);
  };
  const pA = getPoint(t0);
  const pD = getPoint(t1);
  const pB = getPoint((2 * t0 + t1) / 3);
  const pC = getPoint((t0 + 2 * t1) / 3);
  const dx = pD[0] - pA[0];
  const dy = pD[1] - pA[1];
  const normalize = _ref2 => {
    let [x, y] = _ref2;
    return [dx !== 0 ? (x - pA[0]) / dx : 0, dy !== 0 ? (y - pA[1]) / dy : 0];
  };
  const [nx1, ny1] = normalize(pB);
  const [nx2, ny2] = normalize(pC);
  return [nx1, ny1, nx2, ny2];
}
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/utils/extractUnit.ts
function extractUnit(value) {
  let fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
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
function getDefaultUnit(key) {
  if (key === 'x' || key === 'y') return 'px';
  if (key === 'rotate') return 'deg';
  if (key === 'rotateX') return 'deg';
  if (key === 'rotateY') return 'deg';
  return '';
}
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/animate.ts
// improved-anim-engine.ts






const defaultTransition = {
  ease: [0, 0, 1, 1],
  duration: 0.5,
  delay: 0
};
const colorProps = ["color", "backgroundColor", "borderColor", "outlineColor", "fill", "stroke"];
function parseColor(input) {
  const c = (0,tinycolor/* default */.A)(input || "rgba(0,0,0,0)");
  const {
    r,
    g,
    b,
    a
  } = c.toRgb();
  // Use integer RGB values as before and alpha as float
  return [Math.round(r), Math.round(g), Math.round(b), a];
}

// Small helper to stringify rgba quickly
function rgbaToString(rgba) {
  // Prefer integers for RGB for stable string equality checks
  return `rgba(${Math.round(rgba[0])}, ${Math.round(rgba[1])}, ${Math.round(rgba[2])}, ${Number(rgba[3].toFixed(3))})`;
}

// value cache for resolving %/auto to px
const valueCache = new WeakMap();
function generateValueCache(el, prop) {
  // Keep minimal DOM thrash: we set styles synchronously but avoid layout
  if (!valueCache.has(el)) valueCache.set(el, {});
  const cache = valueCache.get(el);
  if (!cache[prop]) {
    // Save originals
    const original = {
      propValue: el.style[prop],
      transform: el.style.transform,
      transition: el.style.transition
    };

    // Temporarily remove transforms/transitions to get reliable layout reads
    el.style.transition = "none";
    el.style.transform = "none";

    // Measure 100%
    el.style[prop] = "100%";
    const percent = prop === "width" || prop === "x" ? el.getBoundingClientRect().width : el.getBoundingClientRect().height;

    // Measure auto
    el.style[prop] = "auto";
    const auto = prop === "width" || prop === "x" ? el.getBoundingClientRect().width : el.getBoundingClientRect().height;

    // Restore
    el.style[prop] = original.propValue;
    el.style.transform = original.transform;
    el.style.transition = original.transition;
    cache[prop] = {
      percentage: percent,
      auto
    };
  }
}
const animateVariantCache = new Map();
const nonAnimatableCache = new Map();
const nonAnimatableProps = ["pointerEvents", "display", "overflow", "visibility"];

// --- Bezier / ease cache to avoid recomputing cubicBezier & split on first hover ---
const bezierCache = new Map();
const easeFnsCache = new Map();
function getEaseFns(easeArray, times) {
  const key = `${easeArray.join(",")}|${times.length}`;
  const cached = easeFnsCache.get(key);
  if (cached) return cached;
  const fns = [];
  for (let i = 0; i < times.length - 1; i++) {
    // We split then compute cubicBezier for this segment.
    const bezierSegments = splitBezier(easeArray, i / (times.length - 1), (i + 1) / (times.length - 1));

    // Compose a cache key for this base bezier
    const bezierKey = bezierSegments.join(",");
    let fn = bezierCache.get(bezierKey);
    if (!fn) {
      fn = cubicBezier(...bezierSegments);
      bezierCache.set(bezierKey, fn);
    }
    fns.push(fn);
  }
  easeFnsCache.set(key, fns);
  return fns;
}
function getOrCreateVariantAnimations(id, variantName) {
  const cacheKey = `${id}:${variantName}`;
  const cached = animateVariantCache.get(cacheKey);
  if (cached) return cached.animations;
  const store = engineStore_engineStore[id];
  if (!store) return [];
  const {
    element,
    currentValues,
    variants
  } = store;
  const target = variants[variantName];
  if (!target) return [];
  const keyList = Object.keys(target).filter(key => key !== "transition");
  const animations = [];
  const nonAnimatables = {};
  for (const key of keyList) {
    // --- handle non-animatable props ---
    if (nonAnimatableProps.includes(key)) {
      nonAnimatables[key] = target[key];
      continue;
    }
    const transition = target.transition?.[key] ?? {};
    const easeArray = transition.ease ?? defaultTransition.ease;
    const duration = (transition.duration ?? defaultTransition.duration) * 1000;
    const delay = (transition.delay ?? defaultTransition.delay) * 1000;
    const times = transition.times ?? [0, 1];
    const styleValue = target[key];
    const currentValue = currentValues[key];
    const isColor = colorProps.includes(key);
    const easeFns = getEaseFns(easeArray, times);
    if (isColor) {
      // generate frames as array of rgba arrays
      let frames;
      if (Array.isArray(styleValue) && styleValue.length >= 2) {
        frames = styleValue.map(v => parseColor(String(v ?? currentValue ?? "rgba(0,0,0,0)")));
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
        isColor: true
      });
    } else {
      let unit = extractUnit(styleValue, extractUnit(currentValue, getDefaultUnit(key)));
      const isAuto = unit === "auto";
      if (isAuto) unit = "px";
      if (currentValue === "auto" || hasSpecialUnits(styleValue, ["%", "auto"])) {
        generateValueCache(element, key);
      }
      const resolveValue = val => convertToTargetUnit(element, val, key, unit, valueCache.get(element));
      function safeResolve(value) {
        let fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        const resolved = resolveValue(value);
        if (resolved === undefined || Number.isNaN(resolved) || !Number.isFinite(resolved)) {
          return fallback;
        }
        return resolved;
      }
      let frames;
      if (Array.isArray(styleValue) && styleValue.length >= 2) {
        frames = styleValue.map(v => safeResolve(v, safeResolve(currentValue, 0)));
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
        isAuto
      });
    }
  }
  animateVariantCache.set(cacheKey, {
    animations
  });
  nonAnimatableCache.set(cacheKey, nonAnimatables);
  return animations;
}

// Backwards-compatible helper (keeps your old _getOrCreateVariantAnimations but routes to optimized one)
function _getOrCreateVariantAnimations(id, variantName) {
  return getOrCreateVariantAnimations(id, variantName);
}
function animateToVariant(id, variantName) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const store = engineStore_engineStore[id];
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
      const fromNumber = convertToTargetUnit(store.element, currentValue, anim.key, unit, valueCache.get(store.element));
      if (!anim.frames || anim.frames.length < 2) {
        anim.frames = [fromNumber, fromNumber];
      } else {
        anim.frames[0] = fromNumber;
      }
    }
  }
  let startTime = null;
  function step(timestamp) {
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
        easeFns
      } = anim;
      const localTimes = times && times.length >= 2 ? times : [0, 1];
      const globalT = Math.min(Math.max((elapsed - delay) / Math.max(1, duration), 0), 1);
      // Use cubicBezier from precomputed cache for base easing (easeArray used only for global easing)
      const easedGlobalT = cubicBezier(...easeArray)(globalT);
      let value;

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
            const from = frames[i] || frames[0];
            const to = frames[i + 1] || frames[frames.length - 1];
            const rgba = [from[0] + (to[0] - from[0]) * easedT, from[1] + (to[1] - from[1]) * easedT, from[2] + (to[2] - from[2]) * easedT, from[3] + (to[3] - from[3]) * easedT];
            value = rgbaToString(rgba);
            found = true;
            break;
          }
        }
        if (!found) {
          // fallback to end frame
          const last = frames[frames.length - 1];
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
            const from = frames[i] ?? frames[0] ?? 0;
            const to = frames[i + 1] ?? frames[frames.length - 1] ?? from;
            value = `${from + (to - from) * easedT}${unit || ""}`;
            found = true;
            break;
          }
        }
        if (!found) {
          const last = frames[frames.length - 1];
          value = `${last}${unit || ""}`;
        }
      }
      if (value !== undefined && store.currentValues[key] !== value) {
        store.currentValues[key] = value;
        applyStyle(id, store.element, key, value);
      }
    }
    const allDone = animations.every(_ref => {
      let {
        duration,
        delay
      } = _ref;
      return elapsed >= delay + duration;
    });
    if (!allDone) {
      store.animationFrameId = requestAnimationFrame(step);
    } else {
      store.animationFrameId = undefined;
      options.onComplete?.();
    }
  }
  store.animationFrameId = requestAnimationFrame(step);
}
const variantCache = new Map();
function precomputeVariant(id, variantName) {
  const store = engineStore_engineStore[id];
  if (!store) return null;
  const {
    element,
    currentValues,
    variants
  } = store;
  const target = variants[variantName];
  if (!target) return null;
  const keys = Object.keys(target).filter(k => k !== "transition");
  const result = {
    keys,
    frames: {},
    units: {},
    easeFns: {},
    times: {},
    isColor: {}
  };
  for (const key of keys) {
    const transition = target.transition?.[key] ?? {};
    const easeArray = transition.ease ?? defaultTransition.ease;
    const times = transition.times ?? [0, 1];
    const easeFns = getEaseFns(easeArray, times);
    const styleValue = target[key];
    const currentValue = currentValues[key];
    const isColor = colorProps.includes(key);
    result.isColor[key] = isColor;
    result.times[key] = times;
    result.easeFns[key] = easeFns;
    if (isColor) {
      const frames = Array.isArray(styleValue) ? styleValue.map(v => parseColor(v ?? currentValue)) : [parseColor(String(currentValue ?? "rgba(0,0,0,0)")), parseColor(String(styleValue ?? currentValue ?? "rgba(0,0,0,0)"))];
      result.frames[key] = frames;
    } else {
      let unit = extractUnit(styleValue, extractUnit(currentValue, getDefaultUnit(key)));
      if (unit === "auto") unit = "px";
      result.units[key] = unit;
      if (hasSpecialUnits(styleValue, ["%", "auto"])) {
        generateValueCache(element, key);
      }
      const resolveValue = val => convertToTargetUnit(element, val, key, unit, valueCache.get(element));
      const frames = Array.isArray(styleValue) ? styleValue.map(v => resolveValue(v ?? currentValue)) : [resolveValue(currentValue), resolveValue(styleValue)];
      result.frames[key] = frames;
    }
  }
  const cacheKey = `${id}:${variantName}`;
  variantCache.set(cacheKey, result);
  return result;
}
function applyVariantAtProgress(id, variantName, progress) {
  const store = engineStore_engineStore[id];
  if (!store) return;
  const cacheKey = `${id}:${variantName}`;
  let cache = variantCache.get(cacheKey);
  if (!cache) {
    const computed = precomputeVariant(id, variantName);
    if (!computed) return;
    cache = computed;
  }
  const {
    element,
    currentValues
  } = store;
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
        let value;
        if (isColor) {
          const from = frames[i] ?? frames[0];
          const to = frames[i + 1] ?? frames[frames.length - 1];
          const rgba = [from[0] + (to[0] - from[0]) * easedT, from[1] + (to[1] - from[1]) * easedT, from[2] + (to[2] - from[2]) * easedT, from[3] + (to[3] - from[3]) * easedT];
          value = rgbaToString(rgba);
        } else {
          const from = frames[i] ?? 0;
          const to = frames[i + 1] ?? from;
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
function precomputeAllVariants() {
  for (const id of Object.keys(engineStore)) {
    const store = engineStore[id];
    if (!store) continue;
    const variants = store.variants || {};
    for (const vName of Object.keys(variants)) {
      precomputeVariant(id, vName);
    }
  }
}
;// CONCATENATED MODULE: ./src/RenderEngine/animationEngine/utils/applyStaggeredAnimation.ts

let activeStaggers = [];
const itemStates = new Map();

/**
 * Call this in your Lenis RAF loop: rafTick(performance.now())
 */
const rafTick = now => {
  if (activeStaggers.length === 0) return;
  let writeIndex = 0;
  for (let sIndex = 0; sIndex < activeStaggers.length; sIndex++) {
    const stagger = activeStaggers[sIndex];
    const elapsed = now - stagger.startTime;

    // Trigger items in order without allocations
    while (stagger.triggeredCount < stagger.items.length && elapsed >= stagger.items[stagger.triggeredCount].scheduledTime) {
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
        onComplete: stagger.triggeredCount === stagger.items.length - 1 ? stagger.onComplete : undefined
      });
      itemStates.set(item.id, {
        ...(state || {}),
        currentVariant: stagger.variantName,
        lastTriggered: now
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
function applyStaggeredAnimation(_ref) {
  let {
    charIds,
    variantName,
    delay = 0.03,
    direction = "ltr",
    onComplete,
    progress
  } = _ref;
  if (!charIds.ids.length) return;
  const now = performance.now();

  // --- 1) Cancel / remove overlapping items from existing staggers (partial cancel supported)
  const cancelIds = new Set(charIds.ids);
  for (let i = activeStaggers.length - 1; i >= 0; i--) {
    const s = activeStaggers[i];

    // if no items overlap, skip
    const hasOverlap = s.items.some(it => cancelIds.has(it.id));
    if (!hasOverlap) continue;

    // filter out overlapping items
    const remaining = s.items.filter(it => !cancelIds.has(it.id));
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
  orderedIds = orderChars(direction, charItems);

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
  const items = orderedIds.map((id, i) => {
    const scheduledTime = i * delay * 1000;
    if (progress) {
      // safe staggerFactor (avoid division by zero)
      const staggerFactor = count > 1 ? 1 / (count - 1) : 1;
      const start = i * staggerFactor;
      const end = Math.min(1, start + (1 - staggerFactor));
      return {
        id,
        scheduledTime,
        start,
        end
      };
    }
    return {
      id,
      scheduledTime
    };
  });

  // If it's progress-driven, apply immediately (do not push to RAF list)
  if (progress) {
    const tiny = 1e-3; // threshold to avoid no-op updates
    items.forEach(item => {
      // normalize using precomputed start/end (safe fallback)
      const s = item.start ?? 0;
      const e = item.end ?? 1;
      const denom = e - s;

      // If denom is zero (single-element edge case), interpret local progress as either 0 or 1
      let localProgress = denom === 0 ? progress.strength >= s ? 1 : 0 : (progress.strength - s) / denom;

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
  const stagger = {
    items,
    variantName,
    startTime: now,
    onComplete,
    triggeredCount: 0
  };
  activeStaggers.push(stagger);
}
function median(values) {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/**
 * Group characters into vertical columns by their center X.
 * Uses a tolerance derived from median char width to cluster.
 */
function groupIntoColumns(chars, tolOverride) {
  if (!chars.length) return [];

  // derive tolerance from median char width (robust to different font sizes)
  const widths = chars.map(c => c.width).filter(Boolean);
  const medianWidth = median(widths) || 10;
  const tol = typeof tolOverride === 'number' ? tolOverride : Math.max(8, medianWidth * 0.6);

  // sort by center X
  const sorted = [...chars].sort((a, b) => a.cx - b.cx);
  const columns = [];
  for (const c of sorted) {
    if (!columns.length) {
      columns.push({
        cx: c.cx,
        items: [c]
      });
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
      columns.push({
        cx: c.cx,
        items: [c]
      });
    }
  }
  return columns;
}

/**
 * orderChars: returns ordered list of ids for many direction modes.
 * This version implements full-column 'l-r' and 'r-l' scanning.
 */
function orderChars(direction, charIds) {
  const chars = charIds;
  if (!chars.length) return charIds; // fallback to original

  // --- full-column left->right / right->left ---
  if (direction === 'l-r' || direction === 'r-l') {
    const cols = groupIntoColumns(chars); // columns in ascending X order by default
    // sort columns across x
    cols.sort((a, b) => a.cx - b.cx);
    if (direction === 'r-l') cols.reverse();

    // flatten: within each column top->bottom
    const ordered = [];
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
      return [...chars].map(c => ({
        ...c,
        dist: Math.hypot(c.cx - centerX, c.cy - centerY)
      })).sort((a, b) => a.dist - b.dist).map(c => c.id);
    case 'e-c':
      return [...chars].map(c => ({
        ...c,
        dist: Math.hypot(c.cx - centerX, c.cy - centerY)
      })).sort((a, b) => b.dist - a.dist).map(c => c.id);
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
      return [...chars].sort((a, b) => a.cx + a.cy - (b.cx + b.cy)).map(c => c.id);
    case 'di-rt-lb':
      return [...chars].sort((a, b) => b.cx + a.cy - (a.cx + b.cy)).map(c => c.id);
    case 'di-rb-tl':
      return [...chars].sort((a, b) => b.cx + b.cy - (a.cx + a.cy)).map(c => c.id);
    case 'di-lb-tr':
      return [...chars].sort((a, b) => a.cx + b.cy - (b.cx + a.cy)).map(c => c.id);

    // radial options (use angles)
    case 'ra-tb':
    case 'ra-bt':
    case 'ra-lr':
    case 'ra-rl':
      {
        const withAngle = chars.map(c => ({
          ...c,
          angle: Math.atan2(c.cy - centerY, c.cx - centerX)
        }));
        if (direction === 'ra-tb') {
          return withAngle.sort((a, b) => a.angle - b.angle).map(c => c.id);
        } else if (direction === 'ra-bt') {
          return withAngle.sort((a, b) => b.angle - a.angle).map(c => c.id);
        } else if (direction === 'ra-lr') {
          return withAngle.sort((a, b) => Math.abs(a.angle) - Math.abs(b.angle)).map(c => c.id);
        } else {
          // ra-rl
          return withAngle.sort((a, b) => Math.abs(b.angle) - Math.abs(a.angle)).map(c => c.id);
        }
      }

    // pointer / reverse-pointer (2D distance to pointer)
    case 'pointer':
    case 'reverse-pointer':
      {
        const parentId = charIds[0]?.id?.split('-char-')?.[0];
        const parentEl = parentId ? document.querySelector(`[data-uid="${parentId}"]`) : null;
        const pointerX = window.event?.clientX ?? (parentEl ? parentEl.getBoundingClientRect().left + parentEl.getBoundingClientRect().width / 2 : centerX);
        const pointerY = window.event?.clientY ?? (parentEl ? parentEl.getBoundingClientRect().top + parentEl.getBoundingClientRect().height / 2 : centerY);
        const withDist = chars.map(c => ({
          ...c,
          dist: Math.hypot(c.cx - pointerX, c.cy - pointerY)
        }));
        const sorted = withDist.sort((a, b) => a.dist - b.dist).map(c => c.id);
        return direction === 'pointer' ? sorted : sorted.reverse();
      }
    default:
      return charIds;
    // fallback unchanged
  }
}
;// CONCATENATED MODULE: ./src/RenderEngine/SurfaceContext.tsx



const SurfaceContext = /*#__PURE__*/(0,external_React_.createContext)(undefined);
const SurfaceProvider = _ref => {
  let {
    children,
    renderType,
    renderData,
    templateBlocks
  } = _ref;
  let initColorMode = renderData?.colorMode || 'l';
  let initSiteData = {};
  let initPostData = {};
  if (false) {}
  let initFrameId = renderData?.pageStructure?.frameId || null;
  let initPageBlocks = new Map();
  if (templateBlocks) {
    // set template blocks to tree...
    Object.entries(templateBlocks).forEach(_ref2 => {
      let [key, value] = _ref2;
      initPageBlocks.set(key, value);
    });
  }
  if (renderData?.pageStructure?.blocks) {
    Object.entries(renderData.pageStructure.blocks || {}).forEach(_ref3 => {
      let [key, value] = _ref3;
      initPageBlocks.set(key, value);
    });
  }
  const pageBlocks = (0,external_React_.useRef)(initPageBlocks);
  const [page, setPage] = (0,external_React_.useState)({
    root: Date.now()
  });
  const [frameId, setFrameId] = (0,external_React_.useState)(initFrameId);
  const [postData, setPostData] = (0,external_React_.useState)(initPostData);
  const [mounted, setMounted] = (0,external_React_.useState)(false);
  const [device, setDevice] = (0,external_React_.useState)('default');
  const [colorMode, setColorMode] = (0,external_React_.useState)(initColorMode);
  const [siteData, setSiteData] = (0,external_React_.useState)(initSiteData);
  const [showEffect, setShowEffect] = (0,external_React_.useState)(true);
  const [styleHTML, setStyleHTML] = (0,external_React_.useState)(null);
  const newVariantTriggerMap = (0,external_React_.useRef)({
    trigger: {},
    byId: {}
  });
  const dynamicData = (0,external_React_.useRef)({});
  const [isPreview, setIsPreview] = (0,external_React_.useState)(false); // to detect EPR

  const [readytoReveal, setReadytoReveal] = (0,external_React_.useState)(false);
  const variantChangeMap = (0,external_React_.useRef)({
    controls: {},
    triggers: {},
    variantById: {},
    variantsById: {},
    idByInterId: {},
    activeVariantById: {},
    stagger: {}
  });

  // Cache purely for animation existence
  const variantCache = {};
  const handleVariantChange = function (variant, id) {
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'start';
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let _visited = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new Set();
    const {
      controls,
      triggers,
      variantById,
      variantsById,
      activeVariantById,
      stagger
    } = variantChangeMap.current;
    if (!controls || !triggers || _visited.has(id)) return;
    _visited.add(id);
    const active = activeVariantById[id];
    if (!active) return;
    const currentVariant = active.current;
    const cacheKey = `${id}_${currentVariant}_${variant}`;
    let cached = variantCache[cacheKey];
    if (!cached) {
      const animationVariantId = `${currentVariant}_${variant}`;
      const haveAnimation = variantsById?.[id]?.includes(animationVariantId);
      const newVariant = haveAnimation ? animationVariantId : variant;
      cached = {
        haveAnimation,
        newVariant
      };
      variantCache[cacheKey] = cached; // save in cache
    }
    const {
      haveAnimation,
      newVariant
    } = cached;

    // Update current variant
    active.current = variant;

    // Apply staggered or normal animation
    if (stagger[id]) {
      applyStaggeredAnimation({
        ...stagger[id],
        variantName: newVariant,
        progress: type === 'strength' ? {
          strength: options?.strength || 0,
          variant
        } : undefined
      });
    } else {
      if (type === 'strength') {
        applyVariantAtProgress(id, variant, options?.strength ?? 1);
      } else {
        if (type === 'set') {
          controls[id]?.[type]?.(newVariant, options);
        }
      }
    }
    if (haveAnimation) {
      active.savedAnimationState = newVariant;
    }

    // Animate all related controls
    const related = triggers[variantById[id] || ''];
    related?.forEach(_id => {
      handleVariantChange(variant, _id, type, options, _visited);
    });
  };
  const newHandleVariantChange = function (blockId, variantId) {
    let visited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();
    if (visited.has(blockId)) return;
    visited.add(blockId);
    const block = pageBlocks.current.get(blockId);
    if (!block) return;
    const interactiveId = block.data?.options?.inid?.value;
    const control = newVariantTriggerMap.current.byId[blockId];
    if (!control) return;
    control(variantId);
    const triggers = newVariantTriggerMap.current.trigger[interactiveId];
    triggers?.forEach(triggerBlockId => {
      newHandleVariantChange(triggerBlockId, variantId, visited);
    });
  };
  return /*#__PURE__*/external_React_default().createElement(SurfaceContext.Provider, {
    value: {
      postData,
      setPostData,
      device,
      setDevice,
      colorMode,
      setColorMode,
      siteData,
      setSiteData,
      renderType,
      showEffect,
      setShowEffect,
      handleVariantChange,
      variantChangeMap,
      mounted,
      setMounted,
      dynamicData,
      isPreview,
      setIsPreview,
      readytoReveal,
      setReadytoReveal,
      page,
      setPage,
      pageBlocks,
      frameId,
      setFrameId,
      styleHTML,
      setStyleHTML,
      newVariantTriggerMap,
      newHandleVariantChange
    }
  }, children);
};
const useSurfaceContext = () => {
  const context = (0,external_React_.useContext)(SurfaceContext);
  if (!context) {
    throw new Error('useSurfaceContext must be used within a SurfaceProvider');
  }
  return context;
};
;// CONCATENATED MODULE: ./src/RenderEngine/BlockFlowContext.ts

const BlockFlowContext_BlockFlowContext = /*#__PURE__*/(0,external_React_.createContext)({});
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useResolvedTheme.ts


function useResolvedTheme_useResolvedTheme(_ref) {
  let {
    id,
    colorMode
  } = _ref;
  const parentData = (0,external_React_.useContext)(BlockFlowContext_BlockFlowContext);
  const globalTheme = colorMode;
  const parentTheme = parentData?.parentTheme;

  // later: local override
  const resolvedTheme = id === 'NxSG' ? 'l' : parentTheme || globalTheme;
  return {
    resolvedTheme,
    parentTheme
  };
}
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useVariantState.ts

function useVariantState_useVariantState() {
  const [variant, setVariant] = (0,external_React_.useState)('base');
  const variantRef = (0,external_React_.useRef)(variant);
  (0,external_React_.useEffect)(() => {
    variantRef.current = variant;
  }, [variant]);
  return {
    variant,
    setVariant,
    variantRef
  };
}
;// CONCATENATED MODULE: ./src/Render/core/animationEngine.ts
// --- 2. ENGINE LOGIC (Resolver & Conductor) ---

const Resolver = {
  getSensors: (el, targetContainerEl, themeOverride) => {
    if (!el) return {
      isDark: false,
      bp: 9999,
      containerWidth: 9999
    };
    const style = getComputedStyle(el);
    const containerWidth = targetContainerEl ? targetContainerEl.offsetWidth : document.body.offsetWidth;
    return {
      isDark: themeOverride ? themeOverride === 'd' : style.getPropertyValue('--is-dark').trim() === "1",
      bp: containerWidth,
      containerWidth: containerWidth
    };
  },
  resolve: (propData, sensors) => {
    if (!propData) return undefined;
    let res = propData.value;
    // Theme Resolution
    if (res && typeof res === 'object' && ('l' in res || 'd' in res)) {
      res = sensors.isDark ? res.d || res.l : res.l || res.d;
    }
    // Breakpoint Resolution (Point and Down)
    if (propData.m) {
      const sortedPts = Object.keys(propData.m).map(Number).sort((a, b) => a - b);
      for (const pt of sortedPts) {
        if (sensors.bp <= pt) {
          const over = propData.m[pt];
          res = typeof over === 'object' && over !== null && 'v' in over ? over.v : over;
          break;
        }
      }
    }
    return res;
  }
};
const elementAnimations = new WeakMap();
const Conductor = {
  animate: (el, timeline, sensors) => {
    if (!el || !timeline) return;

    // 1. ATOMIC RESET (The Kill Switch)
    // Get existing metadata or initialize
    const meta = elementAnimations.get(el) || {
      version: 0,
      timeouts: []
    };

    // Increment version immediately to invalidate any pending setTimeouts from previous calls
    const vTag = meta.version + 1;

    // Clear the physical browser timeouts to stop them from even firing
    meta.timeouts.forEach(t => clearTimeout(t));

    // Create the new active state for this specific animation reign
    const active = {
      version: vTag,
      timeouts: []
    };

    // Save back to WeakMap immediately so the next call (even if it's in 1ms) sees the new version
    elementAnimations.set(el, active);
    const propMap = {
      bg: 'bgc',
      blur: 'f-blur',
      x: 'tx',
      y: 'ty',
      z: 'tz',
      skx: 'skx',
      sky: 'sky',
      gray: 'f-gray',
      sat: 'f-sat',
      bright: 'f-bright',
      contrast: 'f-contrast'
    };
    const discreteProps = ['dp', 'fd', 'jc', 'ai', 'gtc', 'gtr'];
    const animatableTimeline = {};
    const discreteTimelineMap = new Map();

    // 2. TIMELINE COMPILATION
    Object.entries(timeline).forEach(_ref => {
      let [prop, steps] = _ref;
      const key = propMap[prop] || prop;
      const isDiscrete = discreteProps.includes(prop);
      let delayAcc = 0;
      steps.forEach(step => {
        let v = step.v;
        let du = step.du,
          e = step.e,
          de = step.de || 0;

        // Resolve Theme
        if (v && typeof v === 'object' && ('l' in v || 'd' in v)) {
          v = sensors.isDark ? v.d || v.l : v.l || v.d;
        }

        // Resolve Responsive
        if (step.m) {
          const sortedPts = Object.keys(step.m).map(Number).sort((a, b) => a - b);
          for (const pt of sortedPts) {
            if (sensors.bp <= pt) {
              const over = step.m[pt];
              if (typeof over === 'object' && over !== null) {
                if ('v' in over) v = over.v;
                if ('du' in over) du = over.du;
                if ('e' in over) e = over.e;
                if ('de' in over) de = over.de;
              } else {
                v = over;
              }
              break;
            }
          }
        }
        const startAt = delayAcc + de;
        if (isDiscrete) {
          if (!discreteTimelineMap.has(startAt)) {
            discreteTimelineMap.set(startAt, {
              props: {},
              du: du || 600,
              e: e || 'ease'
            });
          }
          const batch = discreteTimelineMap.get(startAt);
          batch.props[key] = v;
        } else {
          animatableTimeline[key] = animatableTimeline[key] || [];
          animatableTimeline[key].push({
            v,
            du,
            e,
            startAt
          });
        }
        delayAcc += (du || 600) + de;
      });
    });

    // 3. EXECUTION WITH VERSION GUARDS

    // Process Animatable Properties
    Object.entries(animatableTimeline).forEach(_ref2 => {
      let [key, frames] = _ref2;
      frames.forEach(frame => {
        const id = setTimeout(() => {
          // Double Guard: Verify if this is still the active animation run
          const latest = elementAnimations.get(el);
          if (!latest || latest.version !== vTag) return;
          el.style.setProperty(`--${key}`, String(frame.v));
          if (frame.du) el.style.setProperty(`--${key}-du`, `${frame.du}ms`);
          if (frame.e) el.style.setProperty(`--${key}-e`, frame.e);
        }, frame.startAt);
        active.timeouts.push(id);
      });
    });

    // Process Discrete Properties (Batched FLIP)
    discreteTimelineMap.forEach((batch, startAt) => {
      const id = setTimeout(() => {
        // Double Guard
        const latest = elementAnimations.get(el);
        if (!latest || latest.version !== vTag) return;

        // --- FLIP PHASE: FIRST ---
        const children = Array.from(el.children).filter(c => c instanceof HTMLElement);
        const firstRects = children.map(c => c.getBoundingClientRect());

        // Apply layout changes
        Object.entries(batch.props).forEach(_ref3 => {
          let [k, val] = _ref3;
          el.style.setProperty(`--${k}`, String(val));
        });

        // --- FLIP PHASE: INVERT ---
        requestAnimationFrame(() => {
          // Inner Version Guard for async RAF
          const rafLatest = elementAnimations.get(el);
          if (!rafLatest || rafLatest.version !== vTag) return;
          const lastRects = children.map(c => c.getBoundingClientRect());
          children.forEach((child, i) => {
            const dx = firstRects[i].left - lastRects[i].left;
            const dy = firstRects[i].top - lastRects[i].top;
            if (dx !== 0 || dy !== 0) {
              child.style.setProperty('--fx-du', '0ms');
              child.style.setProperty('--fy-du', '0ms');
              child.style.setProperty('--fx', `${dx}px`);
              child.style.setProperty('--fy', `${dy}px`);
              child.offsetHeight; // Force layout sync
            }
          });

          // --- FLIP PHASE: PLAY ---
          requestAnimationFrame(() => {
            // Second Inner Guard
            const rafLatest2 = elementAnimations.get(el);
            if (!rafLatest2 || rafLatest2.version !== vTag) return;
            children.forEach(child => {
              child.style.setProperty('--fx-du', `${batch.du}ms`);
              child.style.setProperty('--fy-du', `${batch.du}ms`);
              child.style.setProperty('--fx-e', batch.e);
              child.style.setProperty('--fy-e', batch.e);
              child.style.setProperty('--fx', '0px');
              child.style.setProperty('--fy', '0px');
            });
          });
        });
      }, startAt);
      active.timeouts.push(id);
    });
  }
};

// const Conductor = {
//   animate: (el, timeline, sensors) => {
//     if (!el || !timeline) return;

//     const existing = elementAnimations.get(el) || {};
//     const active = {
//       timeouts: existing.timeouts || [],
//       version: (existing.version || 0) + 1,
//     };

//     active.timeouts.forEach(t => clearTimeout(t));
//     active.timeouts = [];
//     elementAnimations.set(el, active);

//     const propMap = { 
//         bg: 'bgc', blur: 'f-blur', x: 'tx', y: 'ty', z: 'tz', 
//         skx: 'skx', sky: 'sky', gray: 'f-gray', sat: 'f-sat', 
//         bright: 'f-bright', contrast: 'f-contrast' 
//     };

//     const discreteProps = ['dp', 'fd', 'jc', 'ai', 'gtc', 'gtr'];

//     // Split timeline into Animatable vs Discrete (Layout)
//     const animatableTimeline = {};
//     const discreteTimelineMap = new Map(); // timestamp -> { props: { key: val }, du, e }

//     Object.entries(timeline).forEach(([prop, steps]) => {
//       const key = propMap[prop] || prop;
//       const isDiscrete = discreteProps.includes(prop);
//       let delayAcc = 0;

//       steps.forEach(step => {
//         let v = step.v;
//         let du = step.du, e = step.e, de = step.de || 0;

//         // Resolve Theme
//         if (v && typeof v === 'object' && ('l' in v || 'd' in v)) {
//           v = sensors.isDark ? (v.d || v.l) : (v.l || v.d);
//         }

//         // Resolve Responsive
//         if (step.m) {
//           const sortedPts = Object.keys(step.m).map(Number).sort((a, b) => a - b);
//           for (const pt of sortedPts) {
//             if (sensors.bp <= pt) {
//               const over = step.m[pt];
//               if (typeof over === 'object' && over !== null) {
//                 if ('v' in over) v = over.v;
//                 if ('du' in over) du = over.du;
//                 if ('e' in over) e = over.e;
//                 if ('de' in over) de = over.de;
//               } else { v = over; }
//               break;
//             }
//           }
//         }

//         const startAt = delayAcc + de;

//         if (isDiscrete) {
//           // Add to Batched Discrete Map
//           if (!discreteTimelineMap.has(startAt)) {
//             discreteTimelineMap.set(startAt, { props: {}, du: du || 600, e: e || 'ease' });
//           }
//           const batch = discreteTimelineMap.get(startAt);
//           batch.props[key] = v;
//         } else {
//           // Add to Standard Animatable Timeline
//           animatableTimeline[key] = animatableTimeline[key] || [];
//           animatableTimeline[key].push({ v, du, e, startAt });
//         }

//         delayAcc += ((du || 600) + de);
//       });
//     });

//     const vTag = active.version;

//     // 1. Process Animatable Properties (Smooth Houdini Interpolation)
//     Object.entries(animatableTimeline).forEach(([key, frames]) => {
//       frames.forEach(frame => {
//         const id = setTimeout(() => {
//           const latest = elementAnimations.get(el);
//           if (!latest || latest.version !== vTag) return;
//           el.style.setProperty(`--${key}`, String(frame.v));
//           if (frame.du) el.style.setProperty(`--${key}-du`, `${frame.du}ms`);
//           if (frame.e) el.style.setProperty(`--${key}-e`, frame.e);
//         }, frame.startAt);
//         active.timeouts.push(id);
//       });
//     });

//     // 2. Process Discrete Properties (Batched FLIP Animation)
//     discreteTimelineMap.forEach((batch, startAt) => {
//       const id = setTimeout(() => {
//         const latest = elementAnimations.get(el);
//         if (!latest || latest.version !== vTag) return;

//         // --- FLIP PHASE: FIRST ---
//         const children = Array.from(el.children).filter(c => c instanceof HTMLElement);
//         const firstRects = children.map(c => c.getBoundingClientRect());

//         // Apply all layout changes in this batch
//         Object.entries(batch.props).forEach(([k, val]) => {
//           el.style.setProperty(`--${k}`, String(val));
//         });

//         // --- FLIP PHASE: INVERT ---
//         requestAnimationFrame(() => {
//           const lastRects = children.map(c => c.getBoundingClientRect());

//           children.forEach((child, i) => {
//             const dx = firstRects[i].left - lastRects[i].left;
//             const dy = firstRects[i].top - lastRects[i].top;

//             if (dx !== 0 || dy !== 0) {
//               child.style.setProperty('--fx-du', '0ms');
//               child.style.setProperty('--fy-du', '0ms');
//               child.style.setProperty('--fx', `${dx}px`);
//               child.style.setProperty('--fy', `${dy}px`);
//               child.offsetHeight; // Force sync
//             }
//           });

//           // --- FLIP PHASE: PLAY ---
//           requestAnimationFrame(() => {
//             children.forEach((child) => {
//               child.style.setProperty('--fx-du', `${batch.du}ms`);
//               child.style.setProperty('--fy-du', `${batch.du}ms`);
//               child.style.setProperty('--fx-e', batch.e);
//               child.style.setProperty('--fy-e', batch.e);
//               child.style.setProperty('--fx', '0px');
//               child.style.setProperty('--fy', '0px');
//             });
//           });
//         });
//       }, startAt);
//       active.timeouts.push(id);
//     });
//   },
// };

// const Conductor = {
//   animate: (el, timeline, sensors) => {
//     if (!el || !timeline) return;
//     const active = elementAnimations.get(el) || { timeouts: [], version: 0 };
//     active.timeouts.forEach(t => clearTimeout(t));
//     active.timeouts = [];
//     active.version++;
//     elementAnimations.set(el, active);

//     const propMap = { 
//         bg: 'bgc', blur: 'f-blur', x: 'tx', y: 'ty', z: 'tz', 
//         skx: 'skx', sky: 'sky', gray: 'f-gray', sat: 'f-sat', 
//         bright: 'f-bright', contrast: 'f-contrast' 
//     };

//     Object.entries(timeline).forEach(([prop, steps]) => {
//       const key = propMap[prop] || prop;
//       let delayAcc = 0;
//       steps.forEach(step => {
//         let v = step.v;
//         let du = step.du, e = step.e, de = step.de || 0;

//         if (v && typeof v === 'object' && ('l' in v || 'd' in v)) {
//           v = sensors.isDark ? (v.d || v.l) : (v.l || v.d);
//         }

//         if (step.m) {
//           const sortedPts = Object.keys(step.m).map(Number).sort((a, b) => a - b);
//           for (const pt of sortedPts) {
//             if (sensors.bp <= pt) {
//               const over = step.m[pt];
//               if (typeof over === 'object' && over !== null) {
//                 if ('v' in over) v = over.v;
//                 if ('du' in over) du = override.du;
//                 if ('e' in over) e = override.e;
//                 if ('de' in over) de = override.de;
//               } else { v = over; }
//               break;
//             }
//           }
//         }

//         const startAt = delayAcc + de;
//         const vTag = active.version;
//         const id = setTimeout(() => {
//           const latest = elementAnimations.get(el);
//           if (!latest || latest.version !== vTag) return;
//           el.style.setProperty(`--${key}`, String(v));
//           if (du) el.style.setProperty(`--${key}-du`, `${du}ms`);
//           if (e) el.style.setProperty(`--${key}-e`, e);
//         }, startAt);

//         active.timeouts.push(id);
//         delayAcc += ((du || 600) + de);
//       });
//     });
//   }
// };

/* harmony default export */ const animationEngine = (Conductor);
;// CONCATENATED MODULE: ./src/BlockEditor/util/styleCodec.ts
// ========================================================
// styleCodec.ts
// Design block codec with:
// - color mode (l~d, cm())
// - images (img())
// - responsive (@)
// - value source (~vs:)
// ========================================================

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function isColorModeValue(v) {
  return v && typeof v === "object" && "l" in v && "d" in v;
}
function isCssFunction(str) {
  return /^[a-zA-Z_][a-zA-Z0-9_-]*\([^()]*\)$/.test(str);
}
function isCmFunction(str) {
  return /^cm\(.+\)$/.test(str);
}
function isImgFunction(str) {
  return /^img\(.+\)$/.test(str);
}

/* ------------------------------------------------------------------ */
/* Safe split helpers */
/* ------------------------------------------------------------------ */

function splitTopLevel(input, delimiter) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === "(") depth++;else if (c === ")") depth--;else if (c === delimiter && depth === 0) {
      out.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }
  out.push(input.slice(start).trim());
  return out;
}

/* ------------------------------------------------------------------ */
/* img() parsing */
/* ------------------------------------------------------------------ */

function decodeImg(str) {
  const inner = str.slice(4, -1); // img(...)
  const parts = splitTopLevel(inner, ",");
  const obj = {};
  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    obj[key] = val;
  }
  return obj;
}
function encodeImg(obj) {
  const parts = Object.entries(obj).map(_ref => {
    let [k, v] = _ref;
    return `${k}:${v}`;
  });
  return `img(${parts.join(", ")})`;
}

/* ------------------------------------------------------------------ */
/* Value encode / decode */
/* ------------------------------------------------------------------ */

function encodeStyleValue(value) {
  if (isColorModeValue(value)) {
    const l = typeof value.l === "string" ? value.l : encodeImg(value.l);
    const d = typeof value.d === "string" ? value.d : encodeImg(value.d);
    const complex = l.includes("(") || d.includes("(") || l.includes(",") || d.includes(",");
    return complex ? `cm(${l}, ${d})` : `${l}~${d}`;
  }
  if (typeof value === "object") {
    return encodeImg(value);
  }
  return value ?? "";
}
function decodeStyleValue(raw) {
  raw = raw.trim();

  // img()
  if (isImgFunction(raw)) {
    return decodeImg(raw);
  }

  // cm(light, dark)
  if (isCmFunction(raw)) {
    const inner = raw.slice(3, -1);
    const [l, d] = splitTopLevel(inner, ",");
    return {
      l: decodeStyleValue(l),
      d: decodeStyleValue(d)
    };
  }

  // implicit color mode
  if (raw.includes("~")) {
    const [l, d] = raw.split("~");
    return {
      l,
      d
    };
  }

  // css function
  if (isCssFunction(raw)) {
    return raw;
  }
  return raw;
}

/* ------------------------------------------------------------------ */
/* Encode */
/* ------------------------------------------------------------------ */

function encodeBlock(block) {
  let pretty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const out = [];
  for (const prop in block) {
    const {
      vs,
      value,
      m
    } = block[prop];
    const vsPrefix = vs !== "m" ? `~${vs}:` : "";
    let line = `${prop}:${vsPrefix}${encodeStyleValue(value)}`;
    if (m) {
      for (const bp in m) {
        line += `@${bp}:${encodeStyleValue(m[bp])}`;
      }
    }
    out.push(pretty ? `  ${line};` : line);
  }
  return pretty ? out.join("\n") : out.join("; ");
}
function styleCodec_compactDesign(design) {
  let pretty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const blocks = [];
  for (const variant in design) {
    const body = encodeBlock(design[variant], pretty);
    blocks.push(pretty ? `${variant}{\n${body}\n}\n` : `${variant}{${body}}`);
  }
  return pretty ? blocks.join("\n") : blocks.join("");
}

/* ------------------------------------------------------------------ */
/* Decode */
/* ------------------------------------------------------------------ */

function decodeBlockBody(body) {
  const block = {};
  const props = splitTopLevel(body, ";").filter(Boolean);
  for (const item of props) {
    const idx = item.indexOf(":");
    if (idx === -1) continue;
    const prop = item.slice(0, idx).trim();
    let rest = item.slice(idx + 1).trim();
    let vs = "m";
    const responsive = {};
    if (rest.startsWith("~")) {
      const i = rest.indexOf(":");
      vs = rest.slice(1, i);
      rest = rest.slice(i + 1);
    }
    const segments = splitTopLevel(rest, "@");
    const main = segments.shift();
    const value = decodeStyleValue(main);
    for (const seg of segments) {
      const [bp, v] = splitTopLevel(seg, ":");
      responsive[bp] = decodeStyleValue(v);
    }
    block[prop] = {
      vs,
      value,
      ...(Object.keys(responsive).length ? {
        m: responsive
      } : {})
    };
  }
  return block;
}
function expandDesign(compact) {
  const result = {};
  const pattern = /([a-zA-Z0-9_-]+)\s*\{([^}]*)\}/g;
  let match;
  while (match = pattern.exec(compact)) {
    result[match[1]] = decodeBlockBody(match[2]);
  }
  return result;
}
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useBlockDesignRuntime.ts


function isObject(val) {
  return val !== null && typeof val === 'object';
}
function useBlockDesignRuntime_isColorModeValue(val) {
  return isObject(val) && ('l' in val || 'd' in val);
}
function isImageValue(val) {
  return isObject(val) && typeof val.id === 'string' && typeof val.url === 'string';
}
function resolveRuntimeValue(value, theme) {
  let resolved = value;

  // 1️⃣ resolve color mode
  if (useBlockDesignRuntime_isColorModeValue(resolved)) {
    resolved = theme === 'd' ? resolved.d ?? resolved.l : resolved.l ?? resolved.d;
  }

  // 2️⃣ resolve image
  if (isImageValue(resolved)) {
    return `url(${resolved.url})`;
  }

  // 3️⃣ primitive
  if (typeof resolved === 'string' || typeof resolved === 'number') {
    return resolved;
  }
  return undefined;
}
function useBlockDesignRuntime(block, resolvedTheme, blockId) {
  const design = (0,external_React_.useMemo)(() => {
    const data = expandDesign(block?.d || '');
    return data?.base || {};
  }, [block?.d]);
  const dynamicCSS = (0,external_React_.useMemo)(() => {
    let css = `.${blockId} { --container-bp: 9999; `;
    Object.entries(design).forEach(_ref => {
      let [key, prop] = _ref;
      const val = resolveRuntimeValue(prop.value, resolvedTheme);
      if (val !== undefined) {
        css += `--${key}: ${val}; `;
      }
    });
    css += `} `;
    return css;
  }, [design, resolvedTheme, blockId]);
  return {
    design,
    dynamicCSS
  };
}
;// CONCATENATED MODULE: ./src/Render/core/syncAnimationsWithVariantStyles.ts

// const syncAnimationsWithVariantStyles = (
//   animations: Animations,
//   styles: VariantStyles
// ) => {
//   const result: Animations = structuredClone(animations);

//   Object.entries(result).forEach(([transitionKey, props]) => {
//     const [, toVariant] = transitionKey.split('-');
//     const variantStyles = styles[toVariant];
//     if (!variantStyles) return;

//     Object.entries(props).forEach(([prop, frames]) => {
//       if (!Array.isArray(frames) || frames.length === 0) return;

//       const styleDef = variantStyles[prop];
//       if (!styleDef || styleDef.value == null) return;

//       // 🔥 Replace LAST animation value with variant style value
//       frames[frames.length - 1].v = styleDef.value;
//     });
//   });

//   return result;
// };

/**
 * 🔥 UPDATED SYNC LOGIC
 * Now iterates over Styles first to catch missing properties in the timeline.
 */
const syncAnimationsWithVariantStyles = (animations, styles, resolvedTheme) => {
  const result = structuredClone(animations);
  Object.entries(result).forEach(_ref => {
    let [transitionKey, props] = _ref;
    const [, toVariant] = transitionKey.split('-');
    const variantStyles = styles[toVariant];
    if (!variantStyles) return;

    // We iterate over the Styles defined for the variant to catch everything
    Object.entries(variantStyles).forEach(_ref2 => {
      let [prop, styleDef] = _ref2;
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
        props[prop] = [{
          v: value,
          du: 1000,
          de: 0
        }];
      }
    });
  });
  return result;
};
/* harmony default export */ const core_syncAnimationsWithVariantStyles = (syncAnimationsWithVariantStyles);
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useVariantAnimations.ts



function generateInitAnimate(variants) {
  const result = {};
  variants.forEach(_ref => {
    let {
      id,
      ...events
    } = _ref;
    Object.values(events).forEach(val => {
      if (val) {
        const key = `${id}-${val}`;
        result[key] = {};
      }
    });
  });
  return result;
}
function useVariantAnimations(_ref2) {
  let {
    id,
    block,
    nodeRef,
    sensors,
    variant,
    setVariant,
    variantRef,
    triggerMap,
    resolvedTheme
  } = _ref2;
  const initAnimate = generateInitAnimate(block?.v || []);
  const trigger = target => {
    const current = variantRef.current;
    if (current === target) return;

    // ✅ RESTORED
    const animation = core_syncAnimationsWithVariantStyles(block?.a || {}, block.data?.design || {}, resolvedTheme);
    const timeline = animation?.[`${current}-${target}`];
    if (timeline && nodeRef.current) {
      animationEngine.animate(nodeRef.current, timeline, sensors);
    }
    setVariant(target);
  };
  (0,external_React_.useEffect)(() => {
    if (!triggerMap) return;
    triggerMap.current.byId[id] = trigger;
    const vtid = block.data?.options?.vtid?.value;
    if (!vtid) return;
    triggerMap.current.trigger[vtid] ??= [];
    if (!triggerMap.current.trigger[vtid].includes(id)) {
      triggerMap.current.trigger[vtid].push(id);
    }
  }, [resolvedTheme]);
  return {
    trigger
  };
}
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useComponentVariables.ts

function useComponentVariables_useComponentVariables(block) {
  return (0,external_React_.useMemo)(() => {
    if (block.m !== 'c') return null;
    return Object.fromEntries(Object.entries(block.data?.options?.vars?.value || {}).map(_ref => {
      let [id, v] = _ref;
      return [id, v.default];
    }));
  }, [block]);
}
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useBlockSensors.ts


function useBlockSensors(nodeRef, resolvedTheme) {
  const [isInFold, setIsInFold] = (0,external_React_.useState)(false);
  const [sensors, setSensors] = (0,external_React_.useState)({
    isDark: resolvedTheme === 'd',
    bp: 9999
  });
  (0,external_React_.useEffect)(() => {
    if (!nodeRef.current) return;
    const foldObs = new IntersectionObserver(_ref => {
      let [e] = _ref;
      return setIsInFold(e.isIntersecting);
    }, {
      threshold: 0.1
    });
    const resObs = new ResizeObserver(() => {
      setSensors(Resolver.getSensors(nodeRef.current, document.body, resolvedTheme));
    });
    foldObs.observe(nodeRef.current);
    resObs.observe(document.body);
    return () => {
      foldObs.disconnect();
      resObs.disconnect();
    };
  }, [resolvedTheme]);
  return {
    isInFold,
    sensors
  };
}
;// CONCATENATED MODULE: ./src/BlockEditor/util/KVParser.ts
const KVParser_KVParser = {
  /**
   * Converts a semicolon-separated string into an object.
   * @param {string} str - Format: "key=value;key2=value2"
   * @returns {Object}
   */
  parse(str) {
    const obj = {};
    const pairs = str.split(';');
    for (let i = 0; i < pairs.length; i++) {
      const [key, val] = pairs[i].split('=');
      if (key) obj[key] = val;
    }
    return obj;
  },
  /**
   * Converts an object into a semicolon-separated string.
   * @param {Object} obj
   * @returns {string}
   */
  stringify(obj) {
    return Object.entries(obj).map(_ref => {
      let [key, val] = _ref;
      return `${key}=${val}`;
    }).join(';');
  }
};
/* harmony default export */ const util_KVParser = (KVParser_KVParser);
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/styleBucket/styleStore.ts
const styleMap = new Map();
function notify() {
  document.dispatchEvent(new Event('addifect-style-update'));
}
function addStyleCSR(id, css) {
  styleMap.set(id, css);
  notify();
}
function removeStyleCSR(id) {
  styleMap.delete(id);
  notify();
}
function getAllStylesCSR() {
  return Array.from(styleMap.values()).join('\n');
}
function subscribe(callback) {
  document.addEventListener('addifect-style-update', callback);
  return () => document.removeEventListener('addifect-style-update', callback);
}
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/styleBucket/useBlockStyle.ts


function useBlockStyle(id, css, renderType) {
  // For SSR, do nothing here — block outputs inline <style> directly
  if (renderType === 'SSR') {
    return;
  }

  // For CSR, register and unregister styles globally
  (0,external_React_.useEffect)(() => {
    addStyleCSR(id, css);
    return () => {
      removeStyleCSR(id);
    };
  }, [id, css]);
}
;// CONCATENATED MODULE: ./src/Render/blocks/Base.tsx
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }





// -----------------------------------------------------------------------------
// Shared / cross-layer hooks
// -----------------------------------------------------------------------------





// -----------------------------------------------------------------------------
// Editor-only hooks
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Runtime-only hooks
// -----------------------------------------------------------------------------





/**
 * ============================================================================
 * Base (EDITOR VERSION)
 * - Used inside editor canvas
 * - Reacts to editingVariant / editingBlock
 * - No runtime animations or sensors
 * ============================================================================
 */
function Base(_ref) {
  let {
    id,
    block,
    part,
    children
  } = _ref;
  // DOM reference for this block
  const nodeRef = useRef(null);

  // Editor state (active block / active variant / color mode)
  const {
    colorMode,
    editingVariant,
    editingBlock
  } = useEditorContext();

  // Parent flow data (theme + component/instance variables)
  const parentData = useContext(BlockFlowContext);

  // Resolve final theme (global → parent → local override)
  const {
    resolvedTheme,
    parentTheme
  } = useResolvedTheme({
    id,
    colorMode
  });
  const designTypes = useMemo(() => {
    if (!block?.dt) return {};
    return KVParser.parse(block.dt);
  }, [block?.dt]);

  // Gradient mode placeholder (future extension)
  const gradMode = null;

  // Compute gradient CSS class (if enabled)
  const gradClass = gradMode === 'linear' ? 'god-grad-linear' : gradMode === 'radial' ? 'god-grad-radial' : '';

  // Variant state (base / hover / active / etc.)
  const {
    variant,
    setVariant,
    variantRef
  } = useVariantState();

  // Editor-side design resolution (variant-aware, no sensors)
  const {
    design,
    dynamicCSS
  } = useBlockDesignEditor(block, resolvedTheme, id, variant);

  // Component variables (only exist if block is a component root)
  const componentVariables = useComponentVariables(block);

  /**
   * Sync editor-selected variant → rendered variant
   * This keeps canvas preview aligned with variant panel
   */
  useEffect(() => {
    if (editingBlock === id && editingVariant !== variant) {
      setVariant(editingVariant);
    }
  }, [editingVariant, editingBlock]);

  /**
   * Extend BlockFlow context:
   * - Pass down resolved theme
   * - Inject component variables for instances
   */
  const updatedParentData = useMemo(() => ({
    ...parentData,
    parentTheme: resolvedTheme,
    ...(componentVariables ? {
      componentVariables
    } : {})
  }), [parentTheme, resolvedTheme, componentVariables]);

  // Data attributes for editor tooling
  const data = {};
  if (!part) {
    data['data-node'] = id;
  }
  let displayClass = '';
  if (designTypes?.dm === 'f') {
    displayClass = 'layout-flex';
  }
  if (designTypes?.dm === 'g') {
    displayClass = 'layout-grid';
  }
  const options = block?.data?.options ?? {};
  const DynamicTag = options.t?.value ?? 'div';
  const isAriaHidden = options.hfsr?.value === true;
  const ariaLabel = options.srl?.value;
  const isFocusableOption = options.focusable?.value === true;

  // List of native focusable tags
  const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

  // Build accessibility props
  const accessibilityProps = {};

  // aria-hidden and tabIndex when hidden
  if (isAriaHidden) {
    accessibilityProps['aria-hidden'] = true;
    accessibilityProps.tabIndex = -1;
  } else {
    // Only set aria-label if not hidden
    if (ariaLabel) {
      accessibilityProps['aria-label'] = ariaLabel;
    }

    // Set tabIndex only if tag is NOT natively focusable
    if (!nativeFocusableTags.includes(DynamicTag) && isFocusableOption) {
      accessibilityProps.tabIndex = isFocusableOption ? 0 : -1;
    }
    // If native focusable, do NOT set tabIndex at all (default browser behavior)
  }
  const linkProps = {};
  if (DynamicTag === 'a') {
    linkProps['href'] = options?.lURL?.value || '';
  }
  return /*#__PURE__*/React.createElement(BlockFlowContext.Provider, {
    value: updatedParentData
  }, /*#__PURE__*/React.createElement("style", null, dynamicCSS), /*#__PURE__*/React.createElement(DynamicTag, _extends({
    ref: nodeRef,
    "data-node-theme": resolvedTheme,
    className: `axd-base-node ${id} ${gradClass} axd-base-node-active ${displayClass}`
  }, data, accessibilityProps), children));
}

/**
 * ============================================================================
 * BasePreview (RUNTIME VERSION)
 * - Used on frontend / preview surface
 * - Supports sensors, fold detection, animations
 * ============================================================================
 */
function BasePreview(_ref2) {
  let {
    id,
    block,
    part,
    children
  } = _ref2;
  // DOM reference for runtime measurements & animations
  const nodeRef = (0,external_React_.useRef)(null);

  // Surface context (runtime-only)
  const {
    colorMode,
    newVariantTriggerMap,
    newHandleVariantChange,
    renderType
  } = useSurfaceContext();

  // Parent flow data
  const parentData = (0,external_React_.useContext)(BlockFlowContext_BlockFlowContext);

  // Resolve runtime theme
  const {
    resolvedTheme,
    parentTheme
  } = useResolvedTheme_useResolvedTheme({
    id,
    colorMode
  });

  // Variant state (runtime controlled)
  const {
    variant,
    setVariant,
    variantRef
  } = useVariantState_useVariantState();
  const designTypes = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return util_KVParser.parse(block.dt);
  }, [block?.dt]);
  const map = new Map(block?.v?.map(o => [o.id, o]));
  const currentMap = map.get(variant);

  // Gradient placeholder
  const gradMode = null;

  // Runtime design resolution (base variant only, sensor-aware)
  const {
    design,
    dynamicCSS
  } = useBlockDesignRuntime(block, resolvedTheme, id);
  useBlockStyle(id, dynamicCSS, renderType);

  // Sensors: viewport, container, fold visibility
  const {
    isInFold,
    sensors
  } = useBlockSensors(nodeRef, resolvedTheme);

  /**
   * Register this block into global variant trigger system
   * Enables hover / external triggers / timeline animations
   */
  useVariantAnimations({
    id,
    block,
    nodeRef,
    sensors,
    variant,
    setVariant,
    variantRef,
    triggerMap: newVariantTriggerMap,
    resolvedTheme
  });

  // Gradient CSS class
  const gradClass = gradMode === 'linear' ? 'god-grad-linear' : gradMode === 'radial' ? 'god-grad-radial' : '';

  // Component variables (only exist if block is a component root)
  const componentVariables = useComponentVariables_useComponentVariables(block);

  /**
      * Extend BlockFlow context:
      * - Pass down resolved theme
      * - Inject component variables for instances
      */
  const updatedParentData = (0,external_React_.useMemo)(() => ({
    ...parentData,
    parentTheme: resolvedTheme,
    ...(componentVariables ? {
      componentVariables
    } : {})
  }), [parentTheme, resolvedTheme, componentVariables]);
  let displayClass = '';
  if (designTypes?.dm === 'f') {
    displayClass = 'layout-flex';
  }
  if (designTypes?.dm === 'g') {
    displayClass = 'layout-grid';
  }
  const options = block?.data?.options ?? {};
  const DynamicTag = options.t?.value ?? 'div';
  const isAriaHidden = options.hfsr?.value === true;
  const ariaLabel = options.srl?.value;
  const isFocusableOption = options.focusable?.value === true;

  // List of native focusable tags
  const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

  // Build accessibility props
  const accessibilityProps = {};

  // aria-hidden and tabIndex when hidden
  if (isAriaHidden) {
    accessibilityProps['aria-hidden'] = true;
    accessibilityProps.tabIndex = -1;
  } else {
    // Only set aria-label if not hidden
    if (ariaLabel) {
      accessibilityProps['aria-label'] = ariaLabel;
    }

    // Set tabIndex only if tag is NOT natively focusable
    if (!nativeFocusableTags.includes(DynamicTag) && isFocusableOption) {
      accessibilityProps.tabIndex = isFocusableOption ? 0 : -1;
    }
    // If native focusable, do NOT set tabIndex at all (default browser behavior)
  }
  const linkProps = {};
  if (DynamicTag === 'a') {
    linkProps['href'] = options?.lURL?.value || '';
  }
  if (options?.lnt?.value) {
    linkProps['target'] = '_blank';
  }
  if (options?.ldo?.value) {
    linkProps['download'] = options?.ldon?.value || '';
  }
  if (options?.lrel?.value) {
    linkProps['rel'] = options?.lrel?.value || '';
  }
  const hoverTimeout = (0,external_React_.useRef)(null);
  return /*#__PURE__*/external_React_default().createElement(BlockFlowContext_BlockFlowContext.Provider, {
    value: updatedParentData
  }, renderType === 'SSR' && /*#__PURE__*/external_React_default().createElement("style", null, dynamicCSS), /*#__PURE__*/external_React_default().createElement(DynamicTag, _extends({
    ref: nodeRef,
    "data-node": id,
    "data-node-theme": resolvedTheme,
    className: `axd-base-node ${id} ${gradClass} ${displayClass} ${isInFold ? 'axd-base-node-active' : ''}`
  }, accessibilityProps, linkProps, {
    onMouseEnter: e => {
      // e.stopPropagation()
      // if (currentMap?.en) {
      //     newHandleVariantChange(id, currentMap.en);
      // }
      hoverTimeout.current = window.setTimeout(() => {
        if (currentMap?.en) {
          newHandleVariantChange(id, currentMap.en);
        }
      }, 10); // ms delay
    },
    onMouseLeave: e => {
      // e.stopPropagation()
      // if (currentMap?.lv) {
      //     newHandleVariantChange(id, currentMap.lv);
      // }
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = null;
        if (currentMap?.lv) {
          newHandleVariantChange(id, currentMap.lv);
        }
      }
    }
  }), children));
}
/* harmony default export */ const blocks_Base = ((/* unused pure expression or super */ null && (Base)));
// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.es.mjs
var purify_es = __webpack_require__(418);
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useBlockValueResolver.ts


function useBlockValueResolver_useBlockValueResolver(block) {
  const parentData = (0,external_React_.useContext)(BlockFlowContext_BlockFlowContext);
  const getValue = (0,external_React_.useCallback)(property => {
    const option = block.data?.options?.[property];
    if (!option) return '';
    const {
      vs = 'm',
      value
    } = option;

    // 1️⃣ Manual / default
    if (vs === 'm') {
      return value ?? '';
    }

    // 2️⃣ Variable resolution
    if (vs === 'var') {
      const varId = value;
      if (!varId) return '';
      return parentData?.instanceVariables?.[varId] ?? parentData?.componentVariables?.[varId] ?? '';
    }

    // 3️⃣ Future-safe placeholders
    if (vs === 'db') {
      // TODO: resolve db value
      return '';
    }
    if (vs === 'post') {
      // TODO: resolve post value
      return '';
    }
    return value ?? '';
  }, [block, parentData]);
  return {
    getValue
  };
}
;// CONCATENATED MODULE: ./src/Render/blocks/Text.tsx















function Text(_ref) {
  let {
    id,
    block,
    part,
    children
  } = _ref;
  // DOM reference for this block
  const nodeRef = useRef(null);
  const {
    getValue
  } = useBlockValueResolver(block);

  // Editor state (active block / active variant / color mode)
  const {
    colorMode,
    editingVariant,
    editingBlock
  } = useEditorContext();

  // Parent flow data (theme + component/instance variables)
  const parentData = useContext(BlockFlowContext);

  // Resolve final theme (global → parent → local override)
  const {
    resolvedTheme,
    parentTheme
  } = useResolvedTheme({
    id,
    colorMode
  });
  const designTypes = useMemo(() => {
    if (!block?.dt) return {};
    return KVParser.parse(block.dt);
  }, [block?.dt]);

  // Gradient mode placeholder (future extension)
  const gradMode = null;

  // Compute gradient CSS class (if enabled)
  const gradClass = gradMode === 'linear' ? 'god-grad-linear' : gradMode === 'radial' ? 'god-grad-radial' : '';

  // Variant state (base / hover / active / etc.)
  const {
    variant,
    setVariant,
    variantRef
  } = useVariantState();

  // Editor-side design resolution (variant-aware, no sensors)
  const {
    design,
    dynamicCSS
  } = useBlockDesignEditor(block, resolvedTheme, id, variant);

  // Component variables (only exist if block is a component root)
  const componentVariables = useComponentVariables(block);

  /**
   * Sync editor-selected variant → rendered variant
   * This keeps canvas preview aligned with variant panel
   */
  useEffect(() => {
    if (editingBlock === id && editingVariant !== variant) {
      setVariant(editingVariant);
    }
  }, [editingVariant, editingBlock]);

  /**
   * Extend BlockFlow context:
   * - Pass down resolved theme
   * - Inject component variables for instances
   */
  const updatedParentData = useMemo(() => ({
    ...parentData,
    parentTheme: resolvedTheme,
    ...(componentVariables ? {
      componentVariables
    } : {})
  }), [parentTheme, resolvedTheme, componentVariables]);

  // Data attributes for editor tooling
  const data = {};
  if (!part) {
    data['data-node'] = id;
  }
  let displayClass = '';
  if (designTypes?.dm === 'f') {
    displayClass = 'layout-flex';
  }
  if (designTypes?.dm === 'g') {
    displayClass = 'layout-grid';
  }
  const options = block?.data?.options ?? {};
  const DynamicTag = options.t?.value ?? 'div';
  const isAriaHidden = options.hfsr?.value === true;
  const ariaLabel = options.srl?.value;
  const isFocusableOption = options.focusable?.value === true;

  // List of native focusable tags
  const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

  // Build accessibility props
  const accessibilityProps = {};

  // aria-hidden and tabIndex when hidden
  if (isAriaHidden) {
    accessibilityProps['aria-hidden'] = true;
    accessibilityProps.tabIndex = -1;
  } else {
    // Only set aria-label if not hidden
    if (ariaLabel) {
      accessibilityProps['aria-label'] = ariaLabel;
    }

    // Set tabIndex only if tag is NOT natively focusable
    if (!nativeFocusableTags.includes(DynamicTag) && isFocusableOption) {
      accessibilityProps.tabIndex = isFocusableOption ? 0 : -1;
    }
    // If native focusable, do NOT set tabIndex at all (default browser behavior)
  }
  const linkProps = {};
  if (DynamicTag === 'a') {
    linkProps['href'] = options?.lURL?.value || '';
  }
  function getSanitizedContent() {
    const raw = getValue('ct') ?? '';
    return DOMPurify.sanitize(raw);
  }
  const content = getSanitizedContent();
  const isEditing = editingBlock === id;
  let editingStyles = {};
  if (isEditing) {
    editingStyles.userSelect = 'text';
  }
  return /*#__PURE__*/React.createElement(BlockFlowContext.Provider, {
    value: updatedParentData
  }, /*#__PURE__*/React.createElement("style", null, dynamicCSS), /*#__PURE__*/React.createElement("span", {
    ref: nodeRef,
    "data-node": id,
    "data-node-theme": resolvedTheme,
    className: `axd-base-node ${id} ${gradClass}`,
    dangerouslySetInnerHTML: {
      __html: content
    },
    style: {
      whiteSpace: 'break-spaces',
      ...editingStyles
    }
  }));
}
function TextRender(_ref2) {
  let {
    id,
    block,
    part,
    children
  } = _ref2;
  // DOM reference for runtime measurements & animations
  const nodeRef = (0,external_React_.useRef)(null);
  const {
    getValue
  } = useBlockValueResolver_useBlockValueResolver(block);

  // Surface context (runtime-only)
  const {
    colorMode,
    newVariantTriggerMap,
    newHandleVariantChange,
    renderType
  } = useSurfaceContext();

  // Parent flow data
  const parentData = (0,external_React_.useContext)(BlockFlowContext_BlockFlowContext);

  // Resolve runtime theme
  const {
    resolvedTheme,
    parentTheme
  } = useResolvedTheme_useResolvedTheme({
    id,
    colorMode
  });

  // Variant state (runtime controlled)
  const {
    variant,
    setVariant,
    variantRef
  } = useVariantState_useVariantState();
  const designTypes = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return util_KVParser.parse(block.dt);
  }, [block?.dt]);
  const map = new Map(block?.v?.map(o => [o.id, o]));
  const currentMap = map.get(variant);

  // Gradient placeholder
  const gradMode = null;

  // Runtime design resolution (base variant only, sensor-aware)
  const {
    design,
    dynamicCSS
  } = useBlockDesignRuntime(block, resolvedTheme, id);
  useBlockStyle(id, dynamicCSS, renderType);

  // Sensors: viewport, container, fold visibility
  const {
    isInFold,
    sensors
  } = useBlockSensors(nodeRef, resolvedTheme);

  /**
   * Register this block into global variant trigger system
   * Enables hover / external triggers / timeline animations
   */
  useVariantAnimations({
    id,
    block,
    nodeRef,
    sensors,
    variant,
    setVariant,
    variantRef,
    triggerMap: newVariantTriggerMap,
    resolvedTheme
  });

  // Gradient CSS class
  const gradClass = gradMode === 'linear' ? 'god-grad-linear' : gradMode === 'radial' ? 'god-grad-radial' : '';

  // Component variables (only exist if block is a component root)
  const componentVariables = useComponentVariables_useComponentVariables(block);

  /**
      * Extend BlockFlow context:
      * - Pass down resolved theme
      * - Inject component variables for instances
      */
  const updatedParentData = (0,external_React_.useMemo)(() => ({
    ...parentData,
    parentTheme: resolvedTheme,
    ...(componentVariables ? {
      componentVariables
    } : {})
  }), [parentTheme, resolvedTheme, componentVariables]);
  let displayClass = '';
  if (designTypes?.dm === 'f') {
    displayClass = 'layout-flex';
  }
  if (designTypes?.dm === 'g') {
    displayClass = 'layout-grid';
  }
  function getSanitizedContent() {
    const raw = getValue('ct') ?? '';
    return purify_es/* default */.A.sanitize(raw);
  }
  const content = getSanitizedContent();
  return /*#__PURE__*/external_React_default().createElement(BlockFlowContext_BlockFlowContext.Provider, {
    value: updatedParentData
  }, renderType === 'SSR' && /*#__PURE__*/external_React_default().createElement("style", null, dynamicCSS), /*#__PURE__*/external_React_default().createElement("span", {
    ref: nodeRef,
    "data-node": id,
    "data-node-theme": resolvedTheme,
    className: `axd-base-node ${id} ${gradClass}`,
    onMouseEnter: e => {
      // e.stopPropagation()
      if (currentMap?.en) {
        newHandleVariantChange(id, currentMap.en);
      }
    },
    onMouseLeave: e => {
      // e.stopPropagation()
      if (currentMap?.lv) {
        newHandleVariantChange(id, currentMap.lv);
      }
    },
    style: {
      whiteSpace: 'break-spaces'
    },
    dangerouslySetInnerHTML: {
      __html: content
    }
  }));
}
/* harmony default export */ const blocks_Text = ((/* unused pure expression or super */ null && (Text)));
;// CONCATENATED MODULE: ./src/RenderEngine/page/PageContext.tsx
// import { invalidate } from '@react-three/fiber';

const PageContext = /*#__PURE__*/(0,external_React_.createContext)(null);
function PageProvider(_ref) {
  let {
    children
  } = _ref;
  const [elements, setElements] = (0,external_React_.useState)([]); // Replace any with specific element type if possible

  const add = (0,external_React_.useCallback)(el => setElements(prev => [...prev, el]), []);
  const remove = (0,external_React_.useCallback)(el => setElements(prev => prev.filter(e => e !== el)), []);
  const isAnimatingRef = (0,external_React_.useRef)(false);
  const timeoutRef = (0,external_React_.useRef)(null);
  const setIsAnimating = () => {
    isAnimatingRef.current = true;
    // invalidate(); // TODO: bring this back
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, 250); // adjust this timeout based on animation durations
  };
  return /*#__PURE__*/external_React_default().createElement(PageContext.Provider, {
    value: {
      elements,
      add,
      remove,
      isAnimatingRef,
      setIsAnimating
    }
  }, children);
}
function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePage must be used within a PageProvider');
  return ctx;
}
// EXTERNAL MODULE: ./node_modules/lenis/dist/lenis-react.mjs + 1 modules
var lenis_react = __webpack_require__(449);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/RenderEngine/page/lenis.css
var lenis = __webpack_require__(164);
;// CONCATENATED MODULE: ./src/RenderEngine/page/lenis.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(lenis/* default */.A, options);




       /* harmony default export */ const page_lenis = (lenis/* default */.A && lenis/* default */.A.locals ? lenis/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/RenderEngine/page/LenisProvider.tsx
// LenisProvider.tsx





function LenisProvider(_ref) {
  let {
    children
  } = _ref;
  const lenisRef = (0,external_React_.useRef)(null);
  (0,external_React_.useEffect)(() => {
    let rafId;
    const update = time => {
      lenisRef.current?.lenis?.raf(time); // Lenis scroll
      rafTick(time); // stagger animations
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);
  (0,external_React_.useEffect)(() => {
    const onFocus = () => {
      lenisRef.current?.lenis?.scrollTo(window.scrollY, {
        immediate: true
      });
    };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);
  return /*#__PURE__*/external_React_default().createElement(lenis_react/* ReactLenis */.FH, {
    root: true,
    options: {
      autoRaf: false,
      // we handle RAF manually
      duration: 2 // experiment with 1.2-1.5
      // easing: (t) => 1 - Math.pow(1 - t, 4)
    },
    ref: lenisRef
  }, children);
}
function ScrollProgressHandler() {
  const lenis = (0,lenis_react/* useLenis */.xP)(); // gives you the active Lenis instance

  (0,external_React_.useEffect)(() => {
    if (!lenis) return;
    const onScroll = e => {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, e.scroll / max));

      // your variant logic here
      // window?.xc(
      //   'base_hover_progress',
      //   'b_jXUOGIiX',
      //   'strength',
      //   { strength: progress }
      // );
    };
    lenis.on('scroll', onScroll);
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);
  return null;
}
function ScrollTrigger() {
  const lenis = (0,lenis_react/* useLenis */.xP)(); // gives you the active Lenis instance
  const {
    postData,
    handleVariantChange
  } = useSurfaceContext();
  const [frameBlocks, setFrameBlocks] = (0,external_React_.useState)(null);
  const [footerBlocks, setFooterBlocks] = (0,external_React_.useState)(null);
  const [templateBlocks, setTemplateBlocks] = (0,external_React_.useState)(null);
  const [pageBlocks, setPageBlocks] = (0,external_React_.useState)(null);
  const [animationElements, setAnimationElements] = (0,external_React_.useState)({});
  const [scrollSections, setScrollSections] = (0,external_React_.useState)({});
  const [sectionElements, setSectionElements] = (0,external_React_.useState)({});
  (0,external_React_.useEffect)(() => {
    if (!lenis) return;
    const blocks = {
      ...frameBlocks,
      ...footerBlocks,
      ...templateBlocks,
      ...pageBlocks
    };
    const {
      stiMap,
      sectionMap,
      inViewMap
    } = collectSTI(blocks);
    // setScrollSections(sectionMap);
    // setAnimationElements(stiMap);
    setSectionElements(inViewMap);
    // console.log(stiObject, 'collected');

    // const onScroll = (e: { scroll: number }) => {
    //   const max = document.body.scrollHeight - window.innerHeight;
    //   const progress = Math.min(1, Math.max(0, e.scroll / max));

    //   // your variant logic here
    //   window?.xc(
    //     'base_hover_progress',
    //     'b_jXUOGIiX',
    //     'strength',
    //     { strength: progress }
    //   );
    // };

    // lenis.on('scroll', onScroll);
    // return () => {
    //   lenis.off('scroll', onScroll);
    // };
  }, [lenis, pageBlocks, frameBlocks, footerBlocks, templateBlocks]);
  (0,external_React_.useEffect)(() => {
    if (!postData?.template_data) return;
    const {
      parts,
      templates,
      current,
      default: defaultId
    } = postData.template_data;

    // --- Get Frame blocks ---
    try {
      const frameJson = JSON.parse(parts.frame || "{}");
      setFrameBlocks(frameJson.pageStructure?.blocks || null);
    } catch (e) {
      console.error("Error parsing frame JSON", e);
      setFrameBlocks(null);
    }

    // --- Get Footer blocks ---
    try {
      const footerJson = JSON.parse(parts.footer || "{}");
      setFooterBlocks(footerJson.pageStructure?.blocks || null);
    } catch (e) {
      console.error("Error parsing footer JSON", e);
      setFooterBlocks(null);
    }

    // --- Get Template blocks ---
    try {
      const templateId = current || defaultId;
      const templateObj = templates?.[templateId];
      const templateJson = typeof templateObj === "string" ? JSON.parse(templateObj) : templateObj || {};
      setTemplateBlocks(templateJson.pageStructure?.blocks || null);
    } catch (e) {
      console.error("Error parsing template JSON", e);
      setTemplateBlocks(null);
    }
  }, [postData]);

  // useEffect(() => {
  //   if (pageStructure.blocks) {
  //     setPageBlocks(cloneDeep(pageStructure.blocks))
  //   }
  // }, [pageStructure]);

  // useEffect(() => {

  // const observers = [];

  // Object.entries(animationElements).forEach(([id, opts]) => {
  //   if (opts.type !== "iv") return;

  //   const el = document.querySelector(`[data-uid="${id}"]`);
  //   if (!el) return;

  //   let hasPlayed = false;

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         if (!opts.replay && hasPlayed) return;
  //         playVariant(id, opts.enter);
  //         hasPlayed = true;
  //       } else {
  //         playVariant(id, opts.exit);
  //       }
  //     });
  //   }, { threshold: 0.1 });

  //   observer.observe(el);
  //   observers.push(observer);
  // });

  // return () => {
  //   observers.forEach(obs => obs.disconnect());
  // };
  // }, [animationElements]);

  const observersRef = (0,external_React_.useRef)([]);
  (0,external_React_.useEffect)(() => {
    // cleanup previous observers
    observersRef.current.forEach(o => o.disconnect());
    observersRef.current = [];

    // small map to track "hasPlayed" per block+section
    const played = new Map();

    // for each section
    Object.entries(sectionElements || {}).forEach(_ref2 => {
      let [sectionId, sectionObj] = _ref2;
      const sectionEl = document.querySelector(`[data-uid="${sectionId}"]`);
      const offsetY = (sectionObj?.options?.offsetY ?? 0) | 0;
      (sectionObj.blocks || []).forEach(block => {
        // determine the element we should observe:
        // - liv: observe the block element itself
        // - siv: observe the section element
        const targetEl = block.trigger === "liv" ? document.querySelector(`[data-uid="${block.id}"]`) : sectionEl;
        if (!targetEl) {
          // console.warn(`Missing target for block ${block.id} (trigger ${block.trigger})`);
          return;
        }

        // unique key to track played state
        const playedKey = `${sectionId}::${block.id}::${block.trigger}`;
        if (!played.has(playedKey)) played.set(playedKey, false);

        // rootMargin uses offsetY to expand/shrink the viewport for earlier/later triggers.
        // Using positive offsetY expands the intersection root, causing earlier triggers.
        // Adjust sign if you prefer different behavior.
        const rootMargin = `${offsetY}px 0px ${offsetY}px 0px`;
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const isIntersecting = entry.isIntersecting;
            const alreadyPlayed = played.get(playedKey);
            if (isIntersecting) {
              // ENTER
              if (!block.replay && alreadyPlayed) {
                // don't replay enter if replay=false and it already ran
                return;
              }
              // call your animate function
              playVariant(block.id, block.enter);
              played.set(playedKey, true);
            } else {
              // EXIT
              if (block.exit) {
                playVariant(block.id, block.exit);
              }
            }
          });
        }, {
          threshold: 0.1,
          rootMargin
        });
        observer.observe(targetEl);
        observersRef.current.push(observer);
      });
    });
    return () => {
      observersRef.current.forEach(o => o.disconnect());
      observersRef.current = [];
    };
  }, [sectionElements]); // rerun whenever animationSections changes

  function playVariant(uid, variantId) {
    handleVariantChange(variantId, uid);
  }
  return null;
}
function collectSTI(blocks) {
  const stiMap = {};
  const sectionMap = {};
  const inViewMap = {};
  const sectionScrollIds = {};
  Object.entries(blocks).forEach(_ref3 => {
    let [blockId, blockData] = _ref3;
    const section = blockData?.props?.options?.ssid?.value;
    const ssosY = blockData?.props?.options?.ssosY?.value;
    if (section !== undefined) {
      sectionMap[section] = {
        blockId,
        offsetY: ssosY || 0
      };
      inViewMap[blockId] = {
        id: blockId,
        options: {
          offsetY: ssosY || 0
        },
        blocks: []
      };
      sectionScrollIds[section] = blockId;
    }
  });
  Object.entries(blocks).forEach(_ref4 => {
    let [blockId, blockData] = _ref4;
    const sti = blockData?.props?.options?.sti?.value;
    if (!sti) return;
    const firstSection = sti.sections?.[0];
    if (sti.trigger === 'liv') {
      if (!inViewMap[blockId]) {
        inViewMap[blockId] = {
          id: blockId,
          options: {
            offsetY: 0
          },
          blocks: []
        };
      }
      if (firstSection) {
        inViewMap[blockId].blocks.push({
          ...firstSection,
          id: blockId
        });
      }
    } else if (sti.trigger === 'siv') {
      sti.sections?.forEach(section => {
        if (section.id && sectionScrollIds[section.id]) {
          const targetId = sectionScrollIds[section.id];
          if (!inViewMap[targetId]) {
            inViewMap[targetId] = {
              id: targetId,
              options: {
                offsetY: 0
              },
              blocks: []
            };
          }
          inViewMap[targetId].blocks.push({
            ...section,
            id: blockId
          });
        }
      });
    }
  });
  return {
    stiMap,
    sectionMap,
    inViewMap
  };
}
;// CONCATENATED MODULE: ./src/BlockEditor/util/optionCodec.ts
// =======================================
// optionCodec.ts
// Compact encoding / decoding for options
// =======================================

// ------------------------------------------------------------
// Detect helpers
// ------------------------------------------------------------
function isColorValue(val) {
  return val && typeof val === "object" && "l" in val && "d" in val;
}
function isPlainObject(val) {
  return val && typeof val === "object" && !Array.isArray(val) && !isColorValue(val);
}
function optionCodec_isCssFunction(str) {
  // rgb(), rgba(), hsl(), hsla(), calc(), var(), etc
  return /^[a-zA-Z_][a-zA-Z0-9_-]*\([^()]*\)$/.test(str);
}

// ------------------------------------------------------------
// Top-level safe split (handles nested (), [])
// ------------------------------------------------------------
function optionCodec_splitTopLevel(input) {
  let delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";
  const result = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === "(" || c === "[") depth++;else if (c === ")" || c === "]") depth--;
    if (c === delimiter && depth === 0) {
      result.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }
  result.push(input.slice(start).trim());
  return result;
}

// ============================================================
// ENCODING
// ============================================================

function encodeObject(obj) {
  const parts = Object.entries(obj).map(_ref => {
    let [k, v] = _ref;
    return `${k}:${encodeAnyValue(v)}`;
  });
  return `(${parts.join(",")})`;
}
function encodeArray(arr) {
  return `[${arr.map(v => encodeAnyValue(v)).join(",")}]`;
}

// function encodeAnyValue(value: any): string {
//   if (isColorValue(value)) {
//     return `${value.l}~${value.d}`;
//   }

//   if (Array.isArray(value)) {
//     return encodeArray(value);
//   }

//   if (isPlainObject(value)) {
//     return encodeObject(value);
//   }

//   if (typeof value === "boolean") {
//     return value ? "true" : "false";
//   }

//   return value ?? "";
// }

function encodeAnyValue(value) {
  if (isColorValue(value)) {
    return `${value.l}~${value.d}`;
  }
  if (Array.isArray(value)) {
    return encodeArray(value);
  }
  if (isPlainObject(value)) {
    return encodeObject(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    // IMPORTANT: preserve numeric strings
    return `'${value.replace(/'/g, "\\'")}'`;
  }
  return "";
}
function encodeBreakpoints(bp) {
  if (!bp) return "";
  return Object.entries(bp).map(_ref2 => {
    let [k, v] = _ref2;
    return `@${k}:${encodeAnyValue(v)}`;
  }).join("");
}
function encodeOptionValue(opt) {
  const {
    vs,
    value,
    m
  } = opt;
  const base = encodeAnyValue(value);
  const bpStr = encodeBreakpoints(m);
  if (!vs || vs === "m") {
    return `${base}${bpStr}`;
  }
  return `~${vs}:${base}${bpStr}`;
}
function optionCodec_encodeOptions(options) {
  return Object.entries(options).map(_ref3 => {
    let [k, v] = _ref3;
    return `${k}=${encodeOptionValue(v)}`;
  }).join("; ");
}

// ============================================================
// DECODING
// ============================================================

function decodeObject(str) {
  const clean = str.slice(1, -1).trim();
  if (!clean) return {};
  const obj = {};
  for (const seg of optionCodec_splitTopLevel(clean)) {
    const idx = seg.indexOf(":");
    obj[seg.slice(0, idx)] = decodeAnyValue(seg.slice(idx + 1));
  }
  return obj;
}
function decodeArray(str) {
  const clean = str.slice(1, -1).trim();
  if (!clean) return [];
  return optionCodec_splitTopLevel(clean).map(decodeAnyValue);
}
function isQuotedString(str) {
  return str.startsWith("'") && str.endsWith("'") || str.startsWith('"') && str.endsWith('"');
}
function decodeAnyValue(str) {
  str = str.trim();

  // --- Quoted string (HIGHEST priority) ---
  if (isQuotedString(str)) {
    return str.slice(1, -1).replace(/\\'/g, "'");
  }

  // --- CSS function ---
  if (optionCodec_isCssFunction(str)) {
    return str;
  }

  // --- Color mode ---
  if (str.includes("~") && !str.startsWith("[") && !str.startsWith("(")) {
    const [l, d] = str.split("~");
    return {
      l,
      d
    };
  }

  // --- Object ---
  if (str.startsWith("(") && str.endsWith(")")) {
    return decodeObject(str);
  }

  // --- Array ---
  if (str.startsWith("[") && str.endsWith("]")) {
    return decodeArray(str);
  }

  // --- Boolean ---
  if (str === "true") return true;
  if (str === "false") return false;

  // --- Number ---
  if (!isNaN(Number(str)) && str !== "") {
    return Number(str);
  }
  return str;
}
function decodeBreakpoints(str) {
  const bp = {};
  for (const p of str.split("@").filter(Boolean)) {
    const i = p.indexOf(":");
    bp[p.slice(0, i)] = decodeAnyValue(p.slice(i + 1));
  }
  return bp;
}
function decodeOptionValue(encoded) {
  let vs;
  let valueStr = encoded;
  let bpStr = "";
  const bpIdx = encoded.indexOf("@");
  if (bpIdx !== -1) {
    valueStr = encoded.slice(0, bpIdx);
    bpStr = encoded.slice(bpIdx);
  }
  if (valueStr.startsWith("~")) {
    const i = valueStr.indexOf(":");
    vs = valueStr.slice(1, i);
    valueStr = valueStr.slice(i + 1);
  }
  return {
    vs,
    value: decodeAnyValue(valueStr),
    m: bpStr ? decodeBreakpoints(bpStr) : undefined
  };
}
function decodeOptions(text) {
  const out = {};
  for (const p of text.split(";").map(x => x.trim()).filter(Boolean)) {
    const i = p.indexOf("=");
    out[p.slice(0, i)] = decodeOptionValue(p.slice(i + 1));
  }
  return out;
}
;// CONCATENATED MODULE: ./src/BlockEditor/util/blockDataUtils.ts


const genBlockData = block => {
  if (!block?.data) {
    // expand block options here
    block.data = {
      ...(block.d ? {
        design: expandDesign(block.d)
      } : {}),
      ...(block.o ? {
        options: decodeOptions(block.o)
      } : {})
    };
  }
};
/* harmony default export */ const blockDataUtils = (genBlockData);
const removeDatafromBlocks = blocksObj => {
  // Create a shallow copy of the blocks object
  const copiedBlocks = {};
  for (const id in blocksObj) {
    const block = blocksObj[id];
    if (!block) continue;

    // Create a shallow copy of each block to avoid mutating the original
    copiedBlocks[id] = {
      ...block
    };
    if (block.data?.options) {
      // If encodeOptions returns a string or new object, assign it directly
      copiedBlocks[id].o = encodeOptions(block.data.options);
    }
    if (block.data?.design) {
      copiedBlocks[id].d = compactDesign(block.data.design);
    }

    // Remove the data property from the copied block
    delete copiedBlocks[id].data;
  }
  return copiedBlocks;
};
;// CONCATENATED MODULE: ./src/BlockEditor/EditCanvas/GlobalStyles.tsx

function GlobalStyle() {
  function injectStyle(css) {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }
  const GodRegistry = `
    :root { 
      --is-dark: 0; 
      --default-du: 600ms; 
      --default-e: cubic-bezier(0.2, 0.8, 0.2, 1); 
    }
    @media (prefers-color-scheme: dark) { :root { --is-dark: 1; } }
    
    [data-local-theme="dark"] { --is-dark: 1 !important; }
    [data-local-theme="light"] { --is-dark: 0 !important; }
    [data-theme="dark"]:not([data-local-theme]) { --is-dark: 1; }
    [data-theme="light"]:not([data-local-theme]) { --is-dark: 0; }

    /* =========================================================
      AXD Foundation
      Addifect Experience Design
      Scope: .axd-root
      ========================================================= */

    /* ---------- Box sizing (non-negotiable) ---------- */
    .axd-root,
    .axd-root *,
    .axd-root *::before,
    .axd-root *::after {
      box-sizing: border-box;
    }

    /* ---------- Typography inheritance ---------- */
    .axd-root {
      // font-family: var(--axd-font-body, system-ui);
      font-size: var(--axd-text-base, 16px);
      line-height: 1.5;
      // color: var(--axd-color-text, currentColor);
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    .axd-root button,
    .axd-root input,
    .axd-root textarea,
    .axd-root select {
      font: inherit;
      color: inherit;
    }

    /* ---------- Margin normalization (system-only) ---------- */
    .axd-root :where(
      h1, h2, h3, h4, h5, h6,
      p,
      ul, ol,
      figure,
      blockquote,
      dl, dd
    ) {
      margin: 0;
    }

    /* ---------- Lists (intentional only) ---------- */
    .axd-root ul,
    .axd-root ol {
      padding: 0;
      list-style: none;
    }

    /* ---------- Media behavior ---------- */
    .axd-root img,
    .axd-root video,
    .axd-root canvas,
    .axd-root svg {
      display: block;
      max-width: 100%;
      height: auto;
    }

    /* ---------- Anchor behavior ---------- */
    .axd-root a {
      color: inherit;
      text-decoration: none;
    }

    .axd-root a:focus-visible,
    .axd-root button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    /* ---------- Tables ---------- */
    .axd-root table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* THE MASTER GOD CLASS */
    .axd-base-node {
      --container-bp: 9999;
      display: var(--dp, block);
      position: var(--po, 'static');
      inset: var(--t) var(--r) var(--b) var(--l);
      z-index: var(--zi);
      pointer-events: var(--pe, all);
      visibility: var(--vi, visible);
      overflow: var(--ov, visible);
      transform-style: preserve-3d;
      
      /* Box Model & Constraints */
      width: var(--w); height: var(--h);
      min-width: var(--minw); max-width: var(--maxw);
      min-height: var(--minh); max-height: var(--maxh);
      
      padding: var(--pt) var(--pr) var(--pb) var(--pl);
      background-color: var(--bgc);
      opacity: var(--op);
      border-radius: var(--bdr);
      border: var(--btw, 0px) solid var(--bdc, transparent);

      /*Background*/
      background-image: var(--bg-img);
      background-position: var(--bg-x) var(--bg-y);
      background-size: var(--bg-s);
      background-repeat: var(--bg-re);
      background-blend-mode: var(--bg-bm);

       /* Typography (Mapped to activated properties) */
      font-family: var(--ff);
      font-size: var(--fs);
      font-weight: var(--fw);
      font-style: var(--fst);
      line-height: var(--lh);
      letter-spacing: var(--ls);
      color: var(--tc);
      text-align: var(--ta, inherit);
      text-transform: var(--tt, none);
      word-break: var(--wb, normal);

      
      /* Dual Neo-Shadow Layer */
      box-shadow: 
        var(--shx, 0px) var(--shy, 0px) var(--shb, 0px) var(--shc, transparent),
        var(--shx2, 0px) var(--shy2, 0px) var(--shb2, 0px) var(--shc2, transparent);
      
      /* Base Transform Stack */
      transform: translate3d(calc(var(--tx) + var(--fx)), calc(var(--ty) + var(--fy)), var(--tz))
                 scale3d(var(--sx, 1), var(--sy, 1), 1) 
                 rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) rotateZ(var(--rz, 0deg)) 
                 skew(var(--skx, 0deg), var(--sky, 0deg));
      
      /* Filter Stack */
      filter: blur(var(--f-blur, 0px)) brightness(var(--f-bright, 1)) 
              contrast(var(--f-contrast, 1)) grayscale(var(--f-gray, 0)) 
              hue-rotate(var(--f-hue, 0deg)) invert(var(--f-inv, 0)) 
              saturate(var(--f-sat, 1)) sepia(var(--f-sep, 0));
      
      transition: none;
    }

    /* GRADIENT SUBCLASSES */
    .axd-grad-linear { background-image: linear-gradient(var(--ga), var(--g1), var(--g2), var(--g3)); }
    .axd-grad-radial { background-image: radial-gradient(circle at var(--gx) var(--gy), var(--g1), var(--g2), var(--g3)); }

    /* SUB-CLASS: FLEX SCOPE */
    .layout-flex {
      flex-direction: var(--fd);
      justify-content: var(--jc);
      align-items: var(--ai);
      gap: var(--gap);
    }

    /* SUB-CLASS: GRID SCOPE */
    .layout-grid {
      grid-template-columns: var(--gtc);
      grid-template-rows: var(--gtr);
      gap: var(--gap);
    }

    /* HOUDINI CORE REGISTRY */
    @property --w { syntax: '<length-percentage> | auto | fit-content'; inherits: false; initial-value: auto; }
    @property --h { syntax: '<length-percentage> | auto | fit-content'; inherits: false; initial-value: auto; }
    @property --minw { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --maxw { syntax: '<length-percentage>'; inherits: false; initial-value: 9999px; }
    @property --minh { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --maxh { syntax: '<length-percentage>'; inherits: false; initial-value: 9999px; }

    /* FLIP Offsets: Dedicated variables for position compensation */
    @property --fx { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --fy { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --fx-du { syntax: '<time>'; inherits: false; initial-value: 0ms; }
    @property --fy-du { syntax: '<time>'; inherits: false; initial-value: 0ms; }

    @property --pt { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --pr { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --pb { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --pl { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    
    @property --tx { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --ty { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --tz { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --sx { syntax: '<number>'; inherits: false; initial-value: 1; }
    @property --sy { syntax: '<number>'; inherits: false; initial-value: 1; }
    @property --rz { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
    @property --rx { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
    @property --ry { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
    @property --skx { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
    @property --sky { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

    @property --bgc { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }
    @property --bdc { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }
    @property --btw { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --bdr { syntax: '<length-percentage>'; inherits: false; initial-value: 0px; }
    @property --op { syntax: '<number>'; inherits: false; initial-value: 1; }

    /* Gradients */
    @property --g1 { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }
    @property --g2 { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }
    @property --g3 { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }
    @property --ga { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
    @property --gx { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
    @property --gy { syntax: '<percentage>'; inherits: false; initial-value: 50%; }
    
    /* Shadows */
    @property --shx { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --shy { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --shb { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --shc { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }
    @property --shx2 { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --shy2 { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --shb2 { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --shc2 { syntax: '<color>'; inherits: false; initial-value: rgba(0,0,0,0); }

    /* Filters */
    @property --f-blur { syntax: '<length>'; inherits: false; initial-value: 0px; }
    @property --f-bright { syntax: '<number>'; inherits: false; initial-value: 1; }
    @property --f-contrast { syntax: '<number>'; inherits: false; initial-value: 1; }
    @property --f-gray { syntax: '<number>'; inherits: false; initial-value: 0; }
    @property --f-hue { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
    @property --f-inv { syntax: '<number>'; inherits: false; initial-value: 0; }
    @property --f-sat { syntax: '<number>'; inherits: false; initial-value: 1; }
    @property --f-sep { syntax: '<number>'; inherits: false; initial-value: 0; }

    /* Image Optics */
    @property --bg-img { syntax: '*'; inherits: false; initial-value: none; }
    @property --bg-x { syntax: '<length-percentage>'; inherits: false; initial-value: 50%; }
    @property --bg-y { syntax: '<length-percentage>'; inherits: false; initial-value: 50%; }
    @property --bg-s { syntax: '<length-percentage> | cover | contain'; inherits: false; initial-value: cover; }
    /* Background Blend Mode */
    @property --bg-bm {
      syntax: 'normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity';
      inherits: false;
      initial-value: normal;
    }
    /* Background Repeat */
    @property --bg-re {
      syntax: 'repeat | no-repeat | repeat-x | repeat-y | round | space';
      inherits: false;
      initial-value: no-repeat;
    }

    /* other none animate*/
    @property --po { syntax: 'fixed | static | sticky | absolute'; inherits: false; initial-value: static; }
    @property --t { syntax: '<length-percentage> | auto'; inherits: false; initial-value: auto; }
    @property --r { syntax: '<length-percentage> | auto'; inherits: false; initial-value: auto; }
    @property --b { syntax: '<length-percentage> | auto'; inherits: false; initial-value: auto; }
    @property --l { syntax: '<length-percentage> | auto'; inherits: false; initial-value: auto; }
    @property --zi { syntax: 'auto | <integer>'; inherits: false; initial-value: auto; }

    /* THE ACTIVE TRANSITION CLASS */
    .axd-base-node-active {
      will-change: width, height, min-width, max-width, min-height, max-height, transform, filter, opacity, background-image, box-shadow;
      transition: 
        --w var(--w-du, var(--default-du)) var(--w-e, var(--default-e)),
        --h var(--h-du, var(--default-du)) var(--h-e, var(--default-e)),
        --minw var(--minw-du, var(--default-du)) var(--minw-e, var(--default-e)),
        --maxw var(--maxw-du, var(--default-du)) var(--maxw-e, var(--default-e)),
        --minh var(--minh-du, var(--default-du)) var(--minh-e, var(--default-e)),
        --maxh var(--maxh-du, var(--default-du)) var(--maxh-e, var(--default-e)),
        --t var(--t-du, var(--default-du)) var(--t-e, var(--default-e)),
        --r var(--r-du, var(--default-du)) var(--r-e, var(--default-e)),
        --b var(--b-du, var(--default-du)) var(--b-e, var(--default-e)),
        --l var(--l-du, var(--default-du)) var(--l-e, var(--default-e)),
        --pt var(--pt-du, var(--default-du)) var(--pt-e, var(--default-e)),
        --pr var(--pr-du, var(--default-du)) var(--pr-e, var(--default-e)),
        --pb var(--pb-du, var(--default-du)) var(--pb-e, var(--default-e)),
        --pl var(--pl-du, var(--default-du)) var(--pl-e, var(--default-e)),
        --tx var(--tx-du, var(--default-du)) var(--tx-e, var(--default-e)),
        --ty var(--ty-du, var(--default-du)) var(--ty-e, var(--default-e)),
        --tz var(--tz-du, var(--default-du)) var(--tz-e, var(--default-e)),
        --fx var(--fx-du, 0ms) var(--fx-e, var(--default-e)),
        --fy var(--fy-du, 0ms) var(--fy-e, var(--default-e)),
        --sx var(--sx-du, var(--default-du)) var(--sx-e, var(--default-e)),
        --rz var(--rz-du, var(--default-du)) var(--rz-e, var(--default-e)),
        --rx var(--rx-du, var(--default-du)) var(--rx-e, var(--default-e)),
        --ry var(--ry-du, var(--default-du)) var(--ry-e, var(--default-e)),
        --skx var(--skx-du, var(--default-du)) var(--skx-e, var(--default-e)),
        --sky var(--sky-du, var(--default-du)) var(--sky-e, var(--default-e)),
        --ga var(--ga-du, var(--default-du)) var(--ga-e, var(--default-e)),
        --gx var(--gx-du, var(--default-du)) var(--gx-e, var(--default-e)),
        --gy var(--gy-du, var(--default-du)) var(--gy-e, var(--default-e)),
        --g1 var(--g1-du, var(--default-du)) var(--g1-e, var(--default-e)),
        --g2 var(--g2-du, var(--default-du)) var(--g2-e, var(--default-e)),
        --g3 var(--g3-du, var(--default-du)) var(--g3-e, var(--default-e)),
        --bgc var(--bgc-du, var(--default-du)) var(--bgc-e, var(--default-e)),
        --bdc var(--bdc-du, var(--default-du)) var(--bdc-e, var(--default-e)),
        --btw var(--btw-du, var(--default-du)) var(--btw-e, var(--default-e)),
        --bdr var(--bdr-du, var(--default-du)) var(--bdr-e, var(--default-e)),
        --shb var(--shb-du, var(--default-du)) var(--shb-e, var(--default-e)),
        --shx var(--shx-du, var(--default-du)) var(--shx-e, var(--default-e)),
        --shy var(--shy-du, var(--default-du)) var(--shy-e, var(--default-e)),
        --shc var(--shc-du, var(--default-du)) var(--shc-e, var(--default-e)),
        --shb2 var(--shb2-du, var(--default-du)) var(--shb2-e, var(--default-e)),
        --shx2 var(--shx2-du, var(--default-du)) var(--shx2-e, var(--default-e)),
        --shy2 var(--shy2-du, var(--default-du)) var(--shy2-e, var(--default-e)),
        --shc2 var(--shc2-du, var(--default-du)) var(--shc2-e, var(--default-e)),
        --f-blur var(--f-blur-du, var(--default-du)) var(--f-blur-e, var(--default-e)),
        --f-gray var(--f-gray-du, var(--default-du)) var(--f-gray-e, var(--default-e)),
        --f-bright var(--f-bright-du, var(--default-du)) var(--f-bright-e, var(--default-e)),
        --f-contrast var(--f-contrast-du, var(--default-du)) var(--f-contrast-e, var(--default-e)),
        --f-sat var(--f-sat-du, var(--default-du)) var(--f-sat-e, var(--default-e)),
        --op var(--op-du, var(--default-du)) var(--op-e, var(--default-e)),
        /* Typography transitions */
        --fs var(--fs-du, 0ms) var(--fs-e, ease),
        --fw var(--fw-du, 0ms) var(--fw-e, ease),
        --tc var(--tc-du, 0ms) var(--tc-e, ease),
        --lh var(--lh-du, 0ms) var(--lh-e, ease),
        --ls var(--ls-du, 0ms) var(--ls-e, ease);
    }
  `;
  (0,external_React_.useEffect)(() => {
    return injectStyle(GodRegistry);
  }, []);
  return null;
}
/* harmony default export */ const GlobalStyles = (GlobalStyle);
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/styleBucket/StyleHost.tsx


const StyleHost = _ref => {
  let {
    renderType
  } = _ref;
  if (renderType === 'SSR') {
    return null;
  }
  const [, forceUpdate] = (0,external_React_.useState)(0);
  (0,external_React_.useEffect)(() => {
    return subscribe(() => {
      forceUpdate(v => v + 1);
    });
  }, []);
  (0,external_React_.useEffect)(() => {
    const css = getAllStylesCSR();
    let styleTag = document.head.querySelector('style#addifect-style-root');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'addifect-style-root';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = css;
  });
  return null;
};
;// CONCATENATED MODULE: ./src/RenderEngine/Surface.tsx



// template blocks
//elements







const Main = () => {
  const [dpr, setDpr] = (0,external_React_.useState)(window.devicePixelRatio);
  const {
    setColorMode,
    colorMode,
    showEffect,
    mounted,
    setMounted,
    setPage,
    pageBlocks,
    setFrameId,
    styleHTML,
    setStyleHTML,
    renderType
  } = useSurfaceContext();
  (0,external_React_.useEffect)(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);
  if (false) {}

  // Update the data-color-mode attribute on the <html> element
  (0,external_React_.useEffect)(() => {
    // Ensure the <html> element is available
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-color-mode', colorMode);
    }
  }, [colorMode]);
  (0,external_React_.useEffect)(() => {
    if (!styleHTML) return;

    // Create a wrapper container
    const wrapper = document.createElement("div");
    wrapper.innerHTML = styleHTML;

    // Convert wrapper children (style + link tags) into real nodes
    const nodes = Array.from(wrapper.children);

    // Append each node to <head>
    nodes.forEach(node => document.head.appendChild(node));
    return () => {
      // Cleanup: remove the appended nodes
      nodes.forEach(node => {
        if (document.head.contains(node)) {
          document.head.removeChild(node);
        }
      });
    };
  }, [styleHTML]);
  return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(GlobalStyles, null), /*#__PURE__*/external_React_default().createElement(PageProvider, null, mounted && /*#__PURE__*/external_React_default().createElement(StyleHost, {
    renderType: renderType
  }), /*#__PURE__*/external_React_default().createElement(LenisProvider, null, ScrollProgressHandler(), /*#__PURE__*/external_React_default().createElement(ScrollTrigger, null), /*#__PURE__*/external_React_default().createElement(RenderBlocks, null))));
};
function Surface(_ref) {
  let {
    renderType,
    renderData,
    templates
  } = _ref;
  // const [version, setVersion] = useState(0);
  // const [templateLoaded, settemplateLoaded] = useState(false);
  // if (__IS_SITE__) {
  //   if (renderType === 'CSR') {

  //     useEffect(() => {
  //       let cancelled = false;

  //       async function fetchTemplateData() {
  //         try {
  //           // setLoading(true);

  //           const response = await fetch(`/__addifect/templates/${version}/`, {
  //             credentials: 'same-origin',
  //           });

  //           if (!response.ok) {
  //             throw new Error(`Failed to fetch templates (${response.status})`);
  //           }

  //           const htmlString = await response.text();

  //           // Parse HTML
  //           const parser = new DOMParser();
  //           const doc = parser.parseFromString(htmlString, 'text/html');

  //           // Read embedded JSON
  //           const scriptEl = doc.getElementById('__ADDIFECT_TEMPLATES__');

  //           if (!scriptEl || !scriptEl.textContent) {
  //             throw new Error('Template data script not found');
  //           }

  //           const payload: TemplatePayload = JSON.parse(scriptEl.textContent);

  //           if (!cancelled) {

  //             settemplateLoaded(true);
  //             // setData(payload);
  //             // setError(null);
  //           }
  //         } catch (err) {
  //           if (!cancelled) {
  //             // setError(err as Error);
  //           }
  //         } finally {
  //           if (!cancelled) {
  //             // setLoading(false);
  //           }
  //         }
  //       }

  //       fetchTemplateData();

  //       return () => {
  //         cancelled = true;
  //       };
  //     }, [version]);

  // if (!templateLoaded) return null;

  // }
  // }
  // console.log(templates, 'templateBlocks');

  return /*#__PURE__*/external_React_default().createElement(SurfaceProvider, {
    renderType: renderType,
    renderData: renderData,
    templateBlocks: templates?.templateBlocks
  }, /*#__PURE__*/external_React_default().createElement(Main, null));
}
const MapStructure = _ref2 => {
  let {
    entry
  } = _ref2;
  return entry.map(blockId => /*#__PURE__*/external_React_default().createElement(RenderBlock, {
    key: blockId,
    id: blockId,
    part: false
  }));
};

// const RenderBlocks = () => {
//   const { renderType, pageBlocks, frameId } = useSurfaceContext();
//   const entry = pageBlocks.current.get(frameId || '')?.c || [];

//   const output = [];

//   if (__IS_EDITOR__ && renderType === 'SSR') {
//     // if (renderType === 'EPR') {
//     //   // TODO here render template parts      
//     //   output.push(
//     //     <React.Fragment key={frameId}>
//     //       <MapStructure entry={entry} />
//     //     </React.Fragment>
//     //   );
//     // }
//     // Server-side rendering (SSR).
//     if (renderType === 'SSR') {
//       // SSR
//       output.push(
//         <React.Fragment key={frameId}>
//           <MapStructure entry={entry} />
//         </React.Fragment>
//       );
//     }

//     return output;
//   }

//   // TODO CLEANUP THIS MESS

//   if (__IS_SITE__ || __IS_EDITOR__) { // Client-side rendering (CSR)
//     if (frameId) {

//       const frame = pageBlocks.current.get(frameId);
//       if (frame) {
//         genBlockData(frame);
//       }
//       const options = frame?.data?.options;
//       const template_header = options?.th?.value;
//       const template_footer = options?.tf?.value;

//       if (template_header) {
//         const headerBlock = pageBlocks.current.get(template_header);
//         output.push(
//           <React.Fragment key={template_header}>
//             <MapStructure entry={headerBlock?.c || []} />
//           </React.Fragment>
//         );
//       }
//     }
//     // place CSR here
//     output.push(
//       <React.Fragment key={frameId}>
//         <MapStructure entry={entry} />
//       </React.Fragment>
//     );

//     if (frameId) {

//       const frame = pageBlocks.current.get(frameId);
//       if (frame) {
//         genBlockData(frame);
//       }
//       const options = frame?.data?.options;
//       const template_header = options?.th?.value;
//       const template_footer = options?.tf?.value;

//       if (template_footer) {
//         const footerBlock = pageBlocks.current.get(template_footer);
//         output.push(
//           <React.Fragment key={template_footer}>
//             <MapStructure entry={footerBlock?.c || []} />
//           </React.Fragment>
//         );
//       }
//     }
//   }

//   return output;

// };

const RenderBlocks = () => {
  const {
    renderType,
    pageBlocks,
    frameId
  } = useSurfaceContext();
  const entry = pageBlocks.current.get(frameId || '')?.c || [];

  // Early SSR render in editor
  if (false) {}

  // Client side render or editor non-SSR
  if (true) {
    if (!frameId) return null;
    const frame = pageBlocks.current.get(frameId);
    if (!frame) return null;

    // Generate block data once
    blockDataUtils(frame);
    const options = frame.data?.options || {};
    const template_header = options.th?.value;
    const template_footer = options.tf?.value;
    const output = [];

    // Render header if valid key present
    if (template_header && typeof template_header === 'string' && template_header.length > 0) {
      const headerBlock = pageBlocks.current.get(template_header);
      output.push(/*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, {
        key: `header-${template_header}`
      }, /*#__PURE__*/external_React_default().createElement(MapStructure, {
        entry: headerBlock?.c || []
      })));
    }

    // Render main entry
    output.push(/*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, {
      key: `main-${frameId}`
    }, /*#__PURE__*/external_React_default().createElement(MapStructure, {
      entry: entry
    })));

    // Render footer if valid key present
    if (template_footer && typeof template_footer === 'string' && template_footer.length > 0) {
      const footerBlock = pageBlocks.current.get(template_footer);
      output.push(/*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, {
        key: `footer-${template_footer}`
      }, /*#__PURE__*/external_React_default().createElement(MapStructure, {
        entry: footerBlock?.c || []
      })));
    }
    return output;
  }
  return null;
};
const RenderBlock = _ref3 => {
  let {
    id,
    part
  } = _ref3;
  const {
    pageBlocks
  } = useSurfaceContext();
  const block = pageBlocks.current.get(id);
  let BlockComponent = null;
  if (!block) {
    return;
  }
  blockDataUtils(block); // generate block data design & options

  const type = block?.t;
  switch (type) {
    case 'b':
      BlockComponent = BasePreview;
      break;
    case 't':
      BlockComponent = TextRender;
      break;
    default:
      return null;
  }
  return /*#__PURE__*/external_React_default().createElement(BlockComponent, {
    id: id,
    block: block,
    part: part
  }, block?.c?.map(childId => /*#__PURE__*/external_React_default().createElement(RenderBlock, {
    key: childId,
    id: childId,
    part: part
  })));
};
;// CONCATENATED MODULE: ./src/RenderEngine/siteRender.tsx




/**
 * ============================================================
 * Site Render & Hydration Contract
 * ============================================================
 *
 * This file defines how page templates, global templates,
 * template parts, and styles are loaded and rendered
 * on the live site and in editor preview.
 *
 * ⚠️ This flow is intentional and must remain stable.
 * Do NOT reorder steps without updating this contract.
 *
 * ------------------------------------------------------------
 * 1. Page Template Data (Local)
 * ------------------------------------------------------------
 *
 * Source:
 * - Current HTML page contains:
 *   <script id="__ADDIFECT_LOCAL_T_DATA__">
 *
 * Data format (JSON):
 * {
 *   blocks,
 *   frameId,
 *   template_parts: {
 *     header: 'frameId' | null,
 *     footer: 'frameId' | null
 *   }
 * }
 *
 * Usage:
 * - Read script content
 * - JSON.parse()
 * - Pass result as:
 *   renderData.pageStructure
 *
 * This represents the current page structure and template bindings.
 *
 * ------------------------------------------------------------
 * 2. Global Template Loading
 * ------------------------------------------------------------
 *
 * Purpose:
 * - Load global parts, components, and shared assets
 * - Must happen BEFORE hydration
 *
 * Versioning:
 * - Use addifectRender.globalTemplateUpdated as TEMPLATE_UPDATED
 *
 * Fetch location:
 *   /__addifect/templates/v${TEMPLATE_UPDATED}/
 *
 * Load process:
 * 1. Fetch template bundle using TEMPLATE_UPDATED
 * 2. Read <script id="__ADDIFECT_TEMPLATE__">
 * 3. Extract textContent
 * 4. JSON.parse() to get:
 *    - Global template parts
 *    - Components
 *    - Shared assets
 *
 * Result:
 * - Parsed blocks are registered as initial page blocks
 * - These blocks are available globally before page render
 *
 * ------------------------------------------------------------
 * 3. Header / Footer Attachment
 * ------------------------------------------------------------
 *
 * Template parts are attached using frame-level options.
 *
 * Frame options:
 * - th → Header frame ID
 * - tf → Footer frame ID
 *
 * If present:
 * - Resolve corresponding frames from global template data
 * - Render each part separately in the surface:
 *   - Header above page content
 *   - Footer below page content
 *
 * Page content does NOT own header/footer blocks.
 * They are resolved and rendered by reference.
 *
 * ------------------------------------------------------------
 * 4. Hydration
 * ------------------------------------------------------------
 *
 * Hydration occurs AFTER initial data loading.
 *
 * Live site behavior:
 * - Global CSS and Google Font <link> tags
 *   are injected into <head> server-side (WordPress SSR)
 *
 * Editor preview behavior:
 * - Global CSS and fonts are injected inside the surface
 *   using useEffect
 *
 * ------------------------------------------------------------
 * 5. Render Context Differences
 * ------------------------------------------------------------
 *
 * SSR (Live Site):
 * - renderData contains:
 *   - All blocks
 *   - Frame ID
 *   - Template part bindings
 * - Rendering happens server-side before hydration
 *
 * Editor Preview (EPR):
 * - renderData is received via parent messaging
 * - Uses the same render pipeline (no SSR)
 *
 * ------------------------------------------------------------
 * Render Order Summary
 * ------------------------------------------------------------
 *
 * 1. Read page template data (__ADDIFECT_LOCAL_T_DATA__)
 * 2. Fetch and parse global templates
 * 3. Register global blocks
 * 4. Resolve header/footer attachments
 * 5. Render initial structure
 * 6. Apply global CSS and fonts (in editor preview)
 * 7. Hydrate
 * 8. Attach runtime systems (variants, motion, observers)
 *
 * ============================================================
 */

// Webpack public path (prod only)
if (true) {
  // @ts-ignore
  __webpack_require__.p = window.addifectRender?.assetsPath || '/';
}

// Get Latest Template Version
const TEMPLATE_UPDATED = window.addifectRender?.templatesUpdated || 1;

/**
 * Fetch template payload HTML and extract embedded JSON.
 */
async function fetchTemplateData() {
  const response = await fetch(`/__addifect/templates/v${TEMPLATE_UPDATED}/`, {
    credentials: 'same-origin'
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch templates (${response.status})`);
  }
  const htmlString = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const scriptEl = doc.getElementById('__ADDIFECT_TEMPLATES__');
  if (!scriptEl || !scriptEl.textContent) {
    throw new Error('Template data script not found');
  }
  return JSON.parse(scriptEl.textContent);
}

/**
 * Bootstrap Addifect hydration AFTER templates are loaded.
 */
async function bootstrap() {
  try {
    // get local template data
    const scriptEl = document.getElementById('__ADDIFECT_LOCAL_T_DATA__');
    let localTemplateData = {
      frameId: '',
      blocks: {}
    };
    if (scriptEl && scriptEl.textContent) {
      localTemplateData = JSON.parse(scriptEl.textContent);
    }
    const templatesData = await fetchTemplateData();
    let rootElement = document.getElementById('addifect_render_root');
    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = 'addifect_render_root';
      document.body.appendChild(rootElement);
    }
    (0,client/* hydrateRoot */.c)(rootElement, /*#__PURE__*/external_React_default().createElement(Surface, {
      renderType: "CSR",
      templates: templatesData?.templates,
      renderData: {
        pageStructure: localTemplateData,
        colorMode: templatesData?.templates?.colorMode
      }
    }));
  } catch (error) {
    console.error('[Addifect] Failed to bootstrap templates', error);
  }
}

// 🚀 Start
bootstrap();

/***/ }),

/***/ 164:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}
/* html.lenis-scrolling body { pointer-events: none !important; cursor: none; } */`, "",{"version":3,"sources":["webpack://./src/RenderEngine/page/lenis.css"],"names":[],"mappings":"AAAA,2BAA2B,WAAW,CAAC,4CAA4C,aAAa,CAAC,yCAAyC,2BAA2B,CAAC,2BAA2B,mBAAmB,CAAC,wBAAwB,4BAA4B,CAAC,uBAAuB,CAAC,kCAAkC;AACpU,iFAAiF","sourcesContent":["html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}\r\n/* html.lenis-scrolling body { pointer-events: none !important; cursor: none; } */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 609:
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ 795:
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ 790:
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			375: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkapp"] = self["webpackChunkapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [317], () => (__webpack_require__(302)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;