"use client";
import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  product?: { title?: string; type?: string; price?: number; amount?: number };
  productId?: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then(setReservations);
  }, []);

  // Verwijder reservering na bevestiging
  async function handleDelete(id: string) {
    setConfirmId(null);
    await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    setReservations((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="w-full bg-muted p-4">
      <h2 className="text-xl font-bold mb-4">Reserveringen</h2>
      <div className="max-h-[700px] overflow-y-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Product
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Type
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Prijs
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Nieuwe hoeveelheid
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Naam
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Email
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Telefoon
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Datum
              </th>
              <th className="border px-2 py-1 sticky top-0 bg-muted z-10">
                Actie
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r, idx) => (
              <tr
                key={r.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-200"}
              >
                <td className="border px-2 py-1">
                  {r.product?.title || r.productId}
                </td>
                <td className="border px-2 py-1">{r.product?.type}</td>
                <td className="border px-2 py-1">
                  €{r.product?.price?.toFixed(2)}
                </td>
                <td className="border px-2 py-1">{r.product?.amount}</td>
                <td className="border px-2 py-1">{r.name}</td>
                <td className="border px-2 py-1">{r.email}</td>
                <td className="border px-2 py-1">{r.phone}</td>
                <td className="border px-2 py-1">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    onClick={() => setConfirmId(r.id)}
                  >
                    Afgehandeld
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup voor bevestigen */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center">
            <p className="mb-4 text-center">
              Bevestig hiermee dat de klant het product heeft opgehaald.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => handleDelete(confirmId)}
              >
                Ja, reservering afronden
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setConfirmId(null)}
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
