import { ReactChild } from 'react';
import styled from 'styled-components';

import { Header } from 'components/Layout/Header';
import { Navigation } from 'components/Layout/Navigation';

interface LayoutProps {
  children: ReactChild;
}

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 56px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: auto;

  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 56px);
    width: calc(100% - 220px);
  }
`;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
};
