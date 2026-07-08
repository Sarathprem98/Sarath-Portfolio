'use client'

import { motion, useReducedMotion } from 'motion/react'
import { about, currentWork, learning } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { Card, CardContent } from '@/components/ui/card'

export function About() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering reliability at scale"
        />

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
          <SectionReveal className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </SectionReveal>

          <SectionReveal delay={0.1} className="grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-gradient text-3xl font-semibold sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}

            <motion.div
              className="col-span-2"
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-brand-blue">Current work</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {currentWork.title}: {currentWork.items.join(', ')}.
                </p>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
              className="col-span-2"
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-brand-blue">Learning</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {learning.items.join(' • ')}
                </p>
              </CardContent>
            </Card>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
