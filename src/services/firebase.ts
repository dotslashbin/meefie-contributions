import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAeOSdEtw-fR-P2WmS1qUdpTxs8JVznVnU",
    authDomain: "meefie-distirbutions.firebaseapp.com",
    projectId: "meefie-distirbutions",
    storageBucket: "meefie-distirbutions.appspot.com",
    messagingSenderId: "158045566203",
    appId: "1:158045566203:web:d40dd96bf917812065ec5e",
    measurementId: "G-M3DJ3L99FN"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Define the data to be added
const data = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
};

// Add a new document to a collection
export const addContributor = async () => {
    try {
        const docRef = await addDoc(collection(db, 'contributors'), data);
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};