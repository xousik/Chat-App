import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import ContactItem from 'components/molecules/ContactItem/ContactItem';
import { signOut } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';

const MainWrapper = styled.div`
  width: 100%;
  height: 90vh;
  background-color: ${({ theme }) => theme.colors.beige};
`;

const ContactsSection = styled.ul`
  height: 80%;
  width: 100%;
`;

const LogedMainView = () => {
  return (
    <MainWrapper>
      <Header handleLogOut={() => signOut(auth)} />
      <SearchBar />
      {/* {user && (
        <ContactsSection>
          <ContactItem key={user.uid} userImg={user.photoURL} name={user.name} />
        </ContactsSection>
      )} */}
    </MainWrapper>
  );
};

export default LogedMainView;
