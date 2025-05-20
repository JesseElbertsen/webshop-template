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
  // Haal het product op (voor public_id)
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  // Verwijder het product uit de database
  await prisma.product.delete({ where: { id: Number(id) } });

  // Verwijder de afbeelding uit Cloudinary als public_id bestaat
  if (product?.public_id) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?public_ids[]=${product.public_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const json = await res.json();
    console.log("Cloudinary delete response:", json);
  }

  return NextResponse.json({ success: true });
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
