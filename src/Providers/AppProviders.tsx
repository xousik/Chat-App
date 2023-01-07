import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import { AuthContextProvider } from 'context/AuthContext';
import { UserContextProvider } from 'context/UserContext';
import { ChatContextProvider } from 'context/ChatContext';

type Props = {
  children: JSX.Element;
};

const AppProviders = ({ children }: Props) => (
  <Router>
    <AuthContextProvider>
      <UserContextProvider>
        <ChatContextProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </ChatContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </Router>
);

export default AppProviders;
