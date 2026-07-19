/*
 * propósito: Manejar errores.
 * contexto:  Capa de infraestructura, middleware de manejo de errores.
 */

import type { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';
import { BusinessError } from '../../../domain/errors/BusinessError.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`Error: ${err.message}`, { stack: err.stack });

  // Manejo de errores
  const isBusinessError = err instanceof BusinessError;
  const statusCode = isBusinessError ? 400 : 500;
  const statusType = isBusinessError ? 'fail' : 'error';
  
  res.status(statusCode).json({
    status: statusType,
    message: err.message || 'Ocurrió un error interno en el servidor.',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }) // Oculta logs en producción - OWASP A05
  });
};