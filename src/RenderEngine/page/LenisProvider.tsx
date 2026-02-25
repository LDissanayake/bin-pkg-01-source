// LenisProvider.tsx
import { ReactLenis, useLenis } from 'lenis/react'
import React, { useRef, useEffect, useState } from 'react'
import type { LenisRef } from 'lenis/react'
import './lenis.css'
import { useSurfaceContext } from '../SurfaceContext'
import { rafTick } from '../animationEngine/utils/applyStaggeredAnimation'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

useEffect(() => {
  let rafId: number;

  const update = (time: number) => {
    lenisRef.current?.lenis?.raf(time); // Lenis scroll
    rafTick(time);                       // stagger animations
    rafId = requestAnimationFrame(update);
  };

  rafId = requestAnimationFrame(update);
  return () => cancelAnimationFrame(rafId);
}, []);


  useEffect(() => {
    const onFocus = () => {
      lenisRef.current?.lenis?.scrollTo(window.scrollY, { immediate: true });
    };

    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false, // we handle RAF manually
        duration: 2,    // experiment with 1.2-1.5
        // easing: (t) => 1 - Math.pow(1 - t, 4)
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}


interface PageStructure {
  pageStructure: {
    root: string;
    blocks: any; // you can type this better if you know the shape
  };
}

export function ScrollProgressHandler() {
  const lenis = useLenis(); // gives you the active Lenis instance

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (e: { scroll: number }) => {
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

export function ScrollTrigger() {
  const lenis = useLenis(); // gives you the active Lenis instance
  const { postData, handleVariantChange } = useSurfaceContext();

  const [frameBlocks, setFrameBlocks] = useState<any>(null);
  const [footerBlocks, setFooterBlocks] = useState<any>(null);
  const [templateBlocks, setTemplateBlocks] = useState<any>(null);
  const [pageBlocks, setPageBlocks] = useState<any>(null);
  const [animationElements, setAnimationElements] = useState({});
  const [scrollSections, setScrollSections] = useState({});

  const [sectionElements, setSectionElements] = useState({});

  useEffect(() => {
    if (!lenis) return;

    const blocks = {
      ...frameBlocks,
      ...footerBlocks,
      ...templateBlocks,
      ...pageBlocks
    }

    const { stiMap, sectionMap, inViewMap } = collectSTI(blocks);
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


  useEffect(() => {
    if (!postData?.template_data) return;

    const { parts, templates, current, default: defaultId } = postData.template_data;

    // --- Get Frame blocks ---
    try {
      const frameJson: PageStructure = JSON.parse(parts.frame || "{}");
      setFrameBlocks(frameJson.pageStructure?.blocks || null);
    } catch (e) {
      console.error("Error parsing frame JSON", e);
      setFrameBlocks(null);
    }

    // --- Get Footer blocks ---
    try {
      const footerJson: PageStructure = JSON.parse(parts.footer || "{}");
      setFooterBlocks(footerJson.pageStructure?.blocks || null);
    } catch (e) {
      console.error("Error parsing footer JSON", e);
      setFooterBlocks(null);
    }

    // --- Get Template blocks ---
    try {
      const templateId = current || defaultId;
      const templateObj = templates?.[templateId];
      const templateJson: PageStructure =
        typeof templateObj === "string" ? JSON.parse(templateObj) : templateObj || {};

      setTemplateBlocks(templateJson.pageStructure?.blocks || null);
    } catch (e) {
      console.error("Error parsing template JSON", e);
      setTemplateBlocks(null);
    }
  }, [postData]);


  const observersRef = useRef([]);
  useEffect(() => {
    // cleanup previous observers
    observersRef.current.forEach((o) => o.disconnect());
    observersRef.current = [];

    // small map to track "hasPlayed" per block+section
    const played = new Map();

    // for each section
    Object.entries(sectionElements || {}).forEach(([sectionId, sectionObj]) => {
      const sectionEl = document.querySelector(`[data-uid="${sectionId}"]`);
      const offsetY = (sectionObj?.options?.offsetY ?? 0) | 0;

      (sectionObj.blocks || []).forEach((block) => {
        // determine the element we should observe:
        // - liv: observe the block element itself
        // - siv: observe the section element
        const targetEl = (block.trigger === "liv")
          ? document.querySelector(`[data-uid="${block.id}"]`)
          : sectionEl;

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

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
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
      observersRef.current.forEach((o) => o.disconnect());
      observersRef.current = [];
    };
  }, [sectionElements]); // rerun whenever animationSections changes


  function playVariant(uid, variantId) {
    handleVariantChange(variantId, uid);
  }

  return null;
}


function collectSTI(blocks: Record<string, any>) {
  const stiMap: Record<string, any> = {};
  const sectionMap: Record<string, any> = {};

  const inViewMap: Record<string, any> = {};

  const sectionScrollIds = {}

  Object.entries(blocks).forEach(([blockId, blockData]) => {

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
      }

      sectionScrollIds[section] = blockId;
    }
  });


  Object.entries(blocks).forEach(([blockId, blockData]) => {
    const sti = blockData?.props?.options?.sti?.value;
    if (!sti) return;

    const firstSection = sti.sections?.[0];

    if (sti.trigger === 'liv') {
      if (!inViewMap[blockId]) {
        inViewMap[blockId] = {
          id: blockId,
          options: { offsetY: 0 },
          blocks: [],
        };
      }
      if (firstSection) {
        inViewMap[blockId].blocks.push({ ...firstSection, id: blockId });
      }
    } else if (sti.trigger === 'siv') {
      sti.sections?.forEach((section) => {
        if (section.id && sectionScrollIds[section.id]) {
          const targetId = sectionScrollIds[section.id];
          if (!inViewMap[targetId]) {
            inViewMap[targetId] = {
              id: targetId,
              options: { offsetY: 0 },
              blocks: [],
            };
          }
          inViewMap[targetId].blocks.push({ ...section, id: blockId });
        }
      });
    }
  });

  return { stiMap, sectionMap, inViewMap };
}
