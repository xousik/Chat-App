/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
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
import { LeftCatImg, RightCatImg } from 'views/LogedMainView/LogedMainView.styles';
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
  const [userNickname, setUserNickname] = useState('');

  const getCurrentChatUser = (key: string) => {
    const user = localStorage.getItem(key);
    if (user) return JSON.parse(user);
  };

  const getNicknames = (key: string) => {
    const nicknames = localStorage.getItem(key);
    if (!nicknames) return;
    const nicknamesObj = nicknames && JSON.parse(nicknames);
    return {
      userNickname: nicknamesObj[currentChatUser?.name],
      ownerNickname: nicknamesObj[currentUser!.displayName]
    };
  };

  const currentChatUser = getCurrentChatUser('currentChatId');

  const nicknames = getNicknames('nicknames');

  const combinedId =
    currentUser &&
    (currentUser.uid > currentChatUser.uid
      ? currentUser.uid + currentChatUser.uid
      : currentChatUser.uid + currentUser.uid);

  const user = {
    chatId: combinedId,
    user: currentChatUser
  };

  useEffect(() => {
    onSnapshot(doc(db, 'chats', user.chatId!), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
        console.log('Im setting messages');
      }
    });
    const getNicknames = () => {
      onSnapshot(doc(db, 'userChats', currentUser!.uid), (doc) => {
        if (doc.exists()) {
          const data = Object.entries(doc.data());
          data.filter((chat) => {
            if (chat[0] === combinedId && chat[1].nicknames) {
              // setOwnerNickname(chat[1].nicknames[currentUser!.displayName]);
              setUserNickname(chat[1].nicknames[currentChatUser.name]);
              console.log('Im getting nicknames');
            }
          });
        }
      });
    };
    Object.values(currentUser!).length && getNicknames();
  }, [combinedId]);

  useEffect(() => {
    const unsub = messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
    console.log('Im scrolling');
    return () => unsub;
  }, [messages]);

  const handleSend = async () => {
    const currentDate = new Date();
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
          userNickname={userNickname || nicknames?.userNickname}
          ownerNickname={nicknames?.ownerNickname}
          user={currentChatUser}
          isOpen={areSettingsOpen}
          setSettingsOpen={setSettingsOpen}
          areChatSettings={true}
        />
        <Header
          nickname={userNickname || nicknames?.userNickname}
          user={user.user}
          setSettingsOpen={setSettingsOpen}
        />
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
