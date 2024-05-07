// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC64XWAtpp0oL_x_9nBW9BzG61IaJE40WQ",
  authDomain: "chatmern2306.firebaseapp.com",
  projectId: "chatmern2306",
  storageBucket: "chatmern2306.appspot.com",
  messagingSenderId: "343720428360",
  appId: "1:343720428360:web:e9b7cfa8f7b5ad1d2c297d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
