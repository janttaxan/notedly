import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import NotesIcon from '@mui/icons-material/Notes';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

import { NewNote } from 'components/Layout/NewNote';
import { theme } from 'components/common/Theme';

export const Navigation = () => {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <NewNote />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={value} showLabels={matches}>
          <BottomNavigationAction component={Link} value='/' to='/' label='Главная' icon={<HomeIcon />} />
          <BottomNavigationAction
            component={Link}
            value='/favorites'
            to='/favorites'
            label='Избранное'
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            value='/mynotes'
            to='/mynotes'
            label='Мои заметки'
            icon={<NotesIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
