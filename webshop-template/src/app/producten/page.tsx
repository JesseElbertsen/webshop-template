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
    <section className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
