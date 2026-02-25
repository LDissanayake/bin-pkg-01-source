import React, { useEffect, useState } from 'react';
import { getAllStylesCSR, subscribe } from './styleStore';

export const StyleHost = ({ renderType }: { renderType: 'CSR' | 'SSR' | 'EPR' }) => {
  if (renderType === 'SSR') {
    return null;
  }

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return subscribe(() => {
      forceUpdate(v => v + 1);
    });
  }, []);

  useEffect(() => {
    const css = getAllStylesCSR();

    let styleTag = document.head.querySelector<HTMLStyleElement>(
      'style#addifect-style-root-inline-css'
    );

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'addifect-style-root-inline-css';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;
  });

  return null;
};
