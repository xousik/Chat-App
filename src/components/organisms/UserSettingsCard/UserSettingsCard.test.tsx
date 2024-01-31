import { render, screen, waitFor, fireEvent } from 'test-utils';
import UserSettingsCard from './UserSettingsCard';

test('User settings options cards should not be visible by default', async () => {
  render(<UserSettingsCard />);
  expect(screen.getByText('Set your new user name')).not.toBeVisible();
  expect(screen.getByText('Set your new profile image')).not.toBeVisible();
  expect(screen.getByText('Send an email to reset your password')).not.toBeVisible();
});

test('Should show Change user name card when user clicks on that option and ony that card should be visible', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changeUserNameButton = screen.getByText('Change user name');
    changeUserNameButton.click();
  });
  waitFor(() => {
    expect(screen.getByText('Set your new user name')).toBeVisible();
    expect(screen.getByText('Set your new profile image')).not.toBeVisible();
    expect(screen.getByText('Send an email to reset your password')).not.toBeVisible();
  });
});

//TODO: Test changing user name functionality

test('Schould correctly change user name when user clicks on "Change user name" button', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changeUserNameButton = screen.getByText('Change user name');
    changeUserNameButton.click();
  });
  waitFor(() => {
    const changeUserNameInput = screen.getByPlaceholderText('Set your new user name');
    const changeUserNameButton = screen.getByRole('button');
    fireEvent.change(changeUserNameInput, 'xousik');
    changeUserNameButton.click();
  });
});

test('Schould close Change user name card when user clicks on "Cancel"', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changeUserNameButton = screen.getByText('Change user name');
    changeUserNameButton.click();
    waitFor(() => {
      expect(screen.getByText('Set your new user name')).toBeVisible();
      const cancelButton = screen.getByText('Cancel');
      cancelButton.click();
      expect(screen.getByText('Set your new user name')).not.toBevisible();
    });
  });
});

test('Should show Change image card when user clicks on that option and only that card should be visible', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changeImageButton = screen.getByText('Change image');
    changeImageButton.click();
  });
  waitFor(() => {
    expect(screen.getByText('Set your new user name')).not.toBeVisible();
    expect(screen.getByText('Set your new profile image')).toBeVisible();
    expect(screen.getByText('Send an email to reset your password')).not.toBeVisible();
  });
});

test('Schould close Change image card when user clicks on "Cancel"', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changeImageButton = screen.getByText('Change image');
    changeImageButton.click();
    waitFor(() => {
      expect(screen.getByText('Set your new profile image')).toBeVisible();
      const cancelButton = screen.getByText('Cancel');
      cancelButton.click();
      expect(screen.getByText('Set your new profile image')).not.toBevisible();
    });
  });
});

test('Should show Change password card when user clicks on that option and only that card should be visible', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changePasswordButton = screen.getByText('Change password');
    changePasswordButton.click();
  });
  waitFor(() => {
    expect(screen.getByText('Set your new user name')).not.toBeVisible();
    expect(screen.getByText('Set your new profile image')).not.toBeVisible();
    expect(screen.getByText('Send an email to reset your password')).toBeVisible();
  });
});

test('Schould close Change password card when user clicks on "Cancel"', async () => {
  render(<UserSettingsCard />);
  await waitFor(() => {
    const changePasswordButton = screen.getByText('Change password');
    changePasswordButton.click();
    waitFor(() => {
      expect(screen.getByText('Send an email to reset your password')).toBeVisible();
      const cancelButton = screen.getByText('Cancel');
      cancelButton.click();
      expect(screen.getByText('Send an email to reset your password')).not.toBevisible();
    });
  });
});
