import { getDummyProducts } from "../../lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";

type Product = {
  id: string;
  title: string;
  description: string;
  info: string;
  amount: number;
  image: string;
  price: number;
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Zorg ervoor dat params.id correct wordt verwerkt
  const { id } = params;

  const products: Product[] = await getDummyProducts();
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    notFound(); // Geeft een 404-pagina als het product niet bestaat
  }

  return <ProductDetails product={product} />;
}
