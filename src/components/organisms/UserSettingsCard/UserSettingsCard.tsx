import React, { useState } from 'react';
import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/UserName';
import ChangeUserNameCard from 'components/molecules/ChangeUserNameCard/ChangeUserNameCard';
import ChangeUserImageCard from 'components/molecules/ChangeUserImageCard/ChangeUserImageCard';
import ChangeUserPasswordCard from 'components/molecules/ChangeUserPasswordCard/ChangeUserPasswordCard';

const Wrapper = styled.div<ISettingsCard>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: ${({ isOpen }) => (isOpen ? '0' : '100%')};
  transition: top 0.3s ease-in-out;
`;

const LogoutButton = styled.button`
  cursor: pointer;
  position: absolute;
  height: 25px;
  width: 50px;
  right: 0;
  margin: 15px 15px 0 0;
  background-color: ${({ theme }) => theme.colors.gray};
  border: none;
  color: ${({ theme }) => theme.colors.darkBrown};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
`;

const StyledUserImage = styled(UserImage)`
  width: 100px;
  height: 100px;
  margin-top: 50px;
  margin-bottom: -310px;

  @media (min-width: 480px) and (max-width: 700px) {
    margin-bottom: -230px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    margin-bottom: -50px;
  }
`;

const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  height: 400px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.beige};
  margin-bottom: 30px;

  hr {
    width: 90%;
    border: 1px solid ${({ theme }) => theme.colors.darkBrown};
    opacity: 0.7;
  }
`;

const Option = styled.span`
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  margin: 10px 0;
`;

interface ISettingsCard {
  isOpen?: boolean;
  setSettingsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: {
    photoURL: string;
    displayName: string;
    email: string;
  };
}

const UserSettingsCard = ({ isOpen, setSettingsOpen, user }: ISettingsCard) => {
  const [isChangeUserNameCardOpen, setIsChangeUserNameCardOpen] = useState(false);
  const [isChangeUserImageCardOpen, setIsChangeUserImageCardOpen] = useState(false);
  const [isChangeUserPasswordCardOpen, setIsChangeUserPasswordCardOpen] = useState(false);

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

  return (
    <Wrapper isOpen={isOpen}>
      <LogoutButton
        onClick={() => {
          setSettingsOpen && setSettingsOpen(false);
          setIsChangeUserNameCardOpen(false);
        }}
      >
        Done
      </LogoutButton>
      <StyledUserImage src={user?.photoURL} />
      <UserName>{user?.displayName}</UserName>
      <SettingsWrapper>
        <Option>Dark mode</Option>
        <hr />
        <Option onClick={openChangeUserNameCard}>Change user name</Option>
        <hr />
        <Option onClick={openChangeUserImageCard}>Change image</Option>
        <hr />
        <Option onClick={openChangeUserPasswordCard}>Change password</Option>
        <hr />
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
      </SettingsWrapper>
    </Wrapper>
  );
};

export default UserSettingsCard;
