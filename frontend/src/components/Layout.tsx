import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Menu from './Menu'

const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Navbar/>
            <div className='grid grid-cols-4 flex-1'>
                <div className='col-span-1 max-md:hidden bg-gray-500 px-4 py-8'>
                    <Menu/>
                </div>
                <div className='col-span-3 max-md:col-span-4 px-4 py-8 flex flex-col items-center'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout