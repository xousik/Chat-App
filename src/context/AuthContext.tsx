import { useState, createContext, useEffect } from 'react';
import { auth } from 'FirebaseApp/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type Props = {
  children: JSX.Element;
};

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser]: any | null = useState({});

  useEffect(() => {
    const menageCurrentUser = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => menageCurrentUser();
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
