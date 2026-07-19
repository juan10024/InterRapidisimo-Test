/*
 * propósito: Proveer un endpoint de Health Check para monitorear el estado del sistema.
 * contexto:  Capa de infraestructura, controlador de health check.
 */

import type { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source.js';
import { redisClient } from '../../cache/RedisClient.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

export const getHealthStatus = async (_req: Request, res: Response): Promise<void> => {
  const timestamp = new Date().toISOString();
  
  let isDbHealthy = false;
  let dbMessage = 'Healthy';
  
  try {
    // Verifica si TypeORM completó la inicialización y ejecuta una consulta ligera
    if (AppDataSource.isInitialized) {
      await AppDataSource.query('SELECT 1');
      isDbHealthy = true;
    } else {
      dbMessage = 'Disconnected';
    }
  } catch (error) {
    dbMessage = error instanceof Error ? error.message : 'Database query failed';
  }

  let isRedisHealthy = false;
  let redisMessage = 'Healthy';
  
  try {
    // Verifica si el cliente de Redis está abierto y responde al comando PING
    if (redisClient && redisClient.isOpen) {
      const pong = await redisClient.ping();
      if (pong === 'PONG') {
        isRedisHealthy = true;
      } else {
        redisMessage = 'Unexpected response';
      }
    } else {
      redisMessage = 'Disconnected';
    }
  } catch (error) {
    redisMessage = error instanceof Error ? error.message : 'Redis ping failed';
  }

  // Determinar el estado general del sistema
  const isSystemHealthy = isDbHealthy && isRedisHealthy;

  const healthData = {
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
  };

  if (isSystemHealthy) {
    sendSuccess(res, {
      statusCode: 200,
      message: 'Todos los servicios de infraestructura están operativos.',
      data: healthData
    });
  } else {
    sendError(res, {
      statusCode: 503,
      message: 'Uno o más servicios de infraestructura no responden.',
      errors: [healthData.services]
    });
  }
};

