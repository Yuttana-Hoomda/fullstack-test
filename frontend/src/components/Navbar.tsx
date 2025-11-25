import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { UserProps } from '../types/type';

const Navbar: React.FC<UserProps> = ({setUser}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const handleLogout = async () => {
        await axios.post('http://localhost:5000/api/auth/logout')
        setUser(null);
        navigate('/login')
    }
    const menu = [
        { label: "Deposit/Withdraw", path: "/" },
        { label: "Transaction", path: "/transaction" }
    ];
    const mobileNav = isOpen ? "left-0" : "left-[-70%]"
    return (
        <nav className='bg-gray-400 flex justify-between p-4 items-center'>
            <div className='flex items-center gap-2'>
                <div className='cursor-pointer md:hidden' onClick={toggleMenu}><MenuIcon fontSize='large' /></div>
                <h1 className='text-xl'>Clicknext</h1>
            </div>

            <div className={`bg-gray-800 fixed z-10 top-0 ${mobileNav} w-[70%] min-h-screen text-white flex flex-col overflow-y-hidden duration-300 ease-in`}>
                <div className='border-b w-full text-center py-4'>
                    <h1 className='text-2xl'>Clicknext</h1>
                </div>
                <div className='px-4 flex flex-col text-xl mt-6 gap-2 flex-1'>
                    {menu.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className={`${item.path === currentPath ? 'bg-white rounded-xl text-black ' : ''} min-w-full text-center py-4`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
                <a onClick={toggleMenu} className='py-4 text-center border-t cursor-pointer'>Close</a>
            </div>

            <button
                className='bg-gray-700 text-white px-6 py-1 rounded-xl cursor-pointer'
                onClick={handleLogout}
            >
                Log out
            </button>
        </nav>
    )
}

export default Navbar