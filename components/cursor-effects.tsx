'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect } from 'react'

export function CursorEffects() {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 26, mass: 0.18 })
  const y = useSpring(rawY, { stiffness: 180, damping: 26, mass: 0.18 })

  useEffect(() => {
    const root = document.documentElement
    if (prefersReducedMotion) return

    let frame = 0
    rawX.set(window.innerWidth / 2)
    rawY.set(window.innerHeight * 0.2)

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', `${event.clientX}px`)
        root.style.setProperty('--cursor-y', `${event.clientY}px`)
        rawX.set(event.clientX)
        rawY.set(event.clientY)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [prefersReducedMotion, rawX, rawY])

  if (prefersReducedMotion) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <motion.div
        className="cursor-glow absolute size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[120px] will-change-transform"
        style={{ x, y }}
      />
      <motion.div
        className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/30 bg-brand-purple/20 shadow-[0_0_30px_rgba(157,101,255,0.55)] will-change-transform"
        style={{ x, y }}
      />
    </div>
  )
}
