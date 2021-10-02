import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1em;
  background-color: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 56px);
    overflow-y: auto;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`;

const Icon = styled.span`
  display: inline-block;
  margin-right: 8px;
`;

export const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <li>
          <Icon aria-hidden='true' role='img'>
            🏠
          </Icon>
          <Link to='/'>Главная</Link>
        </li>
        <li>
          <Icon aria-hidden='true' role='img'>
            📓
          </Icon>
          <Link to='/mynotes'>Мои заметки</Link>
        </li>
        <li>
          <Icon aria-hidden='true' role='img'>
            🌟
          </Icon>
          <Link to='/favorites'>Избранное</Link>
        </li>
        <li>
          <Icon aria-hidden='true' role='img'>
            ➕
          </Icon>
          <Link to='/new'>Новая заметка</Link>
        </li>
      </NavList>
    </Nav>
  );
};
