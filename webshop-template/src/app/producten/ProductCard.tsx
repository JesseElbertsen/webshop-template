import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
};

export default function ProductCard({
  id,
  title,
  image,
  price,
  description,
}: Product) {
  return (
    <Link href={`/producten/${id}`}>
      <div className="shadow rounded-xl p-4 bg-muted cursor-pointer hover:shadow-lg transition-shadow">
        <Image
          width={300}
          height={300}
          src={image}
          alt={title}
          className="rounded-md h-40 w-full object-cover"
        />
        <h2 className="text-lg font-semibold mt-2 p-2 text-black">{title}</h2>
        <p className="bg-white p-2 rounded inset-shadow-2xs h-[6rem] overflow-hidden">
          {description}
        </p>
        <p className="text-green-600 font-bold mt-1 p-2">€{price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
