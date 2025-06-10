"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../types/types";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

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

  // Blokkeer body scroll als de modal open is
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Voeg een nieuwe lege specificatie toe
  function handleAddSpec() {
    setForm((f) => ({
      ...f,
      info: [...(f.info ?? []), { key: "", value: "" }],
    }));
  }

  // Verwijder een specificatie
  function handleRemoveSpec(idx: number) {
    setForm((f) => ({
      ...f,
      info: (f.info ?? []).filter((_, i) => i !== idx),
    }));
  }

  // Bewerk een key of value van een specificatie
  function handleSpecChange(
    idx: number,
    field: "key" | "value",
    value: string
  ) {
    setForm((f) => ({
      ...f,
      info: (f.info ?? []).map((spec, i) =>
        i === idx ? { ...spec, [field]: value } : spec
      ),
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "amount" || name === "price" || name === "oldPrice"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-container rounded-lg shadow-lg p-8 z-10 w-full max-w-xl max-h-screen overflow-y-auto">
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
              className="border border-border  p-2 rounded w-full"
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
              className="border border-border p-2 rounded w-full"
              placeholder="Beschrijving"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Specificaties</label>
            <div
              className="max-h-56 overflow-y-auto"
              style={{ maxHeight: "14rem" }}
            >
              {(form.info ?? []).map((spec, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Kenmerk (bv. kleur)"
                    value={spec.key}
                    onChange={(e) =>
                      handleSpecChange(idx, "key", e.target.value)
                    }
                    className="border border-border p-2 rounded w-1/3"
                  />
                  <input
                    type="text"
                    placeholder="Waarde (bv. rood)"
                    value={spec.value}
                    onChange={(e) =>
                      handleSpecChange(idx, "value", e.target.value)
                    }
                    className="border border-border p-2 rounded w-1/2"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveSpec(idx)}
                    title="Verwijder"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-primary hover:underline mt-2"
              onClick={handleAddSpec}
            >
              <PlusIcon className="w-5 h-5" />
              Kenmerk toevoegen
            </button>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Voorraad</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="border border-border p-2 rounded w-full"
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
              value={
                form.price === undefined || form.price === null
                  ? ""
                  : form.price
              }
              onChange={handleChange}
              className="border border-border p-2 rounded w-full"
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
              value={
                form.oldPrice === undefined || form.oldPrice === null
                  ? ""
                  : form.oldPrice
              }
              onChange={handleChange}
              className="border border-border p-2 rounded w-full"
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
