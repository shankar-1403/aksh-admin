import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar/>
            <main className="mx-auto min-w-0 max-w-350 px-3 pb-5 pt-20 sm:px-4 sm:pb-8 sm:pt-20">
                <Outlet/>
            </main>
        </div>
    </>
  )
}

export default Layout