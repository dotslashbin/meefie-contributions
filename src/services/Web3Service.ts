import { ethers } from 'ethers'
import { useStore }  from '@/context/StoreContext'
import {DONATION_WALLET, TOKEN_ABI, TOKEN_ADDRESS, TOKEN_DECIMAL} from "../../config";

export const sendDonation = async (amount: string): Promise<void> => {
    try {
        // @ts-ignore
        const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tokenContract: ethers.Contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
        const transaction = await tokenContract.transfer(DONATION_WALLET, ethers.utils.parseUnits(amount, TOKEN_DECIMAL))

        return transaction.wait()

    } catch (error) {
        console.error('There was an error sending the donation: ', error)
    }
}