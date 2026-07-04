'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = 'primary' | 'secondary'

interface ButtonProps {
  label: string
  variant?: Variant
  href?: string
  /** Defaults to true when href starts with "http" */
  external?: boolean
  onClick?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

const Button = ({ label, variant = 'primary', href, external, onClick }: ButtonProps) => {
  const isExternal = external ?? href?.startsWith('http')

  const inner = (
    <>
      <Label $variant={variant}>{label}</Label>
      <ArrowIcon aria-hidden="true" $variant={variant} />
    </>
  )

  if (href) {
    if (isExternal) {
      return (
        <Anchor href={href} target="_blank" rel="noopener noreferrer" $variant={variant}>
          {inner}
        </Anchor>
      )
    }
    return (
      <InternalLink href={href} $variant={variant}>
        {inner}
      </InternalLink>
    )
  }

  return (
    <Btn type="button" onClick={onClick} $variant={variant}>
      {inner}
    </Btn>
  )
}

// ─── Shared base styles ───────────────────────────────────────────────────────

const base = css<{ $variant: Variant }>`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.colors.surface.inverse
      : theme.colors.surface.tertiary};
  border: ${({ theme, $variant }) =>
    $variant === 'secondary'
      ? `1px solid ${theme.colors.border.tertiary}`
      : 'none'};

  ${mq.mobile} {
    padding: 12px 16px;
  }
`

const InternalLink = styled(Link)<{ $variant: Variant }>`
  ${base}
`

const Anchor = styled.a<{ $variant: Variant }>`
  ${base}
`

const Btn = styled.button<{ $variant: Variant }>`
  ${base}
`

// ─── Inner elements ───────────────────────────────────────────────────────────

const Label = styled.span<{ $variant: Variant }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.colors.text.inverse
      : theme.colors.text.secondary};
  white-space: nowrap;
`

const ArrowIcon = styled.span<{ $variant: Variant }>`
  width: 18px;
  height: 18px;
  display: inline-block;
  flex-shrink: 0;
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.colors.text.inverse
      : theme.colors.text.secondary};
  -webkit-mask: url(/icons/external.svg) no-repeat center / contain;
  mask: url(/icons/external.svg) no-repeat center / contain;
`

export default Button
