/*
 * descripcion: Este archivo contiene la pagina de Checkout de la aplicacion
 */

import { useState } from 'react';
import { useCartStore } from '../../application/store/useCartStore';
import { useUserStore } from '../../application/store/useUserStore';

interface Props {
  onNavigate?: (page: 'catalog' | 'detail' | 'checkout', productId?: string | null) => void;
}

export function CheckoutPage({ onNavigate }: Props) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'quantum'>('standard');

  const cartItems = useCartStore(state => state.cartItems);
  const clearCart = useCartStore(state => state.clearCart);
  
  const triggerRewardAction = useUserStore(state => state.triggerRewardAction);
  const points = useUserStore(state => state.points);
  const level = useUserStore(state => state.level);

  // Cálculos dinámicos
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'standard' ? 15.00 : 45.00;
  const total = subtotal + shippingFee;

  // Rendimiento de puntos para prueba 50 PTS por cada cantidad de producto en el carrito
  const projectedYield = cartItems.reduce((acc, item) => acc + (50 * item.quantity), 0);

  const handleFinalizeOrder = () => {
    if (cartItems.length === 0) {
      alert("El cargamento está vacío. Agrega productos antes de autorizar la transferencia.");
      return;
    }

    // Ejecutar la acción de compra para cada producto en el carrito
    cartItems.forEach(item => {
      triggerRewardAction(item.product.id, "PURCHASE", `Compró ${item.product.name.split(' ')[0]} x${item.quantity}`);
    });

    alert("¡Compra exitosa! Puntos de recompensa y XP agregados a tu perfil.");
    
    // Limpiar carrito y navegar de regreso al catálogo
    clearCart();
    onNavigate?.('catalog');
  };

  return (
    <div className="bg-background text-on-surface h-screen w-full flex overflow-hidden selection:bg-primary selection:text-on-primary-fixed">
      {/* Sidebar - Centro de Comando */}
      <aside className="h-screen w-64 border-r border-outline-variant bg-surface flex flex-col py-md px-sm md:flex shrink-0">
        <div className="mb-xl px-sm">
          <h1 className="font-display-lg text-[22px] text-primary uppercase tracking-tighter font-bold">Centro de Comando</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Rango Élite</p>
        </div>
        <nav className="flex-1 space-y-xs">
          <a onClick={() => onNavigate?.('catalog')} className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs hover:bg-surface-container-high transition-colors duration-200 group cursor-pointer">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-200">grid_view</span>
            <span className="font-label-md text-label-md">Panel de Control</span>
          </a>
          <a onClick={() => onNavigate?.('catalog')} className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs hover:bg-surface-container-high transition-colors duration-200 group cursor-pointer">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-200">shopping_bag</span>
            <span className="font-label-md text-label-md">Catálogo</span>
          </a>
          <a className="flex items-center gap-sm bg-primary-container text-on-primary-container border-r-4 border-primary px-sm py-xs group rounded" href="#">
            <span className="material-symbols-outlined translate-x-1 transition-transform duration-200" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
            <span className="font-label-md text-label-md font-bold">Carrito y Pago</span>
          </a>
          <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs hover:bg-surface-container-high transition-colors duration-200 group" href="#">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-200">receipt_long</span>
            <span className="font-label-md text-label-md">Pedidos</span>
          </a>
          <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs hover:bg-surface-container-high transition-colors duration-200 group" href="#">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-200">inventory_2</span>
            <span className="font-label-md text-label-md">Inventario</span>
          </a>
          <a className="flex items-center gap-sm text-on-surface-variant hover:text-primary px-sm py-xs hover:bg-surface-container-high transition-colors duration-200 group" href="#">
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform duration-200">military_tech</span>
            <span className="font-label-md text-label-md">Recompensas</span>
          </a>
        </nav>
        <div className="mt-auto pt-md">
          <button className="w-full py-xs px-sm border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-center gap-xs">
            Mejorar Plan
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-margin-desktop py-xs w-full bg-surface-container-lowest border-b border-outline-variant shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-md">
            <span onClick={() => onNavigate?.('catalog')} className="font-display-lg text-headline-lg font-bold text-primary cursor-pointer">OBSIDIAN</span>
            <nav className="hidden lg:flex items-center gap-sm ml-lg">
              <a onClick={() => onNavigate?.('catalog')} className="font-label-md text-label-md text-on-surface-variant hover:text-primary pb-1 hover:bg-surface-container-highest transition-all px-xs cursor-pointer">Mercado</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary pb-1 hover:bg-surface-container-highest transition-all px-xs" href="#">Subastas</a>
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary pb-1 hover:bg-surface-container-highest transition-all px-xs" href="#">Bóveda</a>
            </nav>
          </div>
          <div className="flex items-center gap-md">
            <div className="hidden md:flex items-center bg-surface-container px-sm py-xs border border-outline-variant rounded">
              <span className="material-symbols-outlined text-on-surface-variant mr-xs text-[20px]">search</span>
              <input className="bg-transparent border-none text-body-md font-body-md placeholder:text-on-surface-variant focus:ring-0 w-48 outline-none" placeholder="Buscar en la red..." type="text"/>
            </div>
            <div className="flex items-center gap-sm">
              <button className="text-on-surface-variant hover:text-primary transition-colors p-xs rounded hover:bg-surface-container-high">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-primary transition-colors p-xs rounded bg-surface-container-high border border-outline-variant shadow-[2px_2px_0px_rgba(0,229,163,0.2)]">
                <span className="material-symbols-outlined font-[FILL]">shopping_cart</span>
              </button>
            </div>
            <button className="bg-primary-container text-on-primary-fixed font-label-md text-label-md px-md py-xs rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all active:translate-y-0 active:translate-x-0 active:shadow-none whitespace-nowrap">
              Conectar Billetera
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-margin-desktop flex flex-col xl:flex-row gap-lg">
          <div className="flex-1 max-w-5xl flex flex-col gap-lg">
            
            {/* Progress Stepper */}
            <div className="w-full flex items-center justify-between border-b border-outline-variant pb-md relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-surface-container-highest -z-10"></div>
              
              <div className="flex flex-col items-center gap-xs bg-background px-sm cursor-pointer" onClick={() => setCurrentStep(1)}>
                <div className={`w-8 h-8 rounded border flex items-center justify-center font-label-md text-label-md transition-colors ${currentStep >= 1 ? 'border-primary bg-primary-container text-on-primary-container shadow-[2px_2px_0px_rgba(0,0,0,0.4)]' : 'border-outline-variant bg-surface-container text-on-surface-variant'}`}>1</div>
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${currentStep >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>Carrito</span>
              </div>
              
              <div className={`flex flex-col items-center gap-xs bg-background px-sm ${currentStep >= 2 ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => currentStep >= 2 && setCurrentStep(2)}>
                <div className={`w-8 h-8 rounded border flex items-center justify-center font-label-md text-label-md transition-colors ${currentStep >= 2 ? 'border-primary bg-primary-container text-on-primary-container shadow-[2px_2px_0px_rgba(0,0,0,0.4)]' : 'border-outline-variant bg-surface-container text-on-surface-variant'}`}>2</div>
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${currentStep >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>Envío</span>
              </div>
              
              <div className={`flex flex-col items-center gap-xs bg-background px-sm ${currentStep === 3 ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <div className={`w-8 h-8 rounded border flex items-center justify-center font-label-md text-label-md transition-colors ${currentStep === 3 ? 'border-primary bg-primary-container text-on-primary-container shadow-[2px_2px_0px_rgba(0,0,0,0.4)]' : 'border-outline-variant bg-surface-container text-on-surface-variant'}`}>3</div>
                <span className={`font-label-sm text-label-sm uppercase tracking-wider ${currentStep === 3 ? 'text-primary' : 'text-on-surface-variant'}`}>Pago</span>
              </div>
            </div>

            {/* Dynamic Views based on Step */}
            {currentStep === 1 && <CartView onNext={() => setCurrentStep(2)} cartItems={cartItems} subtotal={subtotal} shippingFee={shippingFee} total={total} />}
            {currentStep === 2 && <ShippingView onNext={() => setCurrentStep(3)} shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} />}
            {currentStep === 3 && <PaymentView onComplete={handleFinalizeOrder} total={total} />}

          </div>

          {/* Right Sidebar - Telemetry Hub */}
          <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-lg">
            <div className="border border-outline-variant bg-surface-container rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-sm opacity-20 pointer-events-none">
                <span className="material-symbols-outlined text-[100px] text-primary">hexagon</span>
              </div>
              <h3 className="font-display-lg text-headline-lg-mobile text-on-surface mb-xs relative z-10 font-bold uppercase tracking-tight">Hub de Telemetría</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md relative z-10">Estado actual de la operación y rendimientos de XP.</p>
              
              <div className="flex flex-col gap-sm relative z-10">
                <div className="bg-surface border border-outline-variant p-sm rounded flex justify-between items-center">
                  <span className="font-label-md text-label-md text-on-surface-variant">Rango Actual</span>
                  <span className="font-label-md text-label-md text-primary bg-primary-container/10 px-xs py-0.5 border border-primary/30 rounded font-bold uppercase">Cyber-Merc</span>
                </div>
                <div className="bg-surface border border-outline-variant p-sm rounded flex flex-col gap-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-label-md text-label-md text-on-surface-variant">Puntos Totales</span>
                    <span className="font-price-display text-[18px] text-on-surface font-bold">{points} PTS</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 flex gap-1 h-2 bg-surface-container-highest rounded-sm overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(points % 10000) / 100}%` }}></div>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Nivel {level}</span>
                  </div>
                </div>
                <div className="bg-surface border border-primary/50 p-sm rounded flex flex-col gap-xs shadow-[2px_2px_0px_rgba(0,229,163,0.2)]">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Rendimiento Proyectado
                  </span>
                  <div className="flex justify-between items-baseline">
                    <span className="font-body-sm text-body-md text-on-surface-variant">De esta transacción:</span>
                    <span className="font-price-display text-[24px] text-primary font-bold">+{projectedYield} PTS</span>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Suficiente para asegurar ascenso de rango táctico.</p>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

/* --- VISTAS INTERNAS DEL FLUJO --- */

interface CartViewProps {
  onNext: () => void;
  cartItems: any[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

function CartView({ onNext, cartItems, subtotal, shippingFee, total }: CartViewProps) {
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-lg font-bold uppercase tracking-tight text-primary">Cargamento en Tránsito</h2>
      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
        {/* Table Header */}
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-sm p-sm border-b border-outline-variant bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
          <div>Designación de Ítem</div>
          <div className="text-right">Precio Unitario</div>
          <div className="text-right">Rendimiento</div>
          <div className="text-center">Cant</div>
          <div className="text-right">Total</div>
        </div>
        {/* Items */}
        <div className="flex flex-col">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant italic font-label-md">
              No hay elementos cargados en el carrito de compras.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-sm p-sm items-center border-b border-outline-variant hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-md min-w-0">
                  <div className="w-16 h-16 rounded border border-outline-variant overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-lg text-body-lg text-on-surface font-bold truncate">{item.product.name}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase truncate">Clase: {item.product.category}</span>
                  </div>
                </div>
                <div className="text-right font-price-display text-price-display text-on-surface font-semibold">${item.product.price.toFixed(2)}</div>
                <div className="text-right flex items-center justify-end gap-xs text-primary">
                  <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  <span className="font-label-md text-label-md font-bold">+{50 * item.quantity} PTS</span>
                </div>
                <div className="flex justify-center items-center gap-xs">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-colors bg-surface-container font-bold"
                  >
                    -
                  </button>
                  <span className="font-label-md text-label-md w-6 text-center text-on-surface">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-colors bg-surface-container font-bold"
                  >
                    +
                  </button>
                </div>
                <div className="text-right font-price-display text-price-display text-on-surface font-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="p-sm bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant">
          <div className="flex items-center gap-sm w-1/2">
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md text-body-md w-full px-sm py-xs rounded" placeholder="Código de Descuento..." type="text"/>
            <button className="border border-primary text-primary font-label-md text-label-md px-md py-xs rounded hover:bg-primary-container hover:text-on-primary-container transition-colors whitespace-nowrap font-bold uppercase">Aplicar</button>
          </div>
        </div>
      </div>
      {/* Subtotal Box */}
      <div className="flex justify-end mt-sm">
        <div className="w-full max-w-md border border-outline-variant bg-surface-container rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-sm">
          <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
            <span>Subtotal</span>
            <span className="font-price-display font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
            <span>Tarifa de Enrutamiento</span>
            <span className="font-price-display font-semibold">${shippingFee.toFixed(2)}</span>
          </div>
          <div className="h-px w-full bg-outline-variant my-xs"></div>
          <div className="flex justify-between items-center">
            <span className="font-display-lg text-headline-lg text-on-surface font-bold uppercase tracking-tight">Total</span>
            <div className="flex items-baseline gap-xs">
              <span className="font-label-md text-label-md text-primary align-super">USD</span>
              <span className="font-display-lg text-[32px] text-primary font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={onNext} 
            disabled={cartItems.length === 0}
            className="mt-md w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-sm rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-center gap-sm uppercase tracking-wider font-bold text-[16px] disabled:opacity-50"
          >
            <span>Iniciar Secuencia de Pago</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ShippingViewProps {
  onNext: () => void;
  shippingMethod: 'standard' | 'quantum';
  setShippingMethod: (method: 'standard' | 'quantum') => void;
}

function ShippingView({ onNext, shippingMethod, setShippingMethod }: ShippingViewProps) {
  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-l font-bold uppercase tracking-tight text-primary">Logística y Coordenadas de Destino</h2>
      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-md">
        
        <div className="grid grid-cols-2 gap-md">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Nombre del Operativo</label>
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="Tu nombre" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Apellido del Operativo</label>
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="Tu apellido" type="text" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Sector de la Cuadrícula (Dirección)</label>
          <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="Ej. Sector 7G, Bloque 4" type="text" />
        </div>

        <div className="grid grid-cols-3 gap-md">
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Ciudad / Central</label>
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="Nombre de la ciudad" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Código Postal</label>
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="000000" type="text" />
          </div>
        </div>

        <hr className="border-outline-variant my-2" />
        
        <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-2 font-bold">Seleccionar Método de Enrutamiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <label 
            onClick={() => setShippingMethod('standard')}
            className={`flex items-center gap-4 border p-sm rounded cursor-pointer group transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface'}`}
          >
            <input type="radio" name="shipping" className="w-4 h-4 text-primary bg-surface border-primary focus:ring-primary focus:ring-offset-background" checked={shippingMethod === 'standard'} readOnly />
            <div className="flex-1">
              <div className="font-label-md text-label-md text-on-surface flex justify-between font-bold">
                <span>Entrega Estándar</span>
                <span className="text-primary">$15.00</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">3-5 Ciclos Orbitales</div>
            </div>
          </label>
          <label 
            onClick={() => setShippingMethod('quantum')}
            className={`flex items-center gap-4 border p-sm rounded cursor-pointer transition-all ${shippingMethod === 'quantum' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface hover:border-primary/50'}`}
          >
            <input type="radio" name="shipping" className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary focus:ring-offset-background" checked={shippingMethod === 'quantum'} readOnly />
            <div className="flex-1">
              <div className="font-label-md text-label-md text-on-surface flex justify-between font-bold">
                <span>Envío Cuántico</span>
                <span className="text-primary">$45.00</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Siguiente Ciclo Garantizado</div>
            </div>
          </label>
        </div>

        <div className="flex justify-end mt-md">
          <button onClick={onNext} className="w-full md:w-auto bg-primary-container text-on-primary-container font-label-md text-label-md py-sm px-xl rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-center gap-sm uppercase tracking-wider font-bold">
            Confirmar Coordenadas <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface PaymentViewProps {
  onComplete: () => void;
  total: number;
}

function PaymentView({ onComplete, total }: PaymentViewProps) {
  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-lg  font-bold uppercase tracking-tight text-primary">Transacción Segura</h2>
      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-md">
        
        <div className="flex gap-4 mb-2">
          <button className="flex-1 py-xs px-sm border border-primary bg-primary-container/10 text-primary font-label-md text-label-md rounded flex items-center justify-center gap-2 font-bold">
            <span className="material-symbols-outlined text-[18px]">credit_card</span> Token de Crédito
          </button>
          <button className="flex-1 py-xs px-sm border border-outline-variant bg-surface text-on-surface-variant hover:text-on-surface hover:border-on-surface font-label-md text-label-md rounded flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span> Billetera Cripto
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Número de Tarjeta</label>
          <div className="relative">
            <input className="w-full bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded tracking-widest" placeholder="0000 0000 0000 0000" type="text" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">contactless</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Vencimiento</label>
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="MM/AA" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Código de Seguridad</label>
            <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="CVC" type="password" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Nombre en la Tarjeta</label>
          <input className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded" placeholder="Se requiere coincidencia exacta de identidad" type="text" />
        </div>

        <div className="bg-surface border border-outline-variant p-sm rounded mt-2 flex items-start gap-sm">
          <span className="material-symbols-outlined text-primary mt-0.5">lock</span>
          <div>
            <p className="font-label-md text-label-md text-on-surface mb-1 font-bold">Encriptado de Extremo a Extremo</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Tus credenciales nunca se almacenan en nuestra red. Las transacciones se verifican mediante nodos descentralizados.</p>
          </div>
        </div>

        <div className="flex justify-end mt-md pt-md border-t border-outline-variant">
          <button onClick={onComplete} className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-md rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-between px-md uppercase tracking-wider font-bold text-[18px]">
            <span>Autorizar Transferencia</span>
            <span className="flex items-center gap-2">
              Pagar ${total.toFixed(2)} <span className="material-symbols-outlined">check_circle</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}