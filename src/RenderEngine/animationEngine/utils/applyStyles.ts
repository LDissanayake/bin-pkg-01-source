import { engineStore } from "../engineStore";
import { Variant } from "../types";

const transformKeys = ['x', 'y', 'rotate', 'rotateX', 'rotateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY'];

function buildTransform(current: Variant): string {
  const transforms: string[] = [];

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

const backdropKeys = [
  'bf_blur',
  'bf_brightness',
  'bf_contrast',
  'bf_grayscale',
  'bf_hueRotate',
  'bf_invert',
  'bf_opacity',
  'bf_saturate',
  'bf_sepia',
];

function buildBackdropFilter(current: Variant): string {
  const filters: string[] = [];

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



export function applyStyle(id: string, el: HTMLElement, key: string, value: string) {
  const store = engineStore[id];
  if (!store) return;

  store.currentValues[key] = value;

  if (transformKeys.includes(key)) {
    const transform = buildTransform(store.currentValues);
    el.style.transform = transform;
  } else if (backdropKeys.includes(key)) {
    const filter = buildBackdropFilter(store.currentValues);
    el.style.backdropFilter = filter;
  } else {
    el.style[key as any] = value;
  }
}

