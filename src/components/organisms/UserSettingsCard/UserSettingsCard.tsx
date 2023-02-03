import React, { useState, useContext } from 'react';
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

export interface ISettingsCard {
  isOpen?: boolean;
  setSettingsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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
  isOpen,
  setSettingsOpen,
  user,
  areChatSettings,
  userNickname,
  ownerNickname
}: ISettingsCard) => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const [isChangeUserNameCardOpen, setIsChangeUserNameCardOpen] = useState(false);
  const [isChangeUserImageCardOpen, setIsChangeUserImageCardOpen] = useState(false);
  const [isChangeUserPasswordCardOpen, setIsChangeUserPasswordCardOpen] = useState(false);
  const [isChangeNicknamesCardOpen, setIsChangeNicknamesCardOpen] = useState(false);
  const [isChangeThemeCardOpen, setIsChangeThemeCardOpen] = useState(false);
  const navigate = useNavigate();

  const openChangeUserNameCard = () => {
    setIsChangeUserImageCardOpen(false);
    setIsChangeUserPasswordCardOpen(false);
    setIsChangeUserNameCardOpen(true);
  };

  const openChangeUserImageCard = () => {
    setIsChangeUserNameCardOpen(false);
    setIsChangeUserPasswordCardOpen(false);
    setIsChangeUserImageCardOpen(true);
  };

  const openChangeUserPasswordCard = () => {
    setIsChangeUserNameCardOpen(false);
    setIsChangeUserImageCardOpen(false);
    setIsChangeUserPasswordCardOpen(true);
  };

  const openChangeNicknamesCard = () => {
    setIsChangeThemeCardOpen(false);
    setIsChangeNicknamesCardOpen(true);
  };

  const openChangeThemeCard = () => {
    setIsChangeNicknamesCardOpen(false);
    setIsChangeThemeCardOpen(true);
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

      navigate('/');

      await getDoc(userChatsRef).then((doc) => {
        const data = doc.data();
        if (Object.entries(data!).flat().includes(combinedId)) return;
        deleteWholeChat();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper isOpen={isOpen}>
      <LogoutButton
        onClick={() => {
          setSettingsOpen!(false);
          setIsChangeUserNameCardOpen(false);
        }}
      >
        Done
      </LogoutButton>
      <StyledUserImage src={user!.photoURL} />
      <UserName>{userNickname || user!.displayName || user!.name}</UserName>
      <SettingsWrapper>
        <Option onClick={areChatSettings ? openChangeThemeCard : undefined}>
          {areChatSettings ? 'Theme' : 'Dark mode'}
        </Option>
        <hr />
        <Option onClick={areChatSettings ? openChangeNicknamesCard : openChangeUserNameCard}>
          {areChatSettings ? 'Nicknames' : 'Change user name'}
        </Option>
        <hr />
        <Option
          areChatSettings={areChatSettings}
          onClick={areChatSettings ? deleteChat : openChangeUserImageCard}
        >
          {areChatSettings ? 'Delete contact' : 'Change image'}
        </Option>
        <hr />
        <Option onClick={openChangeUserPasswordCard}>
          {areChatSettings ? null : 'Change password'}
        </Option>
        {areChatSettings ? null : <hr />}
        <ChangeUserNameCard
          isChangeUserNameCardOpen={isChangeUserNameCardOpen}
          setIsChangeUserNameCardOpen={setIsChangeUserNameCardOpen}
          user={user}
        />
        <ChangeUserImageCard
          isChangeUserImageCardOpen={isChangeUserImageCardOpen}
          setIsChangeUserImageCardOpen={setIsChangeUserImageCardOpen}
          user={user}
        />
        <ChangeUserPasswordCard
          isChangeUserPasswordCardOpen={isChangeUserPasswordCardOpen}
          setIsChangeUserPasswordCardOpen={setIsChangeUserPasswordCardOpen}
          user={user}
        />
        <ChangeNicknamesCard
          ownerNickname={ownerNickname}
          userNickname={userNickname}
          isChangeNicknamesCardOpen={isChangeNicknamesCardOpen}
          setIsChangeNicknamesCardOpen={setIsChangeNicknamesCardOpen}
          user={user}
        />
        <ChangeThemeCard
          isChangeThemeCardOpen={isChangeThemeCardOpen}
          setIsChangeThemeCardOpen={setIsChangeThemeCardOpen}
        />
      </SettingsWrapper>
    </Wrapper>
  );
};

export default UserSettingsCard;
