import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '@/types/index';

type CharacterState = {
  characters: Character[];
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
  getCharactersForPlayer: (playerId: number) => Character[];
  addSkillToCharacter: (characterId: number, skillId: number) => void;
  removeSkillFromCharacter: (characterId: number, skillId: number) => void;
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
          skills: [],
        },
        {
          id: 2,
          playerId: 2,
          name: "Calamity",
          xp: 210,
          skills: [],
        },
        {
          id: 3,
          playerId: 3,
          name: "Ahnesti",
          xp: 150,
          skills: [],
        },
        {
          id: 101,
          playerId: 1,
          name: "Ezekiel",
          xp: 210,
          skills: [],
        },
      ],
      addCharacter: (character) =>
        set((state) => ({ characters: [...state.characters, character] })),

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

      addSkillToCharacter: (characterId: number, skillId: number) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId && !char.skills.includes(skillId)
              ? { ...char, skills: [...char.skills, skillId] }
              : char
          ),
        })),
      
      removeSkillFromCharacter: (characterId: number, skillId: number) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === characterId
              ? { ...char, skills: char.skills.filter((id) => id !== skillId) }
              : char
          ),
        })),
    }),
    {
      name: 'character-storage', // localStorage key
    }
  )
);