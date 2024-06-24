import React from 'react'
import { Contribution } from "@/types";
import {formatAddress} from "@/utils/helpers";
import { BLOCK_EXPLORER_URL } from "../../../config";

interface ContributionItemProps {
    contribution: Contribution
}
const ContributionItem = ({ contribution }: ContributionItemProps) => (
    <div>
        <div>Transaction Hash:
            <a href={`${ BLOCK_EXPLORER_URL }${contribution.transaction_hash}`}>{ formatAddress(contribution.transaction_hash ) }</a>
        </div>
        <div>Amount: { contribution.amount }</div>
        <div>

        </div>
    </div>
)

export default ContributionItem