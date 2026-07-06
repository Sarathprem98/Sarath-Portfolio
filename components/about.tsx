import { about } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'

export function About() {
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
              <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </SectionReveal>

          <SectionReveal delay={0.1} className="grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
              >
                <div className="text-gradient text-3xl font-semibold sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
