"use client";
import React, { useState, useEffect } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Voorkomen dat je kunt scrollen als het menu open is
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // Nav items met hun href
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Over ons", href: "/over-ons" },
    { name: "producten", href: "/producten" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className=" top-0 w-full z-50  text-xl">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-end items-center bg-muted h-[6rem] backdrop-blur-md text-white py-4 px-10 relative">
        <ul className="flex space-x-10">
          {navLinks.map((link, index) => (
            <li key={index} className="group">
              <a
                href={link.href}
                className="hover:bg-primary-light transition px-6 py-2 bg-primary rounded-xl"
              >
                {link.name}
              </a>
              {/* Onderstreep-lijn animatie */}
              <span className="absolute left-0 bottom-[-16px] h-[3px] w-full bg-gradient-to-r bg-primary-100 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden relative ">
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
          className={`fixed inset-0 bg-muted transform transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <ul
            className="flex flex-col items-center justify-center h-full space-y-8 text-white text-4xl opacity-0 transition-opacity duration-500 ease-in-out delay-200"
            style={{ opacity: open ? 1 : 0 }}
          >
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-primary-100 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
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
