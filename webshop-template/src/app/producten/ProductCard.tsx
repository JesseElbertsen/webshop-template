import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Product } from "../types/types";
import { TagIcon } from "@heroicons/react/24/outline";

export default function ProductCard({
  id,
  title,
  image,
  price,
  // amount,
  description,
  oldPrice,
  index,
}: Product & { index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const discountPercentage =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: inView ? index * 0.2 : 0,
      }}
    >
      <Link href={`/producten/${id}`}>
        <div className="shadow-xl rounded-xl bg-muted cursor-pointer   h-[420px] flex flex-col justify-between relative">
          {/* Productafbeelding */}
          <div className="relative">
            <Image
              width={300}
              height={300}
              src={
                image && (image.startsWith("http") || image.startsWith("/"))
                  ? image
                  : "https://picsum.photos/600/400"
              }
              alt={title}
              className="rounded-t-md h-50 w-full object-cover"
            />
            {/* Kortingpercentage */}
            {discountPercentage && (
              <div className="absolute bottom-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <TagIcon className="w-4 h-4" />-{discountPercentage}%
              </div>
            )}
          </div>
          <div className="p-4">
            {/* Titel en aantal */}
            <div className="flex justify-between items-center ">
              <h2 className="text-lg font-semibold text-black break-words truncate p-2">
                {title}
              </h2>
              {/* <p className="inline-block text-gray-400 px-4 py-2 rounded-md">
                aantal: x {amount}
              </p> */}
            </div>

            {/* Beschrijving */}
            <p className="bg-white p-2 rounded inset-shadow-2xs h-[6rem] overflow-hidden">
              {description}
            </p>

            {/* Prijzen */}
            <div className="mt-4 flex items-center justify-between">
              {oldPrice && oldPrice > price ? (
                <div className="flex flex-col items-start">
                  {/* Nieuwe prijs (groen) */}
                  <p className="text-green-600 font-bold text-lg">
                    €{price.toFixed(2)}
                  </p>
                  {/* Oude prijs (rood, doorstreept) */}
                  <p className="text-red-500 line-through text-sm">
                    €{oldPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-green-600 font-bold text-lg">
                  €{price.toFixed(2)}
                </p>
              )}

              {/* Badge voor afgeprijsd product */}
              {oldPrice && oldPrice > price && (
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                  Afgeprijsd!
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
