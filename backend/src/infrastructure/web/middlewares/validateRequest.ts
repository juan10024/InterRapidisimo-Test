/*
 * propósito: Validar peticiones.
 * contexto:  Capa de infraestructura, validación de datos.
 */

import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod'; 

interface ValidatedRequestData {
  body?: any;
  query?: any;
  params?: any;
}


export const validateRequest = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      }) as ValidatedRequestData;
      
      if (parsed.body !== undefined) req.body = parsed.body;
      if (parsed.query !== undefined) req.query = parsed.query;
      if (parsed.params !== undefined) req.params = parsed.params;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'fail',
          message: 'Error de validación en los datos de entrada.',
          errors: error.issues.map(issue => ({
            field: issue.path.join('.').replace(/^(body|query|params)\./, ''),
            message: issue.message
          }))
        });
        return;
      }
      next(error);
    }
  };
};
