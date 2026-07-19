/*
 * descripcion: Este archivo contiene el componente de tarjeta de producto
 */

import { useUserStore } from '../../application/store/useUserStore';
import type { Product } from '../../domain/models';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const triggerRewardAction = useUserStore(state => state.triggerRewardAction);
  const isProcessing = useUserStore(state => state.isProcessingReward);

  const handleAdd = () => {
    triggerRewardAction(product.id, "ADD_TO_CART", `Agregó ${product.name.split(' ')[0]}`);
  };

  return (
    <div className="bg-custom-card border border-custom-border rounded-lg p-sm flex flex-col gap-sm group">
      <div className="relative w-full aspect-video border border-custom-border rounded overflow-hidden">
        <img 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={product.imageUrl} 
        />
        {product.stock <= 10 ? (
          <div className="absolute top-2 right-2 bg-custom-error text-white border border-custom-error px-2 py-1 rounded font-label-sm text-[12px]">Bajo Stock</div>
        ) : (
          <div className="absolute top-2 right-2 bg-custom-bg border border-custom-border px-2 py-1 rounded font-label-sm text-[12px]">Disponible</div>
        )}
      </div>
      <div>
        <h3 className="font-display-lg text-[18px] font-bold group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="font-body-md text-[12px] text-on-surface-variant mt-1">{product.category.toUpperCase()}</p>
      </div>
      <div className="flex justify-between items-end mt-auto pt-2 border-t border-custom-border">
        <span className="font-price-display text-[20px] text-primary">${product.price.toFixed(2)}</span>
        <button 
          onClick={handleAdd}
          disabled={isProcessing}
          className="bg-primary-container text-black font-label-md text-[12px] px-3 py-2 rounded hard-shadow flex items-center gap-1 font-bold transition-transform"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
          {isProcessing ? '...' : 'Agregar'}
        </button>
      </div>
    </div>
  );
}