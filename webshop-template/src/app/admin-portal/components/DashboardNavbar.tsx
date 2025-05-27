"use client";
import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface DashboardNavBarProps {
  active: string;
  setActive: (section: string) => void;
}

export default function DashboardNavbar({
  active,
  setActive,
}: DashboardNavBarProps) {
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  function toggleDarkMode() {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark");
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }

  return (
    <nav className="h-full min-h-screen w-56 bg-container-dark shadow-md text-white flex flex-col py-8 px-4 gap-2 fixed left-0 top-0 z-20">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Dashboard</h2>
      <button
        className={`text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "products" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("products")}
      >
        Producten beheren
      </button>
      <button
        className={`text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "add" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("add")}
      >
        product toevoegen
      </button>
      <button
        className={`text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "reservations" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("reservations")}
      >
        Reserveringen
      </button>
      <button
        className={`text-left px-4 py-2 rounded transition font-semibold text-white
          bg-primary hover:bg-primary-light
          ${active === "businessinfo" ? "bg-primary-light" : ""}
        `}
        onClick={() => setActive("businessinfo")}
      >
        Bedrijfsgegevens
      </button>
      {/* Voeg hier extra dashboard secties toe indien gewenst */}

      <div className="flex-1" />
      {/* Onderste knoppen */}
      <div className="flex flex-row justify-center gap-2 mt-8">
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-primary hover:bg-primary-light transition text-white"
          title={isDark ? "Schakel licht modus in" : "Schakel donker modus in"}
          aria-label="Toggle dark mode"
          type="button"
        >
          {isDark ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded bg-primary hover:bg-primary-light transition text-white"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="sr-only">Terug naar site</span>
        </Link>
      </div>
    </nav>
  );
}
