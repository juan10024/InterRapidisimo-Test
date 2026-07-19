/*
 * descripcion: Página de Checkout. Orquesta el flujo de 3 pasos (carrito,
 * envío, pago). La lógica de recompensas de compra se delega a useCartStore.checkoutCart().
 */

import { useState } from 'react';
import { useCartStore } from '../../../application/store/useCartStore';
import { CheckoutStepper } from './components/CheckoutStepper';
import { CartView } from './components/CartView';
import { ShippingView } from './components/ShippingView';
import { PaymentView } from './components/PaymentView';
import { TelemetryHub } from './components/TelemetryHub';

interface Props {
  onNavigate?: (page: 'catalog' | 'detail' | 'checkout', productId?: string | null) => void;
}

export function CheckoutPage({ onNavigate }: Props) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'quantum'>('standard');

  const cartItems = useCartStore(state => state.cartItems);
  const checkoutCart = useCartStore(state => state.checkoutCart);

  // Cálculos de presentación (precios, no reglas de negocio de recompensas)
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'standard' ? 15.00 : 45.00;
  const total = subtotal + shippingFee;

  const handleFinalizeOrder = async () => {
    if (cartItems.length === 0) {
      alert('El cargamento está vacío. Agrega productos antes de autorizar la transferencia.');
      return;
    }
    // La orquestación de recompensas y limpieza del carrito ocurre en la capa de Application
    await checkoutCart();
    alert('¡Compra exitosa! Tu perfil ha sido actualizado.');
    onNavigate?.('catalog');
  };

  return (
    <div className="bg-background text-on-surface h-screen w-full flex overflow-hidden selection:bg-primary selection:text-on-primary-fixed">

      {/* Sidebar — Centro de Comando */}
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
              <input className="bg-transparent border-none text-body-md font-body-md placeholder:text-on-surface-variant focus:ring-0 w-48 outline-none" placeholder="Buscar en la red..." type="text" />
            </div>
            <div className="flex items-center gap-sm">
              <button className="text-on-surface-variant hover:text-primary transition-colors p-xs rounded hover:bg-surface-container-high">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="text-primary transition-colors p-xs rounded bg-surface-container-high border border-outline-variant shadow-[2px_2px_0px_rgba(0,229,163,0.2)]">
                <span className="material-symbols-outlined">shopping_cart</span>
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
            <CheckoutStepper currentStep={currentStep} onStepClick={setCurrentStep} />
            {currentStep === 1 && (
              <CartView
                onNext={() => setCurrentStep(2)}
                cartItems={cartItems}
                subtotal={subtotal}
                shippingFee={shippingFee}
                total={total}
              />
            )}
            {currentStep === 2 && (
              <ShippingView
                onNext={() => setCurrentStep(3)}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
              />
            )}
            {currentStep === 3 && (
              <PaymentView onComplete={handleFinalizeOrder} total={total} />
            )}
          </div>
          <TelemetryHub />
        </main>
      </div>
    </div>
  );
}
