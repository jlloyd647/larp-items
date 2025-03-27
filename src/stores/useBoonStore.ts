import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Boon } from '@/types';

interface BoonState {
  boons: Boon[];
  addBoon: (boon: Boon) => void;
  updateBoon: (boon: Boon) => void;
  removeBoon: (id: number) => void;
  getBoonById: (id: number) => Boon | undefined;
}

export const useBoonStore = create<BoonState>()(
  persist(
    (set, get) => ({
      boons: [],

      addBoon: (boon) =>
        set((state) => ({
          boons: [...state.boons, boon],
        })),

      updateBoon: (updatedBoon) =>
        set((state) => ({
          boons: state.boons.map((b) =>
            b.id === updatedBoon.id ? updatedBoon : b
          ),
        })),

      removeBoon: (id) =>
        set((state) => ({
          boons: state.boons.filter((b) => b.id !== id),
        })),

      getBoonById: (id) => get().boons.find((b) => b.id === id),
    }),
    {
      name: 'boon-storage',
    }
  )
);
