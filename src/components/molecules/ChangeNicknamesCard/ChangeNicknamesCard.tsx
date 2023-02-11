import React, { useState, useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from 'views/ChatView/ChatView';
import {
  Wrapper,
  ChangeNicknamesCardTitle,
  StyledInput,
  InnerWrapper,
  HorizontalLine,
  VerticalLine
} from './ChangeNicknamesCard.styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { closeChangeUsersNicknamesCard } from 'features/userSettingsCard/userSettingsCardSlice';

interface IChangeNicknamesCard {
  user?: {
    photoURL: string;
    displayName: string;
    name: string;
    uid: string;
  };
  ownerNickname?: string;
  userNickname?: string;
}

const ChangeNicknamesCard = ({ user, ownerNickname, userNickname }: IChangeNicknamesCard) => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const [currentUserNickname, setCurrentUserNickname] = useState('');
  const [chatUserNickname, setChatUserNickname] = useState('');

  const isOpen = useAppSelector((state) => state.userSettingsCard.isChangeUsersNicknamesCardOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeChangeUsersNicknamesCard());
  };

  const updateNicknames = async () => {
    if (!currentUser || !user) return;
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const nicknames = {
      [currentUser.displayName]: currentUserNickname,
      [user.name]: chatUserNickname
    };
    try {
      localStorage.setItem('nicknames', JSON.stringify(nicknames));
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
    <Wrapper isChangeNicknamesCardOpen={isOpen}>
      <ChangeNicknamesCardTitle>Set your new nicknames</ChangeNicknamesCardTitle>
      <StyledInput
        placeholder={ownerNickname ? ownerNickname : currentUser!.displayName}
        value={currentUserNickname}
        onChange={(e) => setCurrentUserNickname(e.target.value)}
      />
      <StyledInput
        placeholder={userNickname ? userNickname : user!.name}
        value={chatUserNickname}
        onChange={(e) => setChatUserNickname(e.target.value)}
      />
      <InnerWrapper>
        <div
          onClick={() => {
            handleClose();
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
