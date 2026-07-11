'use client'

import { usePathname } from 'next/navigation'
import styled, { ThemeProvider } from 'styled-components'
import theme, { mq } from '@/styles/theme'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import PersonalAgent from '@/components/common/PersonalAgent'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  // /ask is a full-screen chat experience with its own fixed header (back
  // link + title) and fixed input bar — the site Navbar/Footer would
  // otherwise stack behind or overlap those.
  const isAskPage = usePathname() === '/ask'

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        {!isAskPage && <Navbar />}
        <Main>{children}</Main>
        {!isAskPage && <Footer />}
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

  ${mq.smallDesktop} {
    padding-left: 40px;
    padding-right: 40px;
  }

  ${mq.tablet} {
    padding-left: 40px;
    padding-right: 40px;
  }

  ${mq.mobile} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

export default Layout
