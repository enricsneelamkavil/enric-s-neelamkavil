'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Work',    href: '/works' },
  { label: 'Resume',  href: '/resume' },
  { label: 'Contact', href: '/contact' },
]

// ─── Component ───────────────────────────────────────────────────────────────

const Navbar = () => {
  const pathname = usePathname()

  return (
    // Outer shell: black pill with glass effect, fixed-floated at top center
    <NavShell>
      <NavPill>
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink
            key={href}
            href={href}
            $active={pathname === href}
          >
            {label}
          </NavLink>
        ))}
      </NavPill>
    </NavShell>
  )
}

// ─── Styled Components ───────────────────────────────────────────────────────

/**
 * Outer wrapper — black pill (r:16px), glass effect, fixed centered at top.
 * Design: 473×68px on 1920px canvas → centered with left:50%/transform.
 * padding: 8px all sides, gap: 8px (VERTICAL layout = padding around inner pill)
 */
const NavShell = styled.nav`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  /* Outer black pill */
  background-color: rgba(0, 0, 0, 0.92);
  border-radius: ${({ theme }) => theme.radii['2xl']}; /* 18px ≈ r:16px */
  padding: ${({ theme }) => theme.spacing[2]};          /* 8px all sides */

  /* Glass effect from Figma */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
`

/**
 * Inner pill — light grey (#F7F7F7) with 1px #E0E0E0 border, r:12px.
 * Design: 457×52px, pad:8px all sides, HORIZONTAL layout, gap:0
 */
const NavPill = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;

  background-color: #F7F7F7;
  border: 1px solid #E0E0E0;
  border-radius: ${({ theme }) => theme.radii.lg}; /* 12px */
  padding: ${({ theme }) => theme.spacing[2]};      /* 8px all sides */
`

/**
 * Individual nav link pill.
 * Active state: dark fill (#171717) with white text.
 * Inactive: transparent, dark text (#171717), same dark text on hover.
 * padding: 8px top/bottom, 16px left/right. r:12px. font: 16px uppercase.
 */
const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`}; /* 8px 12px */
  border-radius: ${({ theme }) => theme.radii.lg}; /* 12px */

  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};   /* 16px */
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: 1.25rem;  /* 20px */
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;

  /* Active: dark pill, white text */
  background-color: ${({ $active }) => ($active ? '#171717' : 'transparent')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#171717')};

  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#171717' : 'rgba(23, 23, 23, 0.06)')};
  }
`

export default Navbar
