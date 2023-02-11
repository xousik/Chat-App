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
import { ICurrentUser } from 'views/ChatView/ChatView';

type UserContextProps = {
  children: JSX.Element;
};

interface UserData {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
}

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

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
    if (querySnapshot.empty) return;
    querySnapshot.forEach((doc) => {
      setUser(doc.data() as UserData);
      setIsVisible(true);
    });
  };

  const handleKey = async (e: string) => {
    if (e === 'Enter') {
      await handleSearch();
    }
  };

  const handleSelect = async () => {
    //Check wether the group(chat in firestore) exists, if not create
    if (!user || !currentUser) return;

    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      localStorage.setItem('currentChatId', JSON.stringify(user));
      const res = await getDoc(doc(db, 'chats', combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            name: user.name,
            photoURL: user.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });
      } else {
        const res = await getDoc(doc(db, 'userChats', currentUser.uid));
        const data = res.data();
        if (!Object.entries(data!).flat().includes(combinedId)) {
          await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [combinedId + '.userInfo']: {
              uid: user.uid,
              name: user.name,
              photoURL: user.photoURL
            },
            [combinedId + '.date']: serverTimestamp()
          });
        }
      }

      setIsVisible(false);
      setUser(undefined);
    } catch (err) {}
  };

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        setUserName,
        userName,
        handleKey,
        handleSelect,
        handleSearch,
        setIsVisible,
        isVisible
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
