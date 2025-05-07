import { getProducts } from "../../lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Product } from "../../types/types";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const products: Product[] = await getProducts();
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    notFound(); // Geeft een 404-pagina als het product niet bestaat
  }

  return <ProductDetails product={product} />;
}
