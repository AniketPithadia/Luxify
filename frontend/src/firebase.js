// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "luxify-ccbee.firebaseapp.com",
  projectId: "luxify-ccbee",
  storageBucket: "luxify-ccbee.appspot.com",
  messagingSenderId: "99130082970",
  appId: "1:99130082970:web:378cfb2c279770a4598123",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
