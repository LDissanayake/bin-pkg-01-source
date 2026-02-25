import React, { useEffect } from "react";

function GlobalStyle() {
  function injectStyle(css: string): () => void {
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
      Scope: .addifect-root
      ========================================================= */

    /* ---------- Box sizing (non-negotiable) ---------- */
    .addifect-root,
    .addifect-root *,
    .addifect-root *::before,
    .addifect-root *::after {
      box-sizing: border-box;
    }

    /* ---------- Typography inheritance ---------- */
    .addifect-root {
      // font-family: var(--addifect-font-body, system-ui);
      font-size: var(--addifect-text-base, 16px);
      line-height: 1.5;
      // color: var(--addifect-color-text, currentColor);
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    .addifect-root button,
    .addifect-root input,
    .addifect-root textarea,
    .addifect-root select {
      font: inherit;
      color: inherit;
    }

    /* ---------- Margin normalization (system-only) ---------- */
    .addifect-root :where(
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
    .addifect-root ul,
    .addifect-root ol {
      padding: 0;
      list-style: none;
    }

    /* ---------- Media behavior ---------- */
    .addifect-root img,
    .addifect-root video,
    .addifect-root canvas,
    .addifect-root svg {
      display: block;
      max-width: 100%;
      height: auto;
    }

    /* ---------- Anchor behavior ---------- */
    .addifect-root a {
      color: inherit;
      text-decoration: none;
    }

    .addifect-root a:focus-visible,
    .addifect-root button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    /* ---------- Tables ---------- */
    .addifect-root table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* THE MASTER GOD CLASS */
    .addifect-base-node {
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
    .addifect-grad-linear { background-image: linear-gradient(var(--ga), var(--g1), var(--g2), var(--g3)); }
    .addifect-grad-radial { background-image: radial-gradient(circle at var(--gx) var(--gy), var(--g1), var(--g2), var(--g3)); }

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
    .addifect-base-node-active {
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

  useEffect(() => {
    return injectStyle(GodRegistry);
  }, []);


  return null;
}

export default GlobalStyle