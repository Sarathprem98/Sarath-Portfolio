'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0.18 }}
      transition={{ duration: 0.58, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
