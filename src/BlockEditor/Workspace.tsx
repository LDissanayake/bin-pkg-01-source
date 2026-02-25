import React, { useEffect, useRef } from 'react';
import { useEditorContext } from './EditorContext';
import * as styles from './css/Editor.module.css';
import EditCanvas from './EditCanvas';
import InspectorCanvas from './EditCanvas/InspectorCanvas';
import genBlockData from './util/blockDataUtils';


export default function Workspace() {
  const { panel, zoom, setZoom, pageBlocks, editingDesignId, tool, colorMode } = useEditorContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const vScrollbarRef = useRef<HTMLDivElement>(null);
  const hScrollbarRef = useRef<HTMLDivElement>(null);

  // const [zoom, setZoom] = useState(100);

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  const lastPointerPos = useRef<{ x: number; y: number } | null>(null);
  const pinchAnchor = useRef<{ x: number; y: number } | null>(null);

  const draggingRef = useRef<{
    type: "v" | "h";
    startX?: number;
    startY?: number;
    startScrollLeft?: number;
    startScrollTop?: number;
  } | null>(null);

  const round1 = (value: number) => Math.round(value * 10) / 10;

  const applyZoom = (newZoom: number, anchor?: { x: number; y: number } | null) => {
    const clampedZoom = Math.min(Math.max(10, Math.round(newZoom * 10) / 10), 120);
    if (clampedZoom === zoomRef.current) return;

    const el = scrollRef.current;
    const refPoint = anchor || lastPointerPos.current;

    if (!el || !refPoint) {
      setZoom(clampedZoom);
      return;
    }

    const { x, y } = refPoint;
    const prevZoom = zoomRef.current / 100;
    const nextZoom = clampedZoom / 100;

    // Calculate new scroll to keep pointer in place
    el.scrollLeft = (x * nextZoom) / prevZoom - (x - el.scrollLeft);
    el.scrollTop = (y * nextZoom) / prevZoom - (y - el.scrollTop);

    zoomRef.current = clampedZoom;
    setZoom(clampedZoom); // optional, for UI slider
  };


  // --- Pointer tracking ---
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = el.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      lastPointerPos.current = {
        x: clientX - rect.left + el.scrollLeft,
        y: clientY - rect.top + el.scrollTop,
      };
    };

    el.addEventListener("mousemove", handlePointerMove);
    el.addEventListener("touchmove", handlePointerMove);
    return () => {
      el.removeEventListener("mousemove", handlePointerMove);
      el.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  // --- Wheel & keyboard handling ---
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {

      // Prevent the default browser action for all trackpad/mouse wheel events 
      // This is crucial for stopping browser back/forward on horizontal scrolls 
      if (Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0) { e.preventDefault(); }

      const el = scrollRef.current;
      if (!el) return;

      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        // Get pointer relative to scroll container
        const rect = el.getBoundingClientRect();
        const pointerX = e.clientX - rect.left + el.scrollLeft;
        const pointerY = e.clientY - rect.top + el.scrollTop;

        const zoomDelta = -e.deltaY / 10;
        const newZoom = Math.min(Math.max(10, zoomRef.current + zoomDelta), 120);

        applyZoom(newZoom, { x: pointerX, y: pointerY });
      } else {
        el.scrollTop += e.deltaY;
        el.scrollLeft += e.deltaX;
      }
    };


    const handleKeyDown = (e: KeyboardEvent) => {
      const isZoomIn = e.key === "+" || e.key === "=";
      const isZoomOut = e.key === "-";

      if ((e.ctrlKey || e.metaKey) && (isZoomIn || isZoomOut)) {
        e.preventDefault();
        const step = isZoomIn ? 10 : -10;
        applyZoom(Math.min(Math.max(10, zoomRef.current + step), 120));
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault();
        applyZoom(100);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent the default browser action for all trackpad/mouse wheel events 
      // This is crucial for stopping browser back/forward on horizontal scrolls 
      if (Math.abs(e.deltaX) > 0) { e.preventDefault(); }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // --- Scrollbar drag ---
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const el = scrollRef.current;
      if (!el || !draggingRef.current) return;

      if (draggingRef.current.type === "v") {
        const deltaY = e.clientY - draggingRef.current.startY!;
        const ratio = el.scrollHeight / el.clientHeight;
        el.scrollTop = draggingRef.current.startScrollTop! + deltaY * ratio;
      } else if (draggingRef.current.type === "h") {
        const deltaX = e.clientX - draggingRef.current.startX!;
        const ratio = el.scrollWidth / el.clientWidth;
        el.scrollLeft = draggingRef.current.startScrollLeft! + deltaX * ratio;
      }
    };

    const onMouseUp = () => {
      draggingRef.current = null;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const startVDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    draggingRef.current = { type: "v", startY: e.clientY, startScrollTop: el.scrollTop };
  };

  const startHDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    draggingRef.current = { type: "h", startX: e.clientX, startScrollLeft: el.scrollLeft };
  };

  // --- Scrollbar update ---
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollbar = () => {
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = el;
      const verticalRatio = clientHeight / scrollHeight;
      const horizontalRatio = clientWidth / scrollWidth;

      if (vScrollbarRef.current) {
        vScrollbarRef.current.style.height = `${clientHeight * verticalRatio}px`;
        vScrollbarRef.current.style.top = `${scrollTop * verticalRatio}px`;
      }

      if (hScrollbarRef.current) {
        hScrollbarRef.current.style.width = `${clientWidth * horizontalRatio}px`;
        hScrollbarRef.current.style.left = `${scrollLeft * horizontalRatio}px`;
      }
    };

    el.addEventListener("scroll", updateScrollbar);
    return () => el.removeEventListener("scroll", updateScrollbar);
  }, []);

  const designBlock = pageBlocks.current.get(editingDesignId || '');
  if (designBlock) {
    genBlockData(designBlock);
  }

  const editingWorkspaceSize = designBlock?.data?.options?.size?.value || 10;
  const editingWorkspaceColor = designBlock?.data?.options?.bg?.value[colorMode] || '#141414';

  return (
    <>
      <div className={styles.contentCanvas}
        data-mode={panel?.type === "textEditor" ? "text" : "open"}
        style={{ backgroundColor: editingWorkspaceColor }}
      >
        <div className={styles.canvasWrappers} ref={scrollRef}>
          <div
            className={styles.canvasContent}
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "0 0",
              minWidth: editingWorkspaceSize * 1000,
              minHeight: editingWorkspaceSize * 1000,
            }}
          >
            <div className={styles.canvasContentDeviceWrapper}>
              <EditCanvas />
            </div>
          </div>
          {tool !== 'pan' && <InspectorCanvas zoom={zoom / 100} scrollRef={scrollRef} />}
        </div>

        <div className={styles.verticalScrollbar} ref={vScrollbarRef} onMouseDown={startVDrag} />
        <div className={styles.horizontalScrollbar} ref={hScrollbarRef} onMouseDown={startHDrag} />
      </div>
    </>
  );
}