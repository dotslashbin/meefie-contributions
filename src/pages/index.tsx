import React from 'react'
// @ts-ignore
import { addContributor } from '@/services/firebase';

export default function Index() {

    const handleSubmit = async () => {
        await addContributor({
            name: 'A',
            email: 'B',
            wallet: 'C',
            transaction_hash: 'D',
        });
    }

    return (
        <div>
            <button onClick={handleSubmit}>Test save</button>
        </div>
    )
}