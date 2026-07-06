'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import {
  ArrowDown,
  Cloud,
  Download,
  TerminalSquare,
  TestTube2,
} from 'lucide-react'
import { Github, Linkedin } from '@/components/brand-icons'
import { profile } from '@/lib/data'
import { TypingEffect } from '@/components/typing-effect'

const floatingIcons = [
  { Icon: Cloud, className: 'left-[-1.5rem] top-6', delay: '0s' },
  { Icon: TestTube2, className: 'right-[-1rem] top-16', delay: '1.2s' },
  { Icon: TerminalSquare, className: 'left-2 bottom-4', delay: '0.6s' },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-28 pb-16 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand-blue" />
            Available for new opportunities
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 min-h-[2rem] text-lg font-medium sm:text-2xl">
            <TypingEffect words={profile.roles} />
          </p>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {profile.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowDown className="size-4" />
            </a>
            <a
              href="#"
              className="gradient-border inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-foreground transition-transform hover:scale-[1.03]"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-5" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xs"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="gradient-border animate-float overflow-hidden rounded-3xl">
            <Image
              src="/avatar.png"
              alt="Portrait of Sarath Prem"
              width={480}
              height={480}
              priority
              className="aspect-square h-auto w-full object-cover"
            />
          </div>

          {floatingIcons.map(({ Icon, className, delay }, i) => (
            <div
              key={i}
              className={`animate-float absolute ${className} glass grid size-12 place-items-center rounded-2xl text-brand-blue`}
              style={{ animationDelay: delay }}
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
