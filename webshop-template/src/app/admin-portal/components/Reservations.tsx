"use client";
import { useEffect, useState } from "react";
import type { Reservation } from "@/app/types/types";

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
    <div className="w-full bg-container p-4">
      <h2 className="text-xl font-bold mb-4">Reserveringen</h2>
      <div className="max-h-[700px] overflow-y-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr>
              <th className=" px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Product
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Type
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Prijs
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Naam
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Email
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Telefoon
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Datum
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Aantal besteld
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Voorraad na reservering
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Totale prijs
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Opmerkingen
              </th>
              <th className="px-2 py-1 sticky top-0 bg-muted z-10 border border-border text-text container-light">
                Acties
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r, idx) => (
              <tr
                key={r.id}
                className={
                  idx % 2 === 0 ? "bg-container" : "bg-container-light"
                }
              >
                <td className="border border-border px-2 py-1">
                  {r.product?.title || r.productId}
                </td>
                <td className="border border-border px-2 py-1">
                  {r.product?.type}
                </td>
                <td className="border border-border px-2 py-1">
                  €{r.product?.price?.toFixed(2)}
                </td>
                <td className="border border-border px-2 py-1">{r.name}</td>
                <td className="border border-border px-2 py-1">{r.email}</td>
                <td className="border border-border px-2 py-1">{r.phone}</td>
                <td className="border border-border px-2 py-1">
                  {new Date(r.createdAt).toLocaleString()}
                </td>

                <td className="border border-border px-2 py-1">{r.amount}</td>
                <td className="border border-border px-2 py-1">
                  {r.product?.amount}
                </td>

                <td className="border border-border px-2 py-1">
                  {r.product?.price && r.amount
                    ? `€${(r.product.price * r.amount).toFixed(2)}`
                    : "-"}
                </td>
                <td className="border border-border px-2 py-1">
                  {r.note || "-"}
                </td>
                <td className="border border-border px-2 py-1">
                  <button
                    className="bg-primary hover:bg-primary-light text-white px-3 py-1 rounded"
                    onClick={() => setConfirmId(r.id)}
                  >
                    Afhandelen
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
          <div className="bg-container rounded-lg shadow-lg p-6 min-w-[300px] flex flex-col items-center">
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
