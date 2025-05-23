export interface Item {
  id: number;
  name: string;
  type: ItemType;
}

export interface CraftedItem {
  id: number;
  name: string;
  type: CraftedItemType;
}

export type ItemType = 'Metal' | 'Wood' | 'Herb' | 'Glass' | 'Leather' | 'Cloth' | 'Monster' | 'Jewel' | 'Alchemy';
export type GunsmithingItemType = 'Powder' | 'Bullet' | 'Attachment';
export type CraftedItemType = 'Artisan' | 'Gunsmithing' | 'Alchemy' | 'Jewelcrafting' | 'Artificer' | 'Magic' | 'Drug';

export interface ingredient {
  id: number;
  description: string;
  uses?: number;
}

export interface gunsmithingIngredient {
  id: number;
  description?: string;
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

export type GunsmithingRecipe = {
  id: number;
  name: string;
  description: string;
  type: GunsmithingItemType
  primaryResource: gunsmithingIngredient[];
  primaryResourceQuantity: number;
  secondaryResource?: gunsmithingIngredient[];
  secondaryResourceQuantity?: number;
  craftedResource?: gunsmithingIngredient[];
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
    initialSpell: boolean;
  }[];
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
  eventCompleted?: boolean;
  characterUpdates?: {
    [charId: number]: {
      bank?: number;
      courtXp?: number;
      deaths?: number;
    };
  };
  deleted?: boolean;
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

export type AbilityBox = {
  checked: boolean;
  spent: number; // 0 for free, 5 for paid
};

export type MagicItem = {
  id: number;
  characterId: number;
  name: string;
  cXpSpent: number;
  coreAbilityName: string;
  coreAbilityDescription: string;
  minorAbilities?: {
    name: string;
    description: string;
    id: number;
    box1: AbilityBox;
    box2?: AbilityBox;
  }[];
  majorAbilities?: {
    name: string;
    description: string;
    id: number;
    box1: AbilityBox;
    box2?: AbilityBox;
    box3?: AbilityBox;
  }[];
  deleted?: boolean;
};