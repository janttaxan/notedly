import { useApolloClient, useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useCallback } from 'react';

import { IS_LOGGED_IN, IsLoggedInData } from 'gql/query';

import { ButtonAsLink } from 'components/common/ButtonAsLink';
import { ReactComponent as Logo } from 'components/common/icons/Logo.svg';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  max-height: 56px;
  display: flex;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 16px;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

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
    <HeaderBar>
      <LogoIcon>
        <Logo />
      </LogoIcon>
      <LogoText>Notedly</LogoText>
      <UserState>
        {data?.isLoggedIn ? (
          <ButtonAsLink onClick={handleLogOut}>Выйти</ButtonAsLink>
        ) : (
          <p>
            <Link to='/signin'>Войдите</Link> или <Link to='/signup'>Зарегистрируйтесь</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};
