import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import SearchResult from 'components/molecules/SearchResult/SearchResult';
import { UserContext } from 'context/UserContext';

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  display: block;
  margin: 10px auto;
  padding: 10px;
  height: 35px;
  border-radius: 50px;
  border: none;
  background-color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.s};

  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const { user, setUserName, handleKey }: any = useContext(UserContext);
  // console.log(`User in search bar ${user.name}`);
  return (
    <Wrapper>
      <StyledInput
        autoComplete="off"
        type="text"
        id="text"
        name="text"
        placeholder="Search"
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={(e) => handleKey(e.key)}
      ></StyledInput>
      <SearchResult user={user} />
    </Wrapper>
  );
};

export default SearchBar;
