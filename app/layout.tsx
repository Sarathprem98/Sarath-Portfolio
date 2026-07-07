import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sarath-prem-portfolio.vercel.app'),
  title: 'Sarath Prem — Trainee SDET, Playwright & AI Automation',
  description:
    'Portfolio of Sarath Prem, an IT professional with 6+ years of experience in infrastructure operations, test automation, Playwright, TypeScript, API testing, CI/CD, cloud tools, and AI-assisted QA.',
  keywords: [
    'Sarath Prem',
    'Trainee SDET',
    'Playwright',
    'AI Automation',
    'Playwright',
    'Automation Testing',
    'API Testing',
    'SQL',
    'Jenkins',
    'Azure DevOps',
    'Google Cloud',
    'Azure',
    'TypeScript',
    'QA',
  ],
  authors: [{ name: 'Sarath Prem' }],
  creator: 'Sarath Prem',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sarath Prem — Trainee SDET, Playwright & AI Automation',
    description:
      'I build automation with Playwright and TypeScript, support infrastructure operations, and work across API testing, SQL, CI/CD, and cloud technologies.',
    type: 'website',
    url: '/',
    siteName: 'Sarath Prem Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarath Prem — Trainee SDET, Playwright & AI Automation',
    description:
      'I build automation with Playwright and TypeScript, support infrastructure operations, and work across API testing, SQL, CI/CD, and cloud technologies.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a12' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
