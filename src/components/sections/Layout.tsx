// components/Layout.js

import React, { ReactNode } from 'react'
import Head from 'next/head'
import {LayoutProps} from "@/types/LayoutProps";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function Layout ({ children }: LayoutProps) {
    return (
        <div>
            <Header />
            <main className="bg-[url('/images/background.jpg')]">
                {children}
            </main>
            <Footer />
        </div>
    )
}