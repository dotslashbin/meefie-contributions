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
            <main className="bg-[url('/images/background.jpg')]">{children}</main>
            <footer className="bg-yellow-500 text-blue p-4 text-center">
                <p>MeeFie©2024</p>
            </footer>
        </div>
    )
}