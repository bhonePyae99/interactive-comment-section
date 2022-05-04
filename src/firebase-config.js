// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "interactive-comments-sec-cddd5.firebaseapp.com",
  projectId: "interactive-comments-sec-cddd5",
  storageBucket: "interactive-comments-sec-cddd5.appspot.com",
  messagingSenderId: "315377085114",
  appId: "1:315377085114:web:a35d971b17927c2ff5f083",
  measurementId: "G-NKRPZ72J5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
