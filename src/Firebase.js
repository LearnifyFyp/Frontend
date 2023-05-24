import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyCcAU1od6vodzABGku_GHLCUnCKTLhvMzk",
  authDomain: "outfitters-9f502.firebaseapp.com",
  projectId: "outfitters-9f502",
  storageBucket: "outfitters-9f502.appspot.com",
  messagingSenderId: "580282310463",
  appId: "1:580282310463:web:1b5277af4dbceb41fa7d8a",
  measurementId: "G-M6JG4RBZEW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
