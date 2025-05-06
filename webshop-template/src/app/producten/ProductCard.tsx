type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
};

export default function ProductCard({ title, image, price }: Product) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <img
        src={image}
        alt={title}
        className="rounded-md h-40 w-full object-cover"
      />
      <h2 className="text-lg font-semibold mt-2 text-black">{title}</h2>
      <p className="text-green-600 font-bold mt-1">€{price.toFixed(2)}</p>
    </div>
  );
}
