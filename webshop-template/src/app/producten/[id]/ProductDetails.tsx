"use client";

import Image from "next/image";
import { Product } from "../../types/types";
import { useState } from "react";
import ReservationModal from "./ReservationModal";
import {
  PhotoIcon,
  TagIcon,
  CubeIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export default function ProductDetails({ product }: { product: Product }) {
  const discountPercentage =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : null;

  const [modalOpen, setModalOpen] = useState(false);

  const isOutOfStock = product.amount === 0;

  return (
    <div className="min-h-screen md:mt-8 md:p-0 p-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-container shadow rounded-xl md:p-6 p-2">
        {/* Productafbeelding */}
        <div className="w-full">
          <div className="relative">
            {product.image &&
            (product.image.startsWith("http") ||
              product.image.startsWith("/")) ? (
              <Image
                src={product.image}
                alt={product.title}
                width={1500}
                height={1500}
                className="rounded-md object-cover w-[700px] h-[500px]"
              />
            ) : (
              <div className="md:w-[600px] md:h-[500px] bg-black rounded-md flex items-center justify-center text-gray-400">
                <PhotoIcon className="w-24 h-24" />
              </div>
            )}
          </div>
        </div>

        {/* Productinformatie */}
        <div className="flex flex-col justify-between">
          <div className="font-bold">
            <h1 className="text-3xl font-bold text-text flex items-center gap-2 justify-between">
              {product.title}
              {discountPercentage && (
                <span className="bg-red-500 text-white font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <TagIcon className="w-5 h-5" />-{discountPercentage}%
                </span>
              )}
            </h1>
            <div className="mt-4 bg-container-light border border-border p-4 rounded-md shadow-md">
              <h2 className="mb-2 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
                Beschrijving:
              </h2>
              <p className="text-text">{product.description}</p>
            </div>
            <div className="mt-4 bg-container-light border border-border p-4 rounded-md shadow-md">
              <h2 className="mb-2 flex items-center gap-2">
                <InformationCircleIcon className="w-5 h-5 text-primary" />
                Product Informatie:
              </h2>
              <p className="text-text">{product.info}</p>
            </div>
          </div>

          {/* Acties */}
          <div className="mt-8">
            <div className="flex items-center justify-between p-4">
              {product.oldPrice && product.oldPrice > product.price ? (
                <div className="flex flex-col">
                  {/* Nieuwe prijs (groen) */}
                  <p className="text-green-600 font-bold text-2xl flex items-center gap-1">
                    €{product.price.toFixed(2)}
                  </p>
                  {/* Oude prijs (rood, doorstreept) */}
                  <p className="text-red-500 line-through text-lg flex items-center gap-1">
                    €{product.oldPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-green-600 font-bold text-2xl flex items-center gap-1">
                  €{product.price.toFixed(2)}
                </p>
              )}
              <div>
                <p className=" bg-gray-400 text-white px-4 py-2 rounded-md flex items-center gap-1">
                  <CubeIcon className="w-5 h-5" />
                  aantal: x {product.amount}
                </p>
              </div>
            </div>
            {isOutOfStock ? (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center font-semibold mt-4">
                Dit product is momenteel niet op voorraad
              </div>
            ) : (
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light w-full mt-4 flex items-center justify-center gap-2"
                onClick={() => setModalOpen(true)}
              >
                <BookmarkIcon className="w-5 h-5" />
                Dit product reserveren
              </button>
            )}
            <ReservationModal
              productId={product.id}
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
