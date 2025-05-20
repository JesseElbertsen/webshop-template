"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ProductForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    info: "",
    type: "",
    price: "",
    oldPrice: "",
    amount: "",
    image: "", // <-- altijd een string!
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = async (file: File) => {
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
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    // Zet getallen om naar numbers!
    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      amount: Number(form.amount),
      image: form.image, // <-- GEEN fallback meer!
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
        info: "",
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
      className="bg-muted p-4 rounded shadow w-full   "
    >
      <h2 className="text-lg font-bold mb-4">Nieuw product toevoegen</h2>
      <div className="mb-2">
        <label className="block">Titel</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Beschrijving</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Extra informatie</label>
        <textarea
          name="info"
          value={form.info}
          onChange={handleChange}
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Type</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Prijs (€)</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <div className="mb-2">
        <label className="block">Oude prijs (voor aanbieding, optioneel)</label>
        <input
          name="oldPrice"
          type="number"
          min="0"
          step="0.01"
          value={form.oldPrice}
          onChange={handleChange}
          className="border p-2 rounded w-full bg-white"
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
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block">Afbeelding (nog niet werkend)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
          className="border p-2 rounded w-full bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !form.image}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Toevoegen..." : "Toevoegen"}
      </button>
      {message && <div className="mt-2">{message}</div>}
      <div className="border-t mt-4 pt-4">
        <h3 className="text-lg font-bold mb-2">Voorbeeldweergave</h3>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="border px-2 py-1 w-40 h-40">
                {form.image &&
                (form.image.startsWith("http") ||
                  form.image.startsWith("/")) ? (
                  <Image
                    width={1280}
                    height={1280}
                    src={form.image}
                    alt={form.title}
                    className="w-32 h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    Geen afbeelding
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {form.image && (
        <Image
          width={1280}
          height={1280}
          src={form.image}
          alt="Preview"
          className="mt-2 rounded w-32 h-32 object-cover"
        />
      )}
    </form>
  );
}
