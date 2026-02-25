import React, { useEffect, useRef, useCallback, useState } from "react";
import { FrameIcon } from "../components/ToolBarIcons";
import { useEditorContext } from "../EditorContext";
import { addBlock } from "../AddPanel";
import { blockRegistry } from "../Blocks";
import { cloneDeep } from "lodash";
import { decodeOptions } from "../util/optionCodec";
import * as styles from "./InspectorCanvas.module.css";
import FrameResizeController from "./FrameResizeController";

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

/* ----------------------------- */
/* Helpers                       */
/* ----------------------------- */

export function queryDeepDataUid(root: ParentNode, uid: string): HTMLElement | null {
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
    if (node instanceof HTMLElement && node.matches(selector)) {
      return node;
    }

    if ((node as any).assignedSlot) {
      node = (node as any).assignedSlot;
    } else if (node.parentNode) {
      node = node.parentNode;
    } else if ((node as any).host) {
      node = (node as any).host;
    } else {
      node = null;
    }
  }

  return null;
}

export function getStartPos(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const transform = style.transform;

  if (transform && transform !== "none") {
    const match = transform.match(
      /matrix\([^,]+,[^,]+,[^,]+,[^,]+,([^,]+),([^)]+)\)/
    );
    if (match) {
      return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
    }
  }

  const left = style.left;
  const top = style.top;

  if (left !== "auto" && top !== "auto") {
    return { x: parseFloat(left), y: parseFloat(top) };
  }

  return { x: el.offsetLeft, y: el.offsetTop };
}

