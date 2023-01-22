import React, { useState } from 'react';
import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/UserName';
import { Input } from 'components/atoms/Input/Input';

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
`;

const StyledUserImage = styled(UserImage)`
  width: 130px;
  height: 130px;
  margin-top: 40px;
  margin-bottom: -70px;
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

  span {
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    margin: 10px 0;
  }

  hr {
    width: 90%;
    border: 1px solid ${({ theme }) => theme.colors.darkBrown};
    opacity: 0.7;
  }
`;

const ChangeUserNameCard = styled.div<{ isChangeUserNameCardOpen: boolean }>`
  width: 90%;
  height: 170px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  margin-top: 20px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeUserNameCardOpen }) => (isChangeUserNameCardOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const ChangeUserNameCardTitle = styled.span`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  div {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    width: 70px;
    text-align: center;
  }
`;

const VerticalLine = styled.span`
  position: absolute;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  /* margin: 0 auto; */
`;

interface ISettingsCard {
  isOpen?: boolean;
  setSettingsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: {
    photoURL: string;
    displayName: string;
  };
}

const UserSettingsCard = ({ isOpen, setSettingsOpen, user }: ISettingsCard) => {
  const [isChangeUserNameCardOpen, setIsChangeUserNameCardOpen] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.displayName);

  const updateUserName = () => {};
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
        <span>Dark mode</span>
        <hr />
        <span onClick={() => setIsChangeUserNameCardOpen(true)}>Change user name</span>
        <hr />
        <span>Change image</span>
        <hr />
        <span>Change password</span>
        <hr />
        <ChangeUserNameCard isChangeUserNameCardOpen={isChangeUserNameCardOpen}>
          <ChangeUserNameCardTitle>Set your new user name</ChangeUserNameCardTitle>
          <Input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          <InnerWrapper>
            <div
              onClick={() => {
                setIsChangeUserNameCardOpen(false);
                setNewUserName(user?.displayName);
              }}
            >
              Cancel
            </div>
            <VerticalLine />
            <div>Save</div>
          </InnerWrapper>
        </ChangeUserNameCard>
      </SettingsWrapper>
    </Wrapper>
  );
};

export default UserSettingsCard;
