import { Trophy } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { Card, CardContent } from '@/components/ui/card'

const achievements = [
  {
    title: '6+ years across tech roles',
    description:
      'Built experience in support, data analysis, infrastructure engineering, and test automation across enterprise environments.',
  },
  {
    title: 'Playwright and AI-focused QA',
    description:
      'Working on automation, API testing, SQL validation, performance testing, and AI-assisted quality engineering.',
  },
  {
    title: 'Cloud and operations strength',
    description:
      'Hands-on work with Azure, Google Cloud, VMware, Windows Server, SCOM, SCCM, and Office 365 operations.',
  },
]

export function Achievements() {
  return (
    <section id="achievements" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Achievements"
          title="What I bring to the table"
          description="A concise view of the strengths, experience, and focus areas I bring into modern QA and infrastructure work."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {achievements.map((item, index) => (
            <SectionReveal
              key={item.title}
              delay={index * 0.05}
              className="h-full"
            >
              <Card className="h-full transition-transform hover:-translate-y-1">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 text-brand-blue">
                    <Trophy className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
