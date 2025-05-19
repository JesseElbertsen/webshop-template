import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Haal alle reserveringen op
export async function GET() {
  const reservations = await prisma.reservation.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}

// Maak een nieuwe reservering aan en verlaag voorraad
export async function POST(req: Request) {
  const { productId, name, email, phone } = await req.json();

  // Maak reservering aan
  const reservation = await prisma.reservation.create({
    data: { productId, name, email, phone },
  });

  // Verlaag voorraad van het product
  await prisma.product.update({
    where: { id: productId },
    data: { amount: { decrement: 1 } },
  });

  return NextResponse.json(reservation);
}
