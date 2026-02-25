import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export function useFrameOnScroll(
  extraFrames = 20,
  options?: {
    mouse?: boolean
    scroll?: boolean
  }
) {
  const { invalidate } = useThree()
  const framesRemaining = useRef(0)
  const rafId = useRef<number | null>(null)

  const loop = () => {
    if (framesRemaining.current > 0) {
      framesRemaining.current--
      invalidate()
      rafId.current = requestAnimationFrame(loop)
    } else {
      rafId.current = null
    }
  }

  const trigger = () => {
    framesRemaining.current = extraFrames
    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(loop)
    }
  }

  useEffect(() => {
    const enableScroll = options?.scroll ?? true
    const enableMouse = options?.mouse ?? true

    if (enableScroll) window.addEventListener('scroll', trigger, { passive: true })
    if (enableMouse) window.addEventListener('mousemove', trigger)

    return () => {
      if (enableScroll) window.removeEventListener('scroll', trigger)
      if (enableMouse) window.removeEventListener('mousemove', trigger)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [options?.scroll, options?.mouse])

  return trigger
}
