import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import { AuthContextProvider } from 'context/AuthContext';


type Props = {
  children: JSX.Element;
};

const AppProviders = ({ children }: Props) => (
  <Router>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </AuthContextProvider>
  </Router>
);

export default AppProviders;
