/*
 * descripcion: Este archivo contiene el componente de tarjeta de producto
 */

import { useUserStore } from '../../application/store/useUserStore';
import { useCartStore } from '../../application/store/useCartStore';
import type { Product } from '../../domain/models';

interface Props {
  product: Product;
  onSelect?: () => void;
}

export function ProductCard({ product, onSelect }: Props) {
  const isProcessing = useUserStore(state => state.isProcessingReward);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);

  const isFavorited = wishlist.some(p => p.id === product.id);

  const handleAdd = () => {
    addToCart(product, 1);
  };

  const handleFavorite = () => {
    toggleWishlist(product);
  };

  return (
    <div className="bg-custom-card border border-custom-border rounded-lg p-sm flex flex-col gap-sm group">
      {/* Imagen clickeable para navegar al detalle */}
      <div
        className="relative w-full aspect-video border border-custom-border rounded overflow-hidden cursor-pointer"
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect?.()}
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={product.imageUrl} 
        />
        {/* Botón de favorito sobre la imagen */}
        <button
          onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
          disabled={isProcessing}
          title={isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={`absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 ${
            isFavorited
              ? 'bg-primary/20 border-primary text-primary'
              : 'bg-custom-bg/60 border-custom-border text-on-surface-variant hover:border-primary hover:text-primary'
          }`}
        >
          <span className={`material-symbols-outlined text-[16px]! ${isFavorited ? 'material-symbols-fill' : ''}`}>
            favorite
          </span>
        </button>
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