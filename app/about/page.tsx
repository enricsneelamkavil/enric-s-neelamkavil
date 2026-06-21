'use client'

import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ── Shared ────────────────────────────────────────────────────────────────────
import IntroSection from '@/components/about/IntroSection'
import ProfileImage from '@/components/about/ProfileImage'
import ModeToggle from '@/components/shared/ModeToggle'

// ── Professional ──────────────────────────────────────────────────────────────
import AboutDescription from '@/components/about/AboutDescription'
import MyTools from '@/components/about/MyTools'
import Journey from '@/components/about/Journey'
import ProfessionalTimeline from '@/components/about/ProfessionalTimeline'
import ProfessionalTimelineMobile from '@/components/about/ProfessionalTimelineMobile'
import AwardShelf from '@/components/about/AwardShelf'

// ── Personal ──────────────────────────────────────────────────────────────────
import PersonalAboutDescription from '@/components/about/PersonalAboutDescription'
import TravelSection from '@/components/about/TravelSection'
import WorkDeskSection from '@/components/about/WorkDeskSection'
import PodcastMediumSection from '@/components/about/PodcastMediumSection'
import CreditCardsSection from '@/components/about/CreditCardsSection'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const [mode, setMode] = useState<Mode>('professional')
  const [snapping, setSnapping] = useState(false)

  // Restore saved mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_about_mode') as Mode | null
    if (saved === 'professional' || saved === 'personal') {
      setMode(saved)
    }
  }, [])

  const handleModeChange = useCallback((newMode: Mode) => {
    setSnapping(true)
    setMode(newMode)
    localStorage.setItem('portfolio_about_mode', newMode)
    
    // Scroll smoothly to top when mode changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    setTimeout(() => setSnapping(false), 150)
  }, [])

  return (
    <PageSections>
      {/* Mode toggle — always visible, sits above both content groups */}
      <IntroSection mode={mode} onModeChange={handleModeChange} />

      {/* Mode-specific content — grid stacks both groups; inactive fades out without layout shift */}
      <ModeContent $snapping={snapping}>

        {/* Professional */}
        <ModeGroup $active={mode === 'professional'} aria-hidden={mode !== 'professional'}>
          <LandingGroup>
            <ProfileImageWrapper $isPro={true}>
              <ProfileImage mode="professional" />
            </ProfileImageWrapper>
            <AboutDescription />
          </LandingGroup>
          <MyTools />
          <Journey />
          <DesktopTimeline>
            <ProfessionalTimeline />
          </DesktopTimeline>
          <MobileTimeline>
            <ProfessionalTimelineMobile />
          </MobileTimeline>
          <AwardShelf />
        </ModeGroup>

        {/* Personal */}
        <ModeGroup $active={mode === 'personal'} aria-hidden={mode !== 'personal'}>
          <LandingGroup>
            <ProfileImage mode="personal" />
            <PersonalAboutDescription />
          </LandingGroup>
          <TravelSection />
          <WorkDeskSection />
          <PodcastMediumSection />
          <CreditCardsSection />
        </ModeGroup>

      </ModeContent>

      <BottomToggleWrapper>
        <ModeSwitch>
          <ModeLabel type="button" $active={mode === 'professional'} onClick={() => handleModeChange('professional')}>
            PROFESSIONAL
          </ModeLabel>
          <ModeToggle
            selection={mode === 'professional' ? 'left' : 'right'}
            onToggle={(side) => handleModeChange(side === 'left' ? 'professional' : 'personal')}
          />
          <ModeLabel type="button" $active={mode === 'personal'} onClick={() => handleModeChange('personal')}>
            PERSONAL
          </ModeLabel>
        </ModeSwitch>
      </BottomToggleWrapper>
    </PageSections>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;

  ${mq.tablet} {
    gap: 24px;
  }

  ${mq.mobile} {
    gap: 24px;
  }
`

const ModeContent = styled.div<{ $snapping: boolean }>`
  position: relative;
  width: 100%;
  overflow: clip; /* Prevent the absolute inactive mode from expanding page height/footer */
  transform: scale(${({ $snapping }) => ($snapping ? 0.98 : 1)});
  transition: transform 0.15s ease;
`

const ModeGroup = styled.div<{ $active: boolean }>`
  position: ${({ $active }) => ($active ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding-bottom: 62px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0s linear ${({ $active }) => ($active ? '0s' : '0.3s')};

  ${mq.tablet} {
    gap: 64px;
    padding-bottom: 48px;
  }

  ${mq.mobile} {
    gap: 72px;
    padding-bottom: 48px;
  }
`

const LandingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  width: 100%;

  ${mq.tablet} {
    gap: 64px;
  }

  ${mq.mobile} {
    gap: 72px;
  }
`

const ProfileImageWrapper = styled.div<{ $isPro?: boolean }>`
  width: 100%;
  /* The new images have transparent space at the top (for the hair in personal mode).
     We apply a negative margin-top to pull both images up so the face aligns exactly
     where the original Professional photo face was. */
  margin-top: -44px;
  margin-bottom: ${({ $isPro }) => ($isPro ? '-120px' : '0')};

  ${mq.tablet} {
    margin-top: -35px;
    margin-bottom: ${({ $isPro }) => ($isPro ? '-90px' : '0')};
  }

  ${mq.mobile} {
    margin-top: -25px;
    margin-bottom: ${({ $isPro }) => ($isPro ? '-60px' : '0')};
  }
`

const DesktopTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${mq.mobile} {
    display: none;
  }
`

const MobileTimeline = styled.div`
  display: none;

  ${mq.mobile} {
    display: block;
    width: 100%;
  }
`

const BottomToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 0; /* Reduced padding for a tighter fit near the footer */
`

const ModeSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

const ModeLabel = styled.button<{ $active: boolean }>`
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
