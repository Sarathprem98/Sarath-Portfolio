import { skills } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="The stack I build with"
          description="A toolkit spanning test automation, DevOps, and cloud infrastructure — refined across production systems."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {skills.map((group, i) => (
            <SectionReveal
              key={group.category}
              delay={i * 0.05}
              className="gradient-border h-full rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <h3 className="font-mono text-sm font-medium text-brand-blue">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-brand-purple/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
