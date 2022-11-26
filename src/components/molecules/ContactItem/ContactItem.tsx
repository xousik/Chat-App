import React from 'react';
import styled from 'styled-components';
import UserAvatar from '../../atoms/userAvatar/userAvatar';
import { UserName } from '../../atoms/UserName/Username';

const Wrapper = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ContactItem = () => {
  return (
    <Wrapper>
      <UserAvatar />
      <UserName>Kaja Olszewska</UserName>
    </Wrapper>
  );
};

export default ContactItem;
