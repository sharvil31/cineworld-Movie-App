// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCokdE_SuDnoGwbcWZoQHfyGN68X0MKcp0",
  authDomain: "movie-app-auth-9ae95.firebaseapp.com",
  projectId: "movie-app-auth-9ae95",
  storageBucket: "movie-app-auth-9ae95.firebasestorage.app",
  messagingSenderId: "460703114379",
  appId: "1:460703114379:web:0f0c7588660b3d1328608e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;