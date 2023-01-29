import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/UserName';
import { LastMessage } from 'components/atoms/LastMessage/LastMessage';
import { Link } from 'react-router-dom';
import { Wrapper, TextWrapper } from './ContactItem.styles';

type ContactProps = {
  user?: {
    displayName: string;
    name?: string;
    photoURL: string;
  };
  handleClick?: () => void;
  lastMessage?: string;
};

const ContactItem = ({ user, handleClick, lastMessage }: ContactProps) => {
  return (
    <Wrapper onClick={handleClick} as={Link} to="/chat">
      <UserImage src={user!.photoURL} />
      <TextWrapper>
        <UserName>{user!.name || user!.displayName}</UserName>
        <LastMessage>{lastMessage && lastMessage}</LastMessage>
      </TextWrapper>
    </Wrapper>
  );
};

export default ContactItem;
