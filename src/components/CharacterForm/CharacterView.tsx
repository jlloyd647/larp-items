'use client';

import type { Character } from '@/types';
import { useSkillStore } from '@/stores/useSkillStore';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { Card, CardContent } from '@/components/ui/card';
import CharacterAttributes from './CharacterAttributes';
import { COURTS } from '@/lib/consts';

type CharacterViewProps = {
  character: Character;
};

const getCourtName = (id: number) => {
  return COURTS.find((c) => Number(c.id) === Number(id))?.name || `Unknown (${id})`;
};


const CharacterView = ({ character: initialCharacter }: CharacterViewProps) => {
  const allSkills = useSkillStore((state) => state.skills);

  // ✅ Get live version of the character from store
  const character = useCharacterStore((state) =>
    state.characters.find((c) => c.id === initialCharacter.id)
  ) ?? initialCharacter;

  // ✅ Always use live values
  const xpSpent = useCharacterStore((state) => state.getXpSpentForCharacter(character.id));
  const courtXpSpent = useCharacterStore((state) => state.getCourtXpSpentForCharacter(character.id));

  const getSkillNameWithRank = (skillId: number, rank: number) => {
    const skill = allSkills.find((s) => s.id === skillId);
    if (!skill) return `Unknown Skill (${skillId})`;
    return skill.ranks > 1 ? `${skill.name} (${rank}/${skill.ranks})` : skill.name;
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-4 space-y-2">
        {/* Character Info Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{character.name}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">XP (Spent):</span>
            <span className="font-medium">{`(${character.xp}/${xpSpent})`}</span>
          </div>
          <div className="text-sm flex gap-x-2" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-medium">{character.bank}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Court XP (Spent):</span>
            <span className="font-medium">{`(${character.courtXp}/${courtXpSpent})`}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Court:</span>
            <span className="font-medium">{getCourtName(character.court)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Body:</span>
            <span className="font-medium">{}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Skill:</span>
            <span className="font-medium"></span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Deaths:</span>
            <span className="font-medium">{character.deaths}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Magic Item:</span>
            <span className="font-medium">{character.magicItem}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Magic Item CXp:</span>
            <span className="font-medium">{character.magicItemCXp}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Community Points:</span>
            <span className="font-medium">{character.communityPoints}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Path:</span>
            <span className="font-medium">{character.path}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Prologue:</span>
            <span className="font-medium">{character.prologue}</span>
          </div>
          <div className="text-sm flex gap-x-2">
            <span className="text-muted-foreground">Race:</span>
            <span className="font-medium">{character.characterRace}</span>
          </div>
        </div>

        <CharacterAttributes
          character={character}
          getSkillNameWithRank={getSkillNameWithRank}
        />
      </CardContent>
    </Card>
  );
};

export default CharacterView;
