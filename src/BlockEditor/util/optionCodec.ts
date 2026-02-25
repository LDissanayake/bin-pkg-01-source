// =======================================
// optionCodec.ts
// Compact encoding / decoding for options
// =======================================

export interface OptionValue {
  vs?: string;               // value source (m | var | func | db | custom)
  value?: any;               // string | number | object | array | boolean
  m?: Record<string, any>;   // breakpoints
}

export type OptionObject = Record<string, OptionValue>;


// ------------------------------------------------------------
// Detect helpers
// ------------------------------------------------------------
function isColorValue(val: any): boolean {
  return val && typeof val === "object" && "l" in val && "d" in val;
}

function isPlainObject(val: any): boolean {
  return (
    val &&
    typeof val === "object" &&
    !Array.isArray(val) &&
    !isColorValue(val)
  );
}

function isCssFunction(str: string): boolean {
  // rgb(), rgba(), hsl(), hsla(), calc(), var(), etc
  return /^[a-zA-Z_][a-zA-Z0-9_-]*\([^()]*\)$/.test(str);
}


// ------------------------------------------------------------
// Top-level safe split (handles nested (), [])
// ------------------------------------------------------------
function splitTopLevel(input: string, delimiter = ","): string[] {
  const result: string[] = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;

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

function encodeObject(obj: Record<string, any>): string {
  const parts = Object.entries(obj).map(
    ([k, v]) => `${k}:${encodeAnyValue(v)}`
  );
  return `(${parts.join(",")})`;
}

function encodeArray(arr: any[]): string {
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

function encodeAnyValue(value: any): string {
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


function encodeBreakpoints(bp?: Record<string, any>): string {
  if (!bp) return "";
  return Object.entries(bp)
    .map(([k, v]) => `@${k}:${encodeAnyValue(v)}`)
    .join("");
}

function encodeOptionValue(opt: OptionValue): string {
  const { vs, value, m } = opt;
  const base = encodeAnyValue(value);
  const bpStr = encodeBreakpoints(m);

  if (!vs || vs === "m") {
    return `${base}${bpStr}`;
  }

  return `~${vs}:${base}${bpStr}`;
}

export function encodeOptions(options: OptionObject): string {
  return Object.entries(options)
    .map(([k, v]) => `${k}=${encodeOptionValue(v)}`)
    .join("; ");
}


// ============================================================
// DECODING
// ============================================================

function decodeObject(str: string): Record<string, any> {
  const clean = str.slice(1, -1).trim();
  if (!clean) return {};

  const obj: Record<string, any> = {};
  for (const seg of splitTopLevel(clean)) {
    const idx = seg.indexOf(":");
    obj[seg.slice(0, idx)] = decodeAnyValue(seg.slice(idx + 1));
  }
  return obj;
}

function decodeArray(str: string): any[] {
  const clean = str.slice(1, -1).trim();
  if (!clean) return [];
  return splitTopLevel(clean).map(decodeAnyValue);
}

function isQuotedString(str: string): boolean {
  return (
    (str.startsWith("'") && str.endsWith("'")) ||
    (str.startsWith('"') && str.endsWith('"'))
  );
}

function decodeAnyValue(str: string): any {
  str = str.trim();

  // --- Quoted string (HIGHEST priority) ---
  if (isQuotedString(str)) {
    return str.slice(1, -1).replace(/\\'/g, "'");
  }

  // --- CSS function ---
  if (isCssFunction(str)) {
    return str;
  }

  // --- Color mode ---
  if (
    str.includes("~") &&
    !str.startsWith("[") &&
    !str.startsWith("(")
  ) {
    const [l, d] = str.split("~");
    return { l, d };
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



function decodeBreakpoints(str: string): Record<string, any> {
  const bp: Record<string, any> = {};
  for (const p of str.split("@").filter(Boolean)) {
    const i = p.indexOf(":");
    bp[p.slice(0, i)] = decodeAnyValue(p.slice(i + 1));
  }
  return bp;
}

function decodeOptionValue(encoded: string): OptionValue {
  let vs: string | undefined;
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

export function decodeOptions(text: string): OptionObject {
  const out: OptionObject = {};
  for (const p of text.split(";").map(x => x.trim()).filter(Boolean)) {
    const i = p.indexOf("=");
    out[p.slice(0, i)] = decodeOptionValue(p.slice(i + 1));
  }
  return out;
}
