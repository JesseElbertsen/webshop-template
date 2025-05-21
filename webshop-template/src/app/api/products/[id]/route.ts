import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Haal één product op
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(product);
}

// Verwijder een product (en afbeelding uit Cloudinary)
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    // Verwijder alle reserveringen voor dit product (of check of ze bestaan)
    const reservations = await prisma.reservation.findMany({
      where: { productId: Number(id) },
    });
    if (reservations.length > 0) {
      return NextResponse.json(
        { error: "PRODUCT_HAS_RESERVATIONS" },
        { status: 400 }
      );
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DELETE_FAILED" }, { status: 500 });
  }
}

// Update een product
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await request.json();
  const updated = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(updated);
}
