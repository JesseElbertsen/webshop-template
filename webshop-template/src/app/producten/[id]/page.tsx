import { getProducts } from "../../lib/api";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import { Product } from "../../types/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // Zorg ervoor dat params een Promise kan zijn
}) {
  // Wacht op de resolutie van params
  const { id } = await params;

  // Haal de producten op
  const products: Product[] = await getProducts();

  // Zoek het product met de juiste ID
  const product: Product | undefined = products.find((p) => p.id === id);

  // Controleer of het product bestaat
  if (!product) {
    notFound(); // Geeft een 404-pagina als het product niet bestaat
  }

  return <ProductDetails product={product} />;
}
