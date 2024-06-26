export const TOKEN_ADDRESS: string = `${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`;

export const TOKEN_ABI: string[] = [
    // Get the account balance
    "function balanceOf(address) view returns (uint256)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint256 amount) returns (bool)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint256 amount)"
]

export const DONATION_WALLET: string = `${process.env.NEXT_PUBLIC_DONATION_WALLET}`

// @ts-ignore
export const MIN_DONATION: number = process.env.NEXT_PUBLIC_MIN_DONATION

export const TOKEN_DECIMAL = 6

export const FIREBASE_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID
};

export const COLLECTION_NAME = process.env.NEXT_PUBLIC_COLLECTION_NAME

export const BLOCK_EXPLORER_URL = process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL

export const VALUE_PER_USDT = process.env.NEXT_PUBLIC_VALUE_PER_USDT