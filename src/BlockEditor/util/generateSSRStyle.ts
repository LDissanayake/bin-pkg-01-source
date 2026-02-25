import { generateCSSVariables } from "../../RenderEngine/styleUtil";
import generateGoogleFontsLink from "../../RenderEngine/utils/googleFontUtils";

const generateSSRStyle = (styleData, returnTag = true, subsets = ['latin'], display = 'swap') => {

  if (!styleData) return returnTag ? { cssHTML: "", fontHTML: "" } : {};

  // ---------------------------------------
  // 1. Extract CSS variables (light/dark)
  // ---------------------------------------
  const { lightMode, darkMode, common } = styleData
    ? generateCSSVariables(styleData)
    : { lightMode: '', darkMode: '', common: '' };

  // ---------------------------------------
  // 2. Build style HTML
  // ---------------------------------------
  const css = `
:root {
  ${common}
}
:root[data-color-mode="d"] {
  ${darkMode}
}

:root[data-color-mode="l"] {
  ${lightMode}
}

body {
  background: var(--addifect-color-background);
  color: var(--addifect-color-text);
  font-family: var(--addifect-font-body);
  margin: 0;
  padding: 0;
  position: relative;
}
`;

  const cssHTML = `<style>${css}</style>`;

  // ---------------------------------------
  // 3. Build font list from styleData
  // ---------------------------------------
  const fonts = Array.isArray(styleData.fontCatelog)
    ? styleData.fontCatelog
    : [];

  // ---------------------------------------
  // 4. Generate Google Fonts link
  // ---------------------------------------
  const fontUrl = generateGoogleFontsLink(fonts, subsets, display);
  const fontHTML = `<link rel="stylesheet" href="${fontUrl}" />`;

  return returnTag ? { cssHTML, fontHTML, css, fontURL: fontUrl } : { css, fontURL: fontUrl };
};


export default generateSSRStyle