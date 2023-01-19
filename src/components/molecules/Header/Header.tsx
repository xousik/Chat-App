import React from 'react';
import { Wrapper, StyledUserName, Logout } from './Header.styles';
import logout from 'assets/images/logoutIcon.svg';
import { UserImage } from 'components/atoms/UserImage/UserImage';

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
      <StyledUserName>{user?.displayName || user?.name}</StyledUserName>
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
