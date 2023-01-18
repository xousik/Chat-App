import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/molecules/SearchBar/SearchBar';
import { signOut } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import SearchResult from 'components/molecules/SearchResult/SearchResult';
import { UserContext } from 'context/UserContext';
import UserChats from 'components/organisms/UserChats/UserChats';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from './ChatView';

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray};

  @media (min-width: 320px) and (max-width: 480px) {
    height: 90vh;
  }
`;

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
    <MainWrapper>
      <Header handleLogOut={() => signOut(auth)} user={currentUser} hasLogout={true} />
      <SearchBar />
      <SearchResult user={user} />
      <UserChats />
    </MainWrapper>
  );
};

export default LogedMainView;
