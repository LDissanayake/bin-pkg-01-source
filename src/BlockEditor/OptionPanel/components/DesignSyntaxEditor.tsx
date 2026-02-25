import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as styles from './DesignSyntaxEditor.module.css';

// --- Radix UI Icons (Inline SVGs) ---

const ExclamationTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.49991 0.876892C7.90157 0.876892 8.27181 1.10931 8.45938 1.48271L14.7094 13.9231C14.8879 14.2785 14.8725 14.7018 14.669 15.0425C14.4655 15.3831 14.1032 15.5896 13.7058 15.5896H1.29402C0.896646 15.5896 0.534282 15.3831 0.330829 15.0425C0.127376 14.7018 0.11192 14.2785 0.290453 13.9231L6.54045 1.48271C6.72802 1.10931 7.09825 0.876892 7.49991 0.876892ZM7.49991 1.83523L1.69769 13.3853H13.3021L7.49991 1.83523ZM7.50002 11.5C7.91423 11.5 8.25002 11.8358 8.25002 12.25C8.25002 12.6642 7.91423 13 7.50002 13C7.08581 13 6.75002 12.6642 6.75002 12.25C6.75002 11.8358 7.08581 11.5 7.50002 11.5ZM7.5 4.5C7.91421 4.5 8.25 4.83579 8.25 5.25V9.75C8.25 10.1642 7.91421 10.5 7.5 10.5C7.08579 10.5 6.75 10.1642 6.75 9.75V5.25C6.75 4.83579 7.08579 4.5 7.5 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5.85355 4.14645C6.04882 4.34171 6.04882 4.65829 5.85355 4.85355L3.70711 7L5.85355 9.14645C6.04882 9.34171 6.04882 9.65829 5.85355 9.85355C5.65829 10.0488 5.34171 10.0488 5.14645 9.85355L2.64645 7.35355C2.45118 7.15829 2.45118 6.84171 2.64645 6.64645L5.14645 4.14645C5.34171 3.95118 5.65829 3.95118 5.85355 4.14645ZM9.14645 4.14645C8.95118 4.34171 8.95118 4.65829 9.14645 4.85355L11.2929 7L9.14645 9.14645C8.95118 9.34171 8.95118 9.65829 9.14645 9.85355C9.34171 10.0488 9.65829 10.0488 9.85355 9.85355L12.3536 7.35355C12.5488 7.15829 12.5488 6.84171 12.3536 6.64645L9.85355 4.14645C9.65829 3.95118 9.34171 3.95118 9.14645 4.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const StackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.5 0.75L0.25 4.5L7.5 8.25L14.75 4.5L7.5 0.75ZM7.5 2.15192L12.0423 4.5L7.5 6.84808L2.95769 4.5L7.5 2.15192ZM0.25 6.80769L1.41412 6.20576L7.5 9.35192L13.5859 6.20576L14.75 6.80769L7.5 10.5577L0.25 6.80769ZM0.25 9.11538L1.41412 8.51345L7.5 11.6596L13.5859 8.51345L14.75 9.11538L7.5 12.8654L0.25 9.11538Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.5 1.5V4.5H11.5V13.5H3.5V1.5H8.5ZM9.20711 0.5H3.5C2.94772 0.5 2.5 0.947715 2.5 1.5V13.5C2.5 14.0523 2.94772 14.5 3.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V3.79289C12.5 3.52768 12.3946 3.27335 12.2071 3.08579L9.91421 0.792893C9.72665 0.605357 9.47232 0.5 9.20711 0.5ZM9.5 1.70711L11.2929 3.5H9.5V1.70711ZM5 5.5H10V6.5H5V5.5ZM5 8.5H10V9.5H5V8.5ZM5 11.5H8V12.5H5V11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const LightningBoltIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.5 0.5L1.5 8.5H6.5V14.5L12.5 6.5H7.5V0.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const SlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.10876 14L10.8912 1H9.79222L3.00976 14H4.10876Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3.13523 8.84197C3.3241 9.04307 3.64052 9.05367 3.84162 8.8648L7.5 5.42854L11.1584 8.8648C11.3595 9.05367 11.6759 9.04307 11.8648 8.84197C12.0536 8.64087 12.043 8.32445 11.8419 8.13558L7.84188 4.37962C7.64993 4.19939 7.35007 4.19939 7.15812 4.37962L3.15812 8.13558C2.95703 8.32445 2.94643 8.64087 3.13523 8.84197Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3.13523 6.15803C3.3241 5.95693 3.64052 5.94633 3.84162 6.1352L7.5 9.57146L11.1584 6.1352C11.3595 5.94633 11.6759 5.95693 11.8648 6.15803C12.0536 6.35913 12.043 6.67555 11.8419 6.86442L7.84188 10.6204C7.64993 10.8006 7.35007 10.8006 7.15812 10.6204L3.15812 6.86442C2.95703 6.67555 2.94643 6.35913 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
  </svg>
);

