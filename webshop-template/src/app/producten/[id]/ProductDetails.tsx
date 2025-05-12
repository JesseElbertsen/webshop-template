"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "../../types/types";

export default function ProductDetails({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservering opgeslagen:", formData);
    alert("Reservering succesvol opgeslagen!");
    setIsModalOpen(false);
  };

  // Bereken het kortingspercentage
  const discountPercentage = product.sale
    ? Math.round(
        ((product.sale.oldPrice - product.sale.newPrice) /
          product.sale.oldPrice) *
          100
      )
    : null;

  return (
    <div className="min-h-screen md:mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted shadow rounded-xl md:p-6 p-2">
        {/* Productafbeelding */}
        <div className="flex justify-center">
          <Image
            src={product.image}
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
              {product.sale ? (
                <div className="flex flex-col">
                  {/* Nieuwe prijs (groen) */}
                  <p className="text-green-600 font-bold text-2xl">
                    €{product.sale.newPrice.toFixed(2)}
                  </p>
                  {/* Oude prijs (rood, doorstreept) */}
                  <p className="text-red-500 line-through text-lg">
                    €{product.sale.oldPrice.toFixed(2)}
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
            <button
              className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-md text-lg font-semibold transition"
              onClick={() => setIsModalOpen(true)}
            >
              Reserveer dit product
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reserveer dit product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Voornaam
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Achternaam
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  E-mailadres
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Bevestigen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
