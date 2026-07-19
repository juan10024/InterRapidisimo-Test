/*
 * descripcion: Página de Checkout. Orquesta el flujo de 3 pasos (carrito,
 * envío, pago). La lógica de recompensas de compra se delega a useCartStore.checkoutCart().
 */

import { useState } from 'react';
import { useCartStore } from '../../../application/store/useCartStore';
import { useUserStore } from '../../../application/store/useUserStore';
import { CheckoutStepper } from './components/CheckoutStepper';
import { CartView } from './components/CartView';
import { ShippingView } from './components/ShippingView';
import { PaymentView } from './components/PaymentView';
import { TelemetryHub } from './components/TelemetryHub';
import { CommandSidebar } from '../../components/CommandSidebar';
import { SaleCompletionOverlay } from '../../components/SaleCompletionOverlay';

interface Props {
  onNavigate?: (page: 'catalog' | 'detail' | 'checkout', productId?: string | null) => void;
}

export interface ShippingFormValues {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface PaymentFormValues {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardholderName: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

const initialShippingForm: ShippingFormValues = {
  firstName: '', lastName: '', address: '', city: '', postalCode: '',
};

const initialPaymentForm: PaymentFormValues = {
  cardNumber: '', expiry: '', cvc: '', cardholderName: '',
};

const validateShipping = (form: ShippingFormValues): FormErrors<ShippingFormValues> => ({
  ...(!form.firstName.trim() && { firstName: 'Ingresa tu nombre.' }),
  ...(!form.lastName.trim() && { lastName: 'Ingresa tu apellido.' }),
  ...(!form.address.trim() && { address: 'Ingresa la dirección de entrega.' }),
  ...(!form.city.trim() && { city: 'Ingresa la ciudad.' }),
  ...(!/^\d{6}$/.test(form.postalCode) && { postalCode: 'El código postal debe tener 6 dígitos.' }),
});

const validatePayment = (form: PaymentFormValues): FormErrors<PaymentFormValues> => {
  const errors: FormErrors<PaymentFormValues> = {};
  const [month, year] = form.expiry.split('/').map(Number);
  const expiryDate = new Date(2000 + year, month, 0);
  const today = new Date();

  if (!/^\d{16}$/.test(form.cardNumber)) errors.cardNumber = 'Ingresa los 16 dígitos de la tarjeta.';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry) || expiryDate < new Date(today.getFullYear(), today.getMonth(), 1)) {
    errors.expiry = 'Usa una fecha vigente con formato MM/AA.';
  }
  if (!/^\d{3,4}$/.test(form.cvc)) errors.cvc = 'El CVC debe tener 3 o 4 dígitos.';
  if (!form.cardholderName.trim()) errors.cardholderName = 'Ingresa el nombre del titular.';
  return errors;
};

export function CheckoutPage({ onNavigate }: Props) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'quantum'>('standard');
  const [shippingForm, setShippingForm] = useState<ShippingFormValues>(initialShippingForm);
  const [shippingErrors, setShippingErrors] = useState<FormErrors<ShippingFormValues>>({});
  const [paymentForm, setPaymentForm] = useState<PaymentFormValues>(initialPaymentForm);
  const [paymentErrors, setPaymentErrors] = useState<FormErrors<PaymentFormValues>>({});
  const [isSaleComplete, setIsSaleComplete] = useState(false);

  const cartItems = useCartStore(state => state.cartItems);
  const checkoutCart = useCartStore(state => state.checkoutCart);
  const isUserReady = useUserStore(state => state.userId !== null);

  // Cálculos de presentación (precios, no reglas de negocio de recompensas)
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'standard' ? 15.00 : 45.00;
  const total = subtotal + shippingFee;

  const handleShippingNext = () => {
    const errors = validateShipping(shippingForm);
    setShippingErrors(errors);
    if (Object.keys(errors).length === 0) setCurrentStep(3);
  };

  const handleFinalizeOrder = async () => {
    if (cartItems.length === 0) {
      alert('El cargamento está vacío. Agrega productos antes de autorizar la transferencia.');
      return;
    }
    const errors = validatePayment(paymentForm);
    setPaymentErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // La orquestación de recompensas y limpieza del carrito ocurre en la capa de Application
    const completed = await checkoutCart();
    if (!completed) {
      alert('No se puede completar la compra hasta cargar el perfil de usuario.');
      return;
    }
    setIsSaleComplete(true);
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface h-screen w-full flex overflow-hidden selection:bg-primary selection:text-on-primary-container">
      {isSaleComplete && (
        <SaleCompletionOverlay onComplete={() => {
          setIsSaleComplete(false);
          onNavigate?.('catalog');
        }} />
      )}

      {/* Sidebar — Centro de Comando */}
      <CommandSidebar currentPage="checkout" onNavigate={(page) => onNavigate?.(page)} className="h-screen sticky top-0" />

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
                onNext={handleShippingNext}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                form={shippingForm}
                errors={shippingErrors}
                onChange={(field, value) => {
                  setShippingForm(current => ({ ...current, [field]: value }));
                  setShippingErrors(current => ({ ...current, [field]: undefined }));
                }}
              />
            )}
            {currentStep === 3 && (
              <PaymentView
                onComplete={handleFinalizeOrder}
                total={total}
                disabled={!isUserReady}
                form={paymentForm}
                errors={paymentErrors}
                onChange={(field, value) => {
                  setPaymentForm(current => ({ ...current, [field]: value }));
                  setPaymentErrors(current => ({ ...current, [field]: undefined }));
                }}
              />
            )}
          </div>
          <TelemetryHub />
        </main>
      </div>
    </div>
  );
}
