/*
 * propósito: Definir la abstracción de repositorio para productos.
 * contexto:  Capa de infraestructura de dominio que define las operaciones de persistencia y consulta.
 */

import { Product } from '../entities/Product.js';

export interface PaginatedProductsResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  
  /*
   * Resuelve los filtros y la paginación estrictamente en el servidor
   */
  findPaginated(
    page: number, 
    limit: number, 
    category?: string, 
    searchName?: string
  ): Promise<PaginatedProductsResult>;
  
  updateStock(id: string, newStock: number): Promise<void>;
}