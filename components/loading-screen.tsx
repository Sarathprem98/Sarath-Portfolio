'use client'

import { motion } from 'motion/react'

export function LoadingScreen() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        className="glass w-full max-w-lg rounded-3xl p-8 text-center"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <motion.div
          className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-[1px]"
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="h-full w-full rounded-2xl bg-background/90" />
        </motion.div>
        <div className="mx-auto mt-6 h-4 w-40 animate-pulse rounded-full bg-secondary" />
        <div className="mt-3 h-3 w-64 animate-pulse rounded-full bg-secondary/80 mx-auto" />
        <div className="mt-8 space-y-3">
          <div className="h-3 animate-pulse rounded-full bg-secondary/70" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-secondary/70" />
          <div className="h-3 w-4/6 animate-pulse rounded-full bg-secondary/70" />
        </div>
      </motion.div>
    </div>
  )
}
