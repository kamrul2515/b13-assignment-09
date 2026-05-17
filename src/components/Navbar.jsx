"use client"; // Hook bebohar koray eta client component hote hobe

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; // Active path check korar jonno
import { BriefcaseMedical } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname(); // Bortoman URL path nibe

    // Active ebong Normal style classes
    const activeLinkClass = "text-[#0055CC] font-semibold border-b-2 border-[#0055CC] pb-1";
    const normalLinkClass = "text-gray-600 font-medium hover:text-[#0055CC] transition-all duration-300";

    const navLinks = (
        <>
            <li>
                <Link 
                    href="/" 
                    className={pathname === "/" ? activeLinkClass : normalLinkClass}
                >
                    Home
                </Link>
            </li>
            <li>
                <Link 
                    href="/appointments" 
                    className={pathname === "/appointments" ? activeLinkClass : normalLinkClass}
                >
                    Appointments
                </Link>
            </li>
            <li>
                <Link 
                    href="/dashboard" 
                    className={pathname === "/dashboard" ? activeLinkClass : normalLinkClass}
                >
                    Dashboard
                </Link>
            </li>
        </>
    );

    return (
        <nav className='bg-white border-b border-gray-100 sticky top-0 z-50'>
            <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
                
                {/* Logo Section */}
                <div className='flex items-center gap-2'>
                    <Link href="/" className="flex items-center gap-2 text-[#0055CC] text-2xl font-bold">
                        <div className="border-2 border-[#0055CC] p-1 rounded-md">
                            <BriefcaseMedical size={24} />
                        </div>
                        <span>DocAppoint</span>
                    </Link>
                </div>

                {/* Desktop: Center Links */}
                <div className='hidden md:flex flex-1 justify-center'>
                    <ul className='flex items-center gap-10'>
                        {navLinks}
                    </ul>
                </div>

                {/* Right Side: Auth Buttons */}
                <div className='flex items-center gap-6'>
                    <Link href="/login" className="text-[#0055CC] font-medium hover:underline">
                        Log in
                    </Link>
                    <Link href="/signup" className="bg-[#0055CC] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0044aa] transition-all shadow-md active:scale-95">
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 gap-2">
                        {navLinks}
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;