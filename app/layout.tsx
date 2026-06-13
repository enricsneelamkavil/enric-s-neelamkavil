import type { Metadata } from 'next'
import {
  Stack_Sans_Headline,
  Stack_Sans_Notch,
  Stack_Sans_Text,
  Instrument_Serif,
} from 'next/font/google'
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
})

const stackSansNotch = Stack_Sans_Notch({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-stack-notch',
  display: 'swap',
})

const stackSansText = Stack_Sans_Text({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-stack-text',
  display: 'swap',
})

// Instrument Serif is weight 400 only (no variable axis)
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

// ─── Page Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Enric S Neelamkavil — Product & Experience Designer',
  description:
    'Portfolio of Enric S Neelamkavil — product designer with award-winning branding expertise, building at the intersection of culture, craft, and technology.',
}

// ─── Root Layout ─────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontClasses = [
    stackSansHeadline.variable,
    stackSansNotch.variable,
    stackSansText.variable,
    instrumentSerif.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontClasses}>
      <body>
        <StyledComponentsRegistry>
          <Layout>{children}</Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
