import { initializeApp }  from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAeOSdEtw-fR-P2WmS1qUdpTxs8JVznVnU",
    authDomain: "meefie-distirbutions.firebaseapp.com",
    projectId: "meefie-distirbutions",
    storageBucket: "meefie-distirbutions.appspot.com",
    messagingSenderId: "158045566203",
    appId: "1:158045566203:web:d40dd96bf917812065ec5e",
    measurementId: "G-M3DJ3L99FN"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);

export const COLLECTION_NAME =  'contributors'
