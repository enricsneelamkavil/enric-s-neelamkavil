'use client'

import styled from 'styled-components'

interface Props {
  /** Inner square side in px. Container auto-sizes to side × √2 to prevent clipping. */
  size?: number
}

const DiamondBullet = ({ size = 8 }: Props) => {
  const boxSize = size * Math.SQRT2
  return (
    <Wrapper $boxSize={boxSize}>
      <Square $size={size} />
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $boxSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $boxSize }) => $boxSize}px;
  height: ${({ $boxSize }) => $boxSize}px;
`

const Square = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ theme }) => theme.colors.icon.highlight};
  border-radius: ${({ theme }) => theme.radii.xs};
  transform: rotate(-45deg);
  flex-shrink: 0;
`

export default DiamondBullet
