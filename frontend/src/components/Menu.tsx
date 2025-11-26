import React from 'react'
import { useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const menu = [
        { label: "Deposit/Withdraw", path: "/" },
        { label: "Transaction", path: "/transaction" }
    ];

    return (
        <div className='flex flex-col text-xl gap-2 '>
            {menu.map((item) => (
                <a
                    key={item.path}
                    href={item.path}
                    className={`${item.path === currentPath ? 'bg-white rounded-xl text-black ' : 'text-white'} min-w-full text-center py-4`}
                >
                    {item.label}
                </a>
            ))}
        </div>
    )
}

export default Menu