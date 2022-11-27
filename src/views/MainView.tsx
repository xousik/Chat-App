import React from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import SearchBar from 'components/atoms/SearchBar/SearchBar';
import ContactItem from 'components/molecules/ContactItem/ContactItem';

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
  return (
    <MainWrapper>
      <Header />
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
