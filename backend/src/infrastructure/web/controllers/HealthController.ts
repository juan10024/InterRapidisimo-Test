/*
 * propósito: Proveer un endpoint de Health Check para monitorear el estado del sistema.
 * contexto:  Capa de infraestructura, controlador de health check.
 */

import type { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source.js';
import { redisClient } from '../../cache/RedisClient.js';

export const getHealthStatus = async (_req: Request, res: Response): Promise<void> => {
  const timestamp = new Date().toISOString();
  
  // Validar Estado de PostgreSQL
  let isDbHealthy = false;
  let dbMessage = 'Disconnected';
  
  try {
    // Verifica si TypeORM completó la inicialización y ejecuta una consulta ligera
    if (AppDataSource.isInitialized) {
      await AppDataSource.query('SELECT 1');
      isDbHealthy = true;
      dbMessage = 'Healthy';
    }
  } catch (error) {
    dbMessage = error instanceof Error ? error.message : 'Database query failed';
  }

  // Validar Estado de Redis
  let isRedisHealthy = false;
  let redisMessage = 'Disconnected';
  
  try {
    // Verifica si el cliente de Redis está abierto y responde al comando PING
    if (redisClient && redisClient.isOpen) {
      const pong = await redisClient.ping();
      if (pong === 'PONG') {
        isRedisHealthy = true;
        redisMessage = 'Healthy';
      }
    }
  } catch (error) {
    redisMessage = error instanceof Error ? error.message : 'Redis ping failed';
  }

  // Determinar el estado general del sistema
  const isSystemHealthy = isDbHealthy && isRedisHealthy;
  const httpStatus = isSystemHealthy ? 200 : 503; 

  res.status(httpStatus).json({
    status: isSystemHealthy ? 'success' : 'error',
    timestamp,
    services: {
      database: {
        status: isDbHealthy ? 'up' : 'down',
        message: dbMessage
      },
      cache: {
        status: isRedisHealthy ? 'up' : 'down',
        message: redisMessage
      }
    }
  });
};
