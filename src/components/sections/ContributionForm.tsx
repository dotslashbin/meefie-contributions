import React, { ReactElement, useEffect, useState } from 'react';
import { useStore } from "@/context/StoreContext";
import { ethers } from 'ethers'
import {TOKEN_ABI, TOKEN_ADDRESS} from "../../../config";

export default function ContributionForm(): ReactElement {

    const { state } = useStore()

    const [ ethBalance, setEthBalance ] = useState<string>('')
    const [ tokenBalance, setTokenBalance ] = useState<string>('')

    useEffect(() => {
        try {
            getBalance().then((balances) => {
                // console.log("#RETURNS: ", ethers.utils.formatEther(returns))

                if (balances.eth) {
                    setEthBalance(ethers.utils.formatEther(balances.eth))
                }

                if(balances.token) {
                    setTokenBalance(ethers.utils.formatEther(balances.token))
                }


            })

        } catch (error) {
            console.error('Error fetching balance: ', error)
        }
    }, []);

    const getBalance = async () => {
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)

        return {
            eth: await provider.getBalance(state.account),
            token: await tokenContract.balanceOf(state.account)
        }
    }


    return (
        <div>
            <div>
                ETH bal: { ethBalance }
            </div>
            <div>
                USDT (OR OTHER TOKEN): { tokenBalance }
            </div>
            <div>Name: <input type="text" /></div>
            <div>Email: <input type="text" /></div>
            <div>Amount: <input type="text" /></div>
            <button>Submit donation</button>
        </div>
    );
}
