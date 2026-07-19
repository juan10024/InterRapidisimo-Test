/*
 * propósito: Inicializar la conexión con la base de datos PostgreSQL mediante TypeORM.
 * contexto:  Configuración de la capa de infraestructura de datos, estableciendo la conexión y cargando los modelos.
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url"; 
import { dirname, join } from "path"; 
import { env } from "../config/env.js";
import { UserSchema } from "./orm-models/UserSchema.js";
import { ProductSchema } from "./orm-models/ProductSchema.js";
import { RewardLogSchema } from "./orm-models/RewardLogSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.NODE_ENV === "development", 
  logging: ["error"],
  entities: [UserSchema, ProductSchema, RewardLogSchema],
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  subscribers: [],
});