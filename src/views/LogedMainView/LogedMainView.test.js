<<<<<<< HEAD
import { render, screen } from 'test-utils';
=======
import { fireEvent, getByTestId, render, screen } from 'test-utils';
>>>>>>> 747ea290e4b98d87c6b8b2ff8fefa9d984883905
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
