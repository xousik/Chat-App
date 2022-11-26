import React from 'react';
import styled from 'styled-components';
import UserAvatar from 'components/atoms/userAvatar/userAvatar';
import SearchBar from 'components/atoms/SearchBar/SearchBar';
import { UserName } from 'components/atoms/UserName/Username';
import ContactItem from 'components/molecules/ContactItem/ContactItem';

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.customBlack};
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
`;

const ContactsSection = styled.ul`
  height: 80%;
  width: 100%;
`;

const MainView = () => {
  return (
    <MainWrapper>
      <Header>
        <UserAvatar />
        <UserName>Patryk Glinka</UserName>
      </Header>
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
