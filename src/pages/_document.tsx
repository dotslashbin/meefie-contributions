import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    console.log("#now this is from the document file")
    return (
        <Html>
            <Head />
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}