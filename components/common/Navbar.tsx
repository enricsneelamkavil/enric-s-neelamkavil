'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Work',    href: '/works' },
  { label: 'Resume',  href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // "On Scroll" variant — add shadow to outer wrapper once page has scrolled
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 0)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <NavWrapper $scrolled={scrolled} aria-label="Main navigation">
      <NavPill role="list">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href
          return (
            <NavItem key={href} role="listitem">
              <NavLink href={href} $active={active} aria-current={active ? 'page' : undefined}>
                {label}
              </NavLink>
            </NavItem>
          )
        })}
      </NavPill>
    </NavWrapper>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const NavWrapper = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing[4]};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.xl};
  /* outer shell is transparent per Figma; shadow added on scroll (On Scroll variant) */
  background-color: transparent;
  transition: box-shadow 0.2s ease;
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 4px 24px rgba(0, 0, 0, 0.08)' : 'none'};
`

const NavPill = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  gap: 0;
`

const NavItem = styled.li`
  display: contents;
`

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.surface.inverse : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.inverse : theme.colors.text.link};
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover:not([aria-current='page']) {
    /* subtle tint — surface.inverse at ~6% opacity; no solid token covers this alpha */
    background-color: rgba(23, 23, 23, 0.06);
  }
`

export default Navbar
