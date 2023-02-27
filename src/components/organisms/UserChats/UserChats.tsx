import { useState, useEffect, useContext } from 'react';
import ContactItem from 'components/molecules/ContactItem/ContactItem';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from 'views/ChatView/ChatView';

interface INickname {
  [key: string]: string;
}
interface IChat {
  userInfo: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  lastMessage: {
    text: string;
  };
  nicknames: INickname;
}

const UserChats = () => {
  const [chats, setChats] = useState<[string, IChat][]>([]);

  const { currentUser }: ICurrentUser = useContext(AuthContext);

  const updateChat = (user: {}, nicknames: {}) => {
    localStorage.setItem('currentChatId', JSON.stringify(user));
    if (nicknames === undefined) return;
    localStorage.setItem('nicknames', JSON.stringify(nicknames));
  };

  useEffect(() => {
    if (!currentUser) return;
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        const data = doc.data();
        if (data) {
          setChats(Object.entries(data));
        }
      });

      return () => unsub();
    };
    try {
      currentUser.uid && getChats();
    } catch (error) {
      let errorMessage = 'Something went wrong...';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  }, [currentUser]);

  return (
    <>
      {chats?.map((chat) => (
        <ContactItem
          nicknames={chat[1].nicknames}
          handleClick={() => updateChat(chat[1].userInfo, chat[1].nicknames)}
          user={chat[1].userInfo}
          key={chat[0]}
          lastMessage={chat[1].lastMessage && chat[1].lastMessage.text}
        />
      ))}
    </>
  );
};

export default UserChats;
