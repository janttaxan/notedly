import { ReactChild } from 'react';

import { Header } from 'components/Layout/Header';
import { Navigation } from 'components/Layout/Navigation';

interface LayoutProps {
  children: ReactChild;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Navigation />
    </>
  );
};
