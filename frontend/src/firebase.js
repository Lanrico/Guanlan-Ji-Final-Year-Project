// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB_opQz9NSfRrPLhwc9yvckrDv4mSinUxI",
  authDomain: "final-year-project-jgl.firebaseapp.com",
  projectId: "final-year-project-jgl",
  storageBucket: "final-year-project-jgl.appspot.com",
  messagingSenderId: "1082745032013",
  appId: "1:1082745032013:web:01781659139f87f093fb04",
  measurementId: "G-0E0943XPMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;