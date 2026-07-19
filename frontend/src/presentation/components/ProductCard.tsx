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
    triggerRewardAction(product.id, "ADD_TO_CART", `Purchased ${product.name.split(' ')[0]}`);
  };

  return (
    <div className="bg-custom-card border border-custom-border rounded-lg p-sm flex flex-col gap-sm group">
      <div className="relative w-full aspect-video border border-custom-border rounded overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {product.stock <= 10 && (
          <div className="absolute top-2 right-2 bg-custom-error text-white border border-custom-error px-2 py-1 rounded font-label-sm text-label-sm">
            Low Stock
          </div>
        )}
      </div>
      <div>
        <h3 className="font-display-lg text-body-lg font-bold group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-body-md text-label-sm text-on-surface-variant mt-1">
          {product.category.toUpperCase()}
        </p>
      </div>
      <div className="flex justify-between items-end mt-auto pt-2 border-t border-custom-border">
        <span className="font-price-display text-price-display text-primary">
          ${product.price.toFixed(2)}
        </span>
        <button 
          onClick={handleAdd}
          disabled={isProcessing}
          className="bg-primary-container text-black font-label-md text-label-sm px-3 py-2 rounded hard-shadow flex items-center gap-1 font-bold hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
          {isProcessing ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
}