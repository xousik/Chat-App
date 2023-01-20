import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import SearchResult from 'components/molecules/SearchResult/SearchResult';
import { UserContext } from 'context/UserContext';
import UserChats from 'components/organisms/UserChats/UserChats';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from './ChatView';
import { LeftSidebarImg, RightSidebarImg, MainWrapper, OuterWrapper } from './LogedMainView.styles';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/molecules/SearchBar/SearchBar';
import catLeft from 'assets/images/catLeft.jpg';
import catRight from 'assets/images/catRight.jpg';

export interface IUser {
  user?: {
    uid: string;
    email: string;
    displayName: string;
    name: string;
    photoURL: string;
  };
}

const LogedMainView = () => {
  const { user }: IUser = useContext(UserContext);
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  localStorage.removeItem('currentChatId');
  return (
    <OuterWrapper>
      <LeftSidebarImg src={catLeft} />
      <MainWrapper>
        <Header handleLogOut={() => signOut(auth)} user={currentUser} hasLogout={true} />
        <SearchBar />
        <SearchResult user={user} />
        <UserChats />
      </MainWrapper>
      <RightSidebarImg src={catRight} />
    </OuterWrapper>
  );
};

export default LogedMainView;
