/*
 * descripcion: Este archivo contiene los clientes HTTP para interactuar con el backend
 */

import { 
  PaginatedProductsResponseSchema, 
  RewardActionResponseSchema,
  SingleProductResponseSchema
} from '../../domain/schemas/apiSchemas';
import type { 
  PaginatedProductsResponse, 
  RewardActionRequest, 
  RewardActionResponse,
  SingleProductResponse
} from '../../domain/models';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const apiClient = {
  /*
   * Obtiene la lista paginada de productos del backend.
   */
  async getProducts(
    page: number = 1,
    limit: number = 4,
    category?: string,
    search?: string
  ): Promise<PaginatedProductsResponse> {
    let url = `${API_BASE_URL}/products?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP al obtener productos: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return PaginatedProductsResponseSchema.parse(data);
  },

  /*
   * Obtiene un producto por su ID.
   */
  async getProductById(id: string): Promise<SingleProductResponse> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP al obtener producto: ${response.status}`);
    }

    const data = await response.json();
    return SingleProductResponseSchema.parse(data);
  },

  /*
   * Envía una acción de usuario para procesar una recompensa.
   */
  async postRewardAction(payload: RewardActionRequest): Promise<RewardActionResponse> {
    const response = await fetch(`${API_BASE_URL}/rewards/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP al procesar recompensa: ${response.status}`);
    }

    const data = await response.json();
    return RewardActionResponseSchema.parse(data);
  }
};