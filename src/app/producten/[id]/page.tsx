/**
 * Product detailpagina
 * Haalt het product met het opgegeven id uit de database via Prisma.
 * Als het product niet bestaat, wordt een 404 getoond.
 * Zet het product om naar het juiste type en toont de ProductDetails component.
 */

import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { prisma } from "@/app/lib/prisma";
import { Product } from "../../types/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Haal het id uit de route-params
  const { id } = await params;

  // Zoek het product op in de database
  const dbProduct = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  // Toon 404 als het product niet bestaat
  if (!dbProduct) notFound();

  // Zet het product om naar het juiste type voor de frontend
  const product: Product = {
    ...dbProduct,
    oldPrice: dbProduct.oldPrice === null ? undefined : dbProduct.oldPrice,
    info:
      dbProduct.info && Array.isArray(dbProduct.info)
        ? (dbProduct.info as { key: string; value: string }[])
        : undefined,
  };

  // Toon de productdetails
  return <ProductDetails product={product} />;
}
