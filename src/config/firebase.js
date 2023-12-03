import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHTSjjqkqngcSjd9vLuVIWLFLjNGa-x60",
  authDomain: "react-test-app-1-9b530.firebaseapp.com",
  projectId: "react-test-app-1-9b530",
  storageBucket: "react-test-app-1-9b530.appspot.com",
  messagingSenderId: "501746447723",
  appId: "1:501746447723:web:a700b3442b5d5b793ec82e",
  measurementId: "G-4GSMZZN2RW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);