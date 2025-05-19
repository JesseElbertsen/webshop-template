"use client";
import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  product?: { title?: string };
  productId?: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then(setReservations);
  }, []);

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
                <td className="border px-2 py-1">{r.name}</td>
                <td className="border px-2 py-1">{r.email}</td>
                <td className="border px-2 py-1">{r.phone}</td>
                <td className="border px-2 py-1">
                  {new Date(r.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
