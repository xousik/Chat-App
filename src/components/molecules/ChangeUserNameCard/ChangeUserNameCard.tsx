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
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { closeUserNameCard } from 'features/userSettingsCard/userSettingsCardSlice';
interface IChangeUserNameCard {
  user?: {
    photoURL: string;
    displayName: string;
  };
}

const ChangeUserNameCard = ({ user }: IChangeUserNameCard) => {
  const [newUserName, setNewUserName] = useState(user?.displayName);

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.userSettingsCard.isChangeUserNameCardOpen);

  const handleClose = () => {
    dispatch(closeUserNameCard());
  };

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
    handleClose();
  };
  return (
    <Wrapper isChangeUserNameCardOpen={isOpen}>
      <ChangeUserNameCardTitle>Set your new user name</ChangeUserNameCardTitle>
      <StyledInput value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
      <InnerWrapper>
        <div onClick={handleClose}>Cancel</div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={updateUserName}>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeUserNameCard;
