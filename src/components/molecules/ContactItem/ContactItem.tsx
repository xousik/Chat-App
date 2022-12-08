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
  margin-top: 10px;
`;

type ContactProps = {
  userImg?: any;
  name: string;
};

const ContactItem = ({ userImg, name }: ContactProps) => {
  return (
    <Wrapper as={Link} to="/chat">
      <UserImage src={userImg} />
      <UserName>{name}</UserName>
    </Wrapper>
  );
};

export default ContactItem;
