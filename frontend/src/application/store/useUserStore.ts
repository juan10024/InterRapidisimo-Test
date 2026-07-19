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

interface PointsGain {
  id: number;
  amount: number;
}

interface UserState {
  userId: string | null;
  points: number;
  activities: Activity[];
  isLoadingUser: boolean;
  userError: string | null;
  isProcessingReward: boolean;
  pointsGain: PointsGain | null;
  loadCurrentUser: () => Promise<void>;
  dismissPointsGain: () => void;
  triggerRewardAction: (productId: string, actionType: RewardActionRequest['actionType'], description: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  points: 0,
  // Actividades iniciales para poblar el UI basado en el diseño
  activities: [
    { id: 'evt-1', description: 'Inicio de Sesión Diario', points: 10, icon: 'military_tech' },
    { id: 'evt-2', description: 'Lista de Deseos Compartida', points: 25, icon: 'share' }
  ],
  isLoadingUser: false,
  userError: null,
  isProcessingReward: false,
  pointsGain: null,

  loadCurrentUser: async () => {
    if (get().isLoadingUser) {
      return;
    }

    set({ isLoadingUser: true, userError: null });
    try {
      const response = await apiClient.getCurrentUser();
      set({
        userId: response.data.user.id,
        points: response.data.user.pointsBalance,
        isLoadingUser: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No fue posible cargar el perfil de usuario.';
      console.error('Error al cargar el perfil de usuario:', error);
      set({ userId: null, isLoadingUser: false, userError: message });
    }
  },

  dismissPointsGain: () => set({ pointsGain: null }),

  triggerRewardAction: async (productId, actionType, description) => {
    const { userId } = get();
    if (!userId) {
      set({ userError: 'No se puede procesar una recompensa sin un perfil de usuario cargado.' });
      return;
    }

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
            icon: actionType === 'ADD_TO_CART' ? 'shopping_bag'
                : actionType === 'FAVORITE'   ? 'favorite'
                : actionType === 'PURCHASE'   ? 'receipt_long'
                : 'local_fire_department'
          },
          ...state.activities
        ],
        isProcessingReward: false,
        pointsGain: { id: Date.now(), amount: response.data.pointsAwarded }
      }));
    } catch (error) {
      console.error("Error al procesar la recompensa:", error);
      set({ isProcessingReward: false });
    }
  }
}));