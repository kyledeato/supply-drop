// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQm5LI2o3NH7IsruZcW5UHRfS61URiN2E",
  authDomain: "supplydrop-2c4aa.firebaseapp.com",
  projectId: "supplydrop-2c4aa",
  storageBucket: "supplydrop-2c4aa.appspot.com",
  messagingSenderId: "230617019682",
  appId: "1:230617019682:web:3fb59cbe31f13bf798e17b",
  measurementId: "G-BC4XBFV46S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)