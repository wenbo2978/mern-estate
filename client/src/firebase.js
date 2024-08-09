// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fde71.firebaseapp.com",
  projectId: "mern-estate-fde71",
  storageBucket: "mern-estate-fde71.appspot.com",
  messagingSenderId: "569200173269",
  appId: "1:569200173269:web:2c64a3b457833ac527825c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);