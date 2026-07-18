/*
 * propósito: Representar un usuario en el sistema.
 * contexto:  Entidad de dominio que representa un usuario con su email, saldo de puntos y fecha de actualización.
 */

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    private _pointsBalance: number, // Encapsulado para controlar mutaciones ilegales
    public readonly updatedAt: Date
  ) {}

  // Getter público para mantener el saldo inmutable desde fuera de la entidad
  public get pointsBalance(): number {
    return this._pointsBalance;
  }

  /*
   * Centraliza la lógica de negocio de gamificación. 
   * El dominio decide cómo impacta la recompensa.
   */
  public addRewardPoints(points: number): void {
    if (points <= 0) {
      throw new Error('La cantidad de puntos a otorgar debe ser mayor a cero.');
    }
    this._pointsBalance += points;
  }
}