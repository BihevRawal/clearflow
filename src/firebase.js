import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOayfhfIDULhoUjOTPvs4MGlRNeBEAn2I",
  authDomain: "gutterflow-a127e.firebaseapp.com",
  projectId: "gutterflow-a127e",
  storageBucket: "gutterflow-a127e.firebasestorage.app",
  messagingSenderId: "538661452100",
  appId: "1:538661452100:web:3a0250a1bf24c3093e7f11"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

/* KEEP USER LOGGED IN */
setPersistence(auth, browserLocalPersistence);




