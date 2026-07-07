'use client'

import { useEffect } from 'react'

export function CursorEffects() {
  useEffect(() => {
    const root = document.documentElement
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let frame = 0

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', `${event.clientX}px`)
        root.style.setProperty('--cursor-y', `${event.clientY}px`)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="cursor-glow absolute left-[var(--cursor-x,50%)] top-[var(--cursor-y,20%)] size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[120px] transition-[left,top] duration-200" />
      <div className="absolute left-[var(--cursor-x,50%)] top-[var(--cursor-y,20%)] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/30 bg-brand-purple/20 shadow-[0_0_30px_rgba(157,101,255,0.55)]" />
    </div>
  )
}