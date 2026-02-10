"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[625],{

/***/ 8355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  $5: () => (/* binding */ colorBlock),
  KW: () => (/* binding */ colorPresets),
  M6: () => (/* binding */ colorsBlock),
  yB: () => (/* binding */ componentsBlock),
  Ay: () => (/* binding */ assets),
  bd: () => (/* binding */ fontBlock),
  AG: () => (/* binding */ fontsBlock)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/BlockEditor/Blocks/blockTemplate.tsx
var blockTemplate = __webpack_require__(6118);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs
var IconCheck = __webpack_require__(899);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconFolder.mjs
var IconFolder = __webpack_require__(1081);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconColorSwatch.mjs
var IconColorSwatch = __webpack_require__(7394);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconDroplet.mjs
var IconDroplet = __webpack_require__(6005);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconFileTypography.mjs
var IconFileTypography = __webpack_require__(4892);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconFolderStar.mjs
var IconFolderStar = __webpack_require__(685);
// EXTERNAL MODULE: ./src/BlockEditor/EditorContext.tsx + 1 modules
var EditorContext = __webpack_require__(4970);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Input/Input.mjs + 9 modules
var Input = __webpack_require__(6214);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs + 7 modules
var Tooltip = __webpack_require__(2335);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Select/Select.mjs + 1 modules
var Select = __webpack_require__(5447);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Loader/Loader.mjs + 4 modules
var Loader = __webpack_require__(4952);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.mjs + 9 modules
var MultiSelect = __webpack_require__(2538);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 48 modules
var axios = __webpack_require__(1083);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/fontPicker/useGoogleFonts.ts
// useGoogleFonts.ts


const GOOGLE_FONTS_API_URL = "https://www.googleapis.com/webfonts/v1/webfonts";
const API_KEY = "AIzaSyAMc1g9duz6Qy7OQ5rBMalGvEMxQJ94LmQ";
const useGoogleFonts = () => {
  const [googleFonts, setGoogleFonts] = (0,external_React_.useState)({});
  const [loading, setLoading] = (0,external_React_.useState)(true);
  const [error, setError] = (0,external_React_.useState)(null);
  (0,external_React_.useEffect)(() => {
    axios/* default */.A.get(`${GOOGLE_FONTS_API_URL}?key=${API_KEY}`).then(response => {
      const fonts = response.data.items.reduce((acc, font) => {
        acc[font.family] = {
          label: font.family,
          variants: font.variants,
          category: font.category
        };
        return acc;
      }, {});
      setGoogleFonts(fonts);
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching Google Fonts:", err);
      setError("Failed to load fonts");
      setLoading(false);
    });
  }, []);
  return {
    googleFonts,
    loading,
    error
  };
};
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/fontPicker/FontPicker.tsx



const transformVariants = variants => {
  return variants.map(v => ({
    value: v,
    label: v.replace("italic", " Italic").replace("regular", "400")
  }));
};
function FontPicker(_ref) {
  let {
    value,
    onChange
  } = _ref;
  const {
    googleFonts,
    loading,
    error
  } = useGoogleFonts();

  // -----------------------------
  // Font family options
  // -----------------------------
  const fontOptions = external_React_default().useMemo(() => Object.keys(googleFonts).map(family => ({
    value: family,
    label: `${family} (${googleFonts[family].category})`
  })), [googleFonts]);

  // -----------------------------
  // Current value (safe defaults)
  // -----------------------------
  const [family = "", category = "", variants = []] = value || [];
  const currentFont = family ? googleFonts[family] : undefined;

  // -----------------------------
  // Variant options
  // -----------------------------
  const variantOptions = external_React_default().useMemo(() => currentFont ? transformVariants(currentFont.variants) : [], [currentFont]);

  // -----------------------------
  // 🔒 Sanitize variants (CRITICAL)
  // -----------------------------
  const safeVariants = external_React_default().useMemo(() => {
    if (!currentFont) return [];
    const allowed = new Set(currentFont.variants);
    return variants.filter(v => allowed.has(v));
  }, [variants, currentFont]);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleFamilyChange = newFamily => {
    if (!newFamily) return;
    const font = googleFonts[newFamily];
    if (!font) return;
    const defaultVariant = font.variants.includes("regular") ? "regular" : font.variants[0];
    onChange([newFamily, font.category, [defaultVariant]]);
  };
  const handleVariantChange = newVariants => {
    if (!currentFont) return;
    onChange([family, category, newVariants]);
  };

  // -----------------------------
  // Loading / Error states
  // -----------------------------
  if (loading) return /*#__PURE__*/external_React_default().createElement(Loader/* Loader */.a, {
    size: "sm"
  });
  if (error) return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      color: "red"
    }
  }, error);

  // -----------------------------
  // Render
  // -----------------------------
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    searchable: true,
    placeholder: "Select font",
    data: fontOptions,
    value: family || null,
    onChange: handleFamilyChange,
    nothingFoundMessage: "No fonts found",
    clearable: false,
    size: 'xs'
  }), /*#__PURE__*/external_React_default().createElement(MultiSelect/* MultiSelect */.K, {
    disabled: !currentFont,
    placeholder: "Select variants",
    data: variantOptions,
    value: safeVariants,
    onChange: handleVariantChange,
    searchable: true,
    nothingFoundMessage: "No variants",
    size: 'xs'
  }));
}
/* harmony default export */ const fontPicker_FontPicker = (FontPicker);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/css/assets.module.css
var assets_module = __webpack_require__(633);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/css/assets.module.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(assets_module/* default */.Ay, options);




       /* harmony default export */ const css_assets_module = (assets_module/* default */.Ay && assets_module/* default */.Ay.locals ? assets_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./src/BlockEditor/util/blockDataUtils.ts
var blockDataUtils = __webpack_require__(3545);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/assets.tsx
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }








const tooltipProps = {
  color: "dark",
  position: "right",
  offset: 6,
  style: {
    fontSize: '10px',
    border: '1px solid #666'
  },
  transitionProps: {
    transition: 'pop',
    duration: 300
  }
};
const colorPresets = {
  neutral: ["#ffffff", "#e6e6e6", "#cccccc", "#b3b3b3", "#999999", "#808080", "#666666", "#4d4d4d", "#333333", "#000000"],
  gray: ["#f8f9fa", "#f1f3f5", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#868e96", "#495057", "#343a40", "#212529"],
  red: ["#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#fa5252", "#f03e3e", "#e03131", "#c92a2a"],
  pink: ["#fff0f6", "#ffdeeb", "#fcc2d7", "#faa2c1", "#f783ac", "#f06595", "#e64980", "#d6336c", "#c2255c", "#a61e4d"],
  grape: ["#f8f0fc", "#f3d9fa", "#eebefa", "#e599f7", "#da77f2", "#cc5de8", "#be4bdb", "#ae3ec9", "#9c36b5", "#862e9c"],
  violet: ["#f3f0ff", "#e5dbff", "#d0bfff", "#b197fc", "#9775fa", "#845ef7", "#7950f2", "#7048e8", "#6741d9", "#5f3dc4"],
  indigo: ["#edf2ff", "#dbe4ff", "#bac8ff", "#91a7ff", "#748ffc", "#5c7cfa", "#4c6ef5", "#4263eb", "#3b5bdb", "#364fc7"],
  blue: ["#e7f5ff", "#d0ebff", "#a5d8ff", "#74c0fc", "#4dabf7", "#339af0", "#228be6", "#1c7ed6", "#1971c2", "#1864ab"],
  cyan: ["#e3fafc", "#c5f6fa", "#99e9f2", "#66d9e8", "#3bc9db", "#22b8cf", "#15aabf", "#1098ad", "#0c8599", "#0b7285"],
  teal: ["#e6fcf5", "#c3fae8", "#96f2d7", "#63e6be", "#38d9a9", "#20c997", "#12b886", "#0ca678", "#099268", "#087f5b"],
  green: ["#ebfbee", "#d3f9d8", "#b2f2bb", "#8ce99a", "#69db7c", "#51cf66", "#40c057", "#37b24d", "#2f9e44", "#2b8a3e"],
  lime: ["#f4fce3", "#e9fac8", "#d8f5a2", "#c0eb75", "#a9e34b", "#94d82d", "#82c91e", "#74b816", "#66a80f", "#5c940d"],
  yellow: ["#fff9db", "#fff3bf", "#ffec99", "#ffe066", "#ffd43b", "#fcc419", "#fab005", "#f59f00", "#f08c00", "#e67700"],
  orange: ["#fff4e6", "#ffe8cc", "#ffd8a8", "#ffc078", "#ffa94d", "#ff922b", "#fd7e14", "#f76707", "#e8590c", "#d9480f"]
};
const ColorPickSection = _ref => {
  let {
    id,
    block,
    updated
  } = _ref;
  const {
    pageBlocks
  } = (0,EditorContext/* useEditorContext */.m)();
  const colors = pageBlocks.current.get(block.p || '')?.c || [];
  const colorNames = colors.filter(_id => _id !== id) // remove current
  .map(_id => pageBlocks.current.get(_id)?.l).filter(Boolean); // remove null/undefined

  const [isValidColor, setIsValidColor] = (0,external_React_.useState)(true);
  const [newColorName, setNewColorName] = (0,external_React_.useState)(block.l);
  const [mounted, setMounted] = (0,external_React_.useState)(false);
  const systemRoles = ['text', 'background'];
  (0,external_React_.useEffect)(() => {
    setMounted(true);
  }, []);
  (0,external_React_.useEffect)(() => {
    if (!mounted) {
      return;
    }
    if (newColorName) {
      const isValid = colorNames.includes(newColorName) ? false : true;
      setIsValidColor(isValid);
      if (isValid) {
        block.l = newColorName;
        updated();
      }
    }
  }, [newColorName]);

  // space → dash, allow only English letters and dash
  const sanitizeName = v => v.replace(/\s+/g, '-') // convert spaces to dash
  .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash

  const handleColorName = v => {
    const sanitized = sanitizeName(v);
    setNewColorName(sanitized);
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Color Role"), systemRoles.includes(newColorName || '') ? /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 15,
      height: 30,
      padding: '0px 12px',
      fontSize: 12
    }
  }, newColorName) : /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    error: newColorName && !isValidColor,
    onChange: e => handleColorName(e.currentTarget.value),
    value: newColorName
  }));
};
const PresetSection = _ref2 => {
  let {
    id,
    block,
    updated
  } = _ref2;
  const handleAddPresset = preset => {
    if (block.data?.options) {
      block.data.options.p = {
        value: [...colorPresets[preset]],
        vs: 'm'
      };
      updated();
    }
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, Object.keys(colorPresets)?.map((preset, i) => {
    const colorPreset = colorPresets[preset];
    const tipProps = tooltipProps;
    const active = [...(block?.data?.options?.p?.value || [])].join() === [...colorPreset].join();
    return /*#__PURE__*/external_React_default().createElement(Tooltip/* Tooltip */.m, _extends({
      key: i,
      label: preset
    }, tipProps, {
      position: "bottom",
      offset: 2
    }), /*#__PURE__*/external_React_default().createElement("div", {
      className: assets_module/* colorPresetBlock */.O4,
      style: {
        background: colorPreset[6]
      },
      onClick: () => handleAddPresset(preset)
    }, active && /*#__PURE__*/external_React_default().createElement("div", {
      className: assets_module/* colorPresetBlock_active */.Pw,
      style: {
        color: colorPreset[2],
        background: colorPreset[8]
      }
    }, /*#__PURE__*/external_React_default().createElement(IconCheck/* default */.A, {
      stroke: 1.6,
      size: 14
    })), /*#__PURE__*/external_React_default().createElement("div", {
      className: assets_module/* colorPresetBlockStrip */.I8
    }, colorPreset.map((item, idx) => /*#__PURE__*/external_React_default().createElement("div", {
      key: item + idx,
      className: assets_module/* colorPresetBlockStripItem */.$d,
      style: {
        background: item
      }
    })))));
  }));
};
const ColorModeSection = _ref3 => {
  let {
    id,
    block,
    updated
  } = _ref3;
  const {
    pageBlocks,
    colorMode,
    setColorMode
  } = (0,EditorContext/* useEditorContext */.m)();
  const assetsBlock = pageBlocks.current.get(block.p);
  (0,blockDataUtils/* default */.A)(assetsBlock);
  const options = assetsBlock.data?.options?.default?.value;
  const setOption = (key, value) => {
    options[key] = value;
    updated();
  };
  const handleColorModeChange = (control, value) => {
    if (control === 'tcme') {
      // if only one mode is enabled, force default
      if (value !== 'ld') {
        setColorMode(value); // set Editor color mode
        setOption('tcmd', value);
      }
      setOption('tcme', value);
      return;
    }
    setColorMode(value === 'a' ? 'd' : value); // set Editor color mode
    setOption('tcmd', value);
  };
  const getValue = key => {
    return options?.[key] || '';
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 11,
      gap: 4,
      marginBottom: 4
    }
  }, /*#__PURE__*/external_React_default().createElement("span", null, "Modes"), /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    size: "xs",
    radius: "lg",
    data: [{
      label: 'Light',
      value: 'l'
    }, {
      label: 'Dark',
      value: 'd'
    }, {
      label: 'Light + Dark',
      value: 'ld'
    }],
    value: getValue('tcme'),
    onChange: v => handleColorModeChange('tcme', v),
    checkIconPosition: "right",
    allowDeselect: false
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 11,
      gap: 4,
      marginBottom: 4
    }
  }, /*#__PURE__*/external_React_default().createElement("span", null, "Default"), /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    size: "xs",
    radius: "lg",
    data: [{
      label: 'Light',
      value: 'l'
    }, {
      label: 'Dark',
      value: 'd'
    }, {
      label: 'Auto',
      value: 'a'
    }],
    allowDeselect: false,
    value: getValue('tcmd'),
    onChange: v => handleColorModeChange('tcmd', v),
    disabled: getValue('tcme') !== 'ld',
    checkIconPosition: "right"
  })));
};

// Initial block configuration
const config = {
  title: 'Design Assets',
  icon: /*#__PURE__*/external_React_default().createElement(IconFolder/* default */.A, null),
  cats: [''],
  type: 'a',
  children: true,
  rootAllow: false,
  childCats: ['assets'],
  limitInParent: 1,
  props: {
    options: 'p=(x:100,y:100);default=(tcme:ld,tcmd:d,cbid:null,fbid:null,bc:null,tc:null,ac:null,bf:null,hf:null);lfu=1'
  },
  designSections: null,
  lock: 'dmr'
};
const block = new blockTemplate/* Block */.e(config);
/* harmony default export */ const assets = (block);
const colorsConfig = {
  title: 'Colors',
  icon: /*#__PURE__*/external_React_default().createElement(IconColorSwatch/* default */.A, null),
  cats: ['assets'],
  type: 'cs',
  children: true,
  rootAllow: false,
  limitInParent: 1,
  childCats: ['color'],
  props: {},
  designSections: null,
  optionSections: [{
    label: 'Color Mode',
    component: ColorModeSection
  }],
  lock: 'dmr'
};
const colorsBlock = new blockTemplate/* Block */.e(colorsConfig);
const colorConfig = {
  title: 'Color',
  icon: /*#__PURE__*/external_React_default().createElement(IconDroplet/* default */.A, null),
  cats: ['color'],
  type: 'c',
  children: false,
  rootAllow: false,
  props: {
    options: `p=[${colorPresets.neutral.join()}];`
  },
  designSections: null,
  optionSections: [{
    label: 'Color Details',
    component: ColorPickSection
  }, {
    label: 'Presets',
    component: PresetSection
  }]
};
const colorBlock = new blockTemplate/* Block */.e(colorConfig);
const fontsConfig = {
  title: 'Fonts',
  icon: /*#__PURE__*/external_React_default().createElement(IconFolder/* default */.A, null),
  cats: ['assets'],
  type: 'fs',
  children: true,
  rootAllow: false,
  limitInParent: 1,
  childCats: ['font'],
  props: {},
  designSections: null,
  lock: 'dmr'
};
const fontsBlock = new blockTemplate/* Block */.e(fontsConfig);

/**
 * Font Controls Section
 * @returns 
 */
const FontPickSection = _ref4 => {
  let {
    id,
    block,
    updated
  } = _ref4;
  const {
    pageBlocks,
    editingDesignId
  } = (0,EditorContext/* useEditorContext */.m)();
  const handleChange = (value, property) => {
    if (!block) {
      return;
    }
    if (value && block.data?.options) {
      if (block.data?.options?.[property]) {
        block.data.options[property].value = value;
      } else {
        // add property
        block.data.options[property] = {
          value
        };
      }
    }
    handleUpdateAssetsOptions();
    updated();
  };
  const handleUpdateAssetsOptions = () => {
    // lfu
    const designBlock = pageBlocks.current.get(editingDesignId || "");
    if (designBlock) (0,blockDataUtils/* default */.A)(designBlock);
    const assetId = designBlock?.data?.options?.assid?.value;
    const assetBlock = pageBlocks.current.get(assetId);
    const options = assetBlock?.data?.options;
    if (options) {
      options.lfu = {
        vs: 'm',
        value: Date.now()
      };
    }
    updated();
  };
  const getValue = property => {
    return block.data?.options?.[property].value || '';
  };
  const fonts = pageBlocks.current.get(block.p || '')?.c || [];
  const colorNames = fonts.filter(_id => _id !== id) // remove current
  .map(_id => pageBlocks.current.get(_id)?.l).filter(Boolean); // remove null/undefined

  const [isValidFont, setIsValidFont] = (0,external_React_.useState)(true);
  const [newFontName, setNewFontName] = (0,external_React_.useState)(block.l);
  const [mounted, setMounted] = (0,external_React_.useState)(false);
  (0,external_React_.useEffect)(() => {
    setMounted(true);
  }, []);
  (0,external_React_.useEffect)(() => {
    if (!mounted) {
      return;
    }
    if (newFontName) {
      const isValid = colorNames.includes(newFontName) ? false : true;
      setIsValidFont(isValid);
      if (isValid) {
        block.l = newFontName;
        updated();
      }
    }
  }, [newFontName]);

  // space → dash, allow only English letters and dash
  const sanitizeName = v => v.replace(/\s+/g, '-') // convert spaces to dash
  .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash

  const handleFontName = v => {
    const sanitized = sanitizeName(v);
    setNewFontName(sanitized);
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Font"), /*#__PURE__*/external_React_default().createElement(fontPicker_FontPicker, {
    onChange: v => {
      handleChange(v, 'f');
    },
    value: getValue('f')
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Font Name"), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    error: newFontName && !isValidFont,
    onChange: e => handleFontName(e.currentTarget.value),
    value: newFontName
  })));
};
const fontConfig = {
  title: 'Font',
  icon: /*#__PURE__*/external_React_default().createElement(IconFileTypography/* default */.A, null),
  cats: ['font'],
  type: 'f',
  children: false,
  rootAllow: false,
  props: {
    options: 'f=["Oswald","sans-serif",["regular"]]'
  },
  designSections: null,
  optionSections: [{
    label: 'Font Details',
    component: FontPickSection
  }]
};

// Create a new block instance
const fontBlock = new blockTemplate/* Block */.e(fontConfig);
const componentsConfig = {
  title: 'Components',
  icon: /*#__PURE__*/external_React_default().createElement(IconFolderStar/* default */.A, null),
  cats: ['assets'],
  type: 'cos',
  children: true,
  rootAllow: false,
  limitInParent: 1,
  childCats: ['co'],
  props: {},
  designSections: null,
  lock: 'dmri'
};
const componentsBlock = new blockTemplate/* Block */.e(componentsConfig);

/***/ }),

/***/ 6118:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ Block)
/* harmony export */ });
// Define types for props and settings

// Default, Medium, Small

// export interface DesignTypes {
//     st?: DesignProperty,
//     an?: DesignProperty
// }

/**
 * Represents an animated property value with animated values and transition settings.
 * 
 * @type {AnimatedPropertyValue}
 * @tuple
 * @property {any[]} [0] - Array of animated values.
 * @property {Transition} [1] - Transition settings for animations.
 */

/**
 * d: delete | m: move r: rename | i: insert
 */

// Define a block class to handle adding tabs, sections, controls, and props
class Block {
  constructor(config) {
    this.title = config.title;
    this.icon = config.icon;
    this.cats = config.cats;
    this.type = config.type;
    this.rootAllow = config.rootAllow;
    this.layoutType = config.layoutType;
    this.children = config.children;
    this.childCats = config.childCats;
    this.props = config.props;
    this.options = config.options || [];
    this.designSections = config.designSections || null;
    this.optionSections = config.optionSections || null;
    this.preset = config.preset || null;
    this.lock = config.lock || null;
    this.limitInParent = config.limitInParent || null;
  }
}
const blockStructure = {
  id: 'io984r',
  design: {
    base: {
      st: {
        w: {
          vs: 'm',
          value: '100px',
          modifiers: {
            lg: '200px',
            sm: '160px',
            '@lg': '300px'
          }
        },
        x: {
          vs: 'f',
          value: 'calc(var(--base-x) + var(--dx) * var(--progress))',
          modifiers: {
            lg: 'calc(var(--base-x) + var(--dx) * var(--progress) * 2)'
          }
        }
      },
      an: {
        x: {
          vs: 'm',
          value: '20px'
        }
      }
    }
  },
  animation: {
    bg: [{
      value: 'teal',
      duration: 500,
      delay: 0,
      easing: 'ease-out'
    }, {
      value: 'red',
      duration: 500,
      delay: 0,
      easing: 'ease-in'
    }, {
      value: 'lime',
      duration: 500,
      delay: 0,
      easing: 'ease-out'
    }]
  }
};

/***/ }),

/***/ 1600:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  R: () => (/* binding */ blockRegistry)
});

// UNUSED EXPORTS: blockCategories

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/BlockEditor/Blocks/blockTemplate.tsx
var blockTemplate = __webpack_require__(6118);
// EXTERNAL MODULE: ./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js
var react_icons_esm = __webpack_require__(7049);
// EXTERNAL MODULE: ./src/BlockEditor/EditorContext.tsx + 1 modules
var EditorContext = __webpack_require__(4970);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/ActionIcon/ActionIcon.mjs + 3 modules
var ActionIcon = __webpack_require__(8324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Input/Input.mjs + 9 modules
var Input = __webpack_require__(6214);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Select/Select.mjs + 1 modules
var Select = __webpack_require__(5447);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Button/Button.mjs + 3 modules
var Button = __webpack_require__(5055);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Switch/Switch.mjs + 6 modules
var Switch = __webpack_require__(648);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.mjs + 9 modules
var SegmentedControl = __webpack_require__(8030);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.mjs + 9 modules
var MultiSelect = __webpack_require__(2538);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/css/base.module.css
var base_module = __webpack_require__(3825);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/css/base.module.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(base_module/* default */.Ay, options);




       /* harmony default export */ const css_base_module = (base_module/* default */.Ay && base_module/* default */.Ay.locals ? base_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconPencil.mjs
var IconPencil = __webpack_require__(7370);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconTrash.mjs
var IconTrash = __webpack_require__(4225);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconX.mjs
var IconX = __webpack_require__(4067);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconVersions.mjs
var IconVersions = __webpack_require__(7893);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconAccessibleFilled.mjs
var IconAccessibleFilled = __webpack_require__(6115);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconDots.mjs
var IconDots = __webpack_require__(3325);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/CloseButton/CloseIcon.mjs
var CloseIcon = __webpack_require__(946);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/optionSections/Common.module.css
var Common_module = __webpack_require__(1701);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/Common.module.css

      
      
      
      
      
      
      
      
      

var Common_module_options = {};

Common_module_options.styleTagTransform = (styleTagTransform_default());
Common_module_options.setAttributes = (setAttributesWithoutAttributes_default());
Common_module_options.insert = insertBySelector_default().bind(null, "head");
Common_module_options.domAPI = (styleDomAPI_default());
Common_module_options.insertStyleElement = (insertStyleElement_default());

var Common_module_update = injectStylesIntoStyleTag_default()(Common_module/* default */.Ay, Common_module_options);




       /* harmony default export */ const optionSections_Common_module = (Common_module/* default */.Ay && Common_module/* default */.Ay.locals ? Common_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./src/BlockEditor/util/styleCodec.ts
var styleCodec = __webpack_require__(4390);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/Common.tsx






// --- New 12-Color Pro Palette (Related to rgb(148, 163, 184)) ---
const COLOR_PALETTE = [{
  color: 'rgb(148, 163, 184)',
  shadow: 'rgba(148, 163, 184, 0.4)'
},
// Slate (Base)
{
  color: 'rgb(129, 140, 248)',
  shadow: 'rgba(129, 140, 248, 0.4)'
},
// Indigo
{
  color: 'rgb(168, 85, 247)',
  shadow: 'rgba(168, 85, 247, 0.4)'
},
// Purple
{
  color: 'rgb(6, 182, 212)',
  shadow: 'rgba(6, 182, 212, 0.4)'
},
// Cyan
{
  color: 'rgb(16, 185, 129)',
  shadow: 'rgba(16, 185, 129, 0.4)'
},
// Emerald
{
  color: 'rgb(245, 158, 11)',
  shadow: 'rgba(245, 158, 11, 0.4)'
},
// Amber
{
  color: 'rgb(249, 115, 22)',
  shadow: 'rgba(249, 115, 22, 0.4)'
},
// Orange
{
  color: 'rgb(20, 184, 166)',
  shadow: 'rgba(20, 184, 166, 0.4)'
},
// Teal
{
  color: 'rgb(244, 63, 94)',
  shadow: 'rgba(244, 63, 94, 0.4)'
},
// Rose
{
  color: 'rgb(236, 72, 153)',
  shadow: 'rgba(236, 72, 153, 0.4)'
},
// Pink
{
  color: 'rgb(132, 204, 22)',
  shadow: 'rgba(132, 204, 22, 0.4)'
},
// Lime
{
  color: 'rgb(59, 130, 246)',
  shadow: 'rgba(59, 130, 246, 0.4)'
} // Blue
];
const ICONS = {
  in: /*#__PURE__*/external_React_default().createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/external_React_default().createElement("rect", {
    x: "8",
    y: "8",
    width: "1.5",
    height: "1.5",
    rx: "0.75",
    fill: "#888"
  }), /*#__PURE__*/external_React_default().createElement("path", {
    d: "M2 2L7 7M7 7V4M7 7H4",
    stroke: "rgba(148, 163, 184, 1)",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  en: /*#__PURE__*/external_React_default().createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/external_React_default().createElement("path", {
    d: "M10 6V10H6",
    stroke: "#888",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/external_React_default().createElement("path", {
    d: "M2 2L7 7M7 7V4M7 7H4",
    stroke: "rgba(148, 163, 184, 1)",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  lv: /*#__PURE__*/external_React_default().createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/external_React_default().createElement("path", {
    d: "M10 6V10H6",
    stroke: "#888",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/external_React_default().createElement("path", {
    d: "M7 7L2 2M2 2V5M2 2H5",
    stroke: "rgba(148, 163, 184, 1)",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  ex: /*#__PURE__*/external_React_default().createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/external_React_default().createElement("path", {
    d: "M4 2V10",
    stroke: "#888",
    strokeWidth: "1",
    strokeLinecap: "round"
  }), /*#__PURE__*/external_React_default().createElement("path", {
    d: "M6 6H11M11 6L9 4M11 6L9 8",
    stroke: "rgba(148, 163, 184, 1)",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  rt: /*#__PURE__*/external_React_default().createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/external_React_default().createElement("path", {
    d: "M8 2V10",
    stroke: "#888",
    strokeWidth: "1",
    strokeLinecap: "round"
  }), /*#__PURE__*/external_React_default().createElement("path", {
    d: "M6 6H1M1 6L3 4M1 6L3 8",
    stroke: "rgba(148, 163, 184, 1)",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))
};

/* ----------------------------------
   Component
----------------------------------- */
const VariantMapSection = _ref => {
  let {
    id,
    block,
    updated
  } = _ref;
  const {
    page
  } = (0,EditorContext/* useEditorContext */.m)();
  const variants = block?.v ?? [];
  const [openIndex, setOpenIndex] = (0,external_React_.useState)(null);

  // Color storage (stable, no rerenders)
  const colorRef = (0,external_React_.useRef)({});

  /* ----------------------------------
     Assign colors when variants change
  ----------------------------------- */
  (0,external_React_.useEffect)(() => {
    variants.forEach((variant, index) => {
      if (!colorRef.current[variant.id]) {
        colorRef.current[variant.id] = COLOR_PALETTE[index % COLOR_PALETTE.length];
      }
    });
  }, [page[id]]); // or [variants] if you fix mutations properly

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleToggle = index => {
    setOpenIndex(prev => prev === index ? null : index);
  };
  const handleSetVariant = (index, event, value) => {
    const next = [...variants];
    if (value) {
      next[index][event] = value;
    } else {
      delete next[index][event];
    }
    block.v = next;
    updated();
  };

  /* ----------------------------------
     Render
  ----------------------------------- */
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: Common_module/* map_wrapper */.BY,
    key: page[id] + 'vm'
  }, variants.map((item, variantIndex) => {
    const isOpen = openIndex === variantIndex;
    const selfColor = colorRef.current[item.id];
    return /*#__PURE__*/external_React_default().createElement("div", {
      key: item.id,
      className: Common_module/* map_item */.xc
    }, /*#__PURE__*/external_React_default().createElement("div", {
      className: Common_module/* map_item_header */.X0,
      "data-open": isOpen,
      onClick: () => handleToggle(variantIndex)
    }, /*#__PURE__*/external_React_default().createElement("span", {
      className: Common_module/* map_item_header_color */.j8,
      style: {
        background: selfColor?.color,
        boxShadow: `${selfColor?.shadow} 0 0 8px`
      }
    }), /*#__PURE__*/external_React_default().createElement("span", {
      className: Common_module/* map_item_header_title */.kI
    }, item.id), /*#__PURE__*/external_React_default().createElement("div", {
      className: Common_module/* mini_map */.Le
    }, !isOpen &&
    // ['in', 'en', 'lv', 'ex', 'rt'].map(event => {
    ['en', 'lv'].map(event => {
      const targetId = item[event];
      if (!targetId) return null;
      const targetColor = colorRef.current[targetId];
      return /*#__PURE__*/external_React_default().createElement("div", {
        key: event,
        className: Common_module/* mini_map_item */.F1
      }, /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* mini_map_item_icon */.dO
      }, ICONS[event]), /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* mini_map_item_color */.pj,
        style: {
          background: targetColor?.color,
          boxShadow: `${targetColor?.shadow} 0 0 8px`
        }
      }));
    }))), isOpen && /*#__PURE__*/external_React_default().createElement("div", {
      className: Common_module/* map_item_content */.pp
    }, [{
      e: 'en',
      l: 'Mouse enter'
    }, {
      e: 'lv',
      l: 'Mouse leave'
    }
    // { e: 'ex', l: 'Exit' },
    // { e: 'rt', l: 'Return' }
    ].map(_ref2 => {
      let {
        e,
        l
      } = _ref2;
      const value = item[e];
      return /*#__PURE__*/external_React_default().createElement("div", {
        key: e,
        className: Common_module/* panel */.nd
      }, /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_detail */.fm
      }, /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_detail_left */.Xt
      }, /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_detail_icon */.pw
      }, ICONS[e]), /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_detail_label */.IK
      }, l)), /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_detail_variant */.TX
      }, value)), /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_switches */.Sv
      }, /*#__PURE__*/external_React_default().createElement("div", {
        className: `${Common_module/* panel_switch */.SP} ${Common_module/* panel_switch_close */.d4}`,
        "data-active": !value,
        onClick: () => handleSetVariant(variantIndex, e, null)
      }, /*#__PURE__*/external_React_default().createElement(CloseIcon/* CloseIcon */.U, null)), /*#__PURE__*/external_React_default().createElement("div", {
        className: Common_module/* panel_switch_spacer */.lt
      }), variants.map(v => {
        if (v.id === item.id) return null;
        const c = colorRef.current[v.id];
        return /*#__PURE__*/external_React_default().createElement("div", {
          key: v.id,
          className: Common_module/* panel_switch */.SP,
          "data-active": value === v.id,
          style: {
            background: c?.color,
            boxShadow: value === v.id ? `${c?.shadow} 0 0 8px` : 'none'
          },
          onClick: () => handleSetVariant(variantIndex, e, v.id)
        }, value === v.id && /*#__PURE__*/external_React_default().createElement(react_icons_esm/* ShadowOuterIcon */.ZCQ, null));
      })));
    })));
  }));
};
const InteractiveIdSection = _ref3 => {
  let {
    id,
    block,
    updated
  } = _ref3;
  const {
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const designData = block?.data?.design;

  /**
   * Generic design change handler
   */
  const handleChange = (0,external_React_.useCallback)(_ref4 => {
    let {
      value,
      property,
      variant
    } = _ref4;
    if (!designData || !value) return;
    designData[variant] ??= {};
    designData[variant][property] ??= {
      vs: 'm',
      value
    };
    designData[variant][property].value = value;
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
    updated();
  }, [block, designData, updated]);

  /**
   * Helpers for inputs
   */
  const getValue = (property, variant) => designData?.[variant]?.[property]?.value ?? '';

  // space → dash, allow only English letters and dash
  const sanitizeName = v => v.replace(/\s+/g, '-') // convert spaces to dash
  .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash

  const handleOptionChange = v => {
    if (block.data?.options) {
      const sv = sanitizeName(v);
      block.data.options.inid = {
        value: sv
      };
      updated();
    }
  };
  const getOptionValue = () => {
    return block.data?.options?.inid?.value || '';
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Interactive Id"), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    onChange: e => handleOptionChange(e.currentTarget.value),
    value: getOptionValue()
  }), /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Pointer"), /*#__PURE__*/external_React_default().createElement(SegmentedControl/* SegmentedControl */.I, {
    size: "xs",
    style: {
      border: '1px solid var(--in-c)',
      fontSize: 11,
      fontWeight: 300
    },
    withItemsBorders: false,
    value: getValue('pe', editingVariant) || editingVariant === 'base' && 'auto',
    onChange: value => handleChange({
      value,
      property: 'pe',
      variant: editingVariant
    }),
    data: [{
      label: 'Auto',
      value: 'auto'
    }, {
      label: 'None',
      value: 'none'
    }]
  }));
};
const VariantOptionSection = _ref5 => {
  let {
    id,
    block,
    updated
  } = _ref5;
  const {
    pageBlocks
  } = (0,EditorContext/* useEditorContext */.m)();

  // space → dash, allow only English letters and dash
  const sanitizeName = v => v.replace(/\s+/g, '-') // convert spaces to dash
  .replace(/[^A-Za-z-]/g, ''); // remove everything except letters and dash

  const handleOptionChange = v => {
    if (block.data?.options) {
      const sv = sanitizeName(v);
      block.data.options.vtid = {
        value: sv
      };
      updated();
    }
  };
  const getOptionValue = () => {
    return block.data?.options?.vtid?.value || '';
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Variant Trigger By"), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    onChange: e => handleOptionChange(e.currentTarget.value),
    value: getOptionValue()
  }));
};
// EXTERNAL MODULE: ./src/BlockEditor/util/KVParser.ts
var KVParser = __webpack_require__(6953);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconArrowRight.mjs
var IconArrowRight = __webpack_require__(274);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconArrowDown.mjs
var IconArrowDown = __webpack_require__(7956);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconReorder.mjs
var IconReorder = __webpack_require__(7158);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconGridDots.mjs
var IconGridDots = __webpack_require__(6361);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconArrowsVertical.mjs
var IconArrowsVertical = __webpack_require__(757);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconArrowsHorizontal.mjs
var IconArrowsHorizontal = __webpack_require__(4283);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/controls/FlexAlignmentController.module.css
var FlexAlignmentController_module = __webpack_require__(6225);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/FlexAlignmentController.module.css

      
      
      
      
      
      
      
      
      

var FlexAlignmentController_module_options = {};

FlexAlignmentController_module_options.styleTagTransform = (styleTagTransform_default());
FlexAlignmentController_module_options.setAttributes = (setAttributesWithoutAttributes_default());
FlexAlignmentController_module_options.insert = insertBySelector_default().bind(null, "head");
FlexAlignmentController_module_options.domAPI = (styleDomAPI_default());
FlexAlignmentController_module_options.insertStyleElement = (insertStyleElement_default());

var FlexAlignmentController_module_update = injectStylesIntoStyleTag_default()(FlexAlignmentController_module/* default */.Ay, FlexAlignmentController_module_options);




       /* harmony default export */ const controls_FlexAlignmentController_module = (FlexAlignmentController_module/* default */.Ay && FlexAlignmentController_module/* default */.Ay.locals ? FlexAlignmentController_module/* default */.Ay.locals : undefined);

;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/FlexAlignmentController.tsx




/* ===================== TYPES ===================== */

/* ===================== COMPONENT ===================== */

