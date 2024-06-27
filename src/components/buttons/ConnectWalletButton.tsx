import React, { useEffect } from 'react'
import { useSDK } from "@metamask/sdk-react"
import { formatAddress } from "@/utils/helpers"
import WalletIcon from "../../../public/icons/WalletIcon"
import { useStore } from '@/context/StoreContext'
import { getDonations} from "@/services/Firebase"
import { COLLECTION_NAME } from "@/utils/db";
import { DocumentData } from "firebase/firestore";
import { Contribution } from "@/types";


export const ConnectWalletButton = () => {
    const { sdk, connected, connecting, account } = useSDK();

    const { dispatch} = useStore()

    const connect = async () => {
        try {
            await sdk?.connect()
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const disconnect = () => {
        if (sdk) {
            sdk.terminate();
            dispatch({ type: 'SET_ACCOUNT', payload: '' })
        }
    };

    useEffect(() => {
        if(account) {
            // Assigns Account
            dispatch({ type: 'SET_ACCOUNT', payload: account })

            // Assigns history
            getDonations(COLLECTION_NAME, 'user_wallet', account).then((documents: DocumentData) => {
                const data = documents.map((document: Contribution) => document)
                dispatch({ type: 'SET_HISTORY', payload: data })
            })
        }
    }, [account, dispatch]);

    return (
        <div className="relative">
            {connected && account ? (
                <div className="flex justify-between">
                    <div>
                        account: <span className='underline'>{formatAddress(account)}</span>
                    </div>
                    <button onClick={disconnect}
                            className="bg-blue-800 block w-fit rounded-md border-1 py-1 px-1 text-white shadow-sm ring-white-300">disconnect
                    </button>
                </div>
            ) : (
                <div>
                    <button disabled={connecting} onClick={connect}
                            className="flex flex-row items-left justify-left align-super cursor-pointer">
                    <WalletIcon className="mr-2 h-4 w-4" />
                        Connect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};