import React, { useContext, useEffect } from 'react';
import { Wrapper } from './SearchResult.styles';
import ContactItem from '../ContactItem/ContactItem';
import { UserContext } from 'context/UserContext';
import { IUser } from 'views/LogedMainView';

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
