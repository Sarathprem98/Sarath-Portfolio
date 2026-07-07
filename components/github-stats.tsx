import { Github } from '@/components/brand-icons'
import { githubStats, profile } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { getGitHubProfile } from '@/lib/github'
import { Card } from '@/components/ui/card'

export async function GithubStats() {
  const github = await getGitHubProfile(profile.githubUsername)

  return (
    <section id="github" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="GitHub"
          title="Building in the open"
          description="A snapshot of my open-source activity I work with most."
        />

        <SectionReveal className="mt-14">
          <Card className="rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-secondary/60 text-foreground">
                  <Github className="size-5" />
                </span>
                <div>
                  <p className="font-medium">{profile.name}</p>
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm text-muted-foreground transition-colors hover:text-brand-blue"
                  >
                    {github.user?.login ? `@${github.user.login}` : githubStats.username}
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Live GitHub API snapshot with offline fallback.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: github.stats.contributions, label: 'Contributions' },
                { value: github.stats.repositories, label: 'Repositories' },
                { value: github.stats.stars, label: 'Stars' },
                { value: github.stats.followers, label: 'Followers' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-secondary/40 p-5 text-center"
                >
                  <div className="text-gradient text-2xl font-semibold sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-8 space-y-4">
              {(github.topLanguages.length ? github.topLanguages : githubStats.languages).map((lang) => (
                <div key={lang.name} className="">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-foreground/90">{lang.name}</span>
                    {lang.percent !== undefined && (
                      <span className="font-mono text-muted-foreground">{lang.percent}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div> */}
          </Card>
        </SectionReveal>
      </div>
    </section>
  )
}