const FlexAlignmentController = _ref => {
  let {
    getValue,
    onChange
  } = _ref;
  /* ---------- READ VALUES ---------- */

  const flexProps = {
    flexDirection: getValue('fd') || 'row',
    justifyContent: getValue('jc') || 'center',
    alignItems: getValue('ai') || 'center',
    wrap: getValue('wr') || 'nowrap',
    gap: getValue('gp') || '0px'
  };

  /* ---------- UPDATE ---------- */

  const updateProp = (key, value) => {
    onChange({
      property: key,
      value
    });
  };
  const toggleReverse = () => {
    const isReverse = flexProps.flexDirection.includes('reverse');
    const base = isReverse ? flexProps.flexDirection.split('-')[0] : flexProps.flexDirection;
    updateProp('fd', isReverse ? base : `${base}-reverse`);
  };

  /* -------------------- MOVED FROM MainBox -------------------- */

  const isRow = flexProps.flexDirection.startsWith('row');
  const isReverse = flexProps.flexDirection.includes('reverse');
  const baseDirection = flexProps.flexDirection.split('-')[0];
  const isDistributing = ['space-between', 'space-around', 'space-evenly'].includes(flexProps.justifyContent);
  const mapIndex = i => isReverse ? 2 - i : i;
  const isPointActive = (r, c) => {
    const jc = flexProps.justifyContent;
    const ai = flexProps.alignItems;
    const main = isRow ? c : r;
    const cross = isRow ? r : c;
    const mainIndex = mapIndex(main);
    const crossIndex = cross;
    const jcMatch = isDistributing || jc === 'flex-start' && mainIndex === 0 || jc === 'center' && mainIndex === 1 || jc === 'flex-end' && mainIndex === 2;
    const aiMatch = ai === 'stretch' || ai === 'flex-start' && crossIndex === 0 || ai === 'center' && crossIndex === 1 || ai === 'flex-end' && crossIndex === 2;
    return jcMatch && aiMatch;
  };
  const handleMatrixClick = (r, c) => {
    const vals = ['flex-start', 'center', 'flex-end'];
    const main = isRow ? c : r;
    const cross = isRow ? r : c;
    updateProp('jc', vals[mapIndex(main)]);
    if (flexProps.alignItems !== 'stretch') {
      updateProp('ai', vals[cross]);
    }
  };
  const gridRange = [0, 1, 2];
  const DistributionIcon = _ref2 => {
    let {
      type
    } = _ref2;
    const isColumn = !isRow;
    return /*#__PURE__*/external_React_default().createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      style: {
        transform: isColumn ? 'rotate(90deg)' : 'none',
        transition: 'transform 0.3s'
      }
    }, type === 'space-between' && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement("path", {
      d: "M3 5v14M21 5v14",
      opacity: "0.4"
    }), /*#__PURE__*/external_React_default().createElement("rect", {
      x: "9",
      y: "8",
      width: "6",
      height: "8",
      rx: "1",
      fill: "currentColor",
      stroke: "none"
    })), type === 'space-around' && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement("path", {
      d: "M6 5v14M18 5v14",
      opacity: "0.4"
    }), /*#__PURE__*/external_React_default().createElement("rect", {
      x: "10",
      y: "8",
      width: "4",
      height: "8",
      rx: "1",
      fill: "currentColor",
      stroke: "none"
    })), type === 'space-evenly' && /*#__PURE__*/external_React_default().createElement("path", {
      d: "M5 5v14M12 5v14M19 5v14"
    }));
  };

  /* ------------------------------------------------------------ */

  return /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* sidebarContent */.wp
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* dualHeader */.uD
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* contextBox */.Lh
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* boxHeader */.Zv
  }, /*#__PURE__*/external_React_default().createElement("span", {
    className: FlexAlignmentController_module/* boxLabel */.Sk
  }, "Context"), /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* directionControls */._e
  }, /*#__PURE__*/external_React_default().createElement("button", {
    onClick: () => updateProp('fd', 'row'),
    className: `${FlexAlignmentController_module/* dirBtn */.Ws} ${baseDirection === 'row' ? FlexAlignmentController_module/* active */.vu : ''}`
  }, /*#__PURE__*/external_React_default().createElement(IconArrowRight/* default */.A, {
    size: 16,
    stroke: 1.5
  })), /*#__PURE__*/external_React_default().createElement("button", {
    onClick: () => updateProp('fd', 'column'),
    className: `${FlexAlignmentController_module/* dirBtn */.Ws} ${baseDirection === 'column' ? FlexAlignmentController_module/* active */.vu : ''}`
  }, /*#__PURE__*/external_React_default().createElement(IconArrowDown/* default */.A, {
    size: 16
  })), /*#__PURE__*/external_React_default().createElement("button", {
    onClick: toggleReverse,
    className: `${FlexAlignmentController_module/* dirBtn */.Ws} ${isReverse ? FlexAlignmentController_module/* active */.vu : ''}`,
    style: {
      transform: `scaleX(-1) rotate(${isRow ? 0 : '-90deg'})`
    }
  }, /*#__PURE__*/external_React_default().createElement(IconReorder/* default */.A, {
    size: 16
  })))), /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* contextMiniView */.q$
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* miniViewport */.m8,
    style: {
      display: 'flex',
      flexDirection: flexProps.flexDirection,
      justifyContent: flexProps.justifyContent,
      alignItems: flexProps.alignItems,
      gap: 2
    }
  }, [1, 2, 3].map(i => /*#__PURE__*/external_React_default().createElement("div", {
    key: i,
    className: `${FlexAlignmentController_module/* miniItem */.v9} ${flexProps.alignItems === 'stretch' ? FlexAlignmentController_module/* isStretched */.XO : FlexAlignmentController_module/* isCircle */.T9}`
  }, i))))), /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* alignmentWrapper */.xg
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* alignmentBox */.fI
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* boxHeader */.Zv
  }, /*#__PURE__*/external_React_default().createElement("span", {
    className: FlexAlignmentController_module/* boxLabel */.Sk
  }, isDistributing ? 'Cross-Axis' : 'Alignment'), /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* headerActions */.$s
  }, isDistributing && /*#__PURE__*/external_React_default().createElement("button", {
    onClick: () => updateProp('jc', 'center'),
    className: `${FlexAlignmentController_module/* actionBtn */.rT} ${FlexAlignmentController_module/* actionBtn_lg */.zq}`
  }, /*#__PURE__*/external_React_default().createElement(IconGridDots/* default */.A, {
    size: 14
  })), /*#__PURE__*/external_React_default().createElement("button", {
    onClick: () => updateProp('ai', flexProps.alignItems === 'stretch' ? 'center' : 'stretch'),
    className: `${FlexAlignmentController_module/* actionBtn */.rT} ${FlexAlignmentController_module/* actionBtn_lg */.zq} ${flexProps.alignItems === 'stretch' ? FlexAlignmentController_module/* active */.vu : ''}`
  }, isRow ? /*#__PURE__*/external_React_default().createElement(IconArrowsVertical/* default */.A, null) : /*#__PURE__*/external_React_default().createElement(IconArrowsHorizontal/* default */.A, null)))), /*#__PURE__*/external_React_default().createElement("div", {
    className: `${FlexAlignmentController_module/* matrixGrid */.IZ} ${isDistributing ? isRow ? FlexAlignmentController_module/* distRow */.p5 : FlexAlignmentController_module/* distCol */.r5 : FlexAlignmentController_module/* standardGrid */.ew}`
  }, isDistributing ? gridRange.map(idx => {
    const active = flexProps.alignItems === ['flex-start', 'center', 'flex-end'][idx] || flexProps.alignItems === 'stretch';
    const isStretch = flexProps.alignItems === 'stretch';
    return /*#__PURE__*/external_React_default().createElement("div", {
      key: idx,
      onClick: () => updateProp('ai', isStretch ? 'stretch' : ['flex-start', 'center', 'flex-end'][idx]),
      className: FlexAlignmentController_module/* cell */.Hn
    }, /*#__PURE__*/external_React_default().createElement("div", {
      className: `${FlexAlignmentController_module/* indicator */.q3} ${active ? FlexAlignmentController_module/* active */.vu : ''} ${isStretch ? isRow ? FlexAlignmentController_module/* barV */.uC : FlexAlignmentController_module/* barH */.un : FlexAlignmentController_module/* dot */.Om}`
    }));
  }) : gridRange.map(r => gridRange.map(c => {
    const active = isPointActive(r, c);
    const isStretch = flexProps.alignItems === 'stretch';
    return /*#__PURE__*/external_React_default().createElement("div", {
      key: `${r}-${c}`,
      onClick: () => handleMatrixClick(r, c),
      className: FlexAlignmentController_module/* cell */.Hn
    }, /*#__PURE__*/external_React_default().createElement("div", {
      className: `${FlexAlignmentController_module/* indicator */.q3} ${active ? FlexAlignmentController_module/* active */.vu : ''} ${isStretch ? isRow ? FlexAlignmentController_module/* barV */.uC : FlexAlignmentController_module/* barH */.un : FlexAlignmentController_module/* dot */.Om}`
    }));
  })))))), /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* distributionSection */.IC
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* distributionRow */.hI
  }, ['space-between', 'space-around', 'space-evenly'].map((mode, index, arr) => /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, {
    key: mode
  }, /*#__PURE__*/external_React_default().createElement("button", {
    onClick: () => updateProp('jc', mode),
    className: `${FlexAlignmentController_module/* distBtn */.Lg} ${flexProps.justifyContent === mode ? FlexAlignmentController_module/* active */.vu : ''}`
  }, /*#__PURE__*/external_React_default().createElement(DistributionIcon, {
    type: mode
  })), index !== arr.length - 1 && /*#__PURE__*/external_React_default().createElement("div", {
    className: FlexAlignmentController_module/* distBtn_sep */.wV
  }))))));
};
/* harmony default export */ const controls_FlexAlignmentController = (FlexAlignmentController);

// modify this code dont change other parts just add ts and get value and onchange from props

// import {
//   IconArrowDown,
//   IconArrowRight,
//   IconArrowsHorizontal,
//   IconArrowsVertical,
//   IconGrid3x3,
//   IconGridDots,
//   IconReorder,
// } from '@tabler/icons-react';
// import React, { useState } from 'react';
// import * as styles from './FlexAlignmentController.module.css';

// const FlexAlignmentController = () => {
//   const [flexProps, setFlexProps] = useState({
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     wrap: 'nowrap',
//   });

//   const updateProp = (key, value) => {
//     setFlexProps((prev) => ({ ...prev, [key]: value }));
//   };

//   const toggleReverse = () => {
//     const isReverse = flexProps.flexDirection.includes('reverse');
//     const base = isReverse
//       ? flexProps.flexDirection.split('-')[0]
//       : flexProps.flexDirection;
//     updateProp('flexDirection', isReverse ? base : `${base}-reverse`);
//   };

//   /* -------------------- MOVED FROM MainBox -------------------- */

//   const isRow = flexProps.flexDirection.startsWith('row');
//   const isDistributing = ['space-between', 'space-around', 'space-evenly'].includes(
//     flexProps.justifyContent
//   );

//   const isPointActive = (r, c) => {
//     const jc = flexProps.justifyContent;
//     const ai = flexProps.alignItems;

//     const main = isRow ? c : r;
//     const cross = isRow ? r : c;

//     const mainIndex = mapIndex(main); // reverse ONLY main axis
//     const crossIndex = cross;         // NEVER reverse cross axis

//     const jcMatch =
//       isDistributing ||
//       (jc === 'flex-start' && mainIndex === 0) ||
//       (jc === 'center' && mainIndex === 1) ||
//       (jc === 'flex-end' && mainIndex === 2);

//     const aiMatch =
//       ai === 'stretch' ||
//       (ai === 'flex-start' && crossIndex === 0) ||
//       (ai === 'center' && crossIndex === 1) ||
//       (ai === 'flex-end' && crossIndex === 2);

//     return jcMatch && aiMatch;
//   };

//   const handleMatrixClick = (r, c) => {
//     const vals = ['flex-start', 'center', 'flex-end'];

//     const main = isRow ? c : r;
//     const cross = isRow ? r : c;

//     updateProp('justifyContent', vals[mapIndex(main)]);

//     if (flexProps.alignItems !== 'stretch') {
//       updateProp('alignItems', vals[cross]);
//     }
//   };

//   const DistributionIcon = ({ type }) => {
//     const isColumn = !isRow;

//     return (
//       <svg
//         width="16"
//         height="16"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         style={{
//           transform: isColumn ? 'rotate(90deg)' : 'none',
//           transition: 'transform 0.3s',
//         }}
//       >
//         {type === 'space-between' && (
//           <>
//             <path d="M3 5v14M21 5v14" opacity="0.4" />
//             <rect x="9" y="8" width="6" height="8" rx="1" fill="currentColor" stroke="none" />
//           </>
//         )}
//         {type === 'space-around' && (
//           <>
//             <path d="M6 5v14M18 5v14" opacity="0.4" />
//             <rect x="10" y="8" width="4" height="8" rx="1" fill="currentColor" stroke="none" />
//           </>
//         )}

//         {type === 'space-evenly' && (
//           <path d="M5 5v14M12 5v14M19 5v14" />
//         )}
//       </svg>
//     );
//   };

//   const isReverse = flexProps.flexDirection.includes('reverse');
//   const baseDirection = flexProps.flexDirection.split('-')[0]; // row | column
//   // const gridRange = isReverse ? [2, 1, 0] : [0, 1, 2];
//   const gridRange = [0, 1, 2];

//   const mapIndex = (i) => (isReverse ? 2 - i : i);

//   /* ------------------------------------------------------------ */

//   return (
//     <div className={styles.sidebarContent}>
//       <div className={styles.dualHeader}>
//         {/* Context */}
//         <div className={styles.contextBox}>
//           <div className={styles.boxHeader}>
//             <span className={styles.boxLabel}>Context</span>

//             <div className={styles.directionControls}>
//               <button
//                 onClick={() => updateProp('flexDirection', 'row')}
//                 className={`${styles.dirBtn} ${baseDirection === 'row'
//                   ? styles.active
//                   : ''
//                   }`}
//               >
//                 <IconArrowRight size={16} stroke={1.5} />
//               </button>

//               <button
//                 onClick={() => updateProp('flexDirection', 'column')}
//                 className={`${styles.dirBtn} ${baseDirection === 'column'
//                   ? styles.active
//                   : ''
//                   }`}
//               >
//                 <IconArrowDown size={16} />
//               </button>

//               <button
//                 onClick={toggleReverse}
//                 className={`${styles.dirBtn} ${flexProps.flexDirection.includes('reverse') ? styles.active : ''
//                   }`}
//                 style={{ transform: `scaleX(-1) rotate(${isRow ? 0 : '-90deg'})` }}
//               >
//                 <IconReorder size={16} />
//               </button>
//             </div>
//           </div>

//           <div className={styles.contextMiniView}>
//             <div
//               className={styles.miniViewport}
//               style={{
//                 display: 'flex',
//                 flexDirection: flexProps.flexDirection,
//                 justifyContent: flexProps.justifyContent,
//                 alignItems: flexProps.alignItems,
//                 gap: '3px',
//               }}
//             >
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   className={`${styles.miniItem} ${flexProps.alignItems === 'stretch'
//                     ? styles.isStretched
//                     : styles.isCircle
//                     }`}
//                 >
//                   {i}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Alignment */}
//         <div className={styles.alignmentWrapper}>
//           <div className={styles.alignmentBox}>
//             <div className={styles.boxHeader}>
//               <span className={styles.boxLabel}>
//                 {isDistributing ? 'Cross-Axis' : 'Alignment'}
//               </span>

//               <div className={styles.headerActions}>
//                 {isDistributing && (
//                   <button
//                     onClick={() => updateProp('justifyContent', 'center')}
//                     className={`${styles.actionBtn} ${styles.actionBtn_lg}`}
//                   >
//                     <IconGridDots size={14} />
//                   </button>
//                 )}

//                 <button
//                   onClick={() =>
//                     updateProp(
//                       'alignItems',
//                       flexProps.alignItems === 'stretch' ? 'center' : 'stretch'
//                     )
//                   }
//                   className={`${styles.actionBtn} ${styles.actionBtn_lg} ${flexProps.alignItems === 'stretch' ? styles.active : ''
//                     }`}
//                 >
//                   {isRow ? (
//                     <IconArrowsVertical />
//                   ) : (
//                     <IconArrowsHorizontal />
//                   )}

//                 </button>
//               </div>
//             </div>

//             <div
//               className={`${styles.matrixGrid} ${isDistributing
//                 ? isRow
//                   ? styles.distRow
//                   : styles.distCol
//                 : styles.standardGrid
//                 }`}
//             >
//               {isDistributing
//                 ? gridRange.map((idx) => {

//                   const active =
//                     flexProps.alignItems ===
//                     ['flex-start', 'center', 'flex-end'][idx] ||
//                     flexProps.alignItems === 'stretch';

//                   const isStretch = flexProps.alignItems === 'stretch';

//                   return (
//                     <div
//                       key={idx}
//                       onClick={() =>
//                         updateProp(
//                           'alignItems',
//                           isStretch
//                             ? 'stretch'
//                             : ['flex-start', 'center', 'flex-end'][idx]
//                         )
//                       }
//                       className={styles.cell}
//                     >
//                       <div
//                         className={`${styles.indicator} ${active ? styles.active : ''
//                           } ${isStretch
//                             ? isRow
//                               ? styles.barV
//                               : styles.barH
//                             : styles.dot
//                           }`}
//                       />
//                     </div>
//                   );
//                 })
//                 : gridRange.map((r) =>
//                   gridRange.map((c) => {
//                     const active = isPointActive(r, c);
//                     const isStretch = flexProps.alignItems === 'stretch';

//                     return (
//                       <div
//                         key={`${r}-${c}`}
//                         onClick={() => handleMatrixClick(r, c)}
//                         className={styles.cell}
//                       >
//                         <div
//                           className={`${styles.indicator} ${active ? styles.active : ''
//                             } ${isStretch
//                               ? isRow
//                                 ? styles.barV
//                                 : styles.barH
//                               : styles.dot
//                             }`}
//                         />
//                       </div>
//                     );
//                   })
//                 )
//               }
//             </div>
//           </div>
//         </div>

//       </div>

//       <div className={styles.distributionSection}>
//         {/* <span className={styles.sectionLabel}>Distribution</span> */}
//         <div className={styles.distributionRow}>
//           {['space-between', 'space-around', 'space-evenly'].map((mode, index, arr) => (
//             <React.Fragment key={mode}>
//               <button
//                 onClick={() => updateProp('justifyContent', mode)}
//                 className={`${styles.distBtn} ${flexProps.justifyContent === mode ? styles.active : ''
//                   }`}
//               >
//                 <DistributionIcon type={mode} />
//               </button>

//               {index !== arr.length - 1 && (
//                 <div className={styles.distBtn_sep} />
//               )}
//             </React.Fragment>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlexAlignmentController;
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/positionIcons.tsx
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }


/**
 * Common props for all icons:
 * @param {number|string} size - Width and height of the icon (default: 24)
 * @param {string} className - Optional Tailwind or CSS classes
 */

const PositionStatic = _ref => {
  let {
    size = 24,
    className = "",
    ...props
  } = _ref;
  return /*#__PURE__*/external_React_default().createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "10",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "16",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }));
};
const PositionRelative = _ref2 => {
  let {
    size = 24,
    className = "",
    ...props
  } = _ref2;
  return /*#__PURE__*/external_React_default().createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "10",
    width: "16",
    height: "4",
    rx: "1",
    stroke: "currentColor",
    strokeOpacity: "0.3",
    strokeWidth: "1.5",
    strokeDasharray: "2 2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "7",
    y: "8",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "16",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }));
};
const PositionAbsolute = _ref3 => {
  let {
    size = 24,
    className = "",
    ...props
  } = _ref3;
  return /*#__PURE__*/external_React_default().createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "5",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "10",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "15",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "11",
    y: "8",
    width: "9",
    height: "9",
    rx: "2",
    fill: "currentColor",
    stroke: "white",
    strokeWidth: "2.5"
  }), /*#__PURE__*/external_React_default().createElement("path", {
    d: "M12 9L15 9M12 9L12 12",
    stroke: "white",
    strokeWidth: "1",
    strokeLinecap: "round",
    opacity: "0.5"
  }));
};
const PositionFixed = _ref4 => {
  let {
    size = 24,
    className = "",
    ...props
  } = _ref4;
  return /*#__PURE__*/external_React_default().createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "3",
    stroke: "currentColor",
    strokeOpacity: "0.4",
    strokeWidth: "2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "6",
    y: "12",
    width: "12",
    height: "2",
    rx: "0.5",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "6",
    y: "16",
    width: "12",
    height: "2",
    rx: "0.5",
    fill: "currentColor",
    fillOpacity: "0.2"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "14",
    y: "5",
    width: "5",
    height: "5",
    rx: "1",
    fill: "currentColor"
  }));
};
const PositionSticky = _ref5 => {
  let {
    size = 24,
    className = "",
    ...props
  } = _ref5;
  return /*#__PURE__*/external_React_default().createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className,
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2",
    stroke: "currentColor",
    strokeOpacity: "0.2",
    strokeWidth: "1.5"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "6",
    y: "14",
    width: "12",
    height: "2",
    rx: "0.5",
    fill: "currentColor",
    fillOpacity: "0.1"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "6",
    y: "18",
    width: "12",
    height: "2",
    rx: "0.5",
    fill: "currentColor",
    fillOpacity: "0.1"
  }), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "4",
    rx: "1",
    fill: "currentColor"
  }));
};

// Optional: A Map object for dynamic rendering
const PositionIcons = {
  static: PositionStatic,
  relative: PositionRelative,
  absolute: PositionAbsolute,
  fixed: PositionFixed,
  sticky: PositionSticky
};

/**
 * DirectionalIcon Component
 * Renders a customizable 16x16 SVG icon based on the user sketch.
 */

const DirectionalIcon = _ref6 => {
  let {
    direction = 'top',
    outlineWidth = 1.5,
    indicatorWidth = 3,
    style,
    ...props
  } = _ref6;
  // Map directions to rotation degrees
  const rotationAngles = {
    top: 0,
    right: 90,
    bottom: 180,
    left: -90
  };
  const angle = rotationAngles[direction] || 0;
  return /*#__PURE__*/external_React_default().createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      transform: `rotate(${angle}deg)`,
      ...style
    }
  }, props), /*#__PURE__*/external_React_default().createElement("rect", {
    x: "2.75",
    y: "2.75",
    width: "10.5",
    height: "10.5",
    stroke: "currentColor",
    strokeWidth: outlineWidth,
    opacity: .2
  }), /*#__PURE__*/external_React_default().createElement("line", {
    x1: "2",
    y1: "3.5",
    x2: "14",
    y2: "3.5",
    stroke: "currentColor",
    strokeWidth: indicatorWidth,
    strokeLinecap: "butt"
  }));
};
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Center/Center.mjs + 1 modules
var Center = __webpack_require__(1670);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/optionSections/PositionSection.module.css
var PositionSection_module = __webpack_require__(1316);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/PositionSection.module.css

      
      
      
      
      
      
      
      
      

var PositionSection_module_options = {};

PositionSection_module_options.styleTagTransform = (styleTagTransform_default());
PositionSection_module_options.setAttributes = (setAttributesWithoutAttributes_default());
PositionSection_module_options.insert = insertBySelector_default().bind(null, "head");
PositionSection_module_options.domAPI = (styleDomAPI_default());
PositionSection_module_options.insertStyleElement = (insertStyleElement_default());

var PositionSection_module_update = injectStylesIntoStyleTag_default()(PositionSection_module/* default */.Ay, PositionSection_module_options);




       /* harmony default export */ const optionSections_PositionSection_module = (PositionSection_module/* default */.Ay && PositionSection_module/* default */.Ay.locals ? PositionSection_module/* default */.Ay.locals : undefined);

;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/TRBLController.tsx


/**
 * TRBLController - A standalone React component for CSS positioning.
 */

const TRBLController = _ref => {
  let {
    value = [],
    onChange,
    size = 120
  } = _ref;
  const isT = value.includes('T');
  const isR = value.includes('R');
  const isB = value.includes('B');
  const isL = value.includes('L');
  const handleToggle = (0,external_React_.useCallback)(points => {
    let newValue;
    const allActive = points.every(p => value.includes(p));
    if (allActive) {
      newValue = value.filter(p => !points.includes(p));
    } else {
      newValue = Array.from(new Set([...value, ...points]));
    }
    onChange?.(newValue);
  }, [value, onChange]);
  const styles = {
    container: {
      position: 'relative',
      width: size,
      height: size,
      backgroundColor: '#141414',
      borderRadius: '8px',
      border: '1px solid #252525',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
      userSelect: 'none'
    },
    boundary: {
      position: 'absolute',
      inset: '12px',
      border: '1px dashed #333',
      borderRadius: '2px',
      opacity: 0.3,
      pointerEvents: 'none'
    },
    previewBox: {
      position: 'relative',
      width: '35%',
      height: '35%',
      backgroundColor: '#222',
      border: '1px solid #3D3D3D',
      borderRadius: '2px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      zIndex: 10
    },
    dot: active => ({
      position: 'absolute',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: active ? '#4F46E5' : '#555',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 30,
      outline: 'none',
      boxShadow: active ? '0 0 8px #4F46E5, inset 0 0 0 1px rgba(255,255,255,0.2)' : 'none',
      transform: active ? 'scale(1.3)' : 'scale(1)'
    }),
    tether: orientation => ({
      position: 'absolute',
      backgroundColor: '#4F46E5',
      opacity: 0.4,
      zIndex: 5,
      ...(orientation === 'T' && {
        top: 0,
        bottom: '50%',
        left: '50%',
        width: '1px',
        borderLeft: '1px dashed currentColor',
        transform: 'translateX(-50%)'
      }),
      ...(orientation === 'B' && {
        bottom: 0,
        top: '50%',
        left: '50%',
        width: '1px',
        borderLeft: '1px dashed currentColor',
        transform: 'translateX(-50%)'
      }),
      ...(orientation === 'L' && {
        left: 0,
        right: '50%',
        top: '50%',
        height: '1px',
        borderTop: '1px dashed currentColor',
        transform: 'translateY(-50%)'
      }),
      ...(orientation === 'R' && {
        right: 0,
        left: '50%',
        top: '50%',
        height: '1px',
        borderTop: '1px dashed currentColor',
        transform: 'translateY(-50%)'
      })
    }),
    edgeHighlight: side => ({
      position: 'absolute',
      backgroundColor: '#4F46E5',
      zIndex: 20,
      ...(side === 'T' && {
        top: -1,
        left: 0,
        right: 0,
        height: '2px'
      }),
      ...(side === 'B' && {
        bottom: -1,
        left: 0,
        right: 0,
        height: '2px'
      }),
      ...(side === 'L' && {
        left: -1,
        top: 0,
        bottom: 0,
        width: '2px'
      }),
      ...(side === 'R' && {
        right: -1,
        top: 0,
        bottom: 0,
        width: '2px'
      })
    })
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.container
  }, /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.boundary
  }), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      position: 'absolute',
      inset: '12px',
      pointerEvents: 'none'
    }
  }, isT && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.tether('T')
  }), isR && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.tether('R')
  }), isB && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.tether('B')
  }), isL && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.tether('L')
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.previewBox
  }, isT && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.edgeHighlight('T')
  }), isR && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.edgeHighlight('R')
  }), isB && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.edgeHighlight('B')
  }), isL && /*#__PURE__*/external_React_default().createElement("div", {
    style: styles.edgeHighlight('L')
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isT && isL),
      top: -3,
      left: -3
    },
    onClick: () => handleToggle(['T', 'L'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isT && isR),
      top: -3,
      right: -3
    },
    onClick: () => handleToggle(['T', 'R'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isB && isL),
      bottom: -3,
      left: -3
    },
    onClick: () => handleToggle(['B', 'L'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isB && isR),
      bottom: -3,
      right: -3
    },
    onClick: () => handleToggle(['B', 'R'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isT && !isL && !isR),
      top: -3,
      left: '50%',
      transform: `translateX(-50%) ${isT && !isL && !isR ? 'scale(1.3)' : 'scale(1)'}`
    },
    onClick: () => handleToggle(['T'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isB && !isL && !isR),
      bottom: -3,
      left: '50%',
      transform: `translateX(-50%) ${isB && !isL && !isR ? 'scale(1.3)' : 'scale(1)'}`
    },
    onClick: () => handleToggle(['B'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isL && !isT && !isB),
      left: -3,
      top: '50%',
      transform: `translateY(-50%) ${isL && !isT && !isB ? 'scale(1.3)' : 'scale(1)'}`
    },
    onClick: () => handleToggle(['L'])
  }), /*#__PURE__*/external_React_default().createElement("button", {
    style: {
      ...styles.dot(isR && !isT && !isB),
      right: -3,
      top: '50%',
      transform: `translateY(-50%) ${isR && !isT && !isB ? 'scale(1.3)' : 'scale(1)'}`
    },
    onClick: () => handleToggle(['R'])
  })));
};
// EXTERNAL MODULE: ./src/BlockEditor/OptionPanel/components/Controls/DragNumberInput.tsx + 1 modules
var DragNumberInput = __webpack_require__(7186);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/util/deleteKeyFromObject.ts
function deleteKeyFromObject(obj, keyToDelete) {
  Object.values(obj).forEach(inner => {
    if (keyToDelete in inner) {
      delete inner[keyToDelete];
    }
  });
}
/* harmony default export */ const util_deleteKeyFromObject = (deleteKeyFromObject);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconStack.mjs
var IconStack = __webpack_require__(331);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/PositionSection.tsx











function notIncluded(a, b) {
  return a.filter(item => !b.includes(item)).map(item => item.toLowerCase());
}
const POSITION_INFO = {
  static: {
    label: 'Static',
    desc: 'Default flow.'
  },
  relative: {
    label: 'Relative',
    desc: 'Self-offset.'
  },
  absolute: {
    label: 'Absolute',
    desc: 'Parent-bound.'
  },
  fixed: {
    label: 'Fixed',
    desc: 'Viewport-bound.'
  },
  sticky: {
    label: 'Sticky',
    desc: 'Scroll-stop.'
  }
};
const DIRECTION_MAP = {
  T: {
    key: 't',
    css: 'top'
  },
  R: {
    key: 'r',
    css: 'right'
  },
  B: {
    key: 'b',
    css: 'bottom'
  },
  L: {
    key: 'l',
    css: 'left'
  }
};
const PositionSection = _ref => {
  let {
    block,
    updated,
    sectionId
  } = _ref;
  const {
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const designData = block?.data?.design;

  /**
   * Parse `dt` only once per change.
   * `dt` is metadata-like data, so re-parsing every render is wasteful.
   */
  const parsedDT = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
  }, [block?.dt]);

  /**
   * Active TRBL presets (ex: ['T', 'L'])
   */
  const activePresets = parsedDT.pp?.split('') ?? [];

  /**
   * Removes design properties that are no longer used
   * (ex: user disables "Top" → remove `t`)
   */
  const removeDesignProps = (0,external_React_.useCallback)(keys => {
    if (!designData) return;
    keys.forEach(key => {
      util_deleteKeyFromObject(designData, key);
    });
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
  }, [block, designData]);

  /**
   * Handle TRBL preset changes
   */
  const handlePresetChange = (0,external_React_.useCallback)(nextPresets => {
    if (!block) return;
    const nextDT = {
      ...parsedDT,
      pp: nextPresets.join('')
    };
    block.dt = KVParser/* default */.A.stringify(nextDT);

    // Remove unused TRBL values
    const toRemove = notIncluded(activePresets, nextPresets);
    removeDesignProps(toRemove);
    updated();
  }, [block, parsedDT, activePresets]);

  /**
   * Generic design change handler
   */
  const handleChange = (0,external_React_.useCallback)(_ref2 => {
    let {
      value,
      property,
      variant
    } = _ref2;
    if (!designData || !value) return;
    designData[variant] ??= {};
    designData[variant][property] ??= {
      vs: 'm',
      value
    };
    designData[variant][property].value = value;
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
    updated();
  }, [block, designData, updated]);

  /**
   * Helpers for inputs
   */
  const getValue = (property, variant) => designData?.[variant]?.[property]?.value ?? '';
  const getPlaceholder = property => designData?.base?.[property]?.value ?? '';
  const positionType = getValue('po', 'base') || 'static';
  const isStatic = positionType === 'static';

  /**
   * Position type change logic
   * - Static clears all TRBL + z-index
   */
  const handlePositionTypeChange = value => {
    if (value === 'static') {
      removeDesignProps(['zi', 't', 'r', 'b', 'l']);
      handlePresetChange([]);
    }
    handleChange({
      value,
      property: 'po',
      variant: 'base'
    });
  };
  return /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement(SegmentedControl/* SegmentedControl */.I, {
    size: "md",
    style: {
      border: '1px solid var(--in-c)'
    },
    withItemsBorders: false,
    fullWidth: true,
    value: positionType,
    onChange: handlePositionTypeChange,
    data: [{
      label: /*#__PURE__*/external_React_default().createElement(Center/* Center */.o, null, /*#__PURE__*/external_React_default().createElement(PositionStatic, {
        size: 16
      })),
      value: 'static'
    }, {
      label: /*#__PURE__*/external_React_default().createElement(Center/* Center */.o, null, /*#__PURE__*/external_React_default().createElement(PositionRelative, {
        size: 16
      })),
      value: 'relative'
    }, {
      label: /*#__PURE__*/external_React_default().createElement(Center/* Center */.o, null, /*#__PURE__*/external_React_default().createElement(PositionAbsolute, {
        size: 16
      })),
      value: 'absolute'
    }, {
      label: /*#__PURE__*/external_React_default().createElement(Center/* Center */.o, null, /*#__PURE__*/external_React_default().createElement(PositionFixed, {
        size: 16
      })),
      value: 'fixed'
    }, {
      label: /*#__PURE__*/external_React_default().createElement(Center/* Center */.o, null, /*#__PURE__*/external_React_default().createElement(PositionSticky, {
        size: 16
      })),
      value: 'sticky'
    }]
  }), /*#__PURE__*/external_React_default().createElement("div", {
    className: PositionSection_module/* postionInfo */.HM
  }, POSITION_INFO[positionType]?.label, /*#__PURE__*/external_React_default().createElement("span", null, " \u2014 ", POSITION_INFO[positionType]?.desc)), !isStatic && /*#__PURE__*/external_React_default().createElement("div", {
    className: PositionSection_module/* ppBox */.Kp
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: PositionSection_module/* ppBox_left */.WR
  }, /*#__PURE__*/external_React_default().createElement(TRBLController, {
    value: activePresets,
    onChange: handlePresetChange
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: PositionSection_module/* ppBox_right */.Lc
  }, activePresets.map(dir => {
    const {
      key,
      css
    } = DIRECTION_MAP[dir];
    return /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
      key: dir,
      value: getValue(key, editingVariant),
      placeholder: getPlaceholder(key) || 'auto',
      onChange: v => handleChange({
        value: v,
        property: key,
        variant: editingVariant
      }),
      icon: /*#__PURE__*/external_React_default().createElement(DirectionalIcon, {
        direction: css,
        outlineWidth: 1,
        indicatorWidth: 2
      }),
      units: [{
        label: 'px',
        value: 'px'
      }, {
        label: '%',
        value: '%'
      }, {
        label: 'Auto',
        value: 'auto',
        keyword: true
      }],
      defaultUnit: "px"
    });
  }), /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
    value: getValue('zi', 'base'),
    placeholder: "auto",
    onChange: v => handleChange({
      value: v,
      property: 'zi',
      variant: 'base'
    }),
    icon: /*#__PURE__*/external_React_default().createElement(IconStack/* default */.A, {
      size: 14,
      stroke: 1.5
    })
  }))));
};
/* harmony default export */ const optionSections_PositionSection = (PositionSection);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.mjs + 1 modules
var UnstyledButton = __webpack_require__(6076);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/optionSections/BackgroundsSection.module.css
var BackgroundsSection_module = __webpack_require__(4596);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/BackgroundsSection.module.css

      
      
      
      
      
      
      
      
      

var BackgroundsSection_module_options = {};

BackgroundsSection_module_options.styleTagTransform = (styleTagTransform_default());
BackgroundsSection_module_options.setAttributes = (setAttributesWithoutAttributes_default());
BackgroundsSection_module_options.insert = insertBySelector_default().bind(null, "head");
BackgroundsSection_module_options.domAPI = (styleDomAPI_default());
BackgroundsSection_module_options.insertStyleElement = (insertStyleElement_default());

var BackgroundsSection_module_update = injectStylesIntoStyleTag_default()(BackgroundsSection_module/* default */.Ay, BackgroundsSection_module_options);




       /* harmony default export */ const optionSections_BackgroundsSection_module = (BackgroundsSection_module/* default */.Ay && BackgroundsSection_module/* default */.Ay.locals ? BackgroundsSection_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Popover/Popover.mjs + 14 modules
var Popover = __webpack_require__(8692);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.mjs + 13 modules
var ColorPicker = __webpack_require__(6988);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconSun.mjs
var IconSun = __webpack_require__(117);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconMoon.mjs
var IconMoon = __webpack_require__(6302);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/OptionPanel/components/Controls/ColorPickerControl.module.css
var ColorPickerControl_module = __webpack_require__(3143);
;// CONCATENATED MODULE: ./src/BlockEditor/OptionPanel/components/Controls/ColorPickerControl.module.css

      
      
      
      
      
      
      
      
      

var ColorPickerControl_module_options = {};

ColorPickerControl_module_options.styleTagTransform = (styleTagTransform_default());
ColorPickerControl_module_options.setAttributes = (setAttributesWithoutAttributes_default());
ColorPickerControl_module_options.insert = insertBySelector_default().bind(null, "head");
ColorPickerControl_module_options.domAPI = (styleDomAPI_default());
ColorPickerControl_module_options.insertStyleElement = (insertStyleElement_default());

var ColorPickerControl_module_update = injectStylesIntoStyleTag_default()(ColorPickerControl_module/* default */.Ay, ColorPickerControl_module_options);




       /* harmony default export */ const Controls_ColorPickerControl_module = (ColorPickerControl_module/* default */.Ay && ColorPickerControl_module/* default */.Ay.locals ? ColorPickerControl_module/* default */.Ay.locals : undefined);

;// CONCATENATED MODULE: ./src/BlockEditor/OptionPanel/components/Controls/ColorPickerControl.tsx





function ColorPickerControl(_ref) {
  let {
    currentColor,
    onChange,
    withinPortal
  } = _ref;
  const {
    colorMode
  } = (0,EditorContext/* useEditorContext */.m)();
  const [colors, setColors] = (0,external_React_.useState)(currentColor);
  (0,external_React_.useEffect)(() => {
    setColors(currentColor);
  }, [currentColor]);
  return /*#__PURE__*/external_React_default().createElement(Popover/* Popover */.A, {
    position: "bottom",
    withArrow: true,
    shadow: "md",
    withinPortal: true
  }, /*#__PURE__*/external_React_default().createElement(Popover/* Popover */.A.Target, null, /*#__PURE__*/external_React_default().createElement("div", {
    className: ColorPickerControl_module/* colorWrap */.I7
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: ColorPickerControl_module/* color */.yW,
    style: {
      background: colors[colorMode]
    }
  }), /*#__PURE__*/external_React_default().createElement("div", {
    className: ColorPickerControl_module/* label */.Pf
  }))), /*#__PURE__*/external_React_default().createElement(Popover/* Popover */.A.Dropdown, {
    style: {
      background: 'var(--mantine-color-dark-7)',
      padding: 12
    }
  }, /*#__PURE__*/external_React_default().createElement(PickColor, {
    colors: colors,
    onColorChange: onChange
  })));
}
/* harmony default export */ const Controls_ColorPickerControl = (ColorPickerControl);
const PickColor = _ref2 => {
  let {
    colors,
    onColorChange
  } = _ref2;
  const {
    colorMode,
    setColorMode
  } = (0,EditorContext/* useEditorContext */.m)();
  const [currentColor, setCurrentColor] = (0,external_React_.useState)(colors);
  const handleColorChange = value => {
    const updatedColor = {
      ...currentColor
    };
    updatedColor[colorMode] = value;
    setCurrentColor(updatedColor);
    onColorChange({
      ...updatedColor
    });
  };
  return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(SegmentedControl/* SegmentedControl */.I, {
    fullWidth: true,
    size: "xs",
    data: [{
      label: /*#__PURE__*/external_React_default().createElement(IconSun/* default */.A, {
        stroke: 1.5,
        size: 16
      }),
      value: 'l'
    }, {
      label: /*#__PURE__*/external_React_default().createElement(IconMoon/* default */.A, {
        stroke: 1.5,
        size: 16
      }),
      value: 'd'
    }],
    value: colorMode,
    onChange: value => setColorMode(value),
    mb: "sm"
  }), /*#__PURE__*/external_React_default().createElement(ColorPicker/* ColorPicker */.s, {
    format: "rgba",
    size: "sm",
    value: currentColor[colorMode],
    onChange: v => {
      handleColorChange(v);
    }
  }), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    mt: "xs",
    size: "xs",
    variant: "filled",
    value: currentColor[colorMode],
    onChange: e => handleColorChange(e.currentTarget.value),
    mb: "sm"
  }));
};
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/controls/MediaPicker.module.css
var MediaPicker_module = __webpack_require__(2487);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/MediaPicker.module.css

      
      
      
      
      
      
      
      
      

