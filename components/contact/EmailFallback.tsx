import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Component ────────────────────────────────────────────────────────────────

const EmailFallback = () => (
  <Card>
    <Label>If forms aren&apos;t your thing</Label>
    <EmailLink href="mailto:enricsneelamkavil@gmail.com">
      enricsneelamkavil@gmail.com
    </EmailLink>
    <AgentNote>
      Or use the agent at the bottom of the page — it knows my work better than
      I do, and is awake at 3am.
    </AgentNote>
  </Card>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface.inverse};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 48px;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mq.mobile} {
    padding: ${({ theme }) => theme.spacing[6]};
    gap: 4px;
  }
`

const Label = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const EmailLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }

  ${mq.mobile} {
    font-size: 1.25rem;
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`

const AgentNote = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export default EmailFallback
