import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import { AuthContextProvider } from 'context/AuthContext';
import { UserContextProvider } from 'context/UserContext';
import { ChatContextProvider } from 'context/ChatContext';
import { ErrorContextProvider } from 'context/ErrorContext';

type Props = {
  children: JSX.Element;
};

const AppProviders = ({ children }: Props) => (
  <Router>
    <ErrorContextProvider>
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
    </ErrorContextProvider>
  </Router>
);

export default AppProviders;
