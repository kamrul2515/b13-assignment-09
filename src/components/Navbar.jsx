// "use client"; // Hook bebohar koray eta client component hote hobe

// import Link from 'next/link';
// import React from 'react';
// import { usePathname } from 'next/navigation'; // Active path check korar jonno
// import { BriefcaseMedical, Image } from 'lucide-react';

// const Navbar = () => {
//     const pathname = usePathname(); // Bortoman URL path nibe

//     // Active ebong Normal style classes
//     const activeLinkClass = "text-[#0055CC] font-semibold border-b-2 border-[#0055CC] pb-1";
//     const normalLinkClass = "text-gray-600 font-medium hover:text-[#0055CC] transition-all duration-300";

//     const navLinks = (
//         <>
//             <li>
//                 <Link 
//                     href="/" 
//                     className={pathname === "/" ? activeLinkClass : normalLinkClass}
//                 >
//                     Home
//                 </Link>
//             </li>
//             <li>
//                 <Link 
//                     href="/appointments" 
//                     className={pathname === "/appointments" ? activeLinkClass : normalLinkClass}
//                 >
//                     Appointments
//                 </Link>
//             </li>
//             <li>
//                 <Link 
//                     href="/dashboard" 
//                     className={pathname === "/dashboard" ? activeLinkClass : normalLinkClass}
//                 >
//                     Dashboard
//                 </Link>
//             </li>
//         </>
//     );

//     const { 
//         data: session, 
//     } = authClient.useSession() 

//     console.log("Session Data:", session) // Session data console e dekhanor jonno

//     const handleSignOut = async () => {
//         await authClient.signOut();
//     }


//     return (
//         <nav className='bg-white border-b border-gray-100 sticky top-0 z-50'>
//             <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
                
//                 {/* Logo Section */}
//                 <div className='flex items-center gap-2'>
//                     <Link href="/" className="flex items-center gap-2 text-[#0055CC] text-2xl font-bold">
//                         <div className="border-2 border-[#0055CC] p-1 rounded-md">
//                             <BriefcaseMedical size={24} />
//                         </div>
//                         <span>DocAppoint</span>
//                     </Link>
//                 </div>

//                 {/* Desktop: Center Links */}
//                 <div className='hidden md:flex flex-1 justify-center'>
//                     <ul className='flex items-center gap-10'>
//                         {navLinks}
//                     </ul>
//                 </div>

//                 {/* Right Side: Auth Buttons */}
//                 { user ? <>
//                     <div className="avatar">
//                         <div className="w-24 rounded-full">
//                         <Image src={user.avatar}  alt={user.name.charAt(0)}/>
//                         </div>
//                     </div>
//                     <div>
//                         <button className='rounded-xl' onClick={handleSignOut}>
//                             Logout
//                         </button>
//                     </div>

//                 </>:
//                     <>
//                     <div className='flex items-center gap-6'>
//                     <Link href="/login" className="text-[#0055CC] font-medium hover:underline">
//                         Log in
//                     </Link>
//                     <Link href="/signup" className="bg-[#0055CC] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0044aa] transition-all shadow-md active:scale-95">
//                         Sign Up
//                     </Link>
//                 </div>
//                     </>
//                 }

//                 {/* Mobile Menu */}
//                 <div className="md:hidden dropdown dropdown-end ml-4">
//                     <label tabIndex={0} className="btn btn-ghost btn-circle">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                         </svg>
//                     </label>
//                     <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 gap-2">
//                         {navLinks}
//                     </ul>
//                 </div>

//             </div>
//         </nav>
//     );
// };

// export default Navbar;

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BriefcaseMedical, LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // SESSION
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // ACTIVE LINK STYLE
  const activeLinkClass =
    "text-[#0055CC] font-semibold border-b-2 border-[#0055CC] pb-1";

  const normalLinkClass =
    "text-gray-600 font-medium hover:text-[#0055CC] transition-all duration-300";

  // LOGOUT
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      toast.success("Logout successful!");

      router.push("/login");
    } catch (error) {
      console.log(error);

      toast.error("Logout failed!");
    }
  };

  // NAV LINKS
  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className={
            pathname === "/" ? activeLinkClass : normalLinkClass
          }
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/appointments"
          className={
            pathname === "/appointments"
              ? activeLinkClass
              : normalLinkClass
          }
        >
          Appointments
        </Link>
      </li>

      <li>
        <Link
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? activeLinkClass
              : normalLinkClass
          }
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">

      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#0055CC] font-bold text-2xl"
        >
          <div className="border-2 border-[#0055CC] p-1.5 rounded-xl">
            <BriefcaseMedical size={24} />
          </div>

          <span>DocAppoint</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-10">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {isPending ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : user ? (
            <>
              {/* USER INFO */}
              <div className="flex items-center gap-3">

                {/* IMAGE */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0055CC]">

                  <Image
                    src={
                      user?.image ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={user?.name || "User"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* NAME */}
                <div className="hidden lg:block">
                  <h3 className="text-sm font-bold text-gray-800">
                    {user?.name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>



              {/* LOGOUT */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
              >
                <LogOut size={18} />

                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                href="/login"
                className="text-[#0055CC] font-semibold hover:underline"
              >
                Login
              </Link>

              {/* SIGNUP */}
              <Link
                href="/signup"
                className="bg-[#0055CC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="dropdown dropdown-end md:hidden">

          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-2xl w-64 gap-3"
          >
            {navLinks}

            <div className="border-t pt-3 mt-2">

              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4">

                    <div className="relative w-12 h-12 rounded-full overflow-hidden">

                      <Image
                        src={
                          user?.image ||
                          "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt={user?.name || "User"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-sm">
                        {user?.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">

                  <Link
                    href="/login"
                    className="w-full text-center border border-[#0055CC] text-[#0055CC] py-2 rounded-xl font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="w-full text-center bg-[#0055CC] text-white py-2 rounded-xl font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;