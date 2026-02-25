// compact-utils.ts
// Full compact / expand utilities for array-of-arrays storage.
// - No sub-fields stored as JSON strings (we keep plain arrays/objects)
// - Dynamic VS prefix: "~<vs>:<value>" (manual = no prefix)
// - Compact design, options, animations, variants
// - Save/Load as JSON.stringify(arrayOfArrays)

// ----------------------------
// Schemas (your existing schema)
// ----------------------------
const blockOptionSchemas: Record<
  string,
  Record<string, { type: string; vs: boolean }>
> = {
  de: {
    size: { type: "string", vs: false },
    bg: { type: "color", vs: false },
    bx: { type: "string", vs: true },
    default: { type: "idMap", vs: false },
  },
  a: {
    p: { type: "position", vs: false },
  },
  c: {
    c: { type: "color", vs: false },
  },
  f: {
    f: { type: "font", vs: false },
  },
  b: {
    t: { type: "string", vs: true },
    dv: { type: "string", vs: true },
  },
};

// ----------------------------
// VS helpers (dynamic)
// ----------------------------
function detectVS(raw: any): { vs: string; value: any } {
  if (typeof raw !== "string") return { vs: "m", value: raw };
  if (!raw.startsWith("~") || !raw.includes(":")) return { vs: "m", value: raw };
  const idx = raw.indexOf(":");
  const vs = raw.slice(1, idx);
  const value = raw.slice(idx + 1);
  return { vs, value };
}
function encodeVS(vs: string, value: any): any {
  if (vs === "m") return value;
  return `~${vs}:${value}`;
}

// ----------------------------
// Compact / Expand Options
// ----------------------------
function compactOptions(
  options: Record<string, any>,
  schema: Record<string, { type: string; vs: boolean }>
): Record<string, any> {
  const out: Record<string, any> = {};
  for (const key in options) {
    if (!(key in schema)) {
      // Unknown keys - keep as native (object/array) - avoid stringifying
      out[key] = options[key];
      continue;
    }
    const val = options[key];
    const { type, vs } = schema[key];

    if (type === "string") {
      if (vs && val && typeof val === "object" && "vs" in val) {
        out[key] = encodeVS(val.vs, val.value);
      } else {
        out[key] = val && typeof val === "object" ? val.value ?? val : val;
      }
      continue;
    }

    if (type === "color") {
      // color value is { l, d } optionally with vs
      if (val && typeof val === "object") {
        const colorStr = `${val.value?.l ?? val.l ?? ""}~${val.value?.d ?? val.d ?? ""}`;
        if (vs && val.vs && val.vs !== "m") out[key] = encodeVS(val.vs, colorStr);
        else out[key] = colorStr;
      } else {
        out[key] = val;
      }
      continue;
    }

    if (type === "position" || type === "font" || type === "idMap") {
      // Keep as structured object/array (no stringification)
      out[key] = val;
      continue;
    }

    // fallback
    out[key] = val;
  }
  return out;
}

function expandOptions(
  compacted: Record<string, any>,
  schema: Record<string, { type: string; vs: boolean }>
): Record<string, any> {
  const out: Record<string, any> = {};
  for (const key in compacted) {
    if (!(key in schema)) {
      out[key] = compacted[key];
      continue;
    }
    const raw = compacted[key];
    const { type, vs } = schema[key];

    if (type === "string") {
      const { vs: detectedVS, value } = detectVS(raw);
      out[key] = vs ? { vs: detectedVS, value } : value;
      continue;
    }

    if (type === "color") {
      const { vs: detectedVS, value: valueRaw } = detectVS(raw);
      const [l = "", d = ""] = String(valueRaw).split("~");
      out[key] = vs ? { vs: detectedVS, value: { l, d } } : { l, d };
      continue;
    }

    // position/font/idMap -> pass-through
    out[key] = raw;
  }
  return out;
}

function compactBlockOptions(blockType: string, options: Record<string, any>): any {
  const schema = blockOptionSchemas[blockType];
  if (!schema) return options; // leave structured
  return compactOptions(options, schema);
}
function expandBlockOptions(blockType: string, compacted: any): any {
  const schema = blockOptionSchemas[blockType];
  if (!schema) return compacted;
  return expandOptions(compacted, schema);
}

