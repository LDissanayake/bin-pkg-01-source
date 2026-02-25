import { useEffect, useRef, useState } from "react";

export function useGridAlign(
  step: number,
  gap: number = 0,
  mode: "next" | "prev" | "nearest" = "next",
  align: "left" | "right" = "left" // 👈 new
) {
  const ref = useRef<HTMLDivElement>(null);
  const [alignedWidth, setAlignedWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    function alignFn() {
      if (!ref.current) return;
      const naturalWidth = ref.current.scrollWidth;

      let aligned: number;
      switch (mode) {
        case "prev":
          aligned = Math.floor(naturalWidth / step) * step;
          break;
        case "nearest":
          aligned = Math.round(naturalWidth / step) * step;
          break;
        default:
          aligned = Math.ceil(naturalWidth / step) * step;
      }

      // Adjust for right alignment: shift one gap forward
      if (align === "right") aligned -= gap;

      setAlignedWidth(Math.max(aligned, 0));
    }

    alignFn();
    window.addEventListener("resize", alignFn);
    return () => window.removeEventListener("resize", alignFn);
  }, [step, gap, mode, align]);

  return { ref, alignedWidth };
}
