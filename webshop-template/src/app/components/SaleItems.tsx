"use client";

import React, { useEffect, useState, useRef } from "react";
import { getProducts } from "../lib/api";
import { Product } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Heroicons import

export default function SaleItems() {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null); // Ref voor de slider

  useEffect(() => {
    async function fetchSaleProducts() {
      const products = await getProducts();
      const filtered = products.filter((product) => product.sale);
      setSaleProducts(filtered);
    }
    fetchSaleProducts();
  }, []);

  // Functie om naar links te scrollen
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300, // Scroll 300px naar links
        behavior: "smooth",
      });
    }
  };

  // Functie om naar rechts te scrollen
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300, // Scroll 300px naar rechts
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 py-8 relative">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-black mb-2">
          Afgeprijsde Producten
        </h1>
        <p className="text-gray-500 text-lg mb-6">
          Bekijk onze afgeprijsde producten met kortingen tot wel 50%!
        </p>
      </div>

      {/* Slider container */}
      <div className="relative overflow-hidden">
        {/* Linkerknop */}
        <button
          onClick={scrollLeft}
          className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 z-10"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory slider-scrollbar px-1 max-w-7xl mx-auto"
        >
          {saleProducts.map((product) => {
            // Bereken het kortingspercentage
            const discountPercentage = product.sale
              ? Math.round(
                  ((product.sale.oldPrice - product.sale.newPrice) /
                    product.sale.oldPrice) *
                    100
                )
              : null;

            return (
              <Link
                key={product.id}
                href={`/producten/${product.id}`}
                className="snap-start flex-shrink-0"
                style={{ width: "calc(100% - 2rem)", maxWidth: "300px" }}
              >
                <div className="shadow rounded-xl bg-muted cursor-pointer hover:shadow-lg transition-shadow h-[400px] flex flex-col justify-between relative w-full">
                  {/* Productafbeelding */}
                  <div className="relative">
                    <Image
                      width={500}
                      height={500}
                      src={product.image}
                      alt={product.title}
                      className="rounded-t-xl h-64 w-full object-cover"
                    />
                    {/* Kortingpercentage */}
                    {discountPercentage && (
                      <div className="absolute bottom-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded-md">
                        -{discountPercentage}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mt-2 text-black text-center">
                      {product.title}
                    </h2>

                    {product.sale && (
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex flex-col items-start">
                          <span className="text-green-600 font-bold text-lg">
                            €{product.sale.newPrice.toFixed(2)}
                          </span>
                          <span className="text-red-500 line-through text-sm">
                            €{product.sale.oldPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          Afgeprijsd!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Rechterknop */}
        <button
          onClick={scrollRight}
          className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 z-10"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
