'use client'

import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { Github, Linkedin } from '@/components/brand-icons'
import { profile } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    e.currentTarget.reset()
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something reliable"
          description="Have a project, role, or idea in mind? Send a message and I'll get back to you."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <SectionReveal className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="glass flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-secondary/60 text-brand-blue">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </a>

            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-secondary/60 text-brand-purple">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass grid size-12 flex-1 place-items-center rounded-2xl text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="size-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass grid size-12 flex-1 place-items-center rounded-2xl text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="gradient-border space-y-4 rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-blue"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-blue"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-blue"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
              >
                {sent ? 'Message sent!' : 'Send message'}
                <Send className="size-4" />
              </button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
