"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../../types/types";
import Image from "next/image";
import SearchFunction from "@/app/components/SearchFunction";
import EditProductModal from "./EditProductModal";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [popup, setPopup] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
    setConfirmDeleteId(null); // Sluit confirm popup
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      const data = await res.json().catch(() => ({}));
      if (data?.error === "PRODUCT_HAS_RESERVATIONS") {
        setPopup(
          "Dit product is nog gereserveerd en kan niet worden verwijderd."
        );
      } else {
        setPopup("Verwijderen mislukt. Probeer het later opnieuw.");
      }
    }
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
    <div className=" bg-container shadow-md p-4 w-3/4 mx-auto">
      <h2 className="text-xl font-bold mb-4">Product Overzicht</h2>
      <SearchFunction value={search} onChange={setSearch} />
      <div className="max-h-[700px] overflow-y-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-container-light sticky top-0 z-10 border border-border">
              <th className="border border-border px-2 py-1 w-40 sticky top-0 bg-muted z-10">
                Afbeelding
              </th>
              <th className="border border-border px-2 py-1 sticky top-0 bg-muted z-10">
                Naam
              </th>
              <th className="border border-border px-2 py-1 sticky top-0 bg-muted z-10">
                Prijs
              </th>
              <th className="border border-border px-2 py-1 sticky top-0 bg-muted z-10">
                Type
              </th>
              <th className="border border-border px-2 py-1 sticky top-0 bg-muted z-10">
                Aantal op voorraad
              </th>
              <th className="border border-border px-2 py-1 sticky top-0 bg-muted z-10">
                Aanbieding
              </th>
              <th className="border border-border px-2 py-1 sticky top-0 bg-muted z-10">
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
                    className={
                      idx % 2 === 0 ? "bg-container" : "bg-container-light"
                    }
                  >
                    <td className="border border-border px-2 py-1 w-40 h-40">
                      {product.image &&
                      (product.image.startsWith("http") ||
                        product.image.startsWith("/")) ? (
                        <Image
                          width={1280}
                          height={1280}
                          src={product.image}
                          alt={product.title}
                          className="w-32 h-32 object-cover rounded"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                          <PhotoIcon className="w-12 h-12" />
                        </div>
                      )}
                    </td>
                    <td className="border border-border px-2 py-1">
                      {product.title}
                    </td>
                    <td className="border border-border px-2 py-1">
                      €{product.price}
                    </td>
                    <td className="border border-border px-2 py-1">
                      {product.type}
                    </td>
                    <td className="border border-border px-2 py-1">
                      {product.amount}
                    </td>
                    <td className="border border-border px-2 py-1">
                      {isSale ? (
                        <span className="text-green-600 font-bold">Ja</span>
                      ) : (
                        <span className="text-gray-400">Nee</span>
                      )}
                    </td>
                    <td className="border border-border px-2 py-1">
                      <div className="flex flex-col gap-2 items-center">
                        <button
                          className="bg-primary hover:bg-primary-light text-white font-semibold py-1 px-3 rounded w-32"
                          onClick={() => setEditProduct(product)}
                        >
                          Bewerken
                        </button>
                        <button
                          className="bg-red-400 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded w-32"
                          onClick={() => setConfirmDeleteId(product.id)}
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

      {/* Popup melding */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40  ">
          <div className="bg-container rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center ">
            <p className="mb-4 text-center">{popup}</p>
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
              onClick={() => setPopup(null)}
            >
              Sluiten
            </button>
          </div>
        </div>
      )}

      {/* Popup voor verwijderen bevestigen */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
          <div className="bg-container rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center">
            <p className="mb-4 text-center">
              Weet je zeker dat je dit product wilt verwijderen?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(confirmDeleteId)}
              >
                Ja, verwijderen
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setConfirmDeleteId(null)}
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
