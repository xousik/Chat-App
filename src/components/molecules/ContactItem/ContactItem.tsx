import React from 'react';
import styled from 'styled-components';
import { UserImage } from '../../atoms/UserImage/UserImage';
import { UserName } from '../../atoms/UserName/Username';
import { Link } from 'react-router-dom';

const Wrapper = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  text-decoration: none;
`;

type ContactProps = {
  user: {
    photoURL: any;
    name: string;
  };
};

const ContactItem = ({ user }: ContactProps) => {
  return (
    <Wrapper as={Link} to="/chat">
      <UserImage src={user.photoURL} />
      <UserName>{user.name}</UserName>
    </Wrapper>
  );
};

export default ContactItem;
