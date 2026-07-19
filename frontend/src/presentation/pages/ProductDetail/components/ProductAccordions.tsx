/*
 * descripcion: Componente de acordeones de especificaciones y descripción del producto.
 */

import type { Product } from '../../../../domain/models';

interface ProductAccordionsProps {
  product: Product;
}

export function ProductAccordions({ product }: ProductAccordionsProps) {
  const isLowStock = product.stock <= 10;

  return (
    <div className="flex flex-col border-t border-custom-border">
      <details className="group border-b border-custom-border" open>
        <summary className="flex justify-between items-center font-label-md text-[14px] text-on-surface py-4 cursor-pointer list-none">
          <span>Especificaciones</span>
          <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
            expand_more
          </span>
        </summary>
        <div className="pb-4 font-body-md text-[16px] text-on-surface-variant pt-2">
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between">
              <span className="text-on-surface-variant">Categoría</span>
              <span className="text-on-surface font-medium">{product.category}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-on-surface-variant">Stock disponible</span>
              <span className={`font-medium ${isLowStock ? 'text-custom-error' : 'text-on-surface'}`}>
                {product.stock} unidades
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-on-surface-variant">ID del producto</span>
              <span className="text-on-surface font-medium text-[11px] font-mono">{product.id}</span>
            </li>
          </ul>
        </div>
      </details>

      <details className="group border-b border-custom-border">
        <summary className="flex justify-between items-center font-label-md text-[14px] text-on-surface py-4 cursor-pointer list-none hover:text-primary transition-colors">
          <span>Descripción y Contexto</span>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors group-open:rotate-180">
            expand_more
          </span>
        </summary>
        <div className="pb-4 font-body-md text-[16px] text-on-surface-variant pt-2">
          Producto de alta calidad en la categoría {product.category}. Diseñado para usuarios que
          exigen rendimiento y confiabilidad en cada operación.
        </div>
      </details>
    </div>
  );
}
