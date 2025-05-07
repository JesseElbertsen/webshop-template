"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import { Product } from "../types/types";
import Image from "next/image";

export default function SaleItems() {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchSaleProducts() {
      const products = await getProducts();
      const filtered = products.filter((product) => product.sale);
      setSaleProducts(filtered);
    }
    fetchSaleProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8 mx-auto max-w-7xl pt-16 pb-16">
      {saleProducts.map((product) => (
        <div
          key={product.id}
          className="shadow rounded-xl p-4 bg-muted cursor-pointer hover:shadow-lg transition-shadow w-72 h-[400px] flex flex-col justify-between relative"
        >
          {/* Productafbeelding */}
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.title}
            className="rounded-md h-64 w-full object-cover"
          />

          {/* Productnaam */}
          <h2 className="text-lg font-semibold mt-2 text-black text-center">
            {product.title}
          </h2>

          {/* Prijzen */}
          {product.sale && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col items-start">
                {/* Nieuwe prijs (groen) */}
                <span className="text-green-600 font-bold text-lg">
                  €{product.sale.newPrice.toFixed(2)}
                </span>
                {/* Oude prijs (rood, doorstreept) */}
                <span className="text-red-500 line-through text-sm">
                  €{product.sale.oldPrice.toFixed(2)}
                </span>
              </div>

              {/* Badge voor afgeprijsd product */}
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                Afgeprijsd!
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
