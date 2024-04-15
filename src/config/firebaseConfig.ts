import {
  FirebaseAuth,
  FirebaseDatabase,
  FirestoreDatabase,
  initializeFirebase,
} from "@armable/refine-firebase";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

export const firebaseApps = initializeFirebase(firebaseConfig);

export const firebaseAuth = new FirebaseAuth();

export const firestoreDatabase = new FirestoreDatabase();

export const firebaseDatabase = new FirebaseDatabase();
