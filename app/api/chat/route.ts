import { NextRequest, NextResponse } from 'next/server'
import OpenAI from "openai";

import { about, certifications, experience, projects, profile, skills } from '@/lib/data'

export const runtime = 'nodejs'

type ChatMessage = {
    role: 'user' | 'assistant' | 'system'
    content: string
}

type ChatRequestBody = {
    messages?: ChatMessage[]
    message?: string
}

type RateLimitRecord = {
    count: number
    resetAt: number
}

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 8
const rateLimitStore = new Map<string, RateLimitRecord>()

const systemPrompt = `You are Sarath Prem's professional portfolio assistant.

Answer only questions related to Sarath Prem's experience, skills, projects, certifications, resume, and contact information.

If asked something unrelated to the portfolio, respond exactly with:
"I'm designed to answer questions about Sarath Prem's experience, skills, projects, certifications, and portfolio."

Tone:
- Professional
- Friendly
- Concise
- Recruiter-ready

Identity:
- Name: Sarath Prem
- Role: Infrastructure Engineer | SDET | Cloud Enthusiast

Professional Summary:
${about.paragraphs.join(' ')}

Skills:
${skills.flatMap((group) => group.items).join(', ')}

Projects:
${projects.map((project) => `- ${project.title}: ${project.description}`).join('\n')}

Certifications:
${certifications.map((certification) => `- ${certification.title} (${certification.issuer}, ${certification.year})`).join('\n')}

Resume:
- The resume is available at ${profile.resume}

Contact:
- Email: ${profile.email}
- Phone: ${profile.phone}
- Location: ${profile.location}
- GitHub: ${profile.socials.github}
- LinkedIn: ${profile.socials.linkedin}

Background:
${experience
        .map((item) => `- ${item.role} at ${item.company} (${item.period}): ${item.description}`)
        .join('\n')}
`

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured on the server." },
                { status: 500 }
            );
        }

        const openai = new OpenAI({
            apiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });


        const rateLimitResult = applyRateLimit(request)
        if (rateLimitResult) {
            return rateLimitResult
        }

        const body = (await request.json().catch(() => null)) as ChatRequestBody | null
        const incomingMessages = sanitizeMessages(body)

        if (!incomingMessages.length) {
            return NextResponse.json(
                { error: 'Please send a message to the portfolio assistant.' },
                { status: 400 },
            )
        }

        const conversation = trimConversation(incomingMessages)

        const history = conversation
            .map((message) => {
                const role = message.role === "assistant" ? "model" : "user";

                return `${role}: ${message.content}`;
            })
            .join("\n");

        const prompt = `${systemPrompt}
        
        Conversation:

${history}
}

Assistant:
`;

        const completion = await openai.chat.completions.create({
            model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.4,
        });

        const reply = completion.choices[0]?.message?.content?.trim();

        if (!reply) {
            return NextResponse.json(
                { error: 'The assistant did not return a response.' },
                { status: 502 },
            )
        }

        return NextResponse.json({ reply })
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            return NextResponse.json(
                {
                    error: error.message,
                },
                {
                    status: 500,
                }
            );
        }
        const status = error.status ?? 500

        if (status === 429) {
            return NextResponse.json(
                { error: 'The assistant is receiving too many requests right now. Please try again shortly.' },
                { status: 429 },
            )
        }

        return NextResponse.json(
            { error: 'The AI service is temporarily unavailable.' },
            { status: status >= 400 && status < 600 ? status : 500 },
        )
    }
    return NextResponse.json(
        {
            error: "Unexpected server error while generating a response.",
        },
        {
            status: 500,
        }
    );


    function sanitizeMessages(body: ChatRequestBody | null): { role: 'user' | 'assistant'; content: string }[] {
        const rawMessages = Array.isArray(body?.messages)
            ? body?.messages
            : body?.message
                ? [{ role: 'user' as const, content: body.message }]
                : []

        return rawMessages
            .filter((message): message is { role: 'user' | 'assistant'; content: string } => {
                return (
                    (message.role === 'user' || message.role === 'assistant') &&
                    typeof message.content === 'string' &&
                    message.content.trim().length > 0
                )
            })
            .slice(-12)
    }

    function trimConversation(messages: { role: 'user' | 'assistant'; content: string }[]) {
        return messages
            .map((message) => ({ role: message.role, content: message.content.trim().slice(0, 4000) }))
            .filter((message) => message.content.length > 0)
    }

    function applyRateLimit(request: NextRequest) {
        const forwardedFor = request.headers.get('x-forwarded-for')
        const key = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'anonymous'
        const now = Date.now()
        const entry = rateLimitStore.get(key)

        if (!entry || entry.resetAt <= now) {
            rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
            return null
        }

        if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
            const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000))
            return NextResponse.json(
                {
                    error: 'Rate limit exceeded. Please wait a moment before sending another message.',
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(retryAfter),
                    },
                },
            )
        }

        entry.count += 1
        rateLimitStore.set(key, entry)
        return null
    }
};