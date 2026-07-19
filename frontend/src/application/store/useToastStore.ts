/*
 * descripcion: Store global de Zustand para notificaciones Toast.
 * Permite mostrar toasts desde cualquier componente sin prop-drilling.
 */

import { create } from 'zustand';

interface ToastState {
  isVisible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

let dismissTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  title: '',
  message: '',
  type: 'success',

  showToast: (title, message, type = 'success') => {
    // Cancelar cualquier timer previo para reiniciar el auto-dismiss
    if (dismissTimer) clearTimeout(dismissTimer);

    set({ isVisible: true, title, message, type });

    dismissTimer = setTimeout(() => {
      set({ isVisible: false });
      dismissTimer = null;
    }, 3500);
  },

  hideToast: () => {
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      dismissTimer = null;
    }
    set({ isVisible: false });
  },
}));
