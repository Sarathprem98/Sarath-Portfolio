'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const SkillsSection = dynamic(() => import('@/components/skills').then((mod) => mod.Skills), {
  ssr: false,
  loading: () => (
    <section id="skills" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto h-3 w-24 animate-pulse rounded-full bg-muted/60" />
          <div className="mx-auto mt-4 h-8 w-56 animate-pulse rounded-full bg-muted/40" />
          <div className="mx-auto mt-4 h-4 max-w-xl animate-pulse rounded-full bg-muted/30" />
          <div className="mx-auto mt-4 h-4 max-w-lg animate-pulse rounded-full bg-muted/20" />
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[160px] animate-pulse rounded-[28px] border border-border/50 bg-card/70"
            />
          ))}
        </div>
      </div>
    </section>
  ),
})

export function SkillsLazySection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '220px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <SkillsSection />
      ) : (
        <section id="skills" className="relative overflow-hidden px-4 py-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto h-3 w-24 rounded-full bg-muted/50" />
              <div className="mx-auto mt-4 h-8 w-56 rounded-full bg-muted/35" />
              <div className="mx-auto mt-4 h-4 max-w-xl rounded-full bg-muted/25" />
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[160px] rounded-[28px] border border-border/40 bg-card/50"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
