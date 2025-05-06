"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getDummyProducts } from "../lib/api";

export default function Page() {
  const [products, setProducts] = useState<
    {
      id: string;
      title: string;
      description: string;
      image: string;
      price: number;
    }[]
  >([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getDummyProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto md:px-4 md:py-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} {...product} index={index} />
      ))}
    </div>
  );
}
