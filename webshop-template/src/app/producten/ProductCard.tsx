import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Product } from "../types/types";
import { PhotoIcon, TagIcon } from "@heroicons/react/24/outline";

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
        <div className="shadow-xl rounded-md bg-container  cursor-pointer   h-[430px] flex flex-col justify-between relative">
          {/* Productafbeelding */}
          <div className="relative">
            {image && (image.startsWith("http") || image.startsWith("/")) ? (
              <Image
                priority
                width={1500}
                height={1500}
                src={image}
                alt={title}
                className="rounded-t-md h-50 w-full object-cover"
              />
            ) : (
              <div className="w-full h-50 bg-gray-200 rounded-t-md flex items-center justify-center text-gray-400">
                <PhotoIcon className="w-16 h-16" />
              </div>
            )}
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
              <h2 className="text-lg font-semibold text-text break-words truncate p-2">
                {title}
              </h2>
              {/* <p className="inline-block text-gray-400 px-4 py-2 rounded-md">
                aantal: x {amount}
              </p> */}
            </div>

            {/* Beschrijving */}
            <p className="bg-container-light border border-border p-2 text-text-light rounded inset-shadow-2xs h-[5rem] overflow-hidden break-words line-clamp-3">
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
