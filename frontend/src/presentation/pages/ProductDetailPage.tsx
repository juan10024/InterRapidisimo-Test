import { useState, useEffect } from 'react';
import { useUserStore } from '../../application/store/useUserStore';
import { useCartStore } from '../../application/store/useCartStore';
import { apiClient } from '../../infrastructure/api/apiClient';
import type { Product } from '../../domain/models';

interface Props {
  productId: string;
  onBack: () => void;
  onSelectProduct?: (productId: string) => void;
  onNavigate?: (page: 'catalog' | 'detail' | 'checkout', productId?: string | null) => void;
}

export function ProductDetailPage({ productId, onBack, onSelectProduct, onNavigate }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Estados locales para el Toast Notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerRewardAction = useUserStore(state => state.triggerRewardAction);
  const isProcessing = useUserStore(state => state.isProcessingReward);

  // Zustand Store de Carrito y Wishlist
  const cartItems = useCartStore(state => state.cartItems);
  const wishlist = useCartStore(state => state.wishlist);
  const toggleWishlist = useCartStore(state => state.toggleWishlist);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const isWishlisted = product ? wishlist.some(p => p.id === product.id) : false;

  useEffect(() => {
    setIsLoadingProduct(true);
    setFetchError(null);
    setRelatedProducts([]);
    apiClient.getProductById(productId)
      .then(res => {
        const prod = res.data.product;
        setProduct(prod);
        // Obtener productos de la misma categoría como recomendados
        return apiClient.getProducts(1, 10, prod.category);
      })
      .then(res => {
        // Filtrar el producto actual y tomar hasta 3
        const list = res.data.products.filter((p: Product) => p.id !== productId).slice(0, 3);
        
        // Si hay menos de 3, rellenar con productos de cualquier categoría
        if (list.length < 3) {
          apiClient.getProducts(1, 10).then(fallbackRes => {
            const extra = fallbackRes.data.products.filter(
              (p: Product) => p.id !== productId && !list.some(item => item.id === p.id)
            );
            setRelatedProducts([...list, ...extra].slice(0, 3));
          }).catch(() => {
            setRelatedProducts(list);
          });
        } else {
          setRelatedProducts(list);
        }
      })
      .catch(err => setFetchError(err.message))
      .finally(() => setIsLoadingProduct(false));
  }, [productId]);

  const handleBuy = () => {
    if (!product) return;
    addToCart(product, quantity);
    setToastMessage(`Añadido: ${product.name} (x${quantity}) al cargamento de compra.`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  const handleFavorite = () => {
    if (product) {
      toggleWishlist(product);
    }
  };

  const isLowStock = product ? product.stock <= 10 : false;

  return (
    <div className="bg-custom-bg text-on-surface font-body-md min-h-screen flex flex-col md:flex-row overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      
      {/* TopAppBar Mobile */}
      <header className="md:hidden sticky top-0 z-50 flex justify-between items-center px-4 py-2 w-full bg-surface-container-lowest shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
        <div className="font-display-lg text-[24px] font-bold text-primary tracking-tighter uppercase">OBSIDIAN</div>
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer text-[24px]">account_balance_wallet</span>
        </div>
      </header>

      {/* SideNavBar Desktop */}
      <nav className="hidden md:flex flex-col h-screen py-6 px-4 bg-surface border-r border-custom-border w-70 sticky top-0 shrink-0">
        <div className="mb-10 px-4">
          <h1 className="font-display-lg text-[32px] font-bold text-primary uppercase tracking-tighter leading-tight">Centro de Comando</h1>
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
            {product && <><span className="hover:text-primary transition-colors cursor-pointer">{product.category.toUpperCase()}</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span></>}
            <span className="text-on-surface">{product?.name ?? '...'}</span>
          </nav>

          {/* Loading / Error states */}
          {isLoadingProduct && (
            <div className="flex items-center gap-3 text-primary font-body-md py-20 justify-center">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Cargando producto...
            </div>
          )}
          {fetchError && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <span className="material-symbols-outlined text-[48px] text-custom-error">error</span>
              <p className="font-label-md text-[14px] text-on-surface-variant">{fetchError}</p>
              <button onClick={onBack} className="text-primary hover:underline font-label-md text-[14px]">Volver al catálogo</button>
            </div>
          )}

          {product && !isLoadingProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Columna Izquierda: Galería y Carrito */}
              <div className="flex flex-col gap-6">
                {/* Galería */}
                <div className="bg-custom-card border border-custom-border rounded-lg aspect-square overflow-hidden relative group cursor-crosshair hard-shadow">
                  <img alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.imageUrl} />
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

                {/* Carrito de Compra */}
                <div className="bg-custom-card border border-custom-border rounded-lg p-5 hard-shadow mt-2">
                  <h4 className="font-display-lg text-[18px] font-bold text-primary mb-3 flex items-center gap-2 uppercase tracking-tight">
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Cargamento de Compra
                  </h4>
                  {cartItems.length === 0 ? (
                    <p className="font-label-md text-[14px] text-on-surface-variant italic">El carrito de compras está vacío.</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="max-h-60 overflow-y-auto flex flex-col gap-2 pr-1">
                        {cartItems.map((item) => (
                          <div key={item.product.id} className="flex justify-between items-center bg-custom-bg p-2 rounded border border-custom-border text-on-surface-variant font-label-md text-[13px] gap-2">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <img className="w-8 h-8 object-cover rounded border border-custom-border shrink-0" src={item.product.imageUrl} alt={item.product.name} />
                              <span className="truncate text-on-surface font-semibold">{item.product.name}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-on-surface-variant">x{item.quantity}</span>
                              <span className="text-primary font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                              <button 
                                onClick={() => removeFromCart(item.product.id)} 
                                className="text-custom-error hover:text-red-500 transition-colors"
                                title="Eliminar ítem"
                              >
                                <span className="material-symbols-outlined text-[16px] flex items-center">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="h-px bg-custom-border"></div>
                      <div className="flex justify-between items-center font-label-md text-[14px] text-on-surface-variant">
                        <span>Total del Cargamento:</span>
                        <span className="font-bold text-primary text-[18px]">${cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => onNavigate?.('checkout')}
                        className="w-full py-3 bg-primary text-black font-bold font-display-lg text-[16px] uppercase tracking-wider rounded hover:bg-primary-container transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                        Proceder al Pago
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Columna Derecha: Detalles */}
              <div className="flex flex-col">
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-display-lg text-[32px] md:text-[48px] text-on-surface font-bold tracking-tight leading-none">{product.name}</h2>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleFavorite}
                        disabled={isProcessing}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 ${
                          isWishlisted 
                            ? 'bg-primary/20 border-primary text-primary' 
                            : 'bg-custom-bg border-custom-border hover:bg-surface-container-high text-on-surface-variant hover:text-primary'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${isWishlisted ? 'material-symbols-fill' : ''}`}>
                          favorite
                        </span>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-custom-bg border border-custom-border hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary">
                        <span className="material-symbols-outlined text-[20px]">share</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="font-price-display text-[20px] font-bold text-primary">${product.price.toFixed(2)}</div>
                    <div className="px-2 py-1 bg-custom-bg border border-primary/30 rounded font-label-sm text-[12px] text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      +50 PTS
                    </div>
                    <div className="font-label-sm text-[12px] text-on-surface-variant ml-auto">
                      Stock:{' '}
                      <span className={isLowStock ? 'text-custom-error font-bold' : 'text-on-surface'}>
                        {isLowStock ? `Bajo (${product.stock})` : 'Disponible'}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="border-custom-border w-full mb-6" />

                {/* Color */}
                <div className="mb-6">
                  <h3 className="font-label-md text-[14px] text-on-surface-variant mb-2">Color de Interfaz</h3>
                  <div className="flex gap-4">
                    {[{ id: 0, color: 'bg-primary-container' }, { id: 1, color: 'bg-[#ffb4ab]' }, { id: 2, color: 'bg-[#c5c9da]' }].map((btn) => (
                      <button key={btn.id} onClick={() => setSelectedColor(btn.id)}
                        className={`w-12 h-12 rounded-lg border flex items-center justify-center bg-custom-bg transition-colors relative ${selectedColor === btn.id ? 'border-primary' : 'border-custom-border hover:border-on-surface-variant'}`}>
                        <div className={`w-6 h-6 rounded-full ${btn.color}`}></div>
                        {selectedColor === btn.id && <div className={`absolute -top-1 -right-1 w-3 h-3 ${btn.color} rounded-full border border-custom-bg`}></div>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cantidad */}
                <div className="mb-10">
                  <h3 className="font-label-md text-[14px] text-on-surface-variant mb-2">Cantidad</h3>
                  <div className="flex items-center gap-0 w-32 bg-custom-bg border border-custom-border rounded-lg h-12">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors h-full border-r border-custom-border">
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <div className="flex-1 flex items-center justify-center font-price-display text-[20px] font-bold text-on-surface h-full">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors h-full border-l border-custom-border">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-4 mb-10">
                  <button onClick={handleBuy} disabled={isProcessing || product.stock === 0}
                    className="w-full py-4 px-6 bg-primary-container text-black font-display-lg text-[24px] md:text-[32px] font-bold rounded-lg hard-shadow hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex items-center justify-center gap-4 disabled:opacity-70">
                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                    {isProcessing ? 'Procesando...' : product.stock === 0 ? 'Sin Stock' : 'Comprar y Ganar Puntos'}
                  </button>
                  <button className="w-full py-3 px-6 bg-transparent text-primary border border-custom-border hover:border-primary font-label-md text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2">
                    Añadir a Lista de Solicitudes
                  </button>
                </div>

                {/* Acordeones */}
                <div className="flex flex-col border-t border-custom-border">
                  <details className="group border-b border-custom-border" open>
                    <summary className="flex justify-between items-center font-label-md text-[14px] text-on-surface py-4 cursor-pointer list-none">
                      <span>Especificaciones</span>
                      <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div className="pb-4 font-body-md text-[16px] text-on-surface-variant pt-2">
                      <ul className="flex flex-col gap-2">
                        <li className="flex justify-between"><span className="text-on-surface-variant">Categoría</span><span className="text-on-surface font-medium">{product.category}</span></li>
                        <li className="flex justify-between"><span className="text-on-surface-variant">Stock disponible</span><span className={`font-medium ${isLowStock ? 'text-custom-error' : 'text-on-surface'}`}>{product.stock} unidades</span></li>
                        <li className="flex justify-between"><span className="text-on-surface-variant">ID del producto</span><span className="text-on-surface font-medium text-[11px] font-mono">{product.id}</span></li>
                      </ul>
                    </div>
                  </details>
                  <details className="group border-b border-custom-border">
                    <summary className="flex justify-between items-center font-label-md text-[14px] text-on-surface py-4 cursor-pointer list-none hover:text-primary transition-colors">
                      <span>Descripción y Contexto</span>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors group-open:rotate-180">expand_more</span>
                    </summary>
                    <div className="pb-4 font-body-md text-[16px] text-on-surface-variant pt-2 group-open:block">
                      Producto de alta calidad en la categoría {product.category}. Diseñado para usuarios que exigen rendimiento y confiabilidad en cada operación.
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* Frecuentemente comprados juntos */}
          {product && !isLoadingProduct && relatedProducts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-custom-border">
              <h3 className="font-display-lg text-[24px] md:text-[32px] font-bold text-on-surface mb-6">Comprados Frecuentemente Juntos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedProducts.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => onSelectProduct?.(item.id)}
                    className="bg-custom-card border border-custom-border rounded-lg p-4 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-custom-bg border border-custom-border rounded overflow-hidden shrink-0">
                      <img alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src={item.imageUrl} />
                    </div>
                    <div className="flex-1">
                      <div className="font-label-md text-[14px] text-on-surface line-clamp-1">{item.name}</div>
                      <div className="font-price-display text-[16px] font-bold text-primary">${item.price.toFixed(2)}</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerRewardAction(item.id, "ADD_TO_CART", `Agregó ${item.name.split(' ')[0]}`);
                      }}
                      disabled={isProcessing}
                      className="w-8 h-8 rounded bg-custom-bg border border-custom-border flex items-center justify-center text-primary hover:bg-primary-container hover:text-black transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Gamification Hub */}
        <aside className="w-full md:w-80 bg-custom-bg border-l border-custom-border p-4 flex flex-col gap-4 shrink-0">
          <div className="bg-custom-card border border-custom-border rounded-lg p-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-custom-border opacity-50 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">military_tech</span>
            </div>
            <div className="relative z-10">
              <div className="font-label-sm text-[12px] text-on-surface-variant mb-1 uppercase tracking-widest">Rango Actual</div>
              <div className="font-display-lg text-[24px] font-bold text-primary mb-6">Cyber-Merc</div>
              <div className="flex justify-between items-end mb-1">
                <div className="font-label-sm text-[12px] text-on-surface">XP al Siguiente Nivel</div>
                <div className="font-price-display text-[14px] text-primary">8,450 / 10,000</div>
              </div>
              <div className="flex gap-1 h-2 mb-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 bg-primary rounded-sm"></div>)}
                <div className="flex-1 bg-custom-border rounded-sm"></div>
              </div>
            </div>
          </div>

          <div className="bg-custom-card border border-custom-border rounded-lg p-4 flex flex-col gap-2">
            <div className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">radar</span> Potencial de Compra
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-on-surface font-medium">PTS Base</span>
              <span className="font-price-display text-[16px] text-primary">+50</span>
            </div>
            <div className="flex items-center justify-between border-t border-custom-border pt-2 mt-2 bg-primary-container/10 -mx-4 px-4 pb-4 rounded-b-lg">
              <span className="text-primary-container font-bold">Total Estimado</span>
              <span className="font-price-display text-[20px] text-primary-container font-bold">+50 PTS</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <h4 className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-widest mb-2">Objetivos Activos</h4>
            <div className="bg-transparent border border-custom-border rounded p-2 flex items-start gap-4">
              <div className="w-8 h-8 rounded bg-custom-card border border-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[18px]">shopping_cart_checkout</span>
              </div>
              <div>
                <div className="font-label-md text-[14px] text-on-surface">Primera Compra</div>
                <div className="text-[12px] text-on-surface-variant mt-1">Completa tu primera compra</div>
                <div className="font-label-sm text-[12px] text-primary mt-1">+50 PTS de Recompensa</div>
              </div>
            </div>
            <div className="bg-transparent border border-custom-border rounded p-2 flex items-start gap-4 opacity-60">
              <div className="w-8 h-8 rounded bg-custom-card border border-custom-border flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">shopping_bag</span>
              </div>
              <div>
                <div className="font-label-md text-[14px] text-on-surface">Gran Comprador</div>
                <div className="text-[12px] text-on-surface-variant mt-1">Gasta más de $1000 en un pedido</div>
                <div className="font-label-sm text-[12px] text-on-surface-variant mt-1">Bloqueado</div>
              </div>
            </div>
          </div>
        </aside>
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
      <div className="md:hidden h-18"></div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-9999 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-surface border border-primary text-on-surface p-4 rounded-lg hard-shadow shadow-[6px_6px_0px_rgba(0,229,163,0.3)] flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
            <div className="flex flex-col">
              <span className="font-label-md text-[14px] font-bold text-primary uppercase tracking-wider">Cargamento Actualizado</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant">{toastMessage}</span>
            </div>
            <button onClick={() => setShowToast(false)} className="text-on-surface-variant hover:text-primary transition-colors ml-2">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}