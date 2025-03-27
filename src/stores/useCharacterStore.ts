import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '@/types/index';
import { useSkillStore } from './useSkillStore';

type CharacterState = {
  characters: Character[];
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
  getCharactersForPlayer: (playerId: number) => Character[];
  addSkillToCharacter: (characterId: number, skillId: number) => void;
  removeSkillFromCharacter: (characterId: number, skillId: number) => void;
  getCharacterSkillRank: (characterId: number, skillId: number) => number;
  getCourtXpSpentForCharacter: (characterId: number) => number;
  getXpSpentForCharacter: (characterId: number) => number;
  addSpellToCharacter: (characterId: number, spell: { spellId: number; cxpUsed: number }) => void;
  addBoonToCharacter: (characterId: number, boonId: number) => void;
  removeBoonFromCharacter: (characterId: number, boonId: number) => void;
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      characters: [
        {
          id: 1,
          playerId: 1,
          name: "Vanilla",
          xp: 100,
          courtXp: 20,
          court: "Umbral",
          bank: 250,
          magicItem: "",
          magicItemCXp: 50,
          deaths: 0,
          path: "",
          prologue: "",
          communityPoints: 0,
          characterRace: "Kith",
          skills: [],
        },
        {
          id: 2,
          playerId: 2,
          name: "Calamity",
          courtXp: 20,
          court: "Umbral",
          bank: 250,
          magicItem: "",
          magicItemCXp: 50,
          deaths: 0,
          path: "",
          prologue: "",
          communityPoints: 0,
          characterRace: "Kith",
          xp: 210,
          skills: [],
        },
        {
          id: 3,
          playerId: 3,
          name: "Ahnesti",
          xp: 150,
          courtXp: 20,
          court: "Umbral",
          bank: 250,
          magicItem: "",
          magicItemCXp: 50,
          deaths: 0,
          path: "",
          prologue: "",
          communityPoints: 0,
          characterRace: "Kith",
          skills: [],
        },
        {
          id: 101,
          playerId: 1,
          name: "Ezekiel",
          courtXp: 20,
          court: "Umbral",
          bank: 250,
          magicItem: "",
          magicItemCXp: 50,
          deaths: 0,
          path: "",
          prologue: "",
          communityPoints: 0,
          characterRace: "Kith",
          xp: 210,
          skills: [],
        },
      ],
      addCharacter: (char) =>
        set((state) => ({
          characters: [
            ...state.characters,
            {
              ...char,
              playerId: Number(char.playerId), // ✅ ensure number type
            },
          ],
        })),

      updateCharacter: (character) =>
        set((state) => ({
          characters: state.characters.map((c) =>
            c.id === character.id ? character : c
          ),
        })),

      removeCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((c) => c.id !== id),
        })),

      getCharactersForPlayer: (playerId) =>
        get().characters.filter((c) => c.playerId === playerId),

      addSkillToCharacter: (characterId, skillId, cxpUsed = 0) => {
        const skill = useSkillStore.getState().getSkillById(skillId);
        if (!skill) {
          console.warn(`[addSkillToCharacter] Skill ${skillId} not found`);
          return;
        }
      
        const character = get().characters.find((c) => c.id === characterId);
        if (!character) {
          console.warn(`[addSkillToCharacter] Character ${characterId} not found`);
          return;
        }
      
        const skillCurrent = character.skills.find((s) => s.skillId === skillId);
        const currentRank = skillCurrent?.rank ?? 0;
      
        if (currentRank >= skill.ranks) {
          console.log(`[addSkillToCharacter] ${skill.name} already at max rank`);
          return;
        }
      
        const totalCxpSpent = get().getCourtXpSpentForCharacter(characterId);
        const availableCxp = character.courtXp - totalCxpSpent;
        const actualCxpUsed = Math.min(cxpUsed, availableCxp);
      
        const adjustedXpCost = Math.max(0, skill.xpCost - actualCxpUsed);
        const currentXpSpent = get().getCourtXpSpentForCharacter(characterId);
        const newXpTotal = currentXpSpent + adjustedXpCost;
      
        if (newXpTotal > character.xp) {
          console.warn(`[addSkillToCharacter] Not enough XP to add ${skill.name} (needs ${adjustedXpCost}, has ${character.xp - currentXpSpent})`);
          return;
        }
      
        set((state) => ({
          characters: state.characters.map((char) => {
            if (char.id !== characterId) return char;
      
            if (!skillCurrent) {
              // New skill
              return {
                ...char,
                skills: [
                  ...char.skills,
                  {
                    skillId,
                    rank: 1,
                    cxpByRank: [actualCxpUsed],
                  },
                ],
              };
            }
      
            // Skill exists — rank it up
            return {
              ...char,
              skills: char.skills.map((s) =>
                s.skillId === skillId
                  ? {
                      ...s,
                      rank: s.rank + 1,
                      cxpByRank: [...s.cxpByRank, actualCxpUsed],
                    }
                  : s
              ),
            };
          }),
        }));
      },       
      
      getCharacterSkillRank: (characterId, skillId) => {
        const character = get().characters.find((c) => c.id === characterId);
        if (!character) return 0;
      
        const skill = character.skills.find((s) => s.skillId === skillId);
        return skill?.rank ?? 0;
      },
      
      removeSkillFromCharacter: (characterId, skillId) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? {
              ...char,
              skills: char.skills.filter((s) => s.skillId !== skillId),
            }
          : char
        ),
      })),

      getCourtXpSpentForCharacter: (characterId) => {
        const character = get().characters.find((c) => c.id === characterId);
        if (!character) return 0;
      
        const skillCxp = character.skills.reduce((total, skill) => {
          const cxpSum = skill.cxpByRank?.reduce((sum, cxp) => sum + cxp, 0) ?? 0;
          return total + cxpSum;
        }, 0);
      
        const magicCxp = character.magicItemCxp ?? 0;
      
        return skillCxp + magicCxp;
      },

      getXpSpentForCharacter: (characterId: number): number => {
        const character = get().characters.find((c) => c.id === characterId);
        if (!character) return 0;
      
        const allSkills = useSkillStore.getState().skills;
      
        return character.skills.reduce((totalXp, { skillId, rank, cxpByRank }) => {
          const skill = allSkills.find((s) => s.id === skillId);
          if (!skill) return totalXp;
      
          const xpForSkill = Array.from({ length: rank }).reduce<number>((sum, _, i) => {
            const cxpUsed = cxpByRank?.[i] ?? 0;
            const xpCost = Math.max(0, skill.xpCost - cxpUsed);
            return sum + xpCost;
          }, 0);
      
          return totalXp + xpForSkill;
        }, 0);
      },

      addSpellToCharacter: (characterId: number, spell: { spellId: number; cxpUsed: number }) =>
        set((state) => ({
          characters: state.characters.map((c) => {
            if (Number(c.id) !== Number(characterId)) return c;
      
            const existingSpells = c.spells ?? []; // Fallback to empty array
            return {
              ...c,
              spells: [...existingSpells, spell],
            };
          }),
        })),

      addBoonToCharacter: (characterId: number, boonId: number) => {
        set((state) => ({
          characters: state.characters.map((char) => {
            if (char.id !== characterId) return char;
      
            const currentBoons = char.boons ?? [];
            if (currentBoons.includes(boonId)) {
              console.warn(`Character ${characterId} already has boon ${boonId}`);
              return char;
            }
      
            return {
              ...char,
              boons: [...currentBoons, boonId],
            };
          }),
        }));
      },

      removeBoonFromCharacter: (characterId: number, boonId: number) => {
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? {
                  ...char,
                  boons: (char.boons ?? []).filter((id) => id !== boonId),
                }
              : char
          ),
        }));
      },
    }),
    {
      name: 'character-storage', // localStorage key
    }
  )
);