"use client";

import React, { useState } from "react";

export default function ProductForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    info: "",
    type: "",
    price: "",
    oldPrice: "",
    amount: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Placeholder voor upload functie
  const handleImageUpload = (file: File) => {
    // Hier kun je later upload naar S3/Cloudinary/etc. doen
    setForm((prev) => ({ ...prev, image: file }));
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
    // Gebruik standaardafbeelding als er geen image is
    const payload = {
      title: form.title,
      description: form.description,
      info: form.info,
      type: form.type,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      amount: Number(form.amount),
      image: form.image ? "UPLOAD_LATER" : "https://picsum.photos/600/400", // <-- standaardafbeelding
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
        image: null,
      });
    } else {
      setMessage("Fout bij toevoegen product.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow w-full   "
    >
      <h2 className="text-lg font-bold mb-4">Nieuw product toevoegen</h2>
      <div className="mb-2">
        <label className="block">Titel</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Beschrijving</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Extra informatie</label>
        <textarea
          name="info"
          value={form.info}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Type</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Toevoegen..." : "Toevoegen"}
      </button>
      {message && <div className="mt-2">{message}</div>}
    </form>
  );
}
