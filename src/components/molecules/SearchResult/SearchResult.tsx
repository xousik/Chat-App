import React, { useContext, useEffect } from 'react';
import { Wrapper } from './SearchResult.styles';
import ContactItem from '../ContactItem/ContactItem';
import { UserContext } from 'context/UserContext';

interface IHandleSelect {
  handleSelect?: () => Promise<void>;
  userName?: string;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  isVisible?: boolean;
  user?: {
    name?: string;
    photoURL?: string;
    displayName?: string;
  };
}

const SearchResult = () => {
  const { handleSelect, userName, setIsVisible, isVisible, user }: IHandleSelect =
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
