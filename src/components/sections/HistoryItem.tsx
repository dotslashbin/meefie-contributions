import React, {useState} from 'react'
import { Contribution } from "@/types";
import {formatAddress} from "@/utils/helpers";
import {BLOCK_EXPLORER_URL, VALUE_PER_USDT} from "../../../config";

// PDF Generation
import { pdf } from '@react-pdf/renderer';
import ContributionCertificate from "@/documents/ContributionCertificate";
import { saveAs } from 'file-saver';


interface ContributionItemProps {
    contribution: Contribution
}
export default function ContributionItem({ contribution }: ContributionItemProps) {

    const [loading, setLoading] = useState(false);

    const generatePdfDocument = async () => {
        setLoading(true);

        // @ts-ignore
        const tokenAmount = parseFloat(contribution.amount) / VALUE_PER_USDT

        const blob = await pdf(<ContributionCertificate contributor={contribution.name} contribution={contribution.amount} token_amount={tokenAmount.toString()} wallet={contribution.destination_wallet}/>).toBlob();
        saveAs(blob, 'example.pdf');
        setLoading(false);
    };

    return (
        <div className="bg-white text-black my-3.5 rounded p-1 font-thin text-xs">
            <div>
                tx Hash:
                <a href={`${ BLOCK_EXPLORER_URL }${contribution.transaction_hash}`}>{ formatAddress(contribution.transaction_hash ) }</a>
            </div>
            <div>Amount: { contribution.amount }</div>
        </div>
    )
}