// ----------------------------
// Compact / Expand Design (d)
// design structure: states -> keys -> { vs, value }
// We compact to: states -> keys -> (string | [vs, string] | primitive)
// - colors become "l~d" (or ["vs","l~d"])
// - strings -> "val" or ["vs","val"]
// ----------------------------
type DesignValue = { vs: string; value: any };
function compactDesignObject(d: Record<string, Record<string, DesignValue>>): any {
  if (!d) return {};
  const out: Record<string, any> = {};
  for (const state in d) {
    const stateObj = d[state];
    if (!stateObj) continue;
    const compState: Record<string, any> = {};
    for (const key in stateObj) {
      const item = stateObj[key];
      if (!item || typeof item !== "object") {
        compState[key] = item;
        continue;
      }
      const { vs, value } = item;
      if (value && typeof value === "object" && "l" in value && "d" in value) {
        // color
        const colorStr = `${value.l}~${value.d}`;
        compState[key] = vs && vs !== "m" ? [vs, colorStr] : colorStr;
      } else {
        compState[key] = vs && vs !== "m" ? [vs, value] : value;
      }
    }
    out[state] = compState;
  }
  return out;
}

function expandDesignObject(compacted: Record<string, any>): Record<string, any> {
  if (!compacted) return {};
  const out: Record<string, any> = {};
  for (const state in compacted) {
    const stateObj = compacted[state];
    if (!stateObj) continue;
    const expState: Record<string, any> = {};
    for (const key in stateObj) {
      const item = stateObj[key];
      if (item == null) {
        expState[key] = item;
        continue;
      }
      if (typeof item === "string") {
        if (item.includes("~")) {
          const [l, d] = item.split("~");
          expState[key] = { vs: "m", value: { l, d } };
        } else {
          expState[key] = { vs: "m", value: item };
        }
      } else if (Array.isArray(item) && item.length === 2) {
        const [vs, val] = item;
        if (typeof val === "string" && val.includes("~")) {
          const [l, d] = val.split("~");
          expState[key] = { vs, value: { l, d } };
        } else {
          expState[key] = { vs, value: val };
        }
      } else {
        expState[key] = item;
      }
    }
    out[state] = expState;
  }
  return out;
}

// ----------------------------
// Compact / Expand Animations (a)
// compress each frame object { value, duration, easing?, delay? } -> [valueEncoded, duration, easing?, delay?]
// valueEncoded uses encodeVS for dynamic values
// Structure: { animName: { propName: [ [value,duration,easing?,delay?], ... ] } }
// ----------------------------
function compactAnimations(a: Record<string, any> | undefined): any {
  if (!a) return undefined;
  const out: Record<string, any> = {};
  for (const animName in a) {
    const anim = a[animName];
    const outAnim: Record<string, any> = {};
    for (const prop in anim) {
      const frames = anim[prop];
      if (!Array.isArray(frames)) continue;
      outAnim[prop] = frames.map((f: any) => {
        // expected f: { value, duration, easing?, delay? } or earlier keys like v/du/e/de
        const value = f.value ?? f.v ?? f.val ?? f[0] ?? "";
        const duration = f.duration ?? f.du ?? 0;
        const easing = f.easing ?? f.e ?? undefined;
        const delay = f.delay ?? f.de ?? undefined;
        const { vs, value: val } = detectVS(value);
        const enc = encodeVS(vs, val); // enc may be "~type:xxx" or raw
        // frame array: [enc, duration, easing?, delay?]
        const arr: any[] = [enc, duration];
        if (easing !== undefined) arr.push(easing);
        if (delay !== undefined) arr.push(delay);
        return arr;
      });
    }
    out[animName] = outAnim;
  }
  return out;
}

function expandAnimations(compacted: Record<string, any> | undefined): any {
  if (!compacted) return undefined;
  const out: Record<string, any> = {};
  for (const animName in compacted) {
    const anim = compacted[animName];
    const outAnim: Record<string, any> = {};
    for (const prop in anim) {
      const frames = anim[prop];
      if (!Array.isArray(frames)) continue;
      outAnim[prop] = frames.map((arr: any[]) => {
        const enc = arr[0];
        const duration = arr[1];
        const easing = arr.length >= 3 ? arr[2] : undefined;
        const delay = arr.length >= 4 ? arr[3] : undefined;
        const { vs, value } = detectVS(enc);
        const obj: any = { value, duration };
        if (easing !== undefined) obj.easing = easing;
        if (delay !== undefined) obj.delay = delay;
        // keep original shape names if you prefer 'v','du','e','de' use mapping here
        return obj;
      });
    }
    out[animName] = outAnim;
  }
  return out;
}

