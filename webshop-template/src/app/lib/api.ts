import { Product } from "../types/types";

const products: Product[] = [
  {
    id: "1",
    title: "Product A",
    description: "Beschrijving van product A",
    info: "Extra informatie over product A",
    amount: 10,
    image: "/images/product-a.jpg",
    price: 29.99,
    oldPrice: 39.99, // SALE
    type: "optie 1",
  },
  {
    id: "2",
    title: "Product B",
    description: "Beschrijving van product B",
    info: "Extra informatie over product B",
    amount: 5,
    image: "/images/product-b.jpg",
    price: 49.99,
    type: "optie 2",
  },
  {
    id: "3",
    title: "Product C",
    description: "Beschrijving van product C",
    info: "Extra informatie over product C",
    amount: 20,
    image: "/images/product-c.jpg",
    price: 19.99,
    type: "optie 3",
  },
  {
    id: "4",
    title: "Product D",
    description: "Beschrijving van product D",
    info: "Extra informatie over product D",
    amount: 15,
    image: "/images/product-d.jpg",
    price: 99.99,
    oldPrice: 129.99, // SALE
    type: "optie 1",
  },
  {
    id: "5",
    title: "Product E",
    description: "Beschrijving van product E",
    info: "Extra informatie over product E",
    amount: 8,
    image: "/images/product-e.jpg",
    price: 59.99,
    type: "optie 2",
  },
  {
    id: "6",
    title: "Product F",
    description: "Beschrijving van product F",
    info: "Extra informatie over product F",
    amount: 12,
    image: "/images/product-f.jpg",
    price: 39.99,
    type: "optie 3",
  },
  {
    id: "7",
    title: "Product G",
    description: "Beschrijving van product G",
    info: "Extra informatie over product G",
    amount: 18,
    image: "/images/product-g.jpg",
    price: 89.99,
    oldPrice: 109.99, // SALE
    type: "optie 1",
  },
  {
    id: "8",
    title: "Product H",
    description: "Beschrijving van product H",
    info: "Extra informatie over product H",
    amount: 25,
    image: "/images/product-h.jpg",
    price: 24.99,
    type: "optie 2",
  },
];

// Haal alle producten op
export async function getProducts(): Promise<Product[]> {
  return products;
}

// Voeg een nieuw product toe

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
