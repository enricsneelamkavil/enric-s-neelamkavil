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
  { name: 'MACBOOK PRO M3',     detail: '16" · 16/512 · Work Laptop',         apple: true,  py: 13 },
  { name: 'ROG FLOW X16',       detail: '16" · 8/64 · Personal Laptop',        apple: false, py: 13 },
  { name: 'IPHONE 16 PRO MAX',  detail: '256 · Natural Titanium · Smartphone', mobileDetail: '256 · Natural Titanium · Phone', apple: true,  py: 14 },
  { name: 'WATCH SERIES 10',    detail: '46mm · Jet Black · Watch',            apple: true,  py: 14 },
  { name: 'AIRPODS PRO 3',      detail: 'ANC · Personal TWC · Earphones',      apple: true,  py: 14 },
  { name: 'ANKER MAGGO 10K',    detail: 'Qi 2 Certified · Powerbank',          apple: false, py: 14 },
  { name: 'BOYA VY V20',        detail: 'Set of 2 · Wireless Microphones',     apple: false, py: 14 },
  { name: 'DIGITEK DTR 550 LW', detail: '67" · Professional Tripod',           apple: false, py: 14 },
  { name: 'JUAREZ JRZ21UK',     detail: '21" · Soprano · Ukulele',             apple: false, py: 14 },
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
        {/* Background desk photo — cropped/zoomed at 80% opacity */}
        <PhotoLayer>
          <PhotoCrop>
            <img
              src="/about/personal/desk/desk-bg.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </PhotoCrop>
        </PhotoLayer>

        {/* Apple Watch screen overlay */}
        <WatchOuter>
          <WatchInner>
            <img
              src="/about/personal/desk/watch-screen.png"
              alt=""
              aria-hidden="true"
              width={15.304}
              height={12.819}
            />
          </WatchInner>
        </WatchOuter>

        {/* iPhone screen overlay */}
        <IphoneOverlay>
          <img
            src="/about/personal/desk/iphone-screen.png"
            alt=""
            aria-hidden="true"
            width={35.04}
            height={67.709}
          />
        </IphoneOverlay>
      </DeskImage>

      {/* Gear inventory */}
      <Inventory>
        {GEAR.map(({ name, detail, mobileDetail, apple, py }, i) => (
          <GearRow key={name} $py={py} $first={i === 0}>
            <GearName>{name}</GearName>
            {apple && (
              <img
                src="/about/personal/desk/apple-icon.svg"
                alt="Apple"
                width={8.293}
                height={10.2}
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

  ${mq.tabletDown} {
    width: 100%;
    height: auto;
    aspect-ratio: 354 / 310;
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`

// Vertically-centered wrapper at 80% opacity — matches Figma "Background" layer
const PhotoLayer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  aspect-ratio: 540 / 474;
  opacity: 0.8;
`

// Overflow clip so percentage-positioned img is cropped
const PhotoCrop = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    position: absolute;
    width: 117.27%;
    height: 133.59%;
    left: -8.63%;
    top: -33.59%;
    max-width: none;
    display: block;
  }
`

// Apple Watch outer positioning wrapper (desktop pixel coords)
const WatchOuter = styled.div`
  position: absolute;
  left: 64.04px;
  top: 177.6px;
  width: 15.877px;
  height: 13.415px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.tabletDown} {
    left: 42.34px;
    top: 117.41px;
    width: 10.496px;
    height: 8.869px;
  }
`

const WatchInner = styled.div`
  transform: rotate(2.08deg);
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: 15.304px;
    height: 12.819px;

    ${mq.tabletDown} {
      width: 10.117px;
      height: 8.475px;
    }
  }
`

const IphoneOverlay = styled.div`
  position: absolute;
  left: 58.02px;
  top: 95.68px;
  width: 35.04px;
  height: 67.709px;
  opacity: 0.8;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  ${mq.tabletDown} {
    left: 38.36px;
    top: 63.26px;
    width: 23.166px;
    height: 44.763px;
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
