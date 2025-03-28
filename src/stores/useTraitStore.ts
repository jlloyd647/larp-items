import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Trait } from '@/types';

export type TraitState = {
  traits: Trait[];
  addTrait: (trait: Trait) => void;
  updateTrait: (trait: Trait) => void;
  deleteTrait: (id: number) => void;
  getTraitById: (id: number) => Trait | undefined;
};

export const useTraitStore = create<TraitState>()(
  persist(
    (set, get) => ({
      traits: [],

      addTrait: (trait) =>
        set((state) => ({
          traits: [...state.traits, trait],
        })),

      updateTrait: (updated) =>
        set((state) => ({
          traits: state.traits.map((t) =>
            t.id === updated.id ? updated : t
          ),
        })),

      deleteTrait: (id) =>
        set((state) => ({
          traits: state.traits.filter((t) => t.id !== id),
        })),

      getTraitById: (id) => get().traits.find((t) => t.id === id),
    }),
    {
      name: 'trait-storage',
    }
  )
);