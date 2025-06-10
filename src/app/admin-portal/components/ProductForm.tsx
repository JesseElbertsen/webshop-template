"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

type ProductSpec = { key: string; value: string };

export default function ProductForm() {
  const [form, setForm] = useState<{
    title: string;
    description: string;
    info: ProductSpec[];
    type: string;
    price: string;
    oldPrice: string;
    amount: string;
    image: string;
  }>({
    title: "",
    description: "",
    info: [], // nu goed getypeerd!
    type: "",
    price: "",
    oldPrice: "",
    amount: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showNoImageWarning, setShowNoImageWarning] = useState(false);

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, image: data.url }));
    } else {
      alert("Uploaden mislukt");
    }
    setUploading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : value) : value,
    }));
  };

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

  // Normale submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    // Als er geen afbeelding is, toon waarschuwing
    if (!form.image) {
      setShowNoImageWarning(true);
      return;
    }
    await actuallySubmit();
  };

  // Submit zonder afbeelding na bevestiging
  const handleForceSubmit = async () => {
    setShowNoImageWarning(false);
    await actuallySubmit();
  };

  // De daadwerkelijke submit logica
  const actuallySubmit = async () => {
    setLoading(true);
    setMessage("");
    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      amount: Number(form.amount),
      image: form.image,
      info: form.info.filter(
        (spec) => spec.key.trim() !== "" && spec.value.trim() !== ""
      ), // alleen ingevulde specificaties meesturen
    };
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setMessage("Product toegevoegd!");
      setForm({
        title: "",
        description: "",
        info: [],
        type: "",
        price: "",
        oldPrice: "",
        amount: "",
        image: "",
      });
    } else {
      setMessage("Fout bij toevoegen product.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-container p-4 rounded shadow-md w-2/3 mx-auto "
    >
      <h2 className="text-lg font-bold mb-4">Nieuw product toevoegen</h2>
      <div className="mb-2">
        <label className="block">Titel</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>
      <div className="mb-2">
        <label className="block">Beschrijving</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>

      <div className="mb-2">
        <label className="block">Product specificaties</label>
        {(form.info ?? []).map((spec, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Kenmerk (bv. kleur)"
              value={spec.key}
              onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
              className="bg-container-light text-text border border-border p-2 rounded w-1/3"
            />
            <input
              type="text"
              placeholder="Waarde (bv. rood)"
              value={spec.value}
              onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
              className="bg-container-light text-text border border-border p-2 rounded w-1/2"
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
        <button
          type="button"
          className="flex items-center gap-1 text-primary hover:underline mt-2"
          onClick={handleAddSpec}
        >
          <PlusIcon className="w-5 h-5" />
          Kenmerk toevoegen
        </button>
        {/* Voorbeeld tekstvak met de toegevoegde specificaties */}
        <div className="mt-4">
          <label className="block text-sm text-text-light mb-1">
            Voorbeeldweergave:
          </label>
          <textarea
            className="  p-2 rounded w-full bg-container-light text-text border border-border"
            rows={Math.max(2, form.info.length)}
            value={
              form.info.length === 0
                ? "Geen specificaties toegevoegd."
                : form.info
                    .filter((spec) => spec.key.trim() && spec.value.trim())
                    .map((spec) => `${spec.key}: ${spec.value}`)
                    .join("\n")
            }
            readOnly
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="block">Type</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>
      <div className="mb-2">
        <label className="block">Prijs (€)</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price === "" ? "" : form.price}
          onChange={handleChange}
          required
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>
      <div className="mb-2">
        <label className="block">Oude prijs (voor aanbieding, optioneel)</label>
        <input
          name="oldPrice"
          type="number"
          min="0"
          step="0.01"
          value={form.oldPrice === "" ? "" : form.oldPrice}
          onChange={handleChange}
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>
      <div className="mb-2">
        <label className="block">Aantal</label>
        <input
          name="amount"
          type="number"
          min="0"
          value={form.amount}
          onChange={handleChange}
          required
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>
      <div className="mb-4">
        <label className="block">Afbeelding </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
          className=" p-2 rounded w-full bg-container-light text-text border border-border"
        />
      </div>
      <button
        type="submit"
        disabled={loading || uploading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
      >
        {uploading
          ? "Afbeelding uploaden..."
          : loading
          ? "Toevoegen..."
          : "Toevoegen"}
      </button>
      {showNoImageWarning && (
        <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="mb-2">
            Er is nog geen afbeelding toegevoegd, weet je zeker dat je door wilt
            gaan?
          </p>
          <button
            type="button"
            onClick={handleForceSubmit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Alsnog toevoegen
          </button>
        </div>
      )}
      {message && <div className="mt-2">{message}</div>}
      <div className="border-t mt-4 pt-4">
        <h3 className="text-lg font-bold mb-2">Voorbeeldweergave</h3>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="border px-2 py-1 w-40 h-40">
                {form.image ? (
                  <Image
                    width={1280}
                    height={1280}
                    src={form.image}
                    alt={form.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    <PhotoIcon className="w-12 h-12" />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
}
