/*
 * propósito: Definir la estructura de la tabla reward_logs en la base de datos PostgreSQL.
 * contexto:  Capa de infraestructura de datos, utilizando TypeORM para mapear el modelo de dominio a la base de datos.
 */

import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "reward_logs" })
export class RewardLogSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid", { name: "user_id" })
  userId!: string;

  @Column("varchar", { name: "action_type" })
  actionType!: string;

  @Column("integer", { name: "points_awarded" })
  pointsAwarded!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}