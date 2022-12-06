import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA1yFRNsrpQ1Ezyk6-NuhCyiA1ueqw-hUo',
  authDomain: 'lulus-chat-app.firebaseapp.com',
  databaseURL: 'https://lulus-chat-app-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'lulus-chat-app',
  storageBucket: 'lulus-chat-app.appspot.com',
  messagingSenderId: '1093033430579',
  appId: '1:1093033430579:web:6dd9915fe33afe07b39d46'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
