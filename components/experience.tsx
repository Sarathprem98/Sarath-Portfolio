import { experience } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Experience" title="Where I've made an impact" />

        <div className="relative mt-14">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-brand-blue via-brand-purple to-transparent sm:left-3.5" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <SectionReveal
                key={item.role}
                delay={i * 0.08}
                className="relative pl-12 sm:pl-14"
              >
                <span className="absolute left-0 top-1.5 grid size-7 place-items-center rounded-full border border-border bg-background sm:size-8">
                  <span className="size-2.5 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple" />
                </span>

                <Card>
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.role}</h3>
                      <p className="mt-1 text-sm text-brand-blue">{item.company}</p>
                    </div>
                    <span className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-pretty leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-5 space-y-3 text-sm text-foreground/90">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 size-1.5 rounded-full bg-brand-purple" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
