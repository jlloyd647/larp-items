import { Description } from './../../node_modules/cmdk/node_modules/@radix-ui/react-dialog/dist/index.d';
export interface Item {
  id: number;
  name: string;
  type: ItemType;
}

export type ItemType = 'Metal' | 'Wood' | 'Herb' | 'Glass' | 'Leather' | 'Cloth' | 'Monster' | 'Jewel' | 'Alchemy';

export interface ingredient {
  id: number;
  description: string;
  uses?: number;
}
export type ArtisanRecipe = {
  id: number;
  name: string;
  description: string;
  primaryResource: ingredient[];
  primaryResourceQuantity: number;
  secondaryResource?: ingredient[];
  secondaryResourceQuantity?: number;
  craftedResource?: ingredient[];
  hasUses?: boolean;
}

export type Player = {
  id: number;
  name: string;
  characters?: Character[] | null;
  emergencyContactName?: string | null;
  emergencyContactNumber?: string | null;
  email?: string | null;
  liabilityWaiverSigned?: boolean | null;
};

export type Character = {
  id: number;
  playerId: number;
  name: string;
  xp?: number;
  courtXp?: number;
  court?: string;
  bank?: number;
  skills?: {
    skillId: number;
    rank: number;
    cxpByRank: number[]; // e.g. [2, 0, 1] = 3 ranks, CxP used per rank
  }[];
  magicItem: string;
  magicItemCXp: number;
  deaths: number;
  path: string;
  prologue: string;
  communityPoints: number;
  characterRace: string;
}

export type Skill = {
  id: number;
  category: string;
  name: string;
  desc: string;
  xpCost: number;
  ranks: number;
  skillCost: number;
};