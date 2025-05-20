"use client";

import React from "react";

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
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mb-4 p-2 border rounded w-full max-w-xs bg-white text-black"
    />
  );
}
