import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from 'FirebaseApp/firebase';
import {
  Wrapper,
  ChangeUserNameCardTitle,
  StyledInput,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeUserNameCard.styles';

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
    const docSnap = await getDoc(doc(db, 'userChats', user.uid));

    if (user.displayName === newUserName) return;
    await updateProfile(user, {
      displayName: newUserName
    });
    await updateDoc(doc(db, 'users', user.uid), {
      name: newUserName
    });
    if (docSnap.exists()) {
      Object.entries(docSnap.data()).forEach((chat) => {
        updateDoc(doc(db, 'userChats', chat[1].userInfo.uid), {
          [chat[0] + '.userInfo.name']: newUserName
        });
      });
    }
    setIsChangeUserNameCardOpen(false);
  };
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
