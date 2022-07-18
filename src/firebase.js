// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6QT3mB0m-YbMIT9dVDprdlxswUiVme6g",
  authDomain: "website-proj-c1ced.firebaseapp.com",
  projectId: "website-proj-c1ced",
  storageBucket: "website-proj-c1ced.appspot.com",
  messagingSenderId: "41644306766",
  appId: "1:41644306766:web:ffb9c145d3f851b092ee1f",
  measurementId: "G-FNSV4B1L5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;