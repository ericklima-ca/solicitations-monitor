export interface Product {
  sku: string;
  description: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  department: string;
}

export interface Solicitation {
  id: string | null;
  order: string | null;
  product: Product;
  amount: number;
  center: string;
  user: User;
  createddAt: string;
  updatedAt: string;
}
