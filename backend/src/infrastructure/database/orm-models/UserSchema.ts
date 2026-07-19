/*
 * propósito: Definir la estructura de la tabla users en la base de datos PostgreSQL.
 * contexto:  Capa de infraestructura de datos, utilizando TypeORM para mapear el modelo de dominio a la base de datos.
 */

import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class UserSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("varchar", { unique: true }) 
  email!: string;

  @Column("integer", { name: "points_balance", default: 0 }) 
  pointsBalance!: number;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" }) 
  updatedAt!: Date;
}