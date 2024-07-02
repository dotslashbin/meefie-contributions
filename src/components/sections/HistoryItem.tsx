import React, {useState} from 'react'
import { Contribution } from "@/types";
import {formatAddress} from "@/utils/helpers";
import {BLOCK_EXPLORER_URL, VALUE_PER_USDT} from "../../../config";

// PDF Generation
import moment from 'moment'

interface ContributionItemProps {
    contribution: Contribution
}
export default function ContributionItem({ contribution }: ContributionItemProps) {

    const [loading, setLoading] = useState(false);

    return (
        <div className="bg-white text-black my-3.5 rounded p-1 font-thin text-xs max-w-full">
            <div>
                Transaction on: {moment(contribution.transaction_date.toDate()).format('MMMM Do YYYY, h:mma')}
            </div>
            <div>
                Hash:
                <a className="text-decoration-line: underline text-blue-800 cursor-pointer" target="_blank"
                   href={`${BLOCK_EXPLORER_URL}${contribution.transaction_hash}`}>{formatAddress(contribution.transaction_hash)}</a>
            </div>
            <div>Amount: {contribution.amount} USDT</div>

        </div>
    )
}