var MediaPicker_module_options = {};

MediaPicker_module_options.styleTagTransform = (styleTagTransform_default());
MediaPicker_module_options.setAttributes = (setAttributesWithoutAttributes_default());
MediaPicker_module_options.insert = insertBySelector_default().bind(null, "head");
MediaPicker_module_options.domAPI = (styleDomAPI_default());
MediaPicker_module_options.insertStyleElement = (insertStyleElement_default());

var MediaPicker_module_update = injectStylesIntoStyleTag_default()(MediaPicker_module/* default */.Ay, MediaPicker_module_options);




       /* harmony default export */ const controls_MediaPicker_module = (MediaPicker_module/* default */.Ay && MediaPicker_module/* default */.Ay.locals ? MediaPicker_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs + 7 modules
var Tooltip = __webpack_require__(2335);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconPhoto.mjs
var IconPhoto = __webpack_require__(3479);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconMovie.mjs
var IconMovie = __webpack_require__(8203);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconVinyl.mjs
var IconVinyl = __webpack_require__(6299);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconRefresh.mjs
var IconRefresh = __webpack_require__(4986);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/controls/MediaContent.module.css
var MediaContent_module = __webpack_require__(171);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/MediaContent.module.css

      
      
      
      
      
      
      
      
      

var MediaContent_module_options = {};

MediaContent_module_options.styleTagTransform = (styleTagTransform_default());
MediaContent_module_options.setAttributes = (setAttributesWithoutAttributes_default());
MediaContent_module_options.insert = insertBySelector_default().bind(null, "head");
MediaContent_module_options.domAPI = (styleDomAPI_default());
MediaContent_module_options.insertStyleElement = (insertStyleElement_default());

var MediaContent_module_update = injectStylesIntoStyleTag_default()(MediaContent_module/* default */.Ay, MediaContent_module_options);




       /* harmony default export */ const controls_MediaContent_module = (MediaContent_module/* default */.Ay && MediaContent_module/* default */.Ay.locals ? MediaContent_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/ScrollArea/ScrollArea.mjs + 26 modules
var ScrollArea = __webpack_require__(2923);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Loader/Loader.mjs + 4 modules
var Loader = __webpack_require__(4952);
// EXTERNAL MODULE: ./src/util/wpApi.ts
var wpApi = __webpack_require__(2055);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconCloudDownload.mjs
var IconCloudDownload = __webpack_require__(7164);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconCheck.mjs
var IconCheck = __webpack_require__(899);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/MediaContent.tsx





const MediaContent = _ref => {
  let {
    mediaType,
    refreshHash,
    onSelect,
    selectedId = null
  } = _ref;
  const [mediaItems, setMediaItems] = (0,external_React_.useState)([]);
  const [page, setPage] = (0,external_React_.useState)(1);
  const [totalPages, setTotalPages] = (0,external_React_.useState)(1);
  const [loading, setLoading] = (0,external_React_.useState)(false);
  const [loadingMore, setLoadingMore] = (0,external_React_.useState)(false);
  const [initialLoad, setInitialLoad] = (0,external_React_.useState)(false);
  const fetchMediaItems = async function () {
    let reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    reset ? setLoading(true) : setLoadingMore(true);
    try {
      const currentPage = reset ? 1 : page;
      const response = await (0,wpApi/* fetchMedia */.vp)(mediaType, currentPage);
      const {
        data = [],
        totalPages
      } = response || {};
      if (Array.isArray(data)) {
        setMediaItems(reset ? [...data] : prev => [...prev, ...data]);
        setTotalPages(totalPages ? parseInt(totalPages) : 1);
        if (reset) setPage(1);
      } else {
        setMediaItems([]);
      }
    } catch (error) {
      setMediaItems([]);
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setInitialLoad(true);
    }
  };
  (0,external_React_.useEffect)(() => {
    if (initialLoad && page > 1) {
      fetchMediaItems(false);
    }
  }, [page]);
  (0,external_React_.useEffect)(() => {
    fetchMediaItems(true);
  }, [refreshHash]);
  const handleLoadMore = () => {
    if (page < totalPages) setPage(p => p + 1);
  };
  const handleSelect = item => {
    onSelect?.([item.id.toString(), item.source_url, item.mime_type]);
  };
  const renderPreview = item => {
    const {
      mime_type,
      media_details,
      source_url
    } = item;
    if (mime_type.startsWith('image')) {
      return /*#__PURE__*/external_React_default().createElement("img", {
        src: media_details?.sizes?.thumbnail?.source_url || source_url,
        alt: item.title.rendered
      });
    }
    if (mime_type.startsWith('video')) {
      return /*#__PURE__*/external_React_default().createElement("video", {
        width: "100%",
        controls: true
      }, /*#__PURE__*/external_React_default().createElement("source", {
        src: source_url,
        type: mime_type
      }), "Your browser does not support the video tag.");
    }
    if (mime_type.startsWith('audio')) {
      return /*#__PURE__*/external_React_default().createElement("audio", {
        controls: true
      }, /*#__PURE__*/external_React_default().createElement("source", {
        src: source_url,
        type: mime_type
      }), "Your browser does not support the audio element.");
    }
    return null;
  };
  const renderLoader = (text, icon) => /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* initLoadWrap */.Ds
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* initLoad */.l1
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* rotate */.e$
  }, icon), /*#__PURE__*/external_React_default().createElement("span", null, text)));
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* wrap */.LV
  }, loading && page === 1 && renderLoader('Syncing...', /*#__PURE__*/external_React_default().createElement(IconRefresh/* default */.A, {
    style: {
      width: 100,
      height: 100
    },
    stroke: 0.2
  })), !initialLoad ? loadingMore ? renderLoader('Syncing...', /*#__PURE__*/external_React_default().createElement(IconRefresh/* default */.A, {
    style: {
      width: 100,
      height: 100
    },
    stroke: 0.2
  })) : /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* initLoad */.l1
  }, /*#__PURE__*/external_React_default().createElement(IconCloudDownload/* default */.A, {
    style: {
      width: 100,
      height: 100
    },
    stroke: 0.2
  }), /*#__PURE__*/external_React_default().createElement(Button/* Button */.$, {
    variant: "light",
    size: "xs",
    onClick: () => fetchMediaItems(false)
  }, "Load Files")) : /*#__PURE__*/external_React_default().createElement(ScrollArea/* ScrollArea */.F.Autosize, {
    mah: "100%",
    type: "never"
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* mediaGrid */.NT
  }, mediaItems.map(item => /*#__PURE__*/external_React_default().createElement("div", {
    key: item.id,
    className: `${MediaContent_module/* mediaItem */.w5} ${selectedId === item.id ? MediaContent_module/* mediaItemSelected */.hG : ''}`,
    onClick: () => handleSelect(item)
  }, selectedId === item.id && /*#__PURE__*/external_React_default().createElement("span", {
    className: MediaContent_module/* selectedMedia */.ii
  }, /*#__PURE__*/external_React_default().createElement(IconCheck/* default */.A, {
    style: {
      width: '70%',
      height: '70%'
    },
    stroke: 1.5
  })), renderPreview(item)))), page < totalPages && /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaContent_module/* loadmoreWrap */.sb
  }, /*#__PURE__*/external_React_default().createElement(Button/* Button */.$, {
    variant: "light",
    size: "xs",
    onClick: handleLoadMore,
    disabled: loadingMore
  }, loadingMore ? /*#__PURE__*/external_React_default().createElement(Loader/* Loader */.a, {
    color: "blue",
    type: "dots"
  }) : 'Load More'))));
};
/* harmony default export */ const controls_MediaContent = (MediaContent);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/controls/MediaPicker.tsx
function MediaPicker_extends() { return MediaPicker_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, MediaPicker_extends.apply(null, arguments); }





const tooltipProps = {
  color: "blue",
  style: {
    fontSize: '10px'
  },
  transitionProps: {
    transition: 'pop',
    duration: 300
  }
};
const MediaPicker = _ref => {
  let {
    defaultMediaType = 'image',
    onSelect,
    selectedId = null,
    close
  } = _ref;
  const [mediaType, setMediaType] = (0,external_React_.useState)(defaultMediaType);
  const [refreshHash, setRefreshHash] = (0,external_React_.useState)(null);
  const types = [{
    id: 'image',
    label: 'Images',
    icon: /*#__PURE__*/external_React_default().createElement(IconPhoto/* default */.A, {
      style: {
        width: '70%',
        height: '70%'
      },
      stroke: 1
    })
  }, {
    id: 'video',
    label: 'Videos',
    icon: /*#__PURE__*/external_React_default().createElement(IconMovie/* default */.A, {
      style: {
        width: '70%',
        height: '70%'
      },
      stroke: 1
    })
  }, {
    id: 'audio',
    label: 'Audios',
    icon: /*#__PURE__*/external_React_default().createElement(IconVinyl/* default */.A, {
      style: {
        width: '70%',
        height: '70%'
      },
      stroke: 1
    })
  }];
  const handleSelect = value => {
    if (onSelect) onSelect(value);
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaPicker_module/* wrap */.LV
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaPicker_module/* title */.DD
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaPicker_module/* titleColumn */.Jb
  }, /*#__PURE__*/external_React_default().createElement(Tooltip/* Tooltip */.m, MediaPicker_extends({
    label: "Sync"
  }, tooltipProps), /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    variant: "transparent",
    color: "gray",
    radius: "xl",
    "aria-label": "Sync",
    mr: -8,
    onClick: () => setRefreshHash(Date.now())
  }, /*#__PURE__*/external_React_default().createElement(IconRefresh/* default */.A, {
    style: {
      width: '70%',
      height: '70%'
    },
    stroke: 1
  }))), /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    variant: "transparent",
    color: "gray",
    radius: "xl",
    "aria-label": "Sync",
    mr: -8,
    onClick: close
  }, /*#__PURE__*/external_React_default().createElement(IconX/* default */.A, {
    style: {
      width: '70%',
      height: '70%'
    },
    stroke: 1
  })))), /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaPicker_module/* content */.Qs,
    "data-show": mediaType === 'image'
  }, /*#__PURE__*/external_React_default().createElement(controls_MediaContent, {
    mediaType: "image",
    refreshHash: refreshHash,
    onSelect: handleSelect,
    selectedId: selectedId
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaPicker_module/* content */.Qs,
    "data-show": mediaType === 'video'
  }, /*#__PURE__*/external_React_default().createElement(controls_MediaContent, {
    mediaType: "video",
    refreshHash: refreshHash,
    onSelect: handleSelect,
    selectedId: selectedId
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: MediaPicker_module/* content */.Qs,
    "data-show": mediaType === 'audio'
  }, /*#__PURE__*/external_React_default().createElement(controls_MediaContent, {
    mediaType: "audio",
    refreshHash: refreshHash,
    onSelect: handleSelect,
    selectedId: selectedId
  })));
};
/* harmony default export */ const controls_MediaPicker = (MediaPicker);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/BackgroundsSection.tsx










function BackgroundsSection_notIncluded(a, b) {
  return a.filter(item => !b.includes(item)).map(item => item.toLowerCase());
}
const BackgroundsSection_POSITION_INFO = {
  static: {
    label: 'Static',
    desc: 'Default flow.'
  },
  relative: {
    label: 'Relative',
    desc: 'Self-offset.'
  },
  absolute: {
    label: 'Absolute',
    desc: 'Parent-bound.'
  },
  fixed: {
    label: 'Fixed',
    desc: 'Viewport-bound.'
  },
  sticky: {
    label: 'Sticky',
    desc: 'Scroll-stop.'
  }
};
const BackgroundsSection_DIRECTION_MAP = {
  T: {
    key: 't',
    css: 'top'
  },
  R: {
    key: 'r',
    css: 'right'
  },
  B: {
    key: 'b',
    css: 'bottom'
  },
  L: {
    key: 'l',
    css: 'left'
  }
};
const BackgroundsSection = _ref => {
  let {
    block,
    updated,
    sectionId
  } = _ref;
  const {
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();

  // const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [openPanel, setOpenPanel] = (0,external_React_.useState)(false);
  const designData = block?.data?.design;

  /**
   * Parse `dt` only once per change.
   * `dt` is metadata-like data, so re-parsing every render is wasteful.
   */
  const parsedDT = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
  }, [block?.dt]);

  /**
   * Active background mode
   */
  const activeBackgroundMode = parsedDT.bg || 'none';

  /**
   * Removes design properties that are no longer used
   * (ex: user disables "Top" → remove `t`)
   */
  const removeDesignProps = (0,external_React_.useCallback)(keys => {
    if (!designData) return;
    keys.forEach(key => {
      util_deleteKeyFromObject(designData, key);
    });
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
  }, [block, designData]);

  /**
   * Handle BG mode chage
   */
  const handleBackgroundModeChange = (0,external_React_.useCallback)(nextMode => {
    if (!block) return;
    const nextDT = {
      ...parsedDT,
      bg: nextMode
    };
    block.dt = KVParser/* default */.A.stringify(nextDT);

    // Remove unused TRBL values
    // const toRemove = notIncluded(activeBackgroundMode, nextPresets);
    // removeDesignProps(toRemove);

    updated();
  }, [block, parsedDT, activeBackgroundMode]);

  /**
   * Generic design change handler
   */
  const handleChange = (0,external_React_.useCallback)(_ref2 => {
    let {
      value,
      property,
      variant
    } = _ref2;
    if (!designData) return;
    designData[variant] ??= {};
    designData[variant][property] ??= {
      vs: 'm',
      value
    };
    designData[variant][property].value = value;
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
    updated();
  }, [block, designData, updated]);

  /**
   * Helpers for inputs
   */
  const getValue = (property, variant) => designData?.[variant]?.[property]?.value ?? '';
  const getPlaceholder = property => designData?.base?.[property]?.value ?? '';

  /**
   * Position type change logic
   * - Static clears all TRBL + z-index
   */
  const handlePositionTypeChange = value => {
    if (value === 'static') {
      removeDesignProps(['zi', 't', 'r', 'b', 'l']);
      // handlePresetChange([]);
    }
    handleChange({
      value,
      property: 'po',
      variant: 'base'
    });
  };
  const handleOptionChange = (value, property) => {
    if (!block) {
      return;
    }
    if (value && block.data?.options) {
      if (block?.data?.options?.[property]?.value) {
        block.data.options[property].value = value;
      } else {
        // add property
        block.data.options[property] = {
          value,
          vs: 'm'
        };
      }
    }
    updated();
  };
  const getOptionValue = property => {
    return block?.data?.options?.[property]?.value || '';
  };
  const getOptionPlaceholder = property => {
    return block?.data?.options?.[property]?.value || '';
  };
  const selectedImage = getValue('bg-img', 'base');
  return /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center',
      margin: '12px 0'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Background Color"), /*#__PURE__*/external_React_default().createElement(Controls_ColorPickerControl, {
    currentColor: getValue('bgc', editingVariant) || {
      l: '',
      d: ''
    },
    onChange: v => {
      handleChange({
        value: v,
        property: 'bgc',
        variant: editingVariant
      });
    }
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center',
      margin: '12px 0'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Image"), /*#__PURE__*/external_React_default().createElement("div", {
    className: BackgroundsSection_module/* preview */.VH,
    style: {
      backgroundImage: selectedImage?.url ? `url(${selectedImage?.url})` : 'none'
    }
  }, !selectedImage?.url && /*#__PURE__*/external_React_default().createElement(react_icons_esm/* ImageIcon */.xfq, null), /*#__PURE__*/external_React_default().createElement("div", {
    className: BackgroundsSection_module/* preview_actions */.tr
  }, /*#__PURE__*/external_React_default().createElement(UnstyledButton/* UnstyledButton */.N, {
    className: BackgroundsSection_module/* preview_action */.My,
    onClick: () => setOpenPanel(true)
  }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* Pencil1Icon */.WhT, null)), selectedImage && /*#__PURE__*/external_React_default().createElement(UnstyledButton/* UnstyledButton */.N, {
    className: BackgroundsSection_module/* preview_action */.My,
    "data-delete": true,
    onClick: () => handleChange({
      value: '',
      property: 'bg-img',
      variant: 'base'
    })
  }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* TrashIcon */.ucK, null)))), openPanel && /*#__PURE__*/external_React_default().createElement(controls_MediaPicker, {
    defaultMediaType: "image",
    selectedId: Number(selectedImage.id) || null,
    onSelect: value => {
      // setSelectedMedia(value);
      handleChange({
        value: {
          id: value[0],
          url: value[1]
        },
        property: 'bg-img',
        variant: 'base'
      });
    },
    close: () => setOpenPanel(false)
  })));
};
/* harmony default export */ const optionSections_BackgroundsSection = (BackgroundsSection);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconCirclePlus.mjs
var IconCirclePlus = __webpack_require__(6525);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconMinus.mjs
var IconMinus = __webpack_require__(8891);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconPlus.mjs
var IconPlus = __webpack_require__(2449);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconTransitionRight.mjs
var IconTransitionRight = __webpack_require__(8958);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/Blocks/optionSections/TransitionSection.module.css
var TransitionSection_module = __webpack_require__(5860);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/TransitionSection.module.css

      
      
      
      
      
      
      
      
      

var TransitionSection_module_options = {};

TransitionSection_module_options.styleTagTransform = (styleTagTransform_default());
TransitionSection_module_options.setAttributes = (setAttributesWithoutAttributes_default());
TransitionSection_module_options.insert = insertBySelector_default().bind(null, "head");
TransitionSection_module_options.domAPI = (styleDomAPI_default());
TransitionSection_module_options.insertStyleElement = (insertStyleElement_default());

var TransitionSection_module_update = injectStylesIntoStyleTag_default()(TransitionSection_module/* default */.Ay, TransitionSection_module_options);




       /* harmony default export */ const optionSections_TransitionSection_module = (TransitionSection_module/* default */.Ay && TransitionSection_module/* default */.Ay.locals ? TransitionSection_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Menu/Menu.mjs + 13 modules
var Menu = __webpack_require__(8830);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/TransitionSection.tsx





function createVariantPairs(obj) {
  const keys = Object.keys(obj);
  const result = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (i === j) continue;
      const from = keys[i];
      const to = keys[j];
      result.push({
        id: `${from}-${to}`,
        to,
        from
      });
    }
  }
  return result;
}
const TransitionSection = _ref => {
  let {
    id,
    block,
    updated,
    buttonPass,
    sectionId
  } = _ref;
  const {
    pageBlocks
  } = (0,EditorContext/* useEditorContext */.m)();
  const combinations = createVariantPairs(block.data?.design || {});
  const [opened, setOpened] = (0,external_React_.useState)(false);
  if (!block?.a) {
    block.a = {};
  }
  const animations = block.a;
  const handleAnimation = id => {
    if (animations[id]) {
      // delete
      delete animations[id];
    } else {
      animations[id] = {};
    }
    updated();
  };

  /**
   * Pass header button
   * uses latest display mode because dependencies are correct
   */
  (0,external_React_.useEffect)(() => {
    buttonPass(sectionId, /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W, {
      shadow: "md",
      width: 200,
      opened: opened,
      onChange: setOpened
    }, /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W.Target, null, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
      variant: "transparent",
      radius: "lg",
      size: "sm",
      color: 'gray'
    }, /*#__PURE__*/external_React_default().createElement(IconCirclePlus/* default */.A, {
      style: {
        width: '85%',
        height: '85%'
      },
      stroke: 1.5
    }))), /*#__PURE__*/external_React_default().createElement(Menu/* Menu */.W.Dropdown, null, combinations?.map(item => {
      return /*#__PURE__*/external_React_default().createElement(UnstyledButton/* UnstyledButton */.N, {
        key: item.id,
        className: TransitionSection_module/* addListItem */.N7,
        onClick: () => {
          handleAnimation(item.id);
          setOpened(false);
        }
      }, /*#__PURE__*/external_React_default().createElement("span", null, item.from), animations[item.id] ? /*#__PURE__*/external_React_default().createElement(IconMinus/* default */.A, {
        size: 14,
        stroke: 1.5
      }) : /*#__PURE__*/external_React_default().createElement(IconPlus/* default */.A, {
        size: 14,
        stroke: 1.5
      }), /*#__PURE__*/external_React_default().createElement("span", null, item.to));
    }))));
  }, [opened, animations]);
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: TransitionSection_module/* wrap */.LV
  }, Object.keys(animations).map(item => {
    const label = item.split('-');
    return /*#__PURE__*/external_React_default().createElement("div", {
      className: TransitionSection_module/* item */.AS
    }, /*#__PURE__*/external_React_default().createElement("span", null, label[0]), /*#__PURE__*/external_React_default().createElement(IconTransitionRight/* default */.A, {
      size: 14,
      stroke: 1.5
    }), /*#__PURE__*/external_React_default().createElement("span", null, label[1]));
  }));
};
/* harmony default export */ const optionSections_TransitionSection = (TransitionSection);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/AppearanceSection.tsx





const Section = _ref => {
  let {
    id,
    block,
    updated
  } = _ref;
  const {
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const designData = block?.data?.design;

  /**
   * Generic design change handler
   */
  const handleChange = _ref2 => {
    let {
      value,
      property,
      variant
    } = _ref2;
    if (!designData || !value) return;
    designData[variant] ??= {};
    designData[variant][property] ??= {
      vs: 'm',
      value
    };
    designData[variant][property].value = value;
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
    updated();
  };

  /**
   * Helpers for inputs
   */
  const getValue = (property, variant) => designData?.[variant]?.[property]?.value ?? '';
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Opacity"), /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
    value: getValue('op', editingVariant),
    placeholder: "1",
    onChange: v => handleChange({
      value: v,
      property: 'op',
      variant: editingVariant
    }),
    step: .05,
    min: 0,
    max: 1,
    icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* TransparencyGridIcon */.Aon, null)
  }));
};
/* harmony default export */ const AppearanceSection = (Section);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/base.tsx















const getLabelByType = t => {
  const data = {
    t: 'Text'
    // tc: 'Text Content'
  };
  return data[t];
};
const VariablesOptionSection = _ref => {
  let {
    id,
    block,
    updated
  } = _ref;
  const {
    pageBlocks
  } = (0,EditorContext/* useEditorContext */.m)();
  const [adding, setAdding] = (0,external_React_.useState)(false);
  const [editingId, setEditingId] = (0,external_React_.useState)(null);
  const defaultEditingData = {
    n: '',
    t: '',
    d: ''
  };
  const [editingVarData, setEditingVarData] = (0,external_React_.useState)(defaultEditingData);

  // ---------------------------------------------------------------------------
  // Ensure vars option exists
  // ---------------------------------------------------------------------------
  if (block.data?.options && !block.data.options.vars) {
    block.data.options.vars = {
      value: {}
    };
  }
  const vars = block.data?.options?.vars?.value || {};

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const handleEditingVarDataChange = (key, v) => {
    setEditingVarData(prev => ({
      ...prev,
      [key]: v
    }));
  };
  const handleCloseEditor = () => {
    setEditingVarData(defaultEditingData);
    setAdding(false);
    setEditingId(null);
  };

  // ---------------------------------------------------------------------------
  // Add / Update variable
  // ---------------------------------------------------------------------------
  const handleSaveVariable = () => {
    const {
      n,
      t,
      d
    } = editingVarData;
    if (!n || !t) return;
    if (editingId) {
      // UPDATE
      vars[editingId] = {
        ...vars[editingId],
        name: n,
        type: t,
        default: d
      };
    } else {
      // ADD (short internal id)
      const base = n.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 4) || 'v';
      let vid = base;
      let i = 1;
      while (vars[vid]) vid = `${base}${i++}`;
      vars[vid] = {
        id: vid,
        name: n,
        type: t,
        default: d
      };
    }
    updated();
    handleCloseEditor();
  };

  // ---------------------------------------------------------------------------
  // Edit existing variable
  // ---------------------------------------------------------------------------
  const handleEditVariable = v => {
    setEditingVarData({
      n: v.name,
      t: v.type,
      d: v.default
    });
    setEditingId(v.id);
    setAdding(true);
  };

  // ---------------------------------------------------------------------------
  // Delete variable
  // ---------------------------------------------------------------------------
  const handleDeleteVariable = vid => {
    delete vars[vid];
    updated();
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableList */.Re
  }, Object.values(vars).map(v => /*#__PURE__*/external_React_default().createElement("div", {
    key: v.id,
    className: base_module/* variableItem */.CP
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemLeft */.d5
  }, /*#__PURE__*/external_React_default().createElement("span", {
    className: base_module/* variableName */.cG
  }, v.name), /*#__PURE__*/external_React_default().createElement("span", {
    className: base_module/* variableMeta */.iy
  }, getLabelByType(v.type), " \xB7 #", v.id, " \xB7 ", v.default)), /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemActions */.Tx
  }, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    size: "xs",
    variant: "subtle",
    onClick: () => handleEditVariable(v)
  }, /*#__PURE__*/external_React_default().createElement(IconPencil/* default */.A, {
    size: 14
  })), /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    size: "xs",
    color: "red",
    variant: "subtle",
    onClick: () => handleDeleteVariable(v.id)
  }, /*#__PURE__*/external_React_default().createElement(IconTrash/* default */.A, {
    size: 14
  })))))), adding && /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemEdit */.I6
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemEdit_head */.Tt
  }, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
    style: {
      position: 'absolute',
      top: '-14px',
      right: '-10px',
      zIndex: 1
    },
    onClick: handleCloseEditor,
    color: "gray",
    size: "sm",
    radius: "xl"
  }, /*#__PURE__*/external_React_default().createElement(IconX/* default */.A, {
    size: 14
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemEdit_inputwrap */.z1
  }, /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    placeholder: "Name",
    value: editingVarData.n,
    onChange: e => handleEditingVarDataChange('n', e.currentTarget.value)
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemEdit_inputwrap */.z1
  }, /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    placeholder: "Type",
    data: [{
      label: 'Text',
      value: 't'
    }
    // { label: 'Text Content', value: 'tc' },
    // { label: 'Color', value: 'c' },
    ],
    value: editingVarData.t,
    onChange: v => handleEditingVarDataChange('t', v)
  }))), /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* variableItemEdit_inputwrapDefault */.MQ
  }, /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    placeholder: "Default value",
    value: editingVarData.d,
    onChange: e => handleEditingVarDataChange('d', e.currentTarget.value)
  })), /*#__PURE__*/external_React_default().createElement(Button/* Button */.$, {
    size: "compact-xs",
    onClick: handleSaveVariable,
    leftSection: /*#__PURE__*/external_React_default().createElement(IconVersions/* default */.A, {
      size: 14
    }),
    style: {
      fontWeight: 400
    }
  }, editingId ? 'Update Variable' : 'Create Variable')), !adding && /*#__PURE__*/external_React_default().createElement(Button/* Button */.$, {
    variant: "transparent",
    c: "gray",
    size: "compact-xs",
    onClick: () => setAdding(true),
    leftSection: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* PlusCircledIcon */.WBl, null),
    style: {
      fontWeight: 400
    }
  }, "Add Variable"));
};
const LayoutOptionSection = _ref2 => {
  let {
    id,
    block,
    updated,
    buttonPass,
    sectionId
  } = _ref2;
  const {
    pageBlocks,
    page,
    setPage,
    editingBlock,
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const editingDevice = '';
  const designData = block?.data?.design;

  /**
   * Parse dt once and memoize it
   * avoids parsing on every render / function call
   */
  const parsedData = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
  }, [block?.dt]);

  /**
   * Current display mode
   * b = block (default)
   * f = flex / inline
   */
  const currentDisplayMode = parsedData.dm ?? 'b';

  /**
   * Update display mode safely
   */
  const handleDisplayMode = (0,external_React_.useCallback)(dm => {
    if (!block) return;
    const nextData = {
      ...parsedData,
      dm
    };
    block.dt = KVParser/* default */.A.stringify(nextData);

    // remove
    handleRemoveFlex();
    if (dm == 'f') {
      handleAddFelx();
    }
    updated();
  }, [block, parsedData]);
  const handleAddFelx = () => {
    if (!block || !designData) {
      return;
    }
    if (!designData.base) {
      designData.base = {};
    }
    const DEFAULT_FLEX = {
      dp: 'flex',
      // display: flex
      fd: 'row',
      // flex-direction: row
      ai: 'center',
      // align-items: center
      jc: 'center' // justify-content: center
    };
    Object.entries(DEFAULT_FLEX).forEach(_ref3 => {
      let [property, value] = _ref3;
      if (!designData.base[property]) {
        designData.base[property] = {
          vs: 'm',
          value
        };
      }
    });
    if (editingVariant) {
      if (!designData[editingVariant]) {
        designData[editingVariant] = {};
      }
      if (!designData[editingVariant].gp) {
        designData[editingVariant].gp = {
          vs: 'm',
          value: '10px'
        };
      }
    }
    const comp = (0,styleCodec/* compactDesign */.g)(designData);
    block.d = comp;
    updated();
  };
  const handleRemoveFlex = () => {
    if (!block || !designData) {
      return;
    }

    // Remove non-animatable flex props from base variant
    if (designData.base) {
      ['dp', 'fd', 'ai', 'jc'].forEach(property => {
        if (designData.base[property]) {
          delete designData.base[property];
        }
      });

      // Clean up base if empty
      if (Object.keys(designData.base).length === 0) {
        delete designData.base;
      }
    }

    // Remove animatable gap from editingVariant
    if (editingVariant && designData[editingVariant]) {
      if (designData[editingVariant].gp) {
        delete designData[editingVariant].gp;
      }

      // Clean up variant if empty
      if (Object.keys(designData[editingVariant]).length === 0) {
        delete designData[editingVariant];
      }
    }
    const comp = (0,styleCodec/* compactDesign */.g)(designData);
    block.d = comp;
    updated();
  };

  /**
   * Pass header button
   * uses latest display mode because dependencies are correct
   */
  (0,external_React_.useEffect)(() => {
    buttonPass(sectionId, /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
      checked: currentDisplayMode !== 'b',
      onChange: () => handleDisplayMode(currentDisplayMode === 'b' ? 'f' : 'b'),
      color: "rgb(153 177 210)",
      size: "xs",
      radius: "xs"
    }));
  }, [sectionId, currentDisplayMode]);
  const handleChange = _ref4 => {
    let {
      value,
      property
    } = _ref4;
    if (!block) {
      return;
    }
    if (value && designData?.[editingVariant]) {
      if (designData?.[editingVariant]?.[property]) {
        designData[editingVariant][property].value = value;
      } else {
        // add property
        designData[editingVariant][property] = {
          vs: 'm',
          value
        };
      }
      const comp = (0,styleCodec/* compactDesign */.g)(designData);
      block.d = comp;
    }
    updated();
  };
  const getValue = property => {
    return designData?.[editingVariant]?.[property]?.value || '';
  };
  if (currentDisplayMode === 'b') {
    return null;
  }
  return /*#__PURE__*/external_React_default().createElement("div", null, /*#__PURE__*/external_React_default().createElement(SegmentedControl/* SegmentedControl */.I, {
    size: "xs",
    data: [{
      label: 'Grid',
      value: 'g'
    }, {
      label: 'Flex',
      value: 'f'
    }],
    value: currentDisplayMode,
    onChange: value => handleDisplayMode(value),
    fullWidth: true
  }), currentDisplayMode === 'f' && /*#__PURE__*/external_React_default().createElement(controls_FlexAlignmentController, {
    getValue: getValue,
    onChange: handleChange
  }));
};
const AccessibilityOptionSection = _ref5 => {
  let {
    id,
    block,
    updated,
    buttonPass,
    sectionId
  } = _ref5;
  const {
    pageBlocks,
    page,
    setPage,
    editingBlock,
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const editingDevice = '';
  const designData = block?.data?.design;
  const options = block?.data?.options;
  const parsedData = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
  }, [block?.dt]);
  const currentDisplayMode = parsedData.dm ?? 'b';
  const [showAccessibilityControls, setShowAccessibilityControls] = (0,external_React_.useState)(false);

  /**
  * Pass header button
  * uses latest display mode because dependencies are correct
  */
  (0,external_React_.useEffect)(() => {
    buttonPass(sectionId, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
      radius: "lg",
      size: "sm",
      color: 'gray',
      onClick: () => setShowAccessibilityControls(!showAccessibilityControls),
      style: {
        opacity: showAccessibilityControls ? 1 : .5
      }
    }, /*#__PURE__*/external_React_default().createElement(IconAccessibleFilled/* default */.A, {
      style: {
        width: '85%',
        height: '85%'
      },
      stroke: 1.5
    })));
  }, [showAccessibilityControls]);
  const getDesignValue = property => {
    return designData?.[editingVariant]?.[property]?.value || '';
  };
  const getValue = key => {
    return options?.[key]?.value || '';
  };
  const updateValue = (key, value) => {
    if (!block || !options) {
      return;
    }
    if (options?.[key]) {
      options[key].value = value;
    } else {
      options[key] = {
        vs: 'm',
        value
      };
    }
    updated();
  };
  const handleHideFromScreenReaders = checked => {
    if (!block || !options) {
      return;
    }
    if (checked) {
      if (options?.hfsr) {
        options.hfsr.value = true;
      } else {
        options.hfsr = {
          vs: 'm',
          value: true
        };
      }

      // delete SRL when hidden
      delete options.srl;

      // Also reset focusable to false because hidden elements shouldn't be focusable
      delete options.focusable;
    } else {
      delete options.hfsr;
    }
    updated();
  };

  // New handler for Focusable toggle
  const handleFocusableToggle = checked => {
    if (!block || !options) return;
    if (checked) {
      options.focusable = {
        vs: 'm',
        value: true
      };
    } else {
      delete options.focusable;
    }
    updated();
  };
  const isAriaHidden = options?.hfsr?.value === true;
  const tag = getValue('t') || 'div';

  // Native focusable tags that get keyboard focus automatically
  const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

  // Determine if we can show & enable the Focusable toggle
  const canToggleFocusable = !isAriaHidden && !nativeFocusableTags.includes(tag);

  // Get focusable option value
  const isFocusable = options?.focusable?.value === true;
  let screenReaderLabel = 'Screen Reader Label';
  if (tag === 'a') {
    screenReaderLabel = 'Link Label';
  }
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "HTML Tag"), /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    size: "xs",
    radius: "lg",
    data: [{
      label: 'Div',
      value: 'div'
    }, {
      label: 'Section',
      value: 'section'
    }, {
      label: 'Main',
      value: 'main'
    }, {
      label: 'Header',
      value: 'header'
    }, {
      label: 'Footer',
      value: 'footer'
    }, {
      label: 'Navigation',
      value: 'nav'
    }, {
      label: 'Link',
      value: 'a'
    }],
    value: tag,
    onChange: v => updateValue('t', v),
    checkIconPosition: "right",
    allowDeselect: false
  })), showAccessibilityControls && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, !isAriaHidden && /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, screenReaderLabel), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    onChange: e => updateValue('srl', e.currentTarget.value),
    value: getValue('srl')
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "Hide from Screen Readers"), /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
    checked: isAriaHidden,
    onChange: e => handleHideFromScreenReaders(e.currentTarget.checked),
    radius: "sm",
    color: "rgb(153 177 210)",
    size: "xs"
  })), canToggleFocusable && /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "Focusable"), /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
    checked: isFocusable,
    onChange: e => handleFocusableToggle(e.currentTarget.checked),
    radius: "sm",
    color: "rgb(153 177 210)",
    size: "xs"
  }))));
};
const LinkOptionSection = _ref6 => {
  let {
    id,
    block,
    updated,
    buttonPass,
    sectionId
  } = _ref6;
  const {
    pageBlocks,
    page,
    setPage,
    editingBlock,
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const editingDevice = '';
  const designData = block?.data?.design;
  const options = block?.data?.options;
  const parsedData = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
  }, [block?.dt]);
  const currentDisplayMode = parsedData.dm ?? 'b';
  const [showAllOptions, setShowAllOptions] = (0,external_React_.useState)(false);

  /**
  * Pass header button
  * uses latest display mode because dependencies are correct
  */
  (0,external_React_.useEffect)(() => {
    buttonPass(sectionId, /*#__PURE__*/external_React_default().createElement(ActionIcon/* ActionIcon */.M, {
      variant: "transparent",
      radius: "lg",
      size: "sm",
      color: 'gray',
      onClick: () => setShowAllOptions(!showAllOptions),
      style: {
        opacity: showAllOptions ? 1 : .5
      }
    }, /*#__PURE__*/external_React_default().createElement(IconDots/* default */.A, {
      style: {
        width: '85%',
        height: '85%'
      },
      stroke: 1.5
    })));
  }, [showAllOptions]);
  const getDesignValue = property => {
    return designData?.[editingVariant]?.[property]?.value || '';
  };
  const getValue = key => {
    return options?.[key]?.value || '';
  };
  const updateValue = (key, value) => {
    if (!block || !options) {
      return;
    }
    if (options?.[key]) {
      options[key].value = value;
    } else {
      options[key] = {
        vs: 'm',
        value
      };
    }
    updated();
  };
  const updateDownloadValue = (key, value) => {
    if (!block || !options) {
      return;
    }
    if (options?.[key]) {
      options[key].value = value;
    } else {
      options[key] = {
        vs: 'm',
        value
      };
    }
    if (!value) {
      delete options?.ldon;
    }
    updated();
  };
  const handleHideFromScreenReaders = checked => {
    if (!block || !options) {
      return;
    }
    if (checked) {
      if (options?.hfsr) {
        options.hfsr.value = true;
      } else {
        options.hfsr = {
          vs: 'm',
          value: true
        };
      }

      // delete SRL when hidden
      delete options.srl;

      // Also reset focusable to false because hidden elements shouldn't be focusable
      delete options.focusable;
    } else {
      delete options.hfsr;
    }
    updated();
  };

  // New handler for Focusable toggle
  const handleFocusableToggle = checked => {
    if (!block || !options) return;
    if (checked) {
      options.focusable = {
        vs: 'm',
        value: true
      };
    } else {
      delete options.focusable;
    }
    updated();
  };
  const isAriaHidden = options?.hfsr?.value === true;
  const tag = getValue('t') || 'div';

  // Native focusable tags that get keyboard focus automatically
  const nativeFocusableTags = ['a', 'button', 'input', 'select', 'textarea'];

  // Determine if we can show & enable the Focusable toggle
  const canToggleFocusable = !isAriaHidden && !nativeFocusableTags.includes(tag);

  // Get focusable option value
  const isFocusable = options?.focusable?.value === true;
  const REL_ATTRIBUTE_OPTIONS = [{
    label: 'No Opener',
    value: 'noopener'
  }, {
    label: 'No Referrer',
    value: 'noreferrer'
  }, {
    label: 'No Follow',
    value: 'nofollow'
  }, {
    label: 'Sponsored',
    value: 'sponsored'
  }, {
    label: 'User Generated Content',
    value: 'ugc'
  }];
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "URL"), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    onChange: e => updateValue('lURL', e.currentTarget.value),
    value: getValue('lURL')
  })), showAllOptions && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "Open in New Tab"), /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
    checked: getValue('lnt'),
    onChange: e => updateValue('lnt', e.currentTarget.checked),
    radius: "sm",
    color: "rgb(153 177 210)",
    size: "xs"
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "Download"), /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
    checked: getValue('ldo'),
    onChange: e => {
      updateDownloadValue('ldo', e.currentTarget.checked);
    },
    radius: "sm",
    color: "rgb(153 177 210)",
    size: "xs"
  })), getValue('ldo') && /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "File Name"), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    onChange: e => updateValue('ldon', e.currentTarget.value),
    value: getValue('ldon')
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      flex: 1
    }
  }, "Rel Attribute"), /*#__PURE__*/external_React_default().createElement(MultiSelect/* MultiSelect */.K, {
    size: "xs",
    radius: 3,
    variant: "filled",
    data: REL_ATTRIBUTE_OPTIONS,
    value: getValue('lrel')?.split(' ').filter(Boolean),
    onChange: v => updateValue('lrel', v?.join(' ')),
    clearable: true
  }))));
};

