import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Spell } from '@/types';

type SpellState = {
  spells: Spell[];
  addSpell: (spell: Spell) => void;
  updateSpell: (spell: Spell) => void;
  deleteSpell: (spellId: number) => void;
  getSpellById: (id: number) => Spell | undefined;
};

export const useSpellStore = create<SpellState>()(
  persist(
    (set, get) => ({
      spells: [
        { id: 900, category: 'xxx', description: "xxx", rank: 1, name: "Jolt", xpCost: 0, skillCost: 0 },
        { id: 901, category: 'xxx', description: "xxx", rank: 1, name: "Magical Armor", xpCost: 10, skillCost: 3 },
        { id: 902, category: 'xxx', description: "xxx", rank: 1, name: "Self Stasis", xpCost: 10, skillCost: 3 },
        { id: 903, category: 'xxx', description: "xxx", rank: 1, name: "Hearth", xpCost: 10, skillCost: 1 },
        { id: 904, category: 'xxx', description: "xxx", rank: 1, name: "Temporary Repair", xpCost: 10, skillCost: 3 },
        { id: 905, category: 'xxx', description: "xxx", rank: 1, name: "Arcane Circle", xpCost: 10, skillCost: 5 },
        { id: 906, category: 'xxx', description: "xxx", rank: 1, name: "Lock", xpCost: 10, skillCost: 5 },
        { id: 907, category: 'xxx', description: "xxx", rank: 1, name: "Repulse", xpCost: 10, skillCost: 2 },
        { id: 908, category: 'xxx', description: "xxx", rank: 1, name: "Magic Blast", xpCost: 10, skillCost: 3 },
        { id: 909, category: 'xxx', description: "xxx", rank: 1, name: "Arcane Force", xpCost: 10, skillCost: 3 },	
        { id: 910, category: 'xxx', description: "xxx", rank: 1, name: "Light", xpCost: 10, skillCost: 0 },
        { id: 911, category: 'xxx', description: "xxx", rank: 1, name: "Shatter", xpCost: 10, skillCost: 2, specialEffect: "5 Perm Wounds" },
        { id: 912, category: 'xxx', description: "xxx", rank: 1, name: "Paralyze", xpCost: 10, skillCost: 3, specialEffect: "3 - Self Short Slow" },
        { id: 913, category: 'xxx', description: "xxx", rank: 1, name: "Obscure",  xpCost: 10, skillCost: 3, specialEffect: "3 Perm Wounds" },
        { id: 914, category: 'xxx', description: "xxx", rank: 1, name: "Slow", xpCost: 10, skillCost: 3, specialEffect: "1 PW - Self Short Knockdown" },
        { id: 915, category: 'xxx', description: "xxx", rank: 1, name: "Berserk", xpCost: 10, skillCost: 3, specialEffect: "3 PW - Self Short Fear of Target" },
        { id: 916, category: 'xxx', description: "xxx", rank: 1, name: "Fear", xpCost: 10, skillCost: 3, specialEffect: "3 PW - Quick Stun" },
        { id: 917, category: 'xxx', description: "xxx", rank: 1, name: "Shift Wound", xpCost: 10, skillCost: 3, specialEffect: "Special" },
        { id: 918, category: 'xxx', description: "xxx", rank: 1, name: "Return the Dead", xpCost: 15, skillCost: 0, specialEffect: "All Remaining Skill" },
        { id: 919, category: 'xxx', description: "xxx", rank: 1, name: "Shadow Blast", xpCost: 15, skillCost: 0, specialEffect: "5 Perm Wounds" },
        { id: 920, category: 'xxx', description: "xxx", rank: 1, name: "Siphon", xpCost: 15, skillCost: 0, specialEffect: "2 Perm Wounds" },
        { id: 921, category: 'xxx', description: "xxx", rank: 1, name: "Animal Empathy", xpCost: 0, skillCost: 0 },
        { id: 922, category: 'xxx', description: "xxx", rank: 1, name: "Purify", xpCost: 0, skillCost: 0 },
        { id: 923, category: 'xxx', description: "xxx", rank: 1, name: "Decompose", xpCost: 0, skillCost: 0 },
        { id: 924, category: 'xxx', description: "xxx", rank: 1, name: "Root Snare", xpCost: 10, skillCost: 0 },
        { id: 925, category: 'xxx', description: "xxx", rank: 1, name: "Delay", xpCost: 10, skillCost: 0 },
        { id: 926, category: 'xxx', description: "xxx", rank: 1, name: "Restore", xpCost: 10, skillCost: 0 },
        { id: 927, category: 'xxx', description: "xxx", rank: 1, name: "Calm", xpCost: 10, skillCost: 0 },
        { id: 928, category: 'xxx', description: "xxx", rank: 1, name: "Camouflage", xpCost: 10, skillCost: 0 },
        { id: 929, category: 'xxx', description: "xxx", rank: 1, name: "Circle of Life", xpCost: 15, skillCost: 0 },
        { id: 930, category: 'xxx', description: "xxx", rank: 1, name: "Restorative Slumber", xpCost: 15, skillCost: 0 },
        { id: 931, category: 'xxx', description: "xxx", rank: 1, name: "Whisper on the Wind", xpCost: 15, skillCost: 0 },
        { id: 932, category: 'xxx', description: "xxx", rank: 1, name: "Shield of Thorns", xpCost: 15, skillCost: 0 },
        { id: 600, category: 'xxx', description: "xxx", rank: 1, name: "Empowered Jolt", xpCost: 10, skillCost: 0 },
        { id: 601, category: 'xxx', description: "xxx", rank: 2, name: "Liberate", xpCost: 10, skillCost: 0 },
        { id: 602, category: 'xxx', description: "xxx", rank: 2, name: "Remove Curse", xpCost: 10, skillCost: 0 },
        { id: 603, category: 'xxx', description: "xxx", rank: 2, name: "Avert Death", xpCost: 10, skillCost: 0 },
        { id: 604, category: 'xxx', description: "xxx", rank: 2, name: "Force Shield", xpCost: 10, skillCost: 0 },
        { id: 605, category: 'xxx', description: "xxx", rank: 2, name: "Steal Vigor", xpCost: 10, skillCost: 2, specialEffect: "2 Perm Wounds" },
        { id: 606, category: 'xxx', description: "xxx", rank: 2, name: "Superbolide", xpCost: 15, skillCost: 0, specialEffect: "Body to 1 - Short Desecrate" },
        { id: 607, category: 'xxx', description: "xxx", rank: 2, name: "Natures Fury: Day", xpCost: 0, skillCost: 2, specialEffect: "Fireball" },
        { id: 608, category: 'xxx', description: "xxx", rank: 2, name: "Natures Fury: Night", xpCost: 0, skillCost: 3, specialEffect: "Poison Bite" },
        { id: 609, category: 'xxx', description: "xxx", rank: 2, name: "Natures Fury: Rain", xpCost: 0, skillCost: 1, specialEffect: "Thundering Strike" },
        { id: 610, category: 'xxx', description: "xxx", rank: 2, name: "Natures Embrace: Day", xpCost: 0, skillCost: 0, specialEffect: "Wild Strength" },
        { id: 611, category: 'xxx', description: "xxx", rank: 2, name: "Natures Embrace: Night", xpCost: 0, skillCost: 1, specialEffect: "Natural Resilience" },
        { id: 612, category: 'xxx', description: "xxx", rank: 2, name: "Natures Embrace: Rain", xpCost: 0, skillCost: 0, specialEffect: "Refreshing Rain" },
        { id: 613, category: 'xxx', description: "xxx", rank: 2, name: "Natures Spite: Day", xpCost: 0, skillCost: 3, specialEffect: "Curse of Fire" },
        { id: 614, category: 'xxx', description: "xxx", rank: 2, name: "Natures Spite: Night", xpCost: 0, skillCost: 3, specialEffect: "Curse of Ice" },
        { id: 615, category: 'xxx', description: "xxx", rank: 2, name: "Natures Spite: Rain", xpCost: 0, skillCost: 3, specialEffect: "Curse of Magic" }
      ],

      addSpell: (spell) =>
        set((state) => ({
          spells: [...state.spells, spell],
        })),

      updateSpell: (updatedSpell) =>
        set((state) => ({
          spells: state.spells.map((s) =>
            s.id === updatedSpell.id ? updatedSpell : s
          ),
        })),

      deleteSpell: (spellId) =>
        set((state) => ({
          spells: state.spells.filter((s) => s.id !== spellId),
        })),

      getSpellById: (id) => get().spells.find((s) => s.id === id),
    }),
    {
      name: 'spell-storage', // localStorage key
    }
  )
);
