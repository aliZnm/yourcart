import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence,
  browserLocalPersistence
 } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_jYMVwKET6JAqoATAnMj5DiXE0NA-EsY",
  authDomain: "price-tracker-8087a.firebaseapp.com",
  projectId: "price-tracker-8087a",
  storageBucket: "price-tracker-8087a.firebasestorage.app",
  messagingSenderId: "820960712692",
  appId: "1:820960712692:web:ea5a86ff4d58df72a2cba1",
  measurementId: "G-L5LNFW6GMR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
