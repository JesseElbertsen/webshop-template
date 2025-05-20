"use client";
import React, { useState, useEffect } from "react";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Voorkomen dat je kunt scrollen als het menu open is
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // Nav items met hun href en icon
  const navLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Over ons", href: "/over-ons", icon: InformationCircleIcon },
    { name: "producten", href: "/producten", icon: ShoppingBagIcon },
    { name: "Contact", href: "/contact", icon: EnvelopeIcon },
  ];

  return (
    <nav className="relative top-0 w-full z-50 shadow-xl text-xl">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center bg-muted h-[6rem] backdrop-blur-md text-white py-4 px-10 relative">
        <Link href="/" className="text-2xl text-black z-50">
          logo hier
        </Link>
        <ul className="flex space-x-10">
          {navLinks.map((link, index) => (
            <li key={index} className="group flex items-center gap-2">
              <a
                href={link.href}
                className="transition z-50 bg-primary text-white px-4 py-2 rounded hover:bg-primary-light w-full flex items-center gap-2"
              >
                {link.name}
                <link.icon className="w-6 h-6 " />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden relative z-50">
        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute top-6 right-8 z-50"
        >
          {open ? (
            <XMarkIcon className="w-10 h-10 text-black" />
          ) : (
            <Bars3BottomRightIcon className="w-10 h-10 text-black" />
          )}
        </button>

        {/* Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-muted transform transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul
            className="flex flex-col items-center justify-center h-full space-y-8 text-black text-4xl opacity-0 transition-opacity duration-500 ease-in-out delay-200"
            style={{ opacity: open ? 1 : 0 }}
          >
            {navLinks.map((link, index) => (
              <li key={index} className="flex items-center gap-4">
                <a
                  href={link.href}
                  className="hover:text-primary-100 transition flex items-center gap-4"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                  <link.icon className="w-10 h-10" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
