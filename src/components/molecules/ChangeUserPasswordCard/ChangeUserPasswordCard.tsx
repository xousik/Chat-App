import React from 'react';
import styled from 'styled-components';
import { auth } from 'FirebaseApp/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const Wrapper = styled.div<{ isChangeUserPasswordCardOpen: boolean }>`
  width: 90%;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  margin-top: 20px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeUserPasswordCardOpen }) =>
    isChangeUserPasswordCardOpen ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ChangeUserPasswordCardTitle = styled.span`
  width: 75%;
  margin: 10px auto 10px auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  position: relative;

  div {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    width: 70px;
    text-align: center;

    &:nth-child(4) {
      color: ${({ theme }) => theme.colors.darkRed};
    }
  }
`;

const HorizontalLine = styled.span`
  position: absolute;
  top: -11px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: 320px) and (max-width: 480px) {
    top: -10px;
  }
`;

const VerticalLine = styled.span`
  position: absolute;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

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
  const updateUserPassword = async () => {
    if (!user) return;
    await sendPasswordResetEmail(auth, user.email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error.message));
    setIsChangeUserPasswordCardOpen(false);
  };
  return (
    <Wrapper isChangeUserPasswordCardOpen={isChangeUserPasswordCardOpen}>
      <ChangeUserPasswordCardTitle>
        Send an email to reset your password
      </ChangeUserPasswordCardTitle>
      <InnerWrapper>
        <div
          onClick={() => {
            setIsChangeUserPasswordCardOpen(false);
          }}
        >
          Cancel
        </div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={updateUserPassword}>Send</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeUserPasswordCard;
