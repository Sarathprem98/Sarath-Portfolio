'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Projects() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Projects Worked For"
          title="Clients and Teams"
          description="Systems and frameworks I've worked to make engineering teams faster and more reliable."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <SectionReveal
              key={project.title}
              delay={i * 0.08}
              className="group h-full"
            >
              <motion.div
                className="h-full"
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Featured project
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{project.outcome}</p>
                  </div> */}
                </div>

                <CardContent className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-blue" />
                  </div>
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    aria-label={`Open ${project.title}`}
                  >
                    <Button
                      variant="ghost"
                      className="mt-6 w-fit px-0 text-foreground hover:bg-transparent hover:text-brand-blue"
                    >
                      View details
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
