/*
 * propósito: Obtener productos paginados con caché Redis.
 * contexto:  Capa de aplicación, facilitando la transferencia de datos.
 */

import type { IProductRepository } from '../../domain/repositories/IProductRepository.js';
import type { GetProductsQueryDto, PaginatedProductsResponseDto } from '../dtos/ProductDtos.js';
import { redisClient } from '../../infrastructure/cache/RedisClient.js';

export class GetPaginatedProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(query: GetProductsQueryDto): Promise<PaginatedProductsResponseDto> {
    const { page, limit, category, search } = query;
    
    // Generar una llave única de caché basada en los filtros aplicados
    const cacheKey = `products:page:${page}:limit:${limit}:cat:${category || 'all'}:search:${search || 'none'}`;

    try {
      if (redisClient.isOpen) {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          return JSON.parse(cachedData);
        }
      }
    } catch (cacheError) {
      console.warn('Fallo al leer de Redis, tolerancia a fallos activada:', cacheError);
    }

    // Cache-Aside: Si no está en caché, consultar la base de datos relacional
    const result = await this.productRepository.findPaginated(page, limit, category, search);
    
    const totalPages = Math.ceil(result.total / limit);
    const response: PaginatedProductsResponseDto = {
      products: result.products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        imageUrl: p.imageUrl,
        stock: p.stock
      })),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages
      }
    };

    try {
      if (redisClient.isOpen) {
        // Almacenar en caché con un TTL corto de 60 segundos para mitigar obsolescencia de stock
        await redisClient.setEx(cacheKey, 60, JSON.stringify(response));
      }
    } catch (cacheError) {
      console.warn('Fallo al escribir en Redis:', cacheError);
    }

    return response;
  }
}