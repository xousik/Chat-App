import React, { useContext } from 'react';
import styled from 'styled-components';
import UserAvatar from 'components/atoms/userAvatar/userAvatar';
import { UserName } from 'components/atoms/UserName/Username';
import { AuthContext } from 'context/AuthContext';
import { AuthProps } from 'views/App';

const Wrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
`;

const Logout = styled.button`
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: bold;
  border: 1px solid white;
  border-radius: 10px;
  margin-left: 110px;
  color: black;
`;

type HeaderProps = {
  handleLogOut?: () => void;
};

const Header = ({ handleLogOut }: HeaderProps) => {
  const { currentUser }: AuthProps = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Wrapper>
      <UserAvatar userImg={currentUser.photoURL} />
      <UserName>{currentUser.displayName}</UserName>
      <Logout onClick={handleLogOut}>Logout</Logout>
    </Wrapper>
  );
};

export default Header;
