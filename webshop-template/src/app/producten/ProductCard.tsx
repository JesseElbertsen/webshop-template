import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Product } from "../types/types";

export default function ProductCard({
  id,
  title,
  image,
  price,
  amount,
  description,
  sale,
  index,
}: Product & { index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: inView ? index * 0.2 : 0,
      }}
    >
      <Link href={`/producten/${id}`}>
        <div className="shadow rounded-xl p-4 bg-muted cursor-pointer hover:shadow-lg transition-shadow h-[400px] flex flex-col justify-between relative">
          {/* Productafbeelding */}
          <Image
            width={300}
            height={300}
            src={image}
            alt={title}
            className="rounded-md h-40 w-full object-cover"
          />

          {/* Titel en aantal */}
          <div className="flex justify-between items-center mt-2">
            <h2 className="text-lg font-semibold mt-2 p-2 text-black">
              {title}
            </h2>
            <p className="inline-block text-gray-400 px-4 py-2 rounded-md">
              aantal: x {amount}
            </p>
          </div>

          {/* Beschrijving */}
          <p className="bg-white p-2 rounded inset-shadow-2xs h-[6rem] overflow-hidden">
            {description}
          </p>

          {/* Prijzen */}
          <div className="mt-4 flex items-center justify-between">
            {sale ? (
              <div className="flex flex-col items-start">
                {/* Nieuwe prijs (groen) */}
                <p className="text-green-600 font-bold text-lg">
                  €{sale.newPrice.toFixed(2)}
                </p>
                {/* Oude prijs (rood, doorstreept) */}
                <p className="text-red-500 line-through text-sm">
                  €{sale.oldPrice.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-green-600 font-bold text-lg">
                €{price.toFixed(2)}
              </p>
            )}

            {/* Badge voor afgeprijsd product */}
            {sale && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                Afgeprijsd!
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
