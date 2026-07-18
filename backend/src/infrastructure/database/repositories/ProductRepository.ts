/*
 * propósito: Implementar el repositorio de productos utilizando TypeORM.
 * contexto:  Capa de infraestructura de datos, interactuando con la tabla products.
 */

import { ILike } from "typeorm";
import type { IProductRepository, PaginatedProductsResult } from "../../../domain/repositories/IProductRepository.js";
import { Product } from "../../../domain/entities/Product.js";
import { AppDataSource } from "../data-source.js";
import { ProductSchema } from "../orm-models/ProductSchema.js";
import { ProductMapper } from "../mappers/ProductMapper.js";

export class ProductRepository implements IProductRepository {
  private readonly repo = AppDataSource.getRepository(ProductSchema);

  async findById(id: string): Promise<Product | null> {
    const schema = await this.repo.findOneBy({ id });
    return schema ? ProductMapper.toDomain(schema) : null;
  }

  async findPaginated(
    page: number,
    limit: number,
    category?: string,
    searchName?: string
  ): Promise<PaginatedProductsResult> {
    const skip = (page - 1) * limit;
    const whereCondition: any = {};

    if (category) {
      whereCondition.category = category;
    }
    
    if (searchName) {
      whereCondition.name = ILike(`%${searchName}%`); // Búsqueda insensible a mayúsculas/minúsculas
    }

    const [schemas, total] = await this.repo.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: { name: "ASC" },
    });

    return {
      products: schemas.map(ProductMapper.toDomain),
      total,
      page,
      limit,
    };
  }

  async updateStock(id: string, newStock: number): Promise<void> {
    await this.repo.update(id, { stock: newStock });
  }
}