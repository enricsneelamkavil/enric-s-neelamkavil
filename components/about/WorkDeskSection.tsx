import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Gear inventory data ─────────────────────────────────────────────────────

interface GearItem {
  name: string
  detail: string
  mobileDetail?: string
  apple: boolean
  py: number
}

const GEAR: GearItem[] = [
  { name: 'MACBOOK PRO M3', detail: '16" · 16/512 · Work Laptop', apple: true, py: 13 },
  { name: 'ROG FLOW X16', detail: '16" · 8/64 · Personal Laptop', apple: false, py: 13 },
  { name: 'IPHONE 16 PRO MAX', detail: '256 · Natural Titanium · Smartphone', mobileDetail: '256 · Natural Titanium · Phone', apple: true, py: 14 },
  { name: 'WATCH SERIES 10', detail: '46mm · Jet Black · Watch', apple: true, py: 14 },
  { name: 'AIRPODS PRO 3', detail: 'ANC · Personal TWC · Earphones', apple: true, py: 14 },
  { name: 'ANKER MAGGO 10K', detail: 'Qi 2 Certified · Powerbank', apple: false, py: 14 },
  { name: 'BOYA VY V20', detail: 'Set of 2 · Wireless Microphones', apple: false, py: 14 },
  { name: 'DIGITEK DTR 550 LW', detail: '67" · Professional Tripod', apple: false, py: 14 },
  { name: 'JUAREZ JRZ21UK', detail: '21" · Soprano · Ukulele', apple: false, py: 14 },
]

// ─── Component ───────────────────────────────────────────────────────────────

const WorkDeskSection = () => (
  <Section>
    <TitleBlock>
      <SectionLabel>THE DESK</SectionLabel>
      <SectionHeader before="Where the " muted="work" after=" happens." />
    </TitleBlock>

    <ContentRow>
      <DeskImage>
        <img
          src="/about/personal/desk-image.webp"
          alt="Work Desk"
          draggable={false}
        />
      </DeskImage>

      {/* Gear inventory */}
      <Inventory>
        {GEAR.map(({ name, detail, mobileDetail, apple, py }, i) => (
          <GearRow key={name} $py={py} $first={i === 0}>
            <GearName>{name}</GearName>
            {apple && (
              <img
                src="/icons/apple.svg"
                alt="Apple"
                style={{ flexShrink: 0 }}
              />
            )}
            <GearDetail>
              {mobileDetail ? (
                <>
                  <DesktopText>{detail}</DesktopText>
                  <MobileText>{mobileDetail}</MobileText>
                </>
              ) : detail}
            </GearDetail>
          </GearRow>
        ))}
      </Inventory>
    </ContentRow>
  </Section>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

// ── Layout row ────────────────────────────────────────────────────────────────

const ContentRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;
  overflow: clip;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  width: 100%;

  ${mq.tabletDown} {
    flex-direction: column;
    align-items: stretch;
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`

// ── Desk photo ────────────────────────────────────────────────────────────────

const DeskImage = styled.div`
  position: relative;
  width: 540px;
  height: 474px;
  background: ${({ theme }) => theme.colors.surface.highlight};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  ${mq.tabletDown} {
    width: 100%;
    height: auto;
    aspect-ratio: 354 / 310;
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`

// ── Gear inventory ────────────────────────────────────────────────────────────

const Inventory = styled.div`
  flex: 1 0 0;
  min-width: 1px;
  display: flex;
  flex-direction: column;

  ${mq.tabletDown} {
    width: 100%;
    flex: none;
  }
`

interface GearRowProps {
  $py: number
  $first: boolean
}

const GearRow = styled.div<GearRowProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ $py }) => `${$py}px 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $first, theme }) => $first && `border-top: 1px solid ${theme.colors.border.tertiary};`}
  width: 100%;
`

const GearName = styled.span`
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  white-space: nowrap;
`

const GearDetail = styled.span`
  flex: 1 0 0;
  min-width: 1px;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const DesktopText = styled.span`
  ${mq.mobile} { display: none; }
`

const MobileText = styled.span`
  display: none;
  ${mq.mobile} { display: inline; }
`

export default WorkDeskSection
