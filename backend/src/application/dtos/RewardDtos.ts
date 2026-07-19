/*
 * propósito: Definir los DTOs para el manejo de recompensas.
 * contexto:  Capa de aplicación, facilitando la transferencia de datos.
 */

export interface ExecuteRewardActionInputDto {
  userId: string;
  productId: string;
  actionType: 'ADD_TO_CART' | 'PURCHASE' | 'FAVORITE';
}

export interface RewardActionResponseDto {
  actionType: string;
  pointsAwarded: number;
  newPointsBalance: number;
}