"use client"

import { motion, type Variants } from 'motion/react'
import { Card } from '@/components/ui/card'

type TechnologyCard = {
  category: string
  name: string
  iconSrc: string
  iconAlt: string
}

const technologyStacks = [
  {
    category: 'Automation Testing',
    items: [
      { name: 'Playwright', iconSrc: 'https://icon.icepanel.io/Technology/svg/Playwrite.svg', iconAlt: 'Playwright logo' },
      { name: 'Selenium', iconSrc: 'https://icon.icepanel.io/Technology/svg/Selenium.svg', iconAlt: 'Selenium logo' },
      { name: 'Postman', iconSrc: 'https://icon.icepanel.io/Technology/svg/Postman.svg', iconAlt: 'Postman logo' },
      { name: 'Swagger', iconSrc: 'https://icon.icepanel.io/Technology/svg/Swagger.svg', iconAlt: 'Swagger logo' },
      { name: 'REST API', iconSrc: 'https://icon.icepanel.io/Technology/png-shadow-512/OpenAPI.png', iconAlt: 'OpenAPI logo' },
      { name: 'JMeter', iconSrc: 'https://cdn.simpleicons.org/apachejmeter/FDEE21', iconAlt: 'Apache JMeter logo' },
    ],
  },
  {
    category: 'Programming',
    items: [
      { name: 'TypeScript', iconSrc: 'https://icon.icepanel.io/Technology/svg/TypeScript.svg', iconAlt: 'TypeScript logo' },
      { name: 'Python', iconSrc: 'https://icon.icepanel.io/Technology/svg/Python.svg', iconAlt: 'Python logo' },
      { name: 'SQL', iconSrc: 'https://cdn.simpleicons.org/mysql/4479A1', iconAlt: 'SQL database logo' },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Jenkins', iconSrc: 'https://icon.icepanel.io/Technology/svg/Jenkins.svg', iconAlt: 'Jenkins logo' },
      { name: 'Git', iconSrc: 'https://icon.icepanel.io/Technology/svg/Git.svg', iconAlt: 'Git logo' },
      { name: 'GitHub', iconSrc: 'https://icon.icepanel.io/Technology/png-shadow-512/GitHub.png', iconAlt: 'GitHub logo' },
      { name: 'Docker', iconSrc: 'https://icon.icepanel.io/Technology/svg/Docker.svg', iconAlt: 'Docker logo' },
      { name: 'GitHub Actions', iconSrc: 'https://icon.icepanel.io/Technology/svg/GitHub-Actions.svg', iconAlt: 'GitHub Actions logo' },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'Google Cloud Platform', iconSrc: 'https://icon.icepanel.io/Technology/svg/Google-Cloud.svg', iconAlt: 'Google Cloud logo' },
      { name: 'Microsoft Azure', iconSrc: 'https://icon.icepanel.io/Technology/svg/Azure.svg', iconAlt: 'Azure logo' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      // { name: 'Linux', iconSrc: 'https://icon.icepanel.io/Technology/png-shadow-512/Linux.png', iconAlt: 'Linux logo' },
      { name: 'Windows Server', iconSrc: 'https://icon.icepanel.io/Technology/svg/Windows-8.svg', iconAlt: 'Windows logo' },
      { name: 'VMware', iconSrc: 'https://cdn.simpleicons.org/vmware/607078', iconAlt: 'VMware logo' },
      // { name: 'SCOM', iconSrc: 'https://cdn.simpleicons.org/microsoft/00A4EF', iconAlt: 'Microsoft logo' },
      { name: 'Server Monitoring', iconSrc: 'https://cdn.simpleicons.org/grafana/F46800', iconAlt: 'Grafana logo' },
      { name: 'Server Patching', iconSrc: 'https://cdn.simpleicons.org/ansible/EE0000', iconAlt: 'Ansible logo' },
      { name: 'Alert Management', iconSrc: 'https://cdn.simpleicons.org/prometheus/E6522C', iconAlt: 'Prometheus logo' },
      { name: 'Banking Infrastructure', iconSrc: 'https://cdn.simpleicons.org/visa/1A1F71', iconAlt: 'Visa logo' },
    ],
  },
  {
    category: 'Tools',
    items: [
      // { name: 'VS Code', iconSrc: 'https://icon.icepanel.io/Technology/svg/VS-Code.svg', iconAlt: 'VS Code logo' },
      { name: 'Jira', iconSrc: 'https://icon.icepanel.io/Technology/svg/Jira.svg', iconAlt: 'Jira logo' },
      { name: 'Azure DevOps', iconSrc: 'https://icon.icepanel.io/Technology/svg/Azure-Devops.svg', iconAlt: 'Azure DevOps logo' },
    ],
  },
] satisfies Array<{ category: string; items: Array<Omit<TechnologyCard, 'category'>> }>

const technologyCards: TechnologyCard[] = technologyStacks.flatMap((group) =>
  group.items.map((item) => ({
    category: group.category,
    name: item.name,
    iconSrc: item.iconSrc,
    iconAlt: item.iconAlt,
  })),
)

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

function TechnologyCardItem({ category, name, iconSrc, iconAlt }: TechnologyCard) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group h-full cursor-pointer"
    >
      <Card className="relative flex h-full min-h-[160px] items-center justify-center overflow-hidden rounded-[28px] border border-border/70 bg-card/75 px-4 py-5 text-center shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl transition duration-300 ease-out">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_60%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-[inherit] border border-transparent bg-[linear-gradient(120deg,rgba(59,130,246,0.24),rgba(168,85,247,0.18))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-border/70 bg-background/70 shadow-inner transition duration-300 group-hover:scale-110 group-hover:border-brand-blue/35 group-hover:bg-background/90">
            <img
              src={iconSrc}
              alt={iconAlt}
              className="size-8 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="space-y-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              {category}
            </p>
            <h3 className="text-balance text-[0.92rem] font-semibold leading-tight text-foreground sm:text-sm">
              {name}
            </h3>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 mesh-gradient opacity-30 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
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
          className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {technologyCards.map((card) => (
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
