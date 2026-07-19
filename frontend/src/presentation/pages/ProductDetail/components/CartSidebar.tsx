/*
 * descripcion: Sidebar del carrito de compra que se muestra en la columna
 * izquierda de ProductDetailPage. Permite ver ítems, eliminarlos y proceder al pago.
 */

import { useCartStore } from '../../../../application/store/useCartStore';

interface CartSidebarProps {
  onNavigateToCheckout: () => void;
}

export function CartSidebar({ onNavigateToCheckout }: CartSidebarProps) {
  const cartItems = useCartStore(state => state.cartItems);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="bg-custom-card border border-custom-border rounded-lg p-5 hard-shadow mt-2">
      <h4 className="font-display-lg text-[18px] font-bold text-primary mb-3 flex items-center gap-2 uppercase tracking-tight">
        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
        Cargamento de Compra
      </h4>

      {cartItems.length === 0 ? (
        <p className="font-label-md text-[14px] text-on-surface-variant italic">
          El carrito de compras está vacío.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="max-h-60 overflow-y-auto flex flex-col gap-2 pr-1">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center bg-custom-bg p-2 rounded border border-custom-border text-on-surface-variant font-label-md text-[13px] gap-2"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    className="w-8 h-8 object-cover rounded border border-custom-border shrink-0"
                    src={item.product.imageUrl}
                    alt={item.product.name}
                  />
                  <span className="truncate text-on-surface font-semibold">{item.product.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-on-surface-variant">x{item.quantity}</span>
                  <span className="text-primary font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-custom-error hover:text-red-500 transition-colors"
                    title="Eliminar ítem del carrito"
                  >
                    <span className="material-symbols-outlined text-[16px] flex items-center">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-custom-border" />

          <div className="flex justify-between items-center font-label-md text-[14px] text-on-surface-variant">
            <span>Total del Cargamento:</span>
            <span className="font-bold text-primary text-[18px]">${total.toFixed(2)}</span>
          </div>

          <button
            onClick={onNavigateToCheckout}
            className="w-full py-3 bg-primary text-black font-bold font-display-lg text-[16px] uppercase tracking-wider rounded hover:bg-primary-container transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
}
