import React, { useCallback, useRef } from "react";
import { useEditorContext } from "../EditorContext";
import * as styles from "./InspectorCanvas.module.css";

export default function FrameController() {
    const { editingBlock, pageBlocks, setPage, zoom } = useEditorContext();

    const scale = zoom / 100;

    const dragStartRef = useRef<{ x?: number; y?: number } | null>(null);
    const initialRef = useRef<{ w: number; vh: number } | null>(null);

    const MIN_WIDTH = 400;
    const MAX_WIDTH = 1400;
    const MIN_HEIGHT = 200;
    const MAX_HEIGHT = 3000;

    const touch = useCallback(
        (id: string) => {
            setPage((p) => ({ ...p, [id]: Date.now() }));
        },
        [setPage]
    );

    if (!editingBlock) return null;
    const block = pageBlocks.current.get(editingBlock);
    if (!block || block.t !== "fr") return null;

    const el = document.querySelector(
        `[data-node="${editingBlock}"]`
    ) as HTMLElement;
    if (!el) return null;

    /* ============================= */
    /* Normalize DOM measurements    */
    /* ============================= */

    const currentWidth =
        block.data?.options?.w?.value
            ? parseInt(block.data.options.w.value)
            : el.offsetWidth / scale;

    const DEFAULT_FRAME_HEIGHT = 1024;

    const currentVH = block.data?.options?.vh?.value
        ? parseInt(block.data.options.vh.value)
        : DEFAULT_FRAME_HEIGHT;


    /* ============================= */
    /* WIDTH RESIZE                  */
    /* ============================= */

    const startWidthResize = (e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const startWidth =
            block.data?.options?.w?.value
                ? parseInt(block.data.options.w.value)
                : el.offsetWidth / scale;

        dragStartRef.current = { x: e.clientX };
        initialRef.current = { w: startWidth, vh: currentVH };

        document.body.style.userSelect = "none";

        const onMove = (evt: PointerEvent) => {
            if (!dragStartRef.current || !initialRef.current) return;

            const dx = (evt.clientX - dragStartRef.current.x!) / scale;

            let newWidth = initialRef.current.w + dx;

            newWidth = Math.round(
                Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth))
            );

            if (!block.data.options) block.data.options = {};
            block.data.options.w = { value: `${newWidth}px` };

            touch(editingBlock);
        };

        const onUp = () => {
            dragStartRef.current = null;
            initialRef.current = null;
            document.body.style.userSelect = "";
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    };

    /* ============================= */
    /* VH RESIZE                     */
    /* ============================= */

    const startVHResize = (e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const startVH = block.data?.options?.vh?.value
            ? parseInt(block.data.options.vh.value)
            : DEFAULT_FRAME_HEIGHT;


        dragStartRef.current = { y: e.clientY };
        initialRef.current = { w: currentWidth, vh: startVH };

        document.body.style.userSelect = "none";

        const onMove = (evt: PointerEvent) => {
            if (!dragStartRef.current || !initialRef.current) return;

            const dy = (evt.clientY - dragStartRef.current.y!) / scale;

            let newVH = initialRef.current.vh + dy;

            newVH = Math.round(
                Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, newVH))
            );

            if (!block.data.options) block.data.options = {};
            block.data.options.vh = { value: `${newVH}px` };

            touch(editingBlock);
        };

        const onUp = () => {
            dragStartRef.current = null;
            initialRef.current = null;
            document.body.style.userSelect = "";
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
    };

    /* ============================= */
    /* RENDER                        */
    /* ============================= */

    return (
        <>
            {/* Width handle */}
            <div
                className={styles.frameHandler}
                style={{ right: "-10px", cursor: "ew-resize" }}
                onPointerDown={startWidthResize}
            />

            {/* Fake VH line (natural positioning, no scaling) */}
            <div
                style={{
                    position: "absolute",
                    top: `${currentVH}px`,
                    left: 0,
                    width: "100%",
                    height: "1px",
                    backgroundColor: "#3b82f6",
                    pointerEvents: "none",
                }}
            />

            {/* VH handle */}
            <div
                style={{
                    position: "absolute",
                    top: `${currentVH - 6}px`,
                    left: "-28px",
                    width: "28px",
                    height: "12px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "3px",
                    cursor: "ns-resize",
                }}
                onPointerDown={startVHResize}
            />

            {/* Label */}
            <div
                style={{
                    position: "absolute",
                    top: `${currentVH - 24}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    fontSize: "12px",
                    pointerEvents: "none",
                }}
            >
                W: {Math.round(currentWidth)}px, H: {Math.round(currentVH)}px
            </div>
        </>
    );
}
