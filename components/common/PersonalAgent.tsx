'use client'

import styled from 'styled-components'

const AgentWrapper = styled.div`
  /* Placeholder — PersonalAgent AI widget (implemented separately) */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none;
`

const PersonalAgent = () => {
  return <AgentWrapper />
}

export default PersonalAgent
