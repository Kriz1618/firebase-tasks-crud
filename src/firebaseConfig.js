import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOi-8wdp1_6KmIgE8Pi3KN_x-E7jW0FjM",
  authDomain: "login-7c36e.firebaseapp.com",
  projectId: "login-7c36e",
  storageBucket: "login-7c36e.appspot.com",
  messagingSenderId: "736850190708",
  appId: "1:736850190708:web:ed4479a6377c5b94e20c21",
  measurementId: "G-9LM332BN1K"
};

const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const store = fire.firestore()

export { auth, store };