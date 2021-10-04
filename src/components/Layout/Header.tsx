import { useApolloClient, useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { IS_LOGGED_IN, IsLoggedInData } from 'gql/query';

export const Header = () => {
  const history = useHistory();
  const client = useApolloClient();
  const { data } = useQuery<IsLoggedInData>(IS_LOGGED_IN);

  const handleLogOut = useCallback(async () => {
    localStorage.removeItem('token');
    await client.resetStore();
    client.writeQuery<IsLoggedInData>({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn: false
      }
    });
    history.push('/');
  }, [client, history]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' color='secondary' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Notedly
          </Typography>
          {data?.isLoggedIn ? (
            <Button color='inherit' onClick={handleLogOut}>
              Выйти
            </Button>
          ) : (
            <Button component={Link} to='/signin' color='inherit'>
              Войти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
