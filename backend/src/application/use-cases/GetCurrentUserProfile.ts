/*
 * propósito: Obtener el perfil público del usuario demo configurado.
 */

import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import type { CurrentUserProfileDto } from '../dtos/UserDtos.js';

export class GetCurrentUserProfile {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<CurrentUserProfileDto | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      pointsBalance: user.pointsBalance,
    };
  }
}
