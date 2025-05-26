"use client";

import { useState } from "react";
import { FunnelIcon as FunnelIconSolid } from "@heroicons/react/24/solid";

import SearchFunction from "./SearchFunction";

type FilterProps = {
  options: string[];
  onFilterChange: (filteredOption: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function Filter({
  options,
  onFilterChange,
  searchValue,
  onSearchChange,
}: FilterProps) {
  const [activeOption, setActiveOption] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
    onFilterChange(option);
    setShowDropdown(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        Filter
        <FunnelIconSolid className="w-6 h-6 text-primary" />
      </h2>
      <SearchFunction
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Zoek op naam..."
      />

      <div className="flex flex-col gap-2 mt-4">
        <button
          className={`px-4 py-2 rounded-md ${
            activeOption === ""
              ? "bg-primary-light text-white"
              : "bg-primary text-white"
          }`}
          onClick={() => handleOptionChange("")}
        >
          Alle producten
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeOption === "sale"
              ? "bg-primary-light text-white"
              : "bg-primary text-white"
          }`}
          onClick={() => handleOptionChange("sale")}
        >
          Aanbiedingen
        </button>
      </div>

      <div className="mt-6">
        <span className="font-semibold">Filter op product type</span>
        <div className="relative mt-2">
          <button
            className="px-4 py-2 rounded-md bg-primary text-white w-full text-left"
            onClick={() => setShowDropdown((v) => !v)}
            type="button"
          >
            Product Type
          </button>
          {showDropdown && (
            <ul className="absolute left-0 right-0 bg-container-light text-text-light border border-border rounded shadow z-10 mt-1">
              {options.map((option) => (
                <li key={option}>
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-primary-light hover:text-white ${
                      activeOption === option
                        ? "bg-primary-light text-white"
                        : ""
                    }`}
                    onClick={() => handleOptionChange(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
