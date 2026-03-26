import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 👈 ADD THIS
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjByZwpPwCDnWFRegv5YNh7DHWn4Qvc3M",
    authDomain: "notes-app-688d7.firebaseapp.com",
    projectId: "notes-app-688d7",
    storageBucket: "notes-app-688d7.firebasestorage.app",
    messagingSenderId: "540398275966",
    appId: "1:540398275966:web:174bbdbfeeacbd3725b72f",
    measurementId: "G-V9B9P3FK9Q"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // 👈 ADD THIS
export const auth = getAuth(app);