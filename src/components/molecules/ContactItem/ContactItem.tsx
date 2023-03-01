import { UserImage } from 'components/atoms/UserImage/UserImage';
import { UserName } from 'components/atoms/UserName/UserName';
import { LastMessage } from 'components/atoms/LastMessage/LastMessage';
import { Wrapper, TextWrapper } from './ContactItem.styles';
import defaultAvatar from 'assets/images/defaultAvatar.png';
import { Link } from 'react-router-dom';

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
  const handleUserName = () => {
    if (nicknames && nicknames[user?.name!]) {
      return nicknames[user?.name!];
    } else {
      return user?.name;
    }
  };

  const userName = handleUserName();

  return (
    <Wrapper onClick={handleClick} as={Link} to="/chat">
      <UserImage src={(user && user.photoURL) || defaultAvatar} />
      <TextWrapper>
        <UserName>{userName}</UserName>
        <LastMessage>{lastMessage && lastMessage}</LastMessage>
      </TextWrapper>
    </Wrapper>
  );
};

export default ContactItem;
