import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <nav className='py-6 relative'>
            <ul className='flex justify-between items-center m-auto w-[80vw] font-["Raleway"]'>
                <li className='font-extrabold text-2xl'>P-Ticket</li>
                <li className='gap-10 text-sm hidden sm:flex'>
                    <NavLink to="/" className='cursor-pointer nav relative'>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/about" className='cursor-pointer nav relative'>
                        <span>About</span>
                    </NavLink>
                    <NavLink to="/contact" className='cursor-pointer nav relative'>
                        <span>Contact us</span>
                    </NavLink>
                </li>
                <li className='flex gap-4 items-center'>
                    <div className='flex justify-center items-center text-[0.7rem] md:text-[0.9rem] font-["Raleway"] font-bold text-[#1DD100] gap-2 px-[0.6rem] md:px-6 py-2 bg-[#1DD1001A] border-[#1DD10066] border rounded-md'>
                        <span>Bus</span>
                        <img className=' object-contain h-[1rem]' src="/images/bus-icon.png" alt="Bus Icon" />
                    </div>
                    <HamburgerMenu />
                </li>
                {/* Hamburger Menu */}
            </ul>
        </nav>
    );
}

export default Header;

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative sm:hidden">
            <button
                className="block focus:outline-none"
                onClick={toggleMenu}
            >
                <div className={`w-6 h-0.5 bg-black mb-1 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[0.37rem]' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-black mb-1 transition-transform duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[0.37rem]' : ''}`}></div>
            </button>

            <div className={`absolute top-12 z-20 right-0 bg-white shadow-lg rounded-md p-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                <ul className="space-y-4 text-center">
                    <li>
                        <NavLink to="/" onClick={toggleMenu} 
                        className={({ isActive }) => 
                            isActive ? "text-[#030712] font-bold underline" : "text-[#030712]"
                        }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={toggleMenu} 
                         className={({ isActive }) => 
                            isActive ? "text-[#030712] font-bold underline" : "text-[#030712]"
                        }>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" onClick={toggleMenu} 
                        className={({ isActive }) => 
                            isActive ? "text-[#030712] font-bold underline" : "text-[#030712]"
                        }>
                            Contact us
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
