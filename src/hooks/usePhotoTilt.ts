import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Subtle 3D tilt on hover for gallery cards */
export function usePhotoTilt(intensity = 7) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const reduce = useReducedMotion()

  function onMove(e: MouseEvent) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTransform(
      `perspective(900px) rotateX(${(-py * intensity).toFixed(2)}deg) rotateY(${(px * intensity).toFixed(2)}deg) scale3d(1.02,1.02,1.02)`,
    )
  }

  function onLeave() {
    setTransform('')
  }

  const style: CSSProperties = transform
    ? {
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }
    : { transition: 'transform 0.45s ease-out' }

  return { ref, style, onMove, onLeave }
}
