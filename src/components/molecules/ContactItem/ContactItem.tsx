import React from 'react';
import styled from 'styled-components';
import UserAvatar from '../../atoms/userAvatar/userAvatar';
import { UserName } from '../../atoms/UserName/Username';
import { Link } from 'react-router-dom';

const Wrapper = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

type ContactProps = {
  userImg?: any;
  name: string;
};

const ContactItem = ({ userImg, name }: ContactProps) => {
  return (
    <Wrapper as={Link} to="/chat">
      <UserAvatar userImg={userImg} />
      <UserName>{name}</UserName>
    </Wrapper>
  );
};

export default ContactItem;
