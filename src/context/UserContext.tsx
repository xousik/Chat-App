import { useState, createContext, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'FirebaseApp/firebase';

type Props = {
  children: JSX.Element;
};

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: Props) => {
  const [userName, setUserName] = useState('');
  const [user, setUser]: any = useState({});

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('name', '==', userName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (!doc) {
        setUser(null);
      }
      setUser(doc.data());
    });
  };

  const handleKey = (e: any) => {
    if (e === 'Enter') {
      handleSearch();
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserName, handleKey }}>{children}</UserContext.Provider>
  );
};
