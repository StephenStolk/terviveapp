// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo7ehY33fBrzZATJrpI2LgjU64NPMTu-A",
  authDomain: "tervive-94771.firebaseapp.com",
  projectId: "tervive-94771",
  storageBucket: "tervive-94771.appspot.com",
  messagingSenderId: "411799098319",
  appId: "1:411799098319:web:e23b0413e56c73e533f8ba",
  measurementId: "G-CTWD39NWVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
// const analytics = getAnalytics(app);