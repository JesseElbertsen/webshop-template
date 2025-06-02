"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchFunctionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchFunction({
  value,
  onChange,
  placeholder = "Zoek op naam...",
}: SearchFunctionProps) {
  return (
    <div className="relative w-full max-w-xs mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 pl-10  rounded w-full bg-container-light border border-border text-text"
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}
