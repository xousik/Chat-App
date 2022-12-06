import React, { useState, useEffect, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

interface AuthContextType {
  isLoged: boolean;
  handleRegister: any;
  handleLogIn: any;
  handleLogOut: any;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isLoged, setIsLoged] = useState(false);

  const firebaseConfig = {
    apiKey: 'AIzaSyA1yFRNsrpQ1Ezyk6-NuhCyiA1ueqw-hUo',
    rules: {
      '.read': 'now < 1672095600000', // 2022-12-27
      '.write': 'now < 1672095600000' // 2022-12-27
    },
    databaseURL: 'https://lulus-chat-app-default-rtdb.europe-west1.firebasedatabase.app/'
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  useEffect(() => {
    const user = localStorage.getItem('logedUser');

    if (user) {
      setIsLoged(true);
    }
  }, []);

  type AppProps = {
    email: string;
    password: string;
  };

  const handleRegister = ({ email, password }: AppProps) => {
    if (!email || !password) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        if (!user) return;
        localStorage.setItem('logedUser', user.uid);
        setIsLoged(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });
  };

  const handleLogIn = ({ email, password }: AppProps) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        if (!user) return;
        localStorage.setItem('logedUser', user.uid);
        setIsLoged(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        if (!localStorage.getItem('logedUser')) return;

        localStorage.removeItem('logedUser');
        setIsLoged(false);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ isLoged, handleRegister, handleLogIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw Error('useAuth needs to be used inside AuthContext');
  }

  return auth;
};
