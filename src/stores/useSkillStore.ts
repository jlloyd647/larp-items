import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Skill } from '@/types/index';

type SkillState = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  getSkillById: (id: number) => Skill | undefined;
  getSkillsByIds: (ids: number[]) => Skill[];
  updateSkill: (updatedSkill: Skill) => void;
  deleteSkill: (skillId: number) => void;
};

const skillData: Skill[] = [
  { id: 100, category: '1', desc: 'Xxxxxxxxxx', name: 'Blind Fighting', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 101, category: '1', desc: 'Xxxxxxxxxx', name: 'Cover Tracks', xpCost: 15, ranks: 2, skillCost: 5 }, 
  { id: 102, category: '1', desc: 'Xxxxxxxxxx', name: 'Journeymen Tracker', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 103, category: '1', desc: 'Xxxxxxxxxx', name: 'Rope Use', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 104, category: '1', desc: 'Xxxxxxxxxx', name: 'Sailing', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 105, category: '1', desc: 'Xxxxxxxxxx', name: 'Search Person', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 106, category: '1', desc: 'Xxxxxxxxxx', name: 'Spelunker', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 107, category: '1', desc: 'Xxxxxxxxxx', name: 'Survivalist', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 108, category: '2', desc: 'Xxxxxxxxxx', name: 'Avoidance', xpCost: 20, ranks: 1, skillCost: 6 }, 
  { id: 109, category: '2', desc: 'Xxxxxxxxxx', name: 'Backstab', xpCost: 5, ranks: 3, skillCost: 0 }, 
  { id: 110, category: '2', desc: 'Xxxxxxxxxx', name: 'Disable Limb', xpCost: 15, ranks: 1, skillCost: 3 }, 
  { id: 111, category: '2', desc: 'Xxxxxxxxxx', name: 'Dual Wield', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 112, category: '2', desc: 'Xxxxxxxxxx', name: 'Feat of Strength', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 113, category: '2', desc: 'Xxxxxxxxxx', name: 'Firm Grip', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 114, category: '2', desc: 'Xxxxxxxxxx', name: 'Heavy Armor Affinity', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 115, category: '2', desc: 'Xxxxxxxxxx', name: 'Lesser Stamina', xpCost: 5, ranks: 5, skillCost: 0 }, 
  { id: 116, category: '2', desc: 'Xxxxxxxxxx', name: 'Light Armor Affinity', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 117, category: '2', desc: 'Xxxxxxxxxx', name: 'Mortal Strike', xpCost: 10, ranks: 2, skillCost: 3 }, 
  { id: 118, category: '2', desc: 'Xxxxxxxxxx', name: 'One Handed Prof', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 119, category: '2', desc: 'Xxxxxxxxxx', name: 'Parry', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 120, category: '2', desc: 'Xxxxxxxxxx', name: 'Shield Bash', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 121, category: '2', desc: 'Xxxxxxxxxx', name: 'Shield Guard', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 122, category: '2', desc: 'Xxxxxxxxxx', name: 'Steady Footing', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 123, category: '2', desc: 'Xxxxxxxxxx', name: 'Sunder Armor', xpCost: 10, ranks: 1, skillCost: 5 }, 
  { id: 124, category: '2', desc: 'Xxxxxxxxxx', name: 'Two Handed Prof', xpCost: 5, ranks: 5, skillCost: 0 }, 
  { id: 125, category: '2', desc: 'Xxxxxxxxxx', name: 'Unavoidable', xpCost: 15, ranks: 1, skillCost: 2 }, 
  { id: 126, category: '3', desc: 'Xxxxxxxxxx', name: 'Aimed Shot', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 127, category: '3', desc: 'Xxxxxxxxxx', name: 'HC Gun Proficiency', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 128, category: '3', desc: 'Xxxxxxxxxx', name: 'LC Gun Proficiency', xpCost: 15, ranks: 4, skillCost: 0 }, 
  { id: 129, category: '3', desc: 'Xxxxxxxxxx', name: 'Muffled Shot', xpCost: 5, ranks: 1, skillCost: 2 }, 
  { id: 130, category: '3', desc: 'Xxxxxxxxxx', name: 'Threaten', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 131, category: '3', desc: 'Xxxxxxxxxx', name: 'Trick Shot', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 132, category: '3', desc: 'Xxxxxxxxxx', name: 'Warning Shot', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 134, category: '4', desc: 'Xxxxxxxxxx', name: 'Awaken', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 135, category: '4', desc: 'Xxxxxxxxxx', name: 'Detox', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 136, category: '4', desc: 'Xxxxxxxxxx', name: 'Diagnose', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 137, category: '4', desc: 'Xxxxxxxxxx', name: 'Ease Pain', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 138, category: '4', desc: 'Xxxxxxxxxx', name: 'Field Surgery', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 139, category: '4', desc: 'Xxxxxxxxxx', name: 'Firemans Carry', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 140, category: '4', desc: 'Xxxxxxxxxx', name: 'Mend Wound', xpCost: 10, ranks: 3, skillCost: 2 }, 
  { id: 141, category: '4', desc: 'Xxxxxxxxxx', name: 'Reset Limb', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 142, category: '4', desc: 'Xxxxxxxxxx', name: 'Treat Waylaid', xpCost: 5, ranks: 1, skillCost: 1 }, 
  { id: 143, category: '4', desc: 'Xxxxxxxxxx', name: 'Triage', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 144, category: '5', desc: 'Xxxxxxxxxx', name: 'Barter', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 145, category: '5', desc: 'Xxxxxxxxxx', name: 'Dauntless', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 146, category: '5', desc: 'Xxxxxxxxxx', name: 'Distraction', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 147, category: '5', desc: 'Xxxxxxxxxx', name: 'Chicanery', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 148, category: '5', desc: 'Xxxxxxxxxx', name: 'Feign Death', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 149, category: '5', desc: 'Xxxxxxxxxx', name: 'Forgery', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 150, category: '5', desc: 'Xxxxxxxxxx', name: 'Interrogation', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 151, category: '5', desc: 'Xxxxxxxxxx', name: 'Silver Tongue', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 152, category: '6', desc: 'Xxxxxxxxxx', name: 'Ambush', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 153, category: '6', desc: 'Xxxxxxxxxx', name: 'Escapism', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 154, category: '6', desc: 'Xxxxxxxxxx', name: 'Hamstring', xpCost: 5, ranks: 1, skillCost: 2 }, 
  { id: 155, category: '6', desc: 'Xxxxxxxxxx', name: 'Hide', xpCost: 15, ranks: 1, skillCost: 3 }, 
  { id: 156, category: '6', desc: 'Xxxxxxxxxx', name: 'PickLock: Journeyman', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 157, category: '6', desc: 'Xxxxxxxxxx', name: 'Smuggle', xpCost: 5, ranks: 3, skillCost: 0 }, 
  { id: 158, category: '6', desc: 'Xxxxxxxxxx', name: 'Waylay', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 159, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Arcane Knowledge', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 160, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Artificer Knowledge', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 161, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Shadow Magic Knowledge', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 162, category: '7', desc: 'Xxxxxxxxxx', name: 'App. Wild Magic Knowledge', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 163, category: '7', desc: 'Xxxxxxxxxx', name: 'Jolt Proficiency', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 165, category: '7', desc: 'Xxxxxxxxxx', name: 'Artificer: Additional Socket', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 166, category: '7', desc: 'Xxxxxxxxxx', name: 'Artificer: Emergency Re-Fit', xpCost: 15, ranks: 2, skillCost: 0 }, 
  { id: 167, category: '7', desc: 'Xxxxxxxxxx', name: 'Artificer: Identify Gem', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 172, category: '8', desc: 'Xxxxxxxxxx', name: 'Artisan', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 173, category: '8', desc: 'Xxxxxxxxxx', name: 'Scrounger', xpCost: 10, ranks: 4, skillCost: 0 }, 
  { id: 174, category: '8', desc: 'Xxxxxxxxxx', name: 'Skinner/Tanner', xpCost: 10, ranks: 4, skillCost: 1 }, 
  { id: 175, category: '8', desc: 'Xxxxxxxxxx', name: 'Reduce, Reuse, Recycle', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 176, category: '8', desc: 'Xxxxxxxxxx', name: 'Art: Careful Reuse', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 179, category: '8', desc: 'Xxxxxxxxxx', name: 'Gunsmith', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 180, category: '8', desc: 'Xxxxxxxxxx', name: 'Casing Expert', xpCost: 15, ranks: 2, skillCost: 1 }, 
  { id: 181, category: '8', desc: 'Xxxxxxxxxx', name: 'Scrapper', xpCost: 15, ranks: 1, skillCost: 1 }, 
  { id: 183, category: '8', desc: 'Xxxxxxxxxx', name: 'Alchemy', xpCost: 10, ranks: 4, skillCost: 1 }, 
  { id: 184, category: '8', desc: 'Xxxxxxxxxx', name: 'Herbalist', xpCost: 10, ranks: 4, skillCost: 0 }, 
  { id: 185, category: '8', desc: 'Xxxxxxxxxx', name: 'Experimentalist', xpCost: 10, ranks: 3, skillCost: 0 }, 
  { id: 186, category: '8', desc: 'Xxxxxxxxxx', name: 'Distillation', xpCost: 5, ranks: 3, skillCost: 0 }, 
  { id: 187, category: '8', desc: 'Xxxxxxxxxx', name: 'JewelCrafting', xpCost: 10, ranks: 3, skillCost: 1 }, 
  { id: 219, category: '8', desc: 'Xxxxxxxxxx', name: 'Friends in the Mining Business', xpCost: 10, ranks: 4, skillCost: 0 }, 
  { id: 220, category: '8', desc: 'Xxxxxxxxxx', name: 'Enchantment!', xpCost: 15, ranks: 2, skillCost: 1 }, 
  { id: 188, category: '2', desc: 'Xxxxxxxxxx', name: 'Protector', xpCost: 10, ranks: 1, skillCost: 5 }, 
  { id: 189, category: '2', desc: 'Xxxxxxxxxx', name: 'Battle Mentor', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 190, category: '2', desc: 'Xxxxxxxxxx', name: 'Endure', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 191, category: '2', desc: 'Xxxxxxxxxx', name: 'Bolster', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 192, category: '2', desc: 'Xxxxxxxxxx', name: 'Gritted Teeth', xpCost: 10, ranks: 1, skillCost: 3 }, 
  { id: 193, category: '3', desc: 'Xxxxxxxxxx', name: 'Headshot', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 194, category: '3', desc: 'Xxxxxxxxxx', name: 'Trickier Shot', xpCost: 10, ranks: 1, skillCost: 5 }, 
  { id: 195, category: '3', desc: 'Xxxxxxxxxx', name: 'Hunters Mark', xpCost: 15, ranks: 1, skillCost: 3 }, 
  { id: 196, category: '3', desc: 'Xxxxxxxxxx', name: 'Take-Backsies', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 197, category: '3', desc: 'Xxxxxxxxxx', name: 'Gun Care', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 198, category: '4', desc: 'Xxxxxxxxxx', name: 'Resuscitate', xpCost: 15, ranks: 1, skillCost: 5 }, 
  { id: 199, category: '4', desc: 'Xxxxxxxxxx', name: 'Meat Wagon', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 200, category: '4', desc: 'Xxxxxxxxxx', name: 'Self-Surgery', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 201, category: '4', desc: 'Xxxxxxxxxx', name: 'Snap Out Of It', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 202, category: '4', desc: 'Xxxxxxxxxx', name: 'Doctors Ward', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 203, category: '6', desc: 'Xxxxxxxxxx', name: 'Sneak', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 204, category: '6', desc: 'Xxxxxxxxxx', name: 'Pick Lock: Adept', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 205, category: '6', desc: 'Xxxxxxxxxx', name: 'Light On Your Feet', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 206, category: '6', desc: 'Xxxxxxxxxx', name: 'Skin Of Your Teeth', xpCost: 15, ranks: 1, skillCost: 0 }, 
  { id: 207, category: '6', desc: 'Xxxxxxxxxx', name: 'Sicilian Gambit', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 208, category: '7', desc: 'Xxxxxxxxxx', name: 'Advanced Artificing', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 209, category: '7', desc: 'Xxxxxxxxxx', name: 'Acedia Specialist', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 210, category: '7', desc: 'Xxxxxxxxxx', name: 'Varitia Specialist', xpCost: 10, ranks: 1, skillCost: 2 }, 
  { id: 211, category: '7', desc: 'Xxxxxxxxxx', name: 'Ira Specialist', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 212, category: '7', desc: 'Xxxxxxxxxx', name: 'Gula Specialist', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 213, category: '7', desc: 'Xxxxxxxxxx', name: 'Redline', xpCost: 10, ranks: 1, skillCost: 1 }, 
  { id: 214, category: '7', desc: 'Xxxxxxxxxx', name: 'Scarlet Tears', xpCost: 10, ranks: 1, skillCost: 0 }, 
  { id: 215, category: '7', desc: 'Xxxxxxxxxx', name: 'Gluttony', xpCost: 5, ranks: 1, skillCost: 0 }, 
  { id: 216, category: '7', desc: 'Xxxxxxxxxx', name: 'Natures Fury', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 217, category: '7', desc: 'Xxxxxxxxxx', name: 'Natures Embrace', xpCost: 20, ranks: 1, skillCost: 0 }, 
  { id: 218, category: '7', desc: 'Xxxxxxxxxx', name: 'Natures Spite', xpCost: 20, ranks: 1, skillCost: 0 }, 
];

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      skills: skillData,

      setSkills: (skills: Skill[]) => set({ skills }),

      getSkillById: (id) => get().skills.find((skill) => skill.id === id),

      getSkillsByIds: (ids) =>
        get().skills.filter((skill) => ids.includes(skill.id)),

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
