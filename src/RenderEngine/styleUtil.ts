const fallbackFonts = {
    'serif': 'serif',
    'sans-serif': 'sans-serif',
    'monospace': 'monospace',
    'handwriting': 'cursive',
};

export function generateCSSVariables(styleData) {
    const { colorPalette, colorOptions, fontCatelog, fontOptions } = styleData;

    let cssVariables = '';
    let darkModeVariables = '';
    let common = '';

    // Generate color variables
    colorPalette.forEach((palette, index) => {
        cssVariables += `--addifect-color-${palette.id}: var(--addifect-color-${palette.id}-${palette.l});\n`;
        darkModeVariables += `--addifect-color-${palette.id}: var(--addifect-color-${palette.id}-${palette.d});\n`;
        cssVariables += `--addifect-color-${palette.id}-dark: var(--addifect-color-${palette.id}-${palette.d});\n`;
    });

    // Generate font variables
    fontCatelog.forEach((font, index) => {
        // Determine the fallback font based on the category
        const fallback = fallbackFonts[font.category] || 'sans-serif';
        // Create CSS variable for the font with its fallback
        cssVariables += `--addifect-f-${font.id}: "${font.family}", ${fallback};\n`;
        darkModeVariables += `--addifect-f-${font.id}: "${font.family}", ${fallback};\n`;
    });

    // Set font options
    cssVariables += `--addifect-font-body: var(--addifect-f-${fontOptions.body});\n`;
    cssVariables += `--addifect-font-heading: var(--addifect-f-${fontOptions.heading});\n`;
    darkModeVariables += `--addifect-font-body: var(--addifect-f-${fontOptions.body});\n`;
    darkModeVariables += `--addifect-font-heading: var(--addifect-f-${fontOptions.heading});\n`;


    colorPalette.forEach((item, index) => {
        item?.palette?.map((c, i) => {
            common += `--addifect-color-${item.id}-${i}: ${c};\n`;
        })
    });

    return {
        lightMode: cssVariables,
        darkMode: darkModeVariables,
        common
    };
}
