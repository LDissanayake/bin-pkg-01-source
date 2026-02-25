import React, { useEffect, useRef } from "react";
import { FrameIcon } from '../components/ToolBarIcons';
import { useEditorContext } from "../EditorContext";
import { addBlock } from "../AddPanel";
import { blockRegistry } from "../Blocks";
import { cloneDeep } from "lodash";
import { decodeOptions } from "../util/optionCodec";
import * as styles from './InspectorCanvas.module.css';

type Mode =
  | "idle"
  | "dragging"
  | "resizing-br"
  | "resizing-bl"
  | "resizing-tr"
  | "resizing-tl";

type Props = {
  zoom: number;
  scrollRef: React.RefObject<HTMLElement>;
};

// --- Helpers ---
function queryDeepDataUid(root: ParentNode, uid: string): HTMLElement | null {
  const el = root.querySelector(`[data-node="${uid}"]`) as HTMLElement | null;
  if (el) return el;
  const all = root.querySelectorAll("*");
  for (const node of all) {
    if (node instanceof Element && node.shadowRoot) {
      const found = queryDeepDataUid(node.shadowRoot, uid);
      if (found) return found;
    }
  }
  return null;
}

function closestComposed(start: Node | null, selector: string): HTMLElement | null {
  let node: Node | null = start;
  while (node) {
    if (node instanceof HTMLElement && node.matches(selector)) return node;
    node = (node as HTMLElement).parentElement ?? null;
  }
  return null;
}

function getStartPos(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const transform = style.transform;
  if (transform && transform !== "none") {
    const match = transform.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,([^,]+),([^)]+)\)/);
    if (match) return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
  }
  const left = style.left;
  const top = style.top;
  if (left && left !== "auto" && top && top !== "auto") {
    return { x: parseFloat(left), y: parseFloat(top) };
  }
  return { x: el.offsetLeft, y: el.offsetTop };
}

// --- Component ---

