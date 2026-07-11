'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Assets ───────────────────────────────────────────────────────────────────

const AGENT_ICON = '/icons/agent.svg'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Works', href: '/works' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
] as const

const MOBILE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Works', href: '/works' },
  { label: 'Contact', href: '/contact' },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

const Navbar = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  // "On Scroll" variant — add shadow to outer wrapper once page has scrolled
  // "Hide on scroll down" — hide the navbar when scrolling down, show when scrolling up
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 0)

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      lastScrollY = currentScrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Desktop: top-center glass pill ── */}
      <DesktopNavWrapper $scrolled={scrolled} $hidden={hidden} aria-label="Main navigation">
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
      </DesktopNavWrapper>

      {/* ── Mobile: bottom-fixed solid pill ── */}
      <MobileNavWrapper aria-label="Mobile navigation">
        {MOBILE_NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href
          return (
            <MobileNavItem key={href}>
              <MobileNavLink
                href={href}
                $active={active}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </MobileNavLink>
            </MobileNavItem>
          )
        })}
        <MobileSeparator aria-hidden="true" />
        <AgentTriggerButton
          type="button"
          aria-label="Ask Enric AI"
          onClick={() => window.dispatchEvent(new Event('open-personal-agent'))}
        >
          <AgentIconSpan aria-hidden="true" />
        </AgentTriggerButton>
      </MobileNavWrapper>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// Desktop wrapper — hidden on mobile
const DesktopNavWrapper = styled.nav<{ $scrolled: boolean; $hidden: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing[4]};
  left: 50%;
  transform: translateX(-50%) translateY(${({ $hidden }) => ($hidden ? 'calc(-100% - 32px)' : '0')});
  z-index: 1000;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.xl};
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: box-shadow 0.2s ease, background-color 0.2s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${mq.mobile} {
    display: none;
  }
`

const NavPill = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  gap: 0;
`

const NavItem = styled.li`
  display: contents;
`

const NavLink = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.md};
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
    background-color: rgba(23, 23, 23, 0.06);
  }
`

// Mobile wrapper — hidden on desktop, visible on mobile
const MobileNavWrapper = styled.nav`
  display: none;

  ${mq.mobile} {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: max-content;
    max-width: calc(100vw - 32px);
    background-color: ${({ theme }) => theme.colors.surface.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: 6px;
    gap: 4px;
  }
`

const MobileSeparator = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.border.tertiary};
  flex-shrink: 0;
`

const AgentTriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`

const AgentIconSpan = styled.span`
  display: block;
  width: 32px;
  height: 23px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(${AGENT_ICON}) no-repeat center / contain;
  mask: url(${AGENT_ICON}) no-repeat center / contain;
`

const MobileNavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MobileNavLink = styled(Link) <{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 0.75rem;
  line-height: 1.25rem;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.surface.inverse : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text.inverse : theme.colors.text.link};
  transition: background-color 0.15s ease, color 0.15s ease;
`

export default Navbar
