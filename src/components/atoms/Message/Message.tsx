import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserImage } from '../UserImage/UserImage';
import { UserContext } from 'context/UserContext';

const Wrapper = styled.div`
  display: flex;
`;

const StyledUserImage = styled(UserImage)`
  width: 20px;
  height: 20px;
`;

const MessageContent = styled.div`
  min-width: 15%;
  /* min-height: 5%; */
  padding: 8px;
  margin: 2% 0;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBrown};
`;

const Message = ({ children, senderId }: any) => {
  // const { currentUser }: any = useContext(UserContext);
  // const currentChatUser: any = localStorage.getItem('currentChatId');

  // const user = JSON.parse(currentChatUser);
  // console.log(currentUser);

  // console.log(senderId);
  // const { handleSearch }: any = useContext(UserContext);
  // const getSender = async () => {
  //   const user = await handleSearch(senderId);
  //   console.log(user);
  // };

  // getSender();

  return (
    <Wrapper>
      <StyledUserImage />
      <MessageContent>{children}</MessageContent>
    </Wrapper>
  );
};

export default Message;
