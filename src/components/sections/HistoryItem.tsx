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

    // TODO: impelment fetching of theh correct number of tokens
    const generatePdfDocument = async () => {
        setLoading(true);

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
            <div>
                <button
                    onClick={generatePdfDocument} disabled={loading}
                    type="button"
                    className="inline-block rounded border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-info-50/50 hover:text-info-600 focus:border-info-600 focus:bg-info-50/50 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 motion-reduce:transition-none dark:hover:bg-yellow-400 dark:focus:bg-yellow-400"
                    data-twe-ripple-init>
                    {loading ? 'Generating PDF...' : 'Download Certificate'}
                </button>
            </div>
        </div>
    )
}