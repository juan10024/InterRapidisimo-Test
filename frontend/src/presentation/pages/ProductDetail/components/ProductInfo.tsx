/*
 * descripcion: Componente que muestra la información principal del producto:
 * nombre, precio, stock, selección de color, cantidad y botones de acción.
 */

import { useState } from 'react';
import type { Product } from '../../../../domain/models';

interface ProductInfoProps {
  product: Product;
  isProcessing: boolean;
  isWishlisted: boolean;
  onBuy: (quantity: number) => void;
  onFavorite: () => void;
}

const COLOR_OPTIONS = [
  { id: 0, color: 'bg-primary-container' },
  { id: 1, color: 'bg-[#ffb4ab]' },
  { id: 2, color: 'bg-[#c5c9da]' },
];

export function ProductInfo({ product, isProcessing, isWishlisted, onBuy, onFavorite }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);

  const isLowStock = product.stock <= 10;

  return (
    <div className="flex flex-col">
      {/* Encabezado: nombre, favorito, compartir */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-display-lg text-[32px] md:text-[48px] text-on-surface font-bold tracking-tight leading-none">
            {product.name}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={onFavorite}
              disabled={isProcessing}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
                isWishlisted
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-custom-bg border-custom-border hover:bg-surface-container-high text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isWishlisted ? 'material-symbols-fill' : ''}`}>
                favorite
              </span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-custom-bg border border-custom-border hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {/* Precio y stock */}
        <div className="flex items-center gap-4 mb-4">
          <div className="font-price-display text-[20px] font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
          <div className="px-2 py-1 bg-custom-bg border border-primary/30 rounded font-label-sm text-[12px] text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">stars</span>
            +50 PTS
          </div>
          <div className="font-label-sm text-[12px] text-on-surface-variant ml-auto">
            Stock:{' '}
            <span className={isLowStock ? 'text-custom-error font-bold' : 'text-on-surface'}>
              {isLowStock ? `Bajo (${product.stock})` : 'Disponible'}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-custom-border w-full mb-6" />

      {/* Selector de color */}
      <div className="mb-6">
        <h3 className="font-label-md text-[14px] text-on-surface-variant mb-2">Color de Interfaz</h3>
        <div className="flex gap-4">
          {COLOR_OPTIONS.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedColor(btn.id)}
              className={`w-12 h-12 rounded-lg border flex items-center justify-center bg-custom-bg transition-colors relative ${
                selectedColor === btn.id ? 'border-primary' : 'border-custom-border hover:border-on-surface-variant'
              }`}
            >
              <div className={`w-6 h-6 rounded-full ${btn.color}`} />
              {selectedColor === btn.id && (
                <div className={`absolute -top-1 -right-1 w-3 h-3 ${btn.color} rounded-full border border-custom-bg`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de cantidad */}
      <div className="mb-10">
        <h3 className="font-label-md text-[14px] text-on-surface-variant mb-2">Cantidad</h3>
        <div className="flex items-center gap-0 w-32 bg-custom-bg border border-custom-border rounded-lg h-12">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex-1 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors h-full border-r border-custom-border"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <div className="flex-1 flex items-center justify-center font-price-display text-[20px] font-bold text-on-surface h-full">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex-1 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors h-full border-l border-custom-border"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-4 mb-10">
        <button
          onClick={() => onBuy(quantity)}
          disabled={isProcessing || product.stock === 0}
          className="w-full py-4 px-6 bg-primary-container text-black font-display-lg text-[24px] md:text-[32px] font-bold rounded-lg hard-shadow hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex items-center justify-center gap-4 disabled:opacity-70"
        >
          <span className="material-symbols-outlined">shopping_cart_checkout</span>
          {isProcessing ? 'Procesando...' : product.stock === 0 ? 'Sin Stock' : 'Comprar y Ganar Puntos'}
        </button>
        <button className="w-full py-3 px-6 bg-transparent text-primary border border-custom-border hover:border-primary font-label-md text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2">
          Añadir a Lista de Solicitudes
        </button>
      </div>
    </div>
  );
}
