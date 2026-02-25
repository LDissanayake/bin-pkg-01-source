import React from 'react';

export default function GridBackground() {
  const cellWidth = 12;
  const cellHeight = 26;
  const gap = 2;
  const halfGap = gap / 2;

  const patternWidth = cellWidth + gap;   // total tile width
  const patternHeight = cellHeight + gap; // total tile height

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${patternWidth}" height="${patternHeight}">
      <rect
        x="${halfGap}"
        y="${halfGap}"
        width="${cellWidth}"
        height="${cellHeight}"
        rx="3"
        ry="3"
        fill="#111"
      />
    </svg>
  `;

  const dataUrl = `url("data:image/svg+xml;base64,${btoa(svg)}")`;

  return (
    <div
      style={{
        backgroundImage: dataUrl,
        backgroundRepeat: "repeat",
        backgroundSize: `${patternWidth}px ${patternHeight}px`,
        backgroundPositionY: -1,
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: '-1'
      }}
    />
  );
}


export function getGridBackgroundStyle({
  cellWidth = 12,
  cellHeight = 26,
  gap = 2,
  color = "#111",
} = {}) {
  const halfGap = gap / 2;

  const patternWidth = cellWidth + gap;   // total tile width
  const patternHeight = cellHeight + gap; // total tile height

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${patternWidth}" height="${patternHeight}">
      <rect
        x="${halfGap}"
        y="${halfGap}"
        width="${cellWidth}"
        height="${cellHeight}"
        rx="3"
        ry="3"
        fill="${color}"
      />
    </svg>
  `;

  const dataUrl = `url("data:image/svg+xml;base64,${btoa(svg)}")`;

  return {
    backgroundImage: dataUrl,
    backgroundRepeat: "repeat",
    backgroundSize: `${patternWidth}px ${patternHeight}px`,
    backgroundPositionY: -1,
  };
}
