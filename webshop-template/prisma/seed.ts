// filepath: prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        title: "Product A",
        description: "Beschrijving van product A",
        info: "Extra informatie over product A",
        amount: 10,
        image: "https://picsum.photos/600/400",
        price: 29.99,
        oldPrice: 39.99,
        type: "optie 1",
      },
      {
        title: "Product B",
        description: "Beschrijving van product B",
        info: "Extra informatie over product B",
        amount: 5,
        image: "https://picsum.photos/600/400",
        price: 49.99,
        type: "optie 2",
      },
      {
        title: "Product C",
        description: "Beschrijving van product C",
        info: "Extra informatie over product C",
        amount: 20,
        image: "https://picsum.photos/600/400",
        price: 19.99,
        type: "optie 3",
      },
      {
        title: "Product D",
        description: "Beschrijving van product D",
        info: "Extra informatie over product D",
        amount: 15,
        image: "https://picsum.photos/600/400",
        price: 99.99,
        oldPrice: 129.99,
        type: "optie 1",
      },
      {
        title: "Product E",
        description: "Beschrijving van product E",
        info: "Extra informatie over product E",
        amount: 8,
        image: "https://picsum.photos/600/400",
        price: 59.99,
        type: "optie 2",
      },
      {
        title: "Product F",
        description: "Beschrijving van product F",
        info: "Extra informatie over product F",
        amount: 12,
        image: "https://picsum.photos/600/400",
        price: 79.99,
        type: "optie 3",
      },
      {
        title: "Product G",
        description: "Beschrijving van product G",
        info: "Extra informatie over product G",
        amount: 7,
        image: "https://picsum.photos/600/400",
        price: 89.99,
        type: "optie 1",
      },
      {
        title: "Product H",
        description: "Beschrijving van product H",
        info: "Extra informatie over product H",
        amount: 3,
        image: "https://picsum.photos/600/400",
        price: 69.99,
        type: "optie 2",
      },
      {
        title: "Product I",
        description: "Beschrijving van product I",
        info: "Extra informatie over product I",
        amount: 10,
        image: "https://picsum.photos/600/400",
        price: 39.99,
        type: "optie 3",
      },
      {
        title: "Product J",
        description: "Beschrijving van product J",
        info: "Extra informatie over product J",
        amount: 5,
        image: "https://picsum.photos/600/400",
        price: 49.99,
        oldPrice: 59.99,
        type: "optie 1",
      },
      {
        title: "Product K",
        description: "Beschrijving van product K",
        info: "Extra informatie over product K",
        amount: 20,
        image: "https://picsum.photos/600/400",
        price: 19.99,
        type: "optie 2",
      },
      {
        title: "Product L",
        description: "Beschrijving van product L",
        info: "Extra informatie over product L",
        amount: 15,
        image: "https://picsum.photos/600/400",
        price: 99.99,
        oldPrice: 129.99,
        type: "optie 3",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
