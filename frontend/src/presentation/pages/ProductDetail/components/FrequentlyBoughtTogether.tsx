/*
 * descripcion: Sección "Comprados Frecuentemente Juntos" de la página de detalle.
 * Bug fix incluido: navegación corregida a onNavigate('detail', id) en lugar
 * de onSelectProduct que no se pasaba desde App.tsx.
 */

import type { Product } from '../../../../domain/models';

interface FrequentlyBoughtTogetherProps {
  products: Product[];
  onNavigateToProduct: (productId: string) => void;
}

export function FrequentlyBoughtTogether({ products, onNavigateToProduct }: FrequentlyBoughtTogetherProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-custom-border">
      <h3 className="font-display-lg text-[24px] md:text-[32px] font-bold text-on-surface mb-6">
        Comprados Frecuentemente Juntos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateToProduct(item.id)}
            className="bg-custom-card border border-custom-border rounded-lg p-4 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group"
          >
            <div className="w-16 h-16 bg-custom-bg border border-custom-border rounded overflow-hidden shrink-0">
              <img
                alt={item.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                src={item.imageUrl}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-label-md text-[14px] text-on-surface line-clamp-1">{item.name}</div>
              <div className="font-price-display text-[16px] font-bold text-primary">
                ${item.price.toFixed(2)}
              </div>
            </div>
            {/* Botón de añadir rápido — evita propagación para no navegar también */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToProduct(item.id);
              }}
              className="w-8 h-8 rounded bg-custom-bg border border-custom-border flex items-center justify-center text-primary hover:bg-primary-container hover:text-black transition-colors shrink-0"
              title="Ver producto"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