// Initial block configuration
const blockConfig = {
  title: 'Box',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* BoxIcon */.FnH, null),
  cats: ['layout'],
  type: 'b',
  children: true,
  rootAllow: true,
  childCats: ['basic', 'layout', 'template'],
  designSections: ['position', 'size', 'spacing', 'border', 'layout', 'typography', 'transform', 'transformSpace', 'backdropFilter', 'visibility', 'background'],
  props: {
    design: `
            base{pt:re;w:100px;h:100px;}
        `,
    options: 't=div;',
    animations: {},
    variants: [{
      id: 'base'
    }],
    designTypes: '',
    lt: 'bl',
    mode: 'e'
  },
  optionSections: [{
    label: 'Link Options',
    component: LinkOptionSection,
    condition: "t=a"
  }, {
    label: 'Postion',
    component: optionSections_PositionSection
  }, {
    label: 'Layout',
    component: LayoutOptionSection
  }, {
    label: 'Appearance',
    component: AppearanceSection
  }, {
    label: 'Background',
    component: optionSections_BackgroundsSection
  }, {
    label: 'Variables',
    component: VariablesOptionSection,
    condition: "_mode=c"
  }, {
    label: 'Transition',
    component: optionSections_TransitionSection
  }, {
    label: 'Interaction',
    component: InteractiveIdSection
  }, {
    label: 'Variant Interaction Map',
    component: VariantMapSection
  }, {
    label: 'Variant Options',
    component: VariantOptionSection
  }, {
    label: 'Accessibility & Semantics',
    component: AccessibilityOptionSection
  }]
};

// Create a new block instance
const box = new blockTemplate/* Block */.e(blockConfig);

//
const stack = new blockTemplate/* Block */.e({
  ...blockConfig,
  title: 'Stack',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* DimensionsIcon */.rtY, null),
  preset: 'stack',
  props: {
    ...blockConfig.props,
    design: {
      base: {
        ...blockConfig.props.design.st,
        st: {
          pt: {
            vs: "m",
            value: "re"
          },
          dti: {
            vs: "m",
            value: "0"
          },
          dt: {
            vs: "m",
            value: "fl"
          },
          va: {
            vs: "m",
            value: "top"
          },
          fd: {
            vs: "m",
            value: "ro"
          },
          jc: {
            vs: "m",
            value: "fs"
          },
          ai: {
            vs: "m",
            value: "fs"
          },
          ac: {
            vs: "m",
            value: "fs"
          },
          cgp: {
            vs: "m",
            value: [10, "px"]
          },
          rgp: {
            vs: "m",
            value: [10, "px"]
          },
          fw: {
            vs: "m",
            value: "nw"
          }
        }
      }
    }
  }
});
const grid = new blockTemplate/* Block */.e({
  ...blockConfig,
  title: 'Grid',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* GridIcon */.ag, null),
  preset: 'grid',
  props: {
    ...blockConfig.props,
    ...blockConfig.props.design.st,
    design: {
      base: {
        st: {
          pt: {
            vs: "m",
            value: "re"
          },
          dti: {
            vs: "m",
            value: "0"
          },
          dt: {
            vs: "m",
            value: "gr"
          },
          va: {
            vs: "m",
            value: "top"
          },
          w: {
            vs: "m",
            value: [100, "%"]
          },
          h: {
            vs: "m",
            value: [100, "px"]
          },
          gt: {
            vs: "m",
            value: {
              c: [[1, "fr"], [1, "fr"]],
              r: [[1, "fr"], [1, "fr"]]
            }
          },
          ai: {
            vs: "m",
            value: "fs"
          },
          ji: {
            vs: "m",
            value: "fs"
          },
          rgp: {
            vs: "m",
            value: [10, "px"]
          },
          cgp: {
            vs: "m",
            value: [10, "px"]
          }
        }
      }
    },
    gridLayoutMap: {
      base: {}
    }
  }
});
const sceneTransition = new blockTemplate/* Block */.e({
  ...blockConfig,
  title: 'Scene Transition',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* MaskOffIcon */.vcq, null),
  preset: 'sceneTransition',
  cats: ['wrappers'],
  childCats: ['basic', 'layout'],
  designSections: null,
  options: {
    transition: {
      label: 'Transition',
      actions: true,
      order: ['ldu', 'crd'],
      properties: {
        ldu: {
          label: 'Loader Duration (ms)',
          controlType: 'number',
          lock: true,
          inputData: {
            nagative: false
          },
          responsive: false,
          colorMode: false,
          data: {
            vs: 'm',
            value: 1000
          }
        },
        crd: {
          label: 'Content Reveal Delay (ms)',
          controlType: 'number',
          lock: true,
          inputData: {
            nagative: false
          },
          responsive: false,
          colorMode: false,
          data: {
            vs: 'm',
            value: 500
          }
        }
      }
    }
  },
  props: {
    ...blockConfig.props,
    options: {
      tag: {
        vs: 'm',
        value: 'section'
      },
      wrapper: {
        vs: 'm',
        value: 'sceneTransition'
      },
      ldu: {
        vs: 'm',
        value: 1000
      },
      crd: {
        vs: 'm',
        value: 500
      }
    }
  }
});
/* harmony default export */ const base = (box);

//  animations: {
//             'base-hover': {
//                 bgc: [
//                     { v: 'teal', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//                 tx: [
//                     { v: '100px', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//                 ty: [
//                     { v: '100px', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//                 scx: [
//                     { v: '2', du: 400, e: 'cubic-bezier(0.4, 0, 0.8, 0.7)' },
//                     { v: null, du: 400, e: 'cubic-bezier(0.2, 0.3, 0.8, 0.7)' },
//                 ],
//             },
//             'hover-base': {
//                 bgc: [
//                     { v: null, du: 600, e: 'ease-in' },
//                 ],
//                 tx: [
//                     { v: null, du: 500 },
//                 ],
//                 ty: [
//                     { v: null, du: 500 },
//                 ],
//                 scx: [
//                     { v: null, du: 500 },
//                 ],

//             },
//         },
// EXTERNAL MODULE: ./src/BlockEditor/util/blockDataUtils.ts
var blockDataUtils = __webpack_require__(3545);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconBrandWordpress.mjs
var IconBrandWordpress = __webpack_require__(9301);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconLoader2.mjs
var IconLoader2 = __webpack_require__(7854);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/design.tsx










const SizeIcon = () => /*#__PURE__*/external_React_default().createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12"
}, /*#__PURE__*/external_React_default().createElement("g", {
  id: "Rectangle_4711",
  "data-name": "Rectangle 4711",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1"
}, /*#__PURE__*/external_React_default().createElement("rect", {
  width: "12",
  height: "12",
  rx: "2",
  stroke: "none"
}), /*#__PURE__*/external_React_default().createElement("rect", {
  x: "0.5",
  y: "0.5",
  width: "11",
  height: "11",
  rx: "1.5",
  fill: "none"
})), /*#__PURE__*/external_React_default().createElement("rect", {
  id: "Rectangle_4712",
  "data-name": "Rectangle 4712",
  width: "1",
  height: "10",
  transform: "translate(3 1)",
  fill: "currentColor"
}), /*#__PURE__*/external_React_default().createElement("rect", {
  id: "Rectangle_4713",
  "data-name": "Rectangle 4713",
  width: "1",
  height: "10",
  transform: "translate(1 4) rotate(-90)",
  fill: "currentColor"
}));
const WorkSpaceSection = _ref => {
  let {
    block,
    updated
  } = _ref;
  const handleChange = (value, property) => {
    if (!block) {
      return;
    }
    if (value && block.data?.options) {
      if (block?.data?.options?.[property]?.value) {
        block.data.options[property].value = value;
      } else {
        // add property
        block.data.options[property] = {
          value,
          vs: 'm'
        };
      }
    }
    updated();
  };
  const getValue = property => {
    return block?.data?.options?.[property]?.value || '';
  };
  const getPlaceholder = property => {
    return block?.data?.options?.[property]?.value || '';
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Surface"), /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
    value: getValue('size'),
    placeholder: getPlaceholder('size'),
    onChange: v => {
      handleChange(v, 'size');
    },
    icon: /*#__PURE__*/external_React_default().createElement(SizeIcon, null),
    min: 10,
    max: 100
  }), /*#__PURE__*/external_React_default().createElement(Controls_ColorPickerControl, {
    currentColor: getValue('bg'),
    onChange: v => {
      handleChange(v, 'bg');
    }
  }));
};
const ConnectionSection = _ref2 => {
  let {
    id,
    block,
    updated
  } = _ref2;
  const {
    pageBlocks,
    setPage,
    editingDesignId,
    postData
  } = (0,EditorContext/* useEditorContext */.m)();
  const root = pageBlocks.current.get('root');
  if (root) {
    (0,blockDataUtils/* default */.A)(root);
  }
  const rootOptions = root?.data?.options;
  const [checked, setChecked] = (0,external_React_.useState)(rootOptions?.ad?.value === id);
  const [saving, setSaving] = (0,external_React_.useState)(false);
  const handleChange = async value => {
    // Only proceed if turning ON (connecting)
    if (!value) return;
    setSaving(true);
    setChecked(true);
    try {
      /**
       * 1. Trigger the API Sync
       * kit_id comes from the current block ID
       * design_id comes from context (the overall design file post ID)
       */
      await (0,wpApi/* setActiveKitConnection */.JB)({
        kit_id: id,
        design_id: parseInt(postData.id)
      });

      // 2. Internal State Logic
      const designBlock = pageBlocks.current.get(editingDesignId);
      const designOptions = designBlock?.data?.options;
      const assetId = designOptions?.assid?.value;
      if (assetId && designOptions.tp.value) {
        designOptions.tp.value[assetId] = true;
      }
      if (!rootOptions) {
        root.data = {
          options: {},
          design: {}
        };
      }
      root.data.options.ad = {
        value: id
      };

      // 3. Update Editor State
      setPage(prev => ({
        ...prev,
        root: Date.now(),
        [id]: Date.now()
      }));

      // Notify parent if needed
      updated();
    } catch (error) {
      console.error("Connection failed", error);
      setChecked(false); // Revert UI if API fails
    } finally {
      setSaving(false);
    }
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      minHeight: 32
    }
  }, checked ? /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      background: '#1d1d1d',
      padding: '4px 12px 4px 4px',
      borderRadius: 20,
      opacity: saving ? 0.7 : 1
    }
  }, /*#__PURE__*/external_React_default().createElement(IconBrandWordpress/* default */.A, {
    size: 20,
    stroke: 1.5,
    color: "#228be6"
  }), /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      color: '#69db7c',
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, saving ? /*#__PURE__*/external_React_default().createElement(IconLoader2/* default */.A, {
    size: 14,
    className: "animate-spin"
  }) : /*#__PURE__*/external_React_default().createElement(IconCheck/* default */.A, {
    size: 14,
    stroke: 1.5,
    color: "#69db7c"
  }), saving ? 'Connecting...' : 'Connected')) : /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      minHeight: 32
    }
  }, /*#__PURE__*/external_React_default().createElement(IconBrandWordpress/* default */.A, {
    size: 20,
    stroke: 1.5
  }), "Connect to Site"), /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
    checked: checked,
    loading: saving,
    onChange: event => !checked && handleChange(event.currentTarget.checked),
    disabled: checked || saving
  })));
};

// Initial block configuration
const config = {
  title: 'Design',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* ArchiveIcon */.kbr, null),
  cats: [],
  type: 'de',
  children: true,
  rootAllow: true,
  childCats: ['frame'],
  props: {
    options: 'size=10; bg=#414141~#141414; assid=null; tp=()'
  },
  designSections: null,
  optionSections: [{
    label: 'WorkSpace',
    component: WorkSpaceSection
  }, {
    label: 'Connection',
    component: ConnectionSection
  }]
};

// Create a new block instance
const block = new blockTemplate/* Block */.e(config);
/* harmony default export */ const design = (block);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/OptionPanel/components/Controls/SelectWithIconControl.module.css
var SelectWithIconControl_module = __webpack_require__(5875);
;// CONCATENATED MODULE: ./src/BlockEditor/OptionPanel/components/Controls/SelectWithIconControl.module.css

      
      
      
      
      
      
      
      
      

var SelectWithIconControl_module_options = {};

SelectWithIconControl_module_options.styleTagTransform = (styleTagTransform_default());
SelectWithIconControl_module_options.setAttributes = (setAttributesWithoutAttributes_default());
SelectWithIconControl_module_options.insert = insertBySelector_default().bind(null, "head");
SelectWithIconControl_module_options.domAPI = (styleDomAPI_default());
SelectWithIconControl_module_options.insertStyleElement = (insertStyleElement_default());

var SelectWithIconControl_module_update = injectStylesIntoStyleTag_default()(SelectWithIconControl_module/* default */.Ay, SelectWithIconControl_module_options);




       /* harmony default export */ const Controls_SelectWithIconControl_module = (SelectWithIconControl_module/* default */.Ay && SelectWithIconControl_module/* default */.Ay.locals ? SelectWithIconControl_module/* default */.Ay.locals : undefined);

;// CONCATENATED MODULE: ./src/BlockEditor/OptionPanel/components/Controls/SelectWithIconControl.tsx



const control = _ref => {
  let {
    value: initialValue,
    onChange,
    icon,
    data,
    placeholder
  } = _ref;
  const [value, setValue] = (0,external_React_.useState)(initialValue);
  const iconRef = (0,external_React_.useRef)(null);
  const [firstRender, setFirstRender] = (0,external_React_.useState)(true);
  (0,external_React_.useEffect)(() => {
    setFirstRender(false);
  }, []);
  (0,external_React_.useEffect)(() => {
    if (firstRender) {
      return;
    }
    onChange(value);
  }, [value]);
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: SelectWithIconControl_module/* control */.A4
  }, /*#__PURE__*/external_React_default().createElement("div", {
    ref: iconRef,
    className: SelectWithIconControl_module/* control_icon_wrap */.d3
  }, /*#__PURE__*/external_React_default().createElement("span", {
    className: SelectWithIconControl_module/* control_icon */.gW
  }, icon)), /*#__PURE__*/external_React_default().createElement("div", {
    className: SelectWithIconControl_module/* control_wrap */.DY
  }, /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    variant: "unstyled",
    size: "xs",
    radius: "xs",
    placeholder: placeholder || 'Select',
    data: data,
    onChange: setValue,
    value: value
  })));
};
/* harmony default export */ const SelectWithIconControl = (control);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconLayoutNavbar.mjs
var IconLayoutNavbar = __webpack_require__(9809);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconLayoutBottombar.mjs
var IconLayoutBottombar = __webpack_require__(7233);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/frame.tsx







const handleFrameTypes = _ref => {
  let {
    frameType,
    blockId,
    page,
    setPage,
    pageBlocks,
    editingDesignId,
    markFrameDirty
  } = _ref;
  const updatedPage = {
    ...page
  };
  const frameBlock = pageBlocks.current.get(blockId);
  const options = frameBlock?.data?.options;
  const currentType = options?.type.value;

  // Remove from dirty list.
  markFrameDirty(blockId, false, true);
  // Remove usefor option if exist.
  if (options?.usefor?.value) {
    options.usefor.value = null;
  }
  if (currentType === 'header' || currentType === 'footer') {
    const frames = pageBlocks.current.get(editingDesignId)?.c || [];
    /* 
     * Remove this frame ID if it is referenced as a template in other frames 
     */
    frames?.forEach((frameId, i) => {
      const frame = pageBlocks.current.get(frameId);
      if (frame) {
        const keys = {
          header: 'th',
          footer: 'tf'
        };
        const key = keys[currentType];
        const tempId = frame?.data?.options?.[key]?.value;
        if (tempId === blockId && frame?.data?.options) {
          frame.data.options[key] = {
            value: null
          };
          updatedPage[frameId] = Date.now() + i;
        }
      }
    });
  }
  if (options) {
    options.type = {
      value: frameType
    };
  }
  const designBlock = pageBlocks.current.get(editingDesignId);
  const designOptions = designBlock?.data?.options;
  if (designOptions?.tp?.value) {
    delete designOptions.tp.value[blockId];
  }
  updatedPage[blockId] = Date.now();
  updatedPage[editingDesignId] = Date.now();
  setPage(updatedPage);
};
const AssignmentSection = _ref2 => {
  let {
    id,
    block,
    updated
  } = _ref2;
  const {
    page,
    setPage,
    pageBlocks,
    editingDesignId,
    markFrameDirty
  } = (0,EditorContext/* useEditorContext */.m)();
  const handleChange = (value, property) => {
    if (!block) {
      return;
    }
    if (block.o) {
      //TODO review this
      if (block?.data?.options?.[property]) {
        block.data.options[property].value = value;
      } else {
        // add property
        if (block.data) {
          if (!block.data.options) {
            block.data.options = {};
          }
          block.data.options[property] = {
            vs: 'm',
            value
          };
        }
      }
    }
    if (property === 'usefor') {
      markFrameDirty(id, false, value ? false : true);
    } else if (property === 'ufs') {
      markFrameDirty(id, false, value === 'on' ? false : true);
    }
    updated();
  };
  const getValue = property => {
    return block?.data?.options?.[property]?.value || '';
  };
  const canPublish = () => {
    const root = pageBlocks.current.get('root');
    if (root.data?.options?.ad?.value === editingDesignId) {
      return true;
    }
    return false;
  };
  const isPart = getValue('type') !== 'page';
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Frame type"), /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    allowDeselect: false,
    defaultValue: "page",
    data: [{
      label: 'Page',
      value: 'page'
    }, {
      label: 'Header',
      value: 'header'
    }, {
      label: 'Footer',
      value: 'footer'
    }, {
      label: 'loader',
      value: 'loader'
    }],
    value: getValue('type'),
    onChange: value => value && handleFrameTypes({
      frameType: value,
      blockId: id,
      page,
      setPage,
      pageBlocks,
      editingDesignId: editingDesignId,
      markFrameDirty
    }),
    w: "100%"
  }), canPublish() && getValue('type') === 'page' && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Use for"), /*#__PURE__*/external_React_default().createElement(Select/* Select */.l, {
    variant: "filled",
    size: "xs",
    radius: "xl",
    allowDeselect: true,
    placeholder: "select",
    data: [{
      label: 'Home',
      value: 'home'
    },
    // { label: 'Posts', value: 'posts' },
    // { label: 'Page', value: 'single-page' },
    // { label: 'Archive', value: 'archive' },
    // { label: 'Search', value: 'search' },
    {
      label: '404',
      value: '404'
    }
    // { label: 'Page Template', value: 'page-template' },
    ],
    value: getValue('usefor'),
    onChange: value => handleChange(value, 'usefor'),
    w: "100%"
  })), isPart && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Use on Site"), /*#__PURE__*/external_React_default().createElement(SegmentedControl/* SegmentedControl */.I, {
    value: getValue('ufs'),
    onChange: value => handleChange(value, 'ufs'),
    data: [{
      label: 'On',
      value: 'on'
    }, {
      label: 'Off',
      value: 'off'
    }],
    fullWidth: true,
    size: "xs",
    radius: "xl"
  })));
};
const LayoutSection = _ref3 => {
  let {
    id,
    block,
    updated
  } = _ref3;
  const {
    pageBlocks,
    editingDesignId,
    markFrameDirty
  } = (0,EditorContext/* useEditorContext */.m)();
  const getSetData = () => {
    const frames = pageBlocks.current.get(editingDesignId)?.c || [];
    const result = {
      headerData: [],
      footerData: []
    };
    frames.forEach(frameId => {
      const frame = pageBlocks.current.get(frameId);
      if (!frame) return;
      const frameType = frame.data?.options?.type?.value;
      if (frameType === 'header' || frameType === 'footer') {
        result[`${frameType}Data`].push({
          label: frame.l || frameType,
          value: frameId
        });
      }
    });
    return result;
  };
  const {
    headerData,
    footerData
  } = getSetData();
  const onChange = (type, id) => {
    const keys = {
      header: 'th',
      footer: 'tf'
    };
    const key = keys[type];
    const options = block.data?.options;
    if (options && key) {
      options[key] = {
        value: id
      };
      updated();
    }
  };
  const getValue = type => {
    const keys = {
      header: 'th',
      footer: 'tf'
    };
    const key = keys[type];
    const options = block.data?.options;
    return options?.[key]?.value;
  };
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/external_React_default().createElement(SelectWithIconControl, {
    value: getValue('header'),
    onChange: v => onChange('header', v),
    icon: /*#__PURE__*/external_React_default().createElement(IconLayoutNavbar/* default */.A, {
      stroke: 1.5,
      size: 14
    }),
    data: headerData,
    placeholder: "Select header"
  }), /*#__PURE__*/external_React_default().createElement(SelectWithIconControl, {
    value: getValue('footer'),
    onChange: v => onChange('footer', v),
    icon: /*#__PURE__*/external_React_default().createElement(IconLayoutBottombar/* default */.A, {
      stroke: 1.5,
      size: 14
    }),
    data: footerData,
    placeholder: "Select footer"
  }));
};

// Initial block configuration
const frame_config = {
  title: 'Frame',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* FrameIcon */.H0W, null),
  cats: ['frame'],
  type: 'fr',
  children: true,
  rootAllow: false,
  childCats: ['basic', 'layout', 'template'],
  props: {
    options: 'p=(x:0,y:0);type=page;th=null;tf=null;ufs=off'
  },
  designSections: null,
  optionSections: [{
    label: 'Assignment',
    component: AssignmentSection
  }, {
    label: 'Layout',
    component: LayoutSection,
    condition: 'type=page'
  }]
};

// Create a new block instance
const frame_block = new blockTemplate/* Block */.e(frame_config);
/* harmony default export */ const Blocks_frame = (frame_block);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/instance.tsx





const CustomizeOptionSection = _ref => {
  let {
    id,
    block,
    updated
  } = _ref;
  const {
    pageBlocks
  } = (0,EditorContext/* useEditorContext */.m)();
  const componentId = block.c?.[0];
  if (!componentId) return null;
  const componentBlock = pageBlocks.current.get(componentId);
  if (!componentBlock) return null;
  const componentVars = componentBlock.data?.options?.vars?.value || {};

  // ---------------------------------------------------------------------------
  // Ensure instance vars option exists
  // ---------------------------------------------------------------------------
  if (block.data?.options && !block.data.options.vars) {
    block.data.options.vars = {
      value: {}
    };
  }
  const instanceVars = block.data.options.vars.value;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleVarChange = (vid, value) => {
    instanceVars[vid] = value;
    updated();
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, Object.values(componentVars).map(v => {
    const currentValue = instanceVars[v.id] !== undefined ? instanceVars[v.id] : v.default ?? '';

    // ---------------------------------------------------------------
    // Type: simple text ("t")
    // ---------------------------------------------------------------
    if (v.type === 't') {
      return /*#__PURE__*/external_React_default().createElement("div", {
        key: v.id,
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
          alignItems: 'center'
        }
      }, /*#__PURE__*/external_React_default().createElement("span", {
        style: {
          fontSize: 11
        }
      }, v.name), /*#__PURE__*/external_React_default().createElement(Input/* Input */.p, {
        variant: "filled",
        size: "xs",
        radius: "xl",
        value: currentValue,
        onChange: e => handleVarChange(v.id, e.currentTarget.value)
      }));
    }
    return null;
  }));
};

// Initial block configuration
const instance_blockConfig = {
  title: 'Instance',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* ComponentInstanceIcon */.oqu, null),
  cats: [],
  type: 'i',
  children: true,
  rootAllow: false,
  childCats: ['basic'],
  designSections: [],
  props: {
    options: 'vars=()',
    mode: 'i'
  },
  optionSections: [{
    label: 'Customize',
    component: CustomizeOptionSection
  }]
};

// Create a new block instance
const instance = new blockTemplate/* Block */.e(instance_blockConfig);
/* harmony default export */ const Blocks_instance = (instance);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Textarea/Textarea.mjs + 4 modules
var Textarea = __webpack_require__(5917);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Divider/Divider.mjs + 1 modules
var Divider = __webpack_require__(3403);
// EXTERNAL MODULE: ./node_modules/@tabler/icons-react/dist/esm/icons/IconVariable.mjs
var IconVariable = __webpack_require__(6833);
// EXTERNAL MODULE: ./node_modules/rctx-contextmenu/dist/index.es.js
var index_es = __webpack_require__(9068);
// EXTERNAL MODULE: ./src/BlockEditor/util/optionCodec.ts
var optionCodec = __webpack_require__(854);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/optionSections/TypoSection.tsx









/* ---------------------------------------------
 * Types
 * -------------------------------------------- */

/* ---------------------------------------------
 * Utils
 * -------------------------------------------- */

const normalizeRole = label => label.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
const roleFromCssVar = value => {
  if (!value) return null;
  const match = value.match(/--addifect-f-(.+)\)/);
  return match?.[1] ?? null;
};

/**
 * Normalize font variants into usable weights + italic support
 */
function normalizeFontVariants(variants) {
  const weights = new Set();
  let hasItalic = false;
  if (!variants || !variants.length) {
    return {
      weights: ['400'],
      hasItalic: false
    };
  }
  variants.forEach(variant => {
    const v = variant.toLowerCase();

    // regular → 400
    if (v === 'regular') {
      weights.add('400');
      return;
    }

    // italic → 400 + italic
    if (v === 'italic') {
      weights.add('400');
      hasItalic = true;
      return;
    }

    // 700italic
    if (v.endsWith('italic')) {
      hasItalic = true;
      const w = v.replace('italic', '');
      if (/^\d+$/.test(w)) weights.add(w);
      return;
    }

    // numeric weight
    if (/^\d+$/.test(v)) {
      weights.add(v);
    }
  });
  return {
    weights: weights.size ? Array.from(weights).sort() : ['400'],
    hasItalic
  };
}

/* ---------------------------------------------
 * Component
 * -------------------------------------------- */

const TypoSection = _ref => {
  let {
    block,
    updated
  } = _ref;
  const {
    pageBlocks,
    editingDesignId,
    editingVariant
  } = (0,EditorContext/* useEditorContext */.m)();
  const blocks = pageBlocks.current;

  /* ---------- Resolve Assets ---------- */

  const designId = editingDesignId;
  const designBlock = blocks.get(designId);
  if (!designBlock) return null;
  const designOptions = (0,optionCodec/* decodeOptions */.f)(designBlock.o || '');
  const assetsId = designOptions.assid?.value;
  const assetsBlock = blocks.get(assetsId);
  if (!assetsBlock) return null;
  const assetsOptions = (0,optionCodec/* decodeOptions */.f)(assetsBlock.o || '');
  const fontsFolderId = assetsOptions.default?.value?.fbid;
  const fontsFolder = blocks.get(fontsFolderId);
  const fontIds = fontsFolder?.c ?? [];

  /* ---------- Font List ---------- */

  const fontList = (0,external_React_.useMemo)(() => {
    return fontIds.map(id => {
      const fontBlock = blocks.get(id);
      if (!fontBlock?.l) return null;
      const options = fontBlock.data?.options ?? (fontBlock.o ? (0,optionCodec/* decodeOptions */.f)(fontBlock.o) : null);
      const value = options?.f?.value;
      if (!value) return null;
      const [,, variants] = value;
      const role = normalizeRole(fontBlock.l);
      const {
        weights,
        hasItalic
      } = normalizeFontVariants(variants);
      return {
        id,
        label: fontBlock.l,
        role,
        cssVar: `var(--addifect-f-${role})`,
        weights,
        hasItalic
      };
    }).filter(Boolean);
  }, [fontIds, blocks]);

  /* ---------- UI Options ---------- */

  const fontFamilyOptions = (0,external_React_.useMemo)(() => fontList.map(font => ({
    label: font.label,
    value: font.cssVar
  })), [fontList]);

  /* ---------- Design Helpers ---------- */

  const designData = block.data?.design;
  const getValue = (property, variant) => designData?.[variant]?.[property]?.value ?? '';
  const handleChange = (0,external_React_.useCallback)(function (property, value) {
    let variant = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'base';
    if (!designData) return;
    designData[variant] ??= {};
    designData[variant][property] ??= {
      vs: 'm',
      value
    };
    designData[variant][property].value = value;
    block.d = (0,styleCodec/* compactDesign */.g)(designData);
    updated();
  }, [block, designData, updated]);

  /* ---------- Active Font ---------- */

  const activeFont = (0,external_React_.useMemo)(() => {
    const role = roleFromCssVar(getValue('ff', 'base'));
    return fontList.find(f => f.role === role) ?? null;
  }, [fontList, getValue]);
  const weightOptions = (0,external_React_.useMemo)(() => (activeFont?.weights ?? ['400']).map(w => ({
    label: w === '400' ? 'Regular' : w,
    value: w
  })), [activeFont]);

  /* ---------- Handlers ---------- */

  const handleFontFamilyChange = value => {
    handleChange('ff', value);
    const role = roleFromCssVar(value);
    const font = fontList.find(f => f.role === role);
    if (!font) return;

    // reset weight if unsupported
    if (!font.weights.includes(getValue('fw', 'base'))) {
      handleChange('fw', font.weights[0]);
    }

    // reset italic if unsupported
    if (!font.hasItalic) {
      handleChange('fst', 'normal');
    }
  };
  const handleItalicToggle = checked => {
    handleChange('fst', checked ? 'italic' : 'normal');
  };
  const getPlaceholder = property => {
    return designData?.base?.[property]?.value || '';
  };

  /* ---------- Render ---------- */

  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexDirection: 'column'
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/external_React_default().createElement(SelectWithIconControl, {
    icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* FontFamilyIcon */.NQl, null),
    value: getValue('ff', 'base'),
    data: fontFamilyOptions,
    onChange: v => v && handleFontFamilyChange(v)
  }), /*#__PURE__*/external_React_default().createElement(SelectWithIconControl, {
    icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* FontBoldIcon */.Sp2, null),
    value: getValue('fw', 'base'),
    data: weightOptions,
    onChange: v => v && handleChange('fw', v)
  })), /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
    value: getValue('fs', editingVariant),
    onChange: v => handleChange('fs', v, editingVariant),
    icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* FontSizeIcon */.sJR, null),
    units: [{
      label: 'px',
      value: 'px'
    }, {
      label: 'em',
      value: 'em'
    }, {
      label: 'rem',
      value: 'rem'
    }, {
      label: '%',
      value: '%'
    }, {
      label: 'vh',
      value: 'vh'
    }, {
      label: 'vw',
      value: 'vw'
    }],
    defaultUnit: "px",
    placeholder: getPlaceholder('fs') || '16px'
  }), /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
    value: getValue('lh', editingVariant),
    onChange: v => handleChange('lh', v, editingVariant),
    icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* LineHeightIcon */.bxy, null),
    units: [{
      label: '-',
      value: ''
    }, {
      label: 'px',
      value: 'px'
    }, {
      label: 'em',
      value: 'em'
    }, {
      label: 'rem',
      value: 'rem'
    }, {
      label: '%',
      value: '%'
    }, {
      label: 'vh',
      value: 'vh'
    }, {
      label: 'vw',
      value: 'vw'
    }],
    defaultUnit: ""
    // placeholder={getPlaceholder('fs') || '16px'}
  }), /*#__PURE__*/external_React_default().createElement(DragNumberInput/* default */.A, {
    value: getValue('ls', editingVariant),
    onChange: v => handleChange('ls', v, editingVariant),
    icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* LetterSpacingIcon */.Z5q, null),
    allowNegative: true,
    units: [{
      label: 'px',
      value: 'px'
    }, {
      label: 'em',
      value: 'em'
    }, {
      label: 'rem',
      value: 'rem'
    }, {
      label: '%',
      value: '%'
    }],
    defaultUnit: "px",
    step: .1
    // placeholder={getPlaceholder('fs') || '16px'}
  })), /*#__PURE__*/external_React_default().createElement(Switch/* Switch */.d, {
    label: "Italic",
    checked: getValue('fst', 'base') === 'italic',
    disabled: !activeFont?.hasItalic,
    onChange: e => handleItalicToggle(e.currentTarget.checked)
  }));
};
/* harmony default export */ const optionSections_TypoSection = (TypoSection);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/text.tsx










const ContentSection = _ref => {
  let {
    id,
    block,
    updated
  } = _ref;
  const {
    pageBlocks,
    editingComponentId
  } = (0,EditorContext/* useEditorContext */.m)();
  const PROPERTY = 'ct';

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const options = block.data?.options;
  const option = options?.[PROPERTY];
  const value = option?.value || '';
  const valueSource = option?.vs || 'm';
  const ensureOption = () => {
    if (!options) return false;
    if (!options[PROPERTY]) {
      options[PROPERTY] = {
        value: '',
        vs: 'm'
      };
    }
    return true;
  };
  const setValue = v => {
    if (!ensureOption()) return;
    options[PROPERTY].value = v;
    updated();
  };
  const setValueSource = vs => {
    if (!ensureOption()) return;
    options[PROPERTY].vs = vs;
    updated();
  };

  // ---------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------
  const getVariables = type => {
    if (!editingComponentId) return [];
    const componentBlock = pageBlocks.current.get(editingComponentId);
    if (!componentBlock) return [];
    const vars = componentBlock.data?.options?.vars?.value || {};
    return Object.values(vars).filter(v => v.type === type);
  };
  const textVars = editingComponentId ? getVariables('t') : [];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return /*#__PURE__*/external_React_default().createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/external_React_default().createElement(index_es/* ContextMenuTrigger */.Rc, {
    id: "content"
  }, /*#__PURE__*/external_React_default().createElement("span", {
    style: {
      fontSize: 11
    }
  }, "Text")), valueSource === 'var' ? /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* controlVariablePreview */.gA
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: base_module/* controlVariablePreviewIcon */.be
  }, /*#__PURE__*/external_React_default().createElement(IconVariable/* default */.A, null)), value) : /*#__PURE__*/external_React_default().createElement(Textarea/* Textarea */.T, {
    variant: "filled",
    size: "xs",
    radius: "xs",
    value: value,
    onChange: e => setValue(e.currentTarget.value),
    minRows: 40,
    maxRows: 60,
    resize: "vertical"
  }), /*#__PURE__*/external_React_default().createElement(index_es/* ContextMenu */.tz, {
    id: "content"
  }, textVars.length > 0 ? /*#__PURE__*/external_React_default().createElement(index_es/* Submenu */.Qw, {
    title: `${valueSource === 'var' ? 'Change' : 'Set'} Variable`
  }, textVars.map(v => /*#__PURE__*/external_React_default().createElement(index_es/* ContextMenuItem */.kt, {
    key: v.id,
    disabled: value === v.id,
    onClick: () => {
      setValueSource('var');
      setValue(v.id);
    }
  }, v.name)), valueSource === 'var' && /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(Divider/* Divider */.c, null), /*#__PURE__*/external_React_default().createElement(index_es/* ContextMenuItem */.kt, {
    onClick: () => {
      setValueSource('m');
      setValue('');
    }
  }, "Remove Variable"))) : /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null)));
};

// Initial block configuration
const text_blockConfig = {
  title: 'Text',
  icon: /*#__PURE__*/external_React_default().createElement(react_icons_esm/* TextIcon */.N$i, null),
  cats: ['basic'],
  type: 't',
  children: false,
  rootAllow: false,
  designSections: ['typography'],
  props: {
    design: `
            base{}
        `,
    options: 't=section;dv=base;',
    animations: {},
    variants: [{
      id: 'base'
    }],
    designTypes: '',
    lt: 'bl',
    mode: 'e'
  },
  optionSections: [{
    label: 'Content',
    component: ContentSection
  }, {
    label: 'Type',
    component: optionSections_TypoSection
  }, {
    label: 'Interactve',
    component: InteractiveIdSection
  }, {
    label: 'Variant Interaction Map',
    component: VariantMapSection
  }, {
    label: 'Variant Options',
    component: VariantOptionSection
  }]
};

