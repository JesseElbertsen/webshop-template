"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../../types/types";
import Image from "next/image";
import SearchFunction from "@/app/components/SearchFunction";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div>Producten laden...</div>;

  return (
    <div className="w-full max-w-7xl mt-8">
      <h2 className="text-xl font-bold mb-4">Product Overzicht</h2>
      <SearchFunction value={search} onChange={setSearch} />
      <div className="max-h-[1000px] overflow-y-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1 w-40">Afbeelding</th>
              <th className="border px-2 py-1">Naam</th>
              <th className="border px-2 py-1">Prijs</th>
              <th className="border px-2 py-1">Type</th>
              <th className="border px-2 py-1">Aantal</th>
              <th className="border px-2 py-1">Aanbieding</th>
              <th className="border px-2 py-1">Acties</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.title?.toLowerCase().includes(search.toLowerCase())
              )
              .map((product, idx) => {
                const isSale =
                  typeof product.oldPrice === "number" &&
                  product.oldPrice > product.price;
                return (
                  <tr
                    key={product.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="border px-2 py-1 w-40 h-40">
                      {product.image ? (
                        <Image
                          width={1280}
                          height={1280}
                          src={product.image}
                          alt={product.title}
                          className="w-32 h-32 object-cover rounded"
                        />
                      ) : (
                        <Image
                          width={1280}
                          height={1280}
                          src="https://picsum.photos/600/400"
                          alt="Standaardafbeelding"
                          className="w-32 h-32 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="border px-2 py-1">{product.title}</td>
                    <td className="border px-2 py-1">€{product.price}</td>
                    <td className="border px-2 py-1">{product.type}</td>
                    <td className="border px-2 py-1">{product.amount}</td>
                    <td className="border px-2 py-1">
                      {isSale ? (
                        <span className="text-green-600 font-bold">Ja</span>
                      ) : (
                        <span className="text-gray-400">Nee</span>
                      )}
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex flex-col gap-2 items-center">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded w-32"
                          // onClick={() => handleEdit(product)} // Voeg later je edit handler toe
                        >
                          Bewerken
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded w-32"
                          // onClick={() => handleDelete(product.id)} // Voeg later je delete handler toe
                        >
                          Verwijderen
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
