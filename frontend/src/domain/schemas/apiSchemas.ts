/*
 * descripcion: Este archivo contiene los esquemas Zod para validar las respuestas de la API
 */

import { z } from 'zod';


// SCHEMAS: PRODUCTOS
export const ProductSchema = z.object({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
  name: z.string().min(1, "El nombre no puede estar vacío"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  category: z.string(),
  imageUrl: z.string().url("Debe ser una URL válida"),
  stock: z.number().int().min(0, "El stock no puede ser negativo")
});

export const PaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative()
});

export const PaginatedProductsResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.object({
    products: z.array(ProductSchema),
    meta: PaginationMetaSchema
  })
});

// SCHEMAS: GAMIFICACIÓN / RECOMPENSAS
export const RewardActionRequestSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  actionType: z.enum(["ADD_TO_CART", "PURCHASE", "FAVORITE"])
});

export const RewardActionResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.object({
    actionType: z.string(),
    pointsAwarded: z.number().int().nonnegative(),
    newPointsBalance: z.number().int().nonnegative()
  })
});

// SCHEMA: PERFIL DE USUARIO ACTUAL
export const CurrentUserResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.object({
    user: z.object({
      id: z.string().uuid(),
      pointsBalance: z.number().int().nonnegative(),
    }),
  }),
});

// SCHEMA: PRODUCTO INDIVIDUAL
export const SingleProductResponseSchema = z.object({
  status: z.literal("success"),
  message: z.string(),
  data: z.object({
    product: ProductSchema
  })
});