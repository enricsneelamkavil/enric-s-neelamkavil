'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import ModeToggle from '@/components/shared/ModeToggle'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

// ─── Component ────────────────────────────────────────────────────────────────

const IntroSection = () => {
  const [mode, setMode] = useState<Mode>('professional')

  return (
    <Section>

      {/* Title + subtitle + mode toggle */}
      <Header>
        <CommonHeader>
          <PageTitle>
            About Me<Period>.</Period>
          </PageTitle>
          <PageSubtitle>Two sides of one designer</PageSubtitle>
        </CommonHeader>

        <ModeSwitch>
          <ModeLabel type="button" $active={mode === 'professional'} onClick={() => setMode('professional')}>
            PROFESSIONAL
          </ModeLabel>

          <ModeToggle
            selection={mode === 'professional' ? 'left' : 'right'}
            onToggle={(side) => setMode(side === 'left' ? 'professional' : 'personal')}
          />

          <ModeLabel type="button" $active={mode === 'personal'} onClick={() => setMode('personal')}>
            PERSONAL
          </ModeLabel>
        </ModeSwitch>

        {mode === 'personal' && (
          <PersonalNote>Personal mode coming soon.</PersonalNote>
        )}
      </Header>

    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 8.75rem;
  gap: ${({ theme }) => theme.spacing[8]};

  ${mq.tablet} {
    padding: 6rem 0 0;
    gap: ${({ theme }) => theme.spacing[6]};
  }

  ${mq.mobile} {
    padding: 40px 0 0;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

// ── Header ────────────────────────────────────────────────────────────────────

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tabletDown} {
    max-width: none;
  }
`

const CommonHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`

const PageTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: ${({ theme }) => theme.lineHeights['3xl']};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tightest};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  width: 100%;

  ${mq.tablet} {
    font-size: 3rem;
    line-height: 3.75rem;
  }

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 40px;
  }
`

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PageSubtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 16px;
  }
`

// ── Mode Switch ───────────────────────────────────────────────────────────────

const ModeSwitch = styled.div`
  display: none; /* Hidden as requested, do not delete */
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

interface ModeLabelProps {
  $active: boolean
}

const ModeLabel = styled.button<ModeLabelProps>`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.highlight : theme.colors.text.primary};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }
`

// ── Personal placeholder ──────────────────────────────────────────────────────

const PersonalNote = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-style: italic;
`

export default IntroSection
