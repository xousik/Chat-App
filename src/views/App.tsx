import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainView from './MainView';
import RegisterView from './RegisterView';
import LoginView from './LoginView';
import LogedMainView from './LogedMainView';
import { AuthContext } from 'context/AuthContext';
import ChatView from './ChatView';

export type AuthProps = {
  currentUser?: {};
  [photoURL: string]: any;
  children?: JSX.Element;
};

const App = () => {
  const { currentUser }: AuthProps = useContext(AuthContext);

  const ProtectedRoute: any = ({ children }: AuthProps) => {
    if (!currentUser) {
      return <Navigate to="/main" />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <LogedMainView />
            </ProtectedRoute>
          }
        />
        <Route path="main" element={<MainView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <ChatView />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
