type SelectCSSProperty = {
  p: string;
  l: string;
  vt: 'select' | 'segment';
  op: Record<string, string>; // Required when vt = 'select'
  f?: string,
  m?: string
};

type ArrayCSSProperty = {
  p: string | string[];
  l: string;
  vt: 'color' | '[]' | '[][]' | 'gt' | '' | 'ff' | 'img';
  f?: string;
  m?: string;
};

type CSSProperty = SelectCSSProperty | ArrayCSSProperty;

const cssMap: Record<string, CSSProperty> = {
  // position ---------------
  pt: {
    l: 'Position',
    p: 'position',
    vt: 'select',
    op: {
      ab: 'absolute',
      re: 'relative',
      fi: 'fixed',
      st: 'sticky',
    }
  },
  zi: {
    l: 'Z Index',
    p: 'z-index',
    vt: '',
  },
  of: {
    l: 'Offset',
    p: 'inset',
    vt: '[][]',
  },
  // sizes---------------
  w: {
    l: 'Width',
    p: 'width',
    vt: '[]'
  },
  h: {
    l: 'Height',
    p: 'height',
    vt: '[]'
  },
  minw: {
    l: 'Min Width',
    p: 'minWidth',
    vt: '[]'
  },
  minh: {
    l: 'Min Height',
    p: 'minHeight',
    vt: '[]'
  },
  mxw: {
    l: 'Max Width',
    p: 'maxWidth',
    vt: '[]'
  },
  mxh: {
    l: 'Max Height',
    p: 'maxHeight',
    vt: '[]'
  },
  // spacing--------------
  m: {
    l: 'Margin',
    p: 'margin',
    vt: '[][]'
  },
  p: {
    l: 'Padding',
    p: 'padding',
    vt: '[][]'
  },
  // border-------------
  bw: {
    l: 'Border Width',
    p: 'borderWidth',
    vt: '[]'
  },
  bs: {
    l: 'Border Style',
    p: 'borderStyle',
    vt: 'select',
    op: {
      so: 'solid',
      do: 'dotted',
      da: 'dashed',
      dou: 'double',
      no: 'none',
    }
  },
  bc: {
    l: 'Border Color',
    p: 'borderColor',
    vt: 'color',
  },
  br: {
    l: 'Border Radius',
    p: 'borderRadius',
    vt: '[][]'
  },
  // typography ----------
  fof: {
    l: 'Font Family',
    p: 'fontFamily',
    vt: 'ff'
  },
  foc: {
    l: 'Color',
    p: 'color',
    vt: 'color'
  },
  fos: {
    l: 'Font Size',
    p: 'fontSize',
    vt: '[]'
  },
  fow: {
    l: 'Font Weight',
    p: 'fontWeight',
    vt: '',
  },
  lh: {
    l: 'Line Height',
    p: 'lineHeight',
    vt: '[]'
  },
  ls: {
    l: 'Letter Spacing',
    p: 'letterSpacing',
    vt: '[]'
  },
  ws: {
    l: 'Word Spacing',
    p: 'wordSpacing',
    vt: '[]'
  },
  ta: {
    l: 'Text Align',
    p: 'textAlign',
    vt: 'segment',
    op: {
      s: 'start',
      c: 'center',
      e: 'end',
      j: 'justified'
    }
  },
  tt: {
    l: 'Text Transform',
    p: 'textTransform',
    vt: 'segment',
    op: {
      n: 'none',
      u: 'uppercase',
      l: 'lowercase',
      c: 'capitalize'
    }
  },
  // layout --------------
  dt: {
    l: 'Display',
    p: 'display',
    vt: 'select',
    op: {
      fl: 'flex',
      gr: 'grid',
      bl: 'block'
    }
  },
  dti: {
    l: 'Inline',
    p: 'inline',
    vt: 'segment',
    op: {
      '1': 'inline-',
      '0': '',
    }
  },
  va: {
    l: 'Vertical Align',
    p: 'verticalAlign',
    vt: 'select',
    op: {
      bas: 'baseline',
      top: 'top',
      mid: 'middle',
      bot: 'bottom',
      't-t': 'text-top',
      't-b': 'text-bottom',
      sub: 'sub',
      sup: 'super',
    }
  },
  fd: {
    l: 'Flex Direction',
    p: 'flexDirection',
    vt: 'segment',
    op: {
      ro: 'row',
      co: 'column',
      ror: 'row-reverse',
      cor: 'column-reverse',
    }
  },
  jc: {
    l: 'Justify Content',
    p: 'justifyContent',
    vt: 'select',
    op: {
      fs: 'flex-start',
      fe: 'flex-end',
      c: 'center',
      sb: 'space-between',
      sa: 'space-around',
      se: 'space-evenly',
    }
  },
  ai: {
    l: 'Align Items',
    p: 'alignItems',
    vt: 'select',
    op: {
      st: 'stretch',
      fs: 'flex-start',
      fe: 'flex-end',
      c: 'center',
      b: 'baseline',
    }
  },
  ji: {
    l: 'Justify Items',
    p: 'justifyItems',
    vt: 'select',
    op: {
      st: 'stretch',
      fs: 'flex-start',
      fe: 'flex-end',
      c: 'center',
    }
  },
  ac: {
    l: 'Align Content',
    p: 'alignContent',
    vt: 'select',
    op: {
      st: 'stretch',
      fs: 'flex-start',
      fe: 'flex-end',
      c: 'center',
      sb: 'space-between',
      sa: 'space-around',
    }
  },
  fw: {
    l: 'Flex Wrap',
    p: 'flexWrap',
    vt: 'segment',
    op: {
      w: 'wrap',
      nw: 'nowrap',
    }
  },
  gp: {
    l: 'Gap',
    p: 'gap',
    vt: '[]'
  },
  rgp: {
    l: 'Row Gap',
    p: 'rowGap',
    vt: '[]'
  },
  cgp: {
    l: 'Column Gap',
    p: 'columnGap',
    vt: '[]'
  },
  gt: {
    l: 'Grid Template',
    p: 'gridTemplate',
    vt: 'gt',
  },
  // grid/flex items
  gz: {
    l: 'Grid Zone',
    p: ['gridRow', 'gridColumn', 'justifySelf', 'alignSelf'],
    vt: '',
  },
  as: {
    l: 'Align Self',
    p: 'alignSelf',
    vt: 'select',
    op: {
      st: 'stretch',
      fs: 'flex-start',
      fe: 'flex-end',
      c: 'center',
      sb: 'space-between',
      sa: 'space-around',
    }
  },
  js: {
    l: 'Justify Self',
    p: 'justifySelf',
    vt: 'select',
    op: {
      st: 'stretch',
      fs: 'flex-start',
      fe: 'flex-end',
      c: 'center',
      sb: 'space-between',
      sa: 'space-around',
    }
  },
  // transform
  x: {
    l: 'Translate X',
    p: 'translateX',
    m: 'x',
    f: 'transform',
    vt: 'length',
  },
  y: {
    l: 'Translate Y',
    p: 'translateY',
    m: 'y',
    f: 'transform',
    vt: 'length',
  },
  z: {
    l: 'Translate Z',
    p: 'translateZ',
    m: 'z',
    f: 'transform',
    vt: '[]',
  },
  sc: {
    l: 'Scale',
    p: 'scale',
    m: 'scale',
    f: 'transform',
    vt: '',
  },
  scX: {
    l: 'Scale X',
    p: 'scaleX',
    m: 'scaleX',
    f: 'transform',
    vt: 'number',
  },
  scY: {
    l: 'Scale Y',
    p: 'scaleY',
    m: 'scaleY',
    f: 'transform',
    vt: '',
  },
  skX: {
    l: 'Skew X',
    p: 'skewX',
    m: 'skewX',
    f: 'transform',
    vt: '[]',
  },
  skY: {
    l: 'Skew Y',
    p: 'skewY',
    m: 'skewY',
    f: 'transform',
    vt: '[]',
  },
  ro: {
    l: 'Rotate',
    p: 'rotate',
    m: 'rotate',
    f: 'transform',
    vt: '[]',
  },
  rox: {
    l: 'Rotate X',
    p: 'rotateX',
    m: 'rotateX',
    f: 'transform',
    vt: '[]',
  },
  roy: {
    l: 'Rotate Y',
    p: 'rotateY',
    m: 'rotateY',
    f: 'transform',
    vt: '[]',
  },
  tro: {
    l: 'transform Origin',
    p: 'transformOrigin',
    vt: '',
  },
  // transform space
  trs: {
    l: 'transform Style',
    p: 'transform-style',
    vt: '',
  },
  trpers: {
    l: 'Perspective',
    p: 'perspective',
    vt: '[]',
  },
  // backdrop filter
  bf_blur: {
    l: 'Blur',
    p: 'blur',
    m: 'bf_blur',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_brightness: {
    l: 'Brightness',
    p: 'brightness',
    m: 'bf_brightness',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_contrast: {
    l: 'Contrast',
    p: 'contrast',
    m: 'bf_contrast',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_grayscale: {
    l: 'Grayscale',
    p: 'grayscale',
    m: 'bf_grayscale',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_hueRotate: {
    l: 'Hue Rotate',
    p: 'hue-rotate',
    m: 'bf_hueRotate',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_invert: {
    l: 'Invert',
    p: 'invert',
    m: 'bf_invert',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_opacity: {
    l: 'Opacity',
    p: 'opacity',
    m: 'bf_opacity',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_saturate: {
    l: 'Saturate',
    p: 'saturate',
    m: 'bf_saturate',
    f: 'backdropFilter',
    vt: '[]'
  },
  bf_sepia: {
    l: 'Sepia',
    p: 'sepia',
    m: 'bf_sepia',
    f: 'backdropFilter',
    vt: '[]'
  },
  // visibility
  ovf: {
    l: 'Overflow',
    p: 'overflow',
    vt: 'select',
    op: {
      vi: "visible",
      hi: "hidden",
      sc: "scroll",
      au: "auto",
      cl: "clip"
    }
  },
  opa: {
    l: 'Opacity',
    p: 'opacity',
    vt: ''
  },
  pe: {
    l: 'Pointer Events',
    p: 'pointerEvents',
    vt: ''
  },
  // background
  bgc: {
    l: 'Color',
    p: 'backgroundColor',
    vt: 'color',
  },
  bgimg: {
    l: 'Image',
    p: 'backgroundImage',
    vt: 'img'
  },
  bgimgsz: {
    l: 'Size',
    p: 'backgroundSize',
    vt: 'select',
    op: {
      cov: "cover",
      con: "contain",
      au: "auto",
    }
  },
  bgpos: {
    l: 'Sizw',
    p: 'backgroundPosition',
    vt: 'select',
    op: {
      tl: 'left top',
      tc: 'center top',
      tr: 'right top',
      cl: 'left center',
      cc: 'center center',
      cr: 'right center',
      bl: 'left bottom',
      bc: 'center bottom',
      br: 'right bottom'
    }
  },
  bgrepeat: {
    l: 'Repeat',
    p: 'backgroundRepeat',
    vt: 'select',
    op: {
      rep: 'repeat',
      repx: 'repeat-x',
      repy: 'repeat-y',
      norep: 'no-repeat'
    }
  },
  bgattach: {
    l: 'Attachment',
    p: 'backgroundAttachment',
    vt: 'select',
    op: {
      scroll: 'scroll',
      fixed: 'fixed',
      local: 'local'
    }
  },
};


export default cssMap;