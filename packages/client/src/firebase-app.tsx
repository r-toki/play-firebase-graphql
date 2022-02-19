import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import {
  FB_API_KEY,
  FB_APP_ID,
  FB_AUTH_DOMAIN,
  FB_MEASUREMENT_ID,
  FB_MESSAGING_SENDER_ID,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
} from "./constants";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FB_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app, "asia-northeast1");
export const db = getFirestore(app);

if (!import.meta.env.PROD) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
  // connectStorageEmulator(storage, "localhost", 9199);
}
