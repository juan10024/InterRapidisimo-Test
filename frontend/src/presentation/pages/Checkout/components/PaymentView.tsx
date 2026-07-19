/*
 * descripcion: Paso de pago con validación de datos simulados en frontend.
 */

import type { FormErrors, PaymentFormValues } from '../CheckoutPage';

interface PaymentViewProps {
  onComplete: () => void;
  total: number;
  disabled: boolean;
  form: PaymentFormValues;
  errors: FormErrors<PaymentFormValues>;
  onChange: (field: keyof PaymentFormValues, value: string) => void;
}

const fieldClass = (hasError: boolean) => `w-full bg-surface border ${hasError ? 'border-custom-error' : 'border-outline-variant'} focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded`;

function FieldError({ message }: { message?: string }) {
  return message ? <p className="font-label-sm text-[12px] text-custom-error">{message}</p> : null;
}

export function PaymentView({ onComplete, total, disabled, form, errors, onChange }: PaymentViewProps) {
  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-lg font-bold uppercase tracking-tight text-primary">Transacción Segura</h2>
      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-md">
        <div className="flex gap-4 mb-2">
          <div className="flex-1 py-xs px-sm border border-primary bg-primary-container/10 text-primary font-label-md text-label-md rounded flex items-center justify-center gap-2 font-bold"><span className="material-symbols-outlined text-[18px]">credit_card</span> Token de Crédito</div>
          <div className="flex-1 py-xs px-sm border border-outline-variant bg-surface text-on-surface-variant font-label-md text-label-md rounded flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[18px]">account_balance_wallet</span> Billetera Cripto</div>
        </div>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Número de Tarjeta
          <input value={form.cardNumber} onChange={(event) => onChange('cardNumber', event.target.value.replace(/\D/g, '').slice(0, 16))} className={`${fieldClass(Boolean(errors.cardNumber))} tracking-widest`} placeholder="0000000000000000" inputMode="numeric" autoComplete="cc-number" />
          <FieldError message={errors.cardNumber} />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Vencimiento
            <input value={form.expiry} onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
              onChange('expiry', digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
            }} className={fieldClass(Boolean(errors.expiry))} placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
            <FieldError message={errors.expiry} />
          </label>
          <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Código de Seguridad
            <input value={form.cvc} onChange={(event) => onChange('cvc', event.target.value.replace(/\D/g, '').slice(0, 4))} className={fieldClass(Boolean(errors.cvc))} placeholder="CVC" inputMode="numeric" autoComplete="cc-csc" />
            <FieldError message={errors.cvc} />
          </label>
        </div>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Nombre en la Tarjeta
          <input value={form.cardholderName} onChange={(event) => onChange('cardholderName', event.target.value)} className={fieldClass(Boolean(errors.cardholderName))} placeholder="Se requiere coincidencia exacta de identidad" autoComplete="cc-name" />
          <FieldError message={errors.cardholderName} />
        </label>
        <div className="bg-surface border border-outline-variant p-sm rounded mt-2 flex items-start gap-sm"><span className="material-symbols-outlined text-primary mt-0.5">lock</span><div><p className="font-label-md text-label-md text-on-surface mb-1 font-bold">Encriptado de Extremo a Extremo</p><p className="font-label-sm text-label-sm text-on-surface-variant">Tus credenciales nunca se almacenan ni se procesan: este flujo es una simulación visual.</p></div></div>
        <div className="flex justify-end mt-md pt-md border-t border-outline-variant"><button type="button" onClick={onComplete} disabled={disabled} className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-md rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform flex items-center justify-between px-md uppercase tracking-wider font-bold text-[18px] disabled:opacity-50"><span>Autorizar Transferencia</span><span className="flex items-center gap-2">Pagar ${total.toFixed(2)} <span className="material-symbols-outlined">check_circle</span></span></button></div>
      </div>
    </div>
  );
}
