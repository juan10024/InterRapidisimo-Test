/*
 * descripcion: Este archivo contiene el store de Zustand para productos
 */

import { create } from 'zustand';
import { apiClient } from '../../infrastructure/api/apiClient';
import type { Product, PaginationMeta } from '../../domain/models';

interface ProductState {
  products: Product[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  meta: null,
  isLoading: false,
  error: null,
  
  fetchProducts: async (page = 1, limit = 4) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.getProducts(page, limit);
      set({ 
        products: response.data.products, 
        meta: response.data.meta,
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));