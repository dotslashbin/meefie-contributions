import { initializeApp }  from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBgKJbn7grsCTFpoc5vb5vi_MaFOV0rIsw",
    authDomain: "meefie-contributions.firebaseapp.com",
    projectId: "meefie-contributions",
    storageBucket: "meefie-contributions.appspot.com",
    messagingSenderId: "720478229275",
    appId: "1:720478229275:web:b1dcf9796cd01ec7f9b9be"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);

export const COLLECTION_NAME =  'contributors'
