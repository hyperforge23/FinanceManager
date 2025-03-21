import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlc2LGj1QkowwFNqgUwwEiUOg2zDyo0G8",
authDomain: "financetracker-bb9a6.firebaseapp.com",
  projectId: "financetracker-bb9a6",
storageBucket: "financetracker-bb9a6.firebasestorage.app",
  messagingSenderId: "263654306026",
  appId: "1:263654306026:web:b1e13f0ca171b979f6e793",
  measurementId: "G-FNGDBFYVZN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);