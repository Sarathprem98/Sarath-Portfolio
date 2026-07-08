"use client"

import { memo, useMemo } from 'react'
import { motion, type Variants, useReducedMotion } from 'motion/react'
import { Card } from '@/components/ui/card'
import { SkillLogo } from '@/components/skill-logo'

type TechnologyCard = {
  category: string
  name: string
  iconSrc: string
  iconAlt: string
}

const techIcon = (fileName: string) => {
  if (fileName.startsWith('http')) return fileName
  return `https://icon.icepanel.io/Technology/svg/${fileName}.svg`
}

const iconFileByTechnology: Record<string, string> = {
  Playwright: 'Playwrite',
  Selenium: 'Selenium',
  Postman: 'Postman',
  Swagger: 'Swagger',
  'REST API': 'OpenAPI',
  JMeter: 'Apache',
  TypeScript: 'TypeScript',
  Python: 'Python',
  Jenkins: 'Jenkins',
  Git: 'Git',
  GitHub: 'https://cdn.simpleicons.org/github/181717/fff',
  Docker: 'Docker',
  'GitHub Actions': 'GitHub-Actions',
  'Google Cloud Platform': 'Google-Cloud',
  'Microsoft Azure': 'Azure',
  'Windows Server': 'Windows-11',
  VMWare: 'vSphere',
  'Server Monitoring': 'Grafana',
  'Alert Management': 'Prometheus',
  'Banking Infrastructure': 'https://cdn.simpleicons.org/visa/1A1F71/fff',
  'SQL': 'Azure-SQL-Database',
  Jira: 'Jira',
  'Azure DevOps': 'Azure-Devops',
  'Claude Code': 'https://cdn.simpleicons.org/claudecode',
  PostgreSQL: 'https://cdn.simpleicons.org/postgresql',
  'Office 365': 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_365_%282022%29.svg',
}

const technologyStacks = [
  {
    category: 'Automation Testing',
    items: ['Playwright', 'Selenium', 'Postman', 'Swagger', 'REST API', 'JMeter'],
  },
  {
    category: 'Programming',
    items: ['TypeScript', 'Python', 'Claude Code', 'PostgreSQL'],
  },
  {
    category: 'CI/CD & DevOps',
    items: ['Jenkins', 'Git', 'GitHub', 'Docker'],
  },
  {
    category: 'Cloud',
    items: [
      'Google Cloud Platform',
      'Microsoft Azure',
      'Windows Server',
      'VMWare',
      'Server Monitoring',
      'Alert Management',
      'Banking Infrastructure',
    ],
  },
  {
    category: 'Tools',
    items: ['Jira', 'Azure DevOps', 'Office 365'],
  },
] satisfies Array<{ category: string; items: string[] }>

const technologyCards: TechnologyCard[] = technologyStacks.flatMap((group) =>
  group.items.map((name) => ({
    category: group.category,
    name,
    iconSrc: techIcon(iconFileByTechnology[name] ?? 'TypeScript'),
    iconAlt: `${name} logo`,
  })),
)

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      duration: 0.2,
      staggerChildren: 0.02,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const TechnologyCardItem = memo(function TechnologyCardItem({ category, name, iconSrc, iconAlt }: TechnologyCard) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group h-full cursor-pointer"
    >
      <Card className="relative flex h-full min-h-[120px] items-center justify-center overflow-hidden rounded-[20px] border border-border/70 bg-card/75 px-3 py-3 text-center shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-200 ease-out sm:min-h-[160px] sm:rounded-[28px] sm:px-4 sm:py-5 sm:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_60%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_55%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-[inherit] border border-transparent bg-[linear-gradient(120deg,rgba(59,130,246,0.24),rgba(168,85,247,0.18))] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        <div className="relative flex flex-col items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-background/70 shadow-inner transition duration-200 group-hover:scale-105 group-hover:border-brand-blue/35 group-hover:bg-background/90 sm:size-13 sm:rounded-2xl">
            <SkillLogo src={iconSrc} alt={iconAlt} className="size-10 shrink-0 object-contain transition-transform duration-200 group-hover:scale-105 sm:size-13" />
          </div>

          <div className="space-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px] sm:tracking-[0.26em]">
              {category}
            </p>
            <h3 className="text-balance text-[0.78rem] font-semibold leading-tight text-foreground sm:text-[0.92rem] sm:text-sm">
              {name}
            </h3>
          </div>
        </div>
      </Card>
    </motion.div>
  )
})

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const cards = useMemo(() => technologyCards, [])

  return (
    <section id="skills" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 mesh-gradient opacity-30 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-blue">
            SKILLS
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A collection of technologies, tools, cloud platforms, and frameworks I use to build scalable automation, infrastructure, and DevOps solutions.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-4 lg:grid-cols-6"
          variants={containerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card) => (
            <TechnologyCardItem
              key={`${card.category}-${card.name}`}
              category={card.category}
              name={card.name}
              iconSrc={card.iconSrc}
              iconAlt={card.iconAlt}
            />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Always learning new technologies to build better software.
        </p>
      </div>
    </section>
  )
}
