import { ReactChild, useCallback } from 'react';

import Box from '@mui/material/Box';

import { Header } from 'components/Layout/Header';
import { Navigation } from 'components/Layout/Navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme } from 'components/common/Theme';

interface LayoutProps {
  children: ReactChild;
}

export const Layout = ({ children }: LayoutProps) => {
  const mediumView = useMediaQuery(theme.breakpoints.up('md'));
  const smallView = useMediaQuery(theme.breakpoints.up('sm'));

  const getPadding = useCallback(() => {
    if (mediumView) {
      return '88px 24px 24px 264px';
    }
    if (smallView) {
      return '88px 24px';
    }
    return '80px 16px';
  }, [mediumView, smallView]);

  return (
    <>
      <Header />
      <Navigation />
      <Box
        component='main'
        sx={{
          padding: getPadding()
        }}
      >
        {children}
      </Box>
    </>
  );
};
