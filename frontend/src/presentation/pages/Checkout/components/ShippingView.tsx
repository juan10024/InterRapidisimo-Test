/*
 * descripcion: Vista del Paso 2 del checkout — formulario de dirección
 * de envío y selección del método de enrutamiento.
 */

interface ShippingViewProps {
  onNext: () => void;
  shippingMethod: 'standard' | 'quantum';
  setShippingMethod: (method: 'standard' | 'quantum') => void;
}

export function ShippingView({ onNext, shippingMethod, setShippingMethod }: ShippingViewProps) {
  return (
    <div className="flex flex-col gap-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="font-display-lg text-headline-l font-bold uppercase tracking-tight text-primary">
        Logística y Coordenadas de Destino
      </h2>

      <div className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] flex flex-col gap-md">
        <div className="grid grid-cols-2 gap-md">
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
              Nombre del Operativo
            </label>
            <input
              className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded"
              placeholder="Tu nombre"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
              Apellido del Operativo
            </label>
            <input
              className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded"
              placeholder="Tu apellido"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
            Sector de la Cuadrícula (Dirección)
          </label>
          <input
            className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded"
            placeholder="Ej. Sector 7G, Bloque 4"
            type="text"
          />
        </div>

        <div className="grid grid-cols-3 gap-md">
          <div className="flex flex-col gap-2 col-span-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
              Ciudad / Central
            </label>
            <input
              className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded"
              placeholder="Nombre de la ciudad"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase font-semibold">
              Código Postal
            </label>
            <input
              className="bg-surface border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface font-body-md px-sm py-xs rounded"
              placeholder="000000"
              type="text"
            />
          </div>
        </div>

        <hr className="border-outline-variant my-2" />

        <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-2 font-bold">
          Seleccionar Método de Enrutamiento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <label
            onClick={() => setShippingMethod('standard')}
            className={`flex items-center gap-4 border p-sm rounded cursor-pointer group transition-all ${
              shippingMethod === 'standard' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              className="w-4 h-4 text-primary bg-surface border-primary focus:ring-primary focus:ring-offset-background"
              checked={shippingMethod === 'standard'}
              readOnly
            />
            <div className="flex-1">
              <div className="font-label-md text-label-md text-on-surface flex justify-between font-bold">
                <span>Entrega Estándar</span>
                <span className="text-primary">$15.00</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">3-5 Ciclos Orbitales</div>
            </div>
          </label>

          <label
            onClick={() => setShippingMethod('quantum')}
            className={`flex items-center gap-4 border p-sm rounded cursor-pointer transition-all ${
              shippingMethod === 'quantum' ? 'border-primary bg-primary-container/5' : 'border-outline-variant bg-surface hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary focus:ring-offset-background"
              checked={shippingMethod === 'quantum'}
              readOnly
            />
            <div className="flex-1">
              <div className="font-label-md text-label-md text-on-surface flex justify-between font-bold">
                <span>Envío Cuántico</span>
                <span className="text-primary">$45.00</span>
              </div>
              <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Siguiente Ciclo Garantizado</div>
            </div>
          </label>
        </div>

        <div className="flex justify-end mt-md">
          <button
            onClick={onNext}
            className="w-full md:w-auto bg-primary-container text-on-primary-container font-label-md text-label-md py-sm px-xl rounded border border-outline-variant hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform active:translate-y-0 active:translate-x-0 active:shadow-none flex items-center justify-center gap-sm uppercase tracking-wider font-bold"
          >
            Confirmar Coordenadas <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
