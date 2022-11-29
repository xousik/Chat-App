import React from 'react';
import styled from 'styled-components';
import UserAvatar from 'components/atoms/userAvatar/userAvatar';
import { UserName } from 'components/atoms/UserName/Username';

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

const Header = ({ handleLogOut }: { handleLogOut?: () => void }) => {
  return (
    <Wrapper>
      <UserAvatar />
      <UserName>Patryk Glinka</UserName>
      <Logout onClick={handleLogOut}>Logout</Logout>
    </Wrapper>
  );
};

export default Header;
