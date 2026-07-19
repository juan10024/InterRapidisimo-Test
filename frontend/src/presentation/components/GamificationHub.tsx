/*
 * descripcion: Este archivo contiene el componente de hub de gamificación
 */

import { useUserStore } from '../../application/store/useUserStore';

export function GamificationHub() {
  const { points, level, activities } = useUserStore();

  const xpPerLevel = 1000;
  const xpProgress = points % xpPerLevel;
  const currentLevel = level + Math.floor(points / xpPerLevel);
  const xpNeeded = xpPerLevel - xpProgress;

  return (
    <>
      <div className="bg-custom-card border border-custom-border rounded-lg p-sm">
        <h3 className="font-display-lg text-[18px] font-bold mb-4 flex items-center gap-2 border-b border-custom-border pb-2">
          <span className="material-symbols-outlined text-primary">local_fire_department</span>
          Hub de Recompensas
        </h3>
        <div className="text-center mb-md">
          <div className="font-display-lg text-[48px] font-bold text-primary tracking-tighter leading-[1.1]" style={{ textShadow: '0 0 10px rgba(0, 229, 163, 0.3)' }}>
            {points} PTS
          </div>
          <div className="font-label-sm text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">Saldo Actual</div>
        </div>
        
        <div className="mb-md">
          <div className="flex justify-between items-end mb-1">
            <span className="font-display-lg text-[14px] font-bold">Nivel {currentLevel}</span>
            <span className="font-body-md text-[12px] text-on-surface-variant">{xpProgress} / {xpPerLevel} XP</span>
          </div>
          {/* Segmented Progress Bar */}
          <div className="flex gap-1 h-3 w-full">
            {Array.from({ length: 10 }).map((_, i) => {
              const startXp = i * 100;
              const endXp = (i + 1) * 100;
              if (xpProgress >= endXp) {
                return <div key={i} className="flex-1 bg-primary border border-custom-border"></div>;
              } else if (xpProgress > startXp) {
                return <div key={i} className="flex-1 bg-primary/30 border border-primary/50"></div>;
              } else {
                return <div key={i} className="flex-1 bg-custom-bg border border-custom-border"></div>;
              }
            })}
          </div>
        </div>

        <div className="mt-md">
          <h4 className="font-label-md text-[12px] text-on-surface-variant uppercase mb-2">Actividad Reciente</h4>
          <ul className="flex flex-col">
            {activities.map((activity) => (
              <li key={activity.id} className="flex justify-between items-center py-2 border-b border-custom-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{activity.icon}</span>
                  <span className="font-body-md text-[12px]">{activity.description}</span>
                </div>
                <span className="font-price-display text-[14px] text-primary">+{activity.points} XP</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Unlock Elite Tier Card */}
      <div className="border border-custom-border rounded-lg overflow-hidden bg-custom-card relative h-48">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-custom-bg to-custom-bg"></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col z-10 p-sm text-center">
          <span className="material-symbols-outlined text-[48px] text-primary mb-2">workspace_premium</span>
          <h4 className="font-display-lg text-[18px] font-bold">Desbloquear Nivel Élite</h4>
          <p className="font-body-md text-[12px] text-on-surface-variant mt-1">Gana {xpNeeded} XP más para acceder a lanzamientos exclusivos de periféricos.</p>
        </div>
      </div>
    </>
  );
}