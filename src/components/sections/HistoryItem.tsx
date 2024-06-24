import React, {useState} from 'react'
import { Contribution } from "@/types";
import {formatAddress} from "@/utils/helpers";
import { BLOCK_EXPLORER_URL } from "../../../config";

// PDF Generation
import { pdf } from '@react-pdf/renderer';
import ContributionCertificate from "@/documents/ContributionCertificate";
import { saveAs } from 'file-saver';


interface ContributionItemProps {
    contribution: Contribution
}
export default function ContributionItem({ contribution }: ContributionItemProps) {

    const [loading, setLoading] = useState(false);

    // TODO: impelment fetching of theh correct number of tokens
    const generatePdfDocument = async () => {
        setLoading(true);
        const blob = await pdf(<ContributionCertificate contributor={contribution.name} contribution={contribution.amount} token_amount='100000000' wallet={contribution.destination_wallet}/>).toBlob();
        saveAs(blob, 'example.pdf');
        setLoading(false);
    };

    return (
        <div>
            <div>Transaction Hash:
                <a href={`${ BLOCK_EXPLORER_URL }${contribution.transaction_hash}`}>{ formatAddress(contribution.transaction_hash ) }</a>
            </div>
            <div>Amount: { contribution.amount }</div>
            <div>
                <button onClick={ generatePdfDocument } disabled={ loading }>
                    {loading ? 'Generating PDF...' : 'Download Certificate'}
                </button>
            </div>
        </div>
    )
}