'use client'

import { useEffect, useState } from 'react'

import type { PortfolioAssistant as PortfolioAssistantComponent } from '@/components/portfolio-assistant'

export function PortfolioAssistantLoader() {
  const [Assistant, setAssistant] = useState<null | typeof PortfolioAssistantComponent>(null)

  useEffect(() => {
    let mounted = true

    import('@/components/portfolio-assistant').then((module) => {
      if (mounted) {
        setAssistant(() => module.PortfolioAssistant)
      }
    })

    return () => {
      mounted = false
    }
  }, [])

  if (!Assistant) {
    return null
  }

  return <Assistant />
}