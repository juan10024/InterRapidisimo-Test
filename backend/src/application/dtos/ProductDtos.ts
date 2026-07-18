/*
 * propósito: Definir los DTOs para el manejo de productos.
 * contexto:  Capa de aplicación, facilitando la transferencia de datos.
 */

export interface GetProductsQueryDto {
  page: number;
  limit: number;
  category?: string;
  search?: string;
}

export interface PaginatedProductsResponseDto {
  products: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}