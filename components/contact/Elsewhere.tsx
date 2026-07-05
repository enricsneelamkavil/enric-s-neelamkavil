import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Platform {
  name: string
  handle: string
  icon: string
  href: string
}

// Icons stored at public/contact/social/{platform}.webp
// Place platform icon images there before deploying.
const PLATFORMS: Platform[][] = [
  [
    {
      name: 'LinkedIn',
      handle: 'enricsneelamkavil',
      icon: '/app-icons/linkedin.webp',
      href: 'https://www.linkedin.com/in/enricsneelamkavil/',
    },
    {
      name: 'Instagram',
      handle: 'enricsneelamkavil',
      icon: '/app-icons/instagram.webp',
      href: 'https://www.instagram.com/enricsneelamkavil/',
    },
  ],
  [
    {
      name: 'Behance',
      handle: 'enricsneelamkavil',
      icon: '/app-icons/behance.webp',
      href: 'https://www.behance.net/enricsneelamkavil',
    },
    {
      name: 'Dribbble',
      handle: 'enricsneelamkavil',
      icon: '/app-icons/dribbble.webp',
      href: 'https://dribbble.com/enricsneelamkavil',
    },
  ],
  [
    {
      name: 'X',
      handle: 'enricneels',
      icon: '/app-icons/x.webp',
      href: 'https://x.com/enricneels',
    },
    {
      name: 'Facebook',
      handle: 'enricsneelamkavil',
      icon: '/app-icons/facebook.webp',
      href: 'https://facebook.com/enricsneelamkavil',
    },
  ],
  [
    {
      name: 'Medium',
      handle: '@enricsneelamkavil',
      icon: '/app-icons/medium.webp',
      href: 'https://medium.com/@enricsneelamkavil',
    },
    {
      name: 'YouTube',
      handle: '@enricsneelamkavil',
      icon: '/app-icons/youtube.webp',
      href: 'https://www.youtube.com/@enricsneelamkavil',
    },
  ],
]

// ─── Component ────────────────────────────────────────────────────────────────

const Elsewhere = () => (
  <Wrapper>
    <TitleBlock>
      <Heading>Find me on the <Muted>internet</Muted>.</Heading>
    </TitleBlock>

    <Grid>
      {PLATFORMS.map((row, ri) => (
        <GridRow key={ri}>
          {row.map(({ name, handle, icon, href }) => (
            <PlatformCard
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — ${handle}`}
            >
              <IconWrap>
                <Image src={icon} alt={name} draggable={false} fill sizes="40px" />
              </IconWrap>
              <Details>
                <PlatformName>{name}</PlatformName>
                <PlatformHandle>{handle}</PlatformHandle>
              </Details>
            </PlatformCard>
          ))}
        </GridRow>
      ))}
    </Grid>
  </Wrapper>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[10]};
  }
`

const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

// ── Grid ──────────────────────────────────────────────────────────────────────

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`

const GridRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  width: 100%;

  ${mq.mobile} {
    flex-direction: column;
  }
`

// ── Platform card ─────────────────────────────────────────────────────────────

const PlatformCard = styled.a`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface.tertiary};
  }

  ${mq.mobile} {
    flex: none;
    width: 100%;
  }
`

const IconWrap = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    display: block;
  }
`

const Details = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const PlatformName = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const PlatformHandle = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export default Elsewhere
