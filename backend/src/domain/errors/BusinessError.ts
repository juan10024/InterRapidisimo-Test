/*
 * propósito: Representar errores de dominio/negocio esperados.
 * contexto:  Capa de dominio. Usada para distinguir fallos operativos (4xx)
 *            de errores internos del servidor (5xx) en el errorHandler.
 */

export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
