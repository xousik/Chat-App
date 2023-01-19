import React, { useContext, useEffect } from 'react';
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
  const { handleSelect, userName, setIsVisible, isVisible }: IHandleSelect =
    useContext(UserContext);

  useEffect(() => {
    if (setIsVisible) {
      if (!userName) setIsVisible(false);
    }
  }, [userName, setIsVisible]);

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
