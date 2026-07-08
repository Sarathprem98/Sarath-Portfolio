'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Bot,
  Check,
  ChevronDown,
  Copy,
  MessageSquareText,
  RefreshCw,
  Send,
  Sparkles,
  X,
} from 'lucide-react'

import { cn } from '@/lib/utils'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  id: string
  role: ChatRole
  content: string
}

type ApiChatMessage = {
  role: ChatRole
  content: string
}

const suggestions = [
  // 'Tell me about yourself',
  'What projects have you worked on?',
//   'Explain your Playwright experience',
  'What cloud technologies do you know?',
//   'What is your infrastructure experience?',
//   'What DevOps tools do you use?',
//   'Show my certifications',
  'Where can I download your resume?',
  'How can I contact you?',
]

const welcomeMessage =
  'Hi, I am Sarath\'s AI assistant. Ask me about experience, skills, projects, certifications, resume details, or contact information.'

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: welcomeMessage,
  },
]

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const hasConversation = useMemo(
    () => messages.some((message) => message.role === 'user'),
    [messages],
  )

  useEffect(() => {
    if (open) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [open])

  useEffect(() => {
    if (!scrollRef.current) {
      return
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, loading])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  const sendMessage = async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || loading) {
      return
    }

    setOpen(true)
    setError(null)
    setInput('')
    setLoading(true)

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
      },
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
      },
    ]

    setMessages(nextMessages)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message.content.trim().length > 0)
            .map<ApiChatMessage>((message) => ({
              role: message.role,
              content: message.content,
            })),
        }),
      })

      const data = (await response.json().catch(() => null)) as
        | { message?: string; reply?: string; error?: string }
        | null

      if (!response.ok) {
        const friendlyError =
          response.status === 429
            ? 'The assistant is taking a short break. Please try again in a moment.'
            : data?.error ?? 'Something went wrong while contacting the assistant.'

        throw new Error(friendlyError)
      }

      const assistantReply = data?.reply ?? data?.message ?? ''
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.role === 'assistant' && message.content === ''
            ? { ...message, content: assistantReply || 'I am unable to generate a response right now.' }
            : message,
        ),
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed.'
      setError(message)
      setMessages((currentMessages) =>
        currentMessages.map((item) =>
          item.role === 'assistant' && item.content === ''
            ? {
                ...item,
                content: `${message}\n\nPlease try again or choose one of the suggestions above.`,
              }
            : item,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages(initialMessages)
    setInput('')
    setError(null)
    setLoading(false)
  }

  const copyMessage = async (message: ChatMessage) => {
    if (message.role !== 'assistant' || !message.content.trim()) {
      return
    }

    await navigator.clipboard.writeText(message.content)
    setCopiedId(message.id)
    window.setTimeout(() => setCopiedId(null), 1800)
  }

  const togglePanel = () => {
    setOpen((current) => !current)
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={open}
        onClick={togglePanel}
        className={cn(
          'fixed right-4 bottom-4 z-50 grid size-14 place-items-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-brand-blue via-brand-purple to-fuchsia-500 text-white shadow-[0_18px_60px_rgba(31,41,55,0.32)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand-blue/60 sm:right-6 sm:bottom-6 sm:size-16',
          open && 'scale-95',
        )}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="absolute inset-[1px] rounded-full bg-background/5 backdrop-blur-xl" />
        <span className="relative flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, scale: 0.7, rotate: -40 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 40 }}
                transition={{ duration: 0.18 }}
              >
                <X className="size-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, scale: 0.7, rotate: 40 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: -40 }}
                transition={{ duration: 0.18 }}
              >
                <Bot className="size-8" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close portfolio assistant overlay"
              className="fixed inset-0 z-40 cursor-default bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="AI Portfolio Assistant"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-h-[min(84vh,820px)] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-[1.6rem] border border-white/15 bg-slate-950/70 text-white shadow-[0_40px_140px_rgba(15,23,42,0.48)] backdrop-blur-3xl sm:right-6 sm:left-auto sm:w-[26rem] md:max-w-[30rem]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.24),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_28%)]" />
              <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue via-brand-purple to-fuchsia-500 text-white shadow-lg shadow-brand-blue/20">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-white">
                      Sarath&apos;s AI Bot
                    </p>
                    <p className="text-xs text-white/65">
                      {/* Ask about skills, projects, certifications, resume, or contact details */}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <RefreshCw className="size-3.5" />
                    {/* Clear */}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white sm:hidden"
                    aria-label="Close assistant"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-y-auto px-3 py-4 sm:px-4" ref={scrollRef}>
                <div className="space-y-3">
                  {!hasConversation ? (
                    <div className="glass rounded-[1.4rem] border-white/10 bg-white/8 p-4 text-sm text-white/85">
                      <div className="mb-3 flex items-center gap-2 text-brand-blue">
                        <MessageSquareText className="size-4" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                          Suggested prompts
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => void sendMessage(suggestion)}
                            className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-left text-xs leading-5 text-white/84 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'group flex gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start',
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/90 to-brand-purple/90 text-white shadow-lg shadow-brand-blue/15">
                          <Bot className="size-4" />
                        </div>
                      ) : null}

                      <div
                        className={cn(
                          'max-w-[85%] rounded-[1.3rem] px-4 py-3 text-sm leading-6 shadow-sm',
                          message.role === 'user'
                            ? 'bg-white text-slate-950'
                            : 'border border-white/10 bg-white/8 text-white backdrop-blur-md',
                        )}
                      >
                        <div className="prose prose-invert max-w-none prose-p:my-0 prose-p:leading-6 prose-headings:mb-2 prose-headings:mt-4 prose-headings:text-white prose-strong:text-white prose-a:text-sky-300 prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-950/85">
                          {message.content.trim() ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ className, children, ...props }) {
                                  const isInline = !className
                                  if (isInline) {
                                    return (
                                      <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em]" {...props}>
                                        {children}
                                      </code>
                                    )
                                  }

                                  return (
                                    <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/85 p-4 text-xs leading-6 text-slate-100">
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    </pre>
                                  )
                                },
                                a({ children, ...props }) {
                                  return (
                                    <a
                                      className="text-sky-300 underline-offset-4 hover:underline"
                                      target="_blank"
                                      rel="noreferrer"
                                      {...props}
                                    >
                                      {children}
                                    </a>
                                  )
                                },
                                ul({ children, ...props }) {
                                  return (
                                    <ul className="my-2 list-disc space-y-1 pl-5" {...props}>
                                      {children}
                                    </ul>
                                  )
                                },
                                ol({ children, ...props }) {
                                  return (
                                    <ol className="my-2 list-decimal space-y-1 pl-5" {...props}>
                                      {children}
                                    </ol>
                                  )
                                },
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            <TypingIndicator />
                          )}
                        </div>

                        {message.role === 'assistant' && message.content.trim() ? (
                          <div className="">
                            {/* <button
                              type="button"
                              onClick={() => void copyMessage(message)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                            >
                              {copiedId === message.id ? (
                                <Check className="size-3.5" />
                              ) : (
                                <Copy className="size-3.5" />
                              )}
                              {copiedId === message.id ? 'Copied' : 'Copy'}
                            </button> */}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative border-t border-white/10 bg-slate-950/50 px-3 py-3 sm:px-4">
                {error ? (
                  <p className="mb-2 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
                    {error}
                  </p>
                ) : null}

                {/* <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.slice(0, 4).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        void sendMessage(suggestion)
                      }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/72 transition hover:bg-white/10 hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div> */}

                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    void sendMessage(input)
                  }}
                  className="flex items-end gap-2"
                >
                  <label htmlFor="portfolio-assistant-input" className="sr-only">
                    Ask the portfolio assistant a question
                  </label>
                  <textarea
                    id="portfolio-assistant-input"
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()
                        void sendMessage(input)
                      }
                    }}
                    rows={1}
                    placeholder="Ask..."
                    className="min-h-12 max-h-40 flex-1 resize-none rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-brand-blue/40 focus:bg-white/10"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="size-4" />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between text-[11px] text-white/45">
                  <span>Enter to send, Shift+Enter for a new line</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-white/5 hover:text-white/70"
                  >
                    <ChevronDown className="size-3.5" />
                    Minimize
                  </button>
                </div>
              </div>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1 text-white/80" aria-label="Assistant is typing">
      <span className="size-2 rounded-full bg-brand-blue animate-bounce [animation-delay:-0.2s]" />
      <span className="size-2 rounded-full bg-brand-purple animate-bounce [animation-delay:-0.1s]" />
      <span className="size-2 rounded-full bg-fuchsia-400 animate-bounce" />
    </div>
  )
}
