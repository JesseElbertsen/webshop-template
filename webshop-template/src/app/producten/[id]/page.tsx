import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { prisma } from "@/app/lib/prisma";
import { Product } from "../../types/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dbProduct = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!dbProduct) notFound();

  const product: Product = {
    ...dbProduct,
    oldPrice: dbProduct.oldPrice === null ? undefined : dbProduct.oldPrice,
  };

  return <ProductDetails product={product} />;
}
