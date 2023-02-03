import { fireEvent, render, screen } from 'test-utils';
import LoginView from './LoginView';

test('renders LoginView', () => {
  render(<LoginView />);
  screen.getByLabelText('Email');
  screen.getByLabelText('Password');
});

test('Display error message when email or password are incorrect and clear inputs', async () => {
  render(<LoginView />);
  const emailInput: HTMLInputElement = screen.getByLabelText('Email');
  const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
  const submitButton: HTMLButtonElement = screen.getByText('Log in');
  fireEvent.change(emailInput, { target: { value: 'roki@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Test12' } });
  expect(emailInput.value).toBe('roki@gmail.com');
  expect(passwordInput.value).toBe('Test12');
  fireEvent.click(submitButton);
  await screen.findByText('Invalid email or password');
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
});
