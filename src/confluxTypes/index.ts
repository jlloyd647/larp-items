export interface Component {
  id: number;
  name: string;
  description: string;
  level: number;
  type: string;
}

export interface NonMagicItem {
  id: number;
  name: string;
  type: string;
  craftingLevel: number;
  components: { componentId: number; quantity: number; level?: number }[];
  time: string;
  location: string;
  mind?: number;
  willpower?: number;
  requiredLores?: string[];
  effects: string;
  tagEffects?: string;
  generalizedEnchantment: boolean;
  enchantmentSlots: number;
  requirementsToCopy?: string;
  isStackable?: boolean;
}

export type ComponentType = 'crystal' | 'fiber' | 'herbal' | 'liquid' | 'metal' | 'viscera' | 'wood';
export type ItemType = 'Non-Magic' | 'Alchemy' | 'Enchantment' | 'Ritual Crystal'