"use client";

import React, { useState } from 'react';
import Image from "next/image";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-transparent">
      <a className="flex items-center gap-3" href="/">
        <div className="flex items-center gap-2">
          <Image
            className="logo-img"
            src="/images/icon.jpg"
            alt="Profile Picture"
            width={40}
            height={40}
            priority
          />
          <div className="title-text text-xl font-bold">
            Misho Metodiev
          </div>
        </div>
      </a>
      <div className="relative">
        <button
          className="hamburger-button focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Hamburger icon */}
          <div className="hamburger-icon">
            <div className="line bg-white h-1 w-6 mb-1"></div>
            <div className="line bg-white h-1 w-6 mb-1"></div>
            <div className="line bg-white h-1 w-6"></div>
          </div>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-black shadow-lg rounded-lg p-4 z-10">
            <div className="nav-buttons flex flex-col gap-2">
              <a className="header-button-text text-lg font-bold text-white hover:underline" href="/">Home</a>
              <a className="header-button-text text-lg font-bold text-white hover:underline" href="/about">About</a>
              <a className="header-button-text text-lg font-bold text-white hover:underline" href="/projects">Projects</a>
              <a className="header-button-text text-lg font-bold text-white hover:underline" href="/contact">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;