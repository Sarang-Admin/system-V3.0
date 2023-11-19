// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxf6SoOTwQVBht17EN5o1fhgOMZyx3uFM",
  authDomain: "sarang-d3a40.firebaseapp.com",
  projectId: "sarang-d3a40",
  storageBucket: "sarang-d3a40.appspot.com",
  messagingSenderId: "1003995758594",
  appId: "1:1003995758594:web:94480c958ad4f3773f271b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
