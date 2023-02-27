import React, { useContext } from 'react';
import { UserName } from 'components/atoms/UserName/UserName';
import ChangeUserNameCard from 'components/molecules/ChangeUserNameCard/ChangeUserNameCard';
import ChangeUserImageCard from 'components/molecules/ChangeUserImageCard/ChangeUserImageCard';
import ChangeUserPasswordCard from 'components/molecules/ChangeUserPasswordCard/ChangeUserPasswordCard';
import ChangeNicknamesCard from 'components/molecules/ChangeNicknamesCard/ChangeNicknamesCard';
import ChangeThemeCard from 'components/molecules/ChangeThemeCard/ChangeThemeCard';
import { deleteDoc, deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { ICurrentUser } from 'views/ChatView/ChatView';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Wrapper,
  LogoutButton,
  StyledUserImage,
  SettingsWrapper,
  Option
} from './UserSettingsCard.styles';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  closeUserSettingsCard,
  openUserNameCard,
  openUserImageCard,
  openUserPasswordCard,
  openChangeThemeCard,
  openChangeUsersNicknamesCard
} from 'features/userSettingsCard/userSettingsCardSlice';

export interface ISettingsCard {
  user?: {
    photoURL: string;
    displayName: string;
    email: string;
    name: string;
    uid: string;
  };
  areChatSettings?: boolean;
  userNickname?: string;
  ownerNickname?: string;
}

const UserSettingsCard = ({
  user,
  areChatSettings,
  userNickname,
  ownerNickname
}: ISettingsCard) => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUserSettingsCardOpen = useAppSelector(
    (state) => state.userSettingsCard.isUserSettingsCardOpen
  );

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

  const handleClose = () => {
    dispatch(closeUserSettingsCard());
  };

  const handleOpenUserNameCard = () => {
    dispatch(openUserNameCard());
  };

  const handleOpenUserImageCard = () => {
    dispatch(openUserImageCard());
  };

  const handleOpenUserPasswordCard = () => {
    dispatch(openUserPasswordCard());
  };

  const handleOpenChangeThemeCard = () => {
    dispatch(openChangeThemeCard());
  };

  const handleOpenChangeNicknamesCard = () => {
    dispatch(openChangeUsersNicknamesCard());
  };

  return (
    <Wrapper isOpen={isUserSettingsCardOpen}>
      <LogoutButton onClick={handleClose}>Done</LogoutButton>
      <StyledUserImage src={user!.photoURL} />
      <UserName>{userNickname || user!.displayName || user!.name}</UserName>
      <SettingsWrapper>
        <Option onClick={areChatSettings ? handleOpenChangeThemeCard : undefined}>
          {areChatSettings ? 'Theme' : 'Dark mode'}
        </Option>
        <hr />
        <Option onClick={areChatSettings ? handleOpenChangeNicknamesCard : handleOpenUserNameCard}>
          {areChatSettings ? 'Nicknames' : 'Change user name'}
        </Option>
        <hr />
        <Option
          areChatSettings={areChatSettings}
          onClick={areChatSettings ? deleteChat : handleOpenUserImageCard}
        >
          {areChatSettings ? 'Delete contact' : 'Change image'}
        </Option>
        <hr />
        <Option onClick={handleOpenUserPasswordCard}>
          {areChatSettings ? null : 'Change password'}
        </Option>
        {areChatSettings ? null : <hr />}
        <ChangeUserNameCard user={user} />
        <ChangeUserImageCard user={user} />
        <ChangeUserPasswordCard user={user} />
        <ChangeNicknamesCard
          ownerNickname={ownerNickname}
          userNickname={userNickname}
          user={user}
        />
        <ChangeThemeCard />
      </SettingsWrapper>
    </Wrapper>
  );
};

export default UserSettingsCard;
