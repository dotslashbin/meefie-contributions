import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/db'
import { Contribution } from "@/types";

// Add a new document to a collection
export const addContributor = async (contribution: Contribution) => {
    try {
        console.log("SAVING this contributor: ", contribution)
        return await addDoc(collection(db, 'contributions'), contribution);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};