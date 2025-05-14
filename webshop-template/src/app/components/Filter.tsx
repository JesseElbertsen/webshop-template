"use client";

import { useState } from "react";

type FilterProps = {
  options: string[];
  onFilterChange: (filteredOption: string) => void;
};

export default function Filter({ options, onFilterChange }: FilterProps) {
  const [activeOption, setActiveOption] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Houdt bij of het menu open is

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
    onFilterChange(option);
    setIsMenuOpen(false); // Sluit het menu na selectie
  };

  return (
    <div>
      {/* Knop om het filtermenu te openen */}
      <button
        className="bg-primary text-white px-4 py-2 rounded-md w-full md:hidden"
        onClick={() => setIsMenuOpen(true)}
      >
        Filter opties
      </button>

      {/* Filtermenu (mobiel) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filter op type</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              {["", "sale", ...options].map((option) => (
                <li key={option}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      activeOption === option
                        ? "bg-primary-light text-white"
                        : "bg-primary text-white"
                    }`}
                    onClick={() => handleOptionChange(option)}
                  >
                    {option === ""
                      ? "Alle producten"
                      : option === "sale"
                      ? "Aanbiedingen"
                      : ` ${option.toUpperCase()}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Filtermenu (desktop) */}
      <aside className="hidden md:block ">
        <h2 className="text-xl font-bold mb-4">Filter op type</h2>
        <ul className="space-y-2">
          {["", "sale", ...options].map((option) => (
            <li key={option}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeOption === option
                    ? "bg-primary-light text-white"
                    : "bg-primary text-white"
                }`}
                onClick={() => handleOptionChange(option)}
              >
                {option === ""
                  ? "Alle producten"
                  : option === "sale"
                  ? "Aanbiedingen"
                  : ` ${option.toUpperCase()}`}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
