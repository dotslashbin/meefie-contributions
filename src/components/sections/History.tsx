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
        <div className="my-4">
            <hr />
            <div className="my-3.5">
                { state.history.length > 0 ? (
                    <div className="px-2.5 py-1 border border-dotted">
                        { state.history.map((contribution: Contribution) => (<HistoryItem key={contribution.transaction_hash} contribution={contribution} />))}
                    </div>
                ): (<div className="my-1 text-white"><span>You have not made any contribution yet</span></div>)}
            </div>
        </div>
    )
}