import React from 'react'

export default function ContributionForm() {
    return (
        <div>
            <div>Name: <input type="text"/></div>
            <div>Email: <input type="text"/></div>
            <div>Amount: <input type="text"/></div>
            <button>Submit donation</button>
        </div>
    )
}