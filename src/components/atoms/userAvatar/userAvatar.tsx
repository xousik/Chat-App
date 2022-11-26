import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  margin: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: lightgrey;
`;

const UserAvatar = () => {
  return <Wrapper>{/* <img src='' alt="userAvatar" /> */}</Wrapper>;
};

export default UserAvatar;
