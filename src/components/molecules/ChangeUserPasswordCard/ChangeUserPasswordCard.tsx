import { useState, useRef } from 'react';
import { auth } from 'FirebaseApp/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Wrapper,
  ChangeUserPasswordCardTitle,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeUserPasswordCard.styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { closeUserPasswordCard } from 'features/userSettingsCard/userSettingsCardSlice';

interface IChangeUserPasswordCard {
  user?: {
    photoURL: string;
    displayName: string;
    email: string;
  };
}

const ChangeUserPasswordCard = ({ user }: IChangeUserPasswordCard) => {
  const [titleMessage, setTitleMessage] = useState<string>('Send an email to reset your password');

  const sendRef = useRef<HTMLButtonElement>(null);

  const isOpen = useAppSelector((state) => state.userSettingsCard.isChangeUserPasswordCardOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeUserPasswordCard());
  };

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
    <Wrapper isChangeUserPasswordCardOpen={isOpen}>
      <ChangeUserPasswordCardTitle>{titleMessage}</ChangeUserPasswordCardTitle>
      <InnerWrapper>
        <button onClick={handleClose}>Cancel</button>
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
