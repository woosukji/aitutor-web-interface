// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "aitutor-back.firebaseapp.com",
  projectId: "aitutor-back",
  storageBucket: "aitutor-back.appspot.com",
  messagingSenderId: "364379058571",
  appId: "1:364379058571:web:6b658ab8cd54e80ae33f8e",
  measurementId: "G-WZBTMZVWD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const usersCollection = collection(db, "users");

// export utils/refs
export { app, auth, db, usersCollection };
