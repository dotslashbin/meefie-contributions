import { collection, addDoc, getDocs, query, where, DocumentData } from 'firebase/firestore';
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

export const getDonations = async(collectionName: string, field: string, value: string): Promise<DocumentData[]> => {
    const queryAssembler = query(collection(db, collectionName), where(field, '==', value))
    const querySnapshot = await getDocs(queryAssembler)
    return querySnapshot.docs.map(doc => doc.data())
}