import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '@/types/index';
import { useSkillStore } from './useSkillStore';
import type { Trait } from '@/types/index'; 
import { useSpellStore } from './useSpellStore';

type CharacterState = {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  getCharacterById: (id: number) => Character | undefined;
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  patchCharacter: (characterId: number, updates: Partial<Character>) => void;
  removeCharacter: (id: number) => void;
  getCharactersForPlayer: (playerId: number) => Character[];
  addSkillToCharacter: (characterId: number, skillId: number) => void;
  removeSkillFromCharacter: (characterId: number, skillId: number) => void;
  removeSpellFromCharacter: (characterId: number, spellId: number) => void; 
  removeTraitFromCharacter: (characterId: number, traitId: number) => void;
  getCharacterSkillRank: (characterId: number, skillId: number) => number;
  getCourtXpSpentForCharacter: (characterId: number) => number;
  getXpSpentForCharacter: (characterId: number) => number;
  updateCharacterMagicItemCxp: (characterId: number, change: number) => void;
  addSpellToCharacter: (characterId: number, spell: { spellId: number; cxpUsed: number; initialSpell: boolean }) => void;
  addBoonToCharacter: (characterId: number, boonId: number) => void;
  removeBoonFromCharacter: (characterId: number, boonId: number) => void;
  addTraitToCharacter: (characterId: number, trait: number ) => void;
  deleteCharacter: (id: number) => void; 
};

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      characters: [],
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

      getCharacterById: (id) => get().characters.find((character) => character.id === id),
      
      setCharacters: (characters: Character[]) => set({ characters }),

      updateCharacter: (character) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === character.id ? character : char
          ),
        })),

      patchCharacter: (characterId: number, updates: Partial<Character>) =>
        set((state) => ({
          characters: state.characters.map((char) => {
            if (char.id !== characterId) return char;
      
            const { xp, ...rest } = updates;
      
            return {
              ...char,
              ...(char.xp >= 210 ? {} : { xp }), // Only apply XP if under 210
              ...rest, // Apply all other updates unconditionally
            };
          }),
        })),

      removeCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((c) => c.id !== id),
        })),

      getCharactersForPlayer: (playerId: number) =>
        get().characters.filter(
          (char) => char.playerId === playerId && !char.deleted
        ),

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
      
      removeSkillFromCharacter: (characterId, skillId) => {
        set((state) => {
          return {
            characters: state.characters.map((character) => {
              if (character.id !== characterId) return character;
      
              const updatedSkills = character.skills.map((skill) => {
                if (skill.skillId === skillId) {
                  // Decrease rank if > 1, otherwise we’ll remove later
                  return skill.rank > 1
                    ? { ...skill, rank: skill.rank - 1 }
                    : null; // mark for removal
                }
                return skill;
              }).filter(Boolean) as typeof character.skills;
      
              return {
                ...character,
                skills: updatedSkills,
              };
            }),
          };
        });
      },
      

      removeSpellFromCharacter: (characterId, spellId) => {
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? {
                  ...char,
                  spells: char.spells?.filter((s) => s.spellId !== spellId) ?? [],
                }
              : char
          ),
        }));
      },

      removeTraitFromCharacter: (characterId, traitId) => {
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? {
                  ...char,
                  traits: char.traits?.filter((t) => t !== traitId) ?? [],
                }
              : char
          ),
        }));
      },

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
        const allSpells = useSpellStore.getState().spells;

        const xpFromSkills = character.skills?.reduce((totalXp, { skillId, rank, cxpByRank }) => {
          const skill = allSkills.find((s) => s.id === skillId);
          if (!skill) return totalXp;

          const xpForSkill = Array.from({ length: rank }).reduce<number>((sum, _, i) => {
            const cxpUsed = cxpByRank?.[i] ?? 0;
            const xpCost = Math.max(0, skill.xpCost - cxpUsed);
            return sum + xpCost;
          }, 0);

          return totalXp + xpForSkill;
        }, 0) ?? 0;

        const xpFromSpells = character.spells?.reduce((totalXp, { spellId, cxpUsed, initialSpell }) => {
          const spell = allSpells.find((s) => s.id === spellId);
          if (!spell) return totalXp;

          const xpCost = initialSpell ? 0 : Math.max(0, spell.xpCost - (cxpUsed ?? 0));
          return totalXp + xpCost;
        }, 0) ?? 0;

        return xpFromSkills + xpFromSpells;
      },

      updateCharacterMagicItemCxp: (characterId, change) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? { ...char, magicItemCxp: Math.max((char.magicItemCxp ?? 0) + change, 0) }
              : char
          ),
        })),

      addSpellToCharacter: (characterId: number, spell: { spellId: number; cxpUsed: number; initialSpell: boolean }) =>
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

      addTraitToCharacter: (characterId: number, trait: Trait) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? {
                  ...char,
                  traits: [...(char.traits || []), trait.id], // ✅ only the number
                }
              : char
          ),
        })),

        deleteCharacter: (id: number) => {
          set((state) => ({
            characters: state.characters.map((char) =>
              char.id === id ? { ...char, deleted: true } : char
            ),
          }));
        },
    }),
    {
      name: 'character-storage', // localStorage key
    }
  )
);