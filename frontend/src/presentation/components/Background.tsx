export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] bg-custom-bg overflow-hidden pointer-events-none">
      {/* Estilos inyectados para la animación de escaneo sin necesidad de configurar Tailwind */}
      <style>
        {`
          @keyframes scanline {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
          }
          .animate-scanline {
            animation: scanline 8s linear infinite;
          }
        `}
      </style>

      {/* Cuadrícula CSS Pura */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00e5a3 1px, transparent 1px),
            linear-gradient(to bottom, #00e5a3 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Viñeta radial para oscurecer los bordes y centrar la atención */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_80%)]" />

      {/* Línea de escaneo láser sutil */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/30 shadow-[0_0_15px_rgba(0,229,163,0.5)] animate-scanline" />
    </div>
  );
}