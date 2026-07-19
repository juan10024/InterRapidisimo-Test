/*
 * propósito: Centralizar y validar las variables de entorno del sistema.
 * contexto:  Configuración global del backend para las variables de entorno.
 */

import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Cargar el archivo .env correspondiente según el NODE_ENV inyectado por cross-env
const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });

const envSchema = z.object({
  // Permite que empiece como string u opcional, lo transforma a número, y si falla o no está, usa 3000
  PORT: z.string().optional().transform((val) => val ? parseInt(val, 10) : 3000).default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  DB_HOST: z.string(),
  // Transforma el puerto de la DB de manera segura a número
  DB_PORT: z.string().transform((val) => parseInt(val, 10)),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  
  REDIS_URL: z.string().url(),
  DEMO_USER_ID: z.string().uuid().default('550e8400-e29b-41d4-a716-446655440000'),
});


const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Error de configuración en las variables de entorno:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
