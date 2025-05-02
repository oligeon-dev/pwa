import { getMessaging, getToken } from 'firebase/messaging';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5-nbQNNXM_M5DyALZuG-Z4mzE08Ft5gY',
  authDomain: 'notification-test-8870d.firebaseapp.com',
  projectId: 'notification-test-8870d',
  storageBucket: 'notification-test-8870d.firebasestorage.app',
  messagingSenderId: '380934306509',
  appId: '1:380934306509:web:454bcc9b4f96573eed4784',
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
    return token;
  }
};
