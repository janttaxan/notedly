import { Link, useLocation } from 'react-router-dom';

import CreateIcon from '@mui/icons-material/Create';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

import useMediaQuery from '@mui/material/useMediaQuery';

import { theme } from 'components/common/Theme';

export const NewNote = () => {
  const location = useLocation();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
        position: 'fixed',
        bottom: matches ? 64 : 56,
        right: matches ? 40 : 0
      }}
    >
      <Zoom in={location.pathname !== '/new'} timeout={transitionDuration} unmountOnExit>
        <Fab
          component={Link}
          to='/new'
          size={matches ? 'large' : 'medium'}
          color='primary'
          aria-label='Добавить новую заметку'
        >
          <CreateIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};
