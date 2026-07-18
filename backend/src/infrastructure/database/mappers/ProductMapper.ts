/*
 * propósito: Mapear entre la entidad de dominio Product y el Schema de la base de datos ProductSchema.
 * contexto:  Capa de infraestructura de datos, facilitating data transformation.
 */

import { Product as DomainProduct } from "../../../domain/entities/Product.js";
import { ProductSchema } from "../orm-models/ProductSchema.js";

export class ProductMapper {
  static toDomain(schema: ProductSchema): DomainProduct {
    return new DomainProduct(
      schema.id,
      schema.name,
      Number(schema.price), // Convierte string de Postgres NUMERIC a number puro
      schema.category,
      schema.imageUrl,
      schema.stock
    );
  }
}