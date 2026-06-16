'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import ModeToggle from '@/components/shared/ModeToggle'

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_APPLE = '/icons/apple.svg'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

// ─── Component ────────────────────────────────────────────────────────────────

const IntroSection = () => {
  const [mode, setMode] = useState<Mode>('professional')

  return (
    <Section>

      {/* Welcome pill */}
      <MainLander>
        <WelcomeTag>
          <TagText>About</TagText>
          <AppleIcon src={IMG_APPLE} alt="" aria-hidden="true" />
          <TagText>Enric S Neelamkavil</TagText>
        </WelcomeTag>
      </MainLander>

      {/* Title + subtitle + mode toggle */}
      <Header>
        <CommonHeader>
          <PageTitle>
            About Me<Period>.</Period>
          </PageTitle>
          <PageSubtitle>Two sides of one designer</PageSubtitle>
        </CommonHeader>

        <ModeSwitch>
          <ModeLabel $active={mode === 'professional'} onClick={() => setMode('professional')}>
            PROFESSIONAL
          </ModeLabel>

          <ModeToggle
            selection={mode === 'professional' ? 'left' : 'right'}
            onToggle={(side) => setMode(side === 'left' ? 'professional' : 'personal')}
          />

          <ModeLabel $active={mode === 'personal'} onClick={() => setMode('personal')}>
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
    padding-top: 6rem;
    padding: 6rem 24px 0;
    gap: ${({ theme }) => theme.spacing[6]};
  }

  ${mq.mobile} {
    padding: 40px 24px 0;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

// ── Welcome Tag ───────────────────────────────────────────────────────────────

const MainLander = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tabletDown} {
    max-width: none;
  }
`

const WelcomeTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
`

const TagText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`

const AppleIcon = styled.img`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
`

// ── Header ────────────────────────────────────────────────────────────────────

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
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
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    line-height: ${({ theme }) => theme.lineHeights['2xl']};
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
`

// ── Mode Switch ───────────────────────────────────────────────────────────────

const ModeSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[3]};
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
