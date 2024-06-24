import React, { ReactElement, useEffect, useState } from 'react'
import { useStore } from '@/context/StoreContext'
import { getDonations} from "@/services/Firebase"
import { DocumentData } from "firebase/firestore";
import { COLLECTION_NAME } from "@/utils/db";
import { Contribution } from "@/types";
import HistoryItem from "@/components/sections/HistoryItem";

export default function History(): ReactElement {

    const { state } = useStore()
    const [ contributions, setContributions ] = useState<Contribution[]>([])

    useEffect(() => {
        if(!state.history) {
            getDonations(COLLECTION_NAME, 'user_wallet', state.account).then((documents: DocumentData) => {
                setContributions(documents.map((document: Contribution) => document))
            })
        }
    }, [state]);

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