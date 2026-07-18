/*
 * propósito: Mapear entre la entidad de dominio User y el Schema de la base de datos UserSchema.
 * contexto:  Capa de infraestructura de datos, facilitating data transformation.
 */

import { User as DomainUser } from "../../../domain/entities/User.js";
import { UserSchema } from "../orm-models/UserSchema.js";

export class UserMapper {
  static toDomain(schema: UserSchema): DomainUser {
    return new DomainUser(
      schema.id,
      schema.email,
      schema.pointsBalance,
      schema.updatedAt
    );
  }
}