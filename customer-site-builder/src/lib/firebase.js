// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";    
import { getAuth,GoogleAuthProvider } from "firebase/auth"; // ← 추가

const firebaseConfig = {
    apiKey: "AIzaSyAUTCs8a896s5mxQzVAGN5O5_fhlpZksqw",
    authDomain: "salepage-f39a1.firebaseapp.com",
    projectId: "salepage-f39a1",
    storageBucket: "salepage-f39a1.firebasestorage.app",
    // storageBucket: "salepage-f39a1.appspot.com",
    messagingSenderId: "237790668185",
    appId: "1:237790668185:web:22efc56494976505369f08",
    measurementId: "G-LJYG32MEMS"
  };

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 필요한 서비스 꺼내기
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // ✅ 이 줄을 꼭 추가!!
export const googleProvider = new GoogleAuthProvider(); // ✅ 추가
