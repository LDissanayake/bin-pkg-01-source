import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';

export function useLenisAutoResize(deps: any[] = []) {
  const lenis = useLenis();
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!lenis || typeof window === 'undefined') return;

    const observer = new ResizeObserver(() => {
      lenis.resize(); // trigger reflow when DOM size changes
    });

    // observe the scroll container
    const scrollContainer = document.querySelector('[data-lenis-root]') || document.body;
    observer.observe(scrollContainer);

    resizeObserverRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [lenis, ...deps]);
}
