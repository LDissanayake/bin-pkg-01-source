// ========================================================
// styleCodec.ts
// Design block codec with:
// - color mode (l~d, cm())
// - images (img())
// - responsive (@)
// - value source (~vs:)
// ========================================================

import { BlockDesign } from "../Blocks/blockTemplate";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export type ColorModeValue<T = any> = { l: T; d: T };

export type ImageValue = Record<string, string>;

export type StyleValue =
  | string
  | ImageValue
  | ColorModeValue<string>
  | ColorModeValue<ImageValue>
  | undefined;

export interface StyleProp {
  vs: string;
  value: StyleValue;
  m?: Record<string, StyleValue>;
}

export type StyleBlock = Record<string, StyleProp>;
export type StyleDesign = BlockDesign;

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function isColorModeValue(v: any): v is ColorModeValue {
  return v && typeof v === "object" && "l" in v && "d" in v;
}

function isCssFunction(str: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_-]*\([^()]*\)$/.test(str);
}

function isCmFunction(str: string): boolean {
  return /^cm\(.+\)$/.test(str);
}

function isImgFunction(str: string): boolean {
  return /^img\(.+\)$/.test(str);
}

/* ------------------------------------------------------------------ */
/* Safe split helpers */
/* ------------------------------------------------------------------ */

function splitTopLevel(
  input: string,
  delimiter: string
): string[] {
  const out: string[] = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === delimiter && depth === 0) {
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

function decodeImg(str: string): ImageValue {
  const inner = str.slice(4, -1); // img(...)
  const parts = splitTopLevel(inner, ",");

  const obj: ImageValue = {};

  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;

    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    obj[key] = val;
  }

  return obj;
}

function encodeImg(obj: ImageValue): string {
  const parts = Object.entries(obj).map(
    ([k, v]) => `${k}:${v}`
  );
  return `img(${parts.join(", ")})`;
}

/* ------------------------------------------------------------------ */
/* Value encode / decode */
/* ------------------------------------------------------------------ */

function encodeStyleValue(value: StyleValue): string {
  if (isColorModeValue(value)) {
    const l =
      typeof value.l === "string"
        ? value.l
        : encodeImg(value.l);

    const d =
      typeof value.d === "string"
        ? value.d
        : encodeImg(value.d);

    const complex =
      l.includes("(") ||
      d.includes("(") ||
      l.includes(",") ||
      d.includes(",");

    return complex ? `cm(${l}, ${d})` : `${l}~${d}`;
  }

  if (typeof value === "object") {
    return encodeImg(value as ImageValue);
  }

  return value ?? "";
}

function decodeStyleValue(raw: string): StyleValue {
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
    return { l, d };
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

function encodeBlock(
  block: StyleBlock,
  pretty = false
): string {
  const out: string[] = [];

  for (const prop in block) {
    const { vs, value, m } = block[prop];

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

export function compactDesign(
  design: StyleDesign,
  pretty = false
): string {
  const blocks: string[] = [];

  for (const variant in design) {
    const body = encodeBlock(design[variant], pretty);
    blocks.push(
      pretty
        ? `${variant}{\n${body}\n}\n`
        : `${variant}{${body}}`
    );
  }

  return pretty ? blocks.join("\n") : blocks.join("");
}

/* ------------------------------------------------------------------ */
/* Decode */
/* ------------------------------------------------------------------ */

function decodeBlockBody(body: string): StyleBlock {
  const block: StyleBlock = {};

  const props = splitTopLevel(body, ";").filter(Boolean);

  for (const item of props) {
    const idx = item.indexOf(":");
    if (idx === -1) continue;

    const prop = item.slice(0, idx).trim();
    let rest = item.slice(idx + 1).trim();

    let vs = "m";
    const responsive: Record<string, StyleValue> = {};

    if (rest.startsWith("~")) {
      const i = rest.indexOf(":");
      vs = rest.slice(1, i);
      rest = rest.slice(i + 1);
    }

    const segments = splitTopLevel(rest, "@");
    const main = segments.shift()!;
    const value = decodeStyleValue(main);

    for (const seg of segments) {
      const [bp, v] = splitTopLevel(seg, ":");
      responsive[bp] = decodeStyleValue(v);
    }

    block[prop] = {
      vs,
      value,
      ...(Object.keys(responsive).length ? { m: responsive } : {})
    };
  }

  return block;
}

export function expandDesign(compact: string): StyleDesign {
  const result: StyleDesign = {};
  const pattern = /([a-zA-Z0-9_-]+)\s*\{([^}]*)\}/g;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(compact))) {
    result[match[1]] = decodeBlockBody(match[2]);
  }

  return result;
}
