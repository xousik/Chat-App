import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/atoms/SearchBar/SearchBar';
import ContactItem from 'components/molecules/ContactItem/ContactItem';
import { signOut } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';

const MainWrapper = styled.div`
  width: 100%;
  height: 90vh;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.customBlack};
`;

const ContactsSection = styled.ul`
  height: 80%;
  width: 100%;
`;

const MainView = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser]: any = useState([]);

  const handleSearch = async (e: any) => {
    const q = query(collection(db, 'users'), where('name', '==', userName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
    e.target.value = '';
    console.log(user);
  };

  const handleKey = (e: any) => {
    e.code === 'Enter' && handleSearch(e);
  };
  return (
    <MainWrapper>
      <Header handleLogOut={() => signOut(auth)} />
      <SearchBar setUserName={setUserName} handleKey={handleKey} user={user} />
      {user && (
        <ContactsSection>
          <ContactItem key={user.uid} userImg={user.photoURL} name={user.name} />
        </ContactsSection>
      )}
    </MainWrapper>
  );
};

export default MainView;
