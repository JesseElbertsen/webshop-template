import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { prisma } from "@/app/lib/prisma";
import { Product } from "../../types/types";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const dbProduct = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  if (!dbProduct) notFound();

  // Zet oldPrice: null om naar undefined
  const product: Product = {
    ...dbProduct,
    oldPrice: dbProduct.oldPrice === null ? undefined : dbProduct.oldPrice,
  };

  return <ProductDetails product={product} />;
}
