import { initializeApp }  from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from "../../config";

// Initialize Firebase app
export const app = initializeApp(FIREBASE_CONFIG);

// Get Firestore instance
export const db = getFirestore(app);

export const COLLECTION_NAME =  'contributions'
