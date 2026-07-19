/*
 * propósito: Estandarizar la estructura de respuestas de la API.
 * contexto:  Capa de infraestructura, utilidades del adaptador web.
 */

import type { Response } from 'express';
import { env } from '../../config/env.js';

// Estructura para respuestas exitosas
interface SuccessResponse {
  status: 'success';
  message?: string;
  data?: any;
  meta?: Record<string, any>;
}

// Estructura para respuestas con error
interface ErrorResponse {
  status: 'fail' | 'error';
  message: string;
  errors?: any[];
  stack?: string | undefined;
}

/*
 * Envía una respuesta HTTP exitosa estandarizada 
 */
export const sendSuccess = (
  res: Response,
  options: {
    statusCode?: number;
    message?: string;
    data?: any;
    meta?: Record<string, any>;
  } = {}
): void => {
  const { statusCode = 200, message, data, meta } = options;

  const responseBody: SuccessResponse = {
    status: 'success',
  };

  if (message !== undefined) responseBody.message = message;
  if (data !== undefined) responseBody.data = data;
  if (meta !== undefined) responseBody.meta = meta;

  res.status(statusCode).json(responseBody);
};

/*
 * Envía una respuesta HTTP de error estandarizada 
 */
export const sendError = (
  res: Response,
  options: {
    statusCode: number;
    message: string;
    errors?: any[];
    errorInstance?: unknown;
  }
): void => {
  const { statusCode, message, errors, errorInstance } = options;

  // 4xx se consideran fallos operativos - 'fail', 5xx son errores internos del servidor - 'error'
  const statusType = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

  const responseBody: ErrorResponse = {
    status: statusType,
    message,
  };

  if (errors !== undefined) responseBody.errors = errors;

  if (env.NODE_ENV === 'development' && errorInstance instanceof Error) {
    responseBody.stack = errorInstance.stack;
  }

  res.status(statusCode).json(responseBody);
};
