/*
 * descripcion: Este archivo contiene el componente de hub de gamificación
 */

import { useUserStore } from '../../application/store/useUserStore';

export function GamificationHub() {
  const { points, level, activities } = useUserStore();

  return (
    <div className="flex flex-col gap-md">
      <div className="bg-custom-card border border-custom-border rounded-lg p-sm">
        <h3 className="font-display-lg text-body-lg font-bold mb-4 flex items-center gap-2 border-b border-custom-border pb-2">
          <span className="material-symbols-outlined text-primary">local_fire_department</span>
          Hub
        </h3>
        <div className="text-center mb-md">
          <div className="font-display-lg text-display-lg text-primary tracking-tighter" style={{ textShadow: '0 0 10px rgba(0, 229, 163, 0.3)' }}>
            {points} PTS
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">Current Balance</div>
        </div>
        
        {/* Barra de progreso visual simplificada */}
        <div className="mb-md">
          <div className="flex justify-between items-end mb-1">
            <span className="font-display-lg text-label-md font-bold">Level {level}</span>
            <span className="font-body-md text-label-sm text-on-surface-variant">450 / 1000 XP</span>
          </div>
          <div className="flex gap-1 h-3 w-full">
            {[1, 2, 3, 4].map(i => <div key={i} className="flex-1 bg-primary border border-custom-border"></div>)}
            <div className="flex-1 bg-primary/30 border border-primary/50"></div>
            {[1, 2, 3, 4, 5].map(i => <div key={i+5} className="flex-1 bg-custom-bg border border-custom-border"></div>)}
          </div>
        </div>

        <div className="mt-md">
          <h4 className="font-label-md text-label-sm text-on-surface-variant uppercase mb-2">Recent Activity</h4>
          <ul className="flex flex-col">
            {activities.map((activity) => (
              <li key={activity.id} className="flex justify-between items-center py-2 border-b border-custom-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{activity.icon}</span>
                  <span className="font-body-md text-label-sm">{activity.description}</span>
                </div>
                <span className="font-price-display text-label-md text-primary">+{activity.points} XP</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}