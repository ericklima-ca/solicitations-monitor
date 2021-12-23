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
  email: string;
  password: string;
  active: boolean;
  CenterId: number;
}

export interface Solicitation {
  id: number | null;
  order: string | null;
  Product: Product;
  amount: number;
  Center: Center;
  User: User;
  createdAt: string;
  updatedAt: string;
  obs: string;
  status: string;
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

export interface LoginForm {
  id: number;
  password: string;
}

export interface RegisterForm {
  id: number;
  name: string;
  lastName: string;
  email: string;
  CenterId: number;
  password: string;
}

export interface AuthUser {
  id: number;
  CenterId: number;
}
