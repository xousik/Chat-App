import React from 'react';
import styled from 'styled-components';
import SearchBar from 'components/atoms/SearchBar/SearchBar';
import Header from 'components/molecules/Header/Header';
import { Message } from 'components/atoms/Message/Message';

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

const MessagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const ChatView = () => {
  return (
    <Wrapper>
      <Header />
      <MessagesWrapper>
        <Message>Hi!</Message>
        <Message>Just want to remind you</Message>
        <Message>I Love You so much !</Message>
      </MessagesWrapper>
      <SearchBar />
    </Wrapper>
  );
};

export default ChatView;
