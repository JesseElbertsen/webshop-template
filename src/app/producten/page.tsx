/**
 * Productenpagina
 * Haalt alle producten op via de API, filtert op type en zoekterm,
 * en toont de resultaten als ProductCards. Bevat een filtercomponent.
 */

"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Filter from "../components/Filter";
import { Product } from "../types/types";

export default function Page() {
  // State voor alle producten, gefilterde producten, zoekterm en typefilter
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  // Haal producten op bij het laden van de pagina
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Filter producten op type en zoekterm wanneer de filters veranderen
  useEffect(() => {
    let filtered = products;

    // Filter op type (bijvoorbeeld 'sale' voor aanbiedingen)
    if (typeFilter === "sale") {
      filtered = filtered.filter(
        (product) =>
          typeof product.oldPrice === "number" &&
          product.oldPrice > product.price
      );
    } else if (typeFilter !== "") {
      filtered = filtered.filter((product) => product.type === typeFilter);
    }

    // Filter op zoekterm in de titel
    if (search.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, search, typeFilter]);

  // Unieke producttypes voor de filteropties
  const productTypes = Array.from(
    new Set(products.map((product) => product.type))
  );

  return (
    <main className="flex flex-col md:flex-row gap-4 min-h-screen md:px-4 md:py-8">
      {/* Filtercomponent links */}
      <div className="bg-container rounded-2xl shadow-2xl p-4 flex-shrink-0 w-full md:w-64">
        <Filter
          options={productTypes}
          onFilterChange={setTypeFilter}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>

      {/* Productkaarten */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  md:mx-auto max-w-7xl">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>
    </main>
  );
}
