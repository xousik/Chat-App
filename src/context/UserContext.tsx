import { useState, useContext, createContext } from 'react';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';
import { AuthContext } from './AuthContext';
import { ChatContext } from './ChatContext';

type Props = {
  children: JSX.Element;
};

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: Props) => {
  const [userName, setUserName] = useState('');
  const [user, setUser]: any = useState(null);
  const { currentUser }: any = useContext(AuthContext);

  const handleSearch = async (senderId = null) => {
    if (senderId) {
      const q = query(collection(db, 'users'), where('uid', '==', senderId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        return doc.data();
      });
    }
    const q = query(collection(db, 'users'), where('name', '==', userName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const handleKey = (e: any) => {
    if (e === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    //Check wether the group(chat in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.name,
            photoURL: user.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });
      }

      setUser(null);
    } catch (err) {}
  };

  return (
    <UserContext.Provider value={{ user, setUserName, handleKey, handleSelect, handleSearch }}>
      {children}
    </UserContext.Provider>
  );
};
