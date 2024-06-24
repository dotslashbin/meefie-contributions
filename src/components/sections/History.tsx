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
    return (
        <div>
            <h4>Your contributions:</h4>
            { state.history.length > 0 ? (
                <div>
                    { state.history.map((contribution: Contribution) => (<HistoryItem key={contribution.transaction_hash} contribution={contribution} />))}
                </div>
            ): (<span>You have not made any contribution yet</span>)}
        </div>
    )
}