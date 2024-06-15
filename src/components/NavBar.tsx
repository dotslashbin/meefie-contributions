
import Link from "next/link";

import WalletIcon from "../../public/icons/WalletIcon";


import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";

export const ConnectWalletButton = () => {
    const { sdk, connected, connecting, account } = useSDK();

    const connect = async () => {
        try {
            console.log("#YOU ARE trying to connect")
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts found`, err);
        }
    };

    const disconnect = () => {
        if (sdk) {
            sdk.terminate();
        }
    };

    console.log("#DEBUG ... connected: ", connected)

    return (
        <div className="relative">
            {connected ? (
                <div>
                    account: {account}
                </div>
            ) : (
                <button disabled={connecting} onClick={connect}>
                    <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
                </button>
            )}
        </div>
    );
};


export const NavBar = () => {
    const host =
        typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: " Meefie Contributions App",
            url: host, // using the host constant defined above
        },
    };

    return (
        <nav className="flex items-center justify-between max-w-screen-xl px-6 mx-auto py-7 rounded-xl">

            <MetaMaskProvider debug={true} sdkOptions={sdkOptions}>
                <ConnectWalletButton />
            </MetaMaskProvider>
        </nav>
    );
};

export default NavBar;