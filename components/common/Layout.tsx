'use client'

import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import GlobalStyle from '@/styles/GlobalStyle'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PersonalAgent from '@/components/common/PersonalAgent'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageWrapper>
        <Navbar />
        <Main>{children}</Main>
        <Footer />
        <PersonalAgent />
      </PageWrapper>
    </ThemeProvider>
  )
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export default Layout
