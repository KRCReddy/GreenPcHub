export type Product = {
  id?: number;
  brand: string;
  model: string;
  price: number;
  ram_gb: number;
  storage_type: string;
  storage_gb: number;
  cpu: string;
  purpose: string;
  screen_in: number;
  gpu?: string;
  images?: string[];
  description?: string;
  availability?: number;
};
