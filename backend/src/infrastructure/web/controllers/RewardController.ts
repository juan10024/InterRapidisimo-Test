/*
 * propósito: Controlador de recompensas.
 * contexto:  Capa de infraestructura, controlador de recompensas.
 */

import type { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../database/repositories/UserRepository.js';
import { ProductRepository } from '../../database/repositories/ProductRepository.js';
import { ExecuteRewardAction } from '../../../application/use-cases/ExecuteRewardAction.js';
import { sendSuccess } from '../utils/responseHelper.js';

export class RewardController {
  private readonly userRepository = new UserRepository();
  private readonly productRepository = new ProductRepository();
  private readonly executeRewardAction = new ExecuteRewardAction(this.userRepository, this.productRepository);

  public handleAction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputDto = req.body;
      const result = await this.executeRewardAction.execute(inputDto);
      
      sendSuccess(res, {
        statusCode: 200,
        message: 'Recompensa procesada y asignada con éxito.',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}