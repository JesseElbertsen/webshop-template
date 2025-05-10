"use client";

import React, { useEffect, useState } from "react";
import { getProducts } from "../lib/api";
import { Product } from "../types/types";
import Image from "next/image";
import Link from "next/link"; // Import Link

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
    <div className="flex flex-col items-center justify-center mt-8 mb-8">
      <h1 className="text-3xl font-bold text-black mb-4">
        Afgeprijsde Producten
      </h1>
      <p className="text-gray-500 text-lg mb-4">
        Bekijk onze afgeprijsde producten met kortingen tot wel 50%!
      </p>
      <div className="flex flex-wrap justify-center md:gap-8 mx-auto max-w-7xl md:pt-16 md:pb-16">
        {saleProducts.map((product) => (
          <Link key={product.id} href={`/producten/${product.id}`}>
            <div className="shadow rounded-xl bg-muted cursor-pointer hover:shadow-lg transition-shadow md:w-94 mt-4 h-[400px] flex flex-col justify-between relative">
              {/* Productafbeelding */}
              <Image
                width={500}
                height={500}
                src={product.image}
                alt={product.title}
                className="rounded-t-xl h-64 w-full object-cover"
              />
              <div className="p-4">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
