import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import { AuthProvider } from 'Hooks/useAuth';

type Props = {
  children: JSX.Element;
};

const AppProviders = ({ children }: Props) => (
  <Router>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        {children}
      </AuthProvider>
    </ThemeProvider>
  </Router>
);

export default AppProviders;
