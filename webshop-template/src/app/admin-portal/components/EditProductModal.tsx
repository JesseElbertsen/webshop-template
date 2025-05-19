"use client";
import React, { useState } from "react";
import { Product } from "../../types/types";

export default function EditProductModal({
  product,
  onSave,
  onClose,
}: {
  product: Product;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(product);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "amount" || name === "price" || name === "oldPrice"
          ? Number(value)
          : value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg p-8 z-10 w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Sluit"
        >
          &times;
        </button>
        <h3 className="font-bold mb-4 text-lg">Product bewerken</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-1 font-semibold">Titel</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Titel"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Beschrijving</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Beschrijving"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Voorraad</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Voorraad"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Prijs (nieuw)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Nieuwe prijs"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Oude prijs (voor korting, optioneel)
            </label>
            <input
              name="oldPrice"
              type="number"
              step="0.01"
              value={form.oldPrice ?? ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Oude prijs"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
          >
            Opslaan
          </button>
        </form>
      </div>
    </div>
  );
}
