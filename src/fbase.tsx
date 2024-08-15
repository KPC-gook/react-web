// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdEW1msWmO_UKYgq0paFlRziqTEMK2PM0",
  authDomain: "kpc-gook.firebaseapp.com",
  projectId: "kpc-gook",
  storageBucket: "kpc-gook.appspot.com",
  messagingSenderId: "487755237252",
  appId: "1:487755237252:web:64af2cc81092bef49fffd1",
  measurementId: "G-H0Z84M0MF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };