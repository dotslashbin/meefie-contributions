import React from 'react'

const ContributionForm = () => {
    return (
        <div>
            <div>Name: <input type="text"/></div>
            <div>Email: <input type="text"/></div>
            <div>Amount: <input type="text"/></div>
            <button>Submit donation</button>
        </div>
    )
}

export default ContributionForm