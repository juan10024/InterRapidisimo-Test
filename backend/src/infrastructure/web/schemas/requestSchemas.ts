/*
 * propósito: Validar esquemas de solicitud de las APIs.
 * contexto:  Capa de infraestructura, validación de datos.
 */

import { z } from 'zod';

export const GetProductsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1).pipe(z.number().positive()),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10).pipe(z.number().positive()),
    category: z.string().optional(),
    search: z.string().optional(),
  }),
});

export const ExecuteRewardSchema = z.object({
  body: z.object({
    userId: z.uuid({ message: 'El userId debe ser un UUID válido.' }),
    productId: z.uuid({ message: 'El productId debe ser un UUID válido.' }),
    actionType: z.enum(['ADD_TO_CART', 'PURCHASE', 'FAVORITE'], {
      message: 'Acción no permitida (Debe ser: ADD_TO_CART, PURCHASE o FAVORITE).'
    }),
  }),
});

export const GetProductByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'El id del producto debe ser un UUID válido.' }),
  }),
});
