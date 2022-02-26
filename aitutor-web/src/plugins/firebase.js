// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const storage = getStorage();

const usersCollection = collection(db, "users");
const problemsCollection = collection(db, "problems");
const logsCollection = collection(db, "logs");
const smallChapterListsCollection = collection(db, "smallChapterLists");
const middleChapterListsCollection = collection(db, "middleChapterLists");
const reportsCollection = collection(db, "reports");

// export utils/refs
export {
  app,
  auth,
  db,
  storage,
  usersCollection,
  problemsCollection,
  logsCollection,
  smallChapterListsCollection,
  middleChapterListsCollection,
  reportsCollection,
};
