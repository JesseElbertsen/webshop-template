"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getDummyProducts } from "../lib/api";
import Filter from "../components/Filter";

// Definieer een Product interface
interface Product {
  id: string;
  title: string;
  description: string;
  amount: number;
  image: string;
  price: number;
  type: string;
}

export default function Page() {
  // Voeg expliciete types toe aan useState
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data: Product[] = await getDummyProducts();
      setProducts(data);
      setFilteredProducts(data); // Toon standaard alle producten
    }
    fetchProducts();
  }, []);

  const handleFilterChange = (type: string) => {
    setFilteredProducts(
      type === ""
        ? products
        : products.filter((product) => product.type === type)
    );
  };

  // Haal unieke types op voor de filteropties
  const productTypes = Array.from(
    new Set(products.map((product) => product.type))
  );

  return (
    <div className="flex min-h-screen">
      {/* Filter container */}
      <Filter options={productTypes} onFilterChange={handleFilterChange} />

      {/* Producten grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto md:px-4 md:py-8">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </main>
    </div>
  );
}
