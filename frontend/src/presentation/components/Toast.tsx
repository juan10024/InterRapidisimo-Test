/*
 * descripcion: Componente Toast global. Se monta una sola vez en App.tsx
 * y consume useToastStore para renderizarse desde cualquier parte de la app.
 */

import { useToastStore } from '../../application/store/useToastStore';

const ICON_MAP = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
};

export function Toast() {
  const { isVisible, title, message, type, hideToast } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-9999 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-surface border border-primary text-on-surface p-4 rounded-lg shadow-[6px_6px_0px_rgba(0,229,163,0.3)] flex items-center gap-3 min-w-64 max-w-sm">
        <span
          className={`material-symbols-outlined text-[24px] shrink-0 ${
            type === 'success' ? 'text-primary' : type === 'error' ? 'text-red-400' : 'text-blue-400'
          }`}
        >
          {ICON_MAP[type]}
        </span>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-label-md text-[14px] font-bold text-primary uppercase tracking-wider">
            {title}
          </span>
          <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
            {message}
          </span>
        </div>
        <button
          onClick={hideToast}
          className="text-on-surface-variant hover:text-primary transition-colors ml-1 shrink-0"
          aria-label="Cerrar notificación"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