/* ----------------------------- */
/* Component                     */
/* ----------------------------- */

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
    page,
  } = useEditorContext();

  const modeRef = useRef<Mode>("idle");
  const selectedElRef = useRef<HTMLElement | null>(null);

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const hoverBoxRef = useRef<HTMLDivElement>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const hoverElRef = useRef<HTMLElement | null>(null);
  const frameGhostRef = useRef<HTMLDivElement>(null);

  /* ----------------------------- */
  /* Render Signal Helper         */
  /* ----------------------------- */

  const touch = useCallback(
    (id: string) => {
      setPage((p) => ({ ...p, [id]: Date.now() }));
    },
    [setPage]
  );

  /* ----------------------------- */
  /* Cursor Control               */
  /* ----------------------------- */

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.style.cursor = tool === "frame" ? "crosshair" : "";

    return () => {
      scrollEl.style.cursor = "";
    };
  }, [tool, scrollRef]);

  /* ----------------------------- */
  /* Overlay Sync                 */
  /* ----------------------------- */

  const updateBox = useCallback(
    (el: HTMLElement | null, box: HTMLDivElement | null) => {
      if (!box) return;

      if (!el) {
        box.style.display = "none";
        return;
      }

      const r = el.getBoundingClientRect();

      Object.assign(box.style, {
        display: "block",
        transform: `translate(${r.left}px, ${r.top}px)`,
        width: `${r.width}px`,
        height: `${r.height}px`,
      });
    },
    []
  );

  const syncSelection = useCallback(() => {
    if (!editingBlock) {
      selectedElRef.current = null;
      updateBox(null, selectBoxRef.current);
      return;
    }

    const el = queryDeepDataUid(document, editingBlock);
    selectedElRef.current = el;
    updateBox(el, selectBoxRef.current);
  }, [editingBlock, updateBox]);

  useEffect(() => {
    syncSelection();
  }, [syncSelection, zoom, page]);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => syncSelection();
    scrollEl.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", syncSelection);

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncSelection);
    };
  }, [scrollRef, syncSelection]);

  /* ----------------------------- */
  /* Frame Creation               */
  /* ----------------------------- */

  const addFrame = (x: number, y: number) => {
    if (!editingDesignId) return;

    const template = blockRegistry["fr"];
    const frameProps = cloneDeep(template.props);
    const frameOptions = decodeOptions(frameProps?.options || "") || {};

    frameOptions.p = { value: { x, y } };

    addBlock({
      type: "fr",
      parentId: editingDesignId,
      setEditingBlock,
      page,
      setPage,
      pageBlocks,
      props: { options: frameOptions },
    });

    setTool("select");
  };

  /* ----------------------------- */
  /* Pointer Move                 */
  /* ----------------------------- */

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (tool === "frame") {
        if (frameGhostRef.current) {
          frameGhostRef.current.style.display = "flex";
          frameGhostRef.current.style.transform =
            `translate3d(${e.clientX + 15}px, ${e.clientY + 15}px, 0)`;
        }
        return;
      }

      if (tool !== "select" || modeRef.current !== "idle") return;

      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const target = closestComposed(hit, "[data-node]");
      hoverElRef.current = target;
      updateBox(target, hoverBoxRef.current);
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [tool, updateBox]);

  /* ----------------------------- */
  /* Pointer Down (Drag + Select) */
  /* ----------------------------- */

  useEffect(() => {
    function onDown(e: PointerEvent) {

      if (e.button !== 0) return;

      if (tool === "frame") {
        const scrollEl = scrollRef.current;
        if (!scrollEl || !scrollEl.contains(e.target as Node)) return;

        const rect = scrollEl.getBoundingClientRect();

        const x =
          (scrollEl.scrollLeft + (e.clientX - rect.left)) / zoom;
        const y =
          (scrollEl.scrollTop + (e.clientY - rect.top)) / zoom;

        addFrame(Math.round(x), Math.round(y));
        return;
      }

      if (tool !== "select") return;

      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const target = closestComposed(hit, "[data-node]");

      if (!target) {
        if (scrollRef.current?.contains(hit as Node)) {
          setEditingBlock(editingDesignId);
        }
        return;
      }

      const id = target.getAttribute("data-node")!;
      setEditingBlock(id);

      const el = queryDeepDataUid(document, id);
      if (!el) return;

      selectedElRef.current = el;

      const pos = getStartPos(el);

      document.body.style.userSelect = "none";
      (document.body.style as any).webkitUserSelect = "none";


      dragStartRef.current = { x: e.clientX, y: e.clientY };
      initialRef.current = {
        x: pos.x,
        y: pos.y,
        w: el.offsetWidth,
        h: el.offsetHeight,
      };

      modeRef.current = "dragging";

      function onMove(evt: PointerEvent) {
        if (!dragStartRef.current || !initialRef.current) return;

        const dx = (evt.clientX - dragStartRef.current.x) / zoom;
        const dy = (evt.clientY - dragStartRef.current.y) / zoom;

        const newX = initialRef.current.x + dx;
        const newY = initialRef.current.y + dy;

        const block = pageBlocks.current.get(id);
        if (!block) return;

        if (block.t === "fr" || block.t === "a") {
          if (block.data?.options?.p?.value) {
            block.data.options.p.value = { x: newX, y: newY };
          }
        } else {
          const variant = block.data?.design?.[editingVariant];
          if (variant) {
            if (!variant.x) variant.x = { value: "", vs: "m" };
            if (!variant.y) variant.y = { value: "", vs: "m" };
            variant.x.value = `${newX}px`;
            variant.y.value = `${newY}px`;
          }
        }

        touch(id);
      }

      function onUp() {
        modeRef.current = "idle";
        document.body.style.userSelect = "";
        (document.body.style as any).webkitUserSelect = "";

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
  }, [
    tool,
    zoom,
    editingVariant,
    pageBlocks,
    editingDesignId,
    scrollRef,
    touch,
    setEditingBlock,
  ]);

  /* ----------------------------- */
  /* Resize                       */
  /* ----------------------------- */

  const startResize = (corner: Mode) => (e: React.PointerEvent) => {
    e.stopPropagation();

    if (tool !== "select" || !editingBlock || !selectedElRef.current) return;

    const el = selectedElRef.current;

    document.body.style.userSelect = "none";
    (document.body.style as any).webkitUserSelect = "none";


    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialRef.current = {
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    };

    modeRef.current = corner;

    function onMove(evt: PointerEvent) {
      if (!dragStartRef.current || !initialRef.current) return;

      const dx = (evt.clientX - dragStartRef.current.x) / zoom;
      const dy = (evt.clientY - dragStartRef.current.y) / zoom;

      let { w, h, x, y } = initialRef.current;

      if (corner.includes("br")) {
        w += dx;
        h += dy;
      }
      if (corner.includes("bl")) {
        w -= dx;
        h += dy;
        x += dx;
      }
      if (corner.includes("tr")) {
        w += dx;
        h -= dy;
        y += dy;
      }
      if (corner.includes("tl")) {
        w -= dx;
        h -= dy;
        x += dx;
        y += dy;
      }

      const block = pageBlocks.current.get(editingBlock);
      if (!block?.data?.design?.[editingVariant]) return;

      const design = block.data.design[editingVariant];

      design.w = { value: `${Math.max(1, w)}px`, vs: "m" };
      design.h = { value: `${Math.max(1, h)}px`, vs: "m" };
      design.x = { value: `${x}px`, vs: "m" };
      design.y = { value: `${y}px`, vs: "m" };

      touch(editingBlock);
    }

    function onUp() {
      modeRef.current = "idle";

      document.body.style.userSelect = "";
      (document.body.style as any).webkitUserSelect = "";


      dragStartRef.current = null;
      initialRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const canResize = () => {
    if (!editingBlock) return false;

    const block = pageBlocks.current.get(editingBlock);
    if (!block) return false;

    const w = block.data?.design?.[editingVariant]?.w?.value;
    const h = block.data?.design?.[editingVariant]?.h?.value;

    return Boolean(w || h);
  };

  /* ----------------------------- */
  /* Render                       */
  /* ----------------------------- */

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {tool === "frame" && (
        <div
          ref={frameGhostRef}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            pointerEvents: "none",
            zIndex: 9999,
            display: "none",
            willChange: "transform",
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "4px",
            borderRadius: "4px",
          }}
        >
          <FrameIcon width={20} height={20} />
        </div>
      )}

      <div ref={hoverBoxRef} className={styles.inspectorHover} />

      <div ref={selectBoxRef} className={styles.inspectorSelected}>
        {tool === "select" && canResize() && (
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
