import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <nav className='py-6' >
            <ul className='flex justify-between items-center m-auto w-[80vw] font-["Raleway"]' >
                <li className='font-extrabold text-2xl' >P-Ticket</li>
                <li className='flex gap-10 text-sm ' >
                    <NavLink to={"/"} className='cursor-pointer nav relative'>
                    <span>Home</span>
                    </NavLink>
                    <NavLink to={"/about"} className='cursor-pointer nav relative'>
                    <span>About</span>
                    </NavLink>
                    <NavLink to={"/contact"} className='cursor-pointer nav relative'>
                    <span>Contact us</span>
                    </NavLink>
                </li>
                <li className='flex justify-center items-center text-sm font-["Raleway"] font-bold text-[#1DD100] gap-2 px-6 py-2 bg-[#1DD1001A] border-[#1DD10066] border rounded-md' >
                    <span>Bus</span>
                    <img src="/images/bus-icon.png" alt="" />
                </li>
            </ul>
        </nav>
    )
}

export default Header
