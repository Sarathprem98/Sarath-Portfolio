'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowDown, Cloud, Download, TerminalSquare, TestTube2 } from 'lucide-react'
import { Github, Linkedin } from '@/components/brand-icons'
import { profile } from '@/lib/data'
import { TypingEffect } from '@/components/typing-effect'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const floatingIcons = [
  { Icon: Cloud, className: 'left-[-1.5rem] top-6', delay: '0s' },
  { Icon: TestTube2, className: 'right-[-1rem] top-16', delay: '1.2s' },
  { Icon: TerminalSquare, className: 'left-2 bottom-4', delay: '0.6s' },
]

const highlights = [
  'Automation architecture',
  'Release quality',
  'Cloud operations',
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-28 pb-16 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Badge className="bg-secondary/70 px-4 py-1.5 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
            Available for new opportunities
          </Badge>

          <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-4 min-h-[2rem] text-lg font-medium text-foreground/95 sm:text-2xl">
            <TypingEffect words={profile.roles} />
          </p>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {profile.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects">
              <Button size="lg" className="rounded-xl">
                View projects
                <ArrowDown className="size-4" />
              </Button>
            </a>
            <a
              href={profile.resume}
              download="Sarath_Prem_Resume.pdf"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                <Download className="size-4" />
                Download Resume
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/70 bg-secondary/45 px-3 py-1.5 text-sm text-muted-foreground"
              >
                {item}
              </span>
            ))}
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
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Card className="relative overflow-hidden rounded-[2rem] p-3">
            <CardContent className="relative p-0">
              <div className="absolute inset-0 mesh-gradient opacity-70" />
              <div className="absolute inset-0 bg-background/10 backdrop-blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.7rem] border border-border/60 bg-card/80 p-4">
                <div className="relative overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="/avatar.jpg"
                    alt="Portrait of Sarath Prem"
                    width={853}
                    height={853}
                    priority
                    className="aspect-square h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Reliable delivery', 'CI/CD'],
                    ['End-to-end coverage', 'Testing'],
                    ['Scalable systems', 'Cloud'],
                  ].map(([title, label]) => (
                    <div key={title} className="glass rounded-2xl p-4 text-left">
                      <p className="text-sm font-medium text-foreground">{title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

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
