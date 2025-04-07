import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MagicItem } from '@/types';

type MagicItemStore = {
  items: MagicItem[];
  addItem: (item: MagicItem) => void;
  updateItem: (id: number, updates: Partial<MagicItem>) => void;
  deleteItem: (id: number) => void;
  getItemById: (id: number) => MagicItem | undefined;
  getItemByCharacterId: (characterId: number) => MagicItem[];
  updateMinorAbility: (
    itemId: number,
    abilityId: number,
    updates: Partial<MagicItem['minorAbilities'][number]>
  ) => void;
  updateMajorAbility: (
    itemId: number,
    abilityId: number,
    updates: Partial<MagicItem['majorAbilities'][number]>
  ) => void;
};

export const useMagicItemStore = create<MagicItemStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, deleted: false }],
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),

      deleteItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, deleted: true } : item
          ),
        })),

      getItemById: (id) => get().items.find((item) => item.id === id),

      getItemByCharacterId: (characterId) =>
        get().items.filter((item) => item.characterId === characterId && !item.deleted),

      updateMinorAbility: (itemId, abilityId, updates) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id !== itemId || !item.minorAbilities) return item;

            const updatedAbilities = item.minorAbilities.map((ability) =>
              ability.id === abilityId ? { ...ability, ...updates } : ability
            );

            const totalCxP = updatedAbilities.reduce((sum, ability) => {
              return (
                sum +
                (ability.box1?.spent ?? 0) +
                (ability.box2?.spent ?? 0) +
                (ability.box3?.spent ?? 0)
              );
            }, item.majorAbilities?.reduce((sum, ability) => {
              return (
                sum +
                (ability.box1?.spent ?? 0) +
                (ability.box2?.spent ?? 0) +
                (ability.box3?.spent ?? 0)
              );
            }, 0) ?? 0);

            return {
              ...item,
              minorAbilities: updatedAbilities,
              cXpSpent: totalCxP,
            };
          });

          return { items: updatedItems };
        }),

      updateMajorAbility: (itemId, abilityId, updates) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id !== itemId || !item.majorAbilities) return item;

            const updatedAbilities = item.majorAbilities.map((ability) =>
              ability.id === abilityId ? { ...ability, ...updates } : ability
            );

            const totalCxP = (item.minorAbilities ?? []).reduce((sum, ability) => {
              return (
                sum +
                (ability.box1?.spent ?? 0) +
                (ability.box2?.spent ?? 0) +
                (ability.box3?.spent ?? 0)
              );
            }, 0) + updatedAbilities.reduce((sum, ability) => {
              return (
                sum +
                (ability.box1?.spent ?? 0) +
                (ability.box2?.spent ?? 0) +
                (ability.box3?.spent ?? 0)
              );
            }, 0);

            return {
              ...item,
              majorAbilities: updatedAbilities,
              cXpSpent: totalCxP,
            };
          });

          return { items: updatedItems };
        }),
    }),
    {
      name: 'magic-item-storage',
    }
  )
);