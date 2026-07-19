/*
 * descripcion: Vista del Paso 1 del checkout — tabla de ítems del carrito,
 * caja de subtotal/total y botón para avanzar. Incluye botón de eliminar ítem.
 */

import { useCartStore } from '../../../../application/store/useCartStore';
import type { CartItem } from '../../../../application/store/useCartStore';

interface CartViewProps {
  onNext: () => void;
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export function CartView({ onNext, cartItems, subtotal, shippingFee, total }: CartViewProps) {
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
        Cargamento en Tránsito
      </h2>

      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.4)]">
        {/* Encabezado de la tabla */}
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-sm p-sm border-b border-outline-variant bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
          <div>Designación de Ítem</div>
          <div className="text-right">Precio Unitario</div>
          <div className="text-center">Cant</div>
          <div className="text-right">Total</div>
          <div className="text-center">Acción</div>
        </div>

        {/* Ítems */}
        <div className="flex flex-col">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant italic font-label-md">
              No hay elementos cargados en el carrito de compras.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="grid grid-cols-[3fr_1fr_1fr_1fr_auto] gap-sm p-sm items-center border-b border-outline-variant hover:bg-surface-container-high transition-colors"
              >
                {/* Producto */}
                <div className="flex items-center gap-md min-w-0">
                  <div className="w-16 h-16 rounded border border-outline-variant overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" src={item.product.imageUrl} alt={item.product.name} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-lg text-body-lg text-on-surface font-bold truncate">{item.product.name}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase truncate">
                      Clase: {item.product.category}
                    </span>
                  </div>
                </div>

                {/* Precio unitario */}
                <div className="text-right font-price-display text-price-display text-on-surface font-semibold">
                  ${item.product.price.toFixed(2)}
                </div>

                {/* Cantidad */}
                <div className="flex justify-center items-center gap-xs">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-colors bg-surface-container font-bold"
                  >
                    -
                  </button>
                  <span className="font-label-md text-label-md w-6 text-center text-on-surface">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary hover:border-primary transition-colors bg-surface-container font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Total */}
                <div className="text-right font-price-display text-price-display text-on-surface font-bold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>

                {/* Eliminar */}
                <div className="flex justify-center">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    title="Eliminar ítem del cargamento"
                    className="text-on-surface-variant hover:text-red-400 transition-colors p-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Código de descuento */}
        <div className="p-sm bg-surface-container-lowest flex justify-between items-center border-t border-outline-variant">
          <div className="flex items-center gap-sm w-1/2">
            <input
              className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md text-body-md w-full px-sm py-xs rounded"
              placeholder="Código de Descuento..."
              type="text"
            />
            <button className="border border-primary text-primary font-label-md text-label-md px-md py-xs rounded hover:bg-primary-container hover:text-on-primary-container transition-colors whitespace-nowrap font-bold uppercase">
              Aplicar
            </button>
          </div>
        </div>
      </div>

      {/* Caja de Subtotal/Total */}
      <div className="w-full border border-outline-variant bg-surface-container rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-sm mt-sm">
        <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
          <span>Subtotal</span>
          <span className="font-price-display font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
          <span>Tarifa de Envío</span>
          <span className="font-price-display font-semibold">${shippingFee.toFixed(2)}</span>
        </div>
        <div className="h-px w-full bg-outline-variant my-xs" />
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
  );
}
