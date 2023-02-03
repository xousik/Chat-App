import { render, screen } from 'test-utils';
import LogedMainView from './LogedMainView';

test('renders LogedMainView', () => {
  render(<LogedMainView />);
  screen.getByText('Chats');
  //   screen.getByLabelText('Password');
});

// test('Show UserSettingsCard after click on user name', async () => {
//   render(<LogedMainView />);
//   const userName = screen.getByTestId('user-name');
//   fireEvent.click(userName);
//   await screen.findByText('Dark Mode');
// });
