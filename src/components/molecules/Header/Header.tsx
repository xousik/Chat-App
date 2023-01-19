import React from 'react';
import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/Username';
import logout from 'assets/images/logoutIcon.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.beige};
  border-radius: 0 0 20px 20px;

  span {
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const StyledUserName = styled(UserName)`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.customBlack};
`;

const Logout = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 5px;
  margin-right: 10px;
  background: none;
  border: none;

  img {
    width: 25px;
    height: 25px;
    font-weight: bold;
  }

  span {
    line-height: 25px;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

interface HeaderProps {
  handleLogOut?: () => void;
  user?: {
    photoURL: string;
    displayName?: string;
    name: string;
  };
  hasLogout?: boolean;
}

const Header = ({ handleLogOut, user, hasLogout }: HeaderProps) => {
  return (
    <Wrapper>
      <UserImage src={user?.photoURL} />
      {!hasLogout && <StyledUserName>{user?.displayName || user?.name}</StyledUserName>}
      {hasLogout && <span>Chats</span>}
      {hasLogout && (
        <Logout onClick={handleLogOut}>
          <span>Logout</span>
          <img src={logout} alt="logout-icon" />
        </Logout>
      )}
    </Wrapper>
  );
};

export default Header;
