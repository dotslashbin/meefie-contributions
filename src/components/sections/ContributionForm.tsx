import React, { ReactElement, useEffect } from 'react';
import { useStore } from "@/context/StoreContext";
import { ethers } from 'ethers'

export default function ContributionForm(): ReactElement {

    const { state } = useStore()

    useEffect(() => {
        try {
            getBalance().then((returns) => {
                console.log("#RETURNS: ", ethers.utils.formatEther(returns))
            })

        } catch (error) {
            console.error('Error fetching balance: ', error)
        }
    }, []);

    const getBalance = async () => {
        console.log("you are fetching the balance ...")

        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const ETHBalance = await provider.getBalance(state.account)

        return ETHBalance;
    }


    return (
        <div>
            <div>
                USDT BALANCE: {state.account}
            </div>
            <div>Name: <input type="text" /></div>
            <div>Email: <input type="text" /></div>
            <div>Amount: <input type="text" /></div>
            <button>Submit donation</button>
        </div>
    );
}
