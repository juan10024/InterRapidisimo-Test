/*
 * descripcion: Este archivo contiene el componente de layout de tres columnas para el dashboard
 */

import { useEffect, useState } from 'react';
import { useProductStore } from '../../application/store/useProductStore';
import { ProductCard } from '../components/ProductCard';
import { GamificationHub } from '../components/GamificationHub';
import { CommandSidebar } from '../components/CommandSidebar';

import { useCartStore } from '../../application/store/useCartStore';

interface Props {
  onSelectProduct: (productId: string) => void;
  onNavigate?: (page: 'catalog' | 'detail' | 'checkout', productId?: string | null) => void;
}

export function ThreeColumnDashboard({ onSelectProduct, onNavigate }: Props) {
  const { products, isLoading, fetchProducts } = useProductStore();
  const cartItems = useCartStore(state => state.cartItems);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts(1, 4, selectedCategory || undefined, debouncedSearchQuery || undefined);
  }, [fetchProducts, selectedCategory, debouncedSearchQuery]);

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
          {/* Botón de Carrito con indicador */}
          <button 
            onClick={() => onNavigate?.('checkout')}
            className="text-on-surface-variant hover:text-primary transition-colors relative flex items-center justify-center p-1 mr-1"
            title="Ver cargamento de compra"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-black font-bold font-label-sm text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-surface">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
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
        <CommandSidebar currentPage="catalog" onNavigate={(page) => onNavigate?.(page)} className="h-[calc(100vh-57px)] sticky top-14.25" />

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-lg">
          
          {/* Left Column: Search & Filters */}
          <div className="lg:col-span-3 flex flex-col gap-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="search-input" 
                placeholder="Buscar en el catálogo..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="bg-custom-card border border-custom-border rounded-lg p-sm">
              <h3 className="font-display-lg text-[18px] font-bold mb-sm">Categorías</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`${selectedCategory === null ? 'active-chip border-transparent' : 'inactive-chip border-custom-border hover:border-primary'} font-label-md text-[12px] px-3 py-1 rounded border transition-colors`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setSelectedCategory('perifericos')}
                  className={`${selectedCategory === 'perifericos' ? 'active-chip border-transparent' : 'inactive-chip border-custom-border hover:border-primary'} font-label-md text-[12px] px-3 py-1 rounded border transition-colors`}
                >
                  Periféricos
                </button>
                <button 
                  onClick={() => setSelectedCategory('pantallas')}
                  className={`${selectedCategory === 'pantallas' ? 'active-chip border-transparent' : 'inactive-chip border-custom-border hover:border-primary'} font-label-md text-[12px] px-3 py-1 rounded border transition-colors`}
                >
                  Pantallas
                </button>
                <button 
                  onClick={() => setSelectedCategory('muebles')}
                  className={`${selectedCategory === 'muebles' ? 'active-chip border-transparent' : 'inactive-chip border-custom-border hover:border-primary'} font-label-md text-[12px] px-3 py-1 rounded border transition-colors`}
                >
                  Muebles
                </button>
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
                <ProductCard key={product.id} product={product} onSelect={() => onSelectProduct(product.id)} />
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
