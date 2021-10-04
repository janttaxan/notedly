import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import NotesIcon from '@mui/icons-material/Notes';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';

import { NewNote } from 'components/Layout/NewNote';
import { theme } from 'components/common/Theme';

const drawerWidth = 240;

export const Navigation = () => {
  const mediumView = useMediaQuery(theme.breakpoints.up('md'));
  const smallView = useMediaQuery(theme.breakpoints.up('sm'));

  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <NewNote />
      {mediumView ? (
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItemButton component={Link} to='/' selected={location.pathname === '/'}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary='Главная' />
              </ListItemButton>
              <ListItemButton component={Link} to='/favorites' selected={location.pathname === '/favorites'}>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary='Избранное' />
              </ListItemButton>
              <ListItemButton component={Link} to='/mynotes' selected={location.pathname === '/mynotes'}>
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText primary='Мои заметки' />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      ) : (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation value={value} showLabels={smallView}>
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
      )}
    </>
  );
};
