import React, { useState, useEffect, useContext } from 'react';
import ContactItem from 'components/molecules/ContactItem/ContactItem';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from 'context/AuthContext';

const UserChats = () => {
  const [chats, setChats]: any = useState([]);

  const { currentUser }: any = useContext(AuthContext);

  const updateChat = (user: any) => {
    localStorage.setItem('currentChatId', JSON.stringify(user));
  };

  useEffect(() => {
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
  }, [currentUser.uid]);

  return (
    <>
      {chats?.map((chat: any) => (
        <ContactItem
          handleClick={() => updateChat(chat[1].userInfo)}
          user={chat[1].userInfo}
          key={chat[0]}
        />
      ))}
    </>
  );
};

export default UserChats;
