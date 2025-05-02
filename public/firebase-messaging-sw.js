// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

self.addEventListener('notificationclick', (event) => {
  console.info('event', event);
  const url = event.notification.data?.FCM_MSG?.data?.url;
  console.info('url', url);

  event.notification.close();

  if (!url) {
    console.warn('[SW] 通知クリック時にURLが見つかりません');
    return;
  }

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // すでに開いているタブがあればフォーカス
        // for (const client of clientList) {
        //   if (client.url === url && 'focus' in client) {
        //     return client.focus();
        //   }
        // }

        // なければ新しいウィンドウを開く
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyA5-nbQNNXM_M5DyALZuG-Z4mzE08Ft5gY',
  authDomain: 'notification-test-8870d.firebaseapp.com',
  projectId: 'notification-test-8870d',
  storageBucket: 'notification-test-8870d.firebasestorage.app',
  messagingSenderId: '380934306509',
  appId: '1:380934306509:web:454bcc9b4f96573eed4784',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  //   console.info('payload', payload);
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  //   // Customize notification here
  //   // const notificationTitle = 'Background Message Title';
  //   // const notificationOptions = {
  //   //   body: 'Background Message body.',
  //   //   icon: '/firebase-logo.png',
  //   // };
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // data: {
    //   url: payload.fcmOptions.link,
    // },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
  // self.registration.showNotification(payload.dataa.title);
});
