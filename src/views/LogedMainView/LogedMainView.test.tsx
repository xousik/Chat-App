import { render, screen } from 'test-utils';
import LogedMainView from './LogedMainView';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'FirebaseApp/firebase';
import { waitFor } from 'test-utils';

beforeAll(async () => {
  try {
    await signInWithEmailAndPassword(auth, 'lulu@gmail.com', 'Test123');
  } catch (error) {
    console.log(error);
  }
});

test('renders LogedMainView', async () => {
  render(<LogedMainView />);
  await waitFor(() => {
    expect(screen.getAllByText(`Lulu`));
    expect(screen.getByText(`Chats`));
  });
});
