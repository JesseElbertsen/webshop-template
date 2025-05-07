import { Product } from "../types/types";

let products: Product[] = [
  {
    id: "1",
    title: "Product A",
    description: "Beschrijving van product A",
    info: "Extra informatie over product A",
    amount: 10,
    image: "/images/product-a.jpg",
    price: 29.99,
    type: "a",
  },
  {
    id: "2",
    title: "Product B",
    description: "Beschrijving van product B",
    info: "Extra informatie over product B",
    amount: 5,
    image: "/images/product-b.jpg",
    price: 49.99,
    type: "b",
  },
  {
    id: "3",
    title: "Product C",
    description: "Beschrijving van product C",
    info: "Extra informatie over product C",
    amount: 2,
    image: "/images/product-c.jpg",
    price: 19.99,
    type: "c",
  },
  {
    id: "4",
    title: "Product D",
    description: "Beschrijving van product D",
    info: "Extra informatie over product D",
    amount: 8,
    image: "/images/product-d.jpg",
    price: 39.99,
    type: "a",
  },
  {
    id: "5",
    title: "Product E",
    description: "Beschrijving van product E",
    info: "Extra informatie over product E",
    amount: 3,
    image: "/images/product-e.jpg",
    price: 59.99,
    type: "b",
  },
  {
    id: "6",
    title: "Product F",
    description: "Beschrijving van product F",
    info: "Extra informatie over product F",
    amount: 7,
    image: "/images/product-f.jpg",
    price: 24.99,
    type: "c",
  },
  {
    id: "7",
    title: "Product G",
    description: "Beschrijving van product G",
    info: "Extra informatie over product G",
    amount: 4,
    image: "/images/product-g.jpg",
    price: 34.99,
    type: "a",
  },
  {
    id: "8",
    title: "Product H",
    description: "Beschrijving van product H",
    info: "Extra informatie over product H",
    amount: 6,
    image: "/images/product-h.jpg",
    price: 44.99,
    type: "b",
  },
  {
    id: "9",
    title: "Product I",
    description: "Beschrijving van product I",
    info: "Extra informatie over product I",
    amount: 1,
    image: "/images/product-b.jpg",
    price: 19.99,
    type: "c",
  },
  {
    id: "10",
    title: "Product J",
    description: "Beschrijving van product J",
    info: "Extra informatie over product J",
    amount: 9,
    image: "/images/product-c.jpg",
    price: 29.99,
    type: "a",
  },
];

// Haal alle producten op
export async function getProducts(): Promise<Product[]> {
  return products;
}

// Voeg een nieuw product toe
export async function addProduct(newProduct: Product): Promise<Product[]> {
  products.push({ ...newProduct, id: (products.length + 1).toString() });
  return products;
}

// Werk een bestaand product bij
export async function updateProduct(
  updatedProduct: Product
): Promise<Product[]> {
  products = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  return products;
}

// Verwijder een product
export async function deleteProduct(id: string): Promise<Product[]> {
  products = products.filter((product) => product.id !== id);
  return products;
}

export async function getPageContent(slug: string) {
  const dummyPages: Record<string, { title: string; body: string }> = {
    "over-ons": {
      title: "Over ons",
      body: "Wij zijn een moderne webshop die klantgericht werkt en unieke producten aanbiedt.",
    },
    contact: {
      title: "Contact",
      body: "Je kunt ons bereiken via e-mail of telefoon.",
    },
  };

  return dummyPages[slug] || { title: "Pagina niet gevonden", body: "" };
}

export async function getCarouselImages(carouselId: string) {
  const carousels: Record<string, { id: string; images: string[] }> = {
    homepage: {
      id: "homepage",
      images: [
        "/images/banner1.jpg",
        "/images/banner2.jpg",
        "/images/banner3.jpg",
        "/images/banner4.jpg",
      ],
    },
    products: {
      id: "products",
      images: [
        "/images/products1.jpg",
        "/images/products2.jpg",
        "/images/products3.jpg",
      ],
    },
  };

  return carousels[carouselId]?.images || [];
}
