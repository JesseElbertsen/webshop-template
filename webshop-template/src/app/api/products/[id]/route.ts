import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Haal één product op
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(product);
}

// Werk een product bij
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(product);
}

// Verwijder een product
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(product);
}
