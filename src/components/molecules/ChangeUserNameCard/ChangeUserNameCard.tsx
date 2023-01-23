import React, { useState } from 'react';
import styled from 'styled-components';
import { updateProfile } from 'firebase/auth';
import { db } from 'FirebaseApp/firebase';
<<<<<<< HEAD
import { doc, updateDoc } from 'firebase/firestore';
=======
import { doc, updateDoc, getDoc } from 'firebase/firestore';
>>>>>>> main
import { auth } from 'FirebaseApp/firebase';
import { Input } from 'components/atoms/Input/Input';

const Wrapper = styled.div<{ isChangeUserNameCardOpen: boolean }>`
  width: 90%;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  margin-top: 20px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeUserNameCardOpen }) => (isChangeUserNameCardOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const ChangeUserNameCardTitle = styled.span`
  width: 80%;
  margin: 10px auto 5px auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StyledInput = styled(Input)`
  padding: 10px 10px;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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
  top: 10px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: 320px) and (max-width: 480px) {
    top: 7px;
  }
`;

const VerticalLine = styled.span`
  position: absolute;
  height: 41px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

interface IChangeUserNameCard {
  user?: {
    photoURL: string;
    displayName: string;
  };
  setIsChangeUserNameCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeUserNameCardOpen: boolean;
}

const ChangeUserNameCard = ({
  user,
  setIsChangeUserNameCardOpen,
  isChangeUserNameCardOpen
}: IChangeUserNameCard) => {
  const [newUserName, setNewUserName] = useState(user?.displayName);

  const updateUserName = async () => {
    const user: any = auth.currentUser;
<<<<<<< HEAD
=======
    const docSnap = await getDoc(doc(db, 'userChats', user.uid));
>>>>>>> main
    if (user.displayName === newUserName) return;
    await updateProfile(user, {
      displayName: newUserName
    });
    await updateDoc(doc(db, 'users', user.uid), {
      name: newUserName
    });
<<<<<<< HEAD
    setIsChangeUserNameCardOpen(false);
  };
=======
    if (docSnap.exists()) {
      Object.entries(docSnap.data()).forEach((chat) => {
        updateDoc(doc(db, 'userChats', chat[1].userInfo.uid), {
          [chat[0] + '.userInfo.name']: newUserName
        });
      });
    }
    setIsChangeUserNameCardOpen(false);
  };

>>>>>>> main
  return (
    <Wrapper isChangeUserNameCardOpen={isChangeUserNameCardOpen}>
      <ChangeUserNameCardTitle>Set your new user name</ChangeUserNameCardTitle>
      <StyledInput value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
      <InnerWrapper>
        <div
          onClick={() => {
            setIsChangeUserNameCardOpen(false);
            setNewUserName(user?.displayName);
          }}
        >
          Cancel
        </div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={updateUserName}>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeUserNameCard;
