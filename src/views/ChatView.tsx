import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import ChatInput from 'components/molecules/ChatInput/ChatInput';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import Message from 'components/atoms/Message/Message';
import { AuthContext } from 'context/AuthContext';

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.beige};
`;

const MessagesWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const ChatView = () => {
  const { currentUser }: any = useContext(AuthContext);
  const [messages, setMessages]: any = useState([]);
  const messagesRef = useRef<null | HTMLUListElement>(null);

  const getCurrentChatUser = (key: string) => {
    const user = localStorage.getItem(key);
    if (user) return JSON.parse(user);
  };
  const currentChatUser = getCurrentChatUser('currentChatId');
  const user = {
    chatId:
      currentUser.uid > currentChatUser.uid
        ? currentUser.uid + currentChatUser.uid
        : currentChatUser.uid + currentUser.uid,
    user: currentChatUser
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', user.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSub();
  }, [user.chatId]);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  interface MessageProps {
    senderId: string;
    id: string;
    text: string;
  }

  return (
    <Wrapper>
      <Header user={user.user} />
      <MessagesWrapper ref={messagesRef}>
        {messages.map((message: MessageProps) => (
          <Message
            isOwnerMessage={message.senderId === currentUser.uid}
            chatUser={user.user}
            key={message.id}
          >
            {message.text}
          </Message>
        ))}
      </MessagesWrapper>
      <ChatInput user={user} currentUser={currentUser} />
    </Wrapper>
  );
};

export default ChatView;
