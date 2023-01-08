import React from 'react';
import styled from 'styled-components';
import { UserImage } from '../UserImage/UserImage';

const Wrapper = styled.li`
  display: flex;
`;

const StyledUserImage = styled(UserImage)`
  width: 20px;
  height: 20px;
  margin: 0 0 2% 1%;
  align-self: flex-end;
`;

const MessageContent = styled.li`
  list-style-type: none;
  min-width: 15%;
  max-width: 60%;
  word-wrap: break-word;
  padding: 8px;
  margin: 2% 1%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: left;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBrown};
`;
const OwnerMessageContent = styled(MessageContent)`
  align-self: flex-end;
`;
interface MessageProps {
  isOwnerMessage: boolean;
  children: JSX.Element;
  chatUser: {
    photoURL: string;
  };
}

const Message = ({ isOwnerMessage, children, chatUser }: MessageProps) => {
  if (isOwnerMessage) return <OwnerMessageContent>{children}</OwnerMessageContent>;
  return (
    <Wrapper>
      <StyledUserImage src={chatUser.photoURL} />
      <MessageContent>{children}</MessageContent>
    </Wrapper>
  );
};

export default Message;
