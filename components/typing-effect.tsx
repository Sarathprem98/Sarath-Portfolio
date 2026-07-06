'use client'

import { useEffect, useState } from 'react'

type TypingEffectProps = {
  words: string[]
  className?: string
}

export function TypingEffect({ words, className }: TypingEffectProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 45 : 90

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400)
        }
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className={className}>
      <span className="text-gradient">{text}</span>
      <span className="animate-blink ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-primary align-middle" />
    </span>
  )
}
