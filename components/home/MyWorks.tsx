'use client'

import styled from 'styled-components'
import Button from '@/components/common/Button'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import DiamondBullet from '@/components/shared/DiamondBullet'

// ─── Assets (Figma URLs — expire 7 days from generation) ─────────────────────

// Urban Trash
const IMG_UT_SCREENSHOT  = 'https://www.figma.com/api/mcp/asset/cea41ab7-871e-45c6-84b7-7e26b531f203'
const IMG_UT_ICON_LOGO   = 'https://www.figma.com/api/mcp/asset/871d0453-2eb1-43d3-82ba-e08f4d27efe0'
const IMG_UT_ELLIPSE     = 'https://www.figma.com/api/mcp/asset/6ad58b47-5fe6-4988-b8b1-4b37886bd6e0'
const IMG_UT_GRAPH_BG    = 'https://www.figma.com/api/mcp/asset/242d60f9-70cf-47ce-810a-6729d171f35b'
const IMG_UT_PLAN_NAME   = 'https://www.figma.com/api/mcp/asset/a8a5f4e5-8fbc-44d0-8fa8-e73ea407bbb2'
const IMG_UT_PRICE       = 'https://www.figma.com/api/mcp/asset/ab2904f0-3c30-428b-bfa4-8bee77e42a3f'
const IMG_UT_CHOOSE_PLAN = 'https://www.figma.com/api/mcp/asset/84c63a35-1380-4231-a605-fd91891c9c6e'
const IMG_UT_DETAILS     = 'https://www.figma.com/api/mcp/asset/c4a4ff81-73be-48cf-8921-5d25db058e53'
const IMG_UT_GLOW        = 'https://www.figma.com/api/mcp/asset/ac8a7681-af09-4d8c-944d-586f978d22a1'
const IMG_UT_ICON        = 'https://www.figma.com/api/mcp/asset/ad28cef6-9aee-40d2-aa15-f920ffd63db2'
const IMG_UT_ICON_DESC   = 'https://www.figma.com/api/mcp/asset/f671f114-3cbe-4b47-b249-5f32e0d7d5cf'

// ReputeUp AI
const IMG_RU_DASHBOARD   = 'https://www.figma.com/api/mcp/asset/b76257b3-6de0-4f54-9116-a79ea99aa1c2'
const IMG_RU_PORTRAIT    = 'https://www.figma.com/api/mcp/asset/71f86547-f3ff-4163-a9de-e8f06edad903'
const IMG_RU_RATING      = 'https://www.figma.com/api/mcp/asset/77ac302b-3921-4b63-9fdc-7e340faadc64'
const IMG_RU_CHAT        = 'https://www.figma.com/api/mcp/asset/015aaec5-ccfd-455c-9862-bdf33d960719'

// Unnathi
const IMG_UN_SCREENSHOT  = 'https://www.figma.com/api/mcp/asset/a37fd885-d613-491f-9a57-631286e77c9b'
const IMG_UN_LOGO        = 'https://www.figma.com/api/mcp/asset/755b580c-0ab8-4f7d-b032-66abbac4a7d7'
const IMG_UN_PIN         = 'https://www.figma.com/api/mcp/asset/94e628b7-693c-49de-9fbf-656e263e2f3d'
const IMG_UN_VECTOR6     = 'https://www.figma.com/api/mcp/asset/f2f88741-bf2e-4ddd-80b2-3abdecc944ed'
const IMG_UN_VECTOR7     = 'https://www.figma.com/api/mcp/asset/64cff292-fd81-4f8a-9aaf-c635ed6e545b'

// ─── WorkCard sub-component ───────────────────────────────────────────────────

interface WorkCardProps {
  gradient:       string
  tags:           readonly [string, string]
  title:          string
  description:    string
  buttonLabel:    string
  buttonVariant?: 'primary' | 'secondary'
  buttonHref?:    string
  buttonExternal?: boolean
  children:       React.ReactNode
}

