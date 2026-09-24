import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web config. These values are public by design (they ship to every
// browser); access is controlled by Firestore security rules in firestore.rules.
const firebaseConfig = {
  apiKey: "AIzaSyBlVRSQcCZtIat2IqEBMKuKQigR_6rTPs8",
  authDomain: "merchant-sales-academy.firebaseapp.com",
  projectId: "merchant-sales-academy",
  storageBucket: "merchant-sales-academy.firebasestorage.app",
  messagingSenderId: "556019279914",
  appId: "1:556019279914:web:75190dceea77d6dc233b53",
};

export const firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
