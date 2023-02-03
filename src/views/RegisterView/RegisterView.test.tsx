import { fireEvent, render, screen } from 'test-utils';
import RegisterView from './RegisterView';

test('renders RegisterView', () => {
  render(<RegisterView />);
  screen.getByLabelText('Name');
  screen.getByLabelText('Email');
  screen.getByLabelText('Password');
  screen.getByLabelText('Confirm password');
});

test('Display error message when passwords are not the same', async () => {
  render(<RegisterView />);
  const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
  const confirmPasswordInput: HTMLInputElement = screen.getByLabelText('Confirm password');
  const registerButton: HTMLButtonElement = screen.getByText('Register');
  fireEvent.change(passwordInput, { target: { value: 'Test' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Test12' } });
  fireEvent.click(registerButton);
  await screen.findByText('Passwords do not match');
});
