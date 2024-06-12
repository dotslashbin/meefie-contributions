import React from 'react'
// @ts-ignore
import { addContributor } from '@/services/firebase';
import {Contributor} from "@/types";

export default function Index() {

    const handleSubmit = async () => {

        const data: Contributor = ({
            name: 'Ax',
            email: 'Bx',
            wallet: 'Cx',
            transaction_hash: 'Dx',
        });

        await addContributor(data);
    }

    return (
        <div>
            <button onClick={handleSubmit}>Test save</button>
        </div>
    )
}