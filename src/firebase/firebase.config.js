
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyA5K_VghE4ztpTl6PjOBX7AvCqJS5xQzz4",
  authDomain: "blood-donate-4a1fa.firebaseapp.com",
  projectId: "blood-donate-4a1fa",
  storageBucket: "blood-donate-4a1fa.firebasestorage.app",
  messagingSenderId: "846918048780",
  appId: "1:846918048780:web:3cc86058c979d4ca3b6229",
  measurementId: "G-T7E7ML53HV"
};


const app = initializeApp(firebaseConfig);
 
const auth = getAuth(app);

export default auth;