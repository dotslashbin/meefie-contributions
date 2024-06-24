import React, { ReactElement, useEffect, useState } from 'react'
import { useStore } from '@/context/StoreContext'
import { getDonations} from "@/services/Firebase"
import { DocumentData } from "firebase/firestore";
import { COLLECTION_NAME } from "@/utils/db";
import { Contribution } from "@/types";
import HistoryItem from "@/components/sections/HistoryItem";

export default function History(): ReactElement {

    const { state, dispatch } = useStore()
    const [ contributions, setContributions ] = useState<Contribution[]>([])

    useEffect(() => {

        if(state.history.length == 0) {
            getDonations(COLLECTION_NAME, 'user_wallet', state.account).then((documents: DocumentData) => {
                const data = documents.map((document: Contribution) => document)
                setContributions(data)

                dispatch({ type: 'SET_HISTORY', payload: data })
            })
        } else  {
            // GEt from store
            console.log('#DEBUG ..inside sotre: "', state.history)
        }



    }, []);

    return (
        <div>
            <h4>Your contributions:</h4>
            { contributions.length ? (
                <div>
                    { contributions.map((contribution: Contribution) => (<HistoryItem key={contribution.transaction_hash} contribution={contribution} />))}
                </div>
            ): (<span>You have not made any contribution yet</span>)}
        </div>
    )
}