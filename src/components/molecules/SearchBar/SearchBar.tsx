import React, { useContext } from 'react';
import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';
import { UserContext } from 'context/UserContext';

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  display: block;
  margin: 10px auto;
  padding: 10px;
  height: 35px;
  border-radius: 50px;
  border: none;
  background-color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const { setUserName, handleKey }: any = useContext(UserContext);
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
    </Wrapper>
  );
};

export default SearchBar;
