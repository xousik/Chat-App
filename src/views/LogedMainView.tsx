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

const MainWrapper = styled.div`
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.beige};
`;

const LogedMainView = () => {
  const { user }: any = useContext(UserContext);
  const { currentUser }: any = useContext(AuthContext);
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
