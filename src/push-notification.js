// import firebase from 'firebase';
// import '@firebase/messaging'; 
// if (!firebase.apps.length) {
//     firebase.initializeApp({
//         apiKey: "AIzaSyB_yoY8Q1kXDfwqWCXnIxZ-2rmSRGS6ONM",
//         authDomain: "greenworld-laundry.firebaseapp.com",
//         databaseURL: "https://greenworld-laundry.firebaseio.com",
//         projectId: "greenworld-laundry",
//         storageBucket: "greenworld-laundry.appspot.com",
//         messagingSenderId: "501281460370",
//         appId: "1:501281460370:web:4712284e20156c6768564b",
//         measurementId: "G-C7T1KGH5ZH"
//       });
//  }

// export const initializeFirebase = () => {
//     if (!firebase.apps.length) {
//         firebase.initializeApp({
//             apiKey: "AIzaSyB_yoY8Q1kXDfwqWCXnIxZ-2rmSRGS6ONM",
//             authDomain: "greenworld-laundry.firebaseapp.com",
//             databaseURL: "https://greenworld-laundry.firebaseio.com",
//             projectId: "greenworld-laundry",
//             storageBucket: "greenworld-laundry.appspot.com",
//             messagingSenderId: "501281460370",
//             appId: "1:501281460370:web:4712284e20156c6768564b",
//             measurementId: "G-C7T1KGH5ZH"
//           });
//      }
// }
// export const askForPermissioToReceiveNotifications = async () => {
//     try {
//       const messaging = firebase.messaging();
//       await messaging.requestPermission();
//       const token = await messaging.getToken();
//       console.log('token', token);
      
//       return token;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // initialize messaging
// let messaging;
// if(firebase.messaging.isSupported()) {
//     messaging = firebase.messaging();
// }

// // register service worker & handle push events
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', async () => {
//         const registration = await navigator.serviceWorker.register('../firebase-messaging-sw.js', {
//             updateViaCache: 'none'
//         });
//         messaging.useServiceWorker(registration);
//         messaging.onMessage((payload) => {
//             const title = payload.notification.title;
//             const options = {
//                 body: payload.notification.body,
//                 icon: payload.notification.icon,
//                 actions: [
//                     {
//                         action: payload.fcmOptions.link,
//                         title: 'Book Appointment'
//                     }
//                 ]
//             };
//             registration.showNotification(title, options);           
//         });
//     });
// }

// export {
//     messaging
// };