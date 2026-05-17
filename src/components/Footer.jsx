import React from 'react';
import Link from 'next/link';
import { BriefcaseMedical } from 'lucide-react'; // Navbar e jeta use korecho shetai

const Footer = () => {
    return (
        <footer className="bg-[#E9EBF4] py-12 px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                
                {/* Left Side: Logo and Copyright */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#091E42] text-xl font-bold">
                        <div className="bg-[#0055CC] p-1 rounded-md text-white">
                            <BriefcaseMedical size={20} />
                        </div>
                        <span>DocAppoint</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                        © 2024 DocAppoint. Professional <br /> Healthcare Management.
                    </p>
                </div>

                {/* Right Side: Links */}
                <div className="flex flex-wrap items-center gap-6 md:gap-10">
                    <Link href="/" className="text-[#0055CC] font-semibold border-b-2 border-[#0055CC] text-sm">
                        Home
                    </Link>
                    <Link href="/find-doctor" className="text-gray-600 font-medium hover:text-[#0055CC] transition-colors text-sm underline decoration-gray-400">
                        Find Doctor
                    </Link>
                    <Link href="/privacy-policy" className="text-gray-600 font-medium hover:text-[#0055CC] transition-colors text-sm underline decoration-gray-400">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-gray-600 font-medium hover:text-[#0055CC] transition-colors text-sm underline decoration-gray-400">
                        Terms of Service
                    </Link>
                </div>

            </div>
        </footer>
    );
};

export default Footer;