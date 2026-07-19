/*
 * descripcion: Confirmación visual global para recompensas otorgadas por el backend.
 */

import { useEffect } from 'react';
import { useUserStore } from '../../application/store/useUserStore';

export function PointsGainCelebration() {
  const pointsGain = useUserStore(state => state.pointsGain);
  const dismissPointsGain = useUserStore(state => state.dismissPointsGain);

  useEffect(() => {
    if (!pointsGain) return;

    const timeout = window.setTimeout(dismissPointsGain, 2800);
    return () => window.clearTimeout(timeout);
  }, [pointsGain, dismissPointsGain]);

  if (!pointsGain) {
    return null;
  }

  return (
    <div
      className="points-gain-celebration"
      role="status"
      aria-live="polite"
    >
      <div className="points-gain-core">
        <span className="points-gain-spark points-gain-spark-a" />
        <span className="points-gain-spark points-gain-spark-b" />
        <span className="points-gain-spark points-gain-spark-c" />
        <span className="points-gain-spark points-gain-spark-d" />
        <span className="material-symbols-outlined points-gain-icon">bolt</span>
        <span className="points-gain-value">+{pointsGain.amount} PTS</span>
      </div>
    </div>
  );
}
