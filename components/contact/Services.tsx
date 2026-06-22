import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    title: 'Website design',
    desc: 'High-converting custom layouts, responsive journeys and landing pages.',
  },
  {
    num: '02',
    title: 'App design',
    desc: 'End-to-end mobile screens, native iOS/Android patterns, clean components.',
  },
  {
    num: '03',
    title: 'Dashboard design',
    desc: 'Complex B2B/SaaS logic and data tables into intuitive admin panels.',
  },
  {
    num: '04',
    title: 'UX & branding',
    desc: 'Wireframing, flows, developer handoff, and cohesive visual identities.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

const Services = () => (
  <Card>
    <TitleBlock>
      <CardLabel>SERVICES</CardLabel>
      <CardHeading>
        {`What I `}<Muted>take on</Muted>{`.`}
      </CardHeading>
    </TitleBlock>

    <Highlights>
      {SERVICES.map(({ num, title, desc }, i) => (
        <Row key={num} $bordered={i > 0}>
          <RowInner>
            <Num>{num}</Num>
            <ServiceDetails>
              <ServiceTitle>{title}</ServiceTitle>
              <ServiceDesc>{desc}</ServiceDesc>
            </ServiceDetails>
          </RowInner>
        </Row>
      ))}
    </Highlights>
  </Card>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface.inverse};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const CardLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const CardHeading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.inverse};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
`

// ── Service rows ──────────────────────────────────────────────────────────────

const Highlights = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Row = styled.div<{ $bordered: boolean }>`
  padding: 13px 0;
  ${({ $bordered, theme }) =>
    $bordered && `border-top: 1px solid ${theme.colors.surface.highlight};`}
`

const RowInner = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`

const Num = styled.p`
  margin: 0;
  width: 40px;
  flex-shrink: 0;
  align-self: flex-start;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const ServiceDetails = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const ServiceTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.inverse};
`

const ServiceDesc = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export default Services
