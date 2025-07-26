// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7DphgkFBtQa3_baSTzNmp75Lzskn3Vms",
  authDomain: "love-1-another.firebaseapp.com",
  projectId: "love-1-another",
  storageBucket: "love-1-another.firebasestorage.app",
  messagingSenderId: "141526181306",
  appId: "1:141526181306:web:7e789c9c022cb8c245a983",
  measurementId: "G-42DCR5R232"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
