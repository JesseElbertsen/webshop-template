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

export async function getDummyProducts() {
  return [
    {
      id: "1",
      title: "Product A",
      description: "Dit is een geweldige product dat je moet hebben!",
      info: "Extra informatie over product A.",
      amount: 3,
      image: "/images/product-a.jpg",
      price: 29.99,
    },
    {
      id: "2",
      title: "Product B",
      description: "Dit is een ander geweldig product dat je moet hebben!",
      info: "Extra informatie over product B.",
      amount: 5,
      image: "/images/product-b.jpg",
      price: 49.99,
    },
    {
      id: "3",
      title: "Product C",
      description: "Dit is nog een geweldig product dat je moet hebben!",
      info: "Extra informatie over product C.",
      amount: 2,
      image: "/images/product-c.jpg",
      price: 19.99,
    },
    {
      id: "4",
      title: "Product D",
      description: "Dit is een fantastisch product dat je moet hebben!",
      info: "Extra informatie over product D.",
      amount: 4,
      image: "/images/product-d.jpg",
      price: 39.99,
    },
    {
      id: "5",
      title: "Product E",
      description: "Dit is een geweldig product dat je moet hebben!",
      info: "Extra informatie over product E.",
      amount: 1,
      image: "/images/product-e.jpg",
      price: 59.99,
    },
    {
      id: "6",
      title: "Product F",
      description: "Dit is een geweldig product dat je moet hebben!",
      info: "Extra informatie over product F.",
      amount: 2,
      image: "/images/product-f.jpg",
      price: 24.99,
    },
    {
      id: "7",
      title: "Product G",
      description: "Dit is een geweldig product dat je moet hebben!",
      info: "Extra informatie over product G.",
      amount: 3,
      image: "/images/product-g.jpg",
      price: 34.99,
    },
    {
      id: "8",
      title: "Product H",
      description: "Dit is een geweldig product dat je moet hebben!",
      info: "Extra informatie over product H.",
      amount: 4,
      image: "/images/product-h.jpg",
      price: 44.99,
    },
  ];
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