// ----------------------------
// Compact / Expand Variants (v)
// convert array of variant objects -> array of arrays for each variant
// variant object: { label, id, minId, moutId, initId }
// compact -> [label,id,minId,moutId,initId]
// ----------------------------
function compactVariants(v: any[] | undefined): any {
  if (!v) return undefined;
  return v.map((item: any) => {
    return [item.label ?? "", item.id ?? "", item.minId ?? "", item.moutId ?? "", item.initId ?? ""];
  });
}
function expandVariants(compacted: any[] | undefined): any {
  if (!compacted) return undefined;
  return compacted.map((arr: any[]) => {
    return {
      label: arr[0] ?? "",
      id: arr[1] ?? "",
      minId: arr[2] ?? "",
      moutId: arr[3] ?? "",
      initId: arr[4] ?? "",
    };
  });
}

// ----------------------------
// Header packing/unpacking
// header fields: id,parentId,type,label
// label is dropped (stored as "" ) if it contains a comma
// ----------------------------
function packHeader(id: string, parentId?: string, type?: string, label?: string) {
  const pid = parentId ?? "";
  const t = type ?? "";
  const lab = label && label.includes(",") ? "" : label ?? "";
  return `${id},${pid},${t},${lab}`;
}
function unpackHeader(header: string) {
  const parts = header.split(",");
  while (parts.length < 4) parts.push("");
  const [id, parentId, type, label] = parts;
  return { id, parentId: parentId || undefined, type: type || undefined, label: label || undefined };
}

// ----------------------------
// Compact single block -> array
// returns [ header, oObj|"", dObj|"", vArr|[], aObj|{}, childrenArr|undefined ]
// ----------------------------
export function compactBlockToArray(id: string, block: any): any[] {
  const parentId = block.p ?? undefined;
  const type = block.t ?? undefined;
  const label = block.l ?? undefined;

  const header = packHeader(id, parentId, type, label);

  // options -> plain object (compacted)
  const o = block.o;
  // design -> compacted object
  // const d = block.d ? compactDesignObject(block.d) : "";

  const d = block.d;

  // variants -> compact array
  const v = compactVariants(block.v);
  // animations -> compacted
  const a = compactAnimations(block.a);
  // children -> keep as array (or undefined)
  const c = block.c === undefined ? undefined : Array.isArray(block.c) ? block.c : undefined;

  return [header, o, d, v ?? "", block.a ?? "", c ?? ""];
}

// ----------------------------
// Expand single block from array
// ----------------------------
export function expandBlockFromArray(arr: any[]): any {
  const [header, oObj, dObj, vArr, aObj, cArr] = arr;
  const { id, parentId, type, label } = unpackHeader(String(header ?? ""));

  // const o = oObj ? expandBlockOptions(type ?? "", oObj) : undefined;
  // const d = dObj ? expandDesignObject(dObj) : undefined;
  const v = vArr ? expandVariants(vArr) : undefined;
  const a = aObj ? expandAnimations(aObj) : undefined;
  const c = (cArr === "" || cArr === undefined) ? undefined : (Array.isArray(cArr) ? (cArr.length === 0 ? [] : cArr) : String(cArr).split(","));

  return {
    id,
    p: parentId,
    t: type,
    l: label,
    c,
    o: oObj,
    d: dObj,
    v,
    a: aObj,
  };
}

// ----------------------------
// Save / Load Map as JSON array-of-arrays
// ----------------------------
export function saveBlocks(blockMap: Map<string, any>): string {
  const arr: any[] = [];
  for (const [id, block] of blockMap.entries()) {
    arr.push(compactBlockToArray(id, block));
  }
  return JSON.stringify(arr);
}

export function loadBlocks(text: string): Map<string, any> {
  const map = new Map<string, any>();
  if (!text || !text.trim()) return map;
  let parsed: any[] = [];
  try {
    parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) return map;
  } catch (e) {
    return map;
  }
  for (const item of parsed) {
    if (!Array.isArray(item)) continue;
    const blk = expandBlockFromArray(item);
    const { id, ...rest } = blk;
    map.set(id, rest);
  }
  return map;
}

// ----------------------------
// (Optional) small tests (uncomment for quick local check)
// ----------------------------
/*
const sampleBlock = {
  p: "root",
  t: "de",
  l: "Hello Label",
  c: ["A","B"],
  o: { size: "10", bg: { l: "#fff", d: "#000" }, bx: { vs: "v", value: "main" } },
  d: {
    base: {
      pt: { vs: "m", value: "re" },
      bgc: { vs: "m", value: { l: "red", d: "blue" } }
    }
  },
  v: [{label:"Base",id:"base",minId:"",moutId:"",initId:""}],
  a: {
    "base-hover": {
      bgc: [{ value: "~v:teal", duration: 800, easing: "ease-out" }]
    }
  }
};

const map = new Map();
map.set("id1", sampleBlock);
const saved = saveBlocks(map);
console.log("saved:", saved);
const loaded = loadBlocks(saved);
console.log("loaded:", loaded);
*/
