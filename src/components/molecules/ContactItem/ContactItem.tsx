import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/UserName';
import { LastMessage } from 'components/atoms/LastMessage/LastMessage';
import { Link } from 'react-router-dom';
import { Wrapper, TextWrapper } from './ContactItem.styles';

interface INickname {
  [key: string]: string;
}

type ContactProps = {
  user?: {
    name?: string;
    photoURL?: string;
    displayName?: string;
  };
  handleClick?: () => void;
  lastMessage?: string;
  nicknames?: INickname;
};

const ContactItem = ({ user, handleClick, lastMessage, nicknames }: ContactProps) => {
  return (
    <Wrapper onClick={handleClick} as={Link} to="/chat">
      <UserImage src={user && user.photoURL} />
      <TextWrapper>
        <UserName>{nicknames ? nicknames[user?.name!] : user?.name || user?.displayName}</UserName>
        <LastMessage>{lastMessage && lastMessage}</LastMessage>
      </TextWrapper>
    </Wrapper>
  );
};

export default ContactItem;
