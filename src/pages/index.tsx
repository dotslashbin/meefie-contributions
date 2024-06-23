import React, {ReactElement} from 'react'
import NavBar from '../components/sections/NavBar'
import { useStore }  from '@/context/StoreContext'
import ContributionForm from "@/components/sections/ContributionForm"
import WelcomeScreen from "@/components/sections/WelcomeScreen"

// Layout
import Head from 'next/head'
import Layout from '../components/sections/Layout'

export default function Index(): ReactElement {

    const { state } = useStore()

    return (
        <Layout>
            <Head>
                <title>Thios is the main mpage</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div>
                <NavBar/>
                {state.account ? (<ContributionForm/>) : (<WelcomeScreen/>)}
            </div>
        </Layout>

    )
}