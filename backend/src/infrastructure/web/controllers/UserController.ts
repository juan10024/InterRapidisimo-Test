/*
 * propósito: Exponer el perfil público del usuario demo actual.
 */

import type { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';
import { UserRepository } from '../../database/repositories/UserRepository.js';
import { GetCurrentUserProfile } from '../../../application/use-cases/GetCurrentUserProfile.js';
import { sendError, sendSuccess } from '../utils/responseHelper.js';

export class UserController {
  private readonly userRepository = new UserRepository();
  private readonly getCurrentUserProfile = new GetCurrentUserProfile(this.userRepository);

  public getCurrent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.getCurrentUserProfile.execute(env.DEMO_USER_ID);

      if (!user) {
        sendError(res, {
          statusCode: 404,
          message: 'El usuario demo configurado no fue encontrado.',
        });
        return;
      }

      sendSuccess(res, {
        statusCode: 200,
        message: 'Perfil de usuario obtenido correctamente.',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  };
}
