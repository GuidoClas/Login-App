// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBjJzsAKm7MFYrz02s006SnbGslYN-qMI4",
  authDomain: "react-native-99d38.firebaseapp.com",
  projectId: "react-native-99d38",
  storageBucket: "react-native-99d38.appspot.com",
  messagingSenderId: "877996830300",
  appId: "1:877996830300:web:63dd86b3621cf0cfcd0099",
  measurementId: "G-CYFVLK0VJG"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };