import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainView from './MainView';
import ChatView from './ChatView';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/chat" element={<ChatView />} />
    </Routes>
  );
};

export default App;
