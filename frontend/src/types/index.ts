export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSweetRequest {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

export interface UpdateSweetRequest {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  description?: string;
}

export interface SearchSweetParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface PurchaseRequest {
  quantity: number;
}

export interface RestockRequest {
  quantity: number;
}
