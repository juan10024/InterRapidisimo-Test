/*
 * descripcion: Sidebar derecho del Checkout — muestra estado de puntos del usuario.
 * No calcula ni proyecta puntos (esa es responsabilidad del backend).
 */

import { useUserStore } from '../../../../application/store/useUserStore';

export function TelemetryHub() {
  const points = useUserStore(state => state.points);
  const level = useUserStore(state => state.level);

  return (
    <aside className="w-full xl:w-80 shrink-0 flex flex-col gap-lg">
      <div className="border border-outline-variant bg-surface-container rounded-lg p-md shadow-[4px_4px_0px_rgba(0,0,0,0.4)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-sm opacity-20 pointer-events-none">
          <span className="material-symbols-outlined text-[100px] text-primary">hexagon</span>
        </div>
        <h3 className="font-display-lg text-headline-lg-mobile text-on-surface mb-xs relative z-10 font-bold uppercase tracking-tight">
          Hub de Telemetría
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-md relative z-10">
          Estado actual de la operación y balance de XP.
        </p>
        <div className="flex flex-col gap-sm relative z-10">
          <div className="bg-surface border border-outline-variant p-sm rounded flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface-variant">Rango Actual</span>
            <span className="font-label-md text-label-md text-primary bg-primary-container/10 px-xs py-0.5 border border-primary/30 rounded font-bold uppercase">
              Cyber-Merc
            </span>
          </div>
          <div className="bg-surface border border-outline-variant p-sm rounded flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <span className="font-label-md text-label-md text-on-surface-variant">Puntos Totales</span>
              <span className="font-price-display text-[18px] text-on-surface font-bold">{points} PTS</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 flex gap-1 h-2 bg-surface-container-highest rounded-sm overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(points % 10000) / 100}%` }} />
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">Nivel {level}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
