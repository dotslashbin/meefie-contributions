import React, { ReactElement, useEffect, useState } from 'react';
import { useStore } from "@/context/StoreContext";
import { ethers } from 'ethers'
import { MIN_DONATION, TOKEN_ABI, TOKEN_ADDRESS, TOKEN_DECIMAL } from "../../../config";
import { BalanceType } from "@/types/Web3Types";
import { sendDonation } from "@/services/Web3Service";
import { addContributor } from '@/services/Firebase'

export default function ContributionForm(): ReactElement {

    const { state } = useStore()

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

    useEffect(() => {
        const initBalances = async () => {
            try {
                // @ts-ignore
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);

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
                    destination_wallet: destinationWallet,
                    transaction_hash: transaction.transactionHash,
                }).then((result) => {
                    setIsBusy(false)
                    setMessage(`${name} donated ${amount} | transaction: ${transaction.transactionHash} | wallet: ${state.account}`)
                }).catch((error) => { console.error(error) })
            }
        });
    }

    return (
        <div>
            <div>
                ETH bal: { ethBalance }
            </div>
            <div>
                USD Token (OR OTHER TOKEN): { tokenBalance }
            </div>

            { canDonate? (
                <form>
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
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email
                            </label>

                            <div className="">
                                <div className="flex rounded-md shadow-sm ring-2 ring-inset ring-white sm:max-w-md">
                                    <input name="email"
                                           type="text"
                                           id="email"
                                           value={email}
                                           onChange={(event) => setEmail(event.target.value)}
                                           className="block flex-1 bg-transparent py-1.5 pl-1 text-white placeholder:text-white focus:ring-0 sm:text-sm"/>
                                </div>
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
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label htmlFor="destination_wallet" className="block text-sm font-medium leading-6 text-white">
                                OPTIONAL: If you enter a destination wallet, we will be sending the MFT tokens to that wallet instead. Otherwise, we will be sending it to the current wallet that is connected to this app.
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
                            </div>
                        </div>

                        {isBusy ? (<span>Loading ....</span>) : (
                            <button onClick={submitSendDonation}>Submit donation</button>)
                        }
                    </div>


                </form>
            ) : (
                <div>Not enough balance ( USD ) </div>
            )
            }

            <div>
                <h4>RESULT LOG:</h4>
                <span>{message}</span>
            </div>
        </div>
    );
}
