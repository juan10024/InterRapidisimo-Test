/*
 * descripcion: Este archivo contiene el store de Zustand para usuario y gamificación
 */

import { create } from 'zustand';
import { apiClient } from '../../infrastructure/api/apiClient';
import type { RewardActionRequest } from '../../domain/models';

interface Activity {
  id: string;
  description: string;
  points: number;
  icon: string;
}

interface UserState {
  userId: string;
  points: number;
  level: number;
  activities: Activity[];
  isProcessingReward: boolean;
  triggerRewardAction: (productId: string, actionType: RewardActionRequest['actionType'], description: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  // Datos hardcodeados para el MVP
  userId: "550e8400-e29b-41d4-a716-446655440000",
  points: 150, 
  level: 3,
  // Actividades iniciales para poblar el UI basado en el diseño
  activities: [
    { id: 'evt-1', description: 'Inicio de Sesión Diario', points: 10, icon: 'military_tech' },
    { id: 'evt-2', description: 'Lista de Deseos Compartida', points: 25, icon: 'share' }
  ],
  isProcessingReward: false,

  triggerRewardAction: async (productId, actionType, description) => {
    const { userId } = get();
    set({ isProcessingReward: true });
    
    try {
      const response = await apiClient.postRewardAction({
        userId,
        productId,
        actionType
      });

      // Actualizar el balance de puntos y agregamos la actividad al historial
      set((state) => ({
        points: response.data.newPointsBalance,
        activities: [
          { 
            id: Date.now().toString(), 
            description, 
            points: response.data.pointsAwarded,
            icon: actionType === 'ADD_TO_CART' ? 'shopping_bag' : 'local_fire_department'
          },
          ...state.activities
        ],
        isProcessingReward: false
      }));
    } catch (error) {
      console.error("Error al procesar la recompensa:", error);
      set({ isProcessingReward: false });
    }
  }
}));