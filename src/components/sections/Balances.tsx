import React from 'react'

interface BalancesProps {
    tokenBalance: string,
    ethBalance: string
}

const Balances = ({ tokenBalance, ethBalance }: BalancesProps)  => (
    <div className="flex-row py-1 px-4 bg-white opacity-70 text-blue-900 rounded-2xl">
        <span>YOUR BALANCE</span>
        <div>
            ETH: {ethBalance}
        </div>
        <div>
            USD: {tokenBalance}
        </div>
    </div>
)

export default Balances