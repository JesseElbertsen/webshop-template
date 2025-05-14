import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Product } from "../../types/types";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  const product: Product = await res.json();
  if (!product) notFound();

  return <ProductDetails product={product} />;
}
