import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE THESE WITH YOUR ACTUAL FIREBASE CONFIG KEYS
const firebaseConfig = {
  apiKey: "AIzaSyCFZyo3EXro6kKPJel2pj8KqISMnEKF1xI",
  authDomain: "umarm1693-bd872.firebaseapp.com",
  projectId: "umarm1693-bd872",
  storageBucket: "umarm1693-bd872.firebasestorage.app",
  messagingSenderId: "714282802109",
  appId: "1:714282802109:web:63180090c36a30251e10d4",
  measurementId: "G-TQL7KZZ510"
};

let app;
export let db = null;

try {
  // Check if API key is not a placeholder
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } else {
    console.warn("Firebase config keys are placeholders. Waiting for real keys.");
  }
} catch (error) {
  console.error("Firebase Initialization Error", error);
}
