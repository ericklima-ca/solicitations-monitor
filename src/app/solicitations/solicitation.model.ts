interface Product {
  sku: string;
  description: string;
  imageUrl: string;
}

export interface Solicitation {
  id: string | null;
  order: string | null;
  product: Product;
  amount: number;
  center: string;
}
