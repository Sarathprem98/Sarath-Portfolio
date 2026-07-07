'use client'

import { useEffect, useState } from 'react'
import { MoonStar, SunMedium } from 'lucide-react'

import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'portfolio-theme'

function applyTheme(theme: 'dark' | 'light') {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  localStorage.setItem(STORAGE_KEY, theme)
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light'
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }, [])

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={() => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
        applyTheme(nextTheme)
      }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </Button>
  )
}