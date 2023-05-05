// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAisfhCKDlm6GYJnS6RLjY9P2nINgMSYXw",
  authDomain: "chatroom-e0c7b.firebaseapp.com",
  projectId: "chatroom-e0c7b",
  storageBucket: "chatroom-e0c7b.appspot.com",
  messagingSenderId: "310730610082",
  appId: "1:310730610082:web:2bd97b7ce73b014c628efb",
  measurementId: "G-G4EEX1YGMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
