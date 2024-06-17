import React from 'react'
import NavBar from '../components/sections/NavBar'
import { useStore }  from '../context/StoreContext'
import ContributionForm from "@/components/sections/ContributionForm";
import WelcomeScreen from "@/components/sections/WelcomeScreen";

export default function Index() {

    const { state } = useStore()

    return (
        <div>
            <NavBar />
            { state.account? <ContributionForm />: <WelcomeScreen />}
        </div>
    )
}