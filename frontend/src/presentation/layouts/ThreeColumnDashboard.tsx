/*
 * descripcion: Este archivo contiene el componente de layout de tres columnas para el dashboard
 */

import { useEffect } from 'react';
import { useProductStore } from '../../application/store/useProductStore';
import { ProductCard } from '../components/ProductCard';
import { GamificationHub } from '../components/GamificationHub';

export function ThreeColumnDashboard() {
  const { products, isLoading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(1, 4);
  }, [fetchProducts]);

  return (
    <main className="flex-1 overflow-y-auto p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-lg bg-custom-bg text-on-surface min-h-screen">
      
      {/* Columna Izquierda: Filtros */}
      <div className="lg:col-span-3 flex flex-col gap-md">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            type="text" 
            placeholder="Search catalog..." 
            className="w-full bg-custom-bg border border-custom-border text-on-surface font-body-md pl-10 pr-3 py-2 rounded focus:border-primary focus:outline-none transition-colors placeholder:text-on-surface-variant" 
          />
        </div>
        <div className="bg-custom-card border border-custom-border rounded-lg p-sm">
          <h3 className="font-display-lg text-body-lg font-bold mb-sm">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <button className="bg-primary text-black font-label-md text-label-sm px-3 py-1 rounded">All</button>
            <button className="bg-custom-bg border border-custom-border font-label-md text-label-sm px-3 py-1 rounded">Peripherals</button>
          </div>
        </div>
      </div>

      {/* Columna Central: Catálogo */}
      <div className="lg:col-span-6 flex flex-col gap-md">
        <div className="flex justify-between items-center pb-2 border-b border-custom-border">
          <h1 className="font-display-lg text-headline-lg font-bold">Product Catalog</h1>
        </div>

        {isLoading && <div className="text-primary font-body-md">Loading products...</div>}
        {error && <div className="text-custom-error font-body-md">Error: {error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Columna Derecha: Hub Gamificación */}
      <div className="lg:col-span-3">
        <GamificationHub />
      </div>

    </main>
  );
}