'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { MagneticButton } from '@/components/magnetic-button'
import { Button } from '@/components/ui/button'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['#home', ...links.map((link) => link.href)]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        )
        const section = visible[0]
        if (section?.target.id) {
          setActive(`#${section.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    sections.forEach((selector) => {
      const target = document.querySelector(selector)
      if (target) observer.observe(target)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          'flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6',
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent',
        )}
        aria-label="Primary"
      >
        <a
          href="#home"
          className="flex items-center gap-3 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple text-xs font-bold text-primary-foreground shadow-lg shadow-brand-blue/30">
            SP
          </span>
          <span className="hidden sm:inline">Home</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                data-active={active === link.href}
                aria-current={active === link.href ? 'page' : undefined}
              >
                {link.label}
                <span
                  className={cn(
                    'mt-1 block h-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all duration-300',
                    active === link.href ? 'w-full opacity-100' : 'w-0 opacity-0',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <a href="#contact" className="hidden sm:inline-flex">
            <MagneticButton className="inline-flex">
              <Button className="w-full">
                Let&apos;s talk
              </Button>
            </MagneticButton>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-border bg-background/60 text-foreground lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-x-4 top-20 z-50 lg:hidden"
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="glass overflow-hidden rounded-2xl p-3">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-border/70 pt-3">
              <ThemeToggle />
              <a
                href="#contact"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                <MagneticButton className="flex">
                  <Button className="w-full">
                    Let&apos;s talk
                  </Button>
                </MagneticButton>
              </a>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  )
}
