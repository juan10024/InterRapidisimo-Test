/*
 * propósito: Implementar el repositorio de usuarios utilizando TypeORM.
 * contexto:  Capa de infraestructura de datos, interactuando con la tabla users.
 */

import { randomUUID } from "crypto";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { User } from "../../../domain/entities/User.js";
import { AppDataSource } from "../data-source.js";
import { UserSchema } from "../orm-models/UserSchema.js";
import { RewardLogSchema } from "../orm-models/RewardLogSchema.js";
import { UserMapper } from "../mappers/UserMapper.js";

export class UserRepository implements IUserRepository {
  private readonly userRepo = AppDataSource.getRepository(UserSchema);
  private readonly logRepo = AppDataSource.getRepository(RewardLogSchema);

  async findById(id: string): Promise<User | null> {
    const schema = await this.userRepo.findOneBy({ id });
    return schema ? UserMapper.toDomain(schema) : null;
  }

  async updatePointsBalance(id: string, newBalance: number): Promise<void> {
    await this.userRepo.update(id, { pointsBalance: newBalance });
  }

  async logRewardAction(userId: string, actionType: string, pointsAwarded: number): Promise<void> {
    const newLog = this.logRepo.create({
      id: randomUUID(),
      userId,
      actionType,
      pointsAwarded,
    });
    await this.logRepo.save(newLog);
  }
}