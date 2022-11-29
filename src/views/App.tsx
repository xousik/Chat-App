import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainView from './MainView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import { AuthContext } from 'context/AuthContext';
import ChatView from './ChatView';

export type AuthProps = {
  currentUser?: any;
  children?: JSX.Element;
};

const App = () => {
  const { currentUser }: AuthProps = useContext(AuthContext);

  const ProtectedRoute: any = ({ children }: AuthProps) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
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
              <MainView />
            </ProtectedRoute>
          }
        />
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
