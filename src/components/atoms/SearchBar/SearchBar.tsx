import React from 'react';
import styled from 'styled-components';

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

const SearchBar = () => {
  return (
    <StyledInput
      autoComplete="off"
      type="text"
      id="text"
      name="text"
      placeholder="Search"
    ></StyledInput>
  );
};

export default SearchBar;
