import axios from 'axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Sweet,
  CreateSweetRequest,
  UpdateSweetRequest,
  SearchSweetParams,
  PurchaseRequest,
  RestockRequest,
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
};

// Sweets API
export const sweetsAPI = {
  getAll: async (): Promise<Sweet[]> => {
    const response = await api.get<Sweet[]>('/sweets');
    return response.data;
  },

  getById: async (id: string): Promise<Sweet> => {
    const response = await api.get<Sweet>(`/sweets/${id}`);
    return response.data;
  },

  search: async (params: SearchSweetParams): Promise<Sweet[]> => {
    const response = await api.get<Sweet[]>('/sweets/search', { params });
    return response.data;
  },

  create: async (data: CreateSweetRequest): Promise<Sweet> => {
    const response = await api.post<Sweet>('/sweets', data);
    return response.data;
  },

  update: async (id: string, data: UpdateSweetRequest): Promise<Sweet> => {
    const response = await api.put<Sweet>(`/sweets/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },

  purchase: async (id: string, data: PurchaseRequest): Promise<Sweet> => {
    const response = await api.post<Sweet>(`/sweets/${id}/purchase`, data);
    return response.data;
  },

  restock: async (id: string, data: RestockRequest): Promise<Sweet> => {
    const response = await api.post<Sweet>(`/sweets/${id}/restock`, data);
    return response.data;
  },
};

export default api;
