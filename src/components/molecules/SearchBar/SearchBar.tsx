import React, { useContext } from 'react';
import { Wrapper, StyledInput } from './SearchBar.styles';
import { UserContext } from 'context/UserContext';

interface UserContextProps {
  setUserName?: (name: string) => void;
  handleKey?: (key: string) => void;
}

const SearchBar = () => {
  const { setUserName, handleKey }: UserContextProps = useContext(UserContext);
  return (
    <Wrapper>
      <StyledInput
        autoComplete="off"
        type="text"
        id="text"
        name="text"
        placeholder="Search"
        onChange={(e) => setUserName!(e.target.value)}
        onKeyDown={(e) => handleKey!(e.key)}
      ></StyledInput>
    </Wrapper>
  );
};

export default SearchBar;
