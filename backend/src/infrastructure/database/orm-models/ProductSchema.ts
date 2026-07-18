/*
 * propósito: Definir la estructura de la tabla products en la base de datos PostgreSQL.
 * contexto:  Capa de infraestructura de datos, utilizando TypeORM para mapear el modelo de dominio a la base de datos.
 */

import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "products" })
export class ProductSchema {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("numeric", { precision: 10, scale: 2 })
  price!: number;

  @Column()
  category!: string;

  @Column({ name: "image_url" })
  imageUrl!: string;

  @Column()
  stock!: number;
}