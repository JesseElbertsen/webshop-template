import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Haal één product op
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(product);
}

// Werk een product bij
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const data = await request.json();
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });
  return NextResponse.json(product);
}

// Verwijder een product
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const product = await prisma.product.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(product);
}
