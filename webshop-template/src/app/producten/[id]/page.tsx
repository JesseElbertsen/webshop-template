import { getDummyProducts } from "../../lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const products: Product[] = await getDummyProducts();
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (!product) {
    notFound(); // Geeft een 404-pagina als het product niet bestaat
  }

  return <ProductDetails product={product} />;
}
