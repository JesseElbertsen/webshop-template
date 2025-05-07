import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Product = {
  id: string;
  title: string;
  description: string;
  amount: number;
  image: string;
  price: number;
};

export default function ProductCard({
  id,
  title,
  image,
  price,
  description,
  amount,
  index, // Nieuw: index wordt doorgegeven
}: Product & { index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Zorg ervoor dat de animatie maar één keer wordt uitgevoerd
    threshold: 0.1, // Start de animatie wanneer 10% van de kaart zichtbaar is
  });

  return (
    <motion.div
      ref={ref}
      custom={index} // Gebruik de index voor de animatievertraging
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: inView ? index * 0.2 : 0, // Vertraging op basis van de index
      }}
    >
      <Link href={`/producten/${id}`}>
        <div className="shadow rounded-xl p-4 bg-muted cursor-pointer hover:shadow-lg transition-shadow">
          <Image
            width={300}
            height={300}
            src={image}
            alt={title}
            className="rounded-md h-40 w-full object-cover"
          />

          <div className="flex items-center justify-between p-2">
            <h2 className="text-lg font-semibold mt-2  text-black">{title}</h2>
            <div>
              <p className="inline-block bg- text-gray-400  py-2 rounded-md">
                aantal: x {amount}
              </p>
            </div>
          </div>
          <p className="bg-white p-2 rounded inset-shadow-2xs h-[6rem] overflow-hidden">
            {description}
          </p>
          <p className="text-green-600 font-bold mt-1 p-2">
            €{price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
