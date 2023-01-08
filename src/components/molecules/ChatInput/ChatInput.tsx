import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';
import { Button } from 'components/atoms/Button/Button';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(Input)`
  display: block;
  margin: 10px auto;
  padding: 10px;
  height: 35px;
  border-radius: 50px;
  border: none;
  background-color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.xs};

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const StyledButton = styled(Button)`
  height: 30px;
  width: 60px;
  padding: 0;
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-radius: 5px;
`;

interface ChatInputProps {
  currentUser: {
    uid: string;
  };
  user: {
    chatId: string;
  };
}

const ChatInput = ({ currentUser, user }: ChatInputProps) => {
  const [text, setText] = useState('');
  //   const [image, setImage] = useState(null);

  const currentDate = new Date();

  const handleSend = async () => {
    await updateDoc(doc(db, 'chats', user.chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        text,
        senderId: currentUser.uid,
        date: currentDate
      })
    });

    setText('');
  };

  const handleKey = (e: string) => {
    if (e === 'Enter') handleSend();
  };

  return (
    <Wrapper>
      <StyledInput
        autoComplete="off"
        type="text"
        id="text"
        name="text"
        placeholder="Aa"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleKey(e.key)}
      ></StyledInput>
      <StyledButton onClick={handleSend}>Send</StyledButton>
    </Wrapper>
  );
};

export default ChatInput;
