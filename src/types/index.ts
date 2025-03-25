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
  type: 'player';
  id: number;
  name: string;
}

export type Character = {
  id: number;
  playerId: number;
  name: string;
  xp: number;
  skills: Skill[];
}

export type Skill = {
  id: number;
  name: string;
  desc: string;
  xpCost: number;
}