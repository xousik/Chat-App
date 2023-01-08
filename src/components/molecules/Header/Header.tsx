import React from 'react';
import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/Username';

const Wrapper = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  column-gap: 15px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0 0 20px 20px;
`;

const StyledUserName = styled(UserName)`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.customBlack};
`;

const Logout = styled.button`
  display: flex;
  align-items: center;
  column-gap: 10px;
  position: absolute;
  right: 20px;
  background: none;
  border: none;

  img {
    width: 25px;
    height: 25px;
    font-weight: bold;
  }

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

interface HeaderProps {
  handleLogOut?: () => void;
  user: {
    photoURL: 'string';
    displayName: 'string';
  };
  hasLogout?: boolean;
}

const Header = ({ handleLogOut, user, hasLogout }: HeaderProps) => {
  // const { currentUser }: any = useContext(AuthContext);
  return (
    <Wrapper>
      <UserImage src={user?.photoURL} />
      <StyledUserName>{user?.displayName}</StyledUserName>
      {hasLogout && (
        <Logout onClick={handleLogOut}>
          <span>Logout</span>
          <img src="https://www.svgrepo.com/show/318344/logout.svg" alt="logout-icon" />
        </Logout>
      )}
    </Wrapper>
  );
};

export default Header;
