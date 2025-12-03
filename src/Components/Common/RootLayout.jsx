import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import ContextAPI from '../ContextAPI'

export default function RootLayout() {
    return (
        <>
            <ContextAPI>
                <ToastContainer />
                <Header />

                <Outlet />

                <Footer />
            </ContextAPI>
        </>
    )
}
