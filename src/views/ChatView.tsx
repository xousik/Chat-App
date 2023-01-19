import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import ChatInput from 'components/molecules/ChatInput/ChatInput';
import Message from 'components/atoms/Message/Message';
import { doc, onSnapshot, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from 'context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray};

  @media (min-width: 320px) and (max-width: 480px) {
    height: 90vh;
  }
`;

const MessagesWrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export interface ICurrentUser {
  currentUser?: {
    uid: string;
    name: string;
    displayName: string;
    photoURL: string;
  };
}

interface MessageProps {
  senderId: string;
  id: string;
  text: string;
}

const ChatView = () => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messagesRef = useRef<null | HTMLUListElement>(null);

  const getCurrentChatUser = (key: string) => {
    const user = localStorage.getItem(key);
    if (user) return JSON.parse(user);
  };
  const currentChatUser = getCurrentChatUser('currentChatId');

  const user = {
    chatId:
      currentUser &&
      (currentUser.uid > currentChatUser.uid
        ? currentUser.uid + currentChatUser.uid
        : currentChatUser.uid + currentUser.uid),
    user: currentChatUser
  };

  useEffect(() => {
    if (!user.chatId) return;
    const unSub = onSnapshot(doc(db, 'chats', user.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSub();
  }, [user.chatId]);

  useEffect(() => {
    const unsub = messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);

    return () => unsub;
  }, [messages, text]);

  const currentDate = new Date();

  const handleSend = async () => {
    setText('');
    if (!user.chatId || !currentUser) return;
    await updateDoc(doc(db, 'chats', user.chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        text,
        senderId: currentUser.uid,
        date: currentDate
      })
    });

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [user.chatId + '.lastMessage']: {
        text
      },
      [user.chatId + '.date']: currentDate
    });

    await updateDoc(doc(db, 'userChats', user.user.uid), {
      [user.chatId + '.lastMessage']: {
        text
      },
      [user.chatId + '.date']: currentDate
    });
  };

  return currentUser ? (
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
      <ChatInput user={user} handleSend={handleSend} setText={setText} text={text} />
    </Wrapper>
  ) : null;
};

export default ChatView;
