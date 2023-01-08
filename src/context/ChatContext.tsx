import { useReducer, createContext, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

type Props = {
  children: JSX.Element;
};

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }: Props) => {
  const { currentUser }: any = useContext(AuthContext);
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
  // const chatReducer = (state: any, action: any) => {
  //   switch (action.type) {
  //     case 'CHANGE_USER':
  //       return {
  //         user: action.payload,
  //         chatId:
  //           currentUser.uid > action.payload.uid
  //             ? currentUser.uid + action.payload.uid
  //             : action.payload.uid + currentUser.uid
  //       };
  //     default:
  //       return state;
  //   }
  // };

  // const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ user }}>{children}</ChatContext.Provider>;
};
