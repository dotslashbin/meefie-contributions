import React, {ReactElement} from 'react'
import NavBar from '../components/sections/NavBar'
import { useStore }  from '@/context/StoreContext'
import ContributionForm from "@/components/sections/ContributionForm"
import WelcomeScreen from "@/components/sections/WelcomeScreen"

// Layout
import Head from 'next/head'
import Layout from '../components/sections/Layout'
import History from "@/components/sections/History";

export default function Index(): ReactElement {

    const { state } = useStore()

    return (
        <Layout>
            <NavBar/>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    {state.account ? (<ContributionForm/>) : (<WelcomeScreen/>)}
                </div>

                { state.account ? (
                    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                        <History />
                    </div>
                ): (<></>)}

            </main>
        </Layout>

)
}