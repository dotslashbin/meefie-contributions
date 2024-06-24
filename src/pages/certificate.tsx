// pages/index.js

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import ContributionCertificate from "@/documents/ContributionCertificate";
import { saveAs } from 'file-saver';

const Certificate = () => {
    const [loading, setLoading] = useState(false);

    const generatePdfDocument = async () => {
        setLoading(true);
        const blob = await pdf(<ContributionCertificate contributor='Joshua Fuentes' contribution='100' token_amount='100000000' wallet='ABV123'/>).toBlob();
        saveAs(blob, 'example.pdf');
        setLoading(false);
    };

    return (
        <div>
            <h1>Generate PDF Example</h1>
            <button onClick={generatePdfDocument} disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
        </div>
    );
};

export default Certificate;
