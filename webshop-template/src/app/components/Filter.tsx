"use client";

import { useState } from "react";

type FilterProps = {
  options: string[];
  onFilterChange: (filteredOption: string) => void;
};

export default function Filter({ options, onFilterChange }: FilterProps) {
  const [activeOption, setActiveOption] = useState<string>("");

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
    onFilterChange(option);
  };

  return (
    <aside className=" bg-muted rounded-2xl shadow-2xl min-h-full p-4">
      <h2 className="text-xl font-bold mb-4">Filter op type</h2>
      <ul className="space-y-2">
        {["", ...options].map((option) => (
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
                : `Type ${option.toUpperCase()}`}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
