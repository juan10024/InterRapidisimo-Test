import { useState, useEffect } from 'react';

interface TerminalPreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: TerminalPreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulador de carga irregular 
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Pequeño retraso al llegar al 100% para que el usuario alcance a leerlo
          setTimeout(onComplete, 600);
          return 100;
        }
        // Incremento aleatorio entre 5 y 15
        return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-9999 bg-custom-bg flex flex-col items-center justify-center p-4 selection:bg-primary-container selection:text-black">
      {/* Cuadro de mando de carga */}
      <div className="w-full max-w-125 border border-custom-border bg-surface p-6 relative hard-shadow shadow-[8px_8px_0px_rgba(0,229,163,0.2)]">
        
        {/* Decoración de esquinas */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1" />

        <div className="font-label-md text-[12px] text-primary mb-1 uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">terminal</span>
          System_Boot_Sequence
        </div>
        
        <div className="font-display-lg text-[24px] text-on-surface font-bold uppercase tracking-tighter mb-6">
          Initializing Obsidian
        </div>

        <div className="flex justify-between text-on-surface-variant font-label-md text-[14px] mb-2">
          <span>Loading Interface Assets...</span>
          <span className="text-primary font-bold">{progress}%</span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-6 border border-custom-border bg-custom-bg p-0.5">
          <div
            className="h-full bg-primary transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 font-label-sm text-[10px] text-on-surface-variant opacity-50 flex justify-between uppercase">
          <span>SEC: ENCRYPTED</span>
          <span>EST_LATENCY: 0.4MS</span>
        </div>
      </div>
    </div>
  );
}