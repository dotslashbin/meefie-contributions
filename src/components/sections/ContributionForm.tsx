import React, { ReactElement, useEffect, useState } from 'react'
import { useStore } from "@/context/StoreContext"
import { ethers } from 'ethers'
import { MIN_DONATION, TOKEN_ABI, TOKEN_ADDRESS, TOKEN_DECIMAL } from "../../../config"
import { BalanceType } from "@/types/Web3Types"
import { sendDonation } from "@/services/Web3Service"
import {addContributor, getDonations} from '@/services/Firebase'
import { FormErrors } from "@/types/FormErrors"
import firebase from 'firebase/app'
import Balances from "@/components/sections/Balances";
import {COLLECTION_NAME} from "@/utils/db";
import {DocumentData} from "firebase/firestore";
import {Contribution} from "@/types";
import NoBalance from "@/components/sections/NoBalance";
import ContributionNotification from "@/components/sections/ContributionNotification";

export default function ContributionForm(): ReactElement {

    const { state , dispatch } = useStore()

    const [ ethBalance, setEthBalance ] = useState<string>('')
    const [ tokenBalance, setTokenBalance ] = useState<string>('')
    const [ canDonate, setCanDonate ] = useState<boolean>(false)
    const [ email, setEmail ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ amount, setAmount ] = useState<string>('')
    const [ destinationWallet, setDestinationWallet ] = useState<string>('')
    const [ donationTxnHash, setDonationTxn ] = useState<string>('')
    const [ isBusy, setIsBusy ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>('')
    const [ messageType, setMessageType ] = useState<string>('success')
    const [ errors, setErrors ] = useState<FormErrors>({})

    useEffect(() => {
        const initBalances = async () => {
            try {
                // @ts-ignore
                const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                const tokenContract: ethers.Contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

                const balances: BalanceType = {
                    eth: await provider.getBalance(state.account),
                    token: await tokenContract.balanceOf(state.account),
                };

                if (balances.eth) {
                    setEthBalance(ethers.utils.formatEther(balances.eth));
                }

                if (balances.token) {
                    setTokenBalance(ethers.utils.formatUnits(balances.token, TOKEN_DECIMAL));
                }
            } catch (error) {
                console.error('Error fetching balance: ', error);
            }
        };

        initBalances().then(() => {
            // console.log("Balance updated ....")
        });
    }, [state.account]);

    useEffect(() => {
        if( parseInt(tokenBalance) >= MIN_DONATION) {
            setCanDonate(true)
        }

    }, [tokenBalance]);

    const submitSendDonation = () => {
        if (validate()) {
            setIsBusy(true)

            sendDonation(amount).then((transaction: any) => {
                // @ts-ignore
                if (transaction) {
                    setDonationTxn(transaction.transactionHash)
                    addContributor({
                        name: name,
                        email: email,
                        amount: amount,
                        user_wallet: state.account,
                        destination_wallet: !destinationWallet ? state.account:destinationWallet,
                        transaction_hash: transaction.transactionHash,
                        transaction_date: new Date(),
                    }).then((result) => {
                        setIsBusy(false)
                        setMessage(`Thank you for your contribution of ${amount} USDT. Your certificate will be sent via email within 2 working days.`)

                        getDonations(COLLECTION_NAME, 'user_wallet', state.account).then((documents: DocumentData) => {
                            const data = documents.map((document: Contribution) => document)
                            dispatch({ type: 'SET_HISTORY', payload: data })
                        })

                        clearFrom()
                    }).catch((error) => { console.error(error) })

                } else {
                    setMessage('There was a problem with the transaction. Please contact admin@meefie.com for support.')
                    setMessageType('error')
                }
            });
        } else {
            setIsBusy(false)
        }
    }

    const validate = () => {
        const newErrors: FormErrors = {};

        // Name validation
        if(!name) {
            newErrors.name = 'A name is required'
        }

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        // Text input validation
        if (!amount) {
            newErrors.amount = 'An amount is required';
        }

        if(destinationWallet && !ethers.utils.isAddress(destinationWallet)) {
            newErrors.destination_wallet = 'Destination wallet is invalid'
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const clearFrom = () => {
        setName('')
        setAmount('')
        setEmail('')
        setDestinationWallet('')
    }

    return (
        <div className="">
            <Balances ethBalance={ethBalance} tokenBalance={tokenBalance} />
            {canDonate ? (
                <div>
                    <div className="space-y-12 text-white">
                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                Name
                            </label>

                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-white sm:max-w-md">
                                    <input name="name"
                                           id="name"
                                           type="text"
                                           value={name}
                                           onChange={(event) => setName(event.target.value)}
                                           className="block flex-1 bg-transparent py-1.5 pl-1 text-white placeholder:text-white focus:ring-0 sm:text-sm"/>
                                </div>
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email
                            </label>

                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-white sm:max-w-md">
                                    <input name="email"
                                           type="email"
                                           id="email"
                                           value={email}
                                           onChange={(event) => setEmail(event.target.value)}
                                           className="block flex-1 bg-transparent py-1.5 pl-1 text-white placeholder:text-white focus:ring-0 sm:text-sm"/>
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label htmlFor="donation_amt" className="block text-sm font-medium leading-6 text-white">
                                Amount
                            </label>

                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-white sm:max-w-md">
                                    <input
                                        name="donation_amt"
                                        id="donation_amt"
                                        type="number"
                                        min={MIN_DONATION}
                                        value={amount}
                                        onChange={(event) => setAmount(event.target.value)}
                                        className="block flex-1 bg-transparent py-1.5 pl-1 text-white placeholder:text-white focus:ring-0 sm:text-sm"
                                    />
                                </div>
                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label htmlFor="destination_wallet"
                                   className="block text-sm font-medium leading-6 text-white">
                                OPTIONAL: If you enter a destination wallet, we will be sending the MFT tokens to that
                                wallet instead. Otherwise, we will be sending it to the current wallet that is connected
                                to this app.
                            </label>
                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-white sm:max-w-md">
                                    <input
                                        type="text"
                                        id="destination_wallet"
                                        name="destination_wallet"
                                        value={destinationWallet}
                                        onChange={(event) => setDestinationWallet(event.target.value)}
                                        className="block flex-1 bg-transparent py-1.5 pl-1 text-white placeholder:text-white focus:ring-0 sm:text-sm"
                                    />
                                </div>
                                {errors.destination_wallet &&
                                    <p className="text-red-500 text-sm">{errors.destination_wallet}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between">
                            {isBusy ? (
                                <span className="font-bold opacity-50">Processing transaction ... Sit back, relax and let the chain do the work. You will see a summary below, once it is completed.</span>) : (
                                <button className="cursor-pointer bg-yellow-300 rounded h-10 px-1.5 text-black
                            " onClick={submitSendDonation}>Submit donation</button>)
                            }
                        </div>
                        { message && (<ContributionNotification message={message} header={messageType} />)}
                    </div>
                </div>
            ) : (<NoBalance/>)
            }

        </div>
    );
}
