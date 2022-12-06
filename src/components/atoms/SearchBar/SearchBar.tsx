import React from 'react';
import styled from 'styled-components';
import ContactItem from 'components/molecules/ContactItem/ContactItem';

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  display: block;
  margin: 10px auto 20px auto;
  padding: 10px;
  width: 90%;
  height: 35px;
  border-radius: 10px;
  border: none;
  background-color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.l};

  &:focus {
    outline: none;
  }
`;

const SearchResult = styled.ul`
  position: absolute;
  width: 100%;
  min-height: 40px;
  background-color: #fff;
`;

const SearchBar = ({ setUserName, handleKey, user }: any) => {
  return (
    <Wrapper>
      <StyledInput
        autoComplete="off"
        type="text"
        id="text"
        name="text"
        placeholder="Search"
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => handleKey(e)}
      ></StyledInput>
      <SearchResult>
        <ContactItem userImg={user.photoURL} name={user.name} />
      </SearchResult>
    </Wrapper>
  );
};

export default SearchBar;
