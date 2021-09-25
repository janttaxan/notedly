import { ReactComponent as Logo } from 'components/common/icons/Logo.svg';
import styled from 'styled-components';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
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

export const Header = () => {
  return (
    <HeaderBar>
      <LogoIcon>
        <Logo />
      </LogoIcon>
      <LogoText>Notedly</LogoText>
    </HeaderBar>
  );
};
