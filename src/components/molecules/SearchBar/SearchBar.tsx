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
  padding: 15px;
  height: 25px;
  width: 80%;
  border-radius: 50px;
  border: none;
  background-color: lightgrey;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  &:focus {
    outline: none;
  }

  @media (min-width: 1250px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    width: 30%;
  }
`;

interface UserContextProps {
  setUserName?: (name: string) => void;
  handleKey?: (key: string) => void;
  handleSearch?: () => void;
}

const SearchBar = () => {
  const { setUserName, handleKey, handleSearch }: UserContextProps = useContext(UserContext);
  if (!setUserName || !handleKey || !handleSearch) return null;
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
