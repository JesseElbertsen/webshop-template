export type Product = {
  id: number;
  title: string;
  description: string;
  info: string;
  amount: number;
  image?: string | null;
  price: number;
  oldPrice?: number | null;
  type: string;
  public_id?: string | null; // <-- voeg deze regel toe!
};
