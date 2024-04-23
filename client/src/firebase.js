// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBFtoqp2UsAfMahZRv6LbPTBLwxUMDfPB4",
  authDomain: "ecommerce-6d453.firebaseapp.com",
  projectId: "ecommerce-6d453",
  storageBucket: "ecommerce-6d453.appspot.com",
  messagingSenderId: "685547430258",
  appId: "1:685547430258:web:6c7cf14d93b1ac7b52bdeb",
  measurementId: "G-LBXJ6SPN13"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();