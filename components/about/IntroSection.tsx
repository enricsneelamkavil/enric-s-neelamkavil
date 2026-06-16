'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_APPLE = '/icons/apple.svg'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

// ─── Inline SVG ───────────────────────────────────────────────────────────────
// Uses currentColor so theme color is applied via CSS on the styled wrapper.

const ArrowSvg = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.68848 7.55273C2.56797 7.67034 2.5 7.8316 2.5 8C2.5 8.1684 2.56797 8.32966 2.68848 8.44727L7.82227 13.4473L8.25879 13L8.69434 12.5527L4.66211 8.625H14.125V7.375H4.66211L8.69434 3.44727L8.25879 3L7.82227 2.55273L2.68848 7.55273Z"
      fill="currentColor"
    />
  </svg>
)

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

          <TogglePill>
            <ToggleBtn
              $selected={mode === 'professional'}
              onClick={() => setMode('professional')}
              aria-label="Switch to Professional mode"
            >
              {mode === 'professional' && <ArrowIcon $flip />}
            </ToggleBtn>
            <ToggleBtn
              $selected={mode === 'personal'}
              onClick={() => setMode('personal')}
              aria-label="Switch to Personal mode"
            >
              {mode === 'personal' && <ArrowIcon />}
            </ToggleBtn>
          </TogglePill>

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

const TogglePill = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: 6px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
`

interface ToggleBtnProps {
  $selected: boolean
}

const ToggleBtn = styled.button<ToggleBtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.surface.primary : 'transparent'};
  border: ${({ theme, $selected }) =>
    $selected ? `1px solid ${theme.colors.border.tertiary}` : 'none'};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 32px;
    height: 32px;
  }
`

interface ArrowIconProps {
  $flip?: boolean
}

const ArrowIcon = styled(ArrowSvg)<ArrowIconProps>`
  color: ${({ theme }) => theme.colors.icon.primary};
  transform: ${({ $flip }) => ($flip ? 'scaleX(-1)' : 'none')};
  display: block;
  flex-shrink: 0;
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
