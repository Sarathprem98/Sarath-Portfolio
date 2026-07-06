import { BadgeCheck } from 'lucide-react'
import { certifications } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & recognition"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <SectionReveal
              key={cert.title}
              delay={i * 0.05}
              className="glass flex items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 text-brand-blue">
                <BadgeCheck className="size-5" />
              </span>
              <div>
                <h3 className="font-medium leading-snug">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
