// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRVcAXY4TN4bSzK_BwjQVC_q87x9HqtHY",
  authDomain: "shopy-f5b5f.firebaseapp.com",
  projectId: "shopy-f5b5f",
  storageBucket: "shopy-f5b5f.firebasestorage.app",
  messagingSenderId: "529067390569",
  appId: "1:529067390569:web:cb6abaf977838b927614f8",
  measurementId: "G-TN5T8MCJ0Q"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);


export default app;
