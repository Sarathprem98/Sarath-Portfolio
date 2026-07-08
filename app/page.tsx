import { CursorEffects } from '@/components/cursor-effects'
import { AnimatedBackground } from '@/components/animated-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { SkillsLazySection } from '@/components/skills-lazy'
import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { Achievements } from '@/components/achievements'
import { GithubStats } from '@/components/github-stats'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { PortfolioAssistantLoader } from '@/components/portfolio-assistant-loader'

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <CursorEffects />
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsLazySection />
        <Experience />
        <Projects />
        <Achievements />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
      <PortfolioAssistantLoader />
    </>
  )
}
