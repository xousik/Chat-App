import { render, screen } from 'test-utils';
import MainView from './MainView';

test('renders MainView', () => {
  render(<MainView />);
  expect(screen.getByText(`Welcome to Lulu's Chat App`)).toBeInTheDocument();
  expect(screen.getByText('Login with Email')).toBeInTheDocument();
  expect(screen.getByText('New User? Sign Up')).toBeInTheDocument();
});
