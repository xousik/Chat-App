import React from 'react';
import styled from 'styled-components';
import { UserImage } from '../../atoms/UserImage/UserImage';
import { UserName } from '../../atoms/UserName/Username';
import { LastMessage } from 'components/atoms/LastMessage/LastMessage';
import { Link } from 'react-router-dom';

const Wrapper = styled.li`
  width: 100%;
  height: 70px;
  display: flex;
  column-gap: 15px;
  align-items: center;
  margin: 5px 0;
  text-decoration: none;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type ContactProps = {
  user: {
    displayName: string;
    name?: string;
    photoURL: string;
  };
  handleClick: () => void;
};

const ContactItem = ({ user, handleClick }: ContactProps) => {
  return (
    <Wrapper onClick={handleClick} as={Link} to="/chat">
      <UserImage src={user.photoURL} />
      <TextWrapper>
        <UserName>{user.name || user.displayName}</UserName>
        <LastMessage>You: Hi, what's up ?</LastMessage>
      </TextWrapper>
    </Wrapper>
  );
};

export default ContactItem;
