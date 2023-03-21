// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "product-management-syste-c1bc7.firebaseapp.com",
  projectId: "product-management-syste-c1bc7",
  storageBucket: "product-management-syste-c1bc7.appspot.com",
  messagingSenderId: "1017799036496",
  appId: "1:1017799036496:web:231d414d1635347a534b55",
  measurementId: "G-337RH69M96",
};
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
