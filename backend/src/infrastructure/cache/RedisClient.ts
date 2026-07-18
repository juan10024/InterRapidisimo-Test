/*
 * propósito: Implementar un cliente Redis para almacenamiento en memoria de productos.
 * contexto:  Capa de infraestructura de datos, facilitando el acceso rápido a los productos.
 */

import { createClient } from 'redis';
import { env } from '../config/env.js';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Autoconexión asíncrona controlada de fondo
(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Conexión a Redis establecida con éxito');
  }
})();