// Create a new block instance
const Text = new blockTemplate/* Block */.e(text_blockConfig);
/* harmony default export */ const Blocks_text = (Text);
// EXTERNAL MODULE: ./src/BlockEditor/Blocks/assets.tsx + 3 modules
var assets = __webpack_require__(8355);
;// CONCATENATED MODULE: ./src/BlockEditor/Blocks/index.ts
//to complite
// import contentWrapper from "./contentWrap";

// elements

// import image from "./image";
// import motionText from "./motionText"; 
// import labelText from "./labelText"; 
// import text from "./text";




/**
 * Text
*/

//design system


// import entryWrap from "./entryWrap";
// import entryTemplate from "./entryTemplate";

const blockRegistry = {
  // contentWrapper,
  b: base,
  // motionText,
  // labelText,
  // image, // need to edit
  // text, // need to edit
  // entryWrap,
  // entryTemplate,
  //preset
  // stack,
  // grid,
  // sceneTransition,
  // design tool
  de: design,
  fr: Blocks_frame,
  i: Blocks_instance,
  cos: assets/* componentsBlock */.yB,
  // design system
  a: assets/* default */.Ay,
  cs: assets/* colorsBlock */.M6,
  c: assets/* colorBlock */.$5,
  fs: assets/* fontsBlock */.AG,
  f: assets/* fontBlock */.bd,
  t: Blocks_text
  // tf: textFlow
};
const blockCategories = (/* unused pure expression or super */ null && (['basic', 'layout', 'inner layout', 'template', 'elements', 'entry', 'wrappers', 'assets', 'colors', 'color', 'fonts', 'font']));

/***/ }),

/***/ 9078:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return injectStyle(GodRegistry);
  }, []);
  return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalStyle);

/***/ }),

/***/ 4970:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  z: () => (/* binding */ EditorProvider),
  m: () => (/* binding */ useEditorContext)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/util/wpApi.ts
var wpApi = __webpack_require__(2055);
// EXTERNAL MODULE: ./src/FullScreenLoader.tsx + 1 modules
var FullScreenLoader = __webpack_require__(4065);
// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__(8055);
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);
// EXTERNAL MODULE: ./src/BlockEditor/util/styleCodec.ts
var styleCodec = __webpack_require__(4390);
// EXTERNAL MODULE: ./src/BlockEditor/util/optionCodec.ts
var optionCodec = __webpack_require__(854);
// EXTERNAL MODULE: ./src/BlockEditor/Blocks/index.ts + 29 modules
var Blocks = __webpack_require__(1600);
;// CONCATENATED MODULE: ./src/hooks/useDesignSetting.ts

const defaultSerializer = {
  parse: JSON.parse,
  stringify: JSON.stringify
};
function useDesignSetting(designId, key, defaultValue) {
  let serializer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultSerializer;
  const [value, setValue] = (0,external_React_.useState)(defaultValue);

  // load when design changes
  (0,external_React_.useEffect)(() => {
    if (!designId) return;
    const raw = localStorage.getItem(`${key}_${designId}`);
    setValue(raw ? serializer.parse(raw) : defaultValue);
  }, [designId, key]);

  // save when value changes
  (0,external_React_.useEffect)(() => {
    if (!designId) return;
    localStorage.setItem(`${key}_${designId}`, serializer.stringify(value));
  }, [value, designId, key]);
  return [value, setValue];
}
// EXTERNAL MODULE: ./src/BlockEditor/util/blockTreeUtils.ts
var blockTreeUtils = __webpack_require__(677);
;// CONCATENATED MODULE: ./src/BlockEditor/EditorContext.tsx










/**
 * Block Interface
 * i: id | p: parent ID | t: type | c: children | o: options | d: design | v: variants | a: animation
 * ll: layer label | m: mode | pr: preset;
 * _c: compact
 */

;
const EditorContext = /*#__PURE__*/(0,external_React_.createContext)(undefined);
const useEditorContext = () => {
  const context = (0,external_React_.useContext)(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
const EditorProvider = _ref => {
  let {
    id,
    back,
    children
  } = _ref;
  const [loaded, setLoaded] = (0,external_React_.useState)(false);
  const [postData, setPostData] = (0,external_React_.useState)({});

  // TODO Create new time tarvel
  // State for managing the history, current state, and future state
  const [history, setHistory] = (0,external_React_.useState)([]);
  const [future, setFuture] = (0,external_React_.useState)([]);
  const [recordHistoryHash, setRecordHistoryHash] = (0,external_React_.useState)(null); // History record trigger
  const [historyChange, setHistoryChange] = (0,external_React_.useState)(null);
  const initPageBlocks = new Map();
  initPageBlocks.set('root', {
    t: 'root',
    c: [],
    o: ''
  });
  const pageBlocks = (0,external_React_.useRef)(initPageBlocks);
  const [page, setPage] = (0,external_React_.useState)({
    root: Date.now()
  });
  const [openLayers, setOpenLayers] = (0,external_React_.useState)({});
  const [panel, setPanel] = (0,external_React_.useState)({
    type: 'navigator',
    data: {}
  });
  const [editingDesignId, setEditingDesignId] = (0,external_React_.useState)(null);
  const [editingBlock, setEditingBlock] = (0,external_React_.useState)(null);
  const [editingComponentId, setEditingComponentId] = (0,external_React_.useState)(null);
  const [editingVariant, setEditingVariant] = (0,external_React_.useState)('base');
  const [device, setDevice] = (0,external_React_.useState)('default');
  const [colorMode, setColorMode] = useDesignSetting(editingDesignId, 'colorMode', 'd');
  const [refreshCanvas, setRefreshCanvas] = (0,external_React_.useState)(Date.now());
  const [postSaving, setPostSaving] = (0,external_React_.useState)(false);
  const [preview, setPreview] = (0,external_React_.useState)(null);
  const [saveState, setSaveState] = (0,external_React_.useState)('idle');
  const [outSideEditHash, setOutSideEditHash] = (0,external_React_.useState)(Date.now());
  const [editorType, setEditorType] = (0,external_React_.useState)('design');
  const [tool, setTool] = (0,external_React_.useState)('select');
  const [zoom, setZoom] = useDesignSetting(editingDesignId, 'zoom', 60);
  const [editMode, setEditMode] = (0,external_React_.useState)('ui');
  const [publishHash, setPublishHash] = (0,external_React_.useState)(Date.now());
  const [features, setFeatures] = (0,external_React_.useState)({});
  (0,external_React_.useEffect)(() => {
    const handleInit = () => {
      // Sync the global registry to local React state
      setFeatures({
        ...window.AddifectCore.registry.features
      });
    };
    window.addEventListener('addifect_init', handleInit);
    return () => window.removeEventListener('addifect_init', handleInit);
  }, []);

  // Undo functionality
  const undo = () => {
    if (history.length <= 1) return; // No more undo if only one history state exists

    const previousState = history[history.length - 2];
    // setPageStructure(cloneDeep(previousState));  // Restore page structure
    // setFuture((prevFuture) => [cloneDeep(pageStructure), ...prevFuture]);  // Add current state to future

    // Update history by removing the last state
    // setHistory((prevHistory) => cloneDeep(prevHistory).slice(0, prevHistory.length - 1));
    // setHistoryChange(Date.now());
  };

  // Redo functionality
  const redo = () => {
    if (future.length === 0) return;
    const nextState = future[0];
    // setPageStructure(cloneDeep(nextState));  // Restore pageStructure
    // setHistory((prevHistory) => [...prevHistory, cloneDeep(nextState)]);  // Push the next state back to history
    // setFuture((prevFuture) => cloneDeep(prevFuture).slice(1));  // Remove the first future state
    // setHistoryChange(Date.now());
  };

  // useEffect to record history whenever recordHistoryHash changes and pageStructure has actually changed
  // useEffect(() => {
  //     if (recordHistoryHash !== null) {
  //         const currentState = cloneDeep(pageStructure);  // Capture the latest page structure

  //         // Check if the current state is different from the last history entry to avoid redundant history entries
  //         setHistory((prevHistory) => {
  //             if (prevHistory.length === 0 || !isEqual(prevHistory[prevHistory.length - 1], currentState)) {
  //                 return [...cloneDeep(prevHistory), currentState];  // Push current state to history
  //             }
  //             return prevHistory;  // If the state is the same, don't update history
  //         });

  //         setFuture([]);  // Clear future states since we made a new change
  //     }
  // }, [recordHistoryHash]);

  // useEffect(() => {
  //     if (loaded) {
  //         setRecordHistoryHash(Date.now());
  //     }
  // }, [editingBlock, loaded]);

  (0,external_React_.useEffect)(() => {
    if (editingBlock && editingVariant !== 'base') {
      setEditingVariant('base');
    }
  }, [editingBlock]);

  // Utility function to detect if the platform is macOS
  const isMac = () => {
    // Check userAgent for macOS devices
    return window.navigator.userAgent.includes('Mac');
  };
  (0,external_React_.useEffect)(() => {
    const handleKeyDown = event => {
      const isMacOS = isMac();

      // Undo shortcut (Cmd + Z on Mac, Ctrl + Z on non-Mac)
      const undoShortcut = isMacOS && event.metaKey && event.key === 'z' && !event.shiftKey || !isMacOS && event.ctrlKey && event.key === 'z' && !event.shiftKey;

      // Redo shortcut (Cmd + Shift + Z on Mac, Ctrl + Shift + Z on non-Mac)
      const redoShortcut = isMacOS && event.metaKey && event.shiftKey && event.key === 'Z' || !isMacOS && event.ctrlKey && event.shiftKey && event.key === 'Z';
      if (undoShortcut) {
        event.preventDefault();
        undo();
      } else if (redoShortcut) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history, future]);
  const [isDirty, setIsDirty] = (0,external_React_.useState)(false);
  const dirtSkip = (0,external_React_.useRef)(false);
  const initPageData = pageStructure => {
    const versions = {};
    pageBlocks.current = new Map(Object.entries(pageStructure.blocks));
    Object.keys(pageStructure.blocks).forEach(blockId => {
      versions[blockId] = Date.now();
    });
    dirtSkip.current = true;
    setPage({
      ...versions
    });
    const root = pageBlocks.current.get('root');
    if (root?.c?.length) {
      setEditingDesignId(root.c[0]);
      setEditingBlock(root.c[0]);
    }
  };
  const isInitialMount = (0,external_React_.useRef)(true); // track first render

  (0,external_React_.useEffect)(() => {
    if (isInitialMount.current) {
      // skip first run
      isInitialMount.current = false;
      return;
    }
    if (dirtSkip.current) {
      dirtSkip.current = false;
      return;
    }

    // This runs only when page changes after initial load
    setIsDirty(true);
  }, [page]);

  /**
   * Load Document Data
   */
  (0,external_React_.useEffect)(() => {
    setLoaded(false);
    (0,wpApi/* getPostData */.pY)(id).then(response => {
      setPostData(response); // Set Post Data
      if (response.document_data) {
        try {
          const parsed = JSON.parse(response.document_data);
          if (parsed && typeof parsed === 'object') {
            initPageData(parsed.pageStructure);
          } else {}
        } catch (error) {
          console.error('Error parsing pageStructure:', error);
        }
      }
      setLoaded(true);
    }).catch(error => {
      console.error('Error loading post data:', error);
    });
  }, [id]);

  // let canSave = false;

  // if (editorType === 'design') {
  //     canSave = JSON.stringify(initPageStructure) !== JSON.stringify(pageStructure)
  // } else {
  //     canSave =
  //         JSON.stringify(initPageStructure) !==
  //         JSON.stringify(replaceUserDataWithEmptyObject(pageStructure)) ||
  //         JSON.stringify(initSettingsData) !==
  //         JSON.stringify(settingsData);

  //     //TODO remove setting data from here
  // }

  /**
   * Save Design File/Post
   */
  const handleSaveDesignFile = async () => {
    // Build blocks object
    const blocksObj = cloneDeep_default()(Object.fromEntries(pageBlocks.current.entries()));
    for (const id in blocksObj) {
      if (blocksObj[id]?.data?.options) {
        blocksObj[id].o = (0,optionCodec/* encodeOptions */.H)(blocksObj[id].data.options);
      }
      if (blocksObj[id]?.data?.design) {
        blocksObj[id].d = (0,styleCodec/* compactDesign */.g)(blocksObj[id].data.design);
      }
      if (blocksObj[id]?.data) {
        delete blocksObj[id].data;
      }
    }
    const ps = {
      blocks: blocksObj
    };

    // 🔥 Start saving
    setSaveState('saving');
    try {
      await (0,wpApi/* updatePostData */.Gp)({
        id,
        title: postData?.title,
        data: JSON.stringify({
          pageStructure: ps
        })
      });
      setIsDirty(false);

      // 🔥 Success animation
      setSaveState('success');

      // show success briefly
      setTimeout(() => {
        setSaveState('idle');
      }, 1200);
    } catch (error) {
      if (error?.response?.data?.code === 'unauthorized') {
        //TODO fix this to show msg log in.
      }
      console.error('Error saving post data:', error);

      // you can show error UI state if needed
      setSaveState('error');
      setTimeout(() => {
        setSaveState('idle');
      }, 1500);
    }
  };

  /**
   * Save Main Function
   * @returns 
   */
  const handleSave = async () => {
    if (editorType === 'design') {
      handleSaveDesignFile();
      return;
    }

    // TODO fix this on Content Edit
    // setPostSaving(true);

    // const ps = replaceUserDataWithEmptyObject(cloneDeep(pageStructure));

    // try {
    //     // Wait for server-side render to complete
    //     const ssr = await ServerSideRender(
    //         {
    //             pageStructure: ps,
    //             type: postData?.post_type || '',
    //             settingsData,
    //             styleData: {}
    //         });

    //     // Proceed with saving post data
    //     const response = await updatePostData(
    //         clientAPI,
    //         authToken,
    //         {
    //             id,
    //             title: postData?.title,
    //             data: JSON.stringify({
    //                 pageStructure: ps,
    //                 settings: settingsData
    //             }),
    //             ssr_html: ssr.html,
    //             ssr_styled: ssr.css,
    //         }
    //     );
    //     // setInitPageStructure(ps);
    //     setInitSettingsData(settingsData);
    // } catch (error) {
    //     if ((error as APIError)?.response?.data?.code === 'unauthorized') {
    //         setUnauthorized(true);
    //     }
    //     console.error('Error saving post data:', error);
    // } finally {
    //     setPostSaving(false);
    // }
  };

  /**
   * Set Editing Design ID
   */
  (0,external_React_.useEffect)(() => {
    if (editingBlock) {
      const blockType = pageBlocks.current.get(editingBlock)?.t;
      if (blockType === 'de') {
        setEditingDesignId(editingBlock);
      }
    }
  }, [editingBlock, loaded]);

  /**
   * Set Block Design editing mode
   */
  (0,external_React_.useEffect)(() => {
    const blockId = editingBlock;
    const block = pageBlocks.current.get(blockId);
    if (block) {
      const blockTemplate = Blocks/* blockRegistry */.R[block?.pr || block.t];
      const supportDesign = blockTemplate.designSections?.length;
      if (editMode === 'text' && !supportDesign) {
        setEditMode('ui');
      }
    }
  }, [editingBlock]);

  /** handle open tree */
  (0,external_React_.useEffect)(() => {
    if (!editingBlock) return;
    const allParents = blockTreeUtils/* default */.A.getParentsIdsUntil(pageBlocks.current, editingBlock, 'de');
    setOpenLayers(prev => {
      const next = {
        ...prev
      };
      allParents.forEach(id => {
        next[id] = true;
      });
      return next;
    });
  }, [editingBlock]);
  if (!loaded) {
    return /*#__PURE__*/external_React_default().createElement(FullScreenLoader/* default */.A, {
      variant: "1"
    });
  }
  let canEdit = true;
  const _exclude = ['addifect_design'];

  // TODO THIS MAY REMOVE AFTER CREATING POST EDITOR/BUILDER
  if (!_exclude.includes(postData?.post_type || '')) {
    if (!postData?.template_data?.default) {
      canEdit = false;
    } else {
      canEdit = true;
    }
  }

  /**
   * Set Editing Block ID
   * @param id 
   */
  const handleSetEditingBlockId = id => {
    setEditingBlock(id);
  };

  /**
   * Make Frame Dirty to Mark publish
   * @param frameId
   */
  const markFrameDirty = function (frameId) {
    let modify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const design = pageBlocks.current.get(editingDesignId);
    if (!design) return;
    const options = design.data.options ?? (design.data.options = {});
    const tpContainer = options.tp ?? (options.tp = {
      value: {}
    });
    const tp = tpContainer.value;

    // remove mode
    if (remove) {
      if (tp[frameId] === undefined) return;
      delete tp[frameId];
      return;
    }

    // already dirty → nothing to do
    if (tp[frameId] === true) return;

    // modify mode: only update existing keys
    if (modify && tp[frameId] === undefined) return;
    tp[frameId] = true;
    setPublishHash(Date.now());
  };
  return /*#__PURE__*/external_React_default().createElement(EditorContext.Provider, {
    value: {
      canEdit,
      postData,
      setPostData,
      id,
      back,
      handleSave,
      panel,
      setPanel,
      editingDesignId,
      setEditingDesignId,
      editingBlock,
      setEditingBlock,
      editingComponentId,
      setEditingComponentId,
      editingVariant,
      setEditingVariant,
      canSave: isDirty,
      device,
      setDevice,
      colorMode,
      setColorMode,
      refreshCanvas,
      setRefreshCanvas,
      postSaving,
      setPostSaving,
      recordHistoryHash,
      setRecordHistoryHash,
      historyChange,
      setHistoryChange,
      undo,
      redo,
      handleSetEditingBlockId,
      outSideEditHash,
      setOutSideEditHash,
      preview,
      setPreview,
      tool,
      setTool,
      zoom,
      setZoom,
      page,
      setPage,
      pageBlocks,
      editMode,
      setEditMode,
      markFrameDirty,
      saveState,
      publishHash,
      openLayers,
      setOpenLayers
    }
  }, children);
};

/***/ }),

/***/ 7186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ Controls_DragNumberInput)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/BlockEditor/OptionPanel/components/Controls/DragNumberInput.module.css
var DragNumberInput_module = __webpack_require__(4852);
;// CONCATENATED MODULE: ./src/BlockEditor/OptionPanel/components/Controls/DragNumberInput.module.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(DragNumberInput_module/* default */.Ay, options);




       /* harmony default export */ const Controls_DragNumberInput_module = (DragNumberInput_module/* default */.Ay && DragNumberInput_module/* default */.Ay.locals ? DragNumberInput_module/* default */.Ay.locals : undefined);

// EXTERNAL MODULE: ./node_modules/@radix-ui/react-icons/dist/react-icons.esm.js
var react_icons_esm = __webpack_require__(7049);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/NumberInput/NumberInput.mjs + 3 modules
var NumberInput = __webpack_require__(5987);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Popover/Popover.mjs + 14 modules
var Popover = __webpack_require__(8692);
;// CONCATENATED MODULE: ./src/BlockEditor/OptionPanel/components/Controls/DragNumberInput.tsx




const DragNumberInput = _ref => {
  let {
    value: initialValue,
    onChange,
    icon,
    units,
    defaultUnit = "",
    min,
    max,
    allowNegative = false,
    step = 1,
    placeholder
  } = _ref;
  const parseValue = function (v) {
    let defaultUnit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    if (v === null || v === undefined) {
      return {
        number: NaN,
        unit: defaultUnit
      };
    }
    const value = String(v).trim();

    // ✅ keyword-only value (auto, fit-content, etc.)
    if (!value.match(/\d/)) {
      return {
        number: NaN,
        unit: value
      };
    }
    const match = value.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
    if (match) {
      return {
        number: parseFloat(match[1]),
        unit: match[2] || defaultUnit
      };
    }
    return {
      number: NaN,
      unit: defaultUnit
    };
  };
  const {
    number: initialNumber,
    unit: initialUnit
  } = parseValue(initialValue);
  const [value, setValue] = (0,external_React_.useState)(isNaN(initialNumber) ? undefined : initialNumber);
  const [unit, setUnit] = (0,external_React_.useState)(() => {
    const validUnits = units?.map(u => u.value);
    if (validUnits?.includes(initialUnit)) return initialUnit;
    return defaultUnit;
  });
  const isKeywordUnit = units?.find(u => u.value === unit)?.keyword;
  const [isDragging, setIsDragging] = (0,external_React_.useState)(false);
  const [dragDir, setDragDir] = (0,external_React_.useState)(null);
  const iconRef = (0,external_React_.useRef)(null);
  const [unitOpen, setUnitOpen] = (0,external_React_.useState)(false);
  const [firstRender, setFirstRender] = (0,external_React_.useState)(true);
  (0,external_React_.useEffect)(() => {
    setFirstRender(false);
  }, []);
  (0,external_React_.useEffect)(() => {
    if (firstRender) return;

    // ✅ keyword-only emit
    if (isKeywordUnit) {
      onChange(unit);
      return;
    }
    if (value === undefined || isNaN(value)) {
      onChange("");
    } else {
      onChange(`${value}${unit}`);
    }
  }, [value, unit]);
  const clampValue = num => {
    let result = num;
    if (!allowNegative) result = Math.max(0, result);
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  };
  const handleMouseDown = e => {
    if (isKeywordUnit) return; // 🚫 disable drag for keywords

    e.preventDefault();
    iconRef.current?.requestPointerLock();
    setIsDragging(true);
    const handleMouseMove = event => {
      const delta = event.movementX;
      if (!delta) return;
      setDragDir(delta > 0 ? "right" : "left");
      setValue(v => {
        const next = (v ?? 0) + delta * step;
        return clampValue(parseFloat(next.toFixed(4)));
      });
    };
    const handleMouseUp = () => {
      document.exitPointerLock();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setIsDragging(false);
      setDragDir(null);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleManualChange = val => {
    if (isKeywordUnit) return;
    if (val === "" || val === null) {
      setValue(undefined);
      return;
    }
    const num = Number(val);
    if (!isNaN(num)) {
      setValue(clampValue(num));
    }
  };
  const currentLabel = units?.find(u => u.value === unit)?.label || unit || "";
  return /*#__PURE__*/external_React_default().createElement("div", {
    className: DragNumberInput_module/* dragNumberInput */.eT
  }, /*#__PURE__*/external_React_default().createElement("div", {
    ref: iconRef,
    onMouseDown: handleMouseDown,
    className: DragNumberInput_module/* dragNumberInput_icon_wrap */.h9
  }, /*#__PURE__*/external_React_default().createElement("span", {
    className: DragNumberInput_module/* dragNumberInput_icon */.af,
    "data-dragging": isDragging
  }, icon), /*#__PURE__*/external_React_default().createElement("span", {
    className: DragNumberInput_module/* dragNumberInput_ball */.SD,
    "data-dragging": isDragging,
    "data-dragging-direction": dragDir
  })), /*#__PURE__*/external_React_default().createElement("div", {
    className: DragNumberInput_module/* dragNumberInput_wrap */.V7
  }, /*#__PURE__*/external_React_default().createElement(NumberInput/* NumberInput */.Q, {
    variant: "unstyled",
    size: "xs",
    value: isKeywordUnit ? "" : value ?? "",
    onChange: handleManualChange,
    disabled: isKeywordUnit,
    suffix: currentLabel,
    placeholder: isKeywordUnit ? unit : placeholder
  }), units && units.length > 1 && /*#__PURE__*/external_React_default().createElement(Popover/* Popover */.A, {
    position: "bottom",
    opened: unitOpen,
    closeOnClickOutside: true,
    closeOnEscape: true
  }, /*#__PURE__*/external_React_default().createElement(Popover/* Popover */.A.Target, null, /*#__PURE__*/external_React_default().createElement("button", {
    type: "button",
    className: DragNumberInput_module/* dragNumberInput_unitTrigger */.L,
    onClick: () => setUnitOpen(v => !v)
  }, /*#__PURE__*/external_React_default().createElement(react_icons_esm/* CaretDownIcon */.bDP, null))), /*#__PURE__*/external_React_default().createElement(Popover/* Popover */.A.Dropdown, {
    style: {
      padding: 0
    }
  }, /*#__PURE__*/external_React_default().createElement("div", {
    className: DragNumberInput_module/* dragNumberInput_unitOverlay */.zA
  }, units.map(u => /*#__PURE__*/external_React_default().createElement("button", {
    key: u.value,
    className: DragNumberInput_module/* dragNumberInput_unitItem */.yr,
    "data-active": u.value === unit,
    onClick: () => {
      setUnit(u.value);
      if (u.keyword) setValue(undefined);
      setUnitOpen(false);
    }
  }, u.label)))))));
};
/* harmony default export */ const Controls_DragNumberInput = (DragNumberInput);

/***/ }),

/***/ 6953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const KVParser = {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KVParser);

/***/ }),

/***/ 3545:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   T: () => (/* binding */ removeDatafromBlocks)
/* harmony export */ });
/* harmony import */ var _optionCodec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854);
/* harmony import */ var _styleCodec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4390);


const genBlockData = block => {
  if (!block?.data) {
    // expand block options here
    block.data = {
      ...(block.d ? {
        design: (0,_styleCodec__WEBPACK_IMPORTED_MODULE_0__/* .expandDesign */ .Z)(block.d)
      } : {}),
      ...(block.o ? {
        options: (0,_optionCodec__WEBPACK_IMPORTED_MODULE_1__/* .decodeOptions */ .f)(block.o)
      } : {})
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genBlockData);
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
      copiedBlocks[id].o = (0,_optionCodec__WEBPACK_IMPORTED_MODULE_1__/* .encodeOptions */ .H)(block.data.options);
    }
    if (block.data?.design) {
      copiedBlocks[id].d = (0,_styleCodec__WEBPACK_IMPORTED_MODULE_0__/* .compactDesign */ .g)(block.data.design);
    }

    // Remove the data property from the copied block
    delete copiedBlocks[id].data;
  }
  return copiedBlocks;
};

/***/ }),

/***/ 677:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   h: () => (/* binding */ extractBlockTree)
/* harmony export */ });
// BlockTreeUtils.ts
// Strongly-typed tree utilities for your block system

const BlockTreeUtils = {
  /**
   * Get the direct parent of a block
   */
  getParent(map, id) {
    const node = map.get(id);
    if (!node) return null;
    const parentId = node.p;
    return parentId ? map.get(parentId) || null : null;
  },
  /**
   * Get all ancestors (root is last)
   */
  getParents(map, id) {
    const parents = [];
    let current = map.get(id);
    while (current && current.p) {
      const parent = map.get(current.p);
      if (!parent) break;
      parents.push(parent);
      current = parent;
    }
    return parents;
  },
  /**
   * Find nearest parent by type
   */
  findParentByType(map, id, type) {
    let current = map.get(id);
    while (current && current.p) {
      const parent = map.get(current.p);
      if (!parent) return null;
      if (parent.t === type) return parent;
      current = parent;
    }
    return null;
  },
  /**
   * Collect all parents until a specific type is reached.
   * Does NOT include the stop-type parent.
   */
  getParentsUntil(map, id, stopType) {
    const list = [];
    let current = map.get(id);
    while (current && current.p) {
      const parent = map.get(current.p);
      if (!parent) break;
      if (parent.t === stopType) break;
      list.push(parent);
      current = parent;
    }
    return list;
  },
  getParentsIdsUntil(map, id, stopType) {
    const list = [];
    let current = map.get(id);
    while (current && current.p) {
      const parent = map.get(current.p);
      if (!parent) break;
      if (parent.t === stopType) break;
      list.push(current.p);
      current = parent;
    }
    return list;
  },
  /**
   * Optional: Build reverse children index for fast lookup
   */
  buildChildrenIndex(map) {
    const index = new Map();
    for (const [id, node] of map) {
      const parentId = node.p;
      if (!parentId) continue;
      if (!index.has(parentId)) index.set(parentId, []);
      index.get(parentId).push(id);
    }
    return index;
  },
  /**
  * Find the first node (self or parent) matching a type.
  */
  findSelfOrParentByType(map, id, type) {
    let currentId = id;
    let current = map.get(currentId) ?? null;
    while (current) {
      if (current.t === type) {
        return {
          id: currentId,
          block: current
        };
      }
      const parentId = current.p;
      if (!parentId) break;
      currentId = parentId;
      current = map.get(parentId) ?? null;
    }
    return null;
  },
  getUniqueTypesFromBlocks(map, ids) {
    const seen = new Set();
    const types = [];
    for (const id of ids) {
      const block = map.get(id);
      if (!block) continue;
      const type = block.t;
      if (!type) continue;
      if (!seen.has(type)) {
        seen.add(type);
        types.push(type);
      }
    }
    return types;
  },
  getTypesWithCounts(map, ids) {
    const counts = new Map();
    for (const id of ids) {
      const block = map.get(id);
      if (!block) continue;
      const type = block.t;
      if (!type) continue;
      counts.set(type, (counts.get(type) ?? 0) + 1);
    }

    // Convert map → array
    return Array.from(counts.entries()).map(_ref => {
      let [type, count] = _ref;
      return {
        type,
        count
      };
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockTreeUtils);

/**
 * Extract a block + all its children as a plain object.
 * @param {Map<string, any>} blocksMap - your full block map
 * @param {string} id - starting block id
 * @returns {Record<string, any>} new object containing the subtree
 */
function extractBlockTree(blocksMap, id) {
  const result = {};
  const visited = new Set();
  function collect(currentId) {
    if (!blocksMap.has(currentId) || visited.has(currentId)) return;
    visited.add(currentId);
    const node = blocksMap.get(currentId);

    // store the block in plain object
    result[currentId] = node;

    // recursively add children
    const children = node.c || [];
    for (const childId of children) {
      collect(childId);
    }
  }
  collect(id);
  return result;
}

/***/ }),

/***/ 854:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ encodeOptions),
/* harmony export */   f: () => (/* binding */ decodeOptions)
/* harmony export */ });
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
function isCssFunction(str) {
  // rgb(), rgba(), hsl(), hsla(), calc(), var(), etc
  return /^[a-zA-Z_][a-zA-Z0-9_-]*\([^()]*\)$/.test(str);
}

// ------------------------------------------------------------
// Top-level safe split (handles nested (), [])
// ------------------------------------------------------------
function splitTopLevel(input) {
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
function encodeOptions(options) {
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
  for (const seg of splitTopLevel(clean)) {
    const idx = seg.indexOf(":");
    obj[seg.slice(0, idx)] = decodeAnyValue(seg.slice(idx + 1));
  }
  return obj;
}
function decodeArray(str) {
  const clean = str.slice(1, -1).trim();
  if (!clean) return [];
  return splitTopLevel(clean).map(decodeAnyValue);
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
  if (isCssFunction(str)) {
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

/***/ }),

/***/ 4390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ expandDesign),
/* harmony export */   g: () => (/* binding */ compactDesign)
/* harmony export */ });
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
function compactDesign(design) {
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

/***/ }),

/***/ 2918:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ BlockFlowContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const BlockFlowContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

/***/ }),

/***/ 5625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  MapStructure: () => (/* binding */ MapStructure),
  "default": () => (/* binding */ Surface)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./src/RenderEngine/SurfaceContext.tsx
var SurfaceContext = __webpack_require__(224);
// EXTERNAL MODULE: ./src/Render/blocks/Base.tsx
var Base = __webpack_require__(4244);
// EXTERNAL MODULE: ./src/Render/blocks/Text.tsx + 1 modules
var Text = __webpack_require__(4160);
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
var lenis_react = __webpack_require__(5449);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
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

// EXTERNAL MODULE: ./src/RenderEngine/animationEngine/utils/applyStaggeredAnimation.ts
var applyStaggeredAnimation = __webpack_require__(1413);
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
      (0,applyStaggeredAnimation/* rafTick */.t)(time); // stagger animations
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
  } = (0,SurfaceContext/* useSurfaceContext */.q)();
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
// EXTERNAL MODULE: ./src/BlockEditor/util/blockDataUtils.ts
var blockDataUtils = __webpack_require__(3545);
// EXTERNAL MODULE: ./src/BlockEditor/EditCanvas/GlobalStyles.tsx
var GlobalStyles = __webpack_require__(9078);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/styleBucket/styleStore.ts
var styleStore = __webpack_require__(7314);
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
    return (0,styleStore/* subscribe */.B1)(() => {
      forceUpdate(v => v + 1);
    });
  }, []);
  (0,external_React_.useEffect)(() => {
    const css = (0,styleStore/* getAllStylesCSR */.W0)();
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
  } = (0,SurfaceContext/* useSurfaceContext */.q)();
  (0,external_React_.useEffect)(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);
  if (true) {
    const sendMessageToParent = message => {
      window.parent.postMessage({
        ...message
      }, '*');
    };
    (0,external_React_.useEffect)(() => {
      const handleMessage = event => {
        // Check if the message is coming from the parent window
        if (event.source === window.parent) {
          if (event.data.colorMode && event.data.colorMode !== colorMode) {
            setColorMode(event.data.colorMode);
          }
          if (event.data.page) {
            setPage(event.data.page);
          }
          if (event.data.frameId) {
            setFrameId(event.data.frameId);
          }
          if (event.data.pageBlocks?.current) {
            pageBlocks.current = event.data.pageBlocks.current;
          }
          if (event.data.styleHTML) {
            setStyleHTML(event.data.styleHTML);
          }
        }
      };

      // Send message to parent window when mounted
      sendMessageToParent({
        mounted: true
      });

      // Add event listener for the 'message' event
      window.addEventListener('message', handleMessage);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);
  }

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
  return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, null, /*#__PURE__*/external_React_default().createElement(GlobalStyles/* default */.A, null), /*#__PURE__*/external_React_default().createElement(PageProvider, null, mounted && /*#__PURE__*/external_React_default().createElement(StyleHost, {
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

  return /*#__PURE__*/external_React_default().createElement(SurfaceContext/* SurfaceProvider */.P, {
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
  } = (0,SurfaceContext/* useSurfaceContext */.q)();
  const entry = pageBlocks.current.get(frameId || '')?.c || [];

  // Early SSR render in editor
  if ( true && renderType === 'SSR') {
    return /*#__PURE__*/external_React_default().createElement((external_React_default()).Fragment, {
      key: frameId || 'frame'
    }, /*#__PURE__*/external_React_default().createElement(MapStructure, {
      entry: entry
    }));
  }

  // Client side render or editor non-SSR
  if (true) {
    if (!frameId) return null;
    const frame = pageBlocks.current.get(frameId);
    if (!frame) return null;

    // Generate block data once
    (0,blockDataUtils/* default */.A)(frame);
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
  } = (0,SurfaceContext/* useSurfaceContext */.q)();
  const block = pageBlocks.current.get(id);
  let BlockComponent = null;
  if (!block) {
    return;
  }
  (0,blockDataUtils/* default */.A)(block); // generate block data design & options

  const type = block?.t;
  switch (type) {
    case 'b':
      BlockComponent = Base/* BasePreview */.i6;
      break;
    case 't':
      BlockComponent = Text/* TextRender */.k;
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

/***/ }),

/***/ 224:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ SurfaceProvider),
/* harmony export */   q: () => (/* binding */ useSurfaceContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _animationEngine_utils_applyStaggeredAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1413);
/* harmony import */ var _animationEngine_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6737);



const SurfaceContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
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
  if (true) {
    // initColorMode = renderData?.styleData?.defaultColorMode || initColorMode;
    // TODO fix this
  }
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
  const pageBlocks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initPageBlocks);
  const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    root: Date.now()
  });
  const [frameId, setFrameId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initFrameId);
  const [postData, setPostData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initPostData);
  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [device, setDevice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('default');
  const [colorMode, setColorMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initColorMode);
  const [siteData, setSiteData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initSiteData);
  const [showEffect, setShowEffect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [styleHTML, setStyleHTML] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const newVariantTriggerMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    trigger: {},
    byId: {}
  });
  const dynamicData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const [isPreview, setIsPreview] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false); // to detect EPR

  const [readytoReveal, setReadytoReveal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const variantChangeMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
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
      (0,_animationEngine_utils_applyStaggeredAnimation__WEBPACK_IMPORTED_MODULE_1__/* .applyStaggeredAnimation */ .f)({
        ...stagger[id],
        variantName: newVariant,
        progress: type === 'strength' ? {
          strength: options?.strength || 0,
          variant
        } : undefined
      });
    } else {
      if (type === 'strength') {
        (0,_animationEngine_animate__WEBPACK_IMPORTED_MODULE_2__/* .applyVariantAtProgress */ .GH)(id, variant, options?.strength ?? 1);
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SurfaceContext.Provider, {
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
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SurfaceContext);
  if (!context) {
    throw new Error('useSurfaceContext must be used within a SurfaceProvider');
  }
  return context;
};

/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  yj: () => (/* binding */ animateToVariant),
  GH: () => (/* binding */ applyVariantAtProgress)
});

// UNUSED EXPORTS: precomputeAllVariants

// EXTERNAL MODULE: ./node_modules/tinycolor2/esm/tinycolor.js
var tinycolor = __webpack_require__(4140);
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

/***/ }),

/***/ 1413:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ applyStaggeredAnimation),
/* harmony export */   t: () => (/* binding */ rafTick)
/* harmony export */ });
/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6737);

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
      (0,_animate__WEBPACK_IMPORTED_MODULE_0__/* .animateToVariant */ .yj)(item.id, stagger.variantName, {
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
        (0,_animate__WEBPACK_IMPORTED_MODULE_0__/* .applyVariantAtProgress */ .GH)(item.id, progress.variant, localProgress);

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

/***/ }),

