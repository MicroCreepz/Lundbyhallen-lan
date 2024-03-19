// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwpvisDWhLZQnYVph4A6gDLsup8q7Pzmc",
  authDomain: "nextjs-portfolio-dash.firebaseapp.com",
  projectId: "nextjs-portfolio-dash",
  storageBucket: "nextjs-portfolio-dash.appspot.com",
  messagingSenderId: "454194920011",
  appId: "1:454194920011:web:de99cb3d34a04433cb2bce"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

export const signInWithGoogle = () => signInWithPopup(auth, provider)