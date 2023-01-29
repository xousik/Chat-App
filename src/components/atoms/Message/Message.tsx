import { Wrapper, StyledUserImage, MessageContent, OwnerMessageContent } from './Message.styles';

interface MessageProps {
  isOwnerMessage: boolean;
  children: string;
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
