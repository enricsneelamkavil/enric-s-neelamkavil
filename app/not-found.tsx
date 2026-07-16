'use client'

import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import ErrorSection from '@/components/not-found/ErrorSection'

// Navbar and Footer are rendered globally by components/common/Layout.tsx
// (via app/layout.tsx) for every route, including this one — do not add them here.
// ThemeProvider is also already supplied by Layout.tsx for every route; this
// nested one is redundant in the normal render path but harmless (same theme
// object, styled-components merges nested providers) — kept per explicit request.

export default function NotFound() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorSection />
    </ThemeProvider>
  )
}
