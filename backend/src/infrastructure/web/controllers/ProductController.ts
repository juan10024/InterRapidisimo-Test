/*
 * propósito: Controlador de productos.
 * contexto:  Capa de infraestructura, controlador de productos.
 */

import type { Request, Response, NextFunction } from 'express';
import { ProductRepository } from '../../database/repositories/ProductRepository.js';
import { GetPaginatedProducts } from '../../../application/use-cases/GetPaginatedProducts.js';
import { sendSuccess } from '../utils/responseHelper.js';

export class ProductController {
  private readonly productRepository = new ProductRepository();
  private readonly getPaginatedProducts = new GetPaginatedProducts(this.productRepository);

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // req.query ya viene parseado y tipado como número gracias a Zod
      const queryDto = req.query as any; 
      const result = await this.getPaginatedProducts.execute(queryDto);
      
      sendSuccess(res, {
        statusCode: 200,
        message: 'Productos paginados obtenidos correctamente.',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}