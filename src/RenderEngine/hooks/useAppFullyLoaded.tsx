import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const useRealLoaded = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const check = async () => {
      await document.fonts.ready;

      const waitForImages = () =>
        Promise.all(
          Array.from(document.images).map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.onload = img.onerror = res;
                })
          )
        );

      await waitForImages();

      if (document.readyState === "complete") {
        setLoaded(true);
      } else {
        window.addEventListener("load", () => setLoaded(true), { once: true });
      }
    };

    check();
  }, []);

  return loaded;
};


function waitForTabVisible(): Promise<void> {
  return new Promise((resolve) => {
    const check = () => {
      if (document.visibilityState === 'visible') {
        requestAnimationFrame(resolve)
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  })
}

export function useAppFullyLoaded() {
  const { progress, loaded } = useProgress()
  const [domReady, setDomReady] = useState(false)
  const [fullyLoaded, setFullyLoaded] = useState(false)

  useEffect(() => {
    const check = async () => {
      if (document.readyState === 'complete') {
        await document.fonts.ready
        setDomReady(true)
      } else {
        window.addEventListener(
          'load',
          async () => {
            await document.fonts.ready
            setDomReady(true)
          },
          { once: true }
        )
      }
    }
    check()
  }, [])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      await waitForTabVisible();
      if (!cancelled) {
        setFullyLoaded(true)
      }
    }

    if (domReady && loaded === progress) {
      run()
    }

    return () => {
      cancelled = true
    }
  }, [domReady, loaded, progress])

  return {
    fullyLoaded,
    loadingProgress: progress,
  }
}
