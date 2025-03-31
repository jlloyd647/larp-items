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
  liabilityWaiverSigned: boolean | null;
  inactive?: boolean;
  deleted?: boolean;
};

export type Character = {
  id: number;
  playerId: number;
  name: string;
  xp?: number;
  courtXp?: number;
  court?: number;
  elemental?: number;
  bank?: number;
  skills?: {
    skillId: number;
    rank: number;
    cxpByRank: number[]; // e.g. [2, 0, 1] = 3 ranks, CxP used per rank
  }[];
  spells?: {
    spellId: number;
    cxpUsed: number; // e.g. [2, 5] = CxP used
  }
  magicItem: string;
  magicItemCXp: number;
  deaths: number;
  path: string;
  prologue: string;
  communityPoints: number;
  characterRace: string;
  boons?: number[];
  banes?: number[];
  traits?: number[];
  deleted?: boolean;
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

export type Event = {
  id: number;
  name: string;
  date: string;
  attendees?: {
    playerId: number;
    characterId: number;
  }[];
}

export type Spell = {
  id: number;
  name: string;
  description: string;
  category: string;
  xpCost: number;
  skillCost: number
  specialEffect?: string;
  rank: number;
}

export type Boon = {
  id: number;
  name: string;
  description: string;
  source: 'Court' | 'Elemental';
  sourceId: number;
  rank: number;
}

export type Bane = {
  id: number;
  name: string;
  description: string;
  source: 'Court' | 'Elemental';
  sourceId: number;
  rank: number;
}

export type Trait = {
  id: number;
  name: string;
  description: string;
  source: 'Court' | 'Elemental';
  sourceId: number;
  rank: number;
  type: 'Boon' | 'Bane'; // This will help differentiate between the two types  
}

export type BoonOrBane = {
  id: number;
  name: string;
  description: string;
  source: 'Court' | 'Elemental';
  sourceId: number;
  rank: number;
  type: 'Boon' | 'Bane'; // This will help differentiate between the two types
}