'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { Github, Linkedin } from '@/components/brand-icons'
import { profile } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'
import { SectionReveal } from '@/components/section-reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    window.setTimeout(() => setSent(false), 3500)
    form.reset()
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
            <Card>
              <CardContent className="space-y-4 p-5">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 rounded-2xl p-0 transition-transform hover:-translate-y-1"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary/60 text-brand-blue">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-4 rounded-2xl p-0 transition-transform hover:-translate-y-1"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary/60 text-brand-blue">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl p-0">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary/60 text-brand-purple">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="glass grid h-12 place-items-center rounded-2xl text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="size-5" />
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="glass grid h-12 place-items-center rounded-2xl text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Linkedin className="size-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="gradient-border space-y-4 rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="name"
                    className="mb-1.5 block text-sm text-muted-foreground"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-muted-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-muted-foreground"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-xl"
              >
                {sent ? 'Message sent!' : 'Send message'}
                <Send className="size-4" />
              </Button>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