export default function InspectorOverlay({ zoom, scrollRef }: Props) {
  const {
    editingBlock,
    setEditingBlock,
    pageBlocks,
    setPage,
    editingVariant,
    tool,
    setTool,
    editingDesignId,
    page
  } = useEditorContext();

  const modeRef = useRef<Mode>("idle");
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const hoverBoxRef = useRef<HTMLDivElement>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const lastHoverRef = useRef<HTMLElement | null>(null);
  const frameGhostRef = useRef<HTMLDivElement>(null);

  // --- NEW: Toggle Cursor on Canvas ---
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    if (tool === 'frame') {
      // 'crosshair' is standard for drawing tools. 
      // You can change this to 'pointer' (hand) if you prefer.
      scrollEl.style.cursor = 'crosshair';
    } else {
      scrollEl.style.cursor = ''; // Reset to default (auto)
    }

    // Cleanup: Reset cursor if component unmounts
    return () => {
      if (scrollEl) scrollEl.style.cursor = '';
    };
  }, [tool, scrollRef]);


  // --- Add Frame Logic ---
  const addFrame = (x: number | string, y: number | string) => {
    if (!editingDesignId) return;
    const template = blockRegistry['fr'];
    const frameProps = cloneDeep(template.props);
    const frameOptions = decodeOptions(frameProps?.options || '') || {};

    if (frameOptions) {
      frameOptions.p = { value: { x, y } };
    }

    addBlock({
      type: 'fr',
      parentId: editingDesignId,
      setEditingBlock,
      page,
      setPage,
      pageBlocks,
      props: { options: frameOptions }
    });

    setTool('select');
  };

  // 1. Visual Sync (RAF Loop)
  useEffect(() => {
    let raf: number;
    const loop = () => {
      if (hoverBoxRef.current && lastHoverRef.current && modeRef.current === "idle") {
        const r = lastHoverRef.current.getBoundingClientRect();
        Object.assign(hoverBoxRef.current.style, {
          display: "block",
          transform: `translate(${r.left}px, ${r.top}px)`,
          width: `${r.width}px`,
          height: `${r.height}px`,
        });
      } else if (hoverBoxRef.current) {
        hoverBoxRef.current.style.display = "none";
      }

      if (selectBoxRef.current && editingBlock) {
        const el = queryDeepDataUid(document, editingBlock);
        if (el) {
          const r = el.getBoundingClientRect();
          Object.assign(selectBoxRef.current.style, {
            display: "block",
            transform: `translate(${r.left}px, ${r.top}px)`,
            width: `${r.width}px`,
            height: `${r.height}px`,
          });
        } else {
          selectBoxRef.current.style.display = "none";
        }
      } else if (selectBoxRef.current) {
        selectBoxRef.current.style.display = "none";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [editingBlock]);

  // 2. Passive Pointer Move
  useEffect(() => {
    function onMove(e: PointerEvent) {
      // Frame Ghost Move
      if (tool === 'frame') {
        if (frameGhostRef.current) {
          frameGhostRef.current.style.transform = `translate(${e.clientX + 15}px, ${e.clientY + 15}px)`;
          frameGhostRef.current.style.display = "flex";
        }
        if (lastHoverRef.current) lastHoverRef.current = null;
        return;
      }
      // Select Hover
      if (tool === 'select') {
        if (modeRef.current !== "idle") return;
        const hit = document.elementFromPoint(e.clientX, e.clientY);
        const target = closestComposed(hit, "[data-node]");
        lastHoverRef.current = target;
      }
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [tool]);

  // 3. Global Interaction (Click/Drag)
  useEffect(() => {
    function onDown(e: PointerEvent) {
      if (e.button !== 0) return;

      // FRAME TOOL
      if (tool === 'frame') {
        const scrollEl = scrollRef.current;
        if (!scrollEl || !scrollEl.contains(e.target as Node)) return;

        const scrollRect = scrollEl.getBoundingClientRect();
        const offsetX = e.clientX - scrollRect.left;
        const offsetY = e.clientY - scrollRect.top;
        const x = ((scrollEl.scrollLeft + offsetX) / zoom).toFixed(0);
        const y = ((scrollEl.scrollTop + offsetY) / zoom).toFixed(0);

        addFrame(x, y);
        return;
      }

      // SELECT TOOL
      if (tool !== 'select') return;

      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const target = closestComposed(hit, "[data-node]");

      if (!target) {
        if (scrollRef.current && scrollRef.current.contains(hit)) {
          setEditingBlock(editingDesignId);
        }
        return;
      }

      const id = target.getAttribute("data-node")!;
      setEditingBlock(id);
      const el = queryDeepDataUid(document, id);
      if (!el) return;

      const pos = getStartPos(el);

      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      dragStartRef.current = { x: e.clientX, y: e.clientY };
      initialRef.current = { x: pos.x, y: pos.y, w: el.offsetWidth, h: el.offsetHeight };
      modeRef.current = "dragging";

      function onMove(evt: PointerEvent) {
        if (!dragStartRef.current || !initialRef.current) return;
        const deltaX = (evt.clientX - dragStartRef.current.x) / zoom;
        const deltaY = (evt.clientY - dragStartRef.current.y) / zoom;
        const newX = initialRef.current.x + deltaX;
        const newY = initialRef.current.y + deltaY;

        const block = pageBlocks.current.get(id);
        if (!block) return;

        if (block.t === "fr" || block.t === "a") {
          if (block.data?.options?.p?.value) block.data.options.p.value = { x: newX, y: newY };
        } else {
          const variant = block.data?.design?.[editingVariant];
          if (variant) {
            if (!variant.x) variant.x = { value: "", vs: "m" };
            if (!variant.y) variant.y = { value: "", vs: "m" };
            variant.x.value = `${newX}px`;
            variant.y.value = `${newY}px`;
          }
        }
        setPage((p) => ({ ...p, [id]: Date.now() }));
      }

      function onUp() {
        modeRef.current = "idle";
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
        dragStartRef.current = null;
        initialRef.current = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [zoom, editingVariant, pageBlocks, scrollRef, tool, editingDesignId, page]);

  // 4. Resizing
  const startResize = (corner: Mode) => (e: React.PointerEvent) => {
    e.stopPropagation();
    if (tool !== 'select') return;
    if (!editingBlock) return;
    const el = queryDeepDataUid(document, editingBlock);
    if (!el) return;

    const pos = getStartPos(el);
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialRef.current = { x: pos.x, y: pos.y, w: el.offsetWidth, h: el.offsetHeight };
    modeRef.current = corner;

    function onMove(evt: PointerEvent) {
      if (!dragStartRef.current || !initialRef.current) return;
      const deltaX = (evt.clientX - dragStartRef.current.x) / zoom;
      const deltaY = (evt.clientY - dragStartRef.current.y) / zoom;
      let { w, h, x, y } = initialRef.current;

      if (corner.includes("br")) { w += deltaX; h += deltaY; }
      if (corner.includes("bl")) { w -= deltaX; h += deltaY; x += deltaX; }
      if (corner.includes("tr")) { w += deltaX; h -= deltaY; y += deltaY; }
      if (corner.includes("tl")) { w -= deltaX; h -= deltaY; x += deltaX; y += deltaY; }

      const block = pageBlocks.current.get(editingBlock);
      if (!block?.data?.design?.[editingVariant]) return;
      const design = block.data.design[editingVariant];

      design.w = { value: `${Math.max(1, w)}px`, vs: "m" };
      design.h = { value: `${Math.max(1, h)}px`, vs: "m" };

      if (corner.includes("tl") || corner.includes("bl") || corner.includes("tr")) {
        if (!design.x) design.x = { value: "", vs: "m" };
        if (!design.y) design.y = { value: "", vs: "m" };
        if (corner.includes("tl") || corner.includes("bl")) design.x.value = `${x}px`;
        if (corner.includes("tl") || corner.includes("tr")) design.y.value = `${y}px`;
      }
      setPage((p) => ({ ...p, [editingBlock]: Date.now() }));
    }

    function onUp() {
      modeRef.current = "idle";
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      dragStartRef.current = null;
      initialRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const canResize = () => {
    if (!editingBlock) { return false }
    const block = pageBlocks.current.get(editingBlock);
    if (!block) { return false }

    const w = block.data?.design?.[editingVariant]?.w;
    const h = block.data?.design?.[editingVariant]?.h;

    if (w?.value || h?.value) { return true }

  }

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {/* Frame Tool Ghost */}
      {tool === 'frame' && (
        <div
          ref={frameGhostRef}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            display: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '4px',
            borderRadius: '4px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.05s linear'
          }}
        >
          <FrameIcon width={20} height={20} />
        </div>
      )}

      {/* Overlays */}
      <div ref={hoverBoxRef} className={styles.inspectorHover} />
      <div ref={selectBoxRef} className={styles.inspectorSelected}>
        {tool === 'select' && canResize() && (
          <>
            <div className={`${styles.handle} ${styles.handleTl}`} onPointerDown={startResize("resizing-tl")} />
            <div className={`${styles.handle} ${styles.handleTr}`} onPointerDown={startResize("resizing-tr")} />
            <div className={`${styles.handle} ${styles.handleBl}`} onPointerDown={startResize("resizing-bl")} />
            <div className={`${styles.handle} ${styles.handleBr}`} onPointerDown={startResize("resizing-br")} />
          </>
        )}
      </div>
    </div>
  );
}