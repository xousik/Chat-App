import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  rules: {
    '.read': 'now < 1672095600000', // 2022-12-27
    '.write': 'now < 1672095600000' // 2022-12-27
  },
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: 'https://lulus-chat-app-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
