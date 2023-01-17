import React, { useContext } from 'react';
import styled from 'styled-components';
import ContactItem from '../ContactItem/ContactItem';
import { UserContext } from 'context/UserContext';
import { IUser } from 'views/LogedMainView';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IHandleSelect {
  handleSelect?: () => void;
  userName?: string;
  setIsVisible?: (isVisible: boolean) => void;
  isVisible?: boolean;
}

const SearchResult = ({ user }: IUser) => {
  // [state, setState
  const { handleSelect, userName, setIsVisible, isVisible }: IHandleSelect =
    useContext(UserContext);
  if (!handleSelect || !user || !setIsVisible) return null;
  if (!userName) setIsVisible(false);
  return (
    <>
      {isVisible && (
        <Wrapper>
          <ContactItem handleClick={handleSelect} user={user} />
        </Wrapper>
      )}
    </>
  );
};

export default SearchResult;
