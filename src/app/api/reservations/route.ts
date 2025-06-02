import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Haal alle reserveringen op
export async function GET() {
  const reservations = await prisma.reservation.findMany({
    include: {
      product: {
        select: {
          title: true,
          type: true,
          price: true,
          amount: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reservations);
}

// Maak een nieuwe reservering aan en verlaag voorraad
export async function POST(req: Request) {
  const { productId, name, email, phone, amount, note } = await req.json();

  // Haal huidige voorraad op
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json(
      { error: "Product niet gevonden" },
      { status: 404 }
    );
  }
  if (amount > product.amount) {
    return NextResponse.json(
      { error: "Niet genoeg voorraad beschikbaar" },
      { status: 400 }
    );
  }

  // Maak reservering aan
  const reservation = await prisma.reservation.create({
    data: {
      productId,
      name,
      email,
      phone,
      amount,
      note,
    },
  });

  // Verlaag voorraad met het bestelde aantal
  await prisma.product.update({
    where: { id: productId },
    data: { amount: { decrement: amount } },
  });

  return NextResponse.json(reservation);
}
