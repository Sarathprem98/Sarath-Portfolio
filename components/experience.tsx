import { experience } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'

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

                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-brand-blue">{item.company}</p>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
