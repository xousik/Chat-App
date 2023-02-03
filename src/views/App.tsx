import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainView from './MainView/MainView';
import RegisterView from './RegisterView/RegisterView';
import LoginView from './LoginView/LoginView';
import LogedMainView from './LogedMainView/LogedMainView';
import { AuthContext } from 'context/AuthContext';
import ChatView from './ChatView/ChatView';

interface ICurrentUser {
  currentUser?: {};
}

interface IProtectedRoute {
  children: JSX.Element;
}

const App = () => {
  const { currentUser }: ICurrentUser = useContext(AuthContext);

  const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
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
        <Route path="/main" element={<MainView />} />
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
