/*
 * descripcion: Transición inmersiva que confirma una venta antes de volver al catálogo.
 * Diseño expandido estilo Command Center con logs de terminal.
 */

import { useEffect, useState } from 'react';

interface SaleCompletionOverlayProps {
  onComplete: () => void;
}

export function SaleCompletionOverlay({ onComplete }: SaleCompletionOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [logStep, setLogStep] = useState(0);

  useEffect(() => {
    const totalDuration = 4500; 
    const updateInterval = 50;

    // Barra de progreso fluida
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (totalDuration / updateInterval));
        return next > 100 ? 100 : next;
      });
    }, updateInterval);

    const logTimer1 = setTimeout(() => setLogStep(1), 800);
    const logTimer2 = setTimeout(() => setLogStep(2), 2000);
    const logTimer3 = setTimeout(() => setLogStep(3), 3200);

    const timeout = setTimeout(onComplete, totalDuration);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(progressTimer);
      clearTimeout(logTimer1);
      clearTimeout(logTimer2);
      clearTimeout(logTimer3);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in duration-300 p-margin-desktop" 
      role="status" 
      aria-live="assertive"
    >
      {/* Patrón de fondo Telemetry Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        aria-hidden="true"
      />

      {/* Contenedor Principal */}
      <div className="relative z-10 w-full max-w-4xl bg-surface-container-lowest border border-outline-variant shadow-[12px_12px_0px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-500 flex flex-col overflow-hidden">
        
        {/* Esquinas decorativas */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

        <div className="flex flex-col md:flex-row">
          
          {/* Columna Izquierda */}
          <div className="flex-1 p-xl border-b md:border-b-0 md:border-r border-outline-variant flex flex-col items-center justify-center bg-surface-container-low relative overflow-hidden">
            {/* Brillo de fondo */}
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />

            <div className="relative flex items-center justify-center w-40 h-40 mb-lg" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_5s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border-t-2 border-l-2 border-primary/50 animate-[spin_3s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full border border-primary/40 bg-primary/10" />
              <span className="material-symbols-outlined text-primary text-[56px] z-10 drop-shadow-[0_0_12px_rgba(0,229,163,0.6)]">
                task_alt
              </span>
            </div>

            <p className="font-label-md text-label-md uppercase tracking-[0.3em] text-primary mb-2">
              [ Payload Transmitted ]
            </p>
            <h2 className="font-display-lg text-[32px] font-bold text-on-surface text-center">
              Transacción Completada
            </h2>
          </div>

          {/* Columna Derecha - Terminal de Secuencias */}
          <div className="flex-[1.2] p-xl bg-surface flex flex-col justify-center gap-md">
            <div className="flex items-center gap-2 mb-sm">
              <div className="w-2 h-2 bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Operation Sequence Log
              </span>
            </div>

            <div className="space-y-sm font-mono text-body-md">
              {/* Log 1: Inmediato */}
              <div className="flex items-start gap-sm text-on-surface">
                <span className="text-primary mt-1">&nbsp;</span>
                <div>
                  <p>Autorización de pago confirmada.</p>
                  <p className="text-on-surface-variant text-[12px]">Hash verificado en el nodo central.</p>
                </div>
              </div>

              {/* Log 2 */}
              <div className={`flex items-start gap-sm transition-opacity duration-300 ${logStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-primary mt-1">&nbsp;</span>
                <div>
                  <p>Inyectando entidades en la base de datos...</p>
                  <p className="text-on-surface-variant text-[12px]">Persistencia de inventario asegurada.</p>
                </div>
              </div>

              {/* Log 3 */}
              <div className={`flex items-start gap-sm transition-opacity duration-300 ${logStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-primary mt-1">&nbsp;</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">military_tech</span>
                  <p className="text-primary font-bold">Recompensas y XP sincronizados.</p>
                </div>
              </div>

              {/* Log 4 */}
              <div className={`flex items-center gap-sm transition-opacity duration-300 ${logStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-primary mt-0.5">&nbsp;</span>
                <p className="text-on-surface-variant animate-pulse">Enrutando de vuelta al catálogo principal...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de progreso unificada en la parte inferior */}
        <div className="w-full h-2 bg-surface-container-highest border-t border-outline-variant">
          <div 
            className="h-full bg-primary transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(0,229,163,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}