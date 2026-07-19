/*
 * descripcion: Página de detalle de producto. Orquesta el estado global
 * (carrito, wishlist, recompensas) y delega la UI a sub-componentes.
 */

import { useUserStore } from '../../../application/store/useUserStore';
import { useCartStore } from '../../../application/store/useCartStore';
import { useToastStore } from '../../../application/store/useToastStore';
import { useProductDetail } from './hooks/useProductDetail';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { ProductAccordions } from './components/ProductAccordions';
import { CartSidebar } from './components/CartSidebar';
import { FrequentlyBoughtTogether } from './components/FrequentlyBoughtTogether';
import { GamificationSidebar } from './components/GamificationSidebar';

interface Props {
  productId: string;
  onBack: () => void;
  onNavigate?: (page: 'catalog' | 'detail' | 'checkout', productId?: string | null) => void;
}

export function ProductDetailPage({ productId, onBack, onNavigate }: Props) {
  const { product, relatedProducts, isLoading, error } = useProductDetail(productId);

  const isProcessing = useUserStore(state => state.isProcessingReward);

  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);

  const showToast = useToastStore(state => state.showToast);

  const isWishlisted = product ? wishlist.some(p => p.id === product.id) : false;

  const handleBuy = (quantity: number) => {
    if (!product) return;
    addToCart(product, quantity);
    showToast(
      'Cargamento Actualizado',
      `Añadido: ${product.name} (x${quantity}) al cargamento de compra.`
    );
  };

  const handleFavorite = () => {
    if (!product) return;
    toggleWishlist(product);
    const isCurrentlyWishlisted = wishlist.some(p => p.id === product.id);
    showToast(
      isCurrentlyWishlisted ? 'Removido de Favoritos' : 'Añadido a Favoritos',
      isCurrentlyWishlisted
        ? `${product.name} fue removido de tu lista.`
        : `${product.name} fue añadido a tus favoritos.`
    );
  };

  return (
    <div className="bg-custom-bg text-on-surface font-body-md min-h-screen flex flex-col md:flex-row overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">

      {/* TopAppBar Mobile */}
      <header className="md:hidden sticky top-0 z-50 flex justify-between items-center px-4 py-2 w-full bg-surface-container-lowest shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
        <div className="font-display-lg text-[24px] font-bold text-primary tracking-tighter uppercase">OBSIDIAN</div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer text-[24px]">
            account_balance_wallet
          </span>
        </div>
      </header>

      {/* SideNavBar Desktop */}
      <nav className="hidden md:flex flex-col h-screen py-6 px-4 bg-surface border-r border-custom-border w-70 sticky top-0 shrink-0">
        <div className="mb-10 px-4">
          <h1 className="font-display-lg text-[32px] font-bold text-primary uppercase tracking-tighter leading-tight">
            Centro de Comando
          </h1>
          <p className="font-label-md text-[14px] text-on-surface-variant mt-2">Rango Élite</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <a onClick={onBack} className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-2 hover:bg-surface-container-high transition-colors duration-200 rounded cursor-pointer">
            <span className="material-symbols-outlined">grid_view</span>
            <span className="font-label-md text-[14px]">Panel de Control</span>
          </a>
          <a onClick={onBack} className="flex items-center gap-4 bg-primary-container text-on-primary-container border-r-4 border-primary px-4 py-2 translate-x-1 transition-transform duration-200 rounded cursor-pointer">
            <span className="material-symbols-outlined material-symbols-fill">shopping_bag</span>
            <span className="font-label-md text-[14px] font-bold">Catálogo</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-2 hover:bg-surface-container-high transition-colors duration-200 rounded" href="#">
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="font-label-md text-[14px]">Pedidos</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-2 hover:bg-surface-container-high transition-colors duration-200 rounded" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-md text-[14px]">Inventario</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-2 hover:bg-surface-container-high transition-colors duration-200 rounded" href="#">
            <span className="material-symbols-outlined">military_tech</span>
            <span className="font-label-md text-[14px]">Recompensas</span>
          </a>
          <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary px-4 py-2 hover:bg-surface-container-high transition-colors duration-200 rounded mt-auto mb-6" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-[14px]">Configuración</span>
          </a>
          <button className="w-full py-2 px-4 bg-transparent border border-custom-border text-primary font-label-md text-[14px] hover:bg-surface-container-high transition-colors duration-200 rounded">
            Mejorar Plan
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-label-md text-[14px] mb-10">
            <button onClick={onBack} className="hover:text-primary transition-colors">Catálogo</button>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            {product && (
              <>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  {product.category.toUpperCase()}
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </>
            )}
            <span className="text-on-surface">{product?.name ?? '...'}</span>
          </nav>

          {/* Loading / Error states */}
          {isLoading && (
            <div className="flex items-center gap-3 text-primary font-body-md py-20 justify-center">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Cargando producto...
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <span className="material-symbols-outlined text-[48px] text-custom-error">error</span>
              <p className="font-label-md text-[14px] text-on-surface-variant">{error}</p>
              <button onClick={onBack} className="text-primary hover:underline font-label-md text-[14px]">
                Volver al catálogo
              </button>
            </div>
          )}

          {/* Contenido principal del producto */}
          {product && !isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Columna Izquierda: Galería y Carrito */}
              <div className="flex flex-col gap-6">
                <ProductGallery product={product} />
                <CartSidebar onNavigateToCheckout={() => onNavigate?.('checkout')} />
              </div>

              {/* Columna Derecha: Info, Acordeones */}
              <div className="flex flex-col">
                <ProductInfo
                  product={product}
                  isProcessing={isProcessing}
                  isWishlisted={isWishlisted}
                  onBuy={handleBuy}
                  onFavorite={handleFavorite}
                />
                <ProductAccordions product={product} />
              </div>
            </div>
          )}

          {/* Sección: Comprados Frecuentemente Juntos */}
          {product && !isLoading && (
            <FrequentlyBoughtTogether
              products={relatedProducts}
              onNavigateToProduct={(id) => onNavigate?.('detail', id)}
            />
          )}
        </div>

        {/* Sidebar: Gamification Hub */}
        <GamificationSidebar />
      </main>

      {/* BottomNavBar Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-custom-bg border-t border-custom-border flex justify-around py-2 px-4 pb-safe z-50">
        <a onClick={onBack} className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary p-2 cursor-pointer">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="font-label-sm text-[10px]">Inicio</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-primary p-2" href="#">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="font-label-sm text-[10px]">Catálogo</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary p-2" href="#">
          <span className="material-symbols-outlined">military_tech</span>
          <span className="font-label-sm text-[10px]">Recompensas</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary p-2" href="#">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-[10px]">Perfil</span>
        </a>
      </nav>
      <div className="md:hidden h-18" />
    </div>
  );
}