/***/ 4244:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   i6: () => (/* binding */ BasePreview)
/* harmony export */ });
/* unused harmony export Base */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlockEditor_EditorContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4970);
/* harmony import */ var _RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2918);
/* harmony import */ var _RenderEngine_SurfaceContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(224);
/* harmony import */ var _hooks_useResolvedTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2292);
/* harmony import */ var _hooks_useVariantState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4427);
/* harmony import */ var _hooks_useVariantAnimations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3041);
/* harmony import */ var _hooks_useComponentVariables__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2705);
/* harmony import */ var _hooks_useBlockDesignEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4983);
/* harmony import */ var _hooks_useBlockDesignRuntime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6004);
/* harmony import */ var _hooks_useBlockSensors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8581);
/* harmony import */ var _BlockEditor_util_KVParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6953);
/* harmony import */ var _hooks_styleBucket_useBlockStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6843);
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
  const nodeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Editor state (active block / active variant / color mode)
  const {
    colorMode,
    editingVariant,
    editingBlock
  } = (0,_BlockEditor_EditorContext__WEBPACK_IMPORTED_MODULE_1__/* .useEditorContext */ .m)();

  // Parent flow data (theme + component/instance variables)
  const parentData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_2__/* .BlockFlowContext */ .l);

  // Resolve final theme (global → parent → local override)
  const {
    resolvedTheme,
    parentTheme
  } = (0,_hooks_useResolvedTheme__WEBPACK_IMPORTED_MODULE_3__/* .useResolvedTheme */ .j)({
    id,
    colorMode
  });
  const designTypes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!block?.dt) return {};
    return _BlockEditor_util_KVParser__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.parse(block.dt);
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
  } = (0,_hooks_useVariantState__WEBPACK_IMPORTED_MODULE_5__/* .useVariantState */ .q)();

  // Editor-side design resolution (variant-aware, no sensors)
  const {
    design,
    dynamicCSS
  } = (0,_hooks_useBlockDesignEditor__WEBPACK_IMPORTED_MODULE_6__/* .useBlockDesignEditor */ .E)(block, resolvedTheme, id, variant);

  // Component variables (only exist if block is a component root)
  const componentVariables = (0,_hooks_useComponentVariables__WEBPACK_IMPORTED_MODULE_7__/* .useComponentVariables */ .Y)(block);

  /**
   * Sync editor-selected variant → rendered variant
   * This keeps canvas preview aligned with variant panel
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (editingBlock === id && editingVariant !== variant) {
      setVariant(editingVariant);
    }
  }, [editingVariant, editingBlock]);

  /**
   * Extend BlockFlow context:
   * - Pass down resolved theme
   * - Inject component variables for instances
   */
  const updatedParentData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_2__/* .BlockFlowContext */ .l.Provider, {
    value: updatedParentData
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", null, dynamicCSS), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DynamicTag, _extends({
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
  const nodeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Surface context (runtime-only)
  const {
    colorMode,
    newVariantTriggerMap,
    newHandleVariantChange,
    renderType
  } = (0,_RenderEngine_SurfaceContext__WEBPACK_IMPORTED_MODULE_8__/* .useSurfaceContext */ .q)();

  // Parent flow data
  const parentData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_2__/* .BlockFlowContext */ .l);

  // Resolve runtime theme
  const {
    resolvedTheme,
    parentTheme
  } = (0,_hooks_useResolvedTheme__WEBPACK_IMPORTED_MODULE_3__/* .useResolvedTheme */ .j)({
    id,
    colorMode
  });

  // Variant state (runtime controlled)
  const {
    variant,
    setVariant,
    variantRef
  } = (0,_hooks_useVariantState__WEBPACK_IMPORTED_MODULE_5__/* .useVariantState */ .q)();
  const designTypes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!block?.dt) return {};
    return _BlockEditor_util_KVParser__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A.parse(block.dt);
  }, [block?.dt]);
  const map = new Map(block?.v?.map(o => [o.id, o]));
  const currentMap = map.get(variant);

  // Gradient placeholder
  const gradMode = null;

  // Runtime design resolution (base variant only, sensor-aware)
  const {
    design,
    dynamicCSS
  } = (0,_hooks_useBlockDesignRuntime__WEBPACK_IMPORTED_MODULE_9__/* .useBlockDesignRuntime */ .N)(block, resolvedTheme, id);
  (0,_hooks_styleBucket_useBlockStyle__WEBPACK_IMPORTED_MODULE_10__/* .useBlockStyle */ .u)(id, dynamicCSS, renderType);

  // Sensors: viewport, container, fold visibility
  const {
    isInFold,
    sensors
  } = (0,_hooks_useBlockSensors__WEBPACK_IMPORTED_MODULE_11__/* .useBlockSensors */ .A)(nodeRef, resolvedTheme);

  /**
   * Register this block into global variant trigger system
   * Enables hover / external triggers / timeline animations
   */
  (0,_hooks_useVariantAnimations__WEBPACK_IMPORTED_MODULE_12__/* .useVariantAnimations */ .C)({
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
  const componentVariables = (0,_hooks_useComponentVariables__WEBPACK_IMPORTED_MODULE_7__/* .useComponentVariables */ .Y)(block);

  /**
      * Extend BlockFlow context:
      * - Pass down resolved theme
      * - Inject component variables for instances
      */
  const updatedParentData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
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
  const hoverTimeout = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_2__/* .BlockFlowContext */ .l.Provider, {
    value: updatedParentData
  }, renderType === 'SSR' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", null, dynamicCSS), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DynamicTag, _extends({
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Base);

/***/ }),

/***/ 4160:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  k: () => (/* binding */ TextRender),
  A: () => (/* binding */ blocks_Text)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.es.mjs
var purify_es = __webpack_require__(9418);
// EXTERNAL MODULE: ./src/BlockEditor/EditorContext.tsx + 1 modules
var EditorContext = __webpack_require__(4970);
// EXTERNAL MODULE: ./src/RenderEngine/BlockFlowContext.ts
var BlockFlowContext = __webpack_require__(2918);
// EXTERNAL MODULE: ./src/RenderEngine/SurfaceContext.tsx
var SurfaceContext = __webpack_require__(224);
;// CONCATENATED MODULE: ./src/Render/blocks/hooks/useBlockValueResolver.ts


function useBlockValueResolver(block) {
  const parentData = (0,external_React_.useContext)(BlockFlowContext/* BlockFlowContext */.l);
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
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useResolvedTheme.ts
var useResolvedTheme = __webpack_require__(2292);
// EXTERNAL MODULE: ./src/BlockEditor/util/KVParser.ts
var KVParser = __webpack_require__(6953);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useBlockDesignRuntime.ts
var useBlockDesignRuntime = __webpack_require__(6004);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useBlockSensors.ts
var useBlockSensors = __webpack_require__(8581);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useComponentVariables.ts
var useComponentVariables = __webpack_require__(2705);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useVariantAnimations.ts + 1 modules
var useVariantAnimations = __webpack_require__(3041);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useVariantState.ts
var useVariantState = __webpack_require__(4427);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useBlockDesignEditor.ts
var useBlockDesignEditor = __webpack_require__(4983);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/styleBucket/useBlockStyle.ts
var useBlockStyle = __webpack_require__(6843);
;// CONCATENATED MODULE: ./src/Render/blocks/Text.tsx















function Text(_ref) {
  let {
    id,
    block,
    part,
    children
  } = _ref;
  // DOM reference for this block
  const nodeRef = (0,external_React_.useRef)(null);
  const {
    getValue
  } = useBlockValueResolver(block);

  // Editor state (active block / active variant / color mode)
  const {
    colorMode,
    editingVariant,
    editingBlock
  } = (0,EditorContext/* useEditorContext */.m)();

  // Parent flow data (theme + component/instance variables)
  const parentData = (0,external_React_.useContext)(BlockFlowContext/* BlockFlowContext */.l);

  // Resolve final theme (global → parent → local override)
  const {
    resolvedTheme,
    parentTheme
  } = (0,useResolvedTheme/* useResolvedTheme */.j)({
    id,
    colorMode
  });
  const designTypes = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
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
  } = (0,useVariantState/* useVariantState */.q)();

  // Editor-side design resolution (variant-aware, no sensors)
  const {
    design,
    dynamicCSS
  } = (0,useBlockDesignEditor/* useBlockDesignEditor */.E)(block, resolvedTheme, id, variant);

  // Component variables (only exist if block is a component root)
  const componentVariables = (0,useComponentVariables/* useComponentVariables */.Y)(block);

  /**
   * Sync editor-selected variant → rendered variant
   * This keeps canvas preview aligned with variant panel
   */
  (0,external_React_.useEffect)(() => {
    if (editingBlock === id && editingVariant !== variant) {
      setVariant(editingVariant);
    }
  }, [editingVariant, editingBlock]);

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
    return purify_es/* default */.A.sanitize(raw);
  }
  const content = getSanitizedContent();
  const isEditing = editingBlock === id;
  let editingStyles = {};
  if (isEditing) {
    editingStyles.userSelect = 'text';
  }
  return /*#__PURE__*/external_React_default().createElement(BlockFlowContext/* BlockFlowContext */.l.Provider, {
    value: updatedParentData
  }, /*#__PURE__*/external_React_default().createElement("style", null, dynamicCSS), /*#__PURE__*/external_React_default().createElement("span", {
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
  } = useBlockValueResolver(block);

  // Surface context (runtime-only)
  const {
    colorMode,
    newVariantTriggerMap,
    newHandleVariantChange,
    renderType
  } = (0,SurfaceContext/* useSurfaceContext */.q)();

  // Parent flow data
  const parentData = (0,external_React_.useContext)(BlockFlowContext/* BlockFlowContext */.l);

  // Resolve runtime theme
  const {
    resolvedTheme,
    parentTheme
  } = (0,useResolvedTheme/* useResolvedTheme */.j)({
    id,
    colorMode
  });

  // Variant state (runtime controlled)
  const {
    variant,
    setVariant,
    variantRef
  } = (0,useVariantState/* useVariantState */.q)();
  const designTypes = (0,external_React_.useMemo)(() => {
    if (!block?.dt) return {};
    return KVParser/* default */.A.parse(block.dt);
  }, [block?.dt]);
  const map = new Map(block?.v?.map(o => [o.id, o]));
  const currentMap = map.get(variant);

  // Gradient placeholder
  const gradMode = null;

  // Runtime design resolution (base variant only, sensor-aware)
  const {
    design,
    dynamicCSS
  } = (0,useBlockDesignRuntime/* useBlockDesignRuntime */.N)(block, resolvedTheme, id);
  (0,useBlockStyle/* useBlockStyle */.u)(id, dynamicCSS, renderType);

  // Sensors: viewport, container, fold visibility
  const {
    isInFold,
    sensors
  } = (0,useBlockSensors/* useBlockSensors */.A)(nodeRef, resolvedTheme);

  /**
   * Register this block into global variant trigger system
   * Enables hover / external triggers / timeline animations
   */
  (0,useVariantAnimations/* useVariantAnimations */.C)({
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
  const componentVariables = (0,useComponentVariables/* useComponentVariables */.Y)(block);

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
  return /*#__PURE__*/external_React_default().createElement(BlockFlowContext/* BlockFlowContext */.l.Provider, {
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
/* harmony default export */ const blocks_Text = (Text);

/***/ }),

/***/ 7314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B1: () => (/* binding */ subscribe),
/* harmony export */   LS: () => (/* binding */ addStyleCSR),
/* harmony export */   W0: () => (/* binding */ getAllStylesCSR),
/* harmony export */   uh: () => (/* binding */ removeStyleCSR)
/* harmony export */ });
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

/***/ }),

/***/ 6843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useBlockStyle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styleStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7314);


function useBlockStyle(id, css, renderType) {
  // For SSR, do nothing here — block outputs inline <style> directly
  if (renderType === 'SSR') {
    return;
  }

  // For CSR, register and unregister styles globally
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_styleStore__WEBPACK_IMPORTED_MODULE_1__/* .addStyleCSR */ .LS)(id, css);
    return () => {
      (0,_styleStore__WEBPACK_IMPORTED_MODULE_1__/* .removeStyleCSR */ .uh)(id);
    };
  }, [id, css]);
}

/***/ }),

/***/ 4983:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useBlockDesignEditor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlockEditor_util_styleCodec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4390);



// --------------------------------------------------
// Helpers (non-invasive, no behavior changes)
// -------------------------------------------------

function transformViewportValue(val) {
  const match = val.trim().match(/^(-?\d*\.?\d+)(vw|vh)$/);
  if (!match) return val;
  const [, num, unit] = match;
  const cssVar = unit === 'vw' ? '--aw' : '--ah';

  // 100vw === var(--aw)
  // so num/100 * var(--a?)
  const factor = Number(num) / 100;
  return `calc(var(${cssVar}) * ${factor})`;
}
function isObject(val) {
  return val !== null && typeof val === 'object';
}
function isColorModeValue(val) {
  return isObject(val) && ('l' in val || 'd' in val);
}
function isImageValue(val) {
  return isObject(val) && typeof val.id === 'string' && typeof val.url === 'string';
}
function resolveRuntimeValue(value, theme) {
  let resolved = value;

  // 1️⃣ color mode
  if (isColorModeValue(resolved)) {
    resolved = theme === 'd' ? resolved.d ?? resolved.l : resolved.l ?? resolved.d;
  }

  // 2️⃣ image
  if (isImageValue(resolved)) {
    return `url(${resolved.url})`;
  }

  // 3️⃣ primitive
  if (typeof resolved === 'string' || typeof resolved === 'number') {
    return resolved;
  }
  return undefined;
}

// --------------------------------------------------
// Hook
// --------------------------------------------------

function useBlockDesignEditor(block, resolvedTheme, blockId, variant) {
  const design = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const data = (0,_BlockEditor_util_styleCodec__WEBPACK_IMPORTED_MODULE_1__/* .expandDesign */ .Z)(block?.d || '');
    const base = data?.base || {};
    if (variant === 'base') {
      return base;
    }
    const current = data?.[variant] || {};

    // variant overrides base
    return {
      ...base,
      ...current
    };
  }, [block?.d, variant]);
  const dynamicCSS = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    let css = `.${blockId} { --container-bp: 9999; `;
    Object.entries(design).forEach(_ref => {
      let [k, prop] = _ref;
      const val = resolveRuntimeValue(prop.value, resolvedTheme);
      if (val === undefined || val === '') return;
      if (typeof val === 'string') {
        css += `--${k}: ${transformViewportValue(val)}; `;
      } else {
        css += `--${k}: ${val}; `;
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

/***/ }),

/***/ 6004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ resolveRuntimeValue),
/* harmony export */   N: () => (/* binding */ useBlockDesignRuntime)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BlockEditor_util_styleCodec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4390);


function isObject(val) {
  return val !== null && typeof val === 'object';
}
function isColorModeValue(val) {
  return isObject(val) && ('l' in val || 'd' in val);
}
function isImageValue(val) {
  return isObject(val) && typeof val.id === 'string' && typeof val.url === 'string';
}
function resolveRuntimeValue(value, theme) {
  let resolved = value;

  // 1️⃣ resolve color mode
  if (isColorModeValue(resolved)) {
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
  const design = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const data = (0,_BlockEditor_util_styleCodec__WEBPACK_IMPORTED_MODULE_1__/* .expandDesign */ .Z)(block?.d || '');
    return data?.base || {};
  }, [block?.d]);
  const dynamicCSS = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
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

/***/ }),

/***/ 8581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ useBlockSensors)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_animationEngine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8136);


function useBlockSensors(nodeRef, resolvedTheme) {
  const [isInFold, setIsInFold] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [sensors, setSensors] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    isDark: resolvedTheme === 'd',
    bp: 9999
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!nodeRef.current) return;
    const foldObs = new IntersectionObserver(_ref => {
      let [e] = _ref;
      return setIsInFold(e.isIntersecting);
    }, {
      threshold: 0.1
    });
    const resObs = new ResizeObserver(() => {
      setSensors(_core_animationEngine__WEBPACK_IMPORTED_MODULE_1__/* .Resolver */ .x.getSensors(nodeRef.current, document.body, resolvedTheme));
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

/***/ }),

/***/ 2705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useComponentVariables)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useComponentVariables(block) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (block.m !== 'c') return null;
    return Object.fromEntries(Object.entries(block.data?.options?.vars?.value || {}).map(_ref => {
      let [id, v] = _ref;
      return [id, v.default];
    }));
  }, [block]);
}

/***/ }),

/***/ 2292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useResolvedTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2918);


function useResolvedTheme(_ref) {
  let {
    id,
    colorMode
  } = _ref;
  const parentData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_RenderEngine_BlockFlowContext__WEBPACK_IMPORTED_MODULE_1__/* .BlockFlowContext */ .l);
  const globalTheme = colorMode;
  const parentTheme = parentData?.parentTheme;

  // later: local override
  const resolvedTheme = id === 'NxSG' ? 'l' : parentTheme || globalTheme;
  return {
    resolvedTheme,
    parentTheme
  };
}

/***/ }),

/***/ 3041:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  C: () => (/* binding */ useVariantAnimations)
});

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
// EXTERNAL MODULE: ./src/Render/core/animationEngine.ts
var animationEngine = __webpack_require__(8136);
// EXTERNAL MODULE: ./src/Render/blocks/hooks/useBlockDesignRuntime.ts
var useBlockDesignRuntime = __webpack_require__(6004);
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
      const value = (0,useBlockDesignRuntime/* resolveRuntimeValue */.G)(styleDef.value, resolvedTheme); // resolve image, and colors.

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
      animationEngine/* default */.A.animate(nodeRef.current, timeline, sensors);
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

/***/ }),

/***/ 4427:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ useVariantState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useVariantState() {
  const [variant, setVariant] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('base');
  const variantRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(variant);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    variantRef.current = variant;
  }, [variant]);
  return {
    variant,
    setVariant,
    variantRef
  };
}

/***/ }),

/***/ 8136:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   x: () => (/* binding */ Resolver)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Conductor);

/***/ }),

