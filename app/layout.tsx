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
  title: 'Sarath Prem — Infrastructure Engineer, SDET & Cloud Engineer',
  description:
    'Portfolio of Sarath Prem. I build scalable automation frameworks, maintain enterprise infrastructure, automate testing with Playwright, implement CI/CD pipelines with Jenkins, and work with Google Cloud technologies.',
  keywords: [
    'Sarath Prem',
    'Infrastructure Engineer',
    'SDET',
    'Cloud Engineer',
    'Playwright',
    'Jenkins',
    'CI/CD',
    'Google Cloud',
    'Automation',
  ],
  authors: [{ name: 'Sarath Prem' }],
  creator: 'Sarath Prem',
  openGraph: {
    title: 'Sarath Prem — Infrastructure Engineer, SDET & Cloud Engineer',
    description:
      'I build scalable automation frameworks, maintain enterprise infrastructure, and automate testing with Playwright, Jenkins & Google Cloud.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarath Prem — Infrastructure Engineer, SDET & Cloud Engineer',
    description:
      'I build scalable automation frameworks, maintain enterprise infrastructure, and automate testing with Playwright, Jenkins & Google Cloud.',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a12',
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
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
