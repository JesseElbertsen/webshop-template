export type Product = {
  id: string;
  title: string;
  description: string;
  info: string;
  amount: number;
  image: string;
  price: number;
  oldPrice?: number; // Optioneel, alleen aanwezig bij sale
  type: string;
};
