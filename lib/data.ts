export const profile = {
  name: 'Sarath Prem',
  roles: [
    'Infrastructure Engineer',
    'SDET',
    'Cloud Engineer',
    'Automation Architect',
  ],
  headline: 'Infrastructure Engineer | SDET | Cloud Engineer',
  description:
    'I build scalable automation frameworks, maintain enterprise infrastructure, automate testing using Playwright, implement CI/CD pipelines with Jenkins, and work with Google Cloud technologies.',
  email: 'sarath.prem@example.com',
  location: 'Bengaluru, India',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
}

export const about = {
  paragraphs: [
    'I am an engineer who lives at the intersection of quality, infrastructure, and the cloud. My focus is designing automation systems and platforms that let teams ship faster with confidence.',
    'From building resilient test frameworks with Playwright to orchestrating CI/CD pipelines and managing enterprise infrastructure on Google Cloud, I care deeply about reliability, observability, and developer experience.',
  ],
  stats: [
    { value: '6+', label: 'Years Experience' },
    { value: '40+', label: 'Pipelines Built' },
    { value: '1M+', label: 'Tests Automated' },
    { value: '99.9%', label: 'Uptime Delivered' },
  ],
}

export const skills: { category: string; items: string[] }[] = [
  {
    category: 'Test Automation',
    items: ['Playwright', 'Selenium', 'Cypress', 'REST Assured', 'JUnit', 'TestNG'],
  },
  {
    category: 'CI/CD & DevOps',
    items: ['Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'],
  },
  {
    category: 'Cloud & Infrastructure',
    items: ['Google Cloud', 'GKE', 'Cloud Build', 'Pub/Sub', 'Compute Engine', 'IAM'],
  },
  {
    category: 'Languages & Tooling',
    items: ['TypeScript', 'Python', 'Java', 'Bash', 'Go', 'SQL'],
  },
]

export const experience = [
  {
    role: 'Senior Infrastructure Engineer',
    company: 'Enterprise Cloud Platform',
    period: '2023 — Present',
    description:
      'Lead the design of scalable automation frameworks and manage multi-region infrastructure on Google Cloud, driving reliability and cost efficiency across teams.',
    tags: ['GKE', 'Terraform', 'Jenkins'],
  },
  {
    role: 'Software Development Engineer in Test',
    company: 'FinTech Products',
    period: '2021 — 2023',
    description:
      'Built end-to-end Playwright automation suites and integrated them into CI/CD pipelines, reducing regression cycles from days to hours.',
    tags: ['Playwright', 'TypeScript', 'CI/CD'],
  },
  {
    role: 'Automation Engineer',
    company: 'SaaS Startup',
    period: '2019 — 2021',
    description:
      'Established the automated testing culture from the ground up, implementing frameworks, dashboards, and quality gates for release confidence.',
    tags: ['Selenium', 'Python', 'Docker'],
  },
]

export const projects = [
  {
    title: 'Playwright Automation Framework',
    description:
      'A modular, data-driven end-to-end testing framework with parallel execution, rich reporting, and self-healing selectors.',
    image: '/project-automation.png',
    tags: ['Playwright', 'TypeScript', 'Allure'],
    link: '#',
  },
  {
    title: 'CI/CD Pipeline Orchestration',
    description:
      'Enterprise Jenkins pipeline system with reusable shared libraries, automated gates, and blue-green deployments.',
    image: '/project-cicd.png',
    tags: ['Jenkins', 'Docker', 'Groovy'],
    link: '#',
  },
  {
    title: 'Cloud Infrastructure Platform',
    description:
      'Infrastructure-as-code platform on Google Cloud provisioning GKE clusters, networking, and observability by default.',
    image: '/project-cloud.png',
    tags: ['Google Cloud', 'Terraform', 'GKE'],
    link: '#',
  },
]

export const certifications = [
  {
    title: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    year: '2024',
  },
  {
    title: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    year: '2023',
  },
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'CNCF',
    year: '2023',
  },
  {
    title: 'ISTQB Advanced Test Automation Engineer',
    issuer: 'ISTQB',
    year: '2022',
  },
]

export const githubStats = {
  username: '@sarathprem',
  stats: [
    { value: '1.2k', label: 'Contributions' },
    { value: '48', label: 'Repositories' },
    { value: '320', label: 'Stars' },
    { value: '85', label: 'Pull Requests' },
  ],
  languages: [
    { name: 'TypeScript', percent: 42 },
    { name: 'Python', percent: 28 },
    { name: 'Java', percent: 18 },
    { name: 'Go', percent: 12 },
  ],
}
