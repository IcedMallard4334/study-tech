//client/src/firebase/firebase.js

//Firebase app initializer(SDK)
import { initializeApp } from "firebase/app";

//Firebase Authentication
import { getAuth, GoogleAuthProvider} from "firebase/auth";

// Firestore Database
import { getFirestore } from "firebase/firestore";

// Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication so the rest of the app can use it
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();