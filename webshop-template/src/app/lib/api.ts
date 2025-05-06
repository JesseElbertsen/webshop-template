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
      image: "/images/product-a.jpg",
      price: 29.99,
    },
    {
      id: "2",
      title: "Product B",
      description: "Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-b.jpg",
      price: 49.99,
    },
    {
      id: "3",
      title: "Product C",
      description: "Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-c.jpg",
      price: 19.99,
    },
    {
      id: "4",
      title: "Product D",
      description: "Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-d.jpg",
      price: 39.99,
    },
    {
      id: "5",
      title: "Product E",
      description: "Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-e.jpg",
      price: 59.99,
    },
    {
      id: "6",
      title: "Product F",
      description: "Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-f.jpg",
      price: 89.99,
    },
    {
      id: "7",
      title: "Product G",
      description: "Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-g.jpg",
      price: 99.99,
    },
    {
      id: "8",
      title: "Product H",
      description:
        "Dit is een geweldige product dat je moet hebben! Dit is een geweldige product dat je moet hebben!",
      image: "/images/product-h.jpg",
      price: 109.99,
    },
  ];
}
