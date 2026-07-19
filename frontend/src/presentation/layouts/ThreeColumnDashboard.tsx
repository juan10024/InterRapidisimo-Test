/*
 * descripcion: Este archivo contiene el componente de layout de tres columnas para el dashboard
 */

import { useEffect } from 'react';
import { useProductStore } from '../../application/store/useProductStore';
import { ProductCard } from '../components/ProductCard';
import { GamificationHub } from '../components/GamificationHub';

export function ThreeColumnDashboard() {
  const { products, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(1, 4);
  }, [fetchProducts]);

  return (
    <>
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-margin-desktop py-xs w-full bg-surface-container-lowest border-b border-outline-variant shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-md">
          <span className="font-display-lg text-[32px] leading-[1.2] font-bold text-primary">OBSIDIAN</span>
          <nav className="hidden md:flex gap-md">
            <a className="text-on-surface-variant hover:text-primary pb-1 font-label-md text-[14px] transition-colors" href="#">Mercado</a>
            <a className="text-on-surface-variant hover:text-primary pb-1 font-label-md text-[14px] transition-colors" href="#">Subastas</a>
            <a className="text-on-surface-variant hover:text-primary pb-1 font-label-md text-[14px] transition-colors" href="#">Bóveda</a>
          </nav>
        </div>
        <div className="flex items-center gap-md">
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </button>
          <button className="bg-primary-container text-black font-label-md text-[14px] px-sm py-xs rounded hard-shadow font-bold">
            Conectar Billetera
          </button>
          <img alt="Perfil de Usuario" className="w-8 h-8 rounded-full border border-custom-border object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdVghmKwFiOC3pjD5YrCduhHYsn0yffaaBaJEDgqqDwb739j2vITBuyQYMMK4KVWk0YDR3XF1CRO7wrwrVj8oPUkr9ZExBMJ0GkiyzhlAhAZSU-lE-gz_LTzI7hT_GApHzvYpjgdWEB6gNAuimdv515vakgjL8bRtfzkRy4bNgBqIgIwOVO5sDHdKLDkoL2Wj_yCTDm6_Ivm52EIO7vXyvLa0vVSRkmZSKdNGudTxZvswPM2GQAey0" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar - Centro de Comando */}
        <aside className="w-64 h-full border-r border-outline-variant bg-surface hidden md:flex flex-col py-md px-sm">
          <div className="mb-lg px-sm">
            <h2 className="font-display-lg text-[18px] font-bold text-primary">Centro de Comando</h2>
            <p className="font-label-sm text-[12px] text-on-surface-variant mt-1">Rango Élite</p>
          </div>
          <nav className="flex-1 flex flex-col gap-1">
            <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs font-label-md text-[14px] hover:bg-surface-container-high transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">grid_view</span> Panel de Control
            </a>
            <a className="flex items-center gap-sm bg-primary-container text-on-primary-container border-r-4 border-primary px-sm py-xs font-label-md text-[14px] translate-x-1 transition-transform duration-200" href="#">
              <span className="material-symbols-outlined material-symbols-fill">shopping_bag</span> Catálogo
            </a>
            <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs font-label-md text-[14px] hover:bg-surface-container-high transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">receipt_long</span> Pedidos
            </a>
            <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs font-label-md text-[14px] hover:bg-surface-container-high transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">inventory_2</span> Inventario
            </a>
            <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs font-label-md text-[14px] hover:bg-surface-container-high transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">military_tech</span> Recompensas
            </a>
            <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs font-label-md text-[14px] hover:bg-surface-container-high transition-colors duration-200" href="#">
              <span className="material-symbols-outlined">settings</span> Configuración
            </a>
          </nav>
          <div className="mt-auto px-sm pt-md">
            <button className="w-full bg-transparent border border-custom-border text-primary font-label-md text-[14px] py-xs rounded hover:border-primary transition-colors">Mejorar Plan</button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-lg">
          
          {/* Left Column: Search & Filters */}
          <div className="lg:col-span-3 flex flex-col gap-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="search-input" placeholder="Buscar en el catálogo..." type="text" />
            </div>
            <div className="bg-custom-card border border-custom-border rounded-lg p-sm">
              <h3 className="font-display-lg text-[18px] font-bold mb-sm">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                <button className="active-chip font-label-md text-[12px] px-3 py-1 rounded border border-transparent transition-colors">Todos</button>
                <button className="inactive-chip font-label-md text-[12px] px-3 py-1 rounded border border-custom-border hover:border-primary transition-colors">Periféricos</button>
                <button className="inactive-chip font-label-md text-[12px] px-3 py-1 rounded border border-custom-border hover:border-primary transition-colors">Pantallas</button>
                <button className="inactive-chip font-label-md text-[12px] px-3 py-1 rounded border border-custom-border hover:border-primary transition-colors">Muebles</button>
              </div>
            </div>
          </div>

          {/* Center Column: Catalog Grid */}
          <div className="lg:col-span-6 flex flex-col gap-md">
            <div className="flex justify-between items-center pb-2 border-b border-custom-border">
              <h1 className="font-display-lg text-[32px] font-bold">Catálogo de Productos</h1>
              <span className="font-label-sm text-[12px] text-on-surface-variant">Mostrando {products.length} productos</span>
            </div>
            
            {isLoading && <div className="text-primary font-body-md">Iniciando conexión...</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Right Column: Gamification Hub */}
          <div className="lg:col-span-3 flex flex-col gap-md">
             <GamificationHub />
          </div>
        </main>
      </div>
    </>
  );
}