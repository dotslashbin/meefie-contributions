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
            <main className="flex flex-col items-center justify-between p-10">
                <div className="flex flex-row justify-between items-center w-fit p-[10px]">
                    <img className="w-20" src='./images/meefie_logo.png'/>
                    <p className="text-white font-extralight w-1/2 text-xs pt-3">MeeFie thanks you for your interest.
                        Please fill out the form to make a contribution. It will require you to sign with your wallet
                        afterwards.</p>
                </div>

                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    {state.account ? (<ContributionForm/>) : (<WelcomeScreen/>)}
                </div>

                {state.account && (
                    <div className="w-full items-center justify-between font-mono text-sm">
                        <History/>
                    </div>
                )}

            </main>
        </Layout>

    )
}