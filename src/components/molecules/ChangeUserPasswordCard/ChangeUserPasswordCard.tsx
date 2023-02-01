import React, { useState, useRef } from 'react';
import { auth } from 'FirebaseApp/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Wrapper,
  ChangeUserPasswordCardTitle,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeUserPasswordCard.styles';

interface IChangeUserPasswordCard {
  user?: {
    photoURL: string;
    displayName: string;
    email: string;
  };
  setIsChangeUserPasswordCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeUserPasswordCardOpen: boolean;
}

const ChangeUserPasswordCard = ({
  user,
  setIsChangeUserPasswordCardOpen,
  isChangeUserPasswordCardOpen
}: IChangeUserPasswordCard) => {
  const [titleMessage, setTitleMessage] = useState<string>('Send an email to reset your password');

  const sendRef = useRef<HTMLButtonElement>(null);

  const updateUserPassword = async () => {
    if (!user) return;
    await sendPasswordResetEmail(auth, user.email)
      .then(() => setTitleMessage('Email sent! Check your inbox!'))
      .catch((error) => console.log(error.message));
    if (!sendRef.current) return;
    sendRef.current.setAttribute('disabled', 'disabled');
    sendRef.current.style.cursor = 'not-allowed';
    sendRef.current.style.opacity = '0.5';
    setTimeout(() => {
      if (!sendRef.current) return;
      sendRef.current?.removeAttribute('disabled');
      sendRef.current.style.cursor = 'pointer';
      sendRef.current.style.opacity = '1';
      setTitleMessage('Send an email to reset your password');
    }, 60000);
  };
  return (
    <Wrapper isChangeUserPasswordCardOpen={isChangeUserPasswordCardOpen}>
      <ChangeUserPasswordCardTitle>{titleMessage}</ChangeUserPasswordCardTitle>
      <InnerWrapper>
        <button
          onClick={() => {
            setIsChangeUserPasswordCardOpen(false);
          }}
        >
          Cancel
        </button>
        <HorizontalLine />
        <VerticalLine />
        <button ref={sendRef} onClick={updateUserPassword}>
          Send
        </button>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeUserPasswordCard;
