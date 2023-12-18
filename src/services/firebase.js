import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc, arrayUnion, addDoc, getDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDie2O_Qgxj0lXH1ouLhmEesAiY8VbPAV8",
  authDomain: "venture-vista.firebaseapp.com",
  projectId: "venture-vista",
  storageBucket: "venture-vista.appspot.com",
  messagingSenderId: "633975218250",
  appId: "1:633975218250:web:03eadfe07ec67afd3906b3",
  measurementId: "G-GT6GJS686T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, updateProfile, collection, doc, 
  setDoc, getFirestore, updateDoc, arrayUnion, getDoc, serverTimestamp,
   addDoc, getDocs, query, where};
