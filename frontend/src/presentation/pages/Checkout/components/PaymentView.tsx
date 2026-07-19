/*
 * descripcion: Vista del Paso 3 del checkout — formulario de pago.
 */

interface PaymentViewProps {
  onComplete: () => void;
  total: number;
  disabled: boolean;
}

export function PaymentView({ onComplete, total, disabled }: PaymentViewProps) {
  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-lg font-bold uppercase tracking-tight text-primary">
        Transacción Segura
      </h2>
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
          <button onClick={onComplete} disabled={disabled} className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-md rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-between px-md uppercase tracking-wider font-bold text-[18px] disabled:opacity-50">
            <span>Autorizar Transferencia</span>
            <span className="flex items-center gap-2">Pagar ${total.toFixed(2)} <span className="material-symbols-outlined">check_circle</span></span>
          </button>
        </div>
      </div>
    </div>
  );
}
