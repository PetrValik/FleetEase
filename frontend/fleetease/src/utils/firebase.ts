// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_ysX5tySwEQYkMhkTQXQqBYBJtQWbXMY",
  authDomain: "ageless-talent-441309-n0.firebaseapp.com",
  projectId: "ageless-talent-441309-n0",
  storageBucket: "ageless-talent-441309-n0.firebasestorage.app",
  messagingSenderId: "575379757449",
  appId: "1:575379757449:web:44b64827cffefa208b2958",
  measurementId: "G-SQQN1GMC35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;