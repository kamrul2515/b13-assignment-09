"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  BriefcaseMedical,
  LogOut,
  User,
  LayoutDashboard,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = React.useState(false);

  // SESSION
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // ACTIVE STYLE
  const activeLinkClass =
    "text-[#0055CC] font-bold border-b-2 border-[#0055CC] pb-1";

  const normalLinkClass =
    "text-gray-600 font-medium hover:text-[#0055CC] transition-all duration-300";

  // LOGOUT
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");

      toast.success("Logout successful!");

      router.push("/login");
    } catch (error) {
      console.log(error);

      toast.error("Logout failed!");
    }
  };

  // NAV ITEMS
  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Appointments",
      href: "/appointments",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Profile",
      href: "/profile",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">

      <div className="container mx-auto px-4 md:px-6">

        <div className="flex items-center justify-between py-4">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-2xl border-2 border-[#0055CC] text-[#0055CC]">
              <BriefcaseMedical size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#0055CC]">
                DocAppoint
              </h1>

              <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-semibold">
                Healthcare Platform
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href
                    ? activeLinkClass
                    : normalLinkClass
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">

            {isPending ? (
              <div className="w-8 h-8 border-4 border-blue-100 border-t-[#0055CC] rounded-full animate-spin"></div>
            ) : user ? (
              <>
                {/* USER CARD */}
                <Link
                  href="/profile"
                  className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-all px-3 py-2 rounded-2xl border border-gray-100"
                >
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

                  <div className="hidden lg:block">
                    <h3 className="text-sm font-bold text-gray-800">
                      {user?.name || "User"}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-md"
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
                  className="bg-[#0055CC] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden pb-6 animate-in slide-in-from-top duration-300">

            {/* USER */}
            {user && (
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl mb-5 border border-gray-100">

                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#0055CC]">

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
                  <h2 className="font-bold text-gray-800">
                    {user?.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* NAV LINKS */}
            <div className="flex flex-col gap-3">

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    pathname === item.href
                      ? "bg-blue-50 text-[#0055CC] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name === "Dashboard" && (
                    <LayoutDashboard size={20} />
                  )}

                  {item.name === "Appointments" && (
                    <CalendarDays size={20} />
                  )}

                  {item.name === "Profile" && (
                    <User size={20} />
                  )}

                  {item.name === "Home" && (
                    <BriefcaseMedical size={20} />
                  )}

                  {item.name}
                </Link>
              ))}

              {/* MOBILE AUTH */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-bold transition-all"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3 mt-3">

                  <Link
                    href="/login"
                    className="text-center border border-[#0055CC] text-[#0055CC] py-3 rounded-2xl font-bold"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="text-center bg-[#0055CC] text-white py-3 rounded-2xl font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;