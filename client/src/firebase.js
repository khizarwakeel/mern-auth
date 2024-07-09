import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-41583.firebaseapp.com",
  projectId: "mern-auth-41583",
  storageBucket: "mern-auth-41583.appspot.com",
  messagingSenderId: "513736285074",
  appId: "1:513736285074:web:b1bbc797df54219172ff4b",
};

export const app = initializeApp(firebaseConfig);