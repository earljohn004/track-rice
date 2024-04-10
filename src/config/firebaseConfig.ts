import { initializeFirebase } from "refine-firebase";
import {
  FirebaseAuth,
  FirebaseDatabase,
  FirestoreDatabase,
} from "refine-firebase";

const firebaseConfig = {
  apiKey: import.meta.env.APIKEY,
  authDomain: import.meta.env.AUTHDOMAIN,
  projectId: import.meta.env.PROJECTID,
  storageBucket: import.meta.env.STORAGEBUCKET,
  messagingSenderId: import.meta.env.MESSAGINGSENDERID,
  appId: import.meta.env.APPID,
};

export const firebaseApps = initializeFirebase(firebaseConfig);

export const firebaseAuth = new FirebaseAuth();

export const firestoreDatabase = new FirestoreDatabase();

export const firebaseDatabase = new FirebaseDatabase();
