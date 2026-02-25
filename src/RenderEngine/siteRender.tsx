import React from 'react';
import ReactDOM from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import Surface from './Surface';

/**
 * ============================================================
 * Site Render & Hydration Contract
 * ============================================================
 *
 * This file defines how page templates, global templates,
 * template parts, and styles are loaded and rendered
 * on the live site and in editor preview.
 *
 * ⚠️ This flow is intentional and must remain stable.
 * Do NOT reorder steps without updating this contract.
 *
 * ------------------------------------------------------------
 * 1. Page Template Data (Local)
 * ------------------------------------------------------------
 *
 * Source:
 * - Current HTML page contains:
 *   <script id="__ADDIFECT_LOCAL_T_DATA__">
 *
 * Data format (JSON):
 * {
 *   blocks,
 *   frameId,
 *   template_parts: {
 *     header: 'frameId' | null,
 *     footer: 'frameId' | null
 *   }
 * }
 *
 * Usage:
 * - Read script content
 * - JSON.parse()
 * - Pass result as:
 *   renderData.pageStructure
 *
 * This represents the current page structure and template bindings.
 *
 * ------------------------------------------------------------
 * 2. Global Template Loading
 * ------------------------------------------------------------
 *
 * Purpose:
 * - Load global parts, components, and shared assets
 * - Must happen BEFORE hydration
 *
 * Versioning:
 * - Use addifectRender.globalTemplateUpdated as TEMPLATE_UPDATED
 *
 * Fetch location:
 *   /__addifect/templates/v${TEMPLATE_UPDATED}/
 *
 * Load process:
 * 1. Fetch template bundle using TEMPLATE_UPDATED
 * 2. Read <script id="__ADDIFECT_TEMPLATE__">
 * 3. Extract textContent
 * 4. JSON.parse() to get:
 *    - Global template parts
 *    - Components
 *    - Shared assets
 *
 * Result:
 * - Parsed blocks are registered as initial page blocks
 * - These blocks are available globally before page render
 *
 * ------------------------------------------------------------
 * 3. Header / Footer Attachment
 * ------------------------------------------------------------
 *
 * Template parts are attached using frame-level options.
 *
 * Frame options:
 * - th → Header frame ID
 * - tf → Footer frame ID
 *
 * If present:
 * - Resolve corresponding frames from global template data
 * - Render each part separately in the surface:
 *   - Header above page content
 *   - Footer below page content
 *
 * Page content does NOT own header/footer blocks.
 * They are resolved and rendered by reference.
 *
 * ------------------------------------------------------------
 * 4. Hydration
 * ------------------------------------------------------------
 *
 * Hydration occurs AFTER initial data loading.
 *
 * Live site behavior:
 * - Global CSS and Google Font <link> tags
 *   are injected into <head> server-side (WordPress SSR)
 *
 * Editor preview behavior:
 * - Global CSS and fonts are injected inside the surface
 *   using useEffect
 *
 * ------------------------------------------------------------
 * 5. Render Context Differences
 * ------------------------------------------------------------
 *
 * SSR (Live Site):
 * - renderData contains:
 *   - All blocks
 *   - Frame ID
 *   - Template part bindings
 * - Rendering happens server-side before hydration
 *
 * Editor Preview (EPR):
 * - renderData is received via parent messaging
 * - Uses the same render pipeline (no SSR)
 *
 * ------------------------------------------------------------
 * Render Order Summary
 * ------------------------------------------------------------
 *
 * 1. Read page template data (__ADDIFECT_LOCAL_T_DATA__)
 * 2. Fetch and parse global templates
 * 3. Register global blocks
 * 4. Resolve header/footer attachments
 * 5. Render initial structure
 * 6. Apply global CSS and fonts (in editor preview)
 * 7. Hydrate
 * 8. Attach runtime systems (variants, motion, observers)
 *
 * ============================================================
 */

type TemplatePayload = {
  hash: string;
  generated: string;
  templates: any;
};

// Webpack public path (prod only)
if (process.env.NODE_ENV === 'production') {
  // @ts-ignore
  __webpack_public_path__ = window.addifectRender?.assetsPath || '/';
}

// Get Latest Template Version
const TEMPLATE_UPDATED = window.addifectRender?.templatesUpdated || 1;

/**
 * Fetch template payload HTML and extract embedded JSON.
 */
async function fetchTemplateData(): Promise<TemplatePayload> {
  const response = await fetch(`/__addifect/templates/v${TEMPLATE_UPDATED}/`, {
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch templates (${response.status})`);
  }

  const htmlString = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const scriptEl = doc.getElementById('__ADDIFECT_TEMPLATES__');

  if (!scriptEl || !scriptEl.textContent) {
    throw new Error('Template data script not found');
  }

  return JSON.parse(scriptEl.textContent);
}

/**
 * Bootstrap Addifect hydration AFTER templates are loaded.
 */
async function bootstrap() {
  try {

    // get local template data
    const scriptEl = document.getElementById('__ADDIFECT_LOCAL_T_DATA__');
    
    let localTemplateData: {
      frameId: string;
      template_parts?: {
        headerId: string;
        footerId: string;
      } | undefined;
      blocks: {
        [key: string]: any;
      }
    } = {
      frameId: '',
      blocks: {}
    }

    if (scriptEl && scriptEl.textContent) {
      localTemplateData = JSON.parse(scriptEl.textContent);
    }

    const templatesData = await fetchTemplateData();

    let rootElement = document.getElementById('addifect_render_root');

    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = 'addifect_render_root';
      document.body.appendChild(rootElement);
    }

    hydrateRoot(
      rootElement,
      <Surface
        renderType="CSR"
        templates={templatesData?.templates}
        renderData={{ pageStructure: localTemplateData, colorMode: templatesData?.templates?.colorMode }}
      />
    );
  } catch (error) {
    console.error('[Addifect] Failed to bootstrap templates', error);
  }
}

// 🚀 Start
bootstrap();
