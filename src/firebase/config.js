// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeDMDOA7S7EBcTvn5k4NRqjql8MdaL9-4",
  authDomain: "campusloop-b2a63.firebaseapp.com",
  projectId: "campusloop-b2a63",
  storageBucket: "campusloop-b2a63.firebasestorage.app",
  messagingSenderId: "571237469615",
  appId: "1:571237469615:web:b26bc1cf3dfb1e946df35a",
  measurementId: "G-QC9HYQNSNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);