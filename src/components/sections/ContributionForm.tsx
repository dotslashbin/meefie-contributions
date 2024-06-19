import React, { ReactElement, useEffect, useState } from 'react';
import { useStore } from "@/context/StoreContext";
import { ethers } from 'ethers'
import { MIN_DONATION, TOKEN_ABI, TOKEN_ADDRESS } from "../../../config";
import { BalanceType } from "@/types/Web3Types";
import { sendDonation } from "@/services/Web3Service";

export default function ContributionForm(): ReactElement {

    const { state } = useStore()

    const [ ethBalance, setEthBalance ] = useState<string>('')
    const [ tokenBalance, setTokenBalance ] = useState<string>('')
    const [ canDonate, setCanDonate ] = useState<boolean>(false)
    const [ email, setEmail ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ amount, setAmount ] = useState<string>('')
    const [ destinationWallet, setDestinationWallet ] = useState<string>('')

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
                    setTokenBalance(ethers.utils.formatEther(balances.token));
                }
            } catch (error) {
                console.error('Error fetching balance: ', error);
            }
        };

        initBalances().then(() => {
            console.log("Balance updated ....")
        });
    }, [state.account]);

    useEffect(() => {
        if( parseInt(tokenBalance) >= MIN_DONATION) {
            setCanDonate(true)
        }

    }, [tokenBalance]);

    const subitSendDonation = (): void => {
        sendDonation(amount).then((x) => {
            console.log("service has finished!!", x)
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
                <div>
                    <div>
                        Name: <input name="name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                        <span>{ name }</span>
                    </div>
                    <div>
                        Email: <input name="email" type="text" value={email} onChange={(event) => setEmail(event.target.value)}/>
                        <span>{ email }</span>
                    </div>
                    <div>
                        Amount: <input name="donation_amt" type="number" min={MIN_DONATION} value={amount} onChange={(event) => setAmount(event.target.value)}/>
                        { amount }
                    </div>
                    <div>
                        Destination Wallet (optional .. if filled in, MFT will be sent to this wallet during vesting period):
                        <input type="text" name="destination_wallet" value={destinationWallet} onChange={(event) => setDestinationWallet(event.target.value)} />
                        <span>{destinationWallet}</span>
                    </div>
                    <button onClick={ subitSendDonation }>Submit donation</button>
                </div>
                ) : (
                    <div>Not enough balance ( USD ) </div>
                )
            }
        </div>
    );
}
