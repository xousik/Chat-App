import React, { useContext } from 'react';
import styled from 'styled-components';
import ContactItem from '../ContactItem/ContactItem';
import { UserContext } from 'context/UserContext';

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

const SearchResult = ({ user }: any) => {
  const { handleSelect }: any = useContext(UserContext);
  return (
    <>
      {user ? (
        <Wrapper>
          <ContactItem handleClick={handleSelect} user={user} />
        </Wrapper>
      ) : null}
    </>
  );
};

export default SearchResult;
