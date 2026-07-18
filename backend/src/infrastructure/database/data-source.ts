/*
 * propósito: Inicializar la conexión con la base de datos PostgreSQL mediante TypeORM.
 * contexto:  Configuración de la capa de infraestructura de datos, estableciendo la conexión y cargando los modelos.
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env.js";
import { UserSchema } from "./orm-models/UserSchema.js";
import { ProductSchema } from "./orm-models/ProductSchema.js";
import { RewardLogSchema } from "./orm-models/RewardLogSchema.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.NODE_ENV === "development", // Solo true en desarrollo. En prod usa migraciones.
  logging: env.NODE_ENV === "development",
  entities: [UserSchema, ProductSchema, RewardLogSchema],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});