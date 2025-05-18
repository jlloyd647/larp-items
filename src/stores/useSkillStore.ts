import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Skill } from '@/types/index';

type SkillState = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  getSkillById: (id: number) => Skill | undefined;
  getSkillsByIds: (ids: number[]) => Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (updatedSkill: Skill) => void;
  deleteSkill: (skillId: number) => void;
};

const skillData: Skill[] = [];

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      skills: skillData,

      setSkills: (skills: Skill[]) => set({ skills }),

      getSkillById: (id) => get().skills.find((skill) => skill.id === id),

      getSkillsByIds: (ids) =>
        get().skills.filter((skill) => ids.includes(skill.id)),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),

      updateSkill: (updatedSkill) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === updatedSkill.id ? updatedSkill : skill
          ),
        })),

      deleteSkill: (skillId: number) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== skillId),
        })),
    }),
    {
      name: 'skill-storage',
    }
  )
);