const WorkCard = ({
  gradient,
  tags,
  title,
  description,
  buttonLabel,
  buttonVariant = 'primary',
  buttonHref,
  buttonExternal,
  children,
}: WorkCardProps) => (
  <CardOuter $gradient={gradient}>
    <ProductContainer>
      <ProductTagsRow>
        <TagLabel>{tags[0]}</TagLabel>
        <DiamondBullet size={6} />
        <TagLabel>{tags[1]}</TagLabel>
      </ProductTagsRow>

      <ProductInfoBlock>
        <ProductTitle>
          {title}<HighlightPeriod>.</HighlightPeriod>
        </ProductTitle>
        <ProductDescription>{description}</ProductDescription>
      </ProductInfoBlock>

      <Button
        label={buttonLabel}
        variant={buttonVariant}
        href={buttonHref}
        external={buttonExternal}
      />
    </ProductContainer>

    <ImageArea>{children}</ImageArea>
  </CardOuter>
)

// ─── Image panels ─────────────────────────────────────────────────────────────

const UrbanTrashPanel = () => (
  <>
    {/* Main landing screenshot — tall card, sits right-of-center */}
    <UTScreenshotCard>
      <UTScreenshotImg src={IMG_UT_SCREENSHOT} alt="Urban Trash landing page" />
    </UTScreenshotCard>

    {/* Green pricing card — floats top-left */}
    <UTGreenCard>
      <UTEllipse    src={IMG_UT_ELLIPSE}     alt="" />
      <UTGraphBg    src={IMG_UT_GRAPH_BG}    alt="" />
      <UTPlanName   src={IMG_UT_PLAN_NAME}   alt="" />
      <UTPrice      src={IMG_UT_PRICE}       alt="" />
      <UTChoosePlan src={IMG_UT_CHOOSE_PLAN} alt="" />
      <UTDetails    src={IMG_UT_DETAILS}     alt="" />
    </UTGreenCard>

    {/* Dark icon card — lower-left */}
    <UTDarkCard>
      <UTGlow     src={IMG_UT_GLOW}     alt="" />
      <UTIcon     src={IMG_UT_ICON}     alt="" />
      <UTIconDesc src={IMG_UT_ICON_DESC} alt="" />
    </UTDarkCard>

    {/* Urban Trash "U." wordmark */}
    <UTIconLogo src={IMG_UT_ICON_LOGO} alt="Urban Trash" />
  </>
)

const ReputeUpPanel = () => (
  <>
    {/* Main dashboard screenshot — right-anchored, vertically centered */}
    <RUDashboard src={IMG_RU_DASHBOARD} alt="ReputeUp AI dashboard" />

    {/* Floating rating review card — upper-left */}
    <RURatingCard>
      <RUPortrait src={IMG_RU_PORTRAIT} alt="" />
      <RURatingContent src={IMG_RU_RATING} alt="" />
    </RURatingCard>

    {/* Chat bubble decoration */}
    <RUChat src={IMG_RU_CHAT} alt="" />
  </>
)

const UnnathiPanel = () => (
  <>
    {/* Main website screenshot — right side, cropped tall image */}
    <UNScreenshotCard>
      <UNScreenshotImg src={IMG_UN_SCREENSHOT} alt="Unnathi website" />
    </UNScreenshotCard>

    {/* Decorative large vector elements — background layer */}
    <UNVector6 src={IMG_UN_VECTOR6} alt="" />
    <UNVector7 src={IMG_UN_VECTOR7} alt="" />

    {/* Unnathi logo — slightly tilted */}
    <UNLogo src={IMG_UN_LOGO} alt="Unnathi" />

    {/* Yellow phone-card floating element */}
    <UNPhoneCard />

    {/* Pin decoration — top-left corner */}
    <UNPin src={IMG_UN_PIN} alt="" />
  </>
)

// ─── Component ────────────────────────────────────────────────────────────────

