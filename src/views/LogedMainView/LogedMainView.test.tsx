import { render, screen } from 'test-utils';
import LogedMainView from './LogedMainView';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { waitFor } from 'test-utils';

beforeAll(async () => {
  const user = auth.currentUser;
  if (!user) {
    await signInWithEmailAndPassword(auth, 'lulu@gmail.com', 'Test123');
  }
});

test('renders LogedMainView', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    expect(screen.getByDisplayValue('Lulu'));
    expect(screen.getByText('Chats'));
    expect(screen.getByText('Logout'));
  });
});

test('User settings card should not be visible by default', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    expect(screen.getByText('Done')).not.toBeVisible();
  });
});

test('Show user settings card when user clicks on user name', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    const userSettingsButton = screen.getByDisplayValue('Lulu');
    userSettingsButton.click();
    waitFor(() => {
      expect(screen.getByText('Done')).toBeVisible();
      expect(screen.getByText('Change user name')).toBeVisible();
      expect(screen.getByText('Change image')).toBeVisible();
      expect(screen.getByText('Change password')).toBeVisible();
    });
  });
});

test('Hide user settings card when user clicks on "Done"', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    const userSettingsButton = screen.getByDisplayValue('Lulu');
    userSettingsButton.click();
    waitFor(() => {
      expect(screen.getByText('Done')).toBeVisible();
      expect(screen.getByText('Change user name')).toBeVisible();
      expect(screen.getByText('Change image')).toBeVisible();
      expect(screen.getByText('Change password')).toBeVisible();
      const closeUserSettingsButton = screen.getByText('Done');
      closeUserSettingsButton.click();
      expect(screen.getByText('Done')).not.toBeVisible();
      expect(screen.getByText('Change user name')).not.toBeVisible();
      expect(screen.getByText('Change image')).not.toBeVisible();
      expect(screen.getByText('Change password')).not.toBeVisible();
    });
  });
});

//TODO: Test search bar functionality

//TODO: Test chat list functionality

//TODO: Test logout functionality

//TODO: Create tests for ChatView
