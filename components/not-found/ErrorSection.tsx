'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import Button from '@/components/common/Button'

// ─── Figma layout constants ───────────────────────────────────────────────────
// Desktop: node 752:1857 · Mobile: node 752:1971 — both re-read fresh.
// The pan/egg illustration is absolutely positioned relative to DigitsRow's own
// box (not centered via flex gap) — left/top values below are copied 1:1 from Figma.

const PAN_EGG = '/404/pan.webp'

const scrollToFooter = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const handleHeartKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    scrollToFooter()
  }
}

const ErrorSection = () => (
  <Section>
    <DigitsRow>
      <Digit>4</Digit>
      <Digit>4</Digit>
      <PanEggWrapper>
        <PanEggImage src={PAN_EGG} alt="" fill priority sizes="440px" />
      </PanEggWrapper>
    </DigitsRow>

    <ErrorMessage>UH Oh! Maybe that&apos;s cooking or we don&apos;t have it yet</ErrorMessage>

    <CallToAction>Try something from the menu!</CallToAction>

    <TeaserRow>
      <TeaserText>BTW, try clicking on the</TeaserText>
      <HeartIcon
        role="button"
        tabIndex={0}
        aria-label="Scroll to the footer"
        onClick={scrollToFooter}
        onKeyDown={handleHeartKeyDown}
      />
      <TeaserText>in the footer for a surprise!</TeaserText>
    </TeaserRow>

    <ButtonWrapper>
      <Button label="Back home" href="/" />
    </ButtonWrapper>
  </Section>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 1168px;
  margin: 0 auto;
  padding-top: 8.75rem; /* 140px — below sticky navbar, matches every other page */
  text-align: center;

  ${mq.tablet} {
    padding-top: 6rem;
  }

  ${mq.mobile} {
    padding-top: 40px;
  }
`

const DigitsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 280px;

  ${mq.mobile} {
    gap: 160px;
  }
`

const Digit = styled.span`
  display: block;
  width: 289px;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 400px;
  line-height: 480px;
  letter-spacing: -8px;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;

  ${mq.mobile} {
    width: auto;
    font-size: 160px;
    line-height: 200px;
    letter-spacing: -3.2px;
    white-space: nowrap;
  }
`

// pan.webp is already correctly oriented — no rotate/flip needed (Figma's own
// rotate(176.01deg) + scaleY(-1) corrected the OLD source photo's orientation,
// not a design choice, and doesn't apply to this pre-corrected asset).
// Position is NOT centered in the gap — Figma places it at a fixed left/top
// offset from the row's own box, which lands it 39px right of true center
// (41px overlap into the first "4", 119px overlap into the second).
const PanEggWrapper = styled.div`
  position: absolute;
  left: 248px;
  top: -24px;
  width: 440px;
  height: 426px;

  ${mq.mobile} {
    left: 89px;
    top: 0;
    width: 205px;
    height: 198px;
  }
`

const PanEggImage = styled(Image)`
  object-fit: cover;
`

const ErrorMessage = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;

  ${mq.mobile} {
    font-size: 16px;
    line-height: 24px;
  }
`

const CallToAction = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: 72px;
  letter-spacing: -1.28px;
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 32px;
    letter-spacing: -0.48px;
  }
`

const TeaserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TeaserText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 12px;
    line-height: 16px;
  }
`

const ButtonWrapper = styled.div`
  align-self: center;
`

const HeartIcon = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/heart.svg) no-repeat center / contain;
  mask: url(/icons/heart.svg) no-repeat center / contain;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }

  ${mq.mobile} {
    width: 12px;
    height: 12px;
  }
`

export default ErrorSection
