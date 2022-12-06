import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from 'context/AuthContext';
import { AuthProps } from 'views/App';

const Wrapper = styled.div`
  display: inline-block;
  margin: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
`;

const Avatar = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const UserAvatar = ({ userImg }: any) => {
  const { currentUser }: AuthProps = useContext(AuthContext);
  return (
    <Wrapper>
      <Avatar src={userImg} alt="user-image" />
    </Wrapper>
  );
};

export default UserAvatar;
