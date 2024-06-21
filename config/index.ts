export const TOKEN_ADDRESS: string = '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06'

export const TOKEN_ABI: string[] = [
    // Get the account balance
    "function balanceOf(address) view returns (uint256)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint256 amount) returns (bool)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint256 amount)"
]

export const DONATION_WALLET: string = '0xbb401227A756a11BbB9e9eE316B75E3d045cdF3b'

export const MIN_DONATION: number = 50

export const TOKEN_DECIMAL = 6

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBgKJbn7grsCTFpoc5vb5vi_MaFOV0rIsw",
    authDomain: "meefie-contributions.firebaseapp.com",
    projectId: "meefie-contributions",
    storageBucket: "meefie-contributions.appspot.com",
    messagingSenderId: "720478229275",
    appId: "1:720478229275:web:b1dcf9796cd01ec7f9b9be"
};