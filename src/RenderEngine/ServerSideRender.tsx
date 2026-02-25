import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Surface from './Surface';
import cloneDeep from 'lodash-es/cloneDeep';

interface ServerSideRenderProps {
  pageStructure: {
    frameId: string,
    blocks: { [key: string]: any }
  };
  colorMode: 'l' | 'd';
  type: string;
}

const ServerSideRender = async ({ pageStructure, type, colorMode }: ServerSideRenderProps) => {
  try {
    // Render your app to string (with inline <style> tags inside)
    const appHtmlWithStyles = ReactDOMServer.renderToString(
      <Surface renderType='SSR' renderData={{ pageStructure, type, colorMode }} />
    );

    // Regex to match all <style>...</style> tags and their content
    const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;

    let extractedCss = '';
    // Remove all <style> tags from the html and collect CSS
    const appHtml = appHtmlWithStyles.replace(styleTagRegex, (match, cssContent) => {
      extractedCss += cssContent + '\n';
      return ''; // Remove style tag from html
    });

    return {
      css: cloneDeep(extractedCss),
      html: cloneDeep(appHtml),
    };
  } catch (err) {
    // Optional: handle errors here
    throw err;
  }
};

export default ServerSideRender;
