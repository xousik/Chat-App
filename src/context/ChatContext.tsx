import { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ICurrentUser } from 'views/ChatView';

type Props = {
  children: JSX.Element;
};

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }: Props) => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);
  let user;

  const getCurrentChatUser = (key: string) => {
    const user = localStorage.getItem(key);
    if (user) return JSON.parse(user);
  };

  const currentChatUser = getCurrentChatUser('currentChatId');

  if (currentUser && currentChatUser) {
    user = {
      chatId:
        currentUser.uid > currentChatUser.uid
          ? currentUser.uid + currentChatUser.uid
          : currentChatUser.uid + currentUser.uid,
      user: currentChatUser
    };
  }

  return <ChatContext.Provider value={{ user, currentChatUser }}>{children}</ChatContext.Provider>;
};
