import React, { ReactElement, useEffect } from 'react'
import { useStore } from '@/context/StoreContext'
import { getDonations} from "@/services/Firebase"
import { DocumentData } from "firebase/firestore";
import { COLLECTION_NAME } from "@/utils/db";

export default function History(): ReactElement {

    const { state } = useStore()

    useEffect(() => {
        if(!state.history) {
            console.log("#FETCH the hhistory ....")
            getDonations(COLLECTION_NAME, 'user_wallet', state.account).then((documents: DocumentData) => {
                console.log('here are theh data: ', documents);
            })
        }
    }, [state]);

    return (
        <div>
            Show the history here
        </div>
    )
}