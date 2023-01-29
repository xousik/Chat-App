import { useState, useContext, useEffect, useRef } from 'react';
import { OuterWrapper, Wrapper, MessagesWrapper } from './ChatView.styles';
import Header from 'components/molecules/Header/Header';
import ChatInput from 'components/molecules/ChatInput/ChatInput';
import Message from 'components/atoms/Message/Message';
import { doc, onSnapshot, arrayUnion, updateDoc } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from 'context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import catLeft from 'assets/images/catLeft.jpg';
import catRight from 'assets/images/catRight.jpg';
import { LeftCatImg, RightCatImg } from './LogedMainView.styles';
import UserSettingsCard from 'components/organisms/UserSettingsCard/UserSettingsCard';

export interface ICurrentUser {
  currentUser?: {
    uid: string;
    name: string;
    displayName: string;
    photoURL: string;
    email: string;
  };
}

interface MessageProps {
  senderId: string;
  id: string;
  text: string;
}

const ChatView = () => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messagesRef = useRef<null | HTMLUListElement>(null);
  const [areSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const getCurrentChatUser = (key: string) => {
    const user = localStorage.getItem(key);
    if (user) return JSON.parse(user);
  };
  const currentChatUser = getCurrentChatUser('currentChatId');

  const user = {
    chatId:
      currentUser &&
      (currentUser.uid > currentChatUser.uid
        ? currentUser.uid + currentChatUser.uid
        : currentChatUser.uid + currentUser.uid),
    user: currentChatUser
  };

  useEffect(() => {
    if (!user.chatId) return;
    const unSub = onSnapshot(doc(db, 'chats', user.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSub();
  }, [user.chatId]);

  useEffect(() => {
    const unsub = messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);

    return () => unsub;
  }, [messages, text]);

  const currentDate = new Date();

  const handleSend = async () => {
    setText('');
    if (!user.chatId || !currentUser) return;
    await updateDoc(doc(db, 'chats', user.chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        text,
        senderId: currentUser.uid,
        date: currentDate
      })
    });

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [user.chatId + '.lastMessage']: {
        text
      },
      [user.chatId + '.date']: currentDate
    });

    await updateDoc(doc(db, 'userChats', user.user.uid), {
      [user.chatId + '.lastMessage']: {
        text
      },
      [user.chatId + '.date']: currentDate
    });
  };

  return (
    <OuterWrapper>
      <LeftCatImg src={catLeft} alt="cat" />
      <Wrapper>
        <UserSettingsCard
          user={currentChatUser}
          isOpen={areSettingsOpen}
          setSettingsOpen={setSettingsOpen}
          areChatSettings={true}
        />
        <Header user={user.user} setSettingsOpen={setSettingsOpen} />
        <MessagesWrapper ref={messagesRef}>
          {messages.map((message: MessageProps) => (
            <Message
              isOwnerMessage={message.senderId === currentUser!.uid}
              chatUser={user.user}
              key={message.id}
            >
              {message.text}
            </Message>
          ))}
        </MessagesWrapper>
        <ChatInput user={user} handleSend={handleSend} setText={setText} text={text} />
      </Wrapper>
      <RightCatImg src={catRight} alt="cat" />
    </OuterWrapper>
  );
};

export default ChatView;
