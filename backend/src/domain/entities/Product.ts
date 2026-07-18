/*
 * propósito: Representar un producto en el sistema.
 * contexto:  Entidad de dominio que representa un producto con su precio, categoría, 
 *            URL de imagen y stock.
 */

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly category: string,
    public readonly imageUrl: string,
    public stock: number // Mutable porque el stock decrementa con compras/acciones
  ) {}

  public hasAvailableStock(quantity: number = 1): boolean {
    return this.stock >= quantity;
  }

  public decreaseStock(quantity: number = 1): void {
    if (!this.hasAvailableStock(quantity)) {
      throw new Error(`Stock insuficiente para el producto: ${this.name}`);
    }
    this.stock -= quantity;
  }
}