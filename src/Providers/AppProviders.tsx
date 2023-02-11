import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import { AuthContextProvider } from 'context/AuthContext';
import { UserContextProvider } from 'context/UserContext';
import { ErrorContextProvider } from 'context/ErrorContext';
import { store } from 'app/store';
import { Provider } from 'react-redux';

type Props = {
  children: JSX.Element;
};

const AppProviders = ({ children }: Props) => (
  <Router>
    <Provider store={store}>
      <ErrorContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              {children}
            </ThemeProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </ErrorContextProvider>
    </Provider>
  </Router>
);

export default AppProviders;
