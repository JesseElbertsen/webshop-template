import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Haal alle producten op
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// Voeg een nieuw product toe
export async function POST(req: Request) {
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}
