import { render, screen, fireEvent, waitFor } from 'test-utils';
import RegisterView from './RegisterView';

test('renders LoginView', () => {
  render(<RegisterView />);
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
});

test('correctly displays error message when passwords do not mach', async () => {
  render(<RegisterView />);
  const nameInput = screen.getByLabelText('Name');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm password');
  const submitButton = screen.getByRole('button', { name: 'Register' });
  fireEvent.change(nameInput, { target: { value: 'Lulu' } });
  fireEvent.change(emailInput, { target: { value: 'lulu@gmail.com' } });
  fireEvent.change(passwordInput, { target: { value: 'Test1234' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'Test12' } });
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});
