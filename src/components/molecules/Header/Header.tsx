import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/Username';
import { AuthContext } from 'context/AuthContext';

const Wrapper = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 0 0 20px 20px;
`;

const Logout = styled.button`
  display: flex;
  align-items: center;
  column-gap: 10px;
  position: absolute;
  right: 20px;
  background: none;
  border: none;

  img {
    width: 25px;
    height: 25px;
    font-weight: bold;
  }

  span {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const Header = ({ handleLogOut }: { handleLogOut?: () => void }) => {
  const { currentUser }: any = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Wrapper>
      <UserImage src={currentUser.photoURL} />
      <UserName>{currentUser.displayName}</UserName>
      <Logout onClick={handleLogOut}>
        <span>Logout</span>
        <img src="https://www.svgrepo.com/show/318344/logout.svg" alt="logout-icon" />
      </Logout>
    </Wrapper>
  );
};

export default Header;
