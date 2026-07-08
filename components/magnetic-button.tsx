'use client'

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type MagneticButtonProps = ComponentPropsWithoutRef<typeof motion.span> & {
  children: ReactNode
  strength?: number
}

export function MagneticButton({
  children,
  strength = 0.22,
  className,
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.25 })
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.25 })

  return (
    <motion.span
      className={className}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (prefersReducedMotion) return
        const bounds = event.currentTarget.getBoundingClientRect()
        rawX.set((event.clientX - bounds.left - bounds.width / 2) * strength)
        rawY.set((event.clientY - bounds.top - bounds.height / 2) * strength)
      }}
      onPointerLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.025 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.span>
  )
}
