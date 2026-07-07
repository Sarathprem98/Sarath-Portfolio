import { Github, Linkedin, Twitter } from '@/components/brand-icons'
import { profile } from '@/lib/data'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/70 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <a href="#home" className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple text-xs font-bold text-primary-foreground">
              SP
            </span>
            <span className="font-mono text-sm font-semibold">{profile.name}</span>
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            {profile.headline}
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-4" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={profile.socials.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <Twitter className="size-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-4 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js 15, Tailwind CSS, shadcn/ui and Motion.
        </p>
        <a href="#home">
          <Button variant="outline" size="sm" className="rounded-full">
            Back to top
          </Button>
        </a>
      </div>
    </footer>
  )
}
