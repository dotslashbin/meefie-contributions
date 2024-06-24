import React, { ReactElement, useEffect, useState } from 'react'
import { useStore } from '@/context/StoreContext'
import { getDonations} from "@/services/Firebase"
import { DocumentData } from "firebase/firestore";
import { COLLECTION_NAME } from "@/utils/db";
import { Contribution } from "@/types";

export default function History(): ReactElement {

    const { state } = useStore()
    const [ contributions, setContributions ] = useState<Contribution[]>([])

    useEffect(() => {
        if(!state.history) {
            console.log("#FETCH the hhistory ....")
            getDonations(COLLECTION_NAME, 'user_wallet', state.account).then((documents: DocumentData) => {
                setContributions(documents.map((document: Contribution) => document))
            })
        }
    }, [state]);

    return (
        <div>
            <h4>Your contributions:</h4>
            { contributions.length ? (
                <ol>
                    { contributions.map((contribution: Contribution) => (<li>{ contribution.transaction_hash }</li>))}
                </ol>
            ): (<span>You have not made any contribution yet</span>)}
        </div>
    )
}