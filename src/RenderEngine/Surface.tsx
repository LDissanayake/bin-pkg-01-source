import React, { useEffect } from 'react'
import { useState } from 'react'
import { SurfaceProvider, useSurfaceContext } from './SurfaceContext';
// template blocks
//elements
import { BasePreview } from '../Render/blocks/Base';
import { TextRender } from '../Render/blocks/Text';

import { PageProvider } from './page/PageContext';
import LenisProvider, { ScrollProgressHandler, ScrollTrigger } from './page/LenisProvider';
import genBlockData from '../BlockEditor/util/blockDataUtils';
import GlobalStyle from '../BlockEditor/EditCanvas/GlobalStyles';
import { StyleHost } from '../Render/blocks/hooks/styleBucket/StyleHost';

const Main = () => {
  const [dpr, setDpr] = useState(window.devicePixelRatio);

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
  } = useSurfaceContext();


  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);


  if (__IS_EDITOR__) {

    const sendMessageToParent = (message: any) => {
      window.parent.postMessage({ ...message }, '*');
    };

    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
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
            pageBlocks.current = event.data.pageBlocks.current
          }

          if (event.data.styleHTML) {
            setStyleHTML(event.data.styleHTML);
          }   

        }
      };

      // Send message to parent window when mounted
      sendMessageToParent({ mounted: true });

      // Add event listener for the 'message' event
      window.addEventListener('message', handleMessage);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);

  }


  // Update the data-color-mode attribute on the <html> element
  useEffect(() => {
    // Ensure the <html> element is available
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-color-mode', colorMode);
    }
  }, [colorMode]);


  useEffect(() => {
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

  return <React.Fragment>
    <GlobalStyle />
    <PageProvider>
      {/* 2. Wrap the lazy component in Suspense with a fallback UI */}
      {mounted && (
        <StyleHost renderType={renderType} />
      )}
      <LenisProvider>
        {ScrollProgressHandler()}
        <ScrollTrigger />
        <RenderBlocks />
      </LenisProvider>
    </PageProvider>
  </React.Fragment>
}


interface SurfaceProps {
  renderType: 'SSR' | 'CSR' | 'EPR'
  renderData?: {
    type?: string,
    previewDevice?: { w: number, h: number }
    colorMode?: 'l' | 'd',
    pageStructure?: {
      frameId: string,
      template_parts?: { headerId: string, footerId: string }
      blocks: { [key: string]: any }
    }
  },
  templates?: {
    // version: number,
    // hash: number,
    templateBlocks?: {
      [key: string]: any
    },
  }
}


export default function Surface({ renderType, renderData, templates }: SurfaceProps) {
  return <SurfaceProvider
    renderType={renderType}
    renderData={renderData}
    templateBlocks={templates?.templateBlocks}
  ><Main /></SurfaceProvider>
}


export const MapStructure = ({ entry }: { entry: string[] }) => {
  return entry.map((blockId) =>
    <RenderBlock key={blockId} id={blockId} part={false} />
  )
}

const RenderBlocks = () => {
  const { renderType, pageBlocks, frameId } = useSurfaceContext();
  const entry = pageBlocks.current.get(frameId || '')?.c || [];

  // Early SSR render in editor
  if (__IS_EDITOR__ && renderType === 'SSR') {
    return (
      <React.Fragment key={frameId || 'frame'}>
        <MapStructure entry={entry} />
      </React.Fragment>
    );
  }

  // Client side render or editor non-SSR
  if (__IS_SITE__ || __IS_EDITOR__) {
    if (!frameId) return null;

    const frame = pageBlocks.current.get(frameId);
    if (!frame) return null;

    // Generate block data once
    genBlockData(frame);

    const options = frame.data?.options || {};
    const template_header = options.th?.value;
    const template_footer = options.tf?.value;

    const output = [];

    // Render header if valid key present
    if (template_header && typeof template_header === 'string' && template_header.length > 0) {
      const headerBlock = pageBlocks.current.get(template_header);
      output.push(
        <React.Fragment key={`header-${template_header}`}>
          <MapStructure entry={headerBlock?.c || []} />
        </React.Fragment>
      );
    }

    // Render main entry
    output.push(
      <React.Fragment key={`main-${frameId}`}>
        <MapStructure entry={entry} />
      </React.Fragment>
    );

    // Render footer if valid key present
    if (template_footer && typeof template_footer === 'string' && template_footer.length > 0) {
      const footerBlock = pageBlocks.current.get(template_footer);
      output.push(
        <React.Fragment key={`footer-${template_footer}`}>
          <MapStructure entry={footerBlock?.c || []} />
        </React.Fragment>
      );
    }

    return output;
  }

  return null;
};

const RenderBlock = ({ id, part }: { id: string, part: boolean }) => {
  const { pageBlocks } = useSurfaceContext();

  const block = pageBlocks.current.get(id);

  let BlockComponent = null;

  if (!block) { return }

  genBlockData(block); // generate block data design & options

  const type = block?.t;

  switch (type) {
    case 'b':
      BlockComponent = BasePreview;
      break;
    case 't':
      BlockComponent = TextRender;
      break;
    default:
      return null;
  }


  return <BlockComponent
    id={id}
    block={block}
    part={part}
  >
    {block?.c?.map((childId) => (
      <RenderBlock key={childId} id={childId} part={part} />
    ))}
  </BlockComponent>
}
