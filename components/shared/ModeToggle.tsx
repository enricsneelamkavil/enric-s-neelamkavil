import styled from 'styled-components'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToggleSelection = 'left' | 'right'

interface Props {
  selection: ToggleSelection
  onToggle: (side: ToggleSelection) => void
}

// ─── Inline SVGs ─────────────────────────────────────────────────────────────
// Arrow: Figma node I230:744;211:379 — viewBox 0 0 17.4375 16.3418
// Uses currentColor so theme highlight (#E8342A) is applied via the wrapper.
// Left arrow = same path mirrored with scaleX(-1).

interface ArrowProps { $flip?: boolean }

const ArrowSvg = styled.svg.attrs({
  viewBox: '0 0 17.4375 16.3418',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
})<ArrowProps>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  transform: ${({ $flip }) => ($flip ? 'scaleX(-1)' : 'none')};
  color: ${({ theme }) => theme.colors.text.highlight};
`

// Not-selected ring: Figma node imgNotSelected — 40×40 circle stroke at 30% opacity
const RingSvg = styled.svg.attrs({
  viewBox: '0 0 40 40',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
})`
  display: block;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.highlight};
`

// ─── Sub-components ───────────────────────────────────────────────────────────

const ArrowIcon = ({ flip }: { flip?: boolean }) => (
  <IconBox>
    <ArrowSvg $flip={flip}>
      <path
        d="M17.1548 7.5C17.3355 7.67641 17.4375 7.91829 17.4375 8.1709C17.4375 8.4235 17.3355 8.66538 17.1548 8.8418L9.4541 16.3418L8.79932 15.6709L8.146 15L14.1943 9.1084H0V7.2334H14.1943L8.146 1.3418L8.79932 0.670898L9.4541 0L17.1548 7.5Z"
        fill="currentColor"
      />
    </ArrowSvg>
  </IconBox>
)

const NotSelectedRing = () => (
  <RingSvg>
    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3" />
  </RingSvg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const ModeToggle = ({ selection, onToggle }: Props) => (
  <Pill>
    <CircleBtn
      $selected={selection === 'left'}
      onClick={() => onToggle('left')}
      aria-label="Select Professional"
    >
      {selection === 'left' ? <ArrowIcon flip /> : <NotSelectedRing />}
    </CircleBtn>

    <CircleBtn
      $selected={selection === 'right'}
      onClick={() => onToggle('right')}
      aria-label="Select Personal"
    >
      {selection === 'right' ? <ArrowIcon /> : <NotSelectedRing />}
    </CircleBtn>
  </Pill>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Pill = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
  flex-shrink: 0;
`

interface CircleBtnProps { $selected: boolean }

const CircleBtn = styled.button<CircleBtnProps>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.surface.primary : 'transparent'};
  border: ${({ theme, $selected }) =>
    $selected ? `1px solid ${theme.colors.border.tertiary}` : 'none'};
`

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ModeToggle
