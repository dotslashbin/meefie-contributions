import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    console.log("#THIS IS THE MAIN APP running")
    return <Component {...pageProps} />
}