// --- Types & Interfaces ---

interface ParsedBreakpoint {
  bp: string;
  val: string;
  error?: string;
}

interface ParsedValue {
  raw: string;
  base: string;
  type?: 'variable' | 'function' | 'color-mode' | 'simple';
  variants: ParsedBreakpoint[];
}

interface ParsedBlock {
  selector: string;
  properties: Record<string, ParsedValue>;
  valid: boolean;
}

interface ParserError {
  id: string;
  msg: string;
  line: number;
}

interface ParserResult {
  parsedData: ParsedBlock[];
  errors: ParserError[];
}

interface TooltipState {
  x: number;
  y: number;
  msg: string;
}

interface MenuPosition {
  top?: number;
  bottom?: number;
  left: number;
  direction: 'up' | 'down';
}

// --- Constants & Config ---

const ALLOWED_PROPERTIES: readonly string[] = [
  'w', 'h', 'x', 'y', 'c', 'bgc',
  'fs', 'fw', 'br', 'p', 'm', 'z',
  'op', 'display', 'pos', 'pt', 'dt', 'dti', 'va', 'b'
];

const MOCK_INITIAL_CODE = `header {
  w: 100%;
  bgc: #fff~#000;
  h: 60px;
}

main_content {
  /* Valid with orientation */
  w: 800px@768:100%@300p:50%;
  
  /* Variable */
  x: ~v:theme_offset;
  
  /* Missing Semicolon Test */
  h: 60px
  c: rgba(255,255,255,1);
}

bad.selector {
  w: 200px;
}

sidebar {
  invalid_prop: 20px;
}`;

const LINE_HEIGHT = 24;
const PADDING_TOP = 10;

// --- Custom Hooks ---

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- Helper Functions ---

const isSelectorValid = (selector: string): boolean => {
  if (!selector) return false;
  if (selector.includes(' ')) return false;
  if (selector.includes('.')) return false;
  if (selector.includes('#')) return false;
  return true;
};

