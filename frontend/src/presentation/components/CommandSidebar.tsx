/*
 * descripcion: Navegación lateral compartida por catálogo, detalle y checkout.
 * Solo Catálogo y Carrito cambian de vista mientras las demás opciones son decorativas.
 */

import { useCartStore } from '../../application/store/useCartStore';

type Page = 'catalog' | 'detail' | 'checkout';

interface CommandSidebarProps {
  currentPage: Page;
  onNavigate: (page: 'catalog' | 'checkout') => void;
  className?: string;
}

const passiveItems = [
  { icon: 'grid_view', label: 'Panel de Control' },
  { icon: 'inventory_2', label: 'Inventario' },
  { icon: 'military_tech', label: 'Recompensas' },
  { icon: 'settings', label: 'Configuración' },
];

export function CommandSidebar({ currentPage, onNavigate, className = '' }: CommandSidebarProps) {
  const cartItems = useCartStore(state => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isCatalogActive = currentPage === 'catalog' || currentPage === 'detail';
  const isCheckoutActive = currentPage === 'checkout';

  const navigationClass = (isActive: boolean) => `w-full flex items-center gap-sm px-sm py-xs rounded font-label-md text-[14px] transition-colors ${
    isActive
      ? 'bg-primary-container text-on-primary-container border-r-4 border-primary font-bold'
      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
  }`;

  return (
    <aside className={`hidden md:flex w-64 shrink-0 flex-col bg-surface border-r border-outline-variant py-md px-sm ${className}`}>
      <div className="mb-lg px-sm">
        <h1 className="font-display-lg text-[22px] font-bold uppercase tracking-tight text-primary">Centro de Comando</h1>
        <p className="font-label-sm text-[12px] text-on-surface-variant mt-1">Rango Élite</p>
      </div>

      <nav aria-label="Navegación principal" className="flex flex-1 flex-col gap-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-sm px-sm py-xs font-label-md text-[14px] text-on-surface-variant" aria-disabled="true">
            <span className="material-symbols-outlined">{passiveItems[0].icon}</span>
            {passiveItems[0].label}
          </div>
          <button type="button" onClick={() => onNavigate('catalog')} className={navigationClass(isCatalogActive)}>
            <span className={`material-symbols-outlined ${isCatalogActive ? 'material-symbols-fill' : ''}`}>shopping_bag</span>
            Catálogo
          </button>
          <button type="button" onClick={() => onNavigate('checkout')} className={navigationClass(isCheckoutActive)}>
            <span className={`material-symbols-outlined ${isCheckoutActive ? 'material-symbols-fill' : ''}`}>shopping_cart</span>
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="ml-auto min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-[11px] font-bold text-on-primary-container">
                {cartCount}
              </span>
            )}
          </button>
          {passiveItems.slice(1, 3).map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-sm px-sm py-xs font-label-md text-[14px] text-on-surface-variant" aria-disabled="true">
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="mb-4 flex items-center gap-sm px-sm py-xs font-label-md text-[14px] text-on-surface-variant" aria-disabled="true">
            <span className="material-symbols-outlined">{passiveItems[3].icon}</span>
            {passiveItems[3].label}
          </div>
          <div className="border border-outline-variant px-sm py-xs text-center font-label-md text-[14px] text-primary">
            Mejorar Plan
          </div>
        </div>
      </nav>
    </aside>
  );
}
