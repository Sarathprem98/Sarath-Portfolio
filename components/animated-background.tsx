'use client'

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import { useEffect } from 'react'

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 55, damping: 28, mass: 0.7 })
  const y = useSpring(rawY, { stiffness: 55, damping: 28, mass: 0.7 })
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`

  useEffect(() => {
    if (prefersReducedMotion) return

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 24)
      rawY.set((event.clientY / window.innerHeight - 0.5) * 24)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [prefersReducedMotion, rawX, rawY])

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="mesh-gradient absolute inset-0 opacity-90" />
      <motion.div
        className="absolute -top-44 -left-36 size-[38rem] rounded-full bg-brand-blue/20 blur-[140px] will-change-transform"
        style={{ transform }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.07, 1], opacity: [0.7, 0.95, 0.7] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 -right-36 size-[34rem] rounded-full bg-brand-purple/20 blur-[150px] will-change-transform"
        style={{ x, y }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 0.94, 1], opacity: [0.65, 0.9, 0.65] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-brand-blue/10 blur-[130px] will-change-transform"
        style={{ x, y }}
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="section-grid absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />
    </div>
  )
}
