import React from 'react'
import NavBar from '../components/NavBar'
import { useStore }  from '../context/StoreContext'

export default function Index() {

    const { state } = useStore()

    console.log('#DEBUG state: ', state)

    return (
        <div>
            <NavBar />
            <div>
                this is where the form is {state.account}
            </div>
        </div>
    )
}