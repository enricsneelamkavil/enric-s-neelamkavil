'use client'

import Link from 'next/link'
import styled, { css, useTheme } from 'styled-components'

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

// ─── Arrow icon (inline SVG — no expiring asset URLs) ─────────────────────────

const ArrowIcon = ({ variant }: { variant: Variant }) => {
  const theme = useTheme()
  const color =
    variant === 'primary' ? theme.colors.icon.primary : theme.colors.icon.inverse
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 8L8 2M8 2H4M8 2V6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const Button = ({ label, variant = 'primary', href, external, onClick }: ButtonProps) => {
  const isExternal = external ?? href?.startsWith('http')

  const inner = (
    <>
      <Label $variant={variant}>{label}</Label>
      <IconBox $variant={variant}>
        <ArrowIcon variant={variant} />
      </IconBox>
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

const IconBox = styled.div<{ $variant: Variant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  flex-shrink: 0;
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.colors.icon.inverse
      : theme.colors.icon.secondary};
`

export default Button
