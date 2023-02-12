import React from 'react';
import { Wrapper, StyledUserImage, StyledUserName, Logout } from './Header.styles';
import logout from 'assets/images/logoutIcon.svg';
import { useAppDispatch } from 'app/hooks';
import { openUserSettingsCard } from 'features/userSettingsCard/userSettingsCardSlice';

interface HeaderProps {
  handleLogOut?: () => void;
  user?: {
    photoURL: string;
    displayName?: string;
    name: string;
  };
  hasLogout?: boolean;
  nickname?: string;
}

<<<<<<< HEAD
const Header = ({ handleLogOut, user, hasLogout, nickname }: HeaderProps) => {
=======
const Header = ({ handleLogOut, user, hasLogout, setSettingsOpen, nickname }: HeaderProps) => {
>>>>>>> 99f04a538eda40397386408144142321c2c3a8ab
  const dispatch = useAppDispatch();

  const handleOpenSettings = () => {
    dispatch(openUserSettingsCard());
  };
  return (
    <Wrapper>
      <StyledUserImage src={user?.photoURL} />
      <StyledUserName onClick={handleOpenSettings}>
        {nickname || user!.displayName || user!.name}
      </StyledUserName>
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
