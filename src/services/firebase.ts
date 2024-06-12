import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/db'
import { Contributor} from "@/types";

// Add a new document to a collection
export const addContributor = async (contributor: Contributor) => {
    try {
        const docRef = await addDoc(collection(db, 'contributors'), contributor);
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};