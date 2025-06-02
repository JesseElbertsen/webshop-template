import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Ophalen bedrijfsinfo
export async function GET() {
  const info = await prisma.businessInfo.findUnique({ where: { id: 1 } });
  return NextResponse.json(info);
}

// Updaten bedrijfsinfo
export async function PUT(request: Request) {
  const data = await request.json();
  const updated = await prisma.businessInfo.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  return NextResponse.json(updated);
}
