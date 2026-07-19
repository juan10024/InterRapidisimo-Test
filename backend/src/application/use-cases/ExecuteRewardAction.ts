/*
 * propósito: Gestionar acciones de recompensa para usuarios.
 * contexto:  Capa de aplicación, facilitando la transferencia de datos.
 */

import type { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import type { IProductRepository } from '../../domain/repositories/IProductRepository.js';
import type { ExecuteRewardActionInputDto, RewardActionResponseDto } from '../dtos/RewardDtos.js';
import { BusinessError } from '../../domain/errors/BusinessError.js';

export class ExecuteRewardAction {
  // Matriz interna inmutable de reglas de negocio en el servidor
  private readonly REWARD_RULES: Record<string, number> = {
    ADD_TO_CART: 10,
    FAVORITE: 5,
    PURCHASE: 50,
  };

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly productRepository: IProductRepository
  ) {}

  async execute(input: ExecuteRewardActionInputDto): Promise<RewardActionResponseDto> {
    const { userId, productId, actionType } = input;

    // Validar existencia y stock del producto de forma estricta
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new BusinessError('El producto especificado no existe.');
    }

    if (actionType === 'ADD_TO_CART' || actionType === 'PURCHASE') {
      if (!product.hasAvailableStock(1)) {
        throw new BusinessError(`Operación inválida: El producto '${product.name}' no cuenta con stock disponible.`);
      }
    }

    // Validar existencia del usuario
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new BusinessError('El usuario especificado no existe.');
    }

    // Resolver la regla de puntos exclusivamente en el servidor
    const pointsToAward = this.REWARD_RULES[actionType];
    if (!pointsToAward) {
      throw new BusinessError(`La acción '${actionType}' no es elegible para acumulación de puntos.`);
    }

    // Modificar estados a través de las entidades del dominio
    user.addRewardPoints(pointsToAward);
    
    if (actionType === 'PURCHASE') {
      product.decreaseStock(1);
      await this.productRepository.updateStock(product.id, product.stock);
    }

    // Persistir de manera transaccional relacional
    await this.userRepository.updatePointsBalance(user.id, user.pointsBalance);
    await this.userRepository.logRewardAction(user.id, actionType, pointsToAward);

    return {
      actionType,
      pointsAwarded: pointsToAward,
      newPointsBalance: user.pointsBalance,
    };
  }
}