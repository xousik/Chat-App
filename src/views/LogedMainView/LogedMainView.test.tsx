import { render, screen } from 'test-utils';
import LogedMainView from './LogedMainView';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { waitFor } from 'test-utils';

beforeAll(async () => {
  const user = auth.currentUser;
  if (user) {
    console.log('User is logged in');
  } else {
    await signInWithEmailAndPassword(auth, 'lulu@gmail.com', 'Test123');
  }
});

test('renders LogedMainView', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    expect(screen.getByDisplayValue(`Lulu`));
    expect(screen.getByText(`Chats`));
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

// This should be in UserSettingsCard test file

test('User settings options cards should not be visible by default', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    const userSettingsButton = screen.getByDisplayValue('Lulu');
    userSettingsButton.click();
  });
  waitFor(() => {
    expect(screen.getByText('Set your new user name')).not.toBeVisible();
    expect(screen.getByText('Set your new profile image')).not.toBeVisible();
    expect(screen.getByText('Send an email to reset your password')).not.toBeVisible();
  });
});
