"use client";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

import { mainFont, montserrat } from "../../public/fonts/fonts";

import { ConnectWallet } from "@thirdweb-dev/react";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header id="header" className="d-flex align-items-center fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="index.html"
              className="logo"
              style={{ marginRight: "10px" }}
            >
              <Image
                src="/avatar_logo.jpg"
                alt="Logo"
                className="rounded-full"
                width={50}
                height={50}
              />
            </a>
            <h1 className="logo">
              <a href="/">R3WARTIST</a>
            </h1>
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a href="/" className="nav-link scrollto">
                  Home
                </a>
              </li>
              <li>
                <a href="/create" className="nav-link scrollto">
                  Create
                </a>
              </li>

              <li>
                <a href="/explore" className="nav-link scrollto">
                  Explore
                </a>
              </li>

              <li>
                <a href="/dashboard" className="nav-link scrollto">
                  Dashboard
                </a>
              </li>

              <li>
                <div className="hidden md:block">
                  <ConnectWallet
                    btnTitle="Sign in"
                    className=" py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="md:hidden">
                  <button onClick={handleToggleMenu} className="text-black">
                    <HiMenuAlt3 className="w-6 h-6" />
                  </button>
                </div>
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
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
