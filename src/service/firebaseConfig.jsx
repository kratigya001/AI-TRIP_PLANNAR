// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "your key",
  authDomain: "ai-trip-plannar-f12b2.firebaseapp.com",
  projectId: "ai-trip-plannar-f12b2",
  storageBucket: "ai-trip-plannar-f12b2.firebasestorage.app",
  messagingSenderId: "398287738133",
  appId: "1:398287738133:web:a4cf9f316efa1bb183c51c",
  measurementId: "G-NZJZ5M23WM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);