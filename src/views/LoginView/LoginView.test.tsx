import { render, screen, fireEvent, waitFor } from 'test-utils';
import LoginView from './LoginView';

test('renders LoginView', () => {
  render(<LoginView />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
});

test('correctly displays error message when email is not valid', async () => {
  render(<LoginView />);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Log in' });
  fireEvent.change(emailInput, { target: { value: 'lulu@gmail' } });
  fireEvent.change(passwordInput, { target: { value: 'Test123' } });
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Oops!')).toBeVisible();
  });
});

test('correctly displays error message when password is not valid', async () => {
  render(<LoginView />);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { name: 'Log in' });
  fireEvent.change(emailInput, { target: { value: 'lulu@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Test12' } });
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });
});
