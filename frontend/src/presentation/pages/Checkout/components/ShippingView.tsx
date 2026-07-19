/*
 * descripcion: Paso de envío con validación de datos de entrega.
 */

import type { FormErrors, ShippingFormValues } from '../CheckoutPage';

interface ShippingViewProps {
  onNext: () => void;
  shippingMethod: 'standard' | 'quantum';
  setShippingMethod: (method: 'standard' | 'quantum') => void;
  form: ShippingFormValues;
  errors: FormErrors<ShippingFormValues>;
  onChange: (field: keyof ShippingFormValues, value: string) => void;
}

const fieldClass = (hasError: boolean) => `bg-surface border ${hasError ? 'border-custom-error' : 'border-outline-variant'} focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded`;

function FieldError({ message }: { message?: string }) {
  return message ? <p className="font-label-sm text-[12px] text-custom-error">{message}</p> : null;
}

export function ShippingView({ onNext, shippingMethod, setShippingMethod, form, errors, onChange }: ShippingViewProps) {
  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-l font-bold uppercase tracking-tight text-primary">Logística y Coordenadas de Destino</h2>
      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Nombre del Operativo
            <input value={form.firstName} onChange={(event) => onChange('firstName', event.target.value)} className={fieldClass(Boolean(errors.firstName))} placeholder="Tu nombre" />
            <FieldError message={errors.firstName} />
          </label>
          <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Apellido del Operativo
            <input value={form.lastName} onChange={(event) => onChange('lastName', event.target.value)} className={fieldClass(Boolean(errors.lastName))} placeholder="Tu apellido" />
            <FieldError message={errors.lastName} />
          </label>
        </div>
        <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Sector de la Cuadrícula (Dirección)
          <input value={form.address} onChange={(event) => onChange('address', event.target.value)} className={fieldClass(Boolean(errors.address))} placeholder="Ej. Sector 7G, Bloque 4" />
          <FieldError message={errors.address} />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <label className="flex flex-col gap-2 md:col-span-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Ciudad / Central
            <input value={form.city} onChange={(event) => onChange('city', event.target.value)} className={fieldClass(Boolean(errors.city))} placeholder="Nombre de la ciudad" />
            <FieldError message={errors.city} />
          </label>
          <label className="flex flex-col gap-2 font-label-md text-label-md text-on-surface-variant uppercase font-semibold">Código Postal
            <input value={form.postalCode} onChange={(event) => onChange('postalCode', event.target.value.replace(/\D/g, '').slice(0, 6))} className={fieldClass(Boolean(errors.postalCode))} placeholder="000000" inputMode="numeric" />
            <FieldError message={errors.postalCode} />
          </label>
        </div>
        <hr className="border-outline-variant my-2" />
        <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">Seleccionar Método de Enrutamiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <button type="button" onClick={() => setShippingMethod('standard')} className={`flex items-center gap-4 border p-sm rounded text-left transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface hover:border-primary/50'}`}>
            <span className={`material-symbols-outlined ${shippingMethod === 'standard' ? 'text-primary material-symbols-fill' : 'text-on-surface-variant'}`}>radio_button_checked</span>
            <span className="flex-1 font-label-md text-label-md text-on-surface"><strong>Entrega Estándar</strong><small className="block mt-1 text-on-surface-variant">3-5 Ciclos Orbitales · <span className="text-primary">$15.00</span></small></span>
          </button>
          <button type="button" onClick={() => setShippingMethod('quantum')} className={`flex items-center gap-4 border p-sm rounded text-left transition-all ${shippingMethod === 'quantum' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface hover:border-primary/50'}`}>
            <span className={`material-symbols-outlined ${shippingMethod === 'quantum' ? 'text-primary material-symbols-fill' : 'text-on-surface-variant'}`}>radio_button_checked</span>
            <span className="flex-1 font-label-md text-label-md text-on-surface"><strong>Envío Cuántico</strong><small className="block mt-1 text-on-surface-variant">Siguiente Ciclo Garantizado · <span className="text-primary">$45.00</span></small></span>
          </button>
        </div>
        <div className="flex justify-end mt-md"><button type="button" onClick={onNext} className="w-full md:w-auto bg-primary-container text-on-primary-container font-label-md text-label-md py-sm px-xl rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform font-bold">Confirmar Coordenadas <span className="material-symbols-outlined align-middle">arrow_forward</span></button></div>
      </div>
    </div>
  );
}
