
import Link from "next/link";
import { ConnectWalletButton } from "@/components/buttons/ConnectWalletButton";
import { MetaMaskProvider } from "@metamask/sdk-react";

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
        <nav className="flex-auto border items-center justify-between max-w-screen-xl px-6 mx-auto py-3 bg-gradient-to-r from-yellow-500 to-white">
            <MetaMaskProvider debug={true} sdkOptions={sdkOptions}>
                <ConnectWalletButton />
            </MetaMaskProvider>
        </nav>
    );
};

export default NavBar;