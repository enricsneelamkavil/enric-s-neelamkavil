import type { Metadata } from 'next'
import {
  Stack_Sans_Headline,
  Stack_Sans_Notch,
} from 'next/font/google'
import { GlimmProvider } from 'glimm/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry'
import Clarity from '@microsoft/clarity'
import Layout from '@/components/common/Layout'
import './globals.css'

// ─── Google Fonts via next/font ───────────────────────────────────────────────
// All Stack Sans families support variable weight axes (200–700)
// Exposed as CSS custom properties so styled-components theme can reference them

const stackSansHeadline = Stack_Sans_Headline({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-stack-headline',
  display: 'swap',
  adjustFontFallback: false,
})

const stackSansNotch = Stack_Sans_Notch({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-stack-notch',
  display: 'swap',
  adjustFontFallback: false,
})


// ─── Page Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Enric S Neelamkavil — Product & Experience Designer',
  description:
    'Portfolio of Enric S Neelamkavil — product designer with award-winning branding expertise, building at the intersection of culture, craft, and technology.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  verification: {
    other: {
      'p:domain_verify': '111da2a58b58da45e14de9ebeece15c7',
    },
  },
}



// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontClasses = [
    stackSansHeadline.variable,
    stackSansNotch.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontClasses}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Enric's Portfolio" />
        <meta name="application-name" content="Enric's Portfolio" />
        <link rel="mask-icon" href="/favicon-dark.svg" color="#E8342A" />
      </head>
      <body>
        <GlimmProvider palette="prism" sweepMs={1000} outroMs={650}>
          <StyledComponentsRegistry>
            <Layout>{children}</Layout>
          </StyledComponentsRegistry>
        </GlimmProvider>
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId="G-TWK0PPM2FC" />
      </body>
    </html>
  )
}
