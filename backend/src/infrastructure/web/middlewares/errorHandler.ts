/*
 * propósito: Manejar errores.
 * contexto:  Capa de infraestructura, middleware de manejo de errores.
 */

import type { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`Error: ${err.message}`, { stack: err.stack });

  // Manejo coherente de errores de negocio vs errores genéricos del servidor
  const isBusinessError = err.message.includes('inexistente') || err.message.includes('insuficiente') || err.message.includes('inválida');
  const statusCode = isBusinessError ? 400 : 500;
  
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Ocurrió un error interno en el servidor.',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }) // Oculta logs en producción - OWASP A05
  });
};