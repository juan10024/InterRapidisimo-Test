/*
 * descripcion: Sidebar de gamificación de la página de detalle del producto.
 * Muestra el rango, barra de XP y objetivos activos del usuario.
 */

export function GamificationSidebar() {
  return (
    <aside className="w-full md:w-80 bg-custom-bg border-l border-custom-border p-4 flex flex-col gap-4 shrink-0">
      {/* Rango y XP */}
      <div className="bg-custom-card border border-custom-border rounded-lg p-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-custom-border opacity-50 pointer-events-none">
          <span className="material-symbols-outlined text-[120px]">military_tech</span>
        </div>
        <div className="relative z-10">
          <div className="font-label-sm text-[12px] text-on-surface-variant mb-1 uppercase tracking-widest">
            Rango Actual
          </div>
          <div className="font-display-lg text-[24px] font-bold text-primary mb-6">Cyber-Merc</div>
          <div className="flex justify-between items-end mb-1">
            <div className="font-label-sm text-[12px] text-on-surface">XP al Siguiente Nivel</div>
            <div className="font-price-display text-[14px] text-primary">8,450 / 10,000</div>
          </div>
          <div className="flex gap-1 h-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 bg-primary rounded-sm" />
            ))}
            <div className="flex-1 bg-custom-border rounded-sm" />
          </div>
        </div>
      </div>

      {/* Potencial de compra */}
      <div className="bg-custom-card border border-custom-border rounded-lg p-4 flex flex-col gap-2">
        <div className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-widest flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">radar</span> Potencial de Compra
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-on-surface font-medium">PTS Base</span>
          <span className="font-price-display text-[16px] text-primary">+50</span>
        </div>
        <div className="flex items-center justify-between border-t border-custom-border pt-2 mt-2 bg-primary-container/10 -mx-4 px-4 pb-4 rounded-b-lg">
          <span className="text-primary-container font-bold">Total Estimado</span>
          <span className="font-price-display text-[20px] text-primary-container font-bold">+50 PTS</span>
        </div>
      </div>

      {/* Objetivos activos */}
      <div className="mt-6 flex flex-col gap-2">
        <h4 className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-widest mb-2">
          Objetivos Activos
        </h4>
        <div className="bg-transparent border border-custom-border rounded p-2 flex items-start gap-4">
          <div className="w-8 h-8 rounded bg-custom-card border border-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[18px]">shopping_cart_checkout</span>
          </div>
          <div>
            <div className="font-label-md text-[14px] text-on-surface">Primera Compra</div>
            <div className="text-[12px] text-on-surface-variant mt-1">Completa tu primera compra</div>
            <div className="font-label-sm text-[12px] text-primary mt-1">+50 PTS de Recompensa</div>
          </div>
        </div>
        <div className="bg-transparent border border-custom-border rounded p-2 flex items-start gap-4 opacity-60">
          <div className="w-8 h-8 rounded bg-custom-card border border-custom-border flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">shopping_bag</span>
          </div>
          <div>
            <div className="font-label-md text-[14px] text-on-surface">Gran Comprador</div>
            <div className="text-[12px] text-on-surface-variant mt-1">Gasta más de $1000 en un pedido</div>
            <div className="font-label-sm text-[12px] text-on-surface-variant mt-1">Bloqueado</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
