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
  components: { componentId: number; quantity: number }[];
  time: string;
  location: string;
  mind?: number;
  willpower?: number;
  requiredLores?: string[];
  effects: string;
  generalizedEnchantment: boolean;
  enchantmentSlots: number;
  requirementsToCopy?: string;

}

export type ComponentType = 'crystal' | 'fiber' | 'herbal' | 'liquid' | 'metal' | 'viscera' | 'wood';