/*
 * descripcion: Este archivo exporta los tipos TypeScript inmutables para el resto de la aplicación
 */

import { z } from 'zod';
import {
  ProductSchema,
  PaginationMetaSchema,
  PaginatedProductsResponseSchema,
  RewardActionRequestSchema,
  RewardActionResponseSchema
} from '../schemas/apiSchemas';

// Tipos inmutables exportados para el resto de la aplicación
export type Product = z.infer<typeof ProductSchema>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type PaginatedProductsResponse = z.infer<typeof PaginatedProductsResponseSchema>;

export type RewardActionRequest = z.infer<typeof RewardActionRequestSchema>;
export type RewardActionResponse = z.infer<typeof RewardActionResponseSchema>;