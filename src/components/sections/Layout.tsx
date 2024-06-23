// components/Layout.js

import React, { ReactNode } from 'react'
import Head from 'next/head'
import {LayoutProps} from "@/types/LayoutProps";

export default function Layout ({ children }: LayoutProps) {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/styles.css" />
            </Head>
            <main>{children}</main>
            <footer>
                <p>MeeFie© 2024 My Website</p>
            </footer>
        </div>
    )
}