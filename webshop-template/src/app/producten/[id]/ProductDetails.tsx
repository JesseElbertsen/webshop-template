"use client";

import Image from "next/image";
import { Product } from "../../types/types";

export default function ProductDetails({ product }: { product: Product }) {
  const discountPercentage =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : null;

  return (
    <div className="min-h-screen md:mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted shadow rounded-xl md:p-6 p-2">
        {/* Productafbeelding */}
        <div className="flex justify-center">
          <Image
            src={product.image || "https://picsum.photos/600/400"}
            alt={product.title}
            width={1000}
            height={1000}
            className="rounded-md object-cover w-[500px] h-[500px]"
          />
        </div>

        {/* Productinformatie */}
        <div className="flex flex-col justify-between">
          <div className="font-bold text-gray-500">
            <h1 className="text-3xl font-bold text-black flex items-center gap-2 justify-between">
              {product.title}
              {discountPercentage && (
                <span className="bg-red-500 text-white font-bold px-2 py-1 rounded-md">
                  -{discountPercentage}%
                </span>
              )}
            </h1>
            <div className="mt-4 bg-white p-4 rounded-md shadow-md">
              <h2 className="mb-2">Beschrijving:</h2>
              <p>{product.description}</p>
            </div>
            <div className="mt-4 bg-white p-4 rounded-md shadow-md">
              <h2 className="mb-2">Product Informatie:</h2>
              <p>{product.info}</p>
            </div>
          </div>

          {/* Acties */}
          <div className="mt-8">
            <div className="flex items-center justify-between p-4">
              {product.oldPrice && product.oldPrice > product.price ? (
                <div className="flex flex-col">
                  {/* Nieuwe prijs (groen) */}
                  <p className="text-green-600 font-bold text-2xl">
                    €{product.price.toFixed(2)}
                  </p>
                  {/* Oude prijs (rood, doorstreept) */}
                  <p className="text-red-500 line-through text-lg">
                    €{product.oldPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-green-600 font-bold text-2xl">
                  €{product.price.toFixed(2)}
                </p>
              )}
              <div>
                <p className="inline-block bg-gray-400 text-white px-4 py-2 rounded-md">
                  aantal: x {product.amount}
                </p>
              </div>
            </div>
            {/* ...rest van je reserveringslogica... */}
          </div>
        </div>
      </div>
    </div>
  );
}
