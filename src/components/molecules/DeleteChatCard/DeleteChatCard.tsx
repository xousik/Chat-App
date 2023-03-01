import React, { useContext } from 'react';
import {
  Wrapper,
  ChangeThemeCardTitle,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './DeleteChatCard.styles';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  closeDeleteChatCard,
  closeUserSettingsCard
} from 'features/userSettingsCard/userSettingsCardSlice';
import { ICurrentUser } from 'views/ChatView/ChatView';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';

type User = {
  user?: {
    photoURL: string;
    displayName: string;
    name: string;
    uid: string;
  };
};

const DeleteChatCard = ({ user }: User) => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const navigate = useNavigate();

  const isOpen = useAppSelector((state) => state.userSettingsCard.isDeleteChatCardOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeDeleteChatCard());
    dispatch(closeUserSettingsCard());
  };

  const deleteChat = async () => {
    if (!currentUser || !user) return;
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const ownerChatsRef = doc(db, 'userChats', currentUser.uid);
    const userChatsRef = doc(db, 'userChats', user.uid);

    const deleteWholeChat = async () => {
      await deleteDoc(doc(db, 'chats', combinedId));
    };

    try {
      await updateDoc(ownerChatsRef, {
        [combinedId]: deleteField()
      });

      handleClose();
      navigate('/');

      await getDoc(userChatsRef).then((doc) => {
        const data = doc.data();
        if (Object.entries(data!).flat().includes(combinedId)) return;
        deleteWholeChat();
      });
    } catch (error) {
      let errorMessage = 'Something went wrong...';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  };

  return (
    <Wrapper isDeleteChatCardOpen={isOpen}>
      <ChangeThemeCardTitle>Are You Sure ?</ChangeThemeCardTitle>
      <InnerWrapper>
        <div onClick={() => dispatch(closeDeleteChatCard())}>Cancel</div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={deleteChat}>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default DeleteChatCard;
