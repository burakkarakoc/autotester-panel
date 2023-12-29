// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjI4pz7a0ytjBhCzjuULJaKYoY5-mg-jc",
  authDomain: "ai-automation-framework.firebaseapp.com",
  projectId: "ai-automation-framework",
  storageBucket: "ai-automation-framework.appspot.com",
  messagingSenderId: "506935635810",
  appId: "1:506935635810:web:85c6ec51fc83765cea863b",
  measurementId: "G-MS2P5G9HR8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
