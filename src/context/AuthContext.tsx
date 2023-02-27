import { useState, createContext, useEffect } from 'react';
import { auth } from 'FirebaseApp/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type Props = {
  children: JSX.Element;
};

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<{} | null>({});

  useEffect(() => {
    const menageCurrentUser = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup function
    return () => {
      menageCurrentUser();
      console.log('cleanup');
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
