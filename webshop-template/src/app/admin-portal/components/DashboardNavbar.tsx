"use client";
import React from "react";

interface DashboardNavBarProps {
  active: string;
  setActive: (section: string) => void;
}

export default function DashboardNavbar({
  active,
  setActive,
}: DashboardNavBarProps) {
  return (
    <nav className="h-full min-h-screen w-56 bg-gray-900 text-white flex flex-col py-8 px-4 gap-2 fixed left-0 top-0 z-20">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Dashboard</h2>
      <button
        className={`text-left px-4 py-2 rounded transition ${
          active === "products"
            ? "bg-gray-700 font-semibold"
            : "hover:bg-gray-800"
        }`}
        onClick={() => setActive("products")}
      >
        Producten beheren
      </button>
      <button
        className={`text-left px-4 py-2 rounded transition ${
          active === "add" ? "bg-gray-700 font-semibold" : "hover:bg-gray-800"
        }`}
        onClick={() => setActive("add")}
      >
        Nieuw product toevoegen
      </button>
      {/* Voeg hier extra dashboard secties toe indien gewenst */}
    </nav>
  );
}
