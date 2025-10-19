
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAbSg76wZkm_QJtdRhrM9a7ozzQHy_pV1E",
  authDomain: "myai-4fcdc.firebaseapp.com",
  projectId: "myai-4fcdc",
  storageBucket: "myai-4fcdc.firebasestorage.app",
  messagingSenderId: "410207613123",
  appId: "1:410207613123:web:57ee5c9956896c8ecf7276",
  measurementId: "G-VDZ8R25KYL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;



