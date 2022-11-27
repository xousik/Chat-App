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

const Header = () => {
  return (
    <Wrapper>
      <UserAvatar />
      <UserName>Patryk Glinka</UserName>
    </Wrapper>
  );
};

export default Header;
