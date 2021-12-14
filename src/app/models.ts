export interface Product {
  id: number;
  description: string;
  imageUrl: string;
  ean: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  department: string;
  email: string;
  password: string;
  active: boolean;
  CenterId: number;
}

export interface Solicitation {
  id: number | null;
  order: string | null;
  product: Product;
  amount: number;
  center: Center;
  user: User;
  createddAt: string;
  updatedAt: string;
}

export interface Center {
  id: number;
  centerName: string;
  warehouseEmail: string;
  managementEmail: string;
}

export interface Response {
  id: number | null;
  confirmed: boolean;
  user: User;
  solicitation: Solicitation;
  createddAt: string;
  updatedAt: string;
}
