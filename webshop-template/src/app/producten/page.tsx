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
    if (type === "sale") {
      setFilteredProducts(products.filter((product) => product.sale));
    } else {
      setFilteredProducts(
        type === ""
          ? products
          : products.filter((product) => product.type === type)
      );
    }
  };

  const productTypes = Array.from(
    new Set(products.map((product) => product.type))
  );

  return (
    <main className="flex flex-col md:flex-row gap-4  min-h-screen  md:px-4 md:py-8">
      {/* Filter */}
      <div className="bg-muted rounded-2xl shadow-2xl p-4 flex-shrink-0 w-full md:w-64">
        <Filter options={productTypes} onFilterChange={handleFilterChange} />
      </div>

      {/* Product Cards */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>
    </main>
  );
}