const escapeHtml = (unsafe: string): string => {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// --- Core Parser Logic ---
const analyzeCode = (input: string): ParserResult => {
  const newErrors: ParserError[] = [];
  const newParsedData: ParsedBlock[] = [];
  const seenSelectors = new Set<string>();

  const getLineNum = (index: number) => input.substring(0, index).split('\n').length - 1;

  const cleanCode = input.replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '));

  let globalCursor = 0;
  let rawBlocks = cleanCode.split('}');
  if (rawBlocks[rawBlocks.length - 1].trim() === '') rawBlocks.pop();

  rawBlocks.forEach((blockRaw, index) => {
    const blockStartIndex = globalCursor;
    globalCursor += blockRaw.length + 1;

    const trimmedBlock = blockRaw.trim();
    if (!trimmedBlock) return;

    if (!trimmedBlock.includes('{')) {
      const relativeStart = blockRaw.search(/\S/);
      newErrors.push({
        id: `structure-${index}`,
        msg: `Block missing '{'`,
        line: getLineNum(blockStartIndex + relativeStart)
      });
      return;
    }

    const [selectorRaw, contentRaw] = trimmedBlock.split('{');
    const selector = selectorRaw.trim();
    const selectorRelativeIndex = blockRaw.indexOf(selectorRaw);
    const selectorLine = getLineNum(blockStartIndex + selectorRelativeIndex);

    if (!selector) {
      newErrors.push({ id: `sel-empty-${index}`, msg: 'Missing selector.', line: selectorLine });
    } else if (!isSelectorValid(selector)) {
      newErrors.push({ id: `sel-invalid-${index}`, msg: `Invalid selector "${selector}".`, line: selectorLine });
    } else if (seenSelectors.has(selector)) {
      newErrors.push({ id: `sel-dup-${index}`, msg: `Duplicate selector "${selector}".`, line: selectorLine });
    }
    seenSelectors.add(selector);

    const properties: Record<string, ParsedValue> = {};
    const decls = contentRaw.split(';').map(d => d.trim()).filter(d => d !== '');
    let contentSearchCursor = 0;

    decls.forEach((decl, dIndex) => {
      const declIndex = contentRaw.indexOf(decl, contentSearchCursor);
      contentSearchCursor = declIndex + decl.length;

      const declGlobalIndex = blockStartIndex + selectorRaw.length + 1 + declIndex;
      const declLine = getLineNum(declGlobalIndex);

      if (!decl.includes(':')) {
        newErrors.push({ id: `prop-struct-${index}-${dIndex}`, msg: `Missing ':'`, line: declLine });
        return;
      }

      const [propRaw, valRaw] = decl.split(/:(.*)/s);
      const prop = propRaw.trim();
      const val = valRaw ? valRaw.trim() : '';

      // --- MISSING SEMICOLON CHECK ---
      if (valRaw) {
        const missingSemiRegex = new RegExp(`(?:^|\\s)(${ALLOWED_PROPERTIES.join('|')}):`);
        const match = valRaw.match(missingSemiRegex);

        if (match && match.index !== undefined) {
          const matchIndex = match.index;
          const valStartIndex = declGlobalIndex + propRaw.length + 1;
          const errorLine = getLineNum(valStartIndex + matchIndex);

          newErrors.push({
            id: `missing-semi-${index}-${dIndex}`,
            msg: `Missing semicolon before property "${match[1]}".`,
            line: errorLine
          });
        }
      }

      if (properties[prop]) {
        newErrors.push({ id: `prop-dup-${index}-${dIndex}`, msg: `Duplicate property "${prop}"`, line: declLine });
        return;
      }

      if (!ALLOWED_PROPERTIES.includes(prop)) {
        newErrors.push({ id: `prop-unknown-${index}-${dIndex}`, msg: `Unknown property "${prop}"`, line: declLine });
      }

      let parsedValue: ParsedValue = { raw: val, base: '', variants: [] };

      if (val.includes('@')) {
        const parts = val.split('@');
        parsedValue.base = parts[0];

        const breakpoints: ParsedBreakpoint[] = [];
        for (let i = 1; i < parts.length; i++) {
          const part = parts[i];
          if (!part.includes(':')) {
            newErrors.push({
              id: `bp-incomplete-${index}-${dIndex}-${i}`,
              msg: `Breakpoint @${part.substring(0, 5)}... incomplete.`,
              line: declLine
            });
            continue;
          }
          const [bpKey, bpVal] = part.split(/:(.*)/s);
          const bpRegex = /^\d+[lp]?$/;
          if (!bpRegex.test(bpKey)) {
            newErrors.push({
              id: `bp-key-invalid-${index}-${dIndex}-${i}`,
              msg: `Invalid breakpoint "@${bpKey}".`,
              line: declLine
            });
          }
          if (!bpVal || bpVal.trim() === '') {
            newErrors.push({
              id: `bp-val-empty-${index}-${dIndex}-${i}`,
              msg: `Empty value for breakpoint "@${bpKey}".`,
              line: declLine
            });
          }
          breakpoints.push({ bp: bpKey, val: bpVal });
        }
        parsedValue.variants = breakpoints;
      } else {
        parsedValue.base = val;
      }

      if (parsedValue.base.startsWith('~v:')) parsedValue.type = 'variable';
      else if (parsedValue.base.startsWith('~f:')) parsedValue.type = 'function';
      else if (parsedValue.base.includes('~')) parsedValue.type = 'color-mode';
      else parsedValue.type = 'simple';

      properties[prop] = parsedValue;
    });

    newParsedData.push({
      selector,
      properties,
      valid: !newErrors.some(e => e.id.includes(`-${index}-`) || e.id.includes(`-${index}`))
    });
  });

  const openBrackets = (input.match(/{/g) || []).length;
  const closeBrackets = (input.match(/}/g) || []).length;
  if (openBrackets !== closeBrackets) {
    newErrors.push({ id: 'bracket-mismatch', msg: `Mismatched brackets.`, line: input.split('\n').length - 1 });
  }

  return { parsedData: newParsedData, errors: newErrors };
};


// --- Syntax Highlighter ---
// const highlightSyntax = (code: string): string => {
//   const tokenRegex = /(\/\*[\s\S]*?\*\/)|({|}|;)|((?:^|[\n}])[^{}:;]+(?=\{))|(\b[a-zA-Z0-9_-]+\b(?=\s*:))|(@\d+[lp]?)|(~v:[a-zA-Z0-9_]+)|(~f:[^;@\n}]+)|(#[0-9a-fA-F]{3,6}~#[0-9a-fA-F]{3,6})/g;
//   const escaped = escapeHtml(code);
//   let highlighted = escaped.replace(tokenRegex, (match, comment, structure, selector, prop, bp, variable, func, colorMode) => {
//     if (comment) return `<span class="token-comment">${comment}</span>`;
//     if (structure) return `<span class="token-structure">${structure}</span>`;
//     if (selector) return `<span class="token-selector">${selector}</span>`;
//     if (prop) return `<span class="token-prop">${prop}</span>`;
//     if (bp) return `<span class="token-bp">${bp}</span>`;
//     if (variable) return `<span class="token-variable">${variable}</span>`;
//     if (func) return `<span class="token-func">${func}</span>`;
//     if (colorMode) return `<span class="token-colormode">${colorMode}</span>`;
//     return match;
//   });

//   // FIX: Handle trailing newline to match textarea behavior
//   if (code.endsWith('\n')) {
//     highlighted += '<br />';
//   }
//   return highlighted;
// };

const highlightSyntaxJSX = (code: string) => {
  const tokenRegex = /(\/\*[\s\S]*?\*\/)|({|}|;)|((?:^|[\n}])[^{}:;]+(?=\{))|(\b[a-zA-Z0-9_-]+\b(?=\s*:))|(@\d+[lp]?)|(~v:[a-zA-Z0-9_]+)|(~f:[^;@\n}]+)|(#[0-9a-fA-F]{3,6}~#[0-9a-fA-F]{3,6})/g;

  const escaped = escapeHtml(code);

  const parts = [];
  let lastIndex = 0;

  escaped.replace(tokenRegex, (match, comment, structure, selector, prop, bp, variable, func, colorMode, offset) => {
    // push text before token
    if (offset > lastIndex) {
      parts.push(escaped.slice(lastIndex, offset));
    }

    let className = "";
    if (comment) className = styles.token_comment;
    else if (structure) className = styles.token_structure;
    else if (selector) className = styles.token_selector;
    else if (prop) className = styles.token_prop;
    else if (bp) className = styles.token_bp;
    else if (variable) className = styles.token_variable;
    else if (func) className = styles.token_func;
    else if (colorMode) className = styles.token_colormode;

    parts.push(<span className={className}>{match}</span>);
    lastIndex = offset + match.length;
    return "";
  });

  // remaining text
  if (lastIndex < escaped.length) {
    parts.push(escaped.slice(lastIndex));
  }

  return parts;
};


// --- Main Component ---

export default function App({ initCode, onChange }: { initCode: string, onChange: (d:string)=> void }) {
  const [code, setCode] = useState<string>(initCode);
  const debouncedCode = useDebounce<string>(code, 300);
  const ICON_OFFSET = 6;

  const [parsedData, setParsedData] = useState<ParsedBlock[]>([]);
  const [errors, setErrors] = useState<ParserError[]>([]);

  const [cursorPos, setCursorPos] = useState<number>(0);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [isInsideBlock, setIsInsideBlock] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestionFilter, setSuggestionFilter] = useState<string>('');
  const [usedProperties, setUsedProperties] = useState<Set<string>>(new Set());
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [pasteError, setPasteError] = useState<string | null>(null);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null); // New state for line highlight

  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'validation' | 'ast'>('validation');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterContainerRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate line numbers array
  const lineNumbers = useMemo(() => {
    return Array.from({ length: code.split('\n').length }, (_, i) => i + 1);
  }, [code]);

  useEffect(() => {
    const { parsedData: pd, errors: errs } = analyzeCode(debouncedCode);
    setParsedData(pd);
    setErrors(errs);

    // send update
    if( !errs.length ) {
      onChange(code);
    }
    
  }, [debouncedCode]);

  const highlightedCode = useMemo(() => highlightSyntaxJSX(code), [code]);

  const calculateMenuPosition = useCallback(() => {
    if (!textareaRef.current) return null;

    const rect = textareaRef.current.getBoundingClientRect();
    const scrollTop = textareaRef.current.scrollTop;

    const relativeTop = PADDING_TOP + ((activeLine + 1) * LINE_HEIGHT);
    let top = rect.top + relativeTop - scrollTop;
    const left = rect.left + 20;

    const menuHeight = 200;
    let direction: 'up' | 'down' = 'down';

    if (top + menuHeight > window.innerHeight) {
      top = rect.top + relativeTop - LINE_HEIGHT - scrollTop - menuHeight;
      direction = 'up';
    }

    setMenuPosition({ top, left, direction });
  }, [activeLine]);

  useEffect(() => {
    if (showSuggestions) {
      calculateMenuPosition();
    }
  }, [showSuggestions, activeLine, calculateMenuPosition]);


  const getUsedProperties = (text: string, pos: number): Set<string> => {
    const textBefore = text.substring(0, pos);
    const lastOpenBrace = textBefore.lastIndexOf('{');
    if (lastOpenBrace === -1) return new Set();

    const textAfter = text.substring(pos);
    let nextCloseBrace = textAfter.indexOf('}');
    if (nextCloseBrace === -1) nextCloseBrace = textAfter.length;

    const blockContentStart = text.substring(lastOpenBrace + 1, pos);
    const blockContentEnd = textAfter.substring(0, nextCloseBrace);
    const fullBlockContent = blockContentStart + blockContentEnd;
    const cleanContent = fullBlockContent.replace(/\/\*[\s\S]*?\*\//g, '');

    const used = new Set<string>();
    const decls = cleanContent.split(';');
    decls.forEach(d => {
      const parts = d.split(':');
      if (parts.length > 1) {
        const key = parts[0].trim();
        if (key) used.add(key);
      }
    });
    return used;
  };

  const updateCursorContext = useCallback((pos: number, text: string = code) => {
    setCursorPos(pos);
    const textBefore = text.substring(0, pos);
    const lineIndex = textBefore.split('\n').length - 1;
    setActiveLine(lineIndex);

    const openCount = (textBefore.match(/{/g) || []).length;
    const closeCount = (textBefore.match(/}/g) || []).length;
    const inside = openCount > closeCount;
    setIsInsideBlock(inside);

    if (inside) {
      setUsedProperties(getUsedProperties(text, pos));
    } else {
      setUsedProperties(new Set());
    }

    return { inside };
  }, [code]);

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardText = e.clipboardData.getData('text');
    if (!clipboardText) return;

    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const currentCode = code;
    const newCode = currentCode.substring(0, start) + clipboardText + currentCode.substring(end);

    const { errors: currentErrors } = analyzeCode(currentCode);
    const { errors: potentialErrors } = analyzeCode(newCode);

    if (potentialErrors.length > currentErrors.length) {
      e.preventDefault();
      setPasteError(`Paste Blocked: Introduces ${potentialErrors.length - currentErrors.length} new error(s).`);
      setTimeout(() => setPasteError(null), 3000);
    } else {
      setPasteError(null);
    }
  };

  const handleCursorActivity = (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    const pos = target.selectionStart;
    const val = target.value;
    const { inside } = updateCursorContext(pos, val);

    if (!inside && showSuggestions) setShowSuggestions(false);
  };

  const handleEditorClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    const pos = target.selectionStart;
    const val = target.value;
    updateCursorContext(pos, val);
    if (showSuggestions) setShowSuggestions(false);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCode(val);
    const pos = e.target.selectionStart;
    const { inside } = updateCursorContext(pos, val);

    if (inside) {
      const textBefore = val.substring(0, pos);
      const lastSegment = textBefore.split(/[{;]/).pop();
      if (lastSegment && !lastSegment.includes(':') && lastSegment.trim().length > 0) {
        const currentWord = lastSegment.trim();
        setSuggestionFilter(currentWord);
      }
    }
  };

  const insertSuggestion = (prop: string) => {
    const textBefore = code.substring(0, cursorPos);
    const textAfter = code.substring(cursorPos);
    const lastPuncIndex = Math.max(textBefore.lastIndexOf('{'), textBefore.lastIndexOf(';'), textBefore.lastIndexOf('\n'));
    const safeStart = lastPuncIndex === -1 ? 0 : lastPuncIndex + 1;
    const prefix = textBefore.substring(0, safeStart);
    const newText = `${prefix}\n  ${prop}: `;

    const newCode = newText + textAfter;
    setCode(newCode);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = newText.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
    setShowSuggestions(false);
  };

  const handleMarkerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSuggestionFilter('');
    calculateMenuPosition();
    setShowSuggestions(!showSuggestions);
  };

  const handleErrorEnter = (e: React.MouseEvent<HTMLDivElement>, msg: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ x: rect.right + 10, y: rect.top, msg: msg });
  };

  // --- Error Click Logic (Scroll & Highlight) ---
  const jumpToLine = (lineNumber: number) => {
    // 1. Set Highlight
    setHighlightedLine(lineNumber);

    // 2. Scroll to position
    if (textareaRef.current) {
      const targetScroll = (lineNumber * LINE_HEIGHT) - (textareaRef.current.clientHeight / 2) + PADDING_TOP;
      textareaRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }

    // 3. Remove Highlight after 1.5s
    setTimeout(() => setHighlightedLine(null), 1500);
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target as Node) &&
        suggestionRef.current && !suggestionRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleGlobalClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = target.scrollTop;
      preRef.current.scrollLeft = target.scrollLeft;
    }

    // FIX: Use gutterContainerRef for scroll syncing instead of gutterRef transform
    if (gutterContainerRef.current) {
      gutterContainerRef.current.scrollTop = target.scrollTop;
    }

    // Sync decoration layer
    if (decorationRef.current) {
      decorationRef.current.style.transform = `translateY(-${target.scrollTop}px)`;
    }
    if (showSuggestions) setShowSuggestions(false);
    if (tooltip) setTooltip(null);
  };

  return (
    <div className={styles.cse_app}>

      {/* --- HEADER BAR (32px) --- */}
      <div className={styles.cse_header_bar}>
        <CodeIcon width="14" height="14" style={{ color: '#007acc' }} />
        <span className={styles.cse_header_title}>design.axd</span>
        <span className={styles.cse_header_status}>
          {code === debouncedCode ? 'Saved' : 'Editing...'}
        </span>
      </div>

      <div className={styles.cse_main_area}>
        <div ref={containerRef} className={styles.cse_editor_container}>

          {/* GUTTER CONTAINER */}
          <div ref={gutterContainerRef} className={styles.cse_gutter}>
            <div
              className={styles.cse_gutter_content}
              style={{ paddingTop: `${PADDING_TOP}px`, paddingBottom: '30px' }}
            >

              {/* Line Numbers + Error Icons */}
              {lineNumbers.map((n, idx) => {
                const errorForLine = errors.find(e => e.line === idx);
                return (
                  <div key={n} className={styles.cse_line_row}>

                    <span className={styles.cse_gutter_icon_container}>
                      {errorForLine && (
                        <div
                          className={styles.cse_error_icon}
                          onMouseEnter={(e) => handleErrorEnter(e, errorForLine.msg)}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <ExclamationTriangleIcon width="12" height="12" />
                        </div>
                      )}
                    </span>

                    <span className={styles.cse_line_num}>{n}</span>
                  </div>
                );
              })}

              {/* Absolute Positioned Marker */}
              {isInsideBlock && (
                <button
                  onClick={handleMarkerClick}
                  className={styles.cse_marker_btn}
                  style={{
                    top: `${(activeLine * LINE_HEIGHT) + ICON_OFFSET + PADDING_TOP}px`
                  }}
                  title="Add Property"
                >
                  +
                </button>
              )}
            </div>
          </div>

          {/* EDITOR */}
          <div className={styles.cse_editor_canvas}>

            {/* Highlight Layer */}
            <div ref={decorationRef} className={styles.cse_decoration_layer}>
              {highlightedLine !== null && (
                <div
                  className={styles.cse_line_highlight}
                  style={{ top: `${(highlightedLine * LINE_HEIGHT) + PADDING_TOP}px` }}
                />
              )}
            </div>

            {/* <pre
            ref={preRef}
            className={styles.cse_overlay}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          /> */}
            <pre ref={preRef}
              className={styles.cse_overlay}
            >{highlightedCode}</pre>


            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleTyping}
              onPaste={handlePaste}
              onKeyUp={handleCursorActivity}
              onClick={handleEditorClick}
              onScroll={handleScroll}
              spellCheck="false"
              className={styles.cse_input}
              placeholder="Start typing..."
            />

            {/* SUGGESTIONS MENU */}
            {showSuggestions && menuPosition && (
              <div
                ref={suggestionRef}
                className={styles.cse_suggestions}
                style={{
                  top: menuPosition.direction === 'down' ? `${menuPosition.top}px` : 'auto',
                  bottom: menuPosition.direction === 'up' ? `${menuPosition.bottom}px` : 'auto',
                  left: `${menuPosition.left}px`,
                  borderBottom: menuPosition.direction === 'up' ? 'none' : '1px solid #454545',
                  borderTop: menuPosition.direction === 'up' ? '1px solid #454545' : 'none'
                }}
              >
                {ALLOWED_PROPERTIES
                  .filter(p => p.startsWith(suggestionFilter))
                  .filter(p => !usedProperties.has(p))
                  .map(p => (
                    <button
                      key={p}
                      onClick={() => insertSuggestion(p)}
                      className={styles.cse_suggestion_btn}
                    >
                      {p}
                    </button>
                  ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* --- BOTTOM OUTPUT PANEL --- */}
      <div
        className={styles.cse_bottom_panel}
        style={{ height: isBottomPanelOpen ? '200px' : '28px' }}
      >
        <div
          className={styles.cse_bottom_header}
          onClick={() => setIsBottomPanelOpen(!isBottomPanelOpen)}
        >
          <div className={styles.cse_bottom_title}>
            {isBottomPanelOpen
              ? <ChevronDownIcon width="12" height="12" />
              : <ChevronUpIcon width="12" height="12" />
            }
            <span>Output</span>
          </div>

          <div className={styles.cse_bottom_title} style={{ marginLeft: '20px', gap: '10px' }}>

            <span
              className={`${styles.cse_tab} ${activeBottomTab === 'validation' ? styles.active : ''}`}
              onClick={(e) => { e.stopPropagation(); setActiveBottomTab('validation'); setIsBottomPanelOpen(true); }}
            >
              Problems {errors.length > 0 && `(${errors.length})`}
            </span>

            <span
              className={`${styles.cse_tab} ${activeBottomTab === 'ast' ? styles.active : ''}`}
              onClick={(e) => { e.stopPropagation(); setActiveBottomTab('ast'); setIsBottomPanelOpen(true); }}
            >
              Parsed AST
            </span>

          </div>
        </div>

        {isBottomPanelOpen && (
          <div className={styles.cse_panel_content}>

            {activeBottomTab === 'validation' ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>

                {errors.length === 0 ? (
                  <div className={styles.cse_error_row} style={{ color: '#4ec9b0' }}>
                    <CheckIcon width="12" height="12" style={{ marginRight: 6 }} /> No problems found.
                  </div>
                ) : (
                  errors.map((err, i) => (
                    <div
                      key={i}
                      className={`${styles.cse_error_row} ${styles.error}`}
                      onClick={() => jumpToLine(err.line)}
                    >
                      <ExclamationTriangleIcon width="12" height="12" />
                      <span>[{err.line + 1}] {err.msg}</span>
                    </div>
                  ))
                )}

              </div>
            ) : (
              // AST VIEW
              <div>
                {parsedData.map((block, idx) => (
                  <div key={idx} className={styles.cse_ast_item}>
                    cse_ast_selector
                    <span>{block.selector}</span> {'{'}
                    <div>
                      {Object.entries(block.properties).map(([k, v]) => (
                        <div key={k}>
                          <span>{k}</span>:
                          <span> {v.raw}</span>;
                        </div>
                      ))}
                    </div>
                    {'}'}

                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>

      {/* TOOLTIP */}
      {tooltip && (
        <div
          className={styles.cse_tooltip_popup}
          style={{ left: tooltip.x + 10, top: tooltip.y }}
        >
          {tooltip.msg}
        </div>
      )}

      {/* PASTE TOAST */}
      {pasteError && (
        <div className={styles.cse_paste_toast}>
          <SlashIcon width="12" height="12" /> {pasteError}
        </div>
      )}

    </div>
  );

}