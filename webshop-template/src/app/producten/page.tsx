"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../lib/api";
import Filter from "../components/Filter";
import { Product } from "../types/types";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
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

  const productTypes = Array.from(
    new Set(products.map((product) => product.type))
  );

  return (
    <main className="flex min-h-screen">
      <div className="container w-1/6 md:pr-4 md:pt-8">
        <Filter options={productTypes} onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto md:px-4 md:py-8">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>
    </main>
  );
}
