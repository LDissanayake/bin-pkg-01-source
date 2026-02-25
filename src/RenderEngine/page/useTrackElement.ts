// useTrackElement.ts
import { useLayoutEffect, useState, useRef } from 'react'

export function useTrackElement<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [rect, setRect] = useState<{ width: number; height: number; offsetTop: number } | null>(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    function updateRect() {
      const el = ref.current!
      const box = el.getBoundingClientRect()
      const offsetTop = el.offsetTop + window.scrollY

      setRect({
        width: box.width,
        height: box.height,
        offsetTop
      })
    }

    updateRect()
    window.addEventListener('resize', updateRect)
    return () => window.removeEventListener('resize', updateRect)
  }, [])

  return [ref, rect] as const
}