const MyWorks = () => {
  return (
    <Section>
      <HeaderContainer>
        <TitleBlock>
          <SectionLabel>MY WORKS · 2022 → 2026</SectionLabel>
          <SectionHeader before="Other things I've " muted="shipped" />
        </TitleBlock>
        <Button label="See all works" variant="secondary" href="/works" />
      </HeaderContainer>

      <WorkCard
        gradient="linear-gradient(174.51deg, rgb(245,255,241) 72.22%, rgb(212,242,199) 86.11%)"
        tags={['Consumer Web App', 'Waste Management']}
        title="Urban Trash"
        description="Urban Trash is a B2B waste aggregation platform dedicated to sustainable waste management. They provide solutions for businesses, ensuring efficient waste collection."
        buttonLabel="Visit Website"
        buttonVariant="primary"
        buttonHref="https://urbantrash.in"
        buttonExternal
      >
        <UrbanTrashPanel />
      </WorkCard>

      <WorkCard
        gradient="linear-gradient(174.51deg, rgb(246,251,255) 72.22%, rgb(230,244,255) 86.11%)"
        tags={['Landing Showcase', 'Review Management']}
        title="ReputeUp AI"
        description="ReputeUp is your all-in-one tool for gathering reviews and showcasing testimonials that can drive revenue. Generate and collect Google reviews through WhatsApp/QR/SMS/Email"
        buttonLabel="View design"
        buttonVariant="secondary"
        buttonHref="#"
      >
        <ReputeUpPanel />
      </WorkCard>

      <WorkCard
        gradient="linear-gradient(174.51deg, rgb(255,254,251) 72.22%, rgb(255,241,206) 86.11%)"
        tags={['Landing Showcase', 'Government NGO']}
        title="Unnathi"
        description="Unnathi (Kerala Empowerment Society) is an initiative by the Government of Kerala, registered under the Travancore-Cochin Literary, Scientific and Charitable Societies Registration Act."
        buttonLabel="View design"
        buttonVariant="secondary"
        buttonHref="#"
      >
        <UnnathiPanel />
      </WorkCard>
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// ── Section shell ─────────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  white-space: nowrap;
  min-width: 0;
`

// ── WorkCard ──────────────────────────────────────────────────────────────────

const CardOuter = styled.div<{ $gradient: string }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
  /* 29.625rem = 474px — Figma card height */
  height: 29.625rem;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  background: ${({ $gradient }) => $gradient};
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  /* 23.875rem = 382px — Figma left column width */
  width: 23.875rem;
  flex-shrink: 0;
  height: 100%;
`

const ProductTagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const TagLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`

const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const ProductTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: normal;
  color: ${({ theme }) => theme.colors.text.primary};
`

/* Period is red in work cards — different from hero headline's text.secondary period */
const HighlightPeriod = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const ProductDescription = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ImageArea = styled.div`
  position: relative;
  flex: 1 0 0;
  min-width: 1px;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii['2xl']};
`

// ── Urban Trash image panel ───────────────────────────────────────────────────

/* Main landing screenshot card — tall, right-of-center */
const UTScreenshotCard = styled.div`
  position: absolute;
  left: calc(50% + 118.5px);
  top: 5.8px;
  width: 463px;
  height: 382px;
  border-radius: 12px;
  border: 1px solid #ceefbe;
  box-shadow: 0 0 41.6px 0 rgba(118, 208, 77, 0.2);
  overflow: hidden;
`

/* Zoomed crop: image is 262.57% tall so only the top portion is visible */
const UTScreenshotImg = styled.img`
  position: absolute;
  left: -0.03%;
  top: 0;
  width: 100.06%;
  height: 262.57%;
  max-width: none;
`

/* Green pricing card */
const UTGreenCard = styled.div`
  position: absolute;
  left: 56px;
  top: 26.8px;
  width: 156px;
  height: 209.892px;
  background-color: #76d04d;
  border-radius: 12px;
  box-shadow: 0 0 41.6px 0 rgba(118, 208, 77, 0.2);
  overflow: hidden;
`

const UTEllipse = styled.img`
  position: absolute;
  width: 248.676px;
  height: 248.676px;
  left: -123.42px;
  top: -103.15px;
  max-width: none;
`

const UTGraphBg = styled.img`
  position: absolute;
  width: 176.937px;
  height: 141.399px;
  left: -50.47px;
  top: -4.22px;
  max-width: none;
`

const UTPlanName = styled.img`
  position: absolute;
  width: 64.184px;
  height: 8.31px;
  left: 19.17px;
  top: 29.77px;
  max-width: none;
`

const UTPrice = styled.img`
  position: absolute;
  width: 118.183px;
  height: 25.01px;
  left: 19px;
  top: 134px;
  max-width: none;
`

const UTChoosePlan = styled.img`
  position: absolute;
  left: 19px;
  top: 165px;
  width: 118px;
  height: 22px;
  max-width: none;
`

const UTDetails = styled.img`
  position: absolute;
  width: 114.383px;
  height: 29.969px;
  left: 18.91px;
  top: 53.89px;
  max-width: none;
`

/* Dark icon card */
const UTDarkCard = styled.div`
  position: absolute;
  left: 123px;
  top: 263.8px;
  width: 89.478px;
  height: 107.277px;
  background: linear-gradient(143.11deg, #333 0%, #111 100%);
  border-radius: 6.47px;
  overflow: hidden;
`

const UTGlow = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 43.055px;
  height: 43.055px;
  max-width: none;
`

const UTIcon = styled.img`
  position: absolute;
  left: 11px;
  top: 23.57px;
  width: 26.75px;
  height: 26.75px;
  max-width: none;
`

const UTIconDesc = styled.img`
  position: absolute;
  left: 11px;
  top: 62.2px;
  width: 62.694px;
  height: 17.235px;
  max-width: none;
`

/* Urban Trash "U." wordmark */
const UTIconLogo = styled.img`
  position: absolute;
  left: 43px;
  top: 277.8px;
  width: 50.053px;
  height: 40px;
  max-width: none;
`

// ── ReputeUp AI image panel ───────────────────────────────────────────────────

/* Main dashboard — right-anchored, vertically centered */
const RUDashboard = styled.img`
  position: absolute;
  right: 7px;
  top: calc(50% + 32.3px);
  transform: translateY(-50%);
  width: 486px;
  height: 303px;
  border-radius: 8px;
  object-fit: cover;
  max-width: none;
`

/* Floating rating review card */
const RURatingCard = styled.div`
  position: absolute;
  left: 8px;
  top: 134.8px;
  width: 173.338px;
  height: 102.054px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 4.421px 0 rgba(76, 108, 243, 0.3);
  overflow: hidden;
  padding: 10.621px;
  display: flex;
  flex-direction: column;
  gap: 3.717px;
  align-items: center;
`

const RUPortrait = styled.img`
  width: 25.49px;
  height: 25.49px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
`

const RURatingContent = styled.img`
  width: 139px;
  height: 50.949px;
  max-width: none;
  flex-shrink: 0;
`

/* Chat bubble */
const RUChat = styled.img`
  position: absolute;
  left: 116px;
  top: 57.8px;
  width: 49px;
  height: 49px;
  max-width: none;
`

// ── Unnathi image panel ───────────────────────────────────────────────────────

/* Main website screenshot — right half, crop-panned tall image */
const UNScreenshotCard = styled.div`
  position: absolute;
  left: 239px;
  top: calc(50% + 0.3px);
  transform: translateY(-50%);
  width: 445px;
  height: 319px;
  border-radius: 8px;
  overflow: hidden;
`

const UNScreenshotImg = styled.img`
  position: absolute;
  left: -0.01%;
  top: 0;
  width: 100.02%;
  /* 424.49% of 319px ≈ 1354px — only top portion visible via overflow:hidden */
  height: 424.49%;
  max-width: none;
`

/* Decorative vector elements — behind logo and phone card */
const UNVector6 = styled.img`
  position: absolute;
  left: 15.75px;
  top: 222.88px;
  width: 207.576px;
  height: 143.289px;
  max-width: none;
`

const UNVector7 = styled.img`
  position: absolute;
  left: 21.82px;
  top: 127.59px;
  width: 71.832px;
  height: 32.541px;
  max-width: none;
`

/* Unnathi logo — slightly tilted clockwise */
const UNLogo = styled.img`
  position: absolute;
  left: 116.61px;
  top: 152.97px;
  width: 91.627px;
  height: 49.758px;
  transform: rotate(0.85deg);
  max-width: none;
`

/* Yellow-bordered phone card — rotated, no internal image (border is the key visual) */
const UNPhoneCard = styled.div`
  position: absolute;
  left: 97.03px;
  top: 22.05px;
  width: 98.804px;
  height: 72.888px;
  background: #ffffff;
  border: 4.491px solid #fbba16;
  border-radius: 10.652px;
  transform: rotate(-7.98deg);
`

/* Pin decoration — top-left corner, rotated */
const UNPin = styled.img`
  position: absolute;
  left: 64px;
  top: -0.2px;
  width: 49.402px;
  height: 49.402px;
  transform: rotate(-43.11deg);
  max-width: none;
`

export default MyWorks
