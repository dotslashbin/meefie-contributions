import React, { ReactElement } from 'react';

export default function ContributionForm(): ReactElement {
    return (
        <div>
            <div>Name: <input type="text" /></div>
            <div>Email: <input type="text" /></div>
            <div>Amount: <input type="text" /></div>
            <button>Submit donation</button>
        </div>
    );
}
