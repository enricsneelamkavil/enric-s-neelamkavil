import type { Metadata } from 'next'
import {
  Stack_Sans_Headline,
  Stack_Sans_Notch,
} from 'next/font/google'
import { GlimmProvider } from 'glimm/react'
import StyledComponentsRegistry from '@/styles/StyledComponentsRegistry'
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
    icon: '/favicon.svg',
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
      <body>
        <GlimmProvider palette="prism" sweepMs={1000} outroMs={650}>
          <StyledComponentsRegistry>
            <Layout>{children}</Layout>
          </StyledComponentsRegistry>
        </GlimmProvider>
      </body>
    </html>
  )
}
