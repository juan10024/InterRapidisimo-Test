/*
 * propósito: Definir la abstracción de repositorio para usuarios.
 * contexto:  Capa de infraestructura de dominio que define las operaciones de persistencia y consulta.
 */

import { User } from '../entities/User.js';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  updatePointsBalance(id: string, newBalance: number): Promise<void>;
  logRewardAction(userId: string, actionType: string, pointsAwarded: number): Promise<void>;
}