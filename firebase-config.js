// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

 const firebaseConfig = {
    apiKey: "AIzaSyAHS2Z53ajXvU7qh3f-Kd7MzeMfyNKh7Vk",
    authDomain: "love-one-another-1e4fd.firebaseapp.com",
    projectId: "love-one-another-1e4fd",
    storageBucket: "love-one-another-1e4fd.firebasestorage.app",
    messagingSenderId: "606500047698",
    appId: "1:606500047698:web:bca24c636989aec82dc88b",
    measurementId: "G-NNR6YE7590"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
