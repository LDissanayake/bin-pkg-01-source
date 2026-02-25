import React, { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { Block, PostData } from '../BlockEditor/EditorContext';
import { applyStaggeredAnimation } from './animationEngine/utils/applyStaggeredAnimation';
import { applyVariantAtProgress } from './animationEngine/animate';

interface AddifectRed {
  template_data?: {
    parts: {
      frame: string | null,
      footer: string | null
    }
  };
  data?: string,
  frame_data?: string,
  style_data?: string,
  site_data?: { [key: string]: string }
}

export interface VariantChangeMap {
  controls: { [key: string]: any }; // You can replace `any` with Framer Motion controls if you want strict typing
  triggers: { [key: string]: string[] };
  variantById: { [key: string]: string };
  variantsById: { [key: string]: string[] };
  idByInterId: { [key: string]: string };
  activeVariantById: {
    [key: string]: {
      current: string,
      pending: null | string,
      savedAnimationState: null | string,
    }
  };
  stagger: {
    [key: string]: {
      charIds: string[],
      delay: number,
      direction: 'ltr' | 'rtl' | 'center',
    }
  }
}

interface SurfaceContextProps {
  postData: PostData;
  setPostData: React.Dispatch<React.SetStateAction<PostData>>;
  device: 'default' | 'medium' | 'small';
  setDevice: React.Dispatch<React.SetStateAction<'default' | 'medium' | 'small'>>;
  siteData: { [key: string]: string };
  setSiteData: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  dynamicData: any,
  readytoReveal: boolean,
  setReadytoReveal: React.Dispatch<React.SetStateAction<boolean>>;
  page: { [id: string]: number }
  setPage: React.Dispatch<React.SetStateAction<{ [id: string]: number }>>;
  /** 
   * note: above all can be remove 
   * -----------------------------
   */
  colorMode: 'l' | 'd';
  setColorMode: React.Dispatch<React.SetStateAction<'l' | 'd'>>;
  /** SSR - Server-Side Rendering, CSR - Client-Side Rendering, EPR - Editor Preview Rendering */
  renderType: 'SSR' | 'CSR' | 'EPR';
  showEffect: boolean,
  setShowEffect: React.Dispatch<React.SetStateAction<boolean>>;
  handleVariantChange: (variant: string, id: string) => void;
  variantChangeMap: React.MutableRefObject<VariantChangeMap>
  mounted: boolean;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  isPreview: boolean,
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  pageBlocks: MutableRefObject<Map<string, Block>>;
  frameId: string | null,
  setFrameId: React.Dispatch<React.SetStateAction<string | null>>;
  styleHTML: string | null,
  setStyleHTML: React.Dispatch<React.SetStateAction<string | null>>;
  newVariantTriggerMap: React.MutableRefObject<{ [key: string]: any }>
  newHandleVariantChange: (id: string, variantId: string) => void;
}

const SurfaceContext = createContext<SurfaceContextProps | undefined>(undefined);

export const SurfaceProvider: React.FC<{
  children: React.ReactNode;
  renderType: 'SSR' | 'CSR' | 'EPR',
  templateBlocks: { [key: string]: any } | undefined
  renderData?: {
    type?: string,
    colorMode?: 'l' | 'd'
    previewDevice?: {
      w: number,
      h: number
    }
    pageStructure?: {
      frameId: string,
      blocks: { [key: string]: any }
    }
  }

}> = ({ children, renderType, renderData, templateBlocks }) => {


  let initColorMode: 'l' | 'd' = renderData?.colorMode || 'l';
  let initSiteData = {};
  let initPostData = {};

  if (__IS_EDITOR__) {
    // initColorMode = renderData?.styleData?.defaultColorMode || initColorMode;
    // TODO fix this
  }

  let initFrameId = renderData?.pageStructure?.frameId || null;
  let initPageBlocks = new Map();

  if (templateBlocks) { // set template blocks to tree...
    Object.entries(templateBlocks).forEach(([key, value]) => {
      initPageBlocks.set(key, value);
    });
  }

  if (renderData?.pageStructure?.blocks) {
    Object.entries(renderData.pageStructure.blocks || {}).forEach(([key, value]) => {
      initPageBlocks.set(key, value);
    });
  }

  const pageBlocks: MutableRefObject<Map<string, Block>> = useRef(initPageBlocks);


  const [page, setPage] = useState<{ [id: string]: number }>({ root: Date.now() });
  const [frameId, setFrameId] = useState<string | null>(initFrameId);
  const [postData, setPostData] = useState<PostData | {}>(initPostData);
  const [mounted, setMounted] = useState(false);
  const [device, setDevice] = useState<'default' | 'medium' | 'small'>('default');
  const [colorMode, setColorMode] = useState<'l' | 'd'>(initColorMode);
  const [siteData, setSiteData] = useState<{ [key: string]: string }>(initSiteData);
  const [showEffect, setShowEffect] = useState(true);
  const [styleHTML, setStyleHTML] = useState<string | null>(null);

  const newVariantTriggerMap = useRef<{ [key: string]: any }>({
    trigger: {},
    byId: {}
  });


  const dynamicData = useRef({});

  const [isPreview, setIsPreview] = useState(false); // to detect EPR

  const [readytoReveal, setReadytoReveal] = useState(false);


  const variantChangeMap = useRef<VariantChangeMap>({
    controls: {},
    triggers: {},
    variantById: {},
    variantsById: {},
    idByInterId: {},
    activeVariantById: {},
    stagger: {}
  });

  // Cache purely for animation existence
  const variantCache: Record<string, { haveAnimation: boolean; newVariant: string }> = {};

  //TODO: remove this code when newHandleVariantChange stable
  const handleVariantChange = (
    variant: string,
    id: string,
    type: 'start' | 'set' | 'strength' = 'start',
    options: { onComplete?: () => void; strength?: number } = {},
    _visited: Set<string> = new Set()
  ) => {
    const {
      controls,
      triggers,
      variantById,
      variantsById,
      activeVariantById,
      stagger
    } = variantChangeMap.current;

    if (!controls || !triggers || _visited.has(id)) return;

    _visited.add(id);

    const active = activeVariantById[id];
    if (!active) return;

    const currentVariant = active.current;
    const cacheKey = `${id}_${currentVariant}_${variant}`;
    let cached = variantCache[cacheKey];

    if (!cached) {
      const animationVariantId = `${currentVariant}_${variant}`;
      const haveAnimation = variantsById?.[id]?.includes(animationVariantId);
      const newVariant = haveAnimation ? animationVariantId : variant;

      cached = { haveAnimation, newVariant };
      variantCache[cacheKey] = cached; // save in cache
    }

    const { haveAnimation, newVariant } = cached;

    // Update current variant
    active.current = variant;

    // Apply staggered or normal animation
    if (stagger[id]) {
      applyStaggeredAnimation({
        ...stagger[id],
        variantName: newVariant,
        progress: type === 'strength' ? { strength: options?.strength || 0, variant } : undefined
      });
    } else {
      if (type === 'strength') {
        applyVariantAtProgress(id, variant, options?.strength ?? 1);
      } else {
        if (type === 'set') {

          controls[id]?.[type]?.(newVariant, options);
        }
      }
    }

    if (haveAnimation) {
      active.savedAnimationState = newVariant;
    }

    // Animate all related controls
    const related = triggers[variantById[id] || ''];
    related?.forEach((_id) => {
      handleVariantChange(variant, _id, type, options, _visited);
    });
  };


  const newHandleVariantChange = (
    blockId: string,
    variantId: string,
    visited: Set<string> = new Set()
  ) => {
    if (visited.has(blockId)) return;
    visited.add(blockId);

    const block = pageBlocks.current.get(blockId);
    if (!block) return;

    const interactiveId = block.data?.options?.inid?.value;
    const control = newVariantTriggerMap.current.byId[blockId];
    if (!control) return;

    control(variantId);

    const triggers = newVariantTriggerMap.current.trigger[interactiveId];
    
    triggers?.forEach((triggerBlockId: string) => {
      newHandleVariantChange(triggerBlockId, variantId, visited);
    });
  };

  return (
    <SurfaceContext.Provider
      value={{
        postData,
        setPostData,
        device,
        setDevice,
        colorMode,
        setColorMode,
        siteData,
        setSiteData,
        renderType,
        showEffect,
        setShowEffect,
        handleVariantChange,
        variantChangeMap,
        mounted,
        setMounted,
        dynamicData,
        isPreview,
        setIsPreview,
        readytoReveal,
        setReadytoReveal,
        page,
        setPage,
        pageBlocks,
        frameId,
        setFrameId,
        styleHTML,
        setStyleHTML,

        newVariantTriggerMap,
        newHandleVariantChange
      }}>
      {children}
    </SurfaceContext.Provider>
  );
};

export const useSurfaceContext = () => {
  const context = useContext(SurfaceContext);
  if (!context) {
    throw new Error('useSurfaceContext must be used within a SurfaceProvider');
  }
  return context;
};
