"use client";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

import { mainFont, montserrat } from "../fonts/fonts";

import { ConnectWallet } from "@thirdweb-dev/react";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="text-black py-4">
      <div className="container mx-auto px-4">
        <div className="flex  justify-between items-center">
          {/* Logo Part */}
          <div>
            <Link
              href="/"
              className="flex flex-row justify-center items-center gap-2 "
            >
              <Image
                src="/avatar_logo.jpg"
                alt="Logo"
                className="rounded-full"
                width={50}
                height={50}
              />
              <p className="text-xl md:text-2xl font-bold  bg-clip-text">
                <span className={mainFont.className}>R3WARTIST</span>
              </p>
            </Link>
          </div>

          {/* Navbar Menu */}
          <div
            className={`hidden text-lg md:flex space-x-4 ${montserrat.className}`}
          >
            <Link href="/" className="  hover:font-bold">
              Home
            </Link>
            <Link href="/create" className="  hover:font-bold">
              Create
            </Link>

            <Link href="/explore" className="  hover:font-bold">
              Explore
            </Link>
            <Link href="/dashboard" className="  hover:font-bold">
              Dashboard
            </Link>
          </div>

          {/* Login Button */}

          {/* <button className="hidden md:flex bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300 ">
                Launch App
              </button> */}
          <div className="hidden md:block">
            <ConnectWallet
              btnTitle="Sign in"
              className=" py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={handleToggleMenu} className="text-black">
              <HiMenuAlt3 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Responsive Menu */}
        {isMenuOpen && (
          <div className="w-full rounded-2xl mt-2 flex flex-row justify-start items-end bg-gray-200">
            <div
              className={`md:hidden flex flex-col justify-start items-start gap-2 p-4 ${montserrat.className}`}
            >
              <Link href="/" className="block  hover:font-bold">
                Home
              </Link>
              <Link href="/create" className="block hover:font-bold">
                Create
              </Link>

              <Link href="/explore" className="  hover:font-bold">
                Explore
              </Link>
              <Link href="/dashboard" className="  hover:font-bold">
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
