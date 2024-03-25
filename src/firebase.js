// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBlWy5vkYKJLw1PQ_L53DudGqGBPCaSwEk",
  authDomain: "lundbyhallen-lan.firebaseapp.com",
  databaseURL: "https://lundbyhallen-lan-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lundbyhallen-lan",
  storageBucket: "lundbyhallen-lan.appspot.com",
  messagingSenderId: "427176977898",
  appId: "1:427176977898:web:bef9241bfa1d62ff7abe93",
  measurementId: "G-5RFJ048LZ0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
