/*
 * descripcion: Componente de galería de imágenes del producto.
 * Muestra la imagen principal con efecto hover y las miniaturas.
 */

import type { Product } from '../../../../domain/models';

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Imagen principal */}
      <div className="bg-custom-card border border-custom-border rounded-lg aspect-square overflow-hidden relative group cursor-crosshair hard-shadow">
        <img
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.imageUrl}
        />
        <div className="absolute top-4 right-4 bg-custom-bg/80 backdrop-blur-sm px-2 py-1 rounded border border-custom-border font-label-sm text-[12px] text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">view_in_ar</span> 3D
        </div>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-4">
        <button className="bg-custom-card border border-primary rounded-lg aspect-square overflow-hidden">
          <img alt="Vista principal" className="w-full h-full object-cover" src={product.imageUrl} />
        </button>
        <button className="bg-custom-card border border-custom-border hover:border-on-surface-variant rounded-lg aspect-square overflow-hidden transition-colors">
          <img alt="Vista alternativa" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src={product.imageUrl} />
        </button>
        <button className="bg-custom-card border border-custom-border hover:border-on-surface-variant rounded-lg aspect-square overflow-hidden transition-colors">
          <img alt="Vista adicional" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" src={product.imageUrl} />
        </button>
        <button className="bg-surface-container-highest border border-custom-border hover:border-on-surface-variant rounded-lg aspect-square overflow-hidden transition-colors flex items-center justify-center bg-surface-container-high group">
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">play_circle</span>
        </button>
      </div>
    </div>
  );
}
