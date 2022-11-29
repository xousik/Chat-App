import React from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/atoms/SearchBar/SearchBar';
import ContactItem from 'components/molecules/ContactItem/ContactItem';
import { useAuth } from 'Hooks/useAuth';

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
  const auth = useAuth();

  return (
    <MainWrapper>
      <Header handleLogOut={auth.handleLogOut} />
      <SearchBar />
      <ContactsSection>
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
      </ContactsSection>
    </MainWrapper>
  );
};

export default MainView;
