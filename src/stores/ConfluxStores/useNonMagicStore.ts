import type { NonMagicItem } from "@/confluxTypes";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NonMagicItemState = {
  nonMagicItems: NonMagicItem[];
  setNonMagicItems: (nonMagicItems: NonMagicItem[]) => void;
  getNonMagicItemById: (id: number) => NonMagicItem | undefined;
  getNonMagicItemsById: (ids: number[]) => NonMagicItem[];
  addNonMagicItem: (nonMagicItem: NonMagicItem) => void;
  updateNonMagicItem: (updateNonMagicItem: NonMagicItem) => void;
  deleteNonMagicItem: (nonMagicItemId: number) => void;
};

const nonMagicItemData: NonMagicItem[] = [];

export const useNonMagicItemStore = create<NonMagicItemState>()(
  persist(
    (set, get) => ({
      nonMagicItems: nonMagicItemData,

      setNonMagicItems: (nonMagicItems: NonMagicItem[]) => set({ nonMagicItems }),

      getNonMagicItemById: (id) => get().nonMagicItems.find((nonMagicItem) => nonMagicItem.id === id),

      getNonMagicItemsById: (ids) =>
        get().nonMagicItems.filter((nonMagicItem) => ids.includes(nonMagicItem.id)),

      addNonMagicItem: (nonMagicItem) =>
        set((state) => ({
          nonMagicItems: [...state.nonMagicItems, nonMagicItem],
        })),

      updateNonMagicItem: (updatedNonMagicItem) =>
        set((state) => ({
          nonMagicItems: state.nonMagicItems.map((nonMagicItem) =>
            nonMagicItem.id === updatedNonMagicItem.id ? updatedNonMagicItem : nonMagicItem
          ),
        })),

      deleteNonMagicItem: (nonMagicItemId: number) =>
        set((state) => ({
          nonMagicItems: state.nonMagicItems.filter((nonMagicItem) => nonMagicItem.id !== nonMagicItemId),
        })),

    }),
    {
      name: 'item-storage',
    }
  )
);