import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainView from './MainView';
import ChatView from './ChatView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import { useAuth } from 'Hooks/useAuth';

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/chat" element={<ChatView />} />
    </Routes>
  );
};

const UnathenticatedApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />
    </Routes>
  );
};

const App = () => {
  const auth = useAuth();
  console.log(auth.isLoged);

  return <>{auth.isLoged ? <AuthenticatedApp /> : <UnathenticatedApp />}</>;
};

export default App;
