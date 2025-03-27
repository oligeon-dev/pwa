import { getMessaging, getToken } from 'firebase/messaging';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey:
        'BJhGzuXihg8__7SNxJMZ06EnkZKKsKzMDc7mJHJStwCks74lg80evGEEeASXsHZJkQ0e2ghtG9XFUIC2ZPGaMdY',
    });
    console.log(token);
  }
};
