"use client";
import React, { useState } from "react";

export default function ReservationModal({
  productId,
  open,
  onClose,
}: {
  productId: number;
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  if (!open) return null;

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
        <h3 className="font-bold mb-2 text-lg">Dit product reserveren</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setMessage("");
            const res = await fetch("/api/reservations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                productId,
                ...form,
              }),
            });
            if (res.ok) {
              setMessage("Reservering geplaatst!");
              setForm({ name: "", email: "", phone: "" });
            } else {
              setMessage("Er ging iets mis.");
            }
          }}
          className="flex flex-col gap-2"
        >
          <input
            required
            type="text"
            placeholder="Naam"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            required
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="border p-2 rounded"
          />
          <input
            required
            type="tel"
            placeholder="Telefoonnummer"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
          >
            Dit product reserveren
          </button>
          {message && <div className="mt-2">{message}</div>}
        </form>
      </div>
    </div>
  );
}
