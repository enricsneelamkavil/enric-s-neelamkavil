'use client'

import styled, { ThemeProvider } from 'styled-components'
import theme, { mq } from '@/styles/theme'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PersonalAgent from '@/components/common/PersonalAgent'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
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

  ${mq.mobile} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export default Layout
