import React, { useState, useEffect, useContext } from 'react';
import ContactItem from 'components/molecules/ContactItem/ContactItem';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from 'context/AuthContext';
import { ICurrentUser } from 'views/ChatView';

interface IChat {
  userInfo: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  lastMessage: {
    text: string;
  };
}

const UserChats = () => {
  const [chats, setChats] = useState<[string, IChat][]>([]);

  const { currentUser }: ICurrentUser = useContext(AuthContext);

  const updateChat = (user: {}) => {
    localStorage.setItem('currentChatId', JSON.stringify(user));
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

    currentUser.uid && getChats();
  }, [currentUser]);

  console.log(chats);

  return (
    <>
      {chats?.map((chat) => (
        <ContactItem
          handleClick={() => updateChat(chat[1].userInfo)}
          user={chat[1].userInfo}
          key={chat[0]}
          lastMessage={chat[1].lastMessage && chat[1].lastMessage.text}
        />
      ))}
    </>
  );
};

export default UserChats;
