// components/Layout.js

import React, { ReactNode } from 'react'
import Head from 'next/head'
import {LayoutProps} from "@/types/LayoutProps";

export default function Layout ({ children }: LayoutProps) {
    return (
        <div>
            <Head>
                <title>Meefie Contributions Page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <main>{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>MeeFie© 2024 My Website</p>
            </footer>
        </div>
    )
}