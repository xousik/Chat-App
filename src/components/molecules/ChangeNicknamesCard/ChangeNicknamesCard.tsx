import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { Input } from 'components/atoms/Input/Input';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from 'views/ChatView';

const Wrapper = styled.div<{ isChangeNicknamesCardOpen: boolean }>`
  width: 90%;
  height: 220px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 30px;
  /* margin-top: 20px; */
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: ${({ isChangeNicknamesCardOpen }) => (isChangeNicknamesCardOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ChangeNicknamesCardTitle = styled.span`
  width: 100%;
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
  height: 50px;
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
  top: 5px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: 320px) and (max-width: 480px) {
    top: 3px;
  }
`;

const VerticalLine = styled.span`
  position: absolute;
  height: 41px;
  border: 1px solid ${({ theme }) => theme.colors.black};
`;

interface IChangeNicknamesCard {
  user?: {
    photoURL: string;
    displayName: string;
    name: string;
    uid: string;
  };
  setIsChangeNicknamesCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeNicknamesCardOpen: boolean;
}

const ChangeNicknamesCard = ({
  user,
  setIsChangeNicknamesCardOpen,
  isChangeNicknamesCardOpen
}: IChangeNicknamesCard) => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const [currentUserNickname, setCurrentUserNickname] = useState('');
  const [chatUserNickname, setChatUserNickname] = useState('');

  const updateNicknames = async () => {
    if (!currentUser || !user) return;
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      await updateDoc(doc(db, 'userChats', currentUser!.uid), {
        [combinedId + '.nicknames']: {
          [currentUser.displayName]: currentUserNickname,
          [user.name]: chatUserNickname
        }
      });
      await updateDoc(doc(db, 'userChats', user!.uid), {
        [combinedId + '.nicknames']: {
          [user.name]: chatUserNickname,
          [currentUser.displayName]: currentUserNickname
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper isChangeNicknamesCardOpen={isChangeNicknamesCardOpen}>
      <ChangeNicknamesCardTitle>Set your new nicknames</ChangeNicknamesCardTitle>
      <StyledInput
        placeholder={currentUserNickname || currentUser!.displayName}
        value={currentUserNickname}
        onChange={(e) => setCurrentUserNickname(e.target.value)}
      />
      <StyledInput
        placeholder={chatUserNickname || user!.name}
        value={chatUserNickname}
        onChange={(e) => setChatUserNickname(e.target.value)}
      />
      <InnerWrapper>
        <div
          onClick={() => {
            setIsChangeNicknamesCardOpen(false);
            setCurrentUserNickname('');
            setChatUserNickname('');
          }}
        >
          Cancel
        </div>
        <HorizontalLine />
        <VerticalLine />
        <div onClick={updateNicknames}>Save</div>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ChangeNicknamesCard;
