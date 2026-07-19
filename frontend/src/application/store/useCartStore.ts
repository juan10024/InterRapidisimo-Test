/*
 * descripcion: Este archivo contiene el store de Zustand para el carrito y la lista de deseos (wishlist)
 */

import { create } from 'zustand';
import type { Product } from '../../domain/models';
import { useUserStore } from './useUserStore';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  wishlist: [],

  addToCart: (product, quantity = 1) => {
    const { cartItems } = get();
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      set({ cartItems: updated });
    } else {
      set({ cartItems: [...cartItems, { product, quantity }] });
    }

    // Desencadenar la acción de recompensa
    useUserStore.getState().triggerRewardAction(
      product.id,
      "ADD_TO_CART",
      `Agregó ${product.name.split(' ')[0]} al carrito`
    );
  },

  removeFromCart: (productId) => {
    set(state => ({
      cartItems: state.cartItems.filter(item => item.product.id !== productId)
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set(state => ({
      cartItems: state.cartItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    }));
  },

  clearCart: () => set({ cartItems: [] }),

  toggleWishlist: (product) => {
    const { wishlist } = get();
    const isWishlisted = wishlist.some(p => p.id === product.id);

    if (isWishlisted) {
      set({ wishlist: wishlist.filter(p => p.id !== product.id) });
    } else {
      set({ wishlist: [...wishlist, product] });
      // Desencadenar la acción de recompensa (sólo al agregar)
      useUserStore.getState().triggerRewardAction(
        product.id,
        "FAVORITE",
        `Marcó como favorito ${product.name.split(' ')[0]}`
      );
    }
  }
}));
