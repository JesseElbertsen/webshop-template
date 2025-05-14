export type Product = {
  id: number;
  title: string;
  description: string;
  info: string;
  amount: number;
  image?: string | null; // <-- fix: optioneel en/of null
  price: number;
  oldPrice?: number;
  type: string;
};
