"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../../types/types";
import Image from "next/image";
import SearchFunction from "@/app/components/SearchFunction";
import EditProductModal from "./EditProductModal";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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

  // Verwijder product
  async function handleDelete(id: number) {
    if (!confirm("Weet je zeker dat je dit product wilt verwijderen?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // Bewerk product
  async function handleEditSave(updated: Product) {
    await fetch(`/api/products/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditProduct(null);
  }

  if (loading) return <div>Producten laden...</div>;

  return (
    <div className="w-full bg-muted p-4 ">
      <h2 className="text-xl font-bold mb-4">Product Overzicht</h2>
      <SearchFunction value={search} onChange={setSearch} />
      <div className="max-h-[700px] overflow-y-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1 w-40 sticky top-0 bg-muted z-10">
                Afbeelding
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Naam
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Prijs
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Type
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Aantal op voorraad
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Aanbieding
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Acties
              </th>
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
                      <Image
                        width={1280}
                        height={1280}
                        src={
                          product.image &&
                          (product.image.startsWith("http") ||
                            product.image.startsWith("/"))
                            ? product.image
                            : "https://picsum.photos/600/400"
                        }
                        alt={product.title}
                        className="w-32 h-32 object-cover rounded"
                      />
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
                          className="bg-primary hover:bg-primary-light text-white font-semibold py-1 px-3 rounded w-32"
                          onClick={() => setEditProduct(product)}
                        >
                          Bewerken
                        </button>
                        <button
                          className="bg-red-400 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded w-32"
                          onClick={() => handleDelete(product.id)}
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
      {/* Modal voor bewerken */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onSave={handleEditSave}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
}
