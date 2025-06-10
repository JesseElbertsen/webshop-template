/**
 * ProductDetails component
 * Toont alle details van één product, inclusief afbeelding, prijs, voorraad, specificaties en reserveren.
 * Bevat een terug-knop, een afbeelding-modal en een reserveren-modal.
 */

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
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProductDetails({ product }: { product: Product }) {
  // Bereken het kortingspercentage als het product is afgeprijsd
  const discountPercentage =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : null;

  // State voor modals (reserveren en afbeelding)
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Controleer of het product uitverkocht is
  const isOutOfStock = product.amount === 0;

  return (
    <div className="md:my-16 md:p-0 p-2">
      {/* Terug naar producten */}
      <div className="max-w-7xl mx-auto mb-4">
        <Link
          href="/producten"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Terug naar producten
        </Link>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-container shadow rounded-xl md:p-6 p-2">
        {/* Productafbeelding met modal voor vergroting */}
        <div className="w-full">
          <div className="relative">
            {product.image &&
            (product.image.startsWith("http") ||
              product.image.startsWith("/")) ? (
              <>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={1500}
                  height={1500}
                  className="rounded-md object-cover w-[700px] h-[500px] cursor-zoom-in"
                  onClick={() => setImageModalOpen(true)}
                />
                {/* Modal voor grote afbeelding */}
                {imageModalOpen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    onClick={() => setImageModalOpen(false)}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={2000}
                      height={2000}
                      className="rounded-lg max-h-[90vh] max-w-[90vw] object-contain shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      className="absolute top-6 right-8 text-white text-3xl font-bold"
                      onClick={() => setImageModalOpen(false)}
                      aria-label="Sluit"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="md:w-[600px] md:h-[500px] bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                <PhotoIcon className="w-24 h-24" />
              </div>
            )}
          </div>
        </div>

        {/* Productinformatie en acties */}
        <div className="flex flex-col justify-between">
          <div className="font-bold">
            {/* Titel en korting */}
            <h1 className="text-3xl font-bold text-text flex items-center gap-2 justify-between">
              {product.title}
              {discountPercentage && (
                <span className="bg-red-500 text-white font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <TagIcon className="w-5 h-5" />-{discountPercentage}%
                </span>
              )}
            </h1>
            {/* Beschrijving */}
            <div className="mt-4 bg-container-light border border-border p-4 rounded-md shadow-md">
              <h2 className="mb-2 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
                Beschrijving:
              </h2>
              <p className="text-text">{product.description}</p>
            </div>
            {/* Specificaties */}
            {product.info && product.info.length > 0 && (
              <div className="mt-4 bg-container-light border border-border p-4 rounded-md shadow-md">
                <h2 className="mb-2 flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-primary" />
                  Product Specificaties:
                </h2>
                <ul>
                  {product.info.map((spec, idx) => (
                    <li key={idx} className="grid grid-cols-2 gap-2 py-1">
                      <span className="font-semibold break-words">
                        {spec.key}:
                      </span>
                      <span className="break-words">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Prijs, voorraad en reserveren */}
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
              {/* Voorraad */}
              <div>
                <p className=" bg-gray-400 text-white px-4 py-2 rounded-md flex items-center gap-1">
                  <CubeIcon className="w-5 h-5" />
                  aantal: x {product.amount}
                </p>
              </div>
            </div>
            {/* Uitverkocht of reserveren */}
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
            {/* Modal voor reserveren */}
            <ReservationModal
              productId={product.id}
              productPrice={product.price}
              maxAmount={product.amount}
              open={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