/***/ 6225:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $s: () => (/* binding */ headerActions),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Hn: () => (/* binding */ cell),
/* harmony export */   IC: () => (/* binding */ distributionSection),
/* harmony export */   IZ: () => (/* binding */ matrixGrid),
/* harmony export */   Lg: () => (/* binding */ distBtn),
/* harmony export */   Lh: () => (/* binding */ contextBox),
/* harmony export */   Om: () => (/* binding */ dot),
/* harmony export */   Sk: () => (/* binding */ boxLabel),
/* harmony export */   T9: () => (/* binding */ isCircle),
/* harmony export */   Ws: () => (/* binding */ dirBtn),
/* harmony export */   XO: () => (/* binding */ isStretched),
/* harmony export */   Zv: () => (/* binding */ boxHeader),
/* harmony export */   _e: () => (/* binding */ directionControls),
/* harmony export */   ew: () => (/* binding */ standardGrid),
/* harmony export */   fI: () => (/* binding */ alignmentBox),
/* harmony export */   hI: () => (/* binding */ distributionRow),
/* harmony export */   m8: () => (/* binding */ miniViewport),
/* harmony export */   p5: () => (/* binding */ distRow),
/* harmony export */   q$: () => (/* binding */ contextMiniView),
/* harmony export */   q3: () => (/* binding */ indicator),
/* harmony export */   r5: () => (/* binding */ distCol),
/* harmony export */   rT: () => (/* binding */ actionBtn),
/* harmony export */   uC: () => (/* binding */ barV),
/* harmony export */   uD: () => (/* binding */ dualHeader),
/* harmony export */   un: () => (/* binding */ barH),
/* harmony export */   v9: () => (/* binding */ miniItem),
/* harmony export */   vu: () => (/* binding */ active),
/* harmony export */   wV: () => (/* binding */ distBtn_sep),
/* harmony export */   wp: () => (/* binding */ sidebarContent),
/* harmony export */   xg: () => (/* binding */ alignmentWrapper),
/* harmony export */   zq: () => (/* binding */ actionBtn_lg)
/* harmony export */ });
/* unused harmony export sectionLabel */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ` :root {
     --accent-color: rgb(153 177 210);
     --accent-subtle: rgba(153, 177, 210, 0.5);
     --accent-glow: rgba(153, 177, 210, 0.3);
     --neutral-active: #3b3b3b;
 }

 /* layout */
 .UZqiqEYEX1lia61c3vTh {
     padding: 12px 0;
     flex: 1;
     overflow-y: auto;
 }

 .Roc6PpNUcI7vbM4dpN0f {
     display: grid;
     gap: 8px;
     justify-content: space-between;
     grid-template-columns: 1fr 1fr;
 }

 /* context box */
 .nC_cYppzhgc6XYUM_2si {
     background-color: #2b2b2b;
     border-radius: 6px;
     border: 1px solid rgba(255, 255, 255, 0.05);
     padding: 4px;
     display: flex;
     flex-direction: column;
     gap: 4px;
 }

 .VB0yvw1zHWh6IQcw3kev {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 4px;
     height: 18px;
 }

 .usmOH5r_jE1ycvpMTanJ {
     font-size: 8px;
     font-weight: 500;
     text-transform: uppercase;
     color: #e9e9e9;
     opacity: .5;
 }

 .YiDKxSkCGSDFaLP08tIw {
     display: flex;
     gap: 2px;
 }

 .Xl8qSD3rogtkU_lBnJ_M {
     padding: 2px;
     border-radius: 2px;
     background: none;
     border: none;
     color: #9e9e9e;
     cursor: pointer;
     transition: color 0.2s;
 }

 .Xl8qSD3rogtkU_lBnJ_M.xa6nVBl0TJSpb90cexQ1 {
     color: var(--accent-color);
 }

 /* mini preview */
 .rEoKxCaK9zD3HBdSAl1Y {
     flex: 1;
     background-color: #1e1e1e;
     border-radius: 3px;
     display: flex;
     align-items: center;
     justify-content: center;
     overflow: hidden;
     aspect-ratio: 3/2;
     padding: 2px;
 }

 .T2ySrPY2RIwR3urhVUFH {
     width: 100%;
     height: 100%;
 }

 .skn7D2xGTIqaI8m7Jxht {
     min-width: 8px;
     background-color: var(--accent-subtle);
     flex-shrink: 0;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 9px;
     color: white;
     transition: all 0.3s;
 }

 .LAZDHKUsSmCT4XS6NyXX {
     border-radius: 2px;
 }

 .a_LWtfLGj_NgoDmhbTDu {
     border-radius: 3px;
     min-width: 12px;
 }

 /* alignment panel */
 .X96VIaPX19xLbt_yYoCw {
     /* width: 122px; */
 }

 .KigRXffNJVxDQbc2zozL {
     height: 100%;
     background-color: #2b2b2b;
     border-radius: 6px;
     border: 1px solid rgba(255, 255, 255, 0.05);
     padding: 4px;
     display: flex;
     flex-direction: column;
 }

 .Ata92fXnNPjAWVKDe9XI {
     display: flex;
     align-items: center;
     gap: 2px;
 }

 .L201GQaY7nIIshA4ZyNO {
     display: flex;
     align-items: center;
     justify-content: center;
     background: none;
     border: none;
     color: #9e9e9e;
     cursor: pointer;
     transition: color 0.2s;
 }

 .L201GQaY7nIIshA4ZyNO svg {
         max-width: 14px;
         max-height: 14px;
     }

 .L201GQaY7nIIshA4ZyNO.xa6nVBl0TJSpb90cexQ1 {
     color: var(--accent-color);
 }

 .HPTXrXxZDqvLdx3AbhTk {
     position: relative;

 }

 .HPTXrXxZDqvLdx3AbhTk svg {
         max-width: 16px;
         max-height: 16px;
     }

 /* matrix */
 .hEDn5O5uS8u1bzfJQoOH {
     flex: 1;
     display: grid;
     gap: 4px;
     padding: 2px 0;
 }

 .nzVGkxA2V28T_wb3xG3J {
     height: 80px;
     grid-template-columns: repeat(3, 1fr);
 }

 .tLAnBpUZQVUgdnF5w1xz {
     grid-template-columns: 1fr;
     justify-items: center;
 }

 .TdDoPVAxwYetZdyesUP2 {
     grid-template-columns: repeat(3, 1fr);
     align-items: center;
 }

 .NeF2zr6zhMM2jB3mpyFx {
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
 }

 .XiM9Wk0UUNo3SBBU2H2s {
     background-color: #444;
     transition: all 0.3s;
 }

 .XiM9Wk0UUNo3SBBU2H2s.xa6nVBl0TJSpb90cexQ1 {
     background-color: var(--accent-color);
     box-shadow: 0 0 8px var(--accent-glow);
 }

 .YyGVm0mgmeNBhpzdw8dG {
     width: 6px;
     height: 6px;
     border-radius: 50%;
 }

 .Z2dCF11Ogj6qjkhCxPgH {
     width: 2px;
     height: 12px;
     border-radius: 1px;
 }

 .y4LHUpCstW__6R3vVyZv {
     width: 12px;
     height: 2px;
     border-radius: 1px;
 }

 /* distribution */
 .XR3LFbpS5NLTl_5sfEFx {
     margin-top: 12px;
     display: flex;
     flex-direction: column;
     gap: 6px;
 }

 .yjw4B8aWz4gn2eo2qTTQ {
     font-size: 10px;
     font-weight: bold;
     color: #555;
     text-transform: uppercase;
     margin-left: 4px;
     letter-spacing: 0.05em;
 }

 .JyP2p8ouhOT1JPcVcIlq {
     display: flex;
     gap: 4px;
     padding: 2px;
     border: 1px solid var(--border-c);
     border-radius: 4px;

 }

.QPAcwwZpFQ5MsVWdaE_Q {
    flex: 1;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #9e9e9e;
    cursor: pointer;
    border: 3px;
    transition: all 0.2s;
}

.eZ425NIxw3oubGCUNFai {
        width: 1px;
        background: var(--border-c);
    }


 .QPAcwwZpFQ5MsVWdaE_Q.xa6nVBl0TJSpb90cexQ1 {
     background-color: var(--neutral-active);
     color: white;
 }`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/controls/FlexAlignmentController.module.css"],"names":[],"mappings":"CAAC;KACI,gCAAgC;KAChC,yCAAyC;KACzC,uCAAuC;KACvC,yBAAyB;CAC7B;;CAEA,WAAW;CACX;KACI,eAAe;KACf,OAAO;KACP,gBAAgB;CACpB;;CAEA;KACI,aAAa;KACb,QAAQ;KACR,8BAA8B;KAC9B,8BAA8B;CAClC;;CAEA,gBAAgB;CAChB;KACI,yBAAyB;KACzB,kBAAkB;KAClB,2CAA2C;KAC3C,YAAY;KACZ,aAAa;KACb,sBAAsB;KACtB,QAAQ;CACZ;;CAEA;KACI,aAAa;KACb,8BAA8B;KAC9B,mBAAmB;KACnB,kBAAkB;KAClB,YAAY;CAChB;;CAEA;KACI,cAAc;KACd,gBAAgB;KAChB,yBAAyB;KACzB,cAAc;KACd,WAAW;CACf;;CAEA;KACI,aAAa;KACb,QAAQ;CACZ;;CAEA;KACI,YAAY;KACZ,kBAAkB;KAClB,gBAAgB;KAChB,YAAY;KACZ,cAAc;KACd,eAAe;KACf,sBAAsB;CAC1B;;CAEA;KACI,0BAA0B;CAC9B;;CAEA,iBAAiB;CACjB;KACI,OAAO;KACP,yBAAyB;KACzB,kBAAkB;KAClB,aAAa;KACb,mBAAmB;KACnB,uBAAuB;KACvB,gBAAgB;KAChB,iBAAiB;KACjB,YAAY;CAChB;;CAEA;KACI,WAAW;KACX,YAAY;CAChB;;CAEA;KACI,cAAc;KACd,sCAAsC;KACtC,cAAc;KACd,aAAa;KACb,mBAAmB;KACnB,uBAAuB;KACvB,cAAc;KACd,YAAY;KACZ,oBAAoB;CACxB;;CAEA;KACI,kBAAkB;CACtB;;CAEA;KACI,kBAAkB;KAClB,eAAe;CACnB;;CAEA,oBAAoB;CACpB;KACI,kBAAkB;CACtB;;CAEA;KACI,YAAY;KACZ,yBAAyB;KACzB,kBAAkB;KAClB,2CAA2C;KAC3C,YAAY;KACZ,aAAa;KACb,sBAAsB;CAC1B;;CAEA;KACI,aAAa;KACb,mBAAmB;KACnB,QAAQ;CACZ;;CAEA;KACI,aAAa;KACb,mBAAmB;KACnB,uBAAuB;KACvB,gBAAgB;KAChB,YAAY;KACZ,cAAc;KACd,eAAe;KACf,sBAAsB;CAM1B;;CAJI;SACI,eAAe;SACf,gBAAgB;KACpB;;CAGJ;KACI,0BAA0B;CAC9B;;CAEA;KACI,kBAAkB;;CAOtB;;CALI;SACI,eAAe;SACf,gBAAgB;KACpB;;CAIJ,WAAW;CACX;KACI,OAAO;KACP,aAAa;KACb,QAAQ;KACR,cAAc;CAClB;;CAEA;KACI,YAAY;KACZ,qCAAqC;CACzC;;CAEA;KACI,0BAA0B;KAC1B,qBAAqB;CACzB;;CAEA;KACI,qCAAqC;KACrC,mBAAmB;CACvB;;CAEA;KACI,aAAa;KACb,mBAAmB;KACnB,uBAAuB;KACvB,eAAe;CACnB;;CAEA;KACI,sBAAsB;KACtB,oBAAoB;CACxB;;CAEA;KACI,qCAAqC;KACrC,sCAAsC;CAC1C;;CAEA;KACI,UAAU;KACV,WAAW;KACX,kBAAkB;CACtB;;CAEA;KACI,UAAU;KACV,YAAY;KACZ,kBAAkB;CACtB;;CAEA;KACI,WAAW;KACX,WAAW;KACX,kBAAkB;CACtB;;CAEA,iBAAiB;CACjB;KACI,gBAAgB;KAChB,aAAa;KACb,sBAAsB;KACtB,QAAQ;CACZ;;CAEA;KACI,eAAe;KACf,iBAAiB;KACjB,WAAW;KACX,yBAAyB;KACzB,gBAAgB;KAChB,sBAAsB;CAC1B;;CAEA;KACI,aAAa;KACb,QAAQ;KACR,YAAY;KACZ,iCAAiC;KACjC,kBAAkB;;CAEtB;;AAED;IACI,OAAO;IACP,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,gBAAgB;IAChB,YAAY;IACZ,cAAc;IACd,eAAe;IACf,WAAW;IACX,oBAAoB;AAMxB;;AAJI;QACI,UAAU;QACV,2BAA2B;IAC/B;;;CAIH;KACI,uCAAuC;KACvC,YAAY;CAChB","sourcesContent":[" :root {\r\n     --accent-color: rgb(153 177 210);\r\n     --accent-subtle: rgba(153, 177, 210, 0.5);\r\n     --accent-glow: rgba(153, 177, 210, 0.3);\r\n     --neutral-active: #3b3b3b;\r\n }\r\n\r\n /* layout */\r\n .sidebarContent {\r\n     padding: 12px 0;\r\n     flex: 1;\r\n     overflow-y: auto;\r\n }\r\n\r\n .dualHeader {\r\n     display: grid;\r\n     gap: 8px;\r\n     justify-content: space-between;\r\n     grid-template-columns: 1fr 1fr;\r\n }\r\n\r\n /* context box */\r\n .contextBox {\r\n     background-color: #2b2b2b;\r\n     border-radius: 6px;\r\n     border: 1px solid rgba(255, 255, 255, 0.05);\r\n     padding: 4px;\r\n     display: flex;\r\n     flex-direction: column;\r\n     gap: 4px;\r\n }\r\n\r\n .boxHeader {\r\n     display: flex;\r\n     justify-content: space-between;\r\n     align-items: center;\r\n     margin-bottom: 4px;\r\n     height: 18px;\r\n }\r\n\r\n .boxLabel {\r\n     font-size: 8px;\r\n     font-weight: 500;\r\n     text-transform: uppercase;\r\n     color: #e9e9e9;\r\n     opacity: .5;\r\n }\r\n\r\n .directionControls {\r\n     display: flex;\r\n     gap: 2px;\r\n }\r\n\r\n .dirBtn {\r\n     padding: 2px;\r\n     border-radius: 2px;\r\n     background: none;\r\n     border: none;\r\n     color: #9e9e9e;\r\n     cursor: pointer;\r\n     transition: color 0.2s;\r\n }\r\n\r\n .dirBtn.active {\r\n     color: var(--accent-color);\r\n }\r\n\r\n /* mini preview */\r\n .contextMiniView {\r\n     flex: 1;\r\n     background-color: #1e1e1e;\r\n     border-radius: 3px;\r\n     display: flex;\r\n     align-items: center;\r\n     justify-content: center;\r\n     overflow: hidden;\r\n     aspect-ratio: 3/2;\r\n     padding: 2px;\r\n }\r\n\r\n .miniViewport {\r\n     width: 100%;\r\n     height: 100%;\r\n }\r\n\r\n .miniItem {\r\n     min-width: 8px;\r\n     background-color: var(--accent-subtle);\r\n     flex-shrink: 0;\r\n     display: flex;\r\n     align-items: center;\r\n     justify-content: center;\r\n     font-size: 9px;\r\n     color: white;\r\n     transition: all 0.3s;\r\n }\r\n\r\n .isStretched {\r\n     border-radius: 2px;\r\n }\r\n\r\n .isCircle {\r\n     border-radius: 3px;\r\n     min-width: 12px;\r\n }\r\n\r\n /* alignment panel */\r\n .alignmentWrapper {\r\n     /* width: 122px; */\r\n }\r\n\r\n .alignmentBox {\r\n     height: 100%;\r\n     background-color: #2b2b2b;\r\n     border-radius: 6px;\r\n     border: 1px solid rgba(255, 255, 255, 0.05);\r\n     padding: 4px;\r\n     display: flex;\r\n     flex-direction: column;\r\n }\r\n\r\n .headerActions {\r\n     display: flex;\r\n     align-items: center;\r\n     gap: 2px;\r\n }\r\n\r\n .actionBtn {\r\n     display: flex;\r\n     align-items: center;\r\n     justify-content: center;\r\n     background: none;\r\n     border: none;\r\n     color: #9e9e9e;\r\n     cursor: pointer;\r\n     transition: color 0.2s;\r\n\r\n     svg {\r\n         max-width: 14px;\r\n         max-height: 14px;\r\n     }\r\n }\r\n\r\n .actionBtn.active {\r\n     color: var(--accent-color);\r\n }\r\n\r\n .actionBtn_lg {\r\n     position: relative;\r\n\r\n     svg {\r\n         max-width: 16px;\r\n         max-height: 16px;\r\n     }\r\n\r\n }\r\n\r\n /* matrix */\r\n .matrixGrid {\r\n     flex: 1;\r\n     display: grid;\r\n     gap: 4px;\r\n     padding: 2px 0;\r\n }\r\n\r\n .standardGrid {\r\n     height: 80px;\r\n     grid-template-columns: repeat(3, 1fr);\r\n }\r\n\r\n .distRow {\r\n     grid-template-columns: 1fr;\r\n     justify-items: center;\r\n }\r\n\r\n .distCol {\r\n     grid-template-columns: repeat(3, 1fr);\r\n     align-items: center;\r\n }\r\n\r\n .cell {\r\n     display: flex;\r\n     align-items: center;\r\n     justify-content: center;\r\n     cursor: pointer;\r\n }\r\n\r\n .indicator {\r\n     background-color: #444;\r\n     transition: all 0.3s;\r\n }\r\n\r\n .indicator.active {\r\n     background-color: var(--accent-color);\r\n     box-shadow: 0 0 8px var(--accent-glow);\r\n }\r\n\r\n .dot {\r\n     width: 6px;\r\n     height: 6px;\r\n     border-radius: 50%;\r\n }\r\n\r\n .barV {\r\n     width: 2px;\r\n     height: 12px;\r\n     border-radius: 1px;\r\n }\r\n\r\n .barH {\r\n     width: 12px;\r\n     height: 2px;\r\n     border-radius: 1px;\r\n }\r\n\r\n /* distribution */\r\n .distributionSection {\r\n     margin-top: 12px;\r\n     display: flex;\r\n     flex-direction: column;\r\n     gap: 6px;\r\n }\r\n\r\n .sectionLabel {\r\n     font-size: 10px;\r\n     font-weight: bold;\r\n     color: #555;\r\n     text-transform: uppercase;\r\n     margin-left: 4px;\r\n     letter-spacing: 0.05em;\r\n }\r\n\r\n .distributionRow {\r\n     display: flex;\r\n     gap: 4px;\r\n     padding: 2px;\r\n     border: 1px solid var(--border-c);\r\n     border-radius: 4px;\r\n\r\n }\r\n\r\n.distBtn {\r\n    flex: 1;\r\n    height: 26px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    background: none;\r\n    border: none;\r\n    color: #9e9e9e;\r\n    cursor: pointer;\r\n    border: 3px;\r\n    transition: all 0.2s;\r\n\r\n    &_sep {\r\n        width: 1px;\r\n        background: var(--border-c);\r\n    }\r\n}\r\n\r\n\r\n .distBtn.active {\r\n     background-color: var(--neutral-active);\r\n     color: white;\r\n }"],"sourceRoot":""}]);
// Exports
var sidebarContent = `UZqiqEYEX1lia61c3vTh`;
var dualHeader = `Roc6PpNUcI7vbM4dpN0f`;
var contextBox = `nC_cYppzhgc6XYUM_2si`;
var boxHeader = `VB0yvw1zHWh6IQcw3kev`;
var boxLabel = `usmOH5r_jE1ycvpMTanJ`;
var directionControls = `YiDKxSkCGSDFaLP08tIw`;
var dirBtn = `Xl8qSD3rogtkU_lBnJ_M`;
var active = `xa6nVBl0TJSpb90cexQ1`;
var contextMiniView = `rEoKxCaK9zD3HBdSAl1Y`;
var miniViewport = `T2ySrPY2RIwR3urhVUFH`;
var miniItem = `skn7D2xGTIqaI8m7Jxht`;
var isStretched = `LAZDHKUsSmCT4XS6NyXX`;
var isCircle = `a_LWtfLGj_NgoDmhbTDu`;
var alignmentWrapper = `X96VIaPX19xLbt_yYoCw`;
var alignmentBox = `KigRXffNJVxDQbc2zozL`;
var headerActions = `Ata92fXnNPjAWVKDe9XI`;
var actionBtn = `L201GQaY7nIIshA4ZyNO`;
var actionBtn_lg = `HPTXrXxZDqvLdx3AbhTk`;
var matrixGrid = `hEDn5O5uS8u1bzfJQoOH`;
var standardGrid = `nzVGkxA2V28T_wb3xG3J`;
var distRow = `tLAnBpUZQVUgdnF5w1xz`;
var distCol = `TdDoPVAxwYetZdyesUP2`;
var cell = `NeF2zr6zhMM2jB3mpyFx`;
var indicator = `XiM9Wk0UUNo3SBBU2H2s`;
var dot = `YyGVm0mgmeNBhpzdw8dG`;
var barV = `Z2dCF11Ogj6qjkhCxPgH`;
var barH = `y4LHUpCstW__6R3vVyZv`;
var distributionSection = `XR3LFbpS5NLTl_5sfEFx`;
var sectionLabel = (/* unused pure expression or super */ null && (`yjw4B8aWz4gn2eo2qTTQ`));
var distributionRow = `JyP2p8ouhOT1JPcVcIlq`;
var distBtn = `QPAcwwZpFQ5MsVWdaE_Q`;
var distBtn_sep = `eZ425NIxw3oubGCUNFai`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 171:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   Ds: () => (/* binding */ initLoadWrap),
/* harmony export */   LV: () => (/* binding */ wrap),
/* harmony export */   NT: () => (/* binding */ mediaGrid),
/* harmony export */   e$: () => (/* binding */ rotate),
/* harmony export */   hG: () => (/* binding */ mediaItemSelected),
/* harmony export */   ii: () => (/* binding */ selectedMedia),
/* harmony export */   l1: () => (/* binding */ initLoad),
/* harmony export */   sb: () => (/* binding */ loadmoreWrap),
/* harmony export */   w5: () => (/* binding */ mediaItem)
/* harmony export */ });
/* unused harmony export spin */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.g5poZZjuIIYyLX23_5_4 {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.gNQNHTm_OXF0H0UnbL5o {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
    padding: 8px;
    overflow-y: auto;
    height: 100%;
}

.YF5ouIlq5_fPak5iaa4A {
    position: relative;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    backdrop-filter: brightness(0.5);
}

.YF5ouIlq5_fPak5iaa4A:hover {
    border-color: #99b1d2;
}

.uTNAqNiWT33pc8xMiMKY {
    border-color: #99b1d2;
    box-shadow: 0 0 6px #99b1d288;
}

.YF5ouIlq5_fPak5iaa4A img,
.YF5ouIlq5_fPak5iaa4A video,
.YF5ouIlq5_fPak5iaa4A audio {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 6px;
}

.hU5WGryc_iQiZUkmtiNP {
 position: absolute;
    top: 4px;
    right: 4px;
    background-color: #99b1d2;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    aspect-ratio: 1 / 1;
}

.K0JuedIxcYgCCroLyPoK {
    padding: 8px;
    text-align: center;
}

.nEnH47yoW4bELOOrA226 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.U6UW0ISfLYHOQkMeI5t9 {
    text-align: center;
    color: #666;
}

.B3Y2JUsxn3UrvV2jWOwe {
    animation: uTLkEI5nCpAdFb6XWBbd 2s linear infinite;
    margin-bottom: 12px;
    color: #99b1d2;
}

@keyframes uTLkEI5nCpAdFb6XWBbd {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/controls/MediaContent.module.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,4DAA4D;IAC5D,QAAQ;IACR,YAAY;IACZ,gBAAgB;IAChB,YAAY;AAChB;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,6BAA6B;IAC7B,kBAAkB;IAClB,gBAAgB;IAChB,6BAA6B;IAC7B,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,aAAa;IACb,gCAAgC;AACpC;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,qBAAqB;IACrB,6BAA6B;AACjC;;AAEA;;;IAGI,eAAe;IACf,gBAAgB;IAChB,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;CACC,kBAAkB;IACf,QAAQ;IACR,UAAU;IACV,yBAAyB;IACzB,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI,kDAAkC;IAClC,mBAAmB;IACnB,cAAc;AAClB;;AAEA;IACI;QACI,uBAAuB;IAC3B;;IAEA;QACI,yBAAyB;IAC7B;AACJ","sourcesContent":[".wrap {\r\n    height: 100%;\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.mediaGrid {\r\n    display: grid;\r\n    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));\r\n    gap: 8px;\r\n    padding: 8px;\r\n    overflow-y: auto;\r\n    height: 100%;\r\n}\r\n\r\n.mediaItem {\r\n    position: relative;\r\n    cursor: pointer;\r\n    border: 2px solid transparent;\r\n    border-radius: 6px;\r\n    overflow: hidden;\r\n    transition: border-color 0.2s;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 100px;\r\n    backdrop-filter: brightness(0.5);\r\n}\r\n\r\n.mediaItem:hover {\r\n    border-color: #99b1d2;\r\n}\r\n\r\n.mediaItemSelected {\r\n    border-color: #99b1d2;\r\n    box-shadow: 0 0 6px #99b1d288;\r\n}\r\n\r\n.mediaItem img,\r\n.mediaItem video,\r\n.mediaItem audio {\r\n    max-width: 100%;\r\n    max-height: 100%;\r\n    object-fit: contain;\r\n    border-radius: 6px;\r\n}\r\n\r\n.selectedMedia {\r\n position: absolute;\r\n    top: 4px;\r\n    right: 4px;\r\n    background-color: #99b1d2;\r\n    border-radius: 50%;\r\n    padding: 2px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    color: white;\r\n    aspect-ratio: 1 / 1;\r\n}\r\n\r\n.loadmoreWrap {\r\n    padding: 8px;\r\n    text-align: center;\r\n}\r\n\r\n.initLoadWrap {\r\n    height: 100%;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.initLoad {\r\n    text-align: center;\r\n    color: #666;\r\n}\r\n\r\n.rotate {\r\n    animation: spin 2s linear infinite;\r\n    margin-bottom: 12px;\r\n    color: #99b1d2;\r\n}\r\n\r\n@keyframes spin {\r\n    0% {\r\n        transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n        transform: rotate(360deg);\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
var wrap = `g5poZZjuIIYyLX23_5_4`;
var mediaGrid = `gNQNHTm_OXF0H0UnbL5o`;
var mediaItem = `YF5ouIlq5_fPak5iaa4A`;
var mediaItemSelected = `uTNAqNiWT33pc8xMiMKY`;
var selectedMedia = `hU5WGryc_iQiZUkmtiNP`;
var loadmoreWrap = `K0JuedIxcYgCCroLyPoK`;
var initLoadWrap = `nEnH47yoW4bELOOrA226`;
var initLoad = `U6UW0ISfLYHOQkMeI5t9`;
var rotate = `B3Y2JUsxn3UrvV2jWOwe`;
var spin = (/* unused pure expression or super */ null && (`uTLkEI5nCpAdFb6XWBbd`));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2487:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   DD: () => (/* binding */ title),
/* harmony export */   Jb: () => (/* binding */ titleColumn),
/* harmony export */   LV: () => (/* binding */ wrap),
/* harmony export */   Qs: () => (/* binding */ content)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.H1lnfrKTZQIMYkOSWuP2 {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: sans-serif;
    position: fixed;
    bottom: 0;
    z-index: 99;
    right: 0;
    width: 280px;
    height: 100%;
    background: var(--bg);
}

.Q18KUUXRFoC_UouxHVsF {
    display: flex;
    justify-content: flex-end;
    padding: 8px 12px;
    user-select: none;
}

.gCZO0cS5_5FCHUxPDkIm {
    display: flex;
    align-items: center;
    gap: 8px;
}

._Fl1LkDZbIiUc5dx57bi {
    flex-grow: 1;
    overflow: hidden;
    display: none;
    height: 100%;
}

._Fl1LkDZbIiUc5dx57bi[data-show='true'] {
    display: block;
}`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/controls/MediaPicker.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,gBAAgB;IAChB,uBAAuB;IACvB,eAAe;IACf,SAAS;IACT,WAAW;IACX,QAAQ;IACR,YAAY;IACZ,YAAY;IACZ,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,yBAAyB;IACzB,iBAAiB;IACjB,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,QAAQ;AACZ;;AAEA;IACI,YAAY;IACZ,gBAAgB;IAChB,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,cAAc;AAClB","sourcesContent":[".wrap {\r\n    display: flex;\r\n    flex-direction: column;\r\n    overflow: hidden;\r\n    font-family: sans-serif;\r\n    position: fixed;\r\n    bottom: 0;\r\n    z-index: 99;\r\n    right: 0;\r\n    width: 280px;\r\n    height: 100%;\r\n    background: var(--bg);\r\n}\r\n\r\n.title {\r\n    display: flex;\r\n    justify-content: flex-end;\r\n    padding: 8px 12px;\r\n    user-select: none;\r\n}\r\n\r\n.titleColumn {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n}\r\n\r\n.content {\r\n    flex-grow: 1;\r\n    overflow: hidden;\r\n    display: none;\r\n    height: 100%;\r\n}\r\n\r\n.content[data-show='true'] {\r\n    display: block;\r\n}"],"sourceRoot":""}]);
// Exports
var wrap = `H1lnfrKTZQIMYkOSWuP2`;
var title = `Q18KUUXRFoC_UouxHVsF`;
var titleColumn = `gCZO0cS5_5FCHUxPDkIm`;
var content = `_Fl1LkDZbIiUc5dx57bi`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 633:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $d: () => (/* binding */ colorPresetBlockStripItem),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   I8: () => (/* binding */ colorPresetBlockStrip),
/* harmony export */   O4: () => (/* binding */ colorPresetBlock),
/* harmony export */   Pw: () => (/* binding */ colorPresetBlock_active)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.r2McNYcszs1q76U2Karf {
    display: block;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

    .CigXIU9y9G9OBof3hWgM {
        display: flex;
        height: 16px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .NWZK3n5eYacvCZkMuAYg {
            flex: 1;
        }

    .K3ZA1kC_hnpc47uJLcBh {
        background: #2a2a2a;
        width: 16px;
        height: 16px;
        border-radius: 3px;
        position: absolute;
        right: 1px;
        top: 1px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/css/assets.module.css"],"names":[],"mappings":"AAAA;IACI,cAAc;IACd,WAAW;IACX,iBAAiB;IACjB,kBAAkB;IAClB,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;AA4BnB;;IA1BI;QACI,aAAa;QACb,YAAY;QACZ,WAAW;QACX,kBAAkB;QAClB,SAAS;QACT,OAAO;IAKX;;IAHI;YACI,OAAO;QACX;;IAGJ;QACI,mBAAmB;QACnB,WAAW;QACX,YAAY;QACZ,kBAAkB;QAClB,kBAAkB;QAClB,UAAU;QACV,QAAQ;QACR,WAAW;QACX,aAAa;QACb,mBAAmB;QACnB,uBAAuB;IAC3B","sourcesContent":[".colorPresetBlock {\r\n    display: block;\r\n    width: 100%;\r\n    aspect-ratio: 1/1;\r\n    border-radius: 3px;\r\n    position: relative;\r\n    overflow: hidden;\r\n    cursor: pointer;\r\n\r\n    &Strip {\r\n        display: flex;\r\n        height: 16px;\r\n        width: 100%;\r\n        position: absolute;\r\n        bottom: 0;\r\n        left: 0;\r\n\r\n        &Item {\r\n            flex: 1;\r\n        }\r\n    }\r\n\r\n    &_active {\r\n        background: #2a2a2a;\r\n        width: 16px;\r\n        height: 16px;\r\n        border-radius: 3px;\r\n        position: absolute;\r\n        right: 1px;\r\n        top: 1px;\r\n        color: #fff;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
var colorPresetBlock = `r2McNYcszs1q76U2Karf`;
var colorPresetBlockStrip = `CigXIU9y9G9OBof3hWgM`;
var colorPresetBlockStripItem = `NWZK3n5eYacvCZkMuAYg`;
var colorPresetBlock_active = `K3ZA1kC_hnpc47uJLcBh`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3825:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   CP: () => (/* binding */ variableItem),
/* harmony export */   I6: () => (/* binding */ variableItemEdit),
/* harmony export */   MQ: () => (/* binding */ variableItemEdit_inputwrapDefault),
/* harmony export */   Re: () => (/* binding */ variableList),
/* harmony export */   Tt: () => (/* binding */ variableItemEdit_head),
/* harmony export */   Tx: () => (/* binding */ variableItemActions),
/* harmony export */   be: () => (/* binding */ controlVariablePreviewIcon),
/* harmony export */   cG: () => (/* binding */ variableName),
/* harmony export */   d5: () => (/* binding */ variableItemLeft),
/* harmony export */   gA: () => (/* binding */ controlVariablePreview),
/* harmony export */   iy: () => (/* binding */ variableMeta),
/* harmony export */   z1: () => (/* binding */ variableItemEdit_inputwrap)
/* harmony export */ });
/* unused harmony exports map_wrapper, map_item, map_item_header, map_item_header_color, map_item_header_title, mini_map, mini_map_item, mini_map_item_color, mini_map_item_icon, map_item_content, panel, panel_detail, panel_detail_left, panel_detail_icon, panel_detail_label, panel_detail_variant, panel_switches, panel_switch, panel_switch_close, panel_switch_spacer, varFadeIn */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.pQe3TwFto5yMhq6dPy8y {}

.mwXsS5vgmDG6u1NnIgJe {}

.d2doAHu_g_tY4Tenoa2y {
    position: relative;
    height: 32px;
    display: flex;
    margin-bottom: 1px;
    background-color: #101010;
    padding: 0 8px;
    align-items: center;
    gap: 12px;
    border-radius: 3px;
}

._99y8osU62XUV4fpbidzS {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 12px;
}

.Iu1WW7NYr5RLYCiTcgpe {
    font-size: 11px;
}

.h3znFJR_mlFPwHkzV5iL {
    display: flex;
    position: absolute;
    right: 18px;
    gap: 8px;

}

.sqQg_DlOnd1w9dmpDwnQ {
        display: flex;
        align-items: center;
        gap: 4px;
    }

.CDrNxnEOamGRalm_Xxpl {
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 20px;
        }

.ihMHtPBLX9WTVMzPZTPY {
            width: 12px;
        }

.opanVOvDRbLA98G2OZGQ {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #101010;
    padding: 8px;
    margin-bottom: 12px;
    border-radius: 3px;
}

.H0u2iRWkN6lDnpKCPiOF {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-bottom: 1px dashed #333;
    padding-bottom: 8px;
}

.H0u2iRWkN6lDnpKCPiOF:last-child {
        border: 0;
        padding-bottom: 0;
    }

.pw27tsa6Tv3L9fS7FDhz {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
    }

.QGyPnncvLvdi5JHi2Clo {
            display: flex;
            align-items: center;
            gap: 12px;

        }

.eWpREsymqYGOZKpsgRTK {}

.uUoMW2FuND_B20e4Ivsd {}

.df5H_IpB7Y_te3Bkx7YR {
            color: #fff;
        }

.DOIH32QOOnVGt0kozzbB {
        display: flex;
        gap: 4px;
    }

.jmvUhyWx9QzffW9FLJIf {
        opacity: 0.4;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }

.jmvUhyWx9QzffW9FLJIf[data-active="true"] {
            opacity: 1;
        }

.XGUhoqq8SZ_xI4Kl4rAI {
            opacity: .4;
            background: #61517c;
        }

.XGUhoqq8SZ_xI4Kl4rAI[data-active="true"] {
                opacity: 1;
            }

.RE4vbESRz8qk3VIT4B88 {
            width: 1;
            height: 15;
            background-color: #333;
        }

.AN6qw1DQZZdMR9rUFOCU {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    margin-bottom: 6px;
    padding: 6px;
    border-radius: 6px;
    background: #111;
}

.wiE5l1eMfILb1y7O_xdO {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        position: relative;
    }

.iRdDOk5Y4GFbxy4r7eXQ {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 10px;
    }

.w8_FyzkD054sOneq8Kdq {}

/* ================= Variable List ================= */

.PpYXypezJNQfFZyDs6Z5 {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 8px;
}

.hIw4ch9fFFdS9Ho7E39A {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    border-radius: 8px;
    background: rgba(148, 163, 184, 0.08);
}

.hIw4ch9fFFdS9Ho7E39A:hover {
    background: rgba(148, 163, 184, 0.14);
}

.jSu5XMCYjBGJ8AMssJrr {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
}

.p6vh14I1_pRW_upkDeC6 {
    font-size: 12px;
    font-weight: 500;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.JlddrCz4fupkB8BbqD3K {
    font-size: 10px;
    color: #94a3b8;
    line-height: 1;
}

.oXZnqAIJGqNyX1hX9flP {
    display: flex;
    gap: 4px;
}

/* ================= Variable Editor ================= */

.AN6qw1DQZZdMR9rUFOCU {
    position: relative;
    margin-bottom: 8px;
    padding: 10px 8px 8px;
    border-radius: 10px;
    background: #1b1b1b;
}

.wiE5l1eMfILb1y7O_xdO {
    display: grid;
    grid-template-columns: 1fr 88px;
    gap: 6px;
    margin-bottom: 6px;
}

.iRdDOk5Y4GFbxy4r7eXQ {
    width: 100%;
}

.w8_FyzkD054sOneq8Kdq {
    margin-bottom: 6px;
}

/* ================= Subtle Editor Animations ================= */

.AN6qw1DQZZdMR9rUFOCU {
    animation: IocQKue6aPOSplWeVj53 0.18s ease-out;
}

@keyframes IocQKue6aPOSplWeVj53 {
    from {
        opacity: 0;
        transform: translateY(-4px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mDzg_4zgNzAXkURXZICx {
    padding: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 6px;
    width: 100%;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    background: var(--mantine-color-violet-8);
}

.unZpdIHnm4og4Gt54zg1 {
    width: 24px;
    height: 24px;
    padding: 3px;
    border-radius: 6px;
    color: var(--mantine-color-violet-4);
    background: #fff;
    display: flex;
    align-items: center;
}`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/css/base.module.css"],"names":[],"mappings":"AAAA,uBAAc;;AAEd,uBAAW;;AAEX;IACI,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,yBAAyB;IACzB,cAAc;IACd,mBAAmB;IACnB,SAAS;IACT,kBAAkB;AACtB;;AAEA;IACI,qBAAqB;IACrB,WAAW;IACX,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,WAAW;IACX,QAAQ;;AAmBZ;;AAjBI;QACI,aAAa;QACb,mBAAmB;QACnB,QAAQ;IAYZ;;AAVI;YACI,qBAAqB;YACrB,UAAU;YACV,WAAW;YACX,mBAAmB;QACvB;;AAEA;YACI,WAAW;QACf;;AAKR;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,yBAAyB;IACzB,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,8BAA8B;IAC9B,mBAAmB;AA8DvB;;AA5DI;QACI,SAAS;QACT,iBAAiB;IACrB;;AAEA;QACI,aAAa;QACb,mBAAmB;QACnB,8BAA8B;QAC9B,eAAe;IAgBnB;;AAdI;YACI,aAAa;YACb,mBAAmB;YACnB,SAAS;;QAEb;;AAEA,uBAAQ;;AAER,uBAAS;;AAET;YACI,WAAW;QACf;;AAGJ;QACI,aAAa;QACb,QAAQ;IACZ;;AAEA;QACI,YAAY;QACZ,WAAW;QACX,YAAY;QACZ,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,mBAAmB;IAoBvB;;AAlBI;YACI,UAAU;QACd;;AAEA;YACI,WAAW;YACX,mBAAmB;QAKvB;;AAHI;gBACI,UAAU;YACd;;AAGJ;YACI,QAAQ;YACR,UAAU;YACV,sBAAsB;QAC1B;;AAIR;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,WAAW;IACX,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;AAkBpB;;AAhBI;QACI,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,QAAQ;QACR,kBAAkB;IACtB;;AAEA;QACI,aAAa;QACb,sBAAsB;QACtB,QAAQ;QACR,eAAe;IACnB;;AAEA,uBAAoB;;AAGxB,sDAAsD;;AAEtD;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,gBAAgB;IAChB,kBAAkB;IAClB,qCAAqC;AACzC;;AAEA;IACI,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,gBAAgB;AACpB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,cAAc;IACd,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;AAC3B;;AAEA;IACI,eAAe;IACf,cAAc;IACd,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,QAAQ;AACZ;;AAEA,wDAAwD;;AAExD;IACI,kBAAkB;IAClB,kBAAkB;IAClB,qBAAqB;IACrB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,QAAQ;IACR,kBAAkB;AACtB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,kBAAkB;AACtB;;AAEA,iEAAiE;;AAEjE;IACI,8CAAmC;AACvC;;AAEA;IACI;QACI,UAAU;QACV,2BAA2B;IAC/B;;IAEA;QACI,UAAU;QACV,wBAAwB;IAC5B;AACJ;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,QAAQ;IACR,kBAAkB;IAClB,WAAW;IACX,eAAe;IACf,gBAAgB;IAChB,WAAW;IACX,yCAAyC;AAC7C;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,oCAAoC;IACpC,gBAAgB;IAChB,aAAa;IACb,mBAAmB;AACvB","sourcesContent":[".map_wrapper {}\r\n\r\n.map_item {}\r\n\r\n.map_item_header {\r\n    position: relative;\r\n    height: 32px;\r\n    display: flex;\r\n    margin-bottom: 1px;\r\n    background-color: #101010;\r\n    padding: 0 8px;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-radius: 3px;\r\n}\r\n\r\n.map_item_header_color {\r\n    display: inline-block;\r\n    width: 10px;\r\n    height: 10px;\r\n    border-radius: 12px;\r\n}\r\n\r\n.map_item_header_title {\r\n    font-size: 11px;\r\n}\r\n\r\n.mini_map {\r\n    display: flex;\r\n    position: absolute;\r\n    right: 18px;\r\n    gap: 8px;\r\n\r\n    &_item {\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 4px;\r\n\r\n        &_color {\r\n            display: inline-block;\r\n            width: 7px;\r\n            height: 7px;\r\n            border-radius: 20px;\r\n        }\r\n\r\n        &_icon {\r\n            width: 12px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n.map_item_content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    background-color: #101010;\r\n    padding: 8px;\r\n    margin-bottom: 12px;\r\n    border-radius: 3px;\r\n}\r\n\r\n.panel {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    border-bottom: 1px dashed #333;\r\n    padding-bottom: 8px;\r\n\r\n    &:last-child {\r\n        border: 0;\r\n        padding-bottom: 0;\r\n    }\r\n\r\n    &_detail {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: space-between;\r\n        font-size: 11px;\r\n\r\n        &_left {\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 12px;\r\n\r\n        }\r\n\r\n        &_icon {}\r\n\r\n        &_label {}\r\n\r\n        &_variant {\r\n            color: #fff;\r\n        }\r\n    }\r\n\r\n    &_switches {\r\n        display: flex;\r\n        gap: 4px;\r\n    }\r\n\r\n    &_switch {\r\n        opacity: 0.4;\r\n        width: 15px;\r\n        height: 15px;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        border-radius: 20px;\r\n\r\n        &[data-active=\"true\"] {\r\n            opacity: 1;\r\n        }\r\n\r\n        &_close {\r\n            opacity: .4;\r\n            background: #61517c;\r\n\r\n            &[data-active=\"true\"] {\r\n                opacity: 1;\r\n            }\r\n        }\r\n\r\n        &_spacer {\r\n            width: 1;\r\n            height: 15;\r\n            background-color: #333;\r\n        }\r\n    }\r\n}\r\n\r\n.variableItemEdit {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    width: 100%;\r\n    margin-bottom: 6px;\r\n    padding: 6px;\r\n    border-radius: 6px;\r\n    background: #111;\r\n\r\n    &_head {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        gap: 4px;\r\n        position: relative;\r\n    }\r\n\r\n    &_inputwrap {\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 4px;\r\n        font-size: 10px;\r\n    }\r\n\r\n    &_inputwrapDefault {}\r\n}\r\n\r\n/* ================= Variable List ================= */\r\n\r\n.variableList {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.variableItem {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 6px 8px;\r\n    border-radius: 8px;\r\n    background: rgba(148, 163, 184, 0.08);\r\n}\r\n\r\n.variableItem:hover {\r\n    background: rgba(148, 163, 184, 0.14);\r\n}\r\n\r\n.variableItemLeft {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 2px;\r\n    overflow: hidden;\r\n}\r\n\r\n.variableName {\r\n    font-size: 12px;\r\n    font-weight: 500;\r\n    color: #e5e7eb;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.variableMeta {\r\n    font-size: 10px;\r\n    color: #94a3b8;\r\n    line-height: 1;\r\n}\r\n\r\n.variableItemActions {\r\n    display: flex;\r\n    gap: 4px;\r\n}\r\n\r\n/* ================= Variable Editor ================= */\r\n\r\n.variableItemEdit {\r\n    position: relative;\r\n    margin-bottom: 8px;\r\n    padding: 10px 8px 8px;\r\n    border-radius: 10px;\r\n    background: #1b1b1b;\r\n}\r\n\r\n.variableItemEdit_head {\r\n    display: grid;\r\n    grid-template-columns: 1fr 88px;\r\n    gap: 6px;\r\n    margin-bottom: 6px;\r\n}\r\n\r\n.variableItemEdit_inputwrap {\r\n    width: 100%;\r\n}\r\n\r\n.variableItemEdit_inputwrapDefault {\r\n    margin-bottom: 6px;\r\n}\r\n\r\n/* ================= Subtle Editor Animations ================= */\r\n\r\n.variableItemEdit {\r\n    animation: varFadeIn 0.18s ease-out;\r\n}\r\n\r\n@keyframes varFadeIn {\r\n    from {\r\n        opacity: 0;\r\n        transform: translateY(-4px);\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n}\r\n\r\n.controlVariablePreview {\r\n    padding: 3px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    border-radius: 6px;\r\n    width: 100%;\r\n    font-size: 10px;\r\n    font-weight: 600;\r\n    color: #fff;\r\n    background: var(--mantine-color-violet-8);\r\n}\r\n\r\n.controlVariablePreviewIcon {\r\n    width: 24px;\r\n    height: 24px;\r\n    padding: 3px;\r\n    border-radius: 6px;\r\n    color: var(--mantine-color-violet-4);\r\n    background: #fff;\r\n    display: flex;\r\n    align-items: center;\r\n}"],"sourceRoot":""}]);
// Exports
var map_wrapper = (/* unused pure expression or super */ null && (`pQe3TwFto5yMhq6dPy8y`));
var map_item = (/* unused pure expression or super */ null && (`mwXsS5vgmDG6u1NnIgJe`));
var map_item_header = (/* unused pure expression or super */ null && (`d2doAHu_g_tY4Tenoa2y`));
var map_item_header_color = (/* unused pure expression or super */ null && (`_99y8osU62XUV4fpbidzS`));
var map_item_header_title = (/* unused pure expression or super */ null && (`Iu1WW7NYr5RLYCiTcgpe`));
var mini_map = (/* unused pure expression or super */ null && (`h3znFJR_mlFPwHkzV5iL`));
var mini_map_item = (/* unused pure expression or super */ null && (`sqQg_DlOnd1w9dmpDwnQ`));
var mini_map_item_color = (/* unused pure expression or super */ null && (`CDrNxnEOamGRalm_Xxpl`));
var mini_map_item_icon = (/* unused pure expression or super */ null && (`ihMHtPBLX9WTVMzPZTPY`));
var map_item_content = (/* unused pure expression or super */ null && (`opanVOvDRbLA98G2OZGQ`));
var panel = (/* unused pure expression or super */ null && (`H0u2iRWkN6lDnpKCPiOF`));
var panel_detail = (/* unused pure expression or super */ null && (`pw27tsa6Tv3L9fS7FDhz`));
var panel_detail_left = (/* unused pure expression or super */ null && (`QGyPnncvLvdi5JHi2Clo`));
var panel_detail_icon = (/* unused pure expression or super */ null && (`eWpREsymqYGOZKpsgRTK`));
var panel_detail_label = (/* unused pure expression or super */ null && (`uUoMW2FuND_B20e4Ivsd`));
var panel_detail_variant = (/* unused pure expression or super */ null && (`df5H_IpB7Y_te3Bkx7YR`));
var panel_switches = (/* unused pure expression or super */ null && (`DOIH32QOOnVGt0kozzbB`));
var panel_switch = (/* unused pure expression or super */ null && (`jmvUhyWx9QzffW9FLJIf`));
var panel_switch_close = (/* unused pure expression or super */ null && (`XGUhoqq8SZ_xI4Kl4rAI`));
var panel_switch_spacer = (/* unused pure expression or super */ null && (`RE4vbESRz8qk3VIT4B88`));
var variableItemEdit = `AN6qw1DQZZdMR9rUFOCU`;
var variableItemEdit_head = `wiE5l1eMfILb1y7O_xdO`;
var variableItemEdit_inputwrap = `iRdDOk5Y4GFbxy4r7eXQ`;
var variableItemEdit_inputwrapDefault = `w8_FyzkD054sOneq8Kdq`;
var variableList = `PpYXypezJNQfFZyDs6Z5`;
var variableItem = `hIw4ch9fFFdS9Ho7E39A`;
var variableItemLeft = `jSu5XMCYjBGJ8AMssJrr`;
var variableName = `p6vh14I1_pRW_upkDeC6`;
var variableMeta = `JlddrCz4fupkB8BbqD3K`;
var variableItemActions = `oXZnqAIJGqNyX1hX9flP`;
var varFadeIn = (/* unused pure expression or super */ null && (`IocQKue6aPOSplWeVj53`));
var controlVariablePreview = `mDzg_4zgNzAXkURXZICx`;
var controlVariablePreviewIcon = `unZpdIHnm4og4Gt54zg1`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4596:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   My: () => (/* binding */ preview_action),
/* harmony export */   VH: () => (/* binding */ preview),
/* harmony export */   tr: () => (/* binding */ preview_actions)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.gh8sWS_c5kY_tu1jvuQM {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--in-c);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff7d;
    background-size: cover;
    background-position: center;
}

    .nLNGgha7xghQXC900INx {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        gap: 4px;
        padding: 4px;
    }

    .FrfBundVo5FiFoB_bBtd {
        width: 20px;
        height: 20px;
        border-radius: 6px;
        color: #333;
        background: #fff;
        box-shadow: #5c6878 0 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .FrfBundVo5FiFoB_bBtd[data-delete] {
            color: rgb(138, 50, 50);
        }`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/optionSections/BackgroundsSection.module.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,WAAW;IACX,oBAAoB;IACpB,uBAAuB;IACvB,kBAAkB;IAClB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,gBAAgB;IAChB,sBAAsB;IACtB,2BAA2B;AAwB/B;;IAtBI;QACI,kBAAkB;QAClB,MAAM;QACN,QAAQ;QACR,aAAa;QACb,QAAQ;QACR,YAAY;IAChB;;IACA;QACI,WAAW;QACX,YAAY;QACZ,kBAAkB;QAClB,WAAW;QACX,gBAAgB;QAChB,2BAA2B;QAC3B,aAAa;QACb,mBAAmB;QACnB,uBAAuB;IAI3B;;IAHI;YACI,uBAAuB;QAC3B","sourcesContent":[".preview {\r\n    position: relative;\r\n    width: 100%;\r\n    aspect-ratio: 16 / 9;\r\n    background: var(--in-c);\r\n    border-radius: 3px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    color: #ffffff7d;\r\n    background-size: cover;\r\n    background-position: center;\r\n\r\n    &_actions {\r\n        position: absolute;\r\n        top: 0;\r\n        right: 0;\r\n        display: flex;\r\n        gap: 4px;\r\n        padding: 4px;\r\n    }\r\n    &_action {\r\n        width: 20px;\r\n        height: 20px;\r\n        border-radius: 6px;\r\n        color: #333;\r\n        background: #fff;\r\n        box-shadow: #5c6878 0 0 5px;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        &[data-delete] {\r\n            color: rgb(138, 50, 50);\r\n        }\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
var preview = `gh8sWS_c5kY_tu1jvuQM`;
var preview_actions = `nLNGgha7xghQXC900INx`;
var preview_action = `FrfBundVo5FiFoB_bBtd`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1701:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   BY: () => (/* binding */ map_wrapper),
/* harmony export */   F1: () => (/* binding */ mini_map_item),
/* harmony export */   IK: () => (/* binding */ panel_detail_label),
/* harmony export */   Le: () => (/* binding */ mini_map),
/* harmony export */   SP: () => (/* binding */ panel_switch),
/* harmony export */   Sv: () => (/* binding */ panel_switches),
/* harmony export */   TX: () => (/* binding */ panel_detail_variant),
/* harmony export */   X0: () => (/* binding */ map_item_header),
/* harmony export */   Xt: () => (/* binding */ panel_detail_left),
/* harmony export */   d4: () => (/* binding */ panel_switch_close),
/* harmony export */   dO: () => (/* binding */ mini_map_item_icon),
/* harmony export */   fm: () => (/* binding */ panel_detail),
/* harmony export */   j8: () => (/* binding */ map_item_header_color),
/* harmony export */   kI: () => (/* binding */ map_item_header_title),
/* harmony export */   lt: () => (/* binding */ panel_switch_spacer),
/* harmony export */   nd: () => (/* binding */ panel),
/* harmony export */   pj: () => (/* binding */ mini_map_item_color),
/* harmony export */   pp: () => (/* binding */ map_item_content),
/* harmony export */   pw: () => (/* binding */ panel_detail_icon),
/* harmony export */   xc: () => (/* binding */ map_item)
/* harmony export */ });
/* unused harmony exports variableItemEdit, variableItemEdit_head, variableItemEdit_inputwrap, variableItemEdit_inputwrapDefault, variableList, variableItem, variableItemLeft, variableName, variableMeta, variableItemActions, varFadeIn, controlVariablePreview, controlVariablePreviewIcon */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.NX7oUpaxch_7pde5A_Gl {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.V_33PSks8FnrRLxgelBB {}

.sM0vejTPi_8Dxjz0N5qm {
    position: relative;
    height: 32px;
    display: flex;
    margin-bottom: 1px;
    background-color: #3a3a3a;
    padding: 0 8px;
    align-items: center;
    gap: 12px;
    border-radius: 3px;
}

.sM0vejTPi_8Dxjz0N5qm[data-open="true"] {
        background-color: #101010;
    }

._GceKZd7r3D7FQZokfQy {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 12px;
}

.JPO6PZNy54_TUGhWBJDm {
    font-size: 11px;
}

.a8j6tiOaBnib6VBGe6L0 {
    display: flex;
    position: absolute;
    right: 18px;
    gap: 8px;

}

.HnsCKDU2luitJZFF_tj6 {
        display: flex;
        align-items: center;
        gap: 4px;
    }

.EhZh8hh71v_XmOzHemkA {
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 20px;
        }

.Ke7XZvZ9c4VZU6rqDmXF {
            width: 12px;
        }

.BbMl3RhSJF4Vk3E9QmRr {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #101010;
    padding: 8px;
    border-radius: 3px;
}

.nCJ_JZW67l30LvygAUYw {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-bottom: 1px dashed #333;
    padding-bottom: 8px;
}

.nCJ_JZW67l30LvygAUYw:last-child {
        border: 0;
        padding-bottom: 0;
    }

.rdcA3YP74hy0WECyi_ow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
    }

.yuyUlARQyQraRXQoWKxZ {
            display: flex;
            align-items: center;
            gap: 12px;

        }

.jS_zgzyIHCAzz7rmZ8Lg {}

._Mmj9LqvDKIvmW11kwUL {}

.CcxTr2ISGoMIXZimKA0Z {
            color: #fff;
        }

.dXk64XgUuxJH7PUmgNTg {
        display: flex;
        gap: 4px;
    }

.tdhADTvj3DXnbUGqG7hN {
        opacity: 0.4;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
    }

.tdhADTvj3DXnbUGqG7hN[data-active="true"] {
            opacity: 1;
        }

.iIypMq_HTxCKLNJM_Ca6 {
            opacity: .4;
            background: #61517c;
        }

.iIypMq_HTxCKLNJM_Ca6[data-active="true"] {
                opacity: 1;
            }

.YNsuD2UlQs6WnaY43FIG {
            width: 1;
            height: 15;
            background-color: #333;
        }

.qyJ_Ku40uU7Ltt3q7oEr {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    margin-bottom: 6px;
    padding: 6px;
    border-radius: 6px;
    background: #111;
}

.HI3LqhpXdaeQ3M0pjy3K {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        position: relative;
    }

.k8pwHqgcjtK0bsP42PtE {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 10px;
    }

.taK5ImJ7MDHz6u1S1INb {}

/* ================= Variable List ================= */

.OD5ZZXRrCcZsAZtL_UQa {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 8px;
}

.onV2u6Rn8JuoqFmGvEuL {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    border-radius: 8px;
    background: rgba(148, 163, 184, 0.08);
}

.onV2u6Rn8JuoqFmGvEuL:hover {
    background: rgba(148, 163, 184, 0.14);
}

.cWoF7HLaiOMZcmKGRS5o {
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
}

._fBk9oKXFK5DIGEuujnY {
    font-size: 12px;
    font-weight: 500;
    color: #e5e7eb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.P_QGpUcX1IuxT6FR0bfp {
    font-size: 10px;
    color: #94a3b8;
    line-height: 1;
}

.OOuigwht1Kd8RM32DtCW {
    display: flex;
    gap: 4px;
}

/* ================= Variable Editor ================= */

.qyJ_Ku40uU7Ltt3q7oEr {
    position: relative;
    margin-bottom: 8px;
    padding: 10px 8px 8px;
    border-radius: 10px;
    background: #1b1b1b;
}

.HI3LqhpXdaeQ3M0pjy3K {
    display: grid;
    grid-template-columns: 1fr 88px;
    gap: 6px;
    margin-bottom: 6px;
}

.k8pwHqgcjtK0bsP42PtE {
    width: 100%;
}

.taK5ImJ7MDHz6u1S1INb {
    margin-bottom: 6px;
}

/* ================= Subtle Editor Animations ================= */

.qyJ_Ku40uU7Ltt3q7oEr {
    animation: Dh_pV6KVEgXV3OzDkqpB 0.18s ease-out;
}

@keyframes Dh_pV6KVEgXV3OzDkqpB {
    from {
        opacity: 0;
        transform: translateY(-4px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.b7c8IZHqt85kukC2Ufn0 {
    padding: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 6px;
    width: 100%;
    font-size: 10px;
    font-weight: 600;
    color: #fff;
    background: var(--mantine-color-violet-8);
}

.WF_5_7ZMjAQQsZIA77Kp {
    width: 24px;
    height: 24px;
    padding: 3px;
    border-radius: 6px;
    color: var(--mantine-color-violet-4);
    background: #fff;
    display: flex;
    align-items: center;
}`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/optionSections/Common.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;AACZ;;AAEA,uBAAW;;AAEX;IACI,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,yBAAyB;IACzB,cAAc;IACd,mBAAmB;IACnB,SAAS;IACT,kBAAkB;AAItB;;AAHI;QACI,yBAAyB;IAC7B;;AAGJ;IACI,qBAAqB;IACrB,WAAW;IACX,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,WAAW;IACX,QAAQ;;AAmBZ;;AAjBI;QACI,aAAa;QACb,mBAAmB;QACnB,QAAQ;IAYZ;;AAVI;YACI,qBAAqB;YACrB,UAAU;YACV,WAAW;YACX,mBAAmB;QACvB;;AAEA;YACI,WAAW;QACf;;AAKR;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,yBAAyB;IACzB,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,8BAA8B;IAC9B,mBAAmB;AA8DvB;;AA5DI;QACI,SAAS;QACT,iBAAiB;IACrB;;AAEA;QACI,aAAa;QACb,mBAAmB;QACnB,8BAA8B;QAC9B,eAAe;IAgBnB;;AAdI;YACI,aAAa;YACb,mBAAmB;YACnB,SAAS;;QAEb;;AAEA,uBAAQ;;AAER,uBAAS;;AAET;YACI,WAAW;QACf;;AAGJ;QACI,aAAa;QACb,QAAQ;IACZ;;AAEA;QACI,YAAY;QACZ,WAAW;QACX,YAAY;QACZ,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,mBAAmB;IAoBvB;;AAlBI;YACI,UAAU;QACd;;AAEA;YACI,WAAW;YACX,mBAAmB;QAKvB;;AAHI;gBACI,UAAU;YACd;;AAGJ;YACI,QAAQ;YACR,UAAU;YACV,sBAAsB;QAC1B;;AAIR;IACI,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,WAAW;IACX,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;AAkBpB;;AAhBI;QACI,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,QAAQ;QACR,kBAAkB;IACtB;;AAEA;QACI,aAAa;QACb,sBAAsB;QACtB,QAAQ;QACR,eAAe;IACnB;;AAEA,uBAAoB;;AAGxB,sDAAsD;;AAEtD;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,gBAAgB;IAChB,kBAAkB;IAClB,qCAAqC;AACzC;;AAEA;IACI,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;IACR,gBAAgB;AACpB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,cAAc;IACd,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;AAC3B;;AAEA;IACI,eAAe;IACf,cAAc;IACd,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,QAAQ;AACZ;;AAEA,wDAAwD;;AAExD;IACI,kBAAkB;IAClB,kBAAkB;IAClB,qBAAqB;IACrB,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,+BAA+B;IAC/B,QAAQ;IACR,kBAAkB;AACtB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,kBAAkB;AACtB;;AAEA,iEAAiE;;AAEjE;IACI,8CAAmC;AACvC;;AAEA;IACI;QACI,UAAU;QACV,2BAA2B;IAC/B;;IAEA;QACI,UAAU;QACV,wBAAwB;IAC5B;AACJ;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,QAAQ;IACR,kBAAkB;IAClB,WAAW;IACX,eAAe;IACf,gBAAgB;IAChB,WAAW;IACX,yCAAyC;AAC7C;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,oCAAoC;IACpC,gBAAgB;IAChB,aAAa;IACb,mBAAmB;AACvB","sourcesContent":[".map_wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n}\r\n\r\n.map_item {}\r\n\r\n.map_item_header {\r\n    position: relative;\r\n    height: 32px;\r\n    display: flex;\r\n    margin-bottom: 1px;\r\n    background-color: #3a3a3a;\r\n    padding: 0 8px;\r\n    align-items: center;\r\n    gap: 12px;\r\n    border-radius: 3px;\r\n    &[data-open=\"true\"] {\r\n        background-color: #101010;\r\n    }\r\n}\r\n\r\n.map_item_header_color {\r\n    display: inline-block;\r\n    width: 10px;\r\n    height: 10px;\r\n    border-radius: 12px;\r\n}\r\n\r\n.map_item_header_title {\r\n    font-size: 11px;\r\n}\r\n\r\n.mini_map {\r\n    display: flex;\r\n    position: absolute;\r\n    right: 18px;\r\n    gap: 8px;\r\n\r\n    &_item {\r\n        display: flex;\r\n        align-items: center;\r\n        gap: 4px;\r\n\r\n        &_color {\r\n            display: inline-block;\r\n            width: 7px;\r\n            height: 7px;\r\n            border-radius: 20px;\r\n        }\r\n\r\n        &_icon {\r\n            width: 12px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n.map_item_content {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    background-color: #101010;\r\n    padding: 8px;\r\n    border-radius: 3px;\r\n}\r\n\r\n.panel {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n    border-bottom: 1px dashed #333;\r\n    padding-bottom: 8px;\r\n\r\n    &:last-child {\r\n        border: 0;\r\n        padding-bottom: 0;\r\n    }\r\n\r\n    &_detail {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: space-between;\r\n        font-size: 11px;\r\n\r\n        &_left {\r\n            display: flex;\r\n            align-items: center;\r\n            gap: 12px;\r\n\r\n        }\r\n\r\n        &_icon {}\r\n\r\n        &_label {}\r\n\r\n        &_variant {\r\n            color: #fff;\r\n        }\r\n    }\r\n\r\n    &_switches {\r\n        display: flex;\r\n        gap: 4px;\r\n    }\r\n\r\n    &_switch {\r\n        opacity: 0.4;\r\n        width: 15px;\r\n        height: 15px;\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        border-radius: 20px;\r\n\r\n        &[data-active=\"true\"] {\r\n            opacity: 1;\r\n        }\r\n\r\n        &_close {\r\n            opacity: .4;\r\n            background: #61517c;\r\n\r\n            &[data-active=\"true\"] {\r\n                opacity: 1;\r\n            }\r\n        }\r\n\r\n        &_spacer {\r\n            width: 1;\r\n            height: 15;\r\n            background-color: #333;\r\n        }\r\n    }\r\n}\r\n\r\n.variableItemEdit {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    width: 100%;\r\n    margin-bottom: 6px;\r\n    padding: 6px;\r\n    border-radius: 6px;\r\n    background: #111;\r\n\r\n    &_head {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        gap: 4px;\r\n        position: relative;\r\n    }\r\n\r\n    &_inputwrap {\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 4px;\r\n        font-size: 10px;\r\n    }\r\n\r\n    &_inputwrapDefault {}\r\n}\r\n\r\n/* ================= Variable List ================= */\r\n\r\n.variableList {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.variableItem {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 6px 8px;\r\n    border-radius: 8px;\r\n    background: rgba(148, 163, 184, 0.08);\r\n}\r\n\r\n.variableItem:hover {\r\n    background: rgba(148, 163, 184, 0.14);\r\n}\r\n\r\n.variableItemLeft {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 2px;\r\n    overflow: hidden;\r\n}\r\n\r\n.variableName {\r\n    font-size: 12px;\r\n    font-weight: 500;\r\n    color: #e5e7eb;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.variableMeta {\r\n    font-size: 10px;\r\n    color: #94a3b8;\r\n    line-height: 1;\r\n}\r\n\r\n.variableItemActions {\r\n    display: flex;\r\n    gap: 4px;\r\n}\r\n\r\n/* ================= Variable Editor ================= */\r\n\r\n.variableItemEdit {\r\n    position: relative;\r\n    margin-bottom: 8px;\r\n    padding: 10px 8px 8px;\r\n    border-radius: 10px;\r\n    background: #1b1b1b;\r\n}\r\n\r\n.variableItemEdit_head {\r\n    display: grid;\r\n    grid-template-columns: 1fr 88px;\r\n    gap: 6px;\r\n    margin-bottom: 6px;\r\n}\r\n\r\n.variableItemEdit_inputwrap {\r\n    width: 100%;\r\n}\r\n\r\n.variableItemEdit_inputwrapDefault {\r\n    margin-bottom: 6px;\r\n}\r\n\r\n/* ================= Subtle Editor Animations ================= */\r\n\r\n.variableItemEdit {\r\n    animation: varFadeIn 0.18s ease-out;\r\n}\r\n\r\n@keyframes varFadeIn {\r\n    from {\r\n        opacity: 0;\r\n        transform: translateY(-4px);\r\n    }\r\n\r\n    to {\r\n        opacity: 1;\r\n        transform: translateY(0);\r\n    }\r\n}\r\n\r\n.controlVariablePreview {\r\n    padding: 3px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    border-radius: 6px;\r\n    width: 100%;\r\n    font-size: 10px;\r\n    font-weight: 600;\r\n    color: #fff;\r\n    background: var(--mantine-color-violet-8);\r\n}\r\n\r\n.controlVariablePreviewIcon {\r\n    width: 24px;\r\n    height: 24px;\r\n    padding: 3px;\r\n    border-radius: 6px;\r\n    color: var(--mantine-color-violet-4);\r\n    background: #fff;\r\n    display: flex;\r\n    align-items: center;\r\n}"],"sourceRoot":""}]);
// Exports
var map_wrapper = `NX7oUpaxch_7pde5A_Gl`;
var map_item = `V_33PSks8FnrRLxgelBB`;
var map_item_header = `sM0vejTPi_8Dxjz0N5qm`;
var map_item_header_color = `_GceKZd7r3D7FQZokfQy`;
var map_item_header_title = `JPO6PZNy54_TUGhWBJDm`;
var mini_map = `a8j6tiOaBnib6VBGe6L0`;
var mini_map_item = `HnsCKDU2luitJZFF_tj6`;
var mini_map_item_color = `EhZh8hh71v_XmOzHemkA`;
var mini_map_item_icon = `Ke7XZvZ9c4VZU6rqDmXF`;
var map_item_content = `BbMl3RhSJF4Vk3E9QmRr`;
var panel = `nCJ_JZW67l30LvygAUYw`;
var panel_detail = `rdcA3YP74hy0WECyi_ow`;
var panel_detail_left = `yuyUlARQyQraRXQoWKxZ`;
var panel_detail_icon = `jS_zgzyIHCAzz7rmZ8Lg`;
var panel_detail_label = `_Mmj9LqvDKIvmW11kwUL`;
var panel_detail_variant = `CcxTr2ISGoMIXZimKA0Z`;
var panel_switches = `dXk64XgUuxJH7PUmgNTg`;
var panel_switch = `tdhADTvj3DXnbUGqG7hN`;
var panel_switch_close = `iIypMq_HTxCKLNJM_Ca6`;
var panel_switch_spacer = `YNsuD2UlQs6WnaY43FIG`;
var variableItemEdit = (/* unused pure expression or super */ null && (`qyJ_Ku40uU7Ltt3q7oEr`));
var variableItemEdit_head = (/* unused pure expression or super */ null && (`HI3LqhpXdaeQ3M0pjy3K`));
var variableItemEdit_inputwrap = (/* unused pure expression or super */ null && (`k8pwHqgcjtK0bsP42PtE`));
var variableItemEdit_inputwrapDefault = (/* unused pure expression or super */ null && (`taK5ImJ7MDHz6u1S1INb`));
var variableList = (/* unused pure expression or super */ null && (`OD5ZZXRrCcZsAZtL_UQa`));
var variableItem = (/* unused pure expression or super */ null && (`onV2u6Rn8JuoqFmGvEuL`));
var variableItemLeft = (/* unused pure expression or super */ null && (`cWoF7HLaiOMZcmKGRS5o`));
var variableName = (/* unused pure expression or super */ null && (`_fBk9oKXFK5DIGEuujnY`));
var variableMeta = (/* unused pure expression or super */ null && (`P_QGpUcX1IuxT6FR0bfp`));
var variableItemActions = (/* unused pure expression or super */ null && (`OOuigwht1Kd8RM32DtCW`));
var varFadeIn = (/* unused pure expression or super */ null && (`Dh_pV6KVEgXV3OzDkqpB`));
var controlVariablePreview = (/* unused pure expression or super */ null && (`b7c8IZHqt85kukC2Ufn0`));
var controlVariablePreviewIcon = (/* unused pure expression or super */ null && (`WF_5_7ZMjAQQsZIA77Kp`));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1316:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   HM: () => (/* binding */ postionInfo),
/* harmony export */   Kp: () => (/* binding */ ppBox),
/* harmony export */   Lc: () => (/* binding */ ppBox_right),
/* harmony export */   WR: () => (/* binding */ ppBox_left)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.u5G4HtyPrPBlL1FrkJV7 {
    position: relative;
    padding-left: 12px;
    display: flex;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    margin: 8px 0;
}
    .u5G4HtyPrPBlL1FrkJV7:before {
        content: '';
        position: absolute;
        left: 2px;
        width: 3px;
        height: 100%;
        background: var(--in-c);
        border-radius: 2px;
    }
    .u5G4HtyPrPBlL1FrkJV7 span {
        font-weight: 300;
        opacity: .6;
        font-style: italic;
    }

.i7Sgo8S0JxicRszt4oHF {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}

.HZm4qDIXrFusJRV8gKQV {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

.yoi4w5fS9obdQLTvqx1r {
        display: flex;
        flex-direction: column;
        width: 86px;
        gap: 8px;
    }`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/optionSections/PositionSection.module.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,kBAAkB;IAClB,aAAa;IACb,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,aAAa;AAejB;IAdI;QACI,WAAW;QACX,kBAAkB;QAClB,SAAS;QACT,UAAU;QACV,YAAY;QACZ,uBAAuB;QACvB,kBAAkB;IACtB;IACA;QACI,gBAAgB;QAChB,WAAW;QACX,kBAAkB;IACtB;;AAGJ;IACI,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AAapB;;AAZI;QACI,OAAO;QACP,aAAa;QACb,uBAAuB;QACvB,mBAAmB;IACvB;;AACA;QACI,aAAa;QACb,sBAAsB;QACtB,WAAW;QACX,QAAQ;IACZ","sourcesContent":[".postionInfo {\r\n    position: relative;\r\n    padding-left: 12px;\r\n    display: flex;\r\n    align-items: center;\r\n    font-size: 11px;\r\n    font-weight: 500;\r\n    margin: 8px 0;\r\n    &:before {\r\n        content: '';\r\n        position: absolute;\r\n        left: 2px;\r\n        width: 3px;\r\n        height: 100%;\r\n        background: var(--in-c);\r\n        border-radius: 2px;\r\n    }\r\n    span {\r\n        font-weight: 300;\r\n        opacity: .6;\r\n        font-style: italic;\r\n    }\r\n}\r\n\r\n.ppBox {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-top: 24px;\r\n    &_left {\r\n        flex: 1;\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n    &_right {\r\n        display: flex;\r\n        flex-direction: column;\r\n        width: 86px;\r\n        gap: 8px;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
var postionInfo = `u5G4HtyPrPBlL1FrkJV7`;
var ppBox = `i7Sgo8S0JxicRszt4oHF`;
var ppBox_left = `HZm4qDIXrFusJRV8gKQV`;
var ppBox_right = `yoi4w5fS9obdQLTvqx1r`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5860:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AS: () => (/* binding */ item),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   LV: () => (/* binding */ wrap),
/* harmony export */   N7: () => (/* binding */ addListItem)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.BzkBHHs8XyR7ZzfjIU9t {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.IBWzmrTsFfUb9biZc4Wl {
    display: grid;
    grid-template-columns: 1fr 20px 1fr;
    align-items: center;
    background-image: radial-gradient(circle,rgb(73, 73, 83) 0%, rgba(58, 58, 58, 1) 100%);
    padding: 0 8px;
    border-radius: 3px;
    height: 32px;
}

.IBWzmrTsFfUb9biZc4Wl span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;        
    }

.RcRaRDiHBZiESOJDPNtj {
    display: grid;
    grid-template-columns: 1fr 20px 1fr;
    align-items: center;
    padding: 0 8px;
    width: 100%;
    height: 28px;
    background: var(--in-c);
    border-radius: 3px;
    transition: all ease .4s;
    margin-bottom: 2px;

}

.RcRaRDiHBZiESOJDPNtj:hover {
        background-color: rgb(110, 128, 152);
    }

.RcRaRDiHBZiESOJDPNtj span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;        
    }`, "",{"version":3,"sources":["webpack://./src/BlockEditor/Blocks/optionSections/TransitionSection.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,QAAQ;AACZ;;AAEA;IACI,aAAa;IACb,mCAAmC;IACnC,mBAAmB;IACnB,sFAAsF;IACtF,cAAc;IACd,kBAAkB;IAClB,YAAY;AAQhB;;AANI;QACI,aAAa;QACb,uBAAuB;QACvB,mBAAmB;QACnB,eAAe;IACnB;;AAGJ;IACI,aAAa;IACb,mCAAmC;IACnC,mBAAmB;IACnB,cAAc;IACd,WAAW;IACX,YAAY;IACZ,uBAAuB;IACvB,kBAAkB;IAClB,wBAAwB;IACxB,kBAAkB;;AAYtB;;AAXI;QACI,oCAAoC;IACxC;;AAEA;QACI,aAAa;QACb,uBAAuB;QACvB,mBAAmB;QACnB,eAAe;IACnB","sourcesContent":[".wrap {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 4px;\r\n}\r\n\r\n.item {\r\n    display: grid;\r\n    grid-template-columns: 1fr 20px 1fr;\r\n    align-items: center;\r\n    background-image: radial-gradient(circle,rgb(73, 73, 83) 0%, rgba(58, 58, 58, 1) 100%);\r\n    padding: 0 8px;\r\n    border-radius: 3px;\r\n    height: 32px;\r\n    \r\n    span {\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        font-size: 11px;        \r\n    }\r\n}\r\n\r\n.addListItem {\r\n    display: grid;\r\n    grid-template-columns: 1fr 20px 1fr;\r\n    align-items: center;\r\n    padding: 0 8px;\r\n    width: 100%;\r\n    height: 28px;\r\n    background: var(--in-c);\r\n    border-radius: 3px;\r\n    transition: all ease .4s;\r\n    margin-bottom: 2px;\r\n    &:hover {\r\n        background-color: rgb(110, 128, 152);\r\n    }\r\n\r\n    span {\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        font-size: 11px;        \r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
var wrap = `BzkBHHs8XyR7ZzfjIU9t`;
var item = `IBWzmrTsFfUb9biZc4Wl`;
var addListItem = `RcRaRDiHBZiESOJDPNtj`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3143:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   I7: () => (/* binding */ colorWrap),
/* harmony export */   Pf: () => (/* binding */ label),
/* harmony export */   yW: () => (/* binding */ color)
/* harmony export */ });
/* unused harmony exports cp_item, cp_color_preview, cp_color_preview_item, cp_color_label, cp_color_edit */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.BuZDZsxVU0pgaO62zOtE {
    display: flex;
    gap: 12px;
    border-bottom: 1px solid var(--mantine-color-dark-5);
    margin-bottom: 6px;
    padding: 4px 0;
    cursor: pointer;
}

.u6118vNhXEn4PerClyDB {
    display: flex;
    gap: 4px;
}

.eUspSc7V_ORtZf5BDzx5 {
    width: 16px;
    height: 16px;
    border-radius: 20px;
    margin-bottom: 4px;
    border: 1px solid #888;
}

.GCvAaPMuLZlyiZwLW8nu {
    display: flex;
    font-size: 10px;
    flex: 1;
    justify-content: space-between;
}


.BuZDZsxVU0pgaO62zOtE:hover .I1DLpeLbEBouTDAzVw1t {
        opacity: 1;
    }

.pLHiXggVc7nyX0br6syt {
    display: flex;
    align-items: center;
    padding: 0 4px;
    width: 100%;
    height: 28px;
    background: #404040;
    border-radius: 20px;
    gap: 12px;
    cursor: pointer;
}

.SbtyJKVKbQdYffIb65Dc {
    width: 20px;
    height: 20px;
    border-radius:  10px;
    border: 2px solid rgba(255, 255, 255, 0.5);
}

.IeUNfNisfV0D0IfF9izT {
    font-size: 10px;
    display: flex;
    justify-content: space-between;
}`, "",{"version":3,"sources":["webpack://./src/BlockEditor/OptionPanel/components/Controls/ColorPickerControl.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,SAAS;IACT,oDAAoD;IACpD,kBAAkB;IAClB,cAAc;IACd,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,QAAQ;AACZ;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;IAClB,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,eAAe;IACf,OAAO;IACP,8BAA8B;AAClC;;;AAII;QACI,UAAU;IACd;;AAGJ;IACI,aAAa;IACb,mBAAmB;IACnB,cAAc;IACd,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,mBAAmB;IACnB,SAAS;IACT,eAAe;AACnB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,0CAA0C;AAC9C;;AAEA;IACI,eAAe;IACf,aAAa;IACb,8BAA8B;AAClC","sourcesContent":[".cp_item {\r\n    display: flex;\r\n    gap: 12px;\r\n    border-bottom: 1px solid var(--mantine-color-dark-5);\r\n    margin-bottom: 6px;\r\n    padding: 4px 0;\r\n    cursor: pointer;\r\n}\r\n\r\n.cp_color_preview {\r\n    display: flex;\r\n    gap: 4px;\r\n}\r\n\r\n.cp_color_preview_item {\r\n    width: 16px;\r\n    height: 16px;\r\n    border-radius: 20px;\r\n    margin-bottom: 4px;\r\n    border: 1px solid #888;\r\n}\r\n\r\n.cp_color_label {\r\n    display: flex;\r\n    font-size: 10px;\r\n    flex: 1;\r\n    justify-content: space-between;\r\n}\r\n\r\n\r\n.cp_item {\r\n    &:hover .cp_color_edit {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n.colorWrap {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 0 4px;\r\n    width: 100%;\r\n    height: 28px;\r\n    background: #404040;\r\n    border-radius: 20px;\r\n    gap: 12px;\r\n    cursor: pointer;\r\n}\r\n\r\n.color {\r\n    width: 20px;\r\n    height: 20px;\r\n    border-radius:  10px;\r\n    border: 2px solid rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.label {\r\n    font-size: 10px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n}"],"sourceRoot":""}]);
// Exports
var cp_item = (/* unused pure expression or super */ null && (`BuZDZsxVU0pgaO62zOtE`));
var cp_color_preview = (/* unused pure expression or super */ null && (`u6118vNhXEn4PerClyDB`));
var cp_color_preview_item = (/* unused pure expression or super */ null && (`eUspSc7V_ORtZf5BDzx5`));
var cp_color_label = (/* unused pure expression or super */ null && (`GCvAaPMuLZlyiZwLW8nu`));
var cp_color_edit = (/* unused pure expression or super */ null && (`I1DLpeLbEBouTDAzVw1t`));
var colorWrap = `pLHiXggVc7nyX0br6syt`;
var color = `SbtyJKVKbQdYffIb65Dc`;
var label = `IeUNfNisfV0D0IfF9izT`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4852:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   L: () => (/* binding */ dragNumberInput_unitTrigger),
/* harmony export */   SD: () => (/* binding */ dragNumberInput_ball),
/* harmony export */   V7: () => (/* binding */ dragNumberInput_wrap),
/* harmony export */   af: () => (/* binding */ dragNumberInput_icon),
/* harmony export */   eT: () => (/* binding */ dragNumberInput),
/* harmony export */   h9: () => (/* binding */ dragNumberInput_icon_wrap),
/* harmony export */   yr: () => (/* binding */ dragNumberInput_unitItem),
/* harmony export */   zA: () => (/* binding */ dragNumberInput_unitOverlay)
/* harmony export */ });
/* unused harmony export dragNumberInput_units */
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.B6sw0aEoXypbdWpAHYsY {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 28px;
    min-width: 86px;
    max-width: 100%;
    font-size: 11px;
    background: var(--in-c);
    border-radius: 6px;
}

    .v057elibi7p_Y1hONwmb {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: all ease .4s;
    }

    .v057elibi7p_Y1hONwmb svg {
            width: 28px;
        }

    .v057elibi7p_Y1hONwmb[data-dragging="true"] {
            opacity: 0;
            transform: scale(0);
        }

    .JJnMbnM1uset2Y7k33co {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            /* aspect-ratio: 1 / 1; */
            width: 76px;
            height: 22px;
        }

    .g2YPfI8BGFL3C3Itqewe {
        opacity: 0;
        transition: all ease .4s;
        width: 100%;
        height: 100%;
        background: #111111;
        border-radius: 20px;
        position: absolute;
        pointer-events: none;

    }

    .g2YPfI8BGFL3C3Itqewe[data-dragging="true"] {
            opacity: 1;
            transform: scale(0.4);
            background: #bababa;
        }

    .g2YPfI8BGFL3C3Itqewe[data-dragging-direction="right"] {
            transform: scale(0.4) translateX(10px);
        }

    .g2YPfI8BGFL3C3Itqewe[data-dragging-direction="left"] {
            transform: scale(0.4) translateX(-10px);
        }

    .prYCwXVIqsVcR3G6oMg5 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: relative;
    }

    .prYCwXVIqsVcR3G6oMg5 input {
            font-size: 11px;
            min-height: 12px;
            max-height: 20px;
            line-height: 1;
            padding: 0;
        }

    /* Chrome, Edge, Safari, Opera */

    .prYCwXVIqsVcR3G6oMg5 input[type="number"]::-webkit-inner-spin-button,
        .prYCwXVIqsVcR3G6oMg5 input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

    /* Firefox */

    .prYCwXVIqsVcR3G6oMg5 input[type="number"] {
            -moz-appearance: textfield;
        }

    .prYCwXVIqsVcR3G6oMg5 [data-position="right"] {
            display: none;
        }

.JJnMbnM1uset2Y7k33co {
    cursor: ew-resize;
    user-select: none;
    transition: background 0.2s, transform 0.15s;
}

.prYCwXVIqsVcR3G6oMg5:hover .bab9wraJ3jWbewiQg07h {
    opacity: 1;
}

.bab9wraJ3jWbewiQg07h {
    opacity: 0;
    display: inline-flex;
    align-items: center;
    transition: all ease .4s;
}

.bab9wraJ3jWbewiQg07h[data-active="true"] {
        opacity: 1;
    }

.aiZtOTtud6VRMlzLmroQ {
    right: 4px;
    position: absolute;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    background: none;
    border: none;
    cursor: pointer;
    background: var(--in-c);
    padding: 0;
    border-radius: 3px;
}

.uLLKnzIvW_5k3nNscljL {
    background: var(--bg);
    border-radius: 6px;
    padding: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.FklUe8C6K8q6CRjpWcB3 {
    display: block;
    width: 100%;
    padding: 4px 8px;
    font-size: 11px;
    text-align: left;
    border-radius: 4px;
    background: none;
    border: none;
    cursor: pointer;
}
`, "",{"version":3,"sources":["webpack://./src/BlockEditor/OptionPanel/components/Controls/DragNumberInput.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,mBAAmB;IACnB,QAAQ;IACR,YAAY;IACZ,eAAe;IACf,eAAe;IACf,eAAe;IACf,uBAAuB;IACvB,kBAAkB;AAqFtB;;IAnFI;QACI,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,UAAU;QACV,wBAAwB;IAoB5B;;IAlBI;YACI,WAAW;QACf;;IAEA;YACI,UAAU;YACV,mBAAmB;QACvB;;IAEA;YACI,kBAAkB;YAClB,aAAa;YACb,mBAAmB;YACnB,uBAAuB;YACvB,yBAAyB;YACzB,WAAW;YACX,YAAY;QAChB;;IAGJ;QACI,UAAU;QACV,wBAAwB;QACxB,WAAW;QACX,YAAY;QACZ,mBAAmB;QACnB,mBAAmB;QACnB,kBAAkB;QAClB,oBAAoB;;IAgBxB;;IAdI;YACI,UAAU;YACV,qBAAqB;YACrB,mBAAmB;QACvB;;IAEA;YACI,sCAAsC;QAC1C;;IAEA;YACI,uCAAuC;QAC3C;;IAIJ;QACI,aAAa;QACb,mBAAmB;QACnB,yBAAyB;QACzB,kBAAkB;IAyBtB;;IAvBI;YACI,eAAe;YACf,gBAAgB;YAChB,gBAAgB;YAChB,cAAc;YACd,UAAU;QACd;;IAEA,gCAAgC;;IAChC;;YAEI,wBAAwB;YACxB,SAAS;QACb;;IAEA,YAAY;;IACZ;YACI,0BAA0B;QAC9B;;IAEA;YACI,aAAa;QACjB;;AAIR;IACI,iBAAiB;IACjB,iBAAiB;IACjB,4CAA4C;AAChD;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,UAAU;IACV,oBAAoB;IACpB,mBAAmB;IACnB,wBAAwB;AAK5B;;AAHI;QACI,UAAU;IACd;;AAGJ;IACI,UAAU;IACV,kBAAkB;IAClB,oBAAoB;IACpB,mBAAmB;IACnB,QAAQ;IACR,eAAe;IACf,gBAAgB;IAChB,YAAY;IACZ,eAAe;IACf,uBAAuB;IACvB,UAAU;IACV,kBAAkB;AACtB;;AAEA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,YAAY;IACZ,0CAA0C;IAC1C,WAAW;AACf;;AAEA;IACI,cAAc;IACd,WAAW;IACX,gBAAgB;IAChB,eAAe;IACf,gBAAgB;IAChB,kBAAkB;IAClB,gBAAgB;IAChB,YAAY;IACZ,eAAe;AACnB","sourcesContent":[".dragNumberInput {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2px;\r\n    height: 28px;\r\n    min-width: 86px;\r\n    max-width: 100%;\r\n    font-size: 11px;\r\n    background: var(--in-c);\r\n    border-radius: 6px;\r\n\r\n    &_icon {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        opacity: 1;\r\n        transition: all ease .4s;\r\n\r\n        svg {\r\n            width: 28px;\r\n        }\r\n\r\n        &[data-dragging=\"true\"] {\r\n            opacity: 0;\r\n            transform: scale(0);\r\n        }\r\n\r\n        &_wrap {\r\n            position: relative;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n            /* aspect-ratio: 1 / 1; */\r\n            width: 76px;\r\n            height: 22px;\r\n        }\r\n    }\r\n\r\n    &_ball {\r\n        opacity: 0;\r\n        transition: all ease .4s;\r\n        width: 100%;\r\n        height: 100%;\r\n        background: #111111;\r\n        border-radius: 20px;\r\n        position: absolute;\r\n        pointer-events: none;\r\n\r\n        &[data-dragging=\"true\"] {\r\n            opacity: 1;\r\n            transform: scale(0.4);\r\n            background: #bababa;\r\n        }\r\n\r\n        &[data-dragging-direction=\"right\"] {\r\n            transform: scale(0.4) translateX(10px);\r\n        }\r\n\r\n        &[data-dragging-direction=\"left\"] {\r\n            transform: scale(0.4) translateX(-10px);\r\n        }\r\n\r\n    }\r\n\r\n    &_wrap {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: flex-end;\r\n        position: relative;\r\n\r\n        input {\r\n            font-size: 11px;\r\n            min-height: 12px;\r\n            max-height: 20px;\r\n            line-height: 1;\r\n            padding: 0;\r\n        }\r\n\r\n        /* Chrome, Edge, Safari, Opera */\r\n        input[type=\"number\"]::-webkit-inner-spin-button,\r\n        input[type=\"number\"]::-webkit-outer-spin-button {\r\n            -webkit-appearance: none;\r\n            margin: 0;\r\n        }\r\n\r\n        /* Firefox */\r\n        input[type=\"number\"] {\r\n            -moz-appearance: textfield;\r\n        }\r\n\r\n        [data-position=\"right\"] {\r\n            display: none;\r\n        }\r\n    }\r\n}\r\n\r\n.dragNumberInput_icon_wrap {\r\n    cursor: ew-resize;\r\n    user-select: none;\r\n    transition: background 0.2s, transform 0.15s;\r\n}\r\n\r\n.dragNumberInput_wrap:hover .dragNumberInput_units {\r\n    opacity: 1;\r\n}\r\n\r\n.dragNumberInput_units {\r\n    opacity: 0;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    transition: all ease .4s;\r\n    \r\n    &[data-active=\"true\"] {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n.dragNumberInput_unitTrigger {\r\n    right: 4px;\r\n    position: absolute;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    font-size: 11px;\r\n    background: none;\r\n    border: none;\r\n    cursor: pointer;\r\n    background: var(--in-c);\r\n    padding: 0;\r\n    border-radius: 3px;\r\n}\r\n\r\n.dragNumberInput_unitOverlay {\r\n    background: var(--bg);\r\n    border-radius: 6px;\r\n    padding: 4px;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\r\n    z-index: 10;\r\n}\r\n\r\n.dragNumberInput_unitItem {\r\n    display: block;\r\n    width: 100%;\r\n    padding: 4px 8px;\r\n    font-size: 11px;\r\n    text-align: left;\r\n    border-radius: 4px;\r\n    background: none;\r\n    border: none;\r\n    cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
var dragNumberInput = `B6sw0aEoXypbdWpAHYsY`;
var dragNumberInput_icon = `v057elibi7p_Y1hONwmb`;
var dragNumberInput_icon_wrap = `JJnMbnM1uset2Y7k33co`;
var dragNumberInput_ball = `g2YPfI8BGFL3C3Itqewe`;
var dragNumberInput_wrap = `prYCwXVIqsVcR3G6oMg5`;
var dragNumberInput_units = (/* unused pure expression or super */ null && (`bab9wraJ3jWbewiQg07h`));
var dragNumberInput_unitTrigger = `aiZtOTtud6VRMlzLmroQ`;
var dragNumberInput_unitOverlay = `uLLKnzIvW_5k3nNscljL`;
var dragNumberInput_unitItem = `FklUe8C6K8q6CRjpWcB3`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5875:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A4: () => (/* binding */ control),
/* harmony export */   Ay: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   DY: () => (/* binding */ control_wrap),
/* harmony export */   d3: () => (/* binding */ control_icon_wrap),
/* harmony export */   gW: () => (/* binding */ control_icon)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.sO0Jd5Fg5mvviwQ7_Bdp {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 11px;
    background: var(--in-c);
    border-radius: 6px;
    padding: 0 3px;

}

    .BUCMtwBl5q8kDBUnTnEt {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: all ease .4s;
    }

    .jgvHlsQGdbcvConPnkKX {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            aspect-ratio: 1 / 1;
            /* height: 28px; */
        }

    .FHpHBG6NRYZQsOPMA52h {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .FHpHBG6NRYZQsOPMA52h input {
            font-size: 11px;
            min-height: 12px;
            max-height: 28px;
            line-height: 1;
            padding: 0;
        }

    /* Chrome, Edge, Safari, Opera */

    .FHpHBG6NRYZQsOPMA52h input[type="number"]::-webkit-inner-spin-button,
        .FHpHBG6NRYZQsOPMA52h input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

    /* Firefox */

    .FHpHBG6NRYZQsOPMA52h input[type="number"] {
            -moz-appearance: textfield;
        }

    .FHpHBG6NRYZQsOPMA52h [data-position="right"] {
            display: none;
        }

.jgvHlsQGdbcvConPnkKX {
    cursor: ew-resize;
    user-select: none;
    transition: background 0.2s, transform 0.15s;
}`, "",{"version":3,"sources":["webpack://./src/BlockEditor/OptionPanel/components/Controls/SelectWithIconControl.module.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,mBAAmB;IACnB,QAAQ;IACR,eAAe;IACf,uBAAuB;IACvB,kBAAkB;IAClB,cAAc;;AAiDlB;;IA/CI;QACI,aAAa;QACb,mBAAmB;QACnB,uBAAuB;QACvB,UAAU;QACV,wBAAwB;IAU5B;;IARI;YACI,kBAAkB;YAClB,aAAa;YACb,mBAAmB;YACnB,uBAAuB;YACvB,mBAAmB;YACnB,kBAAkB;QACtB;;IAGJ;QACI,aAAa;QACb,mBAAmB;QACnB,yBAAyB;IAyB7B;;IAvBI;YACI,eAAe;YACf,gBAAgB;YAChB,gBAAgB;YAChB,cAAc;YACd,UAAU;QACd;;IAEA,gCAAgC;;IAChC;;YAEI,wBAAwB;YACxB,SAAS;QACb;;IAEA,YAAY;;IACZ;YACI,0BAA0B;QAC9B;;IAEA;YACI,aAAa;QACjB;;AAKR;IACI,iBAAiB;IACjB,iBAAiB;IACjB,4CAA4C;AAChD","sourcesContent":[".control {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 2px;\r\n    font-size: 11px;\r\n    background: var(--in-c);\r\n    border-radius: 6px;\r\n    padding: 0 3px;\r\n\r\n    &_icon {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: center;\r\n        opacity: 1;\r\n        transition: all ease .4s;\r\n\r\n        &_wrap {\r\n            position: relative;\r\n            display: flex;\r\n            align-items: center;\r\n            justify-content: center;\r\n            aspect-ratio: 1 / 1;\r\n            /* height: 28px; */\r\n        }\r\n    }\r\n\r\n    &_wrap {\r\n        display: flex;\r\n        align-items: center;\r\n        justify-content: flex-end;\r\n\r\n        input {\r\n            font-size: 11px;\r\n            min-height: 12px;\r\n            max-height: 28px;\r\n            line-height: 1;\r\n            padding: 0;\r\n        }\r\n\r\n        /* Chrome, Edge, Safari, Opera */\r\n        input[type=\"number\"]::-webkit-inner-spin-button,\r\n        input[type=\"number\"]::-webkit-outer-spin-button {\r\n            -webkit-appearance: none;\r\n            margin: 0;\r\n        }\r\n\r\n        /* Firefox */\r\n        input[type=\"number\"] {\r\n            -moz-appearance: textfield;\r\n        }\r\n\r\n        [data-position=\"right\"] {\r\n            display: none;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n.control_icon_wrap {\r\n    cursor: ew-resize;\r\n    user-select: none;\r\n    transition: background 0.2s, transform 0.15s;\r\n}"],"sourceRoot":""}]);
// Exports
var control = `sO0Jd5Fg5mvviwQ7_Bdp`;
var control_icon = `BUCMtwBl5q8kDBUnTnEt`;
var control_icon_wrap = `jgvHlsQGdbcvConPnkKX`;
var control_wrap = `FHpHBG6NRYZQsOPMA52h`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 164:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}
/* html.lenis-scrolling body { pointer-events: none !important; cursor: none; } */`, "",{"version":3,"sources":["webpack://./src/RenderEngine/page/lenis.css"],"names":[],"mappings":"AAAA,2BAA2B,WAAW,CAAC,4CAA4C,aAAa,CAAC,yCAAyC,2BAA2B,CAAC,2BAA2B,mBAAmB,CAAC,wBAAwB,4BAA4B,CAAC,uBAAuB,CAAC,kCAAkC;AACpU,iFAAiF","sourcesContent":["html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis.lenis-smooth [data-lenis-prevent]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}\r\n/* html.lenis-scrolling body { pointer-events: none !important; cursor: none; } */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ })

}]);