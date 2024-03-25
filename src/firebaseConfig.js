import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
const firebaseConfig = {
  apiKey: "AIzaSyAKMpc3Koru11tXxHzLJtAwo8jlsF8b7sY",
  authDomain: "utilitypaymentsystem-b6426.firebaseapp.com",
  projectId: "utilitypaymentsystem-b6426",
  storageBucket: "utilitypaymentsystem-b6426.appspot.com",
  messagingSenderId: "351493096784",
  appId: "1:351493096784:web:f4eb213ea33a53b0201855"
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore(); 

export default app;
