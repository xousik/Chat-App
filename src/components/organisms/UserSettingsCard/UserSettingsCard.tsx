import React from 'react';
import { UserName } from 'components/atoms/UserName/UserName';
import ChangeUserNameCard from 'components/molecules/ChangeUserNameCard/ChangeUserNameCard';
import ChangeUserImageCard from 'components/molecules/ChangeUserImageCard/ChangeUserImageCard';
import ChangeUserPasswordCard from 'components/molecules/ChangeUserPasswordCard/ChangeUserPasswordCard';
import ChangeNicknamesCard from 'components/molecules/ChangeNicknamesCard/ChangeNicknamesCard';
import ChangeThemeCard from 'components/molecules/ChangeThemeCard/ChangeThemeCard';
import DeleteChatCard from 'components/molecules/DeleteChatCard/DeleteChatCard';
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
  openChangeUsersNicknamesCard,
  openDeleteChatCard
} from 'features/userSettingsCard/userSettingsCardSlice';
import defualtAvatar from 'assets/images/defaultAvatar.png';

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
  const dispatch = useAppDispatch();

  const isUserSettingsCardOpen = useAppSelector(
    (state) => state.userSettingsCard.isUserSettingsCardOpen
  );

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

  const handleOpenDeleteChatCard = () => {
    dispatch(openDeleteChatCard());
  };

  return (
    <Wrapper isOpen={isUserSettingsCardOpen}>
      <LogoutButton onClick={handleClose}>Done</LogoutButton>
      <StyledUserImage src={user!.photoURL || defualtAvatar} />
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
          onClick={areChatSettings ? handleOpenDeleteChatCard : handleOpenUserImageCard}
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
        <DeleteChatCard user={user} />
      </SettingsWrapper>
    </Wrapper>
  );
};

export default UserSettingsCard;
