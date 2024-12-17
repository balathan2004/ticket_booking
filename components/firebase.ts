// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADGExqR3H08cE_2V7RQcrnZmJPr4Po2k0",
  authDomain: "temp-7d35d.firebaseapp.com",
  projectId: "temp-7d35d",
  storageBucket: "temp-7d35d.firebasestorage.app",
  messagingSenderId: "89758534733",
  appId: "1:89758534733:web:66b9b97d76741916866004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app)
const auth =getAuth(app)

export {app,firestore